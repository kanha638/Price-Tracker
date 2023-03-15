from app import app
from app.scraper import Amazon,Flipkart
from flask import request , jsonify ,abort
import time


# @app.before_request
# def check():
#     print(request.url)
#     if request.host_url != "http://127.0.0.1:5000/" or request.host_url != "http://127.0.0.1:8005/":
#         abort(401)
    
@app.route('/')
def index():
    return "Hii ! from the scrapper server"


@app.route("/product/register/", methods=['POST'] ) 
def get_product_details_for_register():

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
            'Availability': availability,
            'Rating': rating,
            'Rating_Count': rating_count,
            'Image_Link': img_link,
        }
    '''
    if request.method == 'POST':
        body = request.get_json() # Parsing the value into json format
        value = None
        # if body['website'] == 'amazon':
        #     value = Amazon(body['url']) # This function will reutrn the detauls of the product url from Amazons
        if body['website'] == 'flipkart':
            value = Flipkart.scrape_product(body['url']) # This function will return the details of the website url from flipkart
        else :
            # As currently we only support 2 websites Flipkart and Amazon
            error_message = {
                "message":"Entered Website is not supported now !."
            }
            return jsonify(error_message) , 409
        return jsonify(value)