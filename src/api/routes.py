"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from flask_cors import CORS, cross_origin
from api.models import db, Users, Cards, Decks
from api.utils import generate_sitemap, APIException
from api.scryfallApiUtils import ScryfallAPIUtils

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/addcard', methods=['POST'])
@cross_origin()
def handle_add():
    data = request.json
    card_entry = ScryfallAPIUtils.create_db_card(data)
    
    Cards.create(
        card_entry["name"],
        card_entry["card_type"], 
        card_entry["mana_cost"],
        card_entry["cmc"],
        card_entry["rules_text"],
        card_entry["legalities"],
        card_entry["flavor_text"],
        card_entry["artist"],
        card_entry["image_uri"]
    )

    response = {
        "message": f'{card_entry["name"]} added to db',
        "type": card_entry["card_type"],
        "mana cost": card_entry["mana_cost"],
        "rules text": card_entry["rules_text"],
        "flavor text": card_entry["flavor_text"]
    }

    return jsonify(response), 200