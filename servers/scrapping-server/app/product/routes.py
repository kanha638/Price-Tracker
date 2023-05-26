from flask import Blueprint, request, jsonify
from app.product.scrapers import Scraper
import asyncio

product = Blueprint('product', __name__)


@product.route('/product/register/', methods=['POST'])
def add_product():
    """
    This function is a Flask route that takes a POST request with a product URL in the body, scrapes the
    product details using an asyncio scraper, and returns a JSON object with the product information.

    Method: POST
    Body: {
        "url" : ""
    }

    :return: 
        A JSON object containing the details of a product
        fetched from a given URL. The details include the product title, price, currency, MRP, availability, category,
        rating, rating count, and image link. 
        If the request method is not POST, the function returns the
        string 'Invalid request.'
    """

    if request.method == 'POST':
        error_message, status = {}, 200
        product_details = None

        try:
            product_url = request.get_json()['url']
        except Exception as e:
            error_message = {
                "message": "Unable to fetch product url from request!"
            }
            status = 404
            return jsonify(error_message), status

        try:
            scraper = Scraper()
            product_details = asyncio.run(
                scraper.scrape_product(url=product_url))
        except Exception as e:
            print(f'Error:: {e}')
            error_message = {
                "message": "Unable to scrape product due to some internal error on scraping server."
            }
            status = 500

        if product_details is None:
            error_message = {
                "message": "Unable to scrape product due to some internal error on scraping server."
            }
            status = 500

        return jsonify(product_details) if product_details is not None else jsonify(error_message), status

    return 'Invalid request.'
