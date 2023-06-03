from flask_sqlalchemy import SQLAlchemy

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
    # db.Column("id", db.Integer, primary_key=True),    
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
        return {
            "id": self.id,
            "deckname": self.name,
            "format": self.format,
            "cards": [card.serialize() for card in self.cards]
        }

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
    
    def add_card(cls, card_id, deck_id):
        card = Cards.query.get(card_id)
        deck = cls.query.get(deck_id)

        if card is not None and deck is not None:
            deck.cards.append(card)
            db.session.commit()
            return "Card added to the deck successfully."
        else:
            return "Card or deck not found."
    
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
            "flavor_text": self.flavor_text,
            "artist": self.artist,
            "image_small": self.image_uri_small,
            "image_normal": self.image_uri_normal
        } 
    
    @classmethod
    def create(cls, name, card_type, mana_cost, cmc, oracle_text, legalities, flavor_text, artist, image_uri_small, image_uri_normal):
        new_card = cls()
        new_card.name = name
        new_card.card_type = card_type
        new_card.mana_cost = mana_cost
        new_card.cmc = cmc
        new_card.oracle_text = oracle_text
        new_card.legalities = legalities
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