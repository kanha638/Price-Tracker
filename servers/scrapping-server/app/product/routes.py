from flask import Blueprint, request, jsonify
from app.product.scrapers import Scraper
import asyncio
import logging

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
        fetched from a given URL. 
        The details of product include title, price, currency, MRP, availability, category,
        rating, rating count, and image link. 

        A JSON object containing the error message if product is not found or some error ocurrs while scrapping.
        error_message = {
            "message": "",
            "status": response status
        }

        product_details = {
            'Title': title,
            'Price': price,
            'MRP': mrp,
            'Currency': currency,
            'Availability': availability,
            'Rating': rating,
            'Rating_Count': rating_count,
            'Category': category,
            'Image_Link': img_link,
            'Website':website_name
        }

        If the request method is not POST, the function returns the
        string 'Invalid request.'
    """
    
    from run import scraper

    if request.method == 'POST':
        error_message = {
            'message': "",
            'status': 200
        }

        product_details = None

        try:
            product_url = request.get_json()['url']
        except Exception as e:
            error_message = {
                "message": "Unable to fetch product url from request!",
                "status": 404
            }
            return jsonify(error_message), error_message['status']

        try:
            logging.info(f"Fetch product details for url : {product_url}")
            product_details, error_message = asyncio.run(
                scraper.scrape_product(url=product_url))
            logging.info(f'Result : {product_details}')
        except Exception as e:
            logging.error(f'Error:: {e}', exc_info=True)
            error_message = {
                "message": "Internal server error!",
                "status": 500
            }

        return jsonify(product_details) if product_details is not None else jsonify(error_message), error_message['status']

    return 'Invalid request.'
