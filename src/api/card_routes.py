from flask import Flask, request, jsonify, url_for, Blueprint
from flask_cors import CORS, cross_origin
from api.models import db, Users, Cards, Decks
# from api.utils import generate_sitemap, APIException
from api.scryfallApiUtils import ScryfallAPIUtils

cards_api = Blueprint('cards_api', __name__)

@cards_api.route('/add_card', methods=['POST'])
@cross_origin()
def handle_add():
    data = request.json
    
    card_entry = ScryfallAPIUtils.create_db_card(data)
    print(card_entry)
    card_in_db = Cards.create(
        card_entry["name"],
        card_entry["card_type"], 
        card_entry["mana_cost"],
        card_entry["cmc"],
        card_entry["oracle_text"],
        card_entry["legalities"],
        card_entry["is_restricted"],
        card_entry["flavor_text"],
        card_entry["artist"],
        card_entry["image_uri_small"],
        card_entry["image_uri_normal"]
    )

    response = {
        "artist": card_entry["artist"],
        "card_type": card_entry["card_type"], 
        "cardname": card_entry["name"],
        "id": card_in_db.id,
        "image_normal": card_entry["image_uri_normal"],
        "image_small": card_entry["image_uri_small"],
        "legalities": card_entry["legalities"],
        "is_restricted": card_entry["is_restricted"],
        "type": card_entry["card_type"],
        "mana_cost": card_entry["mana_cost"],
        "oracle_text": card_entry["oracle_text"],
        "flavor_text": card_entry["flavor_text"]
    }

    return jsonify(response), 200

@cards_api.route("/delete_card/<int:id>", methods=["DELETE"])
def remove_card(id):
    card = Cards.query.get(id)
    if card == None:
        return jsonify({"msg": 'Card not found'}), 404

    card.remove()
    response = {"msg": 'Card deleted'}
    return jsonify(response), 200

@cards_api.route('/cards', methods=['GET'])
@cross_origin()
def handle_cards():
    cards = Cards.read_all()
    cards_list = list(map(lambda card: card.serialize(), cards))

    response = {
        "saved_cards": cards_list
    }

    return jsonify(response), 200
