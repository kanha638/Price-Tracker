from app import app

@app.route('/')
def index():
    return "Hello world"

@app.route('/hii')
def func():
    return "Hii this is kanha tiwari"