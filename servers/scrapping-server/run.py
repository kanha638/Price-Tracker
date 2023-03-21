import asyncio
from apscheduler.schedulers.background import BackgroundScheduler
from app import create_app
from app.product.trackers import Tracker

tracker = Tracker()


def call_tracker():
    asyncio.run(tracker.track_price())


app = create_app()
scheduler = BackgroundScheduler()
scheduler.add_job(call_tracker, 'interval',
                  minutes=1, misfire_grace_time=1)
scheduler.start()

if __name__ == "__main__":
    try:
        app.run(debug=False, port=8080)
    except (KeyboardInterrupt, SystemExit):
        tracker.free_resources()
        scheduler.shutdown()
    finally:
        tracker.free_resources()
        scheduler.shutdown()
