import pytest
from tqdm import tqdm
import asyncio
from app.product.scrapers import Scraper

scraper = Scraper()


def validate_product(product_details, url):
    assert product_details[
        'Availability'] is not None, f"Availability is None for URL: {url}"
    if product_details['Availability'] == 'In Stock':
        assert product_details['Title'] is not None, f"Title : {product_details['Title']} is None for URL: {url}"
        assert product_details['Price'] is not None, f"Price is None for URL: {url}"
        assert product_details['MRP'] is not None, f"MRP is None for URL: {url}"
        assert product_details[
            'Currency'] is not None, f"Currency is None for URL: {url}"
        assert product_details[
            'Category'] is not None, f"Category is None for URL: {url}"
        assert product_details[
            'Image_Link'] is not None, f"Image_Link is None for URL: {url}"
        assert product_details['Website'] is not None, f"Website is None for URL: {url}"


# @pytest.mark.skip(reason="Not required for this run")
def test_scrapers():
    with open('good_urls.txt', 'r') as file:
        urls = file.readlines()

    # test on working urls
    for url in tqdm(urls, desc='Testing on working URLs', unit='URL'):
        product_details, error_message = asyncio.run(
            scraper.scrape_product(url=url))

        assert error_message['status'] == 200, f"Test failed for URL: {url}"
        validate_product(product_details, url)

    # test url with spaces
    url = 'https: // www.myntra.com/tops/enamor/enamor-white-solid-tank-top/17908692/buy'
    response, error_message = asyncio.run(scraper.scrape_product(url=url))
    assert response is None, f"Test failed for URL: {url}"
    assert error_message['status'] == 408, f"Test failed for URL: {url}"

    # test incorrect url
    url = 'hi'
    response, error_message = asyncio.run(scraper.scrape_product(url=url))
    assert response is None, f"Test failed for URL: {url}"
    assert error_message['status'] == 404,  f"Test failed for URL: {url}"
    assert error_message[
        'message'] == "Invalid URL!",  f"Test failed for URL: {url}"

    # test unsupported url
    url = 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Status#server_error_responses'
    response, error_message = asyncio.run(scraper.scrape_product(url=url))
    assert response is None, f"Test failed for URL: {url}"
    assert error_message['status'] == 404,  f"Test failed for URL: {url}"
    assert error_message[
        'message'] == "Entered website is not supported! Please check back later.",  f"Test failed for URL: {url}"
