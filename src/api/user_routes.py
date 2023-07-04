from flask import Flask, request, jsonify, url_for, Blueprint
from flask_cors import CORS, cross_origin
from api.models import db, Users, Cards, CardSides, Decks
# from api.utils import generate_sitemap, APIException
from api.scryfallApiUtils import ScryfallAPIUtils

users_api = Blueprint('users_api', __name__)

@users_api.route('/create_new_user', methods=['POST'])
@cross_origin()
def handle_add():
    new_user = request.json
    print(new_user)
    Users.create(
        new_user['username'],
        new_user['firstname'],
        new_user['email'],
        new_user['password']
    )

    response = {
        'message': f'new user {new_user["username"]} created'
    }
    return jsonify(response), 200