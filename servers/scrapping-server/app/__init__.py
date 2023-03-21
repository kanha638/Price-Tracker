from flask import Flask


def create_app():
    app = Flask(__name__)

    # register the blueprints
    from app.main.routes import main
    from app.product.routes import product
    app.register_blueprint(main)
    app.register_blueprint(product)

    return app
