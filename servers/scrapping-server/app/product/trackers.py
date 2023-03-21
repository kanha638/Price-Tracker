import atexit
import traceback
import asyncio
import psycopg2 as pg
from app.product.scrapers import Scraper
from datetime import datetime
import uuid
from app.creds import DATABASE_URL


class Tracker:
    def __init__(self) -> None:
        # create scraper object
        self.scraper = Scraper()

        # connect to db
        try:
            self.conn = pg.connect(DATABASE_URL)
        except Exception:
            traceback.print_exc()

        # register a clean up function to be called on exit
        atexit.register(self.free_resources)

    def free_resources(self):
        # close the connection to db
        self.conn.close()

    async def scrape_all_urls(self, urls):
        tasks = []
        for url in urls:
            task = asyncio.create_task(self.scraper.scrape_price(url))
            tasks.append(task)

        prices = await asyncio.gather(*tasks)
        return prices

    async def track_price(self):
        # First fetch the data from db
        cursor = self.conn.cursor()
        cursor.execute(
            'SELECT id, current_price, product_link FROM "Products"')
        urls, old_prices, ids = [], [], []
        for row in cursor.fetchall():
            id, price, url = row
            ids.append(id)
            urls.append(url)
            old_prices.append(price)

        # Scrape the new price and update in db if new price is not equal to old price
        batch_size = 100
        cursor = self.conn.cursor()
        for i in range(0, len(urls), batch_size):
            urls_batch = urls[i: i + batch_size]

            new_prices = await self.scrape_all_urls(urls=urls_batch)
            for j in range(i, i + len(urls_batch)):
                if new_prices[j - i] != old_prices[j]:
                    formatted_time = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

                    try:
                        cursor.execute(
                            'INSERT INTO "PriceAlter" ("id", "price", "date", "productsId") VALUES (%s, %s, %s, %s)', (str(uuid.uuid4()), str(new_prices[j - i]), str(formatted_time), str(ids[j]),))
                    except:
                        # handle the error
                        pass

                    try:
                        cursor.execute(
                            'UPDATE "Products" SET current_price = %s WHERE id = %s',
                            (str(new_prices[j - i]), str(ids[j]),))
                    except:
                        # handle the error
                        pass

        self.conn.commit()

        cursor.close()
