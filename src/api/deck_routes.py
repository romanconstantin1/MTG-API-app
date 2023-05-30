from flask import Flask, request, jsonify, url_for, Blueprint
from flask_cors import CORS, cross_origin
from api.models import db, Users, Cards, Decks
# from api.utils import generate_sitemap, APIException
from api.scryfallApiUtils import ScryfallAPIUtils

decks_api = Blueprint('decks_api', __name__)

@decks_api.route('/add_deck', methods=['POST'])
@cross_origin()
def handle_add():
    deck_entry = request.json
    print(deck_entry)
    Decks.create(
        deck_entry["deckname"],
        deck_entry["format"]
    )

    response = {
        "message": f'{deck_entry["deckname"]} added to db'
    }
    return jsonify(response), 200

@decks_api.route("/delete_deck/<int:id>", methods=["DELETE"])
def deck(id):
    deck = Decks.query.get(id)
    if deck == None:
        return jsonify({"msg": 'Deck not found'}), 404

    deck.remove()
    response = {"msg": 'Deck deleted'}
    return jsonify(response), 200

@decks_api.route('/decks', methods=['GET'])
@cross_origin()
def handle_cards():
    decks = Decks.read_all()
    decks_list = list(map(lambda deck: deck.serialize(), decks))

    response = {
        "saved_decks": decks_list
    }

    return jsonify(response), 200