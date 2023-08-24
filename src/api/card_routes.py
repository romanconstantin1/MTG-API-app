from flask import Flask, request, jsonify, url_for, Blueprint
from flask_cors import CORS, cross_origin
from flask_jwt_extended import jwt_required, get_jwt_identity
from api.models import db, Users, Cards, CardSides, Decks
# from api.utils import generate_sitemap, APIException
from api.scryfallApiUtils import ScryfallAPIUtils

cards_api = Blueprint('cards_api', __name__)

@cards_api.route('/add_card', methods=['POST'])
@jwt_required()
@cross_origin()
def handle_add():
    data = request.json
    print(data)
    # check if a card is double-sided & pass information accordingly
    if "card_faces" in data:
        front_side = data["card_faces"][0]
        front_side["id"] = data["id"]
        back_side = data["card_faces"][1]
        front_card_entry =  ScryfallAPIUtils.create_db_card(front_side, data["legalities"])
        back_card_entry = ScryfallAPIUtils.create_db_card(back_side, [])

        print("card front")
        print(front_card_entry)
        print("card back")
        print(back_card_entry)
        front_card_in_db = Cards.create(
            front_card_entry["name"],
            data["user_id"],
            front_card_entry["card_type"], 
            front_card_entry["mana_cost"],
            data["cmc"],
            front_card_entry["oracle_text"],
            front_card_entry["legalities"],
            front_card_entry["is_restricted"],
            front_card_entry["flavor_text"],
            front_card_entry["artist"],
            front_card_entry["image_uri_small"],
            front_card_entry["image_uri_normal"],
            front_card_entry["scryfall_id"],
            front_card_entry["power"],
            front_card_entry["toughness"],
            front_card_entry["loyalty"],
            front_card_entry["defense"]
        )
        
        back_card_in_db = CardSides.create(
            front_card_in_db.id,
            back_card_entry["name"],
            back_card_entry["card_type"], 
            back_card_entry["mana_cost"],
            back_card_entry["oracle_text"],
            back_card_entry["flavor_text"],
            back_card_entry["artist"],
            back_card_entry["image_uri_small"],
            back_card_entry["image_uri_normal"],
            back_card_entry["power"],
            back_card_entry["toughness"],
            back_card_entry["loyalty"],
            back_card_entry["defense"]
        )
        
        # Create the association between the front card and the back card
        front_card_in_db.back_side_id = back_card_in_db.id
        db.session.commit()

        response = {
            "card_front" : {
                "artist": front_card_entry["artist"],
                "card_type": front_card_entry["card_type"], 
                "cardname": front_card_entry["name"],
                "cmc": data["cmc"],
                "id": front_card_in_db.id,
                "user_id": data["user_id"],
                "image_normal": front_card_entry["image_uri_normal"],
                "image_small": front_card_entry["image_uri_small"],
                "legalities": front_card_entry["legalities"],
                "is_restricted": front_card_entry["is_restricted"],
                "mana_cost": front_card_entry["mana_cost"],
                "oracle_text": front_card_entry["oracle_text"],
                "flavor_text": front_card_entry["flavor_text"],
                "power": front_card_entry["power"],
                "toughness": front_card_entry["toughness"],
                "loyalty": front_card_entry["loyalty"],
                "defense": front_card_entry["defense"]
            },
            "card_back": {
                "artist": back_card_entry["artist"],
                "card_type": back_card_entry["card_type"], 
                "cardname": back_card_entry["name"],
                "image_normal": back_card_entry["image_uri_normal"],
                "image_small": back_card_entry["image_uri_small"],
                "mana_cost": back_card_entry["mana_cost"],
                "oracle_text": back_card_entry["oracle_text"],
                "flavor_text": back_card_entry["flavor_text"],
                "power": back_card_entry["power"],
                "toughness": back_card_entry["toughness"],
                "loyalty": back_card_entry["loyalty"],
                "defense": back_card_entry["defense"]
            }
        }

        return jsonify(response), 200

    else: 
        card_entry = ScryfallAPIUtils.create_db_card(data, data["legalities"])
        card_in_db = Cards.create(
            card_entry["name"],
            data["user_id"],
            data["type_line"], 
            data["mana_cost"],
            data["cmc"],
            card_entry["oracle_text"],
            card_entry["legalities"],
            card_entry["is_restricted"],
            card_entry["flavor_text"],
            card_entry["artist"],
            card_entry["image_uri_small"],
            card_entry["image_uri_normal"],
            card_entry["scryfall_id"],
            card_entry["power"],
            card_entry["toughness"],
            card_entry["loyalty"],
            card_entry["defense"]
            )
        
        response = {
            "artist": card_entry["artist"],
            "card_type": card_entry["card_type"], 
            "cardname": card_entry["name"],
            "cmc": data["cmc"],
            "id": card_in_db.id,
            "user_id": data["user_id"],
            "image_normal": card_entry["image_uri_normal"],
            "image_small": card_entry["image_uri_small"],
            "legalities": card_entry["legalities"],
            "is_restricted": card_entry["is_restricted"],
            "mana_cost": card_entry["mana_cost"],
            "oracle_text": card_entry["oracle_text"],
            "flavor_text": card_entry["flavor_text"],
            "power": card_entry["power"],
            "toughness": card_entry["toughness"],
            "loyalty": card_entry["loyalty"],
            "defense": card_entry["defense"]
            }

        return jsonify(response), 200


@cards_api.route("/delete_card/<int:id>", methods=["DELETE"])
@jwt_required()
@cross_origin()
def remove_card(id):
    card = Cards.query.get(id)
    if card == None:
        return jsonify({"msg": 'Card not found'}), 404

    card.remove()
    response = {"msg": 'Card deleted'}
    return jsonify(response), 200

@cards_api.route('/cards', methods=['GET'])
@cross_origin()
@jwt_required()
def handle_cards():
    user_id = get_jwt_identity()
    cards = Cards.query.filter_by(user_id=user_id).all()
    cards_list = list(map(lambda card: card.serialize(), cards))

    response = {
        "saved_cards": cards_list
    }

    return jsonify(response), 200
