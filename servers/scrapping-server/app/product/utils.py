import logging
from bs4 import BeautifulSoup
from playwright.async_api import async_playwright
import re
import json

supported_websites = ['amazon', 'flipkart', 'myntra', 'ajio']
currencies = {
    '₹': 'INR',
    '$': 'USD',
    '€': 'EURO',
    None: 'INR'
}


async def get_clean_price(price):
    try:
        price = float(price.replace('MRP', '').replace('Rs.', '').replace(
            ',', '').replace('₹', '').replace('€', '').replace('$', '').strip())
    except:
        price = None

    return price


async def request_handler(route):
    if route.request.resource_type == "image" or route.request.resource_type == "font":
        await route.abort()
        return

    # Continue the intercepted request
    await route.continue_()

async def get_soup(url):
    """
    This is a Python function that fetches html of requested url and returns a soup object along with error_message.
    It uses playwright/requests to load the page data.

    :param url: The URL of the product page on respective eCommerce website that needs to be scraped for
    product details

    :type url: str

    :return: None, error_message if error occurs while fetching the html content of requested url
        else soup, error_message

        error_message = {
            'message': '',
            'status' : reponse_status
        }

        :type product_details: dict
        :type error_message: dict

        soup is BeautifulSoup object.
    """

    try:
        website = url.strip().split('/')[2].split('.')[1] if url.strip(
        ).split('/')[2].__contains__('www.') else url.strip().split('/')[2].split('.')[0]
    except:
        website = None

    error_message = {
        "message": "",
        "status": 200
    }

    async with async_playwright() as p:
        try:
            browser = await p.chromium.launch()
            context = await browser.new_context(
                user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Safari/537.36")
            page = await context.new_page()
        except Exception as e:
            logging.error(f'Unable to open the browser! {e}', exc_info=True)
            error_message['message'] = "Internal server error!"
            error_message['status'] = 500
            return None, error_message
        
        # block loading images and font
        if website == 'amazon' or website == 'myntra':
            # Enable request interception
            await page.route("**/*", lambda route: request_handler(route))

        try:
            # Wait for page to goto url
            await page.goto(url, timeout=30000)
        except Exception as e:
            logging.error(f'Unable to load page. {e}', exc_info=True)
            error_message['message'] = "Internal server error!"
            error_message['status'] = 408
            return None, error_message

        # for debug purpose
        # await page.screenshot(path='screenshot.png')
        # if (website == 'flipkart'):
        #     await page.wait_for_selector('.B_NuCI')

        if website == 'amazon':
            # set pincode if website is amazon
            
            pincode = '110038'  # update when we get pincode from user
            try:
                if pincode:
                    await page.click('#nav-global-location-popover-link')
                    await page.wait_for_selector('#GLUXZipUpdateInput')
                    await page.type('#GLUXZipUpdateInput', pincode)
                    # Waits for the next navigation. Using Python context manager
                    # prevents a race condition between clicking and waiting for a navigation.
                    async with page.expect_navigation():
                        await page.click('#GLUXZipUpdate > span > input')
                        # Reload the page after clicking apply button for pincode
                        await page.reload()
                        await page.wait_for_selector('#productTitle')
            except Exception as e:
                logging.error(f'Unable to set pincode in amazon! {e}', exc_info=True)
        # elif website == 'myntra':
        #     await page.wait_for_selector('.pdp-name')
        # elif website == 'ajio':
        #     await page.wait_for_selector('.prod-name')
        
        try:
            # Get the HTML content of the page
            html = await page.content()
        except Exception as e:
            logging.error(f'{website} page not responding! {e}', exc_info=True)
            error_message['message'] = f"{website} page not responding! Request timed out. {url}"
            error_message['status'] = 408
            return None, error_message

        # Parse the HTML content with BeautifulSoup
        soup = BeautifulSoup(html, 'html.parser')

        try:
            # Close the browser
            await browser.close()
        except Exception as e:
            logging.error(
                f'Unable to close browser. {e}', exc_info=True)

        return soup, error_message


async def get_data_from_script_tag(page, tag_type):
    """
    This function scrapes script tag containing product details.
    :param: 
        page: soup object of page
        tag_type: a string describing type of script tag

    :return: None if any error occurs else JSON object containing details of product
    """
    try:
        script_tags = page.find_all(
            'script', type='application/ld+json')
        # Search for the script tag with "@type": "Product"
        desired_script_tag = None
        for script_tag in script_tags:
            try:
                # Remove invalid control characters from the script tag's content
                cleaned_content = re.sub(
                    r'[\x00-\x1F\x7F-\x9F]', '', script_tag.string)
                json_data = json.loads(cleaned_content)

                if json_data.get('@type') == tag_type:
                    desired_script_tag = script_tag
                    break
            except Exception as e:
                logging.error(
                    f'Error while find type of script tag. {e}', exc_info=True)
    except Exception as e:
        logging.error(f'Error while scraping scripting tags. {e}', exc_info=True)

    # Extract the contents within the script tag
    try:
        # Remove invalid control characters from the script tag's content
        cleaned_content = re.sub(
            r'[\x00-\x1F\x7F-\x9F]', '', desired_script_tag.string)

        data = json.loads(cleaned_content)
    except Exception as e:
        logging.error(f'Error while loading data from desired script tag. {e}', exc_info=True)
        data = None

    return data
