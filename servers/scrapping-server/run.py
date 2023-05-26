from app.product.trackers import Tracker
from app import create_app
from apscheduler.schedulers.background import BackgroundScheduler
import asyncio


app = create_app()
tracker = Tracker() 


def call_tracker():
    asyncio.run(tracker.track_price())


# scheduler to call price_tracker after a certain time interval
scheduler = BackgroundScheduler()
scheduler.add_job(call_tracker, 'interval',
                  hours=2, misfire_grace_time=1)
scheduler.start()


if __name__ == "__main__":
    try:
        app.run(debug=False)
    except (KeyboardInterrupt, SystemExit):
        tracker.free_resources()
        scheduler.shutdown()
    finally:
        tracker.free_resources()
        scheduler.shutdown()
