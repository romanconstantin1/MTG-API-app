from flask import Flask, request, jsonify, url_for, Blueprint
from flask_cors import CORS, cross_origin
from flask_jwt_extended import jwt_required, get_jwt_identity
from api.models import db, Users, Cards, Decks, cards_in_decks, cards_in_sideboards
# from api.utils import generate_sitemap, APIException
from api.scryfallApiUtils import ScryfallAPIUtils

decks_api = Blueprint('decks_api', __name__)

@decks_api.route('/add_deck', methods=['POST'])
@jwt_required()
@cross_origin()
def handle_add():
    data = request.get_json()
    deck_name = data.get('deckname')
    deck_format = data.get('format')
    user_id = data.get('user_id')
    
    Decks.create(
        deck_name,
        deck_format,
        user_id
    )

    response = {
        'msg': f'{deck_name} added to db'
    }
    return jsonify(response), 200

@decks_api.route('/delete_deck/<int:id>', methods=['DELETE'])
@jwt_required()
def deck(id):
    deck = Decks.query.get(id)
    if deck == None:
        return jsonify({'msg': 'Deck not found'}), 404

    deck.remove()
    response = {'msg': 'Deck deleted'}
    return jsonify(response), 200

@decks_api.route('/decks', methods=['GET'])
@jwt_required()
@cross_origin()
def handle_cards():
    user_id = get_jwt_identity()
    decks = Decks.query.filter_by(user_id=user_id).all()
    decks_list = list(map(lambda deck: deck.serialize(), decks))

    response = {
        'saved_decks': decks_list
    }

    return jsonify(response), 200

@decks_api.route('/decks/add_card/', methods=['PUT'])
@cross_origin()
def handle_add_to_deck():
    data = request.get_json()
    deck_id = data.get('deck_id')
    card_id = data.get('card_id')
    quantity = data.get('quantity')

    deck = Decks.query.get(deck_id)
    card = Cards.query.get(card_id)
    

    if deck is not None and card is not None:
        deck.add_card(card, quantity)
        return jsonify({'msg': 'Card added to the deck successfully.'}), 200
    else:
        return jsonify({'msg': 'Card or deck not found.'}), 400
    
@decks_api.route('/decks/delete_card', methods=['DELETE'])
@cross_origin()
def handle_remove_from_deck():
    data = request.get_json()

    deck_id = data.get('deck_id')
    card_id = data.get('card_id')
    quantity = data.get('quantity')

    deck = Decks.query.get(deck_id)
    card = Cards.query.get(card_id)

    if deck is not None and card is not None:
        deck.delete_card(card, quantity)
        return jsonify({'msg':'Card removed from the deck successfully.'}), 200
    else:
        return jsonify({'msg':'Card or deck not found.'}), 400
    
@decks_api.route('/decks/change_card_qty', methods=['PUT'])
@cross_origin()
def handle_change_card_qty():
    data = request.get_json()
    print('qty change')
    deck_id = data.get('deck_id')
    card_id = data.get('card_id')
    quantity = data.get('quantity')
    is_sideboard = data.get('is_sideboard')

    print(is_sideboard)
    deck = Decks.query.get(deck_id)
    card = Cards.query.get(card_id)

    if deck is not None and card is not None:
        if is_sideboard is True:
            deck.change_sideboard_card_qty(card, quantity)
        else:
            deck.change_card_qty(card, quantity)
        return jsonify({'msg':'Card quantity changed successfully.'}), 200
    else:
        return jsonify({'msg':'Card or deck not found.'}), 400
    
@decks_api.route('/decks/add_sideboard', methods=['PUT'])
@cross_origin()
def handle_add_sideboard():
    data = request.get_json()
    deck_id = data.get('deck_id')
    card_id = data.get('card_id')
    quantity = data.get('quantity')

    print(f'deck id is {deck_id}')
    print(f'card id is {card_id}')
    print(f'quantity is {quantity}')

    deck = Decks.query.get(deck_id)
    card = Cards.query.get(card_id)

    if deck is not None and card is not None:
        deck.add_to_sideboard(card)
        return jsonify({'msg': 'Card added to the sideboard successfully.'}), 200
    else:
        return jsonify({'msg': 'Card or deck not found.'}), 400
    
@decks_api.route('/decks/move_card_main', methods=['PUT'])
@cross_origin()
def handle_move_to_main():
    data = request.get_json()
    deck_id = data.get('deck_id')
    card_id = data.get('card_id')
    quantity = data.get('quantity')

    deck = Decks.query.get(deck_id)
    card = Cards.query.get(card_id)

    if deck is not None and card is not None:
        deck.move_to_main(card)
        return jsonify({'msg': 'Card added to the sideboard successfully.'}), 200
    else:
        return jsonify({'msg': 'Card or deck not found.'}), 400

@decks_api.route('/decks/delete_sideboard', methods=['DELETE'])
@cross_origin()
def handle_delete_sideboard():
    data = request.get_json()
    deck_id = data.get('deck_id')
    card_id = data.get('card_id')
    quantity = data.get('quantity')
    print("deleting from sideboard")
    deck = Decks.query.get(deck_id)
    card = Cards.query.get(card_id)

    if deck is not None and card is not None:
        deck.delete_sideboard(card, quantity)
        return jsonify({'msg':'Card removed from the sideboard successfully.'}), 200
    else:
        return jsonify({'msg':'Card or deck not found.'}), 400