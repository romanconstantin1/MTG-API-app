from flask import Flask, request, jsonify, url_for, Blueprint
from flask_cors import CORS, cross_origin
from api.models import db, Users, Cards, Decks, cards_in_decks
# from api.utils import generate_sitemap, APIException
from api.scryfallApiUtils import ScryfallAPIUtils

decks_api = Blueprint('decks_api', __name__)

@decks_api.route('/add_deck', methods=['POST'])
@cross_origin()
def handle_add():
    deck_entry = request.json
    print(deck_entry)
    Decks.create(
        deck_entry['deckname'],
        deck_entry['format']
    )

    response = {
        'message': f'{deck_entry["deckname"]} added to db'
    }
    return jsonify(response), 200

@decks_api.route('/delete_deck/<int:id>', methods=['DELETE'])
def deck(id):
    deck = Decks.query.get(id)
    if deck == None:
        return jsonify({'msg': 'Deck not found'}), 404

    deck.remove()
    response = {'msg': 'Deck deleted'}
    return jsonify(response), 200

@decks_api.route('/decks', methods=['GET'])
@cross_origin()
def handle_cards():
    decks = Decks.read_all()
    decks_list = list(map(lambda deck: deck.serialize(), decks))

    response = {
        'saved_decks': decks_list
    }

    return jsonify(response), 200

@decks_api.route('/decks/add_card/', methods=['PUT'])
@cross_origin()
def handle_add_to_deck():
    data = request.get_json()
    print(data)
    deck_id = data.get('deck_id')
    card_id = data.get('card_id')

    deck = Decks.query.get(deck_id)
    card = Cards.query.get(card_id)
    quantity = data.get('quantity', 1)

    if deck is not None and card is not None:
        deck.add_card(card, deck, quantity)
        return jsonify('Card added to the deck successfully.'), 200
    else:
        return jsonify('Card or deck not found.'), 400
    
@decks_api.route('/decks/delete_card', methods=['DELETE'])
@cross_origin()
def handle_remove_from_deck():
    data = request.get_json()

    print(data)

    deck_id = data.get('deck_id')
    card_id = data.get('card_id')

    deck = Decks.query.get(deck_id)
    card = Cards.query.get(card_id)
    quantity = data.get('quantity', 1)

    return jsonify('Card removed from deck'), 200
    
@decks_api.route('/decks/change_card_qty', methods=['PUT'])
@cross_origin()
def handle_change_card_qty():
    data = request.get_json()
    print(data)
    deck_id = data.get('deck_id')
    card_id = data.get('card_id')
    quantity = data.get('quantity')

    deck = Decks.query.get(deck_id)
    card = Cards.query.get(card_id)
    
    if deck is not None and card is not None:
        deck.change_card_qty(card, deck, quantity)
        return jsonify('Card quantity changed successfully.'), 200
    else:
        return jsonify('Card or deck not found.'), 400