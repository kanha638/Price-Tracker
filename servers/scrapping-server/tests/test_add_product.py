import pytest
import requests

# Flask app endpoint URL
app_url = 'http://127.0.0.1:5000/product/register'


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
