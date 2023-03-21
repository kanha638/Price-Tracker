from flask import Blueprint, request, jsonify
from app.product.scrapers import Scraper
import asyncio

product = Blueprint('product', __name__)


@product.route('/product/register/', methods=['POST'])
def add_product():
    '''
    Route to fetch product details for a given url.
    Method: POST
    Body: {
        "url" : ""
    }
    Response : JSON object.
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

    if request.method == 'POST':
        product_url = request.get_json()['url']
        scraper = Scraper()
        product_details = asyncio.run(scraper.scrape_product(url=product_url))
        return jsonify(product_details)
    return 'Invalid request.'
