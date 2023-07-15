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

    users = Users.read_all()
    users_list = list(map(lambda user: user.serialize(), users))

    if any(u['username'] == new_user['username'] for u in users_list):
        return jsonify({'msg': f'The username {new_user["username"]} is already in use'}), 400
    elif any(u['email'] == new_user['email'] for u in users_list):
        return jsonify({'msg':'The email provided is already in use'}), 400
    else:
        Users.create(
            new_user['username'],
            new_user['firstname'],
            new_user['email'],
            new_user['password']
        )

        response = {
            'msg': f'new user {new_user["username"]} created'
        }
        return jsonify(response), 200