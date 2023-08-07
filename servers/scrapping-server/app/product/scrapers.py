from flask import jsonify
from app.product.utils import currencies, get_soup, get_data_from_script_tag, get_clean_price


class Flipkart:
    def __init__(self) -> None:
        pass

    async def scrape_product(self, url: str) -> dict:
        """
        This is a Python function that scrapes product details from Flipkart's website and returns them
        in a dictionary format along with error_message.

        :param url: The URL of the product page on Flipkart's website that needs to be scraped for
        product details

        :type url: str

        :return: None, error_message if error occurs while getting soup of requested url
            else product_details, error_message

            error_message = {
                'message': '',
                'status' : reponse_status
            }

            :type product_details: dict
            :type error_message: dict

            product_details is a dictionary containing the scraped details of a
            product from Flipkart's website.
            The product_details consist of : 'Title', 'Price',
            'MRP', 'Currency', 'Availability', 'Rating', 'Rating_Count', 'Category', and 'Image_Link'.
        """

        soup, error_message = await get_soup(url=url)
        if soup is None:
            return None, error_message

        title = soup.find('span', {'class': 'B_NuCI'})
        if title:
            title = title.text.replace('\xa0\xa0', '').strip()

        price = soup.find('div', {'class': '_30jeq3 _16Jk6d'})
        currency = 'INR'
        if price is not None:
            price = price.text.strip()
            price = await get_clean_price(price=price)

        mrp = soup.find('div', {'class': '_3I9_wc _2p6lqe'})
        if mrp is not None:
            mrp = await get_clean_price(price=mrp.text)
        else:
            mrp = price

        availability = soup.find(class_='_1dVbu9')
        if availability is None:
            availability = 'In Stock'
        else:
            availability = 'Out of Stock'

        categories = soup.find_all('a', {'class': '_2whKao'})
        if categories:
            category = categories[1].text.strip() if len(
                categories) > 1 else categories[0].text.strip()
        else:
            category = "Not Found"

        rating_not_available_block = soup.find('span', {'class': '_2dMYsv'})
        if rating_not_available_block:
            rating = float(0)
            rating_count = float(0)
        else:
            rating = soup.find(class_='_3LWZlK')
            if rating:
                rating = float(rating.text.replace(',', '').strip())
            else:
                rating = float(0)

            rating_count = soup.find(class_='_2_R_DZ')
            if rating_count:
                if availability == 'In Stock':
                    rating_count = float(rating_count.span.text.replace(
                        'Ratings', '').replace(',', '').strip().split(' ', 1)[0])
                else:
                    rating_count = float(rating_count.text.replace(
                        'Ratings', '').replace(',', '').strip().split()[0])
            else:
                rating_count = float(0)

        try:
            img_link_tag = soup.find(class_='_396cs4 _2amPTt _3qGmMb')
        except:
            img_link_tag = soup.find(class_='_2r_T1I _396QI4')

        if img_link_tag is None:
            img_link_tag = soup.find('img', {'class': '_2r_T1I _396QI4'})

        if img_link_tag:
            img_link = img_link_tag.attrs['src']
        else:
            img_link = ''

        product = {
            'Title': title,
            'Price': price,
            'MRP': mrp,
            'Currency': currency,
            'Availability': availability,
            'Rating': rating,
            'Rating_Count': rating_count,
            'Category': category,
            'Image_Link': img_link,
            'Website': 'flipkart'
        }

        return product, error_message

    async def scrape_price(self, url: str) -> float:
        """
        This function scrapes the price of a product from a given Flipkart URL and returns it as a float.

        :param url: The URL of the Flipkart product whose price needs to be tracked
        :type url: str
        :return: None if some error occurs else the price of a product scraped from a given URL. The price is returned as a float
        value.
        """

        soup, _ = await get_soup(url=url)
        if soup is None:
            return None
        price = soup.find(class_='_30jeq3 _16Jk6d')
        if price is not None:
            price = await get_clean_price(price=price.text)

        return price


class Amazon:
    def __init__(self) -> None:
        pass

    async def scrape_product(self, url: str):
        """
        This is a Python function that scrapes product details from Amazon's website and returns them
        in a dictionary format along with error_message.

        :param url: The URL of the product page on Amazon's website that needs to be scraped for
        product details

        :type url: str

        :return: None, error_message if error occurs while getting soup of requested url
            else product_details, error_message

            error_message = {
                'message': '',
                'status' : reponse_status
            }

            :type product_details: dict
            :type error_message: dict

            product_details is a dictionary containing the scraped details of a
            product from Amazon's website.
            The product_details consist of : 'Title', 'Price',
            'MRP', 'Currency', 'Availability', 'Rating', 'Rating_Count', 'Category', and 'Image_Link'.
        """

        page, error_message = await get_soup(url=url)
        if page is None:
            return None, error_message

        title = page.find('span', {'id': 'productTitle'})
        if title is not None:
            title = title.text.strip()

        price = page.find('span', {'class': 'a-price-whole'})
        if price is not None:
            price = await get_clean_price(price=price.text)

        mrp_block = page.find(
            'span', {'class': 'a-size-small a-color-secondary aok-align-center basisPrice'})
        mrp = None
        if mrp_block is not None:
            mrp = mrp_block.find('span', {'class': 'a-price a-text-price'}).find(
                'span', {'class': 'a-offscreen'})
            if mrp is not None:
                mrp = await get_clean_price(price=mrp.text)
            else:
                mrp = price
        else:
            mrp = price

        currency = page.find('span', {'class': 'a-price-symbol'})
        if currency is not None:
            currency = currency.text.strip()
            currency = currencies[currency]
        else:
            # use default currency
            currency = 'INR'

        avalability_block = page.find('div', {'id': 'availability'})
        availability = None
        if avalability_block is not None:
            if avalability_block.find('span', {'class': 'a-color-success'}):
                availability = 'In Stock'
            else:
                availability = 'Out of Stock'
        else:
            availability = 'Out of Stock'

        categories_div = page.find(
            'div', {'id': 'wayfinding-breadcrumbs_feature_div'})
        if categories_div is not None:
            categories = categories_div.find(
                'ul', {'class': 'a-unordered-list a-horizontal a-size-small'})
            category = categories.find_all('li')[2].find('a').text.strip()
        else:
            category = 'Not Found'

        rating_block = page.find('div', {'id': 'averageCustomerReviews'})
        if rating_block is not None:
            rating = rating_block.find('span', {'class': 'a-icon-alt'})
            if rating:
                rating = float(rating.text.replace(
                    ',', '').strip().split(' ')[0])
        else:
            rating = float(0)

        rating_count = page.find('span', {'id': 'acrCustomerReviewText'})
        if rating_count is not None:
            rating_count = float(rating_count.text.replace(
                ',', '').strip().split(' ')[0])
        else:
            rating_count = float(0)

        img_link = page.find('img', {'id': 'landingImage'})
        if img_link is not None:
            img_link = img_link.attrs['src']
        else:
            img_link = None

        product = {
            'Title': title,
            'Price': price,
            'MRP': mrp,
            'Currency': currency,
            'Availability': availability,
            'Rating': rating,
            'Rating_Count': rating_count,
            'Category': category,
            'Image_Link': img_link,
            'Website': 'amazon'
        }

        return product, error_message

    async def scrape_price(self, url) -> float:
        '''
        Scrapes the price of product.
        params: url of product whose price to be tracked
        Returns: Price of the product at that particular time.
        '''
        page, _ = await get_soup(url=url)
        if page is None:
            return None

        price = page.find(class_='a-price-whole')
        if price is not None:
            price = await get_clean_price(price=price.text)

        return price


class Myntra:
    def __init__(self) -> None:
        pass

    async def scrape_product(self, url):
        """
        This is a Python function that scrapes product details from Myntra's website and returns them
        in a dictionary format along with error_message.

        :param url: The URL of the product page on Myntra's website that needs to be scraped for
        product details

        :type url: str

        :return: None, error_message if error occurs while getting soup of requested url
            else product_details, error_message

            error_message = {
                'message': '',
                'status' : reponse_status
            }

            :type product_details: dict
            :type error_message: dict

            product_details is a dictionary containing the scraped details of a
            product from Myntra's website.
            The product_details consist of : 'Title', 'Price',
            'MRP', 'Currency', 'Availability', 'Rating', 'Rating_Count', 'Category', and 'Image_Link'.
        """

        page, error_message = await get_soup(url=url)

        if page is None:
            return None, error_message

        try:
            # select the div containing all categories
            categories = page.find('div', {'class': 'breadcrumbs-container'})
            if categories is not None:
                category = categories.find_all('a', {'class': 'breadcrumbs-link'})[2].text if len(
                    categories) > 2 else categories.find_all('a', {'class': 'breadcrumbs-link'})[1].text
            else:
                category = 'Not Found'
        except Exception as e:
            print(f'Error while scraping category. {e}')

        try:
            # select the span containing MRP
            mrp = page.find('span', {'class': 'pdp-mrp'})
            currency = 'INR'
            if mrp is not None:
                mrp = mrp.find('s')
                mrp = await get_clean_price(mrp.text)
        except Exception as e:
            print(f'Error while scraping MRP. {e}')

        try:
            # select the image rating div
            rating_block = page.find('div', {'class': 'index-overallRating'})
            rating = float(0)
            rating_count = float(0)
            if rating_block is not None:
                # extract product rating and rating count
                rating = rating_block.find('div')
                rating = float(rating.text.replace(
                    ',', '').strip().split(' ')[0])

                rating_count = rating_block.find(
                    'div', {'class': 'index-ratingsCount'}).text.replace('Ratings', '').replace('Rating', '').strip()

                mul = 1
                if rating_count[-1] == 'k':
                    rating_count = rating_count[:-1]
                    mul = 1000
                rating_count = float(rating_count) * mul
        except Exception as e:
            print(f'Error while scraping rating {e}')

        data = await get_data_from_script_tag(page=page, tag_type="Product")
        try:
            title = data.get('name')
            img_link = data.get('image')
            price = float(data.get('offers', {}).get('price'))
            currency = data.get('offers', {}).get('priceCurrency')
            availability = data.get('offers', {}).get('availability')
            availability = 'In Stock' if availability == 'InStock' else 'Out of Stock'
        except Exception as e:
            print(f'Error while scraping using scripting tags. {e}')

            # Extract data using html tags
            title = page.find('h1', {'class': 'pdp-title'}).text.strip()
            name = page.find('h1', {'class': 'pdp-name'}).text.strip()
            title = title + ' ' + name
            price = page.find(
                'span', {'class': 'pdp-price'}).find('strong')
            if price is not None:
                if price.text.__contains__('€'):
                    currency = 'EURO'
                elif price.text.__contains__('$'):
                    currency = 'USD'

                price = await get_clean_price(price=price.text)

            img_div = page.find(
                'div', {'class': 'image-grid-image'}).get('style')
            img_link = img_div.replace(
                'background-image: url("', '').replace('");', '')

            availability_flag = page.find(
                'div', {'class': 'size-buttons-out-of-stock'})
            if availability_flag is not None:
                availability = 'Out of Stock'
            else:
                availability = 'In Stock'

        if mrp is None:
            mrp = price

        product = {
            'Title': title,
            'Price': price,
            'MRP': mrp,
            'Currency': currency,
            'Availability': availability,
            'Rating': rating,
            'Rating_Count': rating_count,
            'Category': category,
            'Image_Link': img_link,
            'Website': 'myntra'
        }

        return product, error_message

    async def scrape_price(self, url) -> float:
        '''
        Scrapes the price of product.
        params: url of product whose price to be tracked
        Returns: Price of the product at that particular time.
        '''
        page, _ = await get_soup(url=url)
        if page is None:
            return None

        data = await get_data_from_script_tag(page=page, tag_type="Product")
        price = None
        try:
            price = float(data.get('offers', {}).get('price'))
        except Exception as e:
            print(f'Error while scraping price. {e}')
            try:
                price = page.find(
                    'span', {'class': 'pdp-price'}).find('strong')
                if price is not None:
                    price = await get_clean_price(price=price.text)
            except Exception as e:
                print(f'Error while scraping price. {e}')
                price = None

        return price


class Ajio:
    def __init__(self) -> None:
        pass

    async def get_sale_price(self):
        """
        function to scrape sale price of a product on Ajio
        :return: None if sale price is not found else sale price (float)
        """
        try:
            sale_price = self.page.find(
                'div', {'class': 'promo-discounted-price pr-promotions'}).find_all('span')[1].text
            sale_price = await get_clean_price(sale_price)
        except Exception as e:
            print(f'Error while scraping sale price. {e}')
            try:
                sale_price = self.page.find(
                    'div', {'class': 'price-info ellipsis'})
                if sale_price.span:
                    sale_price.span.decompose()
                sale_price = await get_clean_price(price=sale_price.text)
            except Exception as e:
                print(f'Error while scraping sale price 2nd. {e}')
                sale_price = None

        return sale_price

    async def scrape_product(self, url):
        """
        This is a Python function that scrapes product details from Ajio's website and returns them
        in a dictionary format along with error_message.

        :param url: The URL of the product page on Ajio's website that needs to be scraped for
        product details

        :type url: str

        :return: None, error_message if error occurs while getting soup of requested url
            else product_details, error_message

            error_message = {
                'message': '',
                'status' : reponse_status
            }

            :type product_details: dict
            :type error_message: dict

            product_details is a dictionary containing the scraped details of a
            product from Ajio's website.
            The product_details consist of : 'Title', 'Price',
            'MRP', 'Currency', 'Availability', 'Rating', 'Rating_Count', 'Category', and 'Image_Link'.
        """

        page, error_message = await get_soup(url=url)
        if page is None:
            return None, error_message

        self.page = page

        sale_price = await self.get_sale_price()

        data = await get_data_from_script_tag(page=page, tag_type="ProductGroup")
        try:
            title = data.get('name')
            brand = data.get('brand', {}).get('name')
            title = brand + ' ' + title
            img_link = data.get('image')
            price = float(data.get('offers', {}).get('price'))
            currency = data.get('offers', {}).get('priceCurrency')
            availability = data.get('offers', {}).get(
                'availability').split('/')[-1]
            category = data.get('category').split('>')[-1].strip()
            availability = 'In Stock' if availability == 'InStock' or availability == 'LimitedAvailability' else 'Out of Stock'
        except Exception as e:
            print(f'Error while scraping using scripting tags. {e}')
            brand = page.find('h2', {'class': 'brand-name'}).text
            title = brand + ' ' + page.find('h1', {'class': 'prod-name'}).text
            price = page.find('div', {'class': 'prod-sp'}).text
            price = await get_clean_price(price)
            category = page.find('div', {'class': '  breadcrumb-section'}).find(
                'ul').find_all('li', {'class': 'breadcrumb-list'})[3].find('a').text
            availability = 'In Stock' if page.find(
                'div', {'class': 'btn-gold'}).find_all('span')[1].text == 'ADD TO BAG' else 'Out of Stock'

        try:
            img_link_blocks = page.find_all(
                'div', {'class': 'img-container'})
            for img_link_block in img_link_blocks:
                curr_img_link = img_link_block.find('img').attrs['src']
                if curr_img_link.__contains__('473Wx593H'):
                    img_link = curr_img_link
                    break
        except Exception as e:
            print(
                f'Error while fetching higher resolution image link. {e}. URL : {url}')

        try:
            mrp = page.find('span', {'class': 'prod-cp'}).text
            mrp = await get_clean_price(price=mrp)
        except:
            mrp = price

        if sale_price is not None and (price is None or sale_price < price):
            price = sale_price

        rating, rating_count = 0, 0
        product = {
            'Title': title,
            'Price': price,
            'MRP': mrp,
            'Currency': currency,
            'Availability': availability,
            'Rating': rating,
            'Rating_Count': rating_count,
            'Category': category,
            'Image_Link': img_link,
            'Website': 'ajio'
        }

        return product, error_message

    async def scrape_price(self, url):
        '''
        Scrapes the price of product.
        params: url of product whose price to be tracked
        Returns: Price of the product at that particular time, if not found then returns None
        '''

        page = await self.get_soup(url=url)
        self.page = page

        sale_price = await self.get_sale_price()

        try:
            price = page.find('div', {'class': 'prod-sp'}).text
            price = await get_clean_price(price)

            if sale_price is not None and (price is None or sale_price < price):
                price = sale_price

            return price
        except Exception as e:
            print(f'Error while scraping price {e}, URL : {url}')

        return None


class Scraper:
    def __init__(self) -> None:
        """
        This function initializes scraper objects for Flipkart, Amazon, Myntra & Ajio and maps their
        respective product and price scraper functions.
        """
        # create scraper objects for Flipkart and Amazon
        self.flipkart = Flipkart()
        self.amazon = Amazon()
        self.myntra = Myntra()
        self.ajio = Ajio()

        # map product scraper functions
        self.scraper_product_dict = {
            'flipkart': self.flipkart.scrape_product,
            'amazon': self.amazon.scrape_product,
            'myntra': self.myntra.scrape_product,
            'ajio': self.ajio.scrape_product
        }

        # map price scraper functions
        self.scraper_price_dict = {
            'flipkart': self.flipkart.scrape_price,
            'amazon': self.amazon.scrape_price,
            'myntra': self.myntra.scrape_price,
            'ajio': self.ajio.scrape_price
        }

    async def scrape_product(self, url: str) -> dict:
        """
        This is an asynchronous function that scrapes a product from a given URL using a scraper function
        based on the website domain.

        :param url: A string representing the URL of the product page to be scraped
        :type url: str
        :return: The function `scrape_product` returns the result of calling the appropriate scraper
        function for the given website URL. If the website is not supported, it returns a JSON error
        message.
        """

        url = url.replace(' ', '').strip()
        try:
            website = url.strip().split('/')[2].split('.')[1] if url.strip(
            ).split('/')[2].__contains__('www.') else url.strip().split('/')[2].split('.')[0]
            if website == 'ajio' and not url.strip().split('/')[2].__contains__('www.'):
                error_message = {
                    "message": "Ajioluxe is not supported! Please check back later.",
                    'status': 404
                }
                return None, error_message
        except Exception as e:
            print(
                f'Error while fetching website from url : {url}\nError : {e}')
            error_message = {
                "message": "Invalid URL!",
                'status': 404
            }
            return None, error_message

        try:
            # get the respective scraper function
            scraper_function = self.scraper_product_dict[website]
        except:
            error_message = {
                "message": "Entered website is not supported! Please check back later.",
                'status': 404
            }

            return None, error_message

        product_details, error_message = await scraper_function(url)

        return product_details, error_message

    async def scrape_price(self, url: str) -> float:
        """
        This function scrapes the price of a product from a given URL using a scraper function based on the
        website domain.

        :param url: A string representing the URL of a product page on an e-commerce website
        :type url: str
        :return: The function `scrape_price` returns a float value, which is the price scraped from the
        given URL.
        """
        url = url.strip()
        website = url.strip().split('/')[2].split('.')[1]
        try:
            scraper_function = self.scraper_price_dict.get(website)
        except:
            error_message = {
                "message": "Entered website is not supported now! Please check back later."
            }
            return jsonify(error_message)

        return await scraper_function(url)
