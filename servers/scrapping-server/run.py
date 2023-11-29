import asyncio
import logging
from apscheduler.schedulers.background import BackgroundScheduler
from app import create_app

# create instances
app = create_app()

from app.product.trackers import Tracker
tracker = Tracker() 

from app.product.scrapers import Scraper
scraper = Scraper()

def call_tracker():
    asyncio.run(tracker.track_price())

# configure logging
logging.basicConfig(
    filename='scraping_server.log', 
    filemode='w', 
    level=logging.INFO
)

# scheduler to call price_tracker after a certain time interval
scheduler = BackgroundScheduler()
scheduler.add_job(call_tracker, 'interval',
                  hours=2, misfire_grace_time=1)
scheduler.start()


if __name__ == "__main__":
    try:
        logging.info("Started the server...")
        app.run(debug=False)
    except (KeyboardInterrupt, SystemExit):
        tracker.free_resources()
        scheduler.shutdown()
    finally:
        tracker.free_resources()
        scheduler.shutdown()
