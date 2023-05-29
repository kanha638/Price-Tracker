import pytest
import requests

# Flask app endpoint URL
app_url = 'http://127.0.0.1:5000/product/register'


def validate_product(product_details, url):
    assert product_details['Title'] is not None, f"Title : {product_details['Title']} is None for URL: {url}"
    assert product_details['Price'] is not None, f"Price is None for URL: {url}"
    assert product_details['MRP'] is not None, f"MRP is None for URL: {url}"
    assert product_details['Currency'] is not None, f"Currency is None for URL: {url}"
    assert product_details['Category'] is not None, f"Category is None for URL: {url}"
    assert product_details[
        'Image_Link'] is not None, f"Image_Link is None for URL: {url}"
    assert product_details['Website'] is not None, f"Website is None for URL: {url}"


@pytest.mark.skip(reason="Not required for this run")
def test_add_product():
    # test when request body is not correct
    payload = {
        'urls': "https://www.myntra.com/tops/enamor/enamor-white-solid-tank-top/17908692/buy"
    }

    response = requests.post(app_url, json=payload)
    assert response.status_code == 404,  f"Test: request body is not correct for URL: {payload['urls']}"
    error_message = response.json()
    assert error_message[
        'message'] == "Unable to fetch product url from request!",  f"Request failed for URL: {payload['urls']}"

    # test with get request
    payload = {
        'url': "https://www.myntra.com/tops/enamor/enamor-white-solid-tank-top/17908692/buy"
    }
    response = requests.get(app_url, json=payload)
    assert response.status_code == 404, print(
        f"Test: with GET request failed for URL: {payload['url']}")
