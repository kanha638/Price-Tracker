from bs4 import BeautifulSoup
import requests
from playwright.async_api import async_playwright

headers = {
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36',
}


def get_soup(url):
    '''
        Fetches the url data and returns soup object.
        params: url whose data to be fetched
        Returns: Soup of page requested
    '''
    page = requests.get(url, headers=headers)
    soup = BeautifulSoup(page.content, 'lxml')
    return soup


class Flipkart():
    def scrape_product(url):
        '''
        Function to scrape product title, price, price currency, MRP, availability, rating, rating count and image link from flipkart's website.

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

        soup = get_soup(url=url)

        title = soup.find(class_='B_NuCI')
        if title:
            title = title.text.replace('\xa0\xa0', '').strip()

        price = soup.find(class_='_30jeq3 _16Jk6d')
        if price:
            if '₹' in price.text:
                currency = 'INR'
            elif '$' in price.text:
                currency = 'USD'
            elif '€' in price.text:
                currency = 'EURO'
            else:
                currency = None

            price = float(price.text.replace(',', '').replace(
                '₹', '').replace('€', '').replace('$', '').strip())

        mrp = soup.find(class_='_3I9_wc _2p6lqe')
        if mrp:
            mrp = float(mrp.text.replace(',', '').replace(
                '₹', '').replace('€', '').replace('$', '').strip())

        availability = soup.find(class_='_1dVbu9')
        if availability is None:
            availability = 'In Stock'
        else:
            availability = 'Out of Stock'

        rating = soup.find(class_='_3LWZlK')
        if rating:
            rating = float(rating.text.replace(',', '').strip())

        rating_count = soup.find(class_='_2_R_DZ')
        if rating_count is not None:
            if availability == 'In Stock':
                rating_count = float(rating_count.span.text.replace(
                    'Ratings', '').replace(',', '').strip().split(' ', 1)[0])
            else:
                rating_count = float(rating_count.text.split()[0])
        
        try:
            img_link = soup.find(class_='_396cs4 _2amPTt _3qGmMb')
        except:
            img_link = soup.find(class_='_2r_T1I _396QI4')

        if img_link is None:
            img_link = soup.find('img', {'class': '_2r_T1I _396QI4'})

        if img_link is not None:
            img_link = img_link.attrs['src']

        product = {
            'Title': title,
            'Price': price,
            'MRP': mrp,
            'Currency': currency,
            'Availability': availability,
            'Rating': rating,
            'Rating_Count': int(rating_count),
            'Image_Link': img_link,
        }

        return product

    def track_price(url):
        '''
        Tracks the price of product.
        params: url of product whose price to be tracked
        Returns: Price of the product at that particular time.
        '''

        soup = get_soup(url=url)
        price = soup.find(class_='_30jeq3 _16Jk6d')
        if price is not None:
            price = price.text.replace(',', '').replace(
                '₹', '').replace('$', '').strip()

        return float(price)


class Amazon:
    def __init__(self, pincode: str = '303108'):
        self.pincode = pincode

    async def get_soup(self, url):
        async with async_playwright() as p:
            browser = await p.chromium.launch()
            page = browser.new_page()

            # Wait for page to goto url
            await page.goto(url)

            # If a pincode is provided, set it on the website
            if self.pincode:
                await page.click('#glow-ingress-line2')
                await page.waitForSelector('#GLUXZipUpdateInput', visible=True)
                await page.type('#GLUXZipUpdateInput', self.pincode)
                await page.click('#GLUXZipUpdate > span > input')

                # Wait for the page to reload with the new pincode
                await page.waitForNavigation()

            # Get the HTML content of the page
            html = await page.content()

            # Parse the HTML content with BeautifulSoup
            soup = BeautifulSoup(html, 'html.parser')

            print('Reached here!!')

            # Close the browser
            await browser.close()

            return soup

    async def scrape(self, url):
        page = await self.get_soup(url=url)

        title = page.find(id='productTitle')
        if title:
            title = title.text.strip()

        price = page.find(class_='a-price-whole')
        if price:
            price = float(price.text.replace(',', '').replace(
                '₹', '').replace('$', '').strip())
            
        mrp_block = page.find(class_='basisprice')
        mrp = None
        if mrp_block:
            mrp = mrp_block.find(
                'span', {'class': 'a-offscreen'})
            if mrp:
                mrp = float(mrp.text.replace(',', '').replace(
                    '₹', '').replace('$', '').strip())

        currency = page.find('span', {'class': 'a-price-symbol'})
        if currency:
            currency = currency.text.strip()
            if currency == '₹':
                currency = 'INR'
            elif currency == '$':
                currency = 'USD'
            elif currency == '€':
                currency = 'EURO'
            else:
                currency = None

        avalability_block = page.find('div', {'id': 'availability'})
        availability = None
        if avalability_block:
            if avalability_block.find('span', {'class': 'a-color-success'}):
                availability = 'In Stock'
            else:
                availability = 'Out of Stock'
        
        rating_block = page.find('div', {'id': 'averageCustomerReviews'})
        rating = None
        if rating_block:
            rating = rating_block.find('span', text='out of 5 stars')
            if rating:
                rating = float(rating.text.replace(',', '').strip().split(' ')[0])

        rating_count = page.find('span', {'id': 'acrCustomerReviewText'})
        if rating_count:
            rating_count = float(rating_count.text.replace(',', '').strip().split(' ')[0])
        
        img_link = page.find('img', {'id': 'landingImage'})
        if img_link:
            img_link = img_link.attrs['src']
        
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
    