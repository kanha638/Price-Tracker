from app import app
from app.scraper import Amazon,Flipkart
from flask import request, jsonify, abort
import time
import asyncio


# @app.before_request
# def check():
#     print(request.url)
#     if request.host_url != "http://127.0.0.1:5000/" or request.host_url != "http://127.0.0.1:8005/":
#         abort(401)

    
@app.route('/')
def index():
    return "Hii ! from the scrapper server"


@app.route("/product/register/", methods=['POST'] ) 
async def get_product_details_for_register():

    '''
        This route is for getting the product details by the scrapper for the public server 
        where the product registration will be done

        method : POST 
        body : 

        {
            "website": "",
            "url":""
        }

        response : 

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
        body = request.get_json() # Parsing the value into json format
        value = None

        website = body['url'].strip().split('/')[2].split('.')[1]

        if website == 'amazon':
            amazon = Amazon()
            # get the product details from Amazon
            value = await amazon.scrape(url=body['url']) 
        elif website == 'flipkart':
            flipkart = Flipkart()
            # get the product details from Flipkart
            value = flipkart.scrape(url=body['url']) 
        else :
            # As currently we only support 2 websites Flipkart and Amazon
            error_message = {
                "message":"Entered website is not supported now! Please check back later."
            }
            return jsonify(error_message) , 409
        return jsonify(value)