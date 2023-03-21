from flask import jsonify
import requests
from bs4 import BeautifulSoup
from playwright.async_api import async_playwright
from app.product.globals import currencies
# from product.globals import currencies


class Flipkart:
    def __init__(self) -> None:
        self.headers = {
            'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36',
        }

    async def get_soup(self, url):
        '''
        Fetches the url data and returns soup object.

        params: url whose data to be fetched

        Returns: Soup of page requested
        '''
        page = requests.get(url, headers=self.headers)
        soup = BeautifulSoup(page.content, 'lxml')
        return soup

    async def scrape_product(self, url: str) -> dict:
        '''
        Function to scrape product details from flipkart's website.

        params: url of the product to be scraped

        Returns :
        {
            'Title': title,
            'Price': price,
            'MRP': mrp,
            'Currency': currency,
            'Availability': availability,
            'Rating': rating,
            'Rating_Count': rating_count,
            'Image_Link': img_link,
        }
        '''

        soup = await self.get_soup(url=url)

        title = soup.find(class_='B_NuCI')
        if title:
            title = title.text.replace('\xa0\xa0', '').strip()

        price = soup.find(class_='_30jeq3 _16Jk6d')
        currency = 'INR'
        if price:
            price = price.text.strip()
            price = float(price.replace(',', '').replace(
                '₹', '').replace('€', '').replace('$', '').strip())

        # ToDo : handle if MRP is not available
        mrp = soup.find(class_='_3I9_wc _2p6lqe')
        if mrp:
            mrp = float(mrp.text.replace(',', '').replace(
                '₹', '').replace('€', '').replace('$', '').strip())

        availability = soup.find(class_='_1dVbu9')
        if availability is None:
            availability = 'In Stock'
        else:
            availability = 'Out of Stock'

        rating_not_available_block = soup.find('span', {'class': '_2dMYsv'})
        if rating_not_available_block:
            rating = float(0)
            rating_count = float(0)
        else:
            rating = soup.find(class_='_3LWZlK')
            if rating:
                rating = float(rating.text.replace(',', '').strip())
            else:
                rating = float(0)

            rating_count = soup.find(class_='_2_R_DZ')
            if rating_count:
                if availability == 'In Stock':
                    rating_count = float(rating_count.span.text.replace(
                        'Ratings', '').replace(',', '').strip().split(' ', 1)[0])
                else:
                    rating_count = float(rating_count.text.split()[0])
            else:
                rating_count = float(0)

        try:
            img_link_tag = soup.find(class_='_396cs4 _2amPTt _3qGmMb')
        except:
            img_link_tag = soup.find(class_='_2r_T1I _396QI4')

        if img_link_tag is None:
            img_link_tag = soup.find('img', {'class': '_2r_T1I _396QI4'})

        if img_link_tag:
            img_link = img_link_tag.attrs['src']
        else:
            img_link = ''

        product = {
            'Title': title,
            'Price': price,
            'MRP': mrp,
            'Currency': currency,
            'Availability': availability,
            'Rating': rating,
            'Rating_Count': rating_count,
            'Image_Link': img_link,
        }

        return product

    async def scrape_price(self, url: str) -> float:
        '''
            Scrapes the price of product.

            params: url of flipkart product whose price to be tracked.

            Returns: Price of the product at that particular time.
        '''

        soup = await self.get_soup(url=url)
        price = soup.find(class_='_30jeq3 _16Jk6d')
        if price is not None:
            price = float(price.text.replace(',', '').replace(
                '₹', '').replace('$', '').replace('€', '').strip())

        return price


class Amazon:
    def __init__(self, pincode: str = '303108') -> None:
        self.pincode = pincode

    async def get_soup(self, url):
        '''
            Fetches the url data from amazon and returns soup object.
            It uses playwright for setting up the pincode

            params: amazon url whose data to be fetched

            Returns: Soup object of page requested
        '''
        async with async_playwright() as p:
            browser = await p.chromium.launch()
            page = await browser.new_page()

            # Wait for page to goto url
            await page.goto(url, timeout=2000000)

            if self.pincode:
                await page.click('#nav-global-location-popover-link')
                await page.wait_for_selector('#GLUXZipUpdateInput')
                await page.type('#GLUXZipUpdateInput', self.pincode)
                # Waits for the next navigation. Using Python context manager
                # prevents a race condition between clicking and waiting for a navigation.
                async with page.expect_navigation():
                    await page.click('#GLUXZipUpdate > span > input')
                    # Reload the page after clicking apply button for pincode
                    await page.reload()

            # Get the HTML content of the page
            html = await page.content()

            # Parse the HTML content with BeautifulSoup
            soup = BeautifulSoup(html, 'html.parser')

            # Close the browser
            await browser.close()

            return soup

    async def scrape_product(self, url) -> dict:
        '''
        Function to scrape product details from amazon's website.

        params: url of the product to be scraped

        Returns :
        {
            'Title': title,
            'Price': price,
            'Currency': currency,
            'MRP': mrp,
            'Availability': availability,
            'Rating': rating,
            'Rating_Count': rating_count,
            'Image_Link': img_link,
        }
        '''

        page = await self.get_soup(url=url)

        title = page.find('span', {'id': 'productTitle'})
        if title:
            title = title.text.strip()

        price = page.find(class_='a-price-whole')
        if price:
            price = float(price.text.replace(',', '').replace(
                '₹', '').replace('€', '').replace('$', '').strip())

        mrp_block = page.find(
            class_='a-size-small a-color-secondary aok-align-center basisPrice')
        mrp = None
        # ToDo : handle if MRP is not available
        if mrp_block:
            mrp = mrp_block.find('span', {'class': 'a-price a-text-price'}).find(
                'span', {'class': 'a-offscreen'})
            if mrp:
                mrp = float(mrp.text.replace(',', '').replace(
                    '₹', '').replace('€', '').replace('$', '').strip())

        currency = page.find('span', {'class': 'a-price-symbol'})
        if currency:
            currency = currency.text.strip()
            currency = currencies[currency]
        else:
            currency = 'INR'

        avalability_block = page.find('div', {'id': 'availability'})
        availability = None
        if avalability_block:
            if avalability_block.find('span', {'class': 'a-color-success'}):
                availability = 'In Stock'
            else:
                availability = 'Out of Stock'
        else:
            availability = 'Out of Stock'

        rating_block = page.find('div', {'id': 'averageCustomerReviews'})
        if rating_block:
            rating = rating_block.find('span', {'class': 'a-icon-alt'})
            if rating:
                rating = float(rating.text.replace(
                    ',', '').strip().split(' ')[0])
        else:
            rating = float(0)

        rating_count = page.find('span', {'id': 'acrCustomerReviewText'})
        if rating_count:
            rating_count = float(rating_count.text.replace(
                ',', '').strip().split(' ')[0])
        else:
            rating_count = float(0)

        img_link = page.find('img', {'id': 'landingImage'})
        if img_link:
            img_link = img_link.attrs['src']
        else:
            img_link = ''

        product = {
            'Title': title,
            'Price': price,
            'MRP': mrp,
            'Currency': currency,
            'Availability': availability,
            'Rating': rating,
            'Rating_Count': rating_count,
            'Image_Link': img_link,
        }

        return product

    async def scrape_price(self, url) -> float:
        '''
        Scrapes the price of product.
        params: url of product whose price to be tracked
        Returns: Price of the product at that particular time.
        '''
        page = await self.get_soup(url=url)
        price = page.find(class_='a-price-whole')
        if price:
            price = float(price.text.replace(',', '').replace(
                '₹', '').replace('$', '').strip())

        return price


class Scraper:
    def __init__(self) -> None:
        # create scraper objects for Flipkart and Amazon
        self.flipkart = Flipkart()
        self.amazon = Amazon()

        # map product scraper functions
        self.scraper_product_dict = {
            'flipkart': self.flipkart.scrape_product,
            'amazon': self.amazon.scrape_product
        }

        # map price scraper functions
        self.scraper_price_dict = {
            'flipkart': self.flipkart.scrape_price,
            'amazon': self.amazon.scrape_price
        }

    async def scrape_product(self, url: str) -> dict:
        '''
        Function to scrape product details for the given url.

        params: url of the product to be scraped

        Returns :
        {
            'Title': title,
            'Price': price,
            'Currency': currency,
            'MRP': mrp,
            'Availability': availability,
            'Rating': rating,
            'Rating_Count': rating_count,
            'Image_Link': img_link,
        }
        '''

        website = url.strip().split('/')[2].split('.')[1]
        try:
            scraper_function = self.scraper_product_dict.get(website)
        except:
            error_message = {
                "message": "Entered website is not supported now! Please check back later."
            }
            return jsonify(error_message)

        return await scraper_function(url)

    async def scrape_price(self, url: str) -> float:
        '''
        Scrapes the price of product.

        params: url of product whose price to be tracked

        Returns: Price of the product at that particular time.
        '''

        website = url.strip().split('/')[2].split('.')[1]
        scraper_function = self.scraper_price_dict.get(website)
        return await scraper_function(url)
