from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import and_

db = SQLAlchemy()

class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(120), unique=True, nullable=False)
    firstname = db.Column(db.String(120), unique=False, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    #decks = db.relationship("Decks", backref="user", lazy=True)

    def __repr__(self):
        return f'<User: {self.username}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "username": self.username
        }

cards_in_decks = db.Table('cards_in_decks',  
    db.Column("card_id", db.Integer, db.ForeignKey("cards.id"), primary_key=True),
    db.Column("deck_id", db.Integer, db.ForeignKey("decks.id"), primary_key=True),
    db.Column("quantity", db.Integer)
)

class Decks(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    #user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    name = db.Column(db.String(120), unique=False, nullable=False)
    format = db.Column(db.String(120), unique=False, nullable=False)
    cards = db.relationship('Cards', secondary=cards_in_decks, backref=db.backref('decks', lazy='dynamic'))

    def __repr__(self):
        return f'<Deck: {self.name}>'

    def serialize(self):
        serialized_cards = []
        for card in self.cards:
            serialized_card = card.serialize()
            serialized_card['quantity'] = self.get_card_quantity(card)
            serialized_cards.append(serialized_card)

        return {
            "id": self.id,
            "deckname": self.name,
            "format": self.format,
            "cards": serialized_cards
        }

    def get_card_quantity(self, card):
        existing_card = db.session.query(cards_in_decks).filter_by(card_id=card.id, deck_id=self.id).first()
        if existing_card:
            return existing_card.quantity
        else:
            return 0

    @classmethod
    def create(cls, name, format):
        new_deck = cls()
        new_deck.name = name
        new_deck.format = format

        db.session.add(new_deck)
        db.session.commit()

        return new_deck
    
    def remove(self):

        db.session.delete(self)
        db.session.commit()

        return None
    
    @classmethod
    def read_all(cls):
        return cls.query.all()
    
    def add_card(self, card, quantity):
        existing_card = db.session.query(cards_in_decks).filter_by(card_id=card.id, deck_id=self.id).first()
        if existing_card:
            new_quantity = existing_card.quantity + quantity
            print(f'new quantity is {new_quantity}')
            db.session.execute(cards_in_decks.update().where(
                and_(cards_in_decks.c.card_id == card.id, cards_in_decks.c.deck_id == self.id)
            ).values(quantity=new_quantity))
        else:
            new_card_in_deck = cards_in_decks.insert().values(card_id=card.id, deck_id=self.id, quantity=quantity)
            db.session.execute(new_card_in_deck)

        db.session.commit()
        return None
   
    def change_card_qty(self, card, quantity):
        existing_card = db.session.query(cards_in_decks).filter_by(card_id=card.id, deck_id=self.id).first()
        new_quantity = existing_card.quantity + quantity
        print(f'new quantity is {new_quantity}')
        db.session.execute(cards_in_decks.update().where(
                and_(cards_in_decks.c.card_id == card.id, cards_in_decks.c.deck_id == self.id)
        ).values(quantity=new_quantity))

        db.session.commit()
        return None
    
    def delete_card(self, card):
        existing_card = db.session.query(cards_in_decks).filter_by(card_id=card.id, deck_id=self.id).first()
        if existing_card:
            db.session.execute(cards_in_decks.delete().where(
                and_(cards_in_decks.c.card_id == card.id, cards_in_decks.c.deck_id == self.id)
            ))
            db.session.commit()
            print()
            return True
        else:
            return False

    
# check to see if rules text, flavor text, etc., can be made nullable for cards missing one/both
# also consider p/t, planeswalker loyaly?
class Cards(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=False, nullable=False)
    card_type = db.Column(db.String(120), unique=False, nullable=False)
    mana_cost = db.Column(db.String(120), unique=False)
    cmc = db.Column(db.Integer, unique=False)
    image_uri_small = db.Column(db.String(250), unique=False, nullable=False)
    image_uri_normal = db.Column(db.String(250), unique=False, nullable=False)
    is_restricted = db.Column(db.String(10), unique=False)
    oracle_text = db.Column(db.String(750), unique=False, nullable=True)
    flavor_text = db.Column(db.String(750), unique=False, nullable=True)
    legalities = db.Column(db.String(250), unique=False, nullable=True)
    artist = db.Column(db.String(120), unique=False, nullable=False)

    def __repr__(self):
        return f'<Card: {self.name}>'
    
    def serialize(self):
        return {
            "id": self.id,
            "cardname": self.name,
            "card_type": self.card_type,
            "mana_cost": self.mana_cost,
            "oracle_text": self.oracle_text,
            "legalities": self.legalities,
            "is_restricted": self.is_restricted,
            "flavor_text": self.flavor_text,
            "artist": self.artist,
            "image_small": self.image_uri_small,
            "image_normal": self.image_uri_normal
        } 
    
    @classmethod
    def create(cls, name, card_type, mana_cost, cmc, oracle_text, legalities, is_restricted, flavor_text, artist, image_uri_small, image_uri_normal):
        new_card = cls()
        new_card.name = name
        new_card.card_type = card_type
        new_card.mana_cost = mana_cost
        new_card.cmc = cmc
        new_card.oracle_text = oracle_text
        new_card.legalities = legalities
        new_card.is_restricted = is_restricted
        new_card.flavor_text = flavor_text
        new_card.artist = artist
        new_card.image_uri_small = image_uri_small
        new_card.image_uri_normal = image_uri_normal

        db.session.add(new_card)
        db.session.commit()

        return new_card
    
    def remove(self):
        db.session.delete(self)
        db.session.commit()


        return None
    
    @classmethod
    def read_all(cls):
        return cls.query.all()