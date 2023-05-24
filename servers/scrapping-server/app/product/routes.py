from flask import Blueprint, request, jsonify
from app.product.scrapers import Scraper
import asyncio

product = Blueprint('product', __name__)


@product.route('/product/register/', methods=['POST'])
def add_product():
    """
    This function is a Flask route that takes a POST request with a product URL in the body, scrapes the
    product details using an asyncio scraper, and returns a JSON object with the product information.
    :return: The function `add_product()` returns a JSON object containing the details of a product
    fetched from a given URL. The details include the product title, price, currency, MRP, availability,
    rating, rating count, and image link. If the request method is not POST, the function returns the
    string 'Invalid request.'
    """

    if request.method == 'POST':
        product_url = request.get_json()['url']
        scraper = Scraper()
        product_details = asyncio.run(scraper.scrape_product(url=product_url))
        return jsonify(product_details)
    return 'Invalid request.'
