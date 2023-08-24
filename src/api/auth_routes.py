from flask import Flask, request, jsonify, url_for, Blueprint
from flask_cors import CORS, cross_origin
from flask_jwt_extended import create_access_token, create_refresh_token, jwt_required, get_jwt_identity
from api.models import db, Users, Cards, CardSides, Decks
# from api.utils import generate_sitemap, APIException
from api.scryfallApiUtils import ScryfallAPIUtils

auth_api = Blueprint('auth_api', __name__)

@auth_api.route('/token_auth', methods=['POST'])
@cross_origin()
def handle_token_create():
    username = request.json.get("username", None)
    password = request.json.get("password", None)

    user = Users.query.filter_by(username=username, password=password).first()
    if user is None:
        return jsonify({"msg": "Bad username or password"}), 401

    access_token = create_access_token(identity=user.id)
    refresh_token = create_refresh_token(identity=user.id)
    
    return jsonify({ 
        "jwt_token": access_token, 
        "refresh_token": refresh_token, 
        "user_id": user.id, 
        "username": user.username})

@auth_api.route('/refresh_token', methods=['POST'])
@cross_origin()
@jwt_required(refresh=True)
def handle_token_refresh():
    current_user = get_jwt_identity()
    user = Users.query.get(current_user)
    
    new_access_token = create_access_token(identity=current_user)
    new_refresh_token = create_refresh_token(identity=current_user)
    
    return jsonify({ 
        "jwt_token": new_access_token, 
        "refresh_token": new_refresh_token, 
        "user_id": user.id, 
        "username": user.username
        })