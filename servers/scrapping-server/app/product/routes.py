from flask import Blueprint, request, jsonify
from app.product.scrapers import Scraper
from concurrent.futures import ThreadPoolExecutor

product = Blueprint('product', __name__)


@product.route('/add_product', methods=['POST'])
async def add_product():
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
        with ThreadPoolExecutor as executer:
            scraper = Scraper()
            product_details_future = executer.submit(
                scraper.scrape_product, url=product_url)
            product_details = await product_details_future

        return jsonify(product_details)
    return 'Invalid request.'
