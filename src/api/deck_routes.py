from flask import Flask, request, jsonify, url_for, Blueprint
from flask_cors import CORS, cross_origin
from api.models import db, Users, Cards, Decks
# from api.utils import generate_sitemap, APIException
from api.scryfallApiUtils import ScryfallAPIUtils

decks_api = Blueprint('decks_api', __name__)

@decks_api.route('/addcard', methods=['POST'])
@cross_origin()
def handle_add():
    return None