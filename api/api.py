import time
from flask import Flask,jsonify, request, make_response
# from app_config import app
from flask_cors import CORS, cross_origin
import stocks_requests as rq
import jwt 
import datetime
import json
from functools import wraps
import sys

#--------
import os

from flask import Flask, render_template_string
from flask_security import Security, current_user, auth_required, \
     SQLAlchemySessionUserDatastore
from flask_security.utils import hash_password, verify_and_update_password
from database import db_session, init_db
from models import User, Role

# Create app
app = Flask(__name__)
app.config['DEBUG'] = True

# Generate a nice key using secrets.token_urlsafe()
app.config['SECRET_KEY'] = os.environ.get("SECRET_KEY", 'pf9Wkove4IKEAXvy-cQkeDPhv9Cb3Ag-wyJILbq_dFw')
# Bcrypt is set as default SECURITY_PASSWORD_HASH, which requires a salt
# Generate a good salt using: secrets.SystemRandom().getrandbits(128)
app.config['SECURITY_PASSWORD_SALT'] = os.environ.get("SECURITY_PASSWORD_SALT", '146585145368132386173505678016728509634')

# Setup Flask-Security
user_datastore = SQLAlchemySessionUserDatastore(db_session, User, Role)
security = Security(app, user_datastore)


# Create a user to test with
@app.before_first_request
def create_user():
    init_db()
    print("Inicio")
    if not user_datastore.find_user(email="test@me.com"):
        print("Inicio")
        user_datastore.create_user(email="test@me.com", password=hash_password("password"))
    db_session.commit()

#----------------------


CORS(app, resources={r'/*': {'origins': '*'}})



def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.args.get('token') #http://127.0.0.1:5000/route?token=alshfjfjdklsfj89549834ur

        if not token:
            return jsonify({'message' : 'Token is missing!'}), 403

        try: 
            data = jwt.decode(token, app.config['SECRET_KEY'],algorithms=["HS256"])
        except jwt.exceptions.ExpiredSignatureError:
            print("ALCAPAHA ERROR")
            return jsonify({'message' : 'Token is expired!'}), 403
        except:
            print("ERROR",sys.exc_info()[0])
            return jsonify({'message' : 'Token is invalid!'}), 403

        return f(*args, **kwargs)

    return decorated

@app.route('/api/login', methods=['GET', 'POST'])
@cross_origin()
def login():
    print("data",request.get_json())
    data = json.loads(request.get_json()['data'])
    print("data",data)
    # auth = request.authorization
    user = user_datastore.find_user(email= data['email'])
    if user:
        if(verify_and_update_password(data['password'],user )):
            token = jwt.encode({'user' : data['email'], 
                'exp' : datetime.datetime.utcnow() + datetime.timedelta(minutes=1)},
                app.config['SECRET_KEY'], algorithm="HS256")
            print("Logged as ", data['email'])
            return jsonify({'token' : token})

    
    return make_response('Could not verify!', 401, {'WWW-Authenticate' : 'Basic realm="Login Required"'})

    # if auth and auth.password == 'secret':
    # token = jwt.encode({'user' : auth.email, 'exp' : datetime.datetime.utcnow() + datetime.timedelta(seconds=15)}, app.config['SECRET_KEY'])



@app.route('/api/price/')
@cross_origin()
@token_required
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