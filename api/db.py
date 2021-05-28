

from flask import current_app, g, make_response, jsonify
from werkzeug.local import LocalProxy

from pymongo import MongoClient, DESCENDING, ASCENDING
from pymongo.write_concern import WriteConcern
from pymongo.errors import DuplicateKeyError, OperationFailure, WTimeoutError
from bson.objectid import ObjectId
from bson.errors import InvalidId
from pymongo.read_concern import ReadConcern
import jwt 
import datetime


def get_db():
    """
    Configuration method to return db instance
    """
    db = getattr(g, "_database", None)
    MFLIX_DB_URI = current_app.config["MFLIX_DB_URI"]
    MFLIX_DB_NAME = current_app.config["MFLIX_NS"]
    if db is None:

        """
        Ticket: Connection Pooling

        Please change the configuration of the MongoClient object by setting the
        maximum connection pool size to 50 active connections.
        """

        """
        Ticket: Timeouts

        Please prevent the program from waiting indefinitely by setting the
        write concern timeout limit to 2500 milliseconds.
        """
        db = g._database = MongoClient(
        MFLIX_DB_URI,
        maxPoolSize=50,
        wTimeout = 2500
        # TODO: Connection Pooling
        # Set the maximum connection pool size to 50 active connections.
        # TODO: Timeouts
        # Set the write timeout limit to 2500 milliseconds.
        )[MFLIX_DB_NAME]
    return db


# Use LocalProxy to read the global db instance with just `db`
db = LocalProxy(get_db)

# def initial_setup():
    
#     db.users.createIndex( { "email": 1 }, { 'unique': True } )


def get_user(email):
    """
    Given an email, returns a document from the `users` collection.
    """
    
    return db.users.find_one({ "email": email })

def validate_password(email, password):
    """
    Given an email and a passowrd validates the par.
    """
    print("----------",email,password)
    user = get_user(email)
    print("O QUE VEM DO USER",user)
    if(user):
        if(user['password'] == password):
            token = jwt.encode({'user' : user['email'], 
                        'exp' : datetime.datetime.utcnow() + datetime.timedelta(minutes=10)},
                        "app.config['SECRET_KEY']", algorithm="HS256")
            resp = login_user(email, token)
            print("Respo do login", resp)
            return jsonify({'token' : token, 'roles': user['roles']})
        else:
            return make_response('Could not verify!', 401, {'WWW-Authenticate' : 'Basic realm="Login Required"'})
    else:
        return make_response('Could not verify!', 401, {'WWW-Authenticate' : 'Basic realm="Login Required"'})

def save_grid_elements(identifier, user, grid_elements, layout):
    _grid_elements = []

    for g in grid_elements:
        print("99999999999999999999999999- g",g)
        _grid_elements.append({
            'type': g['type'],
            'layout': [l for l in layout if l['i'] == g['id']][0],
            'params': g['params'],
        })
    resp = db.grids.update_one(
                    { "user": user, "identifier": identifier },
                    { "$set": { "grid_elements": _grid_elements } },
                    upsert = True
                )

def get_grid_elements(user):

    resp = db.grids.find_one(
        {"user": "user@test.com"}
    )
    grid_elements = []
    layout = []
    for g in resp.get('grid_elements'):
        print("******************xxxxxxxxxxxxxxxxx", g)
        grid_elements.append({
            'id': g['layout']['i'],
            'type': g['type'],
            'params': g['params']
        })
        layout.append(g['layout'])

    # identifier, user, grid_elements, layout
    identifier = resp['identifier']
    resp.get('grid_elements')
    return ({'identifier': identifier,
            'user': user,
            'grid_elements': grid_elements,
            'layout': layout})
    
def add_user(name, email, hashedpw):
    """
    Given a name, email and password, inserts a document with those credentials
    to the `users` collection.
    """

    """
    Ticket: Durable Writes

    Please increase the durability of this method by using a non-default write
    concern with ``insert_one``.
    """

    try:
        # TODO: User Management
        # Insert a user with the "name", "email", and "password" fields.
        # TODO: Durable Writes
        # Use a more durable Write Concern for this operation.
        user = {
            "name": name,
            "email": email,
            "password": hashedpw,
            "roles": ['user']
            }
        db.users.with_options(write_concern=WriteConcern(w="majority")).insert_one(user)
        return {"success": True}
    except DuplicateKeyError:
        return {"error": "A user with the given email already exists."}


def login_user(email, jwt):
    """
    Given an email and JWT, logs in a user by updating the JWT corresponding
    with that user's email in the `sessions` collection.

    In `sessions`, each user's email is stored in a field called "user_id".
    """
    try:
       
        resp = db.sessions.update_one(
                    { "user_id": email },
                    { "$set": { "jwt": jwt } },
                    upsert = True
                )
        
        if(resp.acknowledged):
            return {"success": True}
        else:
            return {"success": False}
    except Exception as e:
        return {"error": e}


def logout_user(email):
    """
    Given a user's email, logs out that user by deleting their corresponding
    entry in the `sessions` collection.

    In `sessions`, each user's email is stored in a field called "user_id".
    """
    try:
        # TODO: User Management
        # Delete the document in the `sessions` collection matching the email.
        db.sessions.delete_one({ "user_id": email })
        return {"success": True}
    except Exception as e:
        return {"error": e}


def get_user_session(email):
    """
    Given a user's email, finds that user's session in `sessions`.

    In `sessions`, each user's email is stored in a field called "user_id".
    """
    try:
        # TODO: User Management
        # Retrieve the session document corresponding with the user's email.
        return db.sessions.find_one({ "user_id": email })
    except Exception as e:
        return {"error": e}


def delete_user(email):
    """
    Given a user's email, deletes a user from the `users` collection and deletes
    that user's session from the `sessions` collection.
    """
    try:
        # TODO: User Management
        # Delete the corresponding documents from `users` and `sessions`.
        db.sessions.delete_one({ "email": email })
        db.users.delete_one({ "email": email })
        if get_user(email) is None:
            return {"success": True}
        else:
            raise ValueError("Deletion unsuccessful")
    except Exception as e:
        return {"error": e}
