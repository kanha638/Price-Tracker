from flask import jsonify
import requests
import json
from bs4 import BeautifulSoup
from playwright.async_api import async_playwright
from app.product.globals import currencies


class Flipkart:
    def __init__(self) -> None:
        """
        This is a constructor function that initializes a dictionary with a user-agent header for web
        scraping purposes.
        """
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
        soup = BeautifulSoup(page.content, 'html.parser')
        return soup

    async def scrape_product(self, url: str) -> dict:
        """
        This is a Python function that scrapes product details from Flipkart's website and returns them
        in a dictionary format.

        :param url: The URL of the product page on Flipkart's website that needs to be scraped for
        product details
        :type url: str
        :return: The function `scrape_product` returns a dictionary containing the scraped details of a
        product from Flipkart's website. The dictionary contains the following keys: 'Title', 'Price',
        'MRP', 'Currency', 'Availability', 'Rating', 'Rating_Count', 'Category', and 'Image_Link'.
        """

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

        categories = soup.find_all('a', {'class': '_2whKao'})
        if categories:
            category = categories[1].text.strip() if len(
                categories) > 1 else categories[0].text.strip()
        else:
            categories = "Not Found"

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
                    rating_count = float(rating_count.text.replace(
                        'Ratings', '').replace(',', '').strip().split()[0])
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
            'Category': category,
            'Image_Link': img_link,
        }

        return product

    async def scrape_price(self, url: str) -> float:
        """
        This function scrapes the price of a product from a given Flipkart URL and returns it as a float.

        :param url: The URL of the Flipkart product whose price needs to be tracked
        :type url: str
        :return: the price of a product scraped from a given URL. The price is returned as a float
        value.
        """

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
        """
        This function fetches the HTML content of a given Amazon URL using Playwright and returns a
        BeautifulSoup object.

        :param url: The URL of the Amazon page from which data needs to be fetched
        :return: a BeautifulSoup object, which is a parsed representation of the HTML content of a
        webpage fetched from the provided URL.
        """
        async with async_playwright() as p:
            browser = await p.chromium.launch()
            context = await browser.new_context(
                user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Safari/537.36")

            page = await context.new_page()

            # Wait for page to goto url
            await page.goto(url, timeout=2000000)

            # if self.pincode:
            #     await page.click('#nav-global-location-popover-link')
            #     await page.wait_for_selector('#GLUXZipUpdateInput')
            #     await page.type('#GLUXZipUpdateInput', self.pincode)
            #     # Waits for the next navigation. Using Python context manager
            #     # prevents a race condition between clicking and waiting for a navigation.
            #     async with page.expect_navigation():
            #         await page.click('#GLUXZipUpdate > span > input')
            #         # Reload the page after clicking apply button for pincode
            #         await page.reload()

            # Get the HTML content of the page
            html = await page.content()

            # Parse the HTML content with BeautifulSoup
            soup = BeautifulSoup(html, 'html.parser')

            # Close the browser
            await browser.close()

            return soup

    async def scrape_product(self, url) -> dict:
        """
        The function scrapes product details from Amazon's website and returns a dictionary containing
        information such as title, price, availability, rating, and category.

        :param url: The URL of the product page on Amazon's website that needs to be scraped for product
        details
        :return: The function `scrape_product` returns a dictionary containing the scraped details of a
        product from Amazon's website. The dictionary contains the following keys: 'Title', 'Price',
        'MRP', 'Currency', 'Availability', 'Rating', 'Rating_Count', 'Category', and 'Image_Link'.
        """

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
        else:
            mrp = price

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

        categories_div = page.find(
            'div', {'id': 'wayfinding-breadcrumbs_feature_div'})
        if categories_div:
            categories = categories_div.find(
                'ul', {'class': 'a-unordered-list a-horizontal a-size-small'})
            category = categories.find_all('li')[2].find('a').text.strip()
        else:
            category = 'Not Found'

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
            'Category': category,
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


class Myntra:
    def __init__(self) -> None:
        pass

    async def get_soup(self, url):
        '''
            Fetches the url data from amazon and returns soup object.

            params: Myntra url whose data to be fetched

            Returns: Soup object of page requested
        '''

        async with async_playwright() as p:
            browser = await p.chromium.launch()
            context = await browser.new_context(
                user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Safari/537.36")
            page = await context.new_page()

            # Wait for page to goto url
            await page.goto(url, timeout=2000000)
            # Get the HTML content of the page
            html = await page.content()

            # Parse the HTML content with BeautifulSoup
            soup = BeautifulSoup(html, 'html.parser')

            # Close the browser
            await browser.close()

            return soup

    async def scrape_product(self, url) -> dict:
        """
        This is a Python function that scrapes product details from Amazon's website and returns a
        dictionary containing information such as title, price, currency, availability, rating, and
        image link.

        :param url: The URL of the product page on Amazon's website that needs to be scraped for product
        details
        :return: The function `scrape_product` returns a dictionary containing the scraped details of a
        product from Amazon's website. The dictionary has keys such as 'Title', 'Price', 'Currency',
        'MRP', 'Availability', 'Rating', 'Rating_Count', 'Category', and 'Image_Link'.
        """

        page = await self.get_soup(url=url)

        # select the div containing all categories
        categories = page.find('div', {'class': 'breadcrumbs-container'})
        if categories is not None:
            category = categories.find_all('a', {'class': 'breadcrumbs-link'})[2].text if len(
                categories) > 2 else categories.find_all('a', {'class': 'breadcrumbs-link'})[1].text
        else:
            category = 'Not Found'

        # select the span containing MRP
        mrp = page.find('span', {'class': 'pdp-mrp'})
        currency = 'INR'
        if mrp is not None:
            mrp = mrp.find('s')
            mrp = float(mrp.text.replace('MRP', '').replace(',', '').replace(
                '₹', '').replace('€', '').replace('$', '').strip())
            print(f'MRP : {mrp}')

        # select the image rating div
        rating_block = page.find('div', {'class': 'index-overallRating'})
        rating = float(0)
        rating_count = float(0)
        if rating_block is not None:
            # extract product rating and rating count
            rating = rating_block.find('div')
            rating = float(rating.text.replace(
                ',', '').strip().split(' ')[0])

            rating_count = rating_block.find(
                'div', {'class': 'index-ratingsCount'}).text.replace('Ratings', '').replace('Rating', '').strip()

            mul = 1
            if rating_count[-1] == 'k':
                rating_count = rating_count[:-1]
                mul = 1000
            rating_count = float(rating_count) * mul

        script_tags = page.find_all('script', type='application/ld+json')
        # Search for the script tag with "@type": "Product"
        desired_script_tag = None
        for script_tag in script_tags:
            json_data = json.loads(script_tag.string)
            if json_data.get('@type') == 'Product':
                desired_script_tag = script_tag
                break

        if desired_script_tag is not None:
            # Extract the contents within the script tag
            data = json.loads(desired_script_tag.string)
            title = data.get('name')
            img_link = data.get('image')
            price = float(data.get('offers', {}).get('price'))
            currency = data.get('offers', {}).get('priceCurrency')
            availability = data.get('offers', {}).get('availability')
        else:
            title = page.find('h1', {'class': 'pdp-title'}).text.strip()
            name = page.find('h1', {'class': 'pdp-name'}).text.strip()
            title += name
            price = page.find('span', {'class': 'pdp-price'}).find('strong')
            if price:
                if price.text.__contains__('€'):
                    currency = 'EURO'
                elif price.text.__contains__('$'):
                    currency = 'USD'

                price = float(price.text.replace(',', '').replace(
                    '₹', '').replace('€', '').replace('$', '').strip())

            img_div = page.find(
                'div', {'class': 'image-grid-image'}).get('style')
            img_link = img_div.replace(
                'background-image: url("', '').replace('");', '')

            availability = 'None'

        if mrp is None:
            mrp = price

        product = {
            'Title': title,
            'Price': price,
            'MRP': mrp,
            'Currency': currency,
            'Availability': availability,
            'Rating': rating,
            'Rating_Count': rating_count,
            'Category': category,
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
        script_tags = page.find_all('script', type='application/ld+json')
        # Search for the script tag with "@type": "Product"
        desired_script_tag = None
        for script_tag in script_tags:
            json_data = json.loads(script_tag.string)
            if json_data.get('@type') == 'Product':
                desired_script_tag = script_tag
                break

        price = float(0)
        if desired_script_tag is not None:
            # Extract the contents within the script tag
            data = json.loads(desired_script_tag.string)
            price = float(data.get('offers', {}).get('price'))
        else:
            price = page.find('span', {'class': 'pdp-price'}).find('strong')
            if price:
                price = float(price.text.replace(',', '').replace(
                    '₹', '').replace('€', '').replace('$', '').strip())

        return price


class Scraper:
    def __init__(self) -> None:
        """
        This function initializes scraper objects for Flipkart, Amazon, and Myntra and maps their
        respective product and price scraper functions.
        """
        # create scraper objects for Flipkart and Amazon
        self.flipkart = Flipkart()
        self.amazon = Amazon()
        self.myntra = Myntra()

        # map product scraper functions
        self.scraper_product_dict = {
            'flipkart': self.flipkart.scrape_product,
            'amazon': self.amazon.scrape_product,
            'myntra': self.myntra.scrape_product
        }

        # map price scraper functions
        self.scraper_price_dict = {
            'flipkart': self.flipkart.scrape_price,
            'amazon': self.amazon.scrape_price,
            'myntra': self.myntra.scrape_price
        }

    async def scrape_product(self, url: str) -> dict:
        """
        This is an asynchronous function that scrapes a product from a given URL using a scraper function
        based on the website domain.

        :param url: A string representing the URL of the product page to be scraped
        :type url: str
        :return: The function `scrape_product` returns the result of calling the appropriate scraper
        function for the given website URL. If the website is not supported, it returns a JSON error
        message.
        """
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
        """
        This function scrapes the price of a product from a given URL using a scraper function based on the
        website domain.

        :param url: A string representing the URL of a product page on an e-commerce website
        :type url: str
        :return: The function `scrape_price` returns a float value, which is the price scraped from the
        given URL.
        """
        website = url.strip().split('/')[2].split('.')[1]
        scraper_function = self.scraper_price_dict.get(website)
        return await scraper_function(url)
