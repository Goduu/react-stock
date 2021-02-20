import time
from flask import Flask,jsonify, request
from app_config import app
from flask_cors import CORS, cross_origin
import stocks_requests as rq

CORS(app, resources={r'/*': {'origins': '*'}})


@app.route('/api/price/')
@cross_origin()
def get_live_price():
    tick = request.args.get('tick')
    print("get_live_price")
    return rq.get_live_price(tick)

@app.route('/api/analyst-info/')
@cross_origin()
def get_analysts_info():
    tick = request.args.get('tick')
    print("get_current_time")
    return rq.get_analysts_info(tick)

@app.route('/api/data/')
@cross_origin()
def get_data():
    tick = request.args.get('tick')
    print("get data")
    return rq.get_data(tick)

@app.route('/api/dividends/')
@cross_origin()
def get_dividends():
    tick = request.args.get('tick')
    print("get_dividends")
    return rq.get_dividends(tick)

@app.route('/api/quote_data/')
@cross_origin()
def get_quote_data():
    tick = request.args.get('tick')
    print("get_quote_data")
    return rq.get_quote_data(tick)



if __name__ == '__main__':
    app.run(host="0.0.0.0", port="5000", debug=True)
    # socketio.run(app,port=5000, host='0.0.0.0')

# if __name__ == "__main__":
#   serve(app, host='0.0.0.0', port=8081)