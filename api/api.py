from flask import Flask,jsonify, request
# from app_config import app
from flask_cors import CORS
import stocks_requests as rq
import json
import jwt
from functools import wraps
from db import add_user, validate_password,save_grid_elements,get_grid_elements,save_tickers,get_tickers, get_grids_identifiers
#--------
import os

from flask import Flask
import configparser
from factory import create_app

config = configparser.ConfigParser()
config.read(os.path.abspath(os.path.join(".ini")))

# Setup Flask-Security


app = create_app()
# Create a user to test with
# @app.before_first_request
# def create_user():
#     if not user_datastore.find_user(email="test@me.com"):
#         user_datastore.create_user(email="test@me.com", password=hash_password("password"))
#     db_session.commit()

# @app.before_first_request
# def initial_setup():
#     #possible exchanges: https://docs.google.com/spreadsheets/d/1I3pBxjfXB056-g_JYf_6o3Rns3BV2kMGG1nCatb91ls/edit#gid=0
#     save_tickers('SA')
#     save_tickers('US')
#     save_tickers('F')
#     save_tickers('PA')

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        # token = request.args.get('token') #http://127.0.0.1:5000/route?token=alshfjfjdklsfj89549834ur
        token = request.headers.get('Authorization').split(" ")[1] if request.headers.get('Authorization') else None 
        if not token:
            return jsonify({'message' : 'Token is missing!'}), 403
        try: 
            data = jwt.decode(token, app.config['SECRET_KEY'],algorithms=["HS256"])
        except jwt.exceptions.ExpiredSignatureError:
            return jsonify({'message' : 'Token is expired!'}), 401
        except:
            # print("ERROR",sys.exc_info()[0])
            return jsonify({'message' : 'Token is invalid!'}), 401

        return f(*args, **kwargs)

    return decorated

# @app.route('/api/login', methods=['GET', 'POST'])
# def login():
#     print("data",request.get_json())
#     data = json.loads(request.get_json()['data'])
#     print("data",data)
#     # auth = request.authorization
#     user = user_datastore.find_user(email= data['email'])
#     if user:
#         if(verify_and_update_password(data['password'],user )):
#             token = jwt.encode({'user' : data['email'], 
#                 'exp' : datetime.datetime.utcnow() + datetime.timedelta(minutes=10)},
#                 app.config['SECRET_KEY'], algorithm="HS256")
#             print("Logged as ", data['email'])
#             return jsonify({'token' : token})

    
#     return make_response('Could not verify!', 401, {'WWW-Authenticate' : 'Basic realm="Login Required"'})

@app.route('/api/login', methods=['GET', 'POST'])
def login():
    # print("data",request.get_json())
    data = json.loads(request.get_json()['data'])
    print("EM PASS",data.get('user'), data.get('password'))
    res = validate_password(data.get('user'), data.get('password'))
    return res
    
    # if user:
    #     if(verify_and_update_password(data['password'],user )):
    #         token = jwt.encode({'user' : data['email'], 
    #             'exp' : datetime.datetime.utcnow() + datetime.timedelta(minutes=10)},
    #             app.config['SECRET_KEY'], algorithm="HS256")
    #         print("Logged as ", data['email'])
    #         return jsonify({'token' : token})
    # return make_response('Could not verify!', 401, {'WWW-Authenticate' : 'Basic realm="Login Required"'})
    # return jsonify({'token' : jwt.encode({'user' : 'test@me.com', 
    #                 'exp' : datetime.datetime.utcnow() + datetime.timedelta(minutes=10)},
    #                 app.config['SECRET_KEY'], algorithm="HS256")})




@app.route('/api/post_grid_elements', methods=['GET', 'POST'])
def post_grid_elements():
    # print("data",request.get_json())
    data = json.loads(request.get_json()['data'])
    save_grid_elements(data.get('id'), data.get('user'), data.get('grid'), data.get('layout'))
    # res = validate_password(data.get('user'), data.get('password'))
    return jsonify({"msg":"ok"})

@app.route('/api/get_grid_elements', methods=['GET','POST'])
def get_grid_elements_():
    user = json.loads(request.get_json()['data'])['user']
   
    return jsonify(get_grid_elements(user))


@app.route('/api/add_user', methods=['GET','POST'])
def add_user_():
    data = json.loads(request.get_json()['data'])
    print(data)
    res = add_user("test", data.get('email'), data.get('password'))
    return jsonify(res)                   
    


@app.route('/api/getTickers/', methods=['GET'])
# @token_required
def get_tickers_():

    page = int(request.args.get('page'))
    search = request.args.get('search')
    exchange = request.args.get('exchange')
    print("get_live_price", page, search,exchange)
    return jsonify(get_tickers(page,exchange,search))

@app.route('/api/getUserIdentifiers/', methods=['GET'])
# @token_required
def get_grids_identifiers_():

    user = request.args.get('user')
    return get_grids_identifiers(user)

@app.route('/api/priceData/', methods=['GET'])
# @token_required
def get_price_data():
    tick = request.args.get('tick')
    period = request.args.get('period')
    print("get_live_price", tick,period, request.args)
    return rq.get_price_data(tick,period)


@app.route('/api/dividendData/', methods=['GET'])
# @token_required
def get_dividend_data():
    tick = request.args.get('tick')
    period = request.args.get('period')
    print("dividendData", tick,period)
    return rq.get_dividend_data(tick,period)


@app.route('/api/price/')
@token_required
def get_live_price():
    headers = request.headers
    tick = request.args.get('tick')
    print("get_live_price")
    return rq.get_live_price(tick)

@app.route('/api/analyst-info/')
@token_required
def get_analysts_info():
    tick = request.args.get('tick')
    print("get_current_time")
    return rq.get_analysts_info(tick)

@app.route('/api/data/')
@token_required
def get_data():
    tick = request.args.get('tick')
    print("get data")
    return rq.get_data(tick)

@app.route('/api/dividends/')
@token_required
def get_dividends():
    tick = request.args.get('tick')
    print("get_dividends")
    return rq.get_dividends(tick)

@app.route('/api/quote_data/')
# @token_required
def get_quote_data():
    tick = request.args.get('tick')
    print("get_quote_data")
    return jsonify(rq.get_quote_data(tick))

@app.route('/api/get_user_data/')
@token_required
def get_user_data():
    email = request.args.get('email')
    user = user_datastore.find_user(email=email)
    print("get_user_data", user.email,user.username)
    return jsonify({'ok': 'ok'})

@app.route('/api/get_earnings_history/')
@token_required
def get_earnings_history():
    tick = request.args.get('tick')
    print("get_earns_history",tick)
    return jsonify(rq.get_earnings_history_(tick))



if __name__ == '__main__':
    
    app.config['DEBUG'] = True
    app.config['MFLIX_DB_URI'] = config['PROD']['MFLIX_DB_URI']
    app.config['MFLIX_NS'] = config['PROD']['MFLIX_NS']
    app.config['SECRET_KEY'] = config['PROD']['SECRET_KEY']
    app.config['DEBUG'] = True
    # app.config['SECRET_KEY'] = os.environ.get("SECRET_KEY", 'pf9Wkove4IKEAXvy-cQkeDPhv9Cb3Ag-wyJILbq_dFw')
    app.config['SECURITY_PASSWORD_SALT'] = os.environ.get("SECURITY_PASSWORD_SALT", '146585145368132386173505678016728509634')
    CORS(app, origins = "http://localhost:3000")
    app.run(host="0.0.0.0", port=5000, debug=True)
    # socketio.run(app,port=5000, host='0.0.0.0')

# if __name__ == "__main__":
#   serve(app, host='0.0.0.0', port=8081)