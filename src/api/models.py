from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(120), unique=True, nullable=False)
    firstname = db.Column(db.String(120), unique=False, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    decks = db.relationship("Decks", backref="user", lazy=True)

    def __repr__(self):
        return f'<User: {self.username}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "username": self.username
        }
    
class Decks(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    name = db.Column(db.String(120), unique=False, nullable=False)
    format = db.Column(db.String(120), unique=False, nullable=False)

    def __repr__(self):
        return f'<Deck: {self.name}>'
    
    def serialize(self):
        return {
            "id": self.id,
            "deckname": self.name
        }
    
class Cards(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=False, nullable=False)
    maintype = db.Column(db.String(120), unique=False, nullable=False)
    subtype = db.Column(db.String(120), unique=False, nullable=False)
    mana_cost = db.Column(db.String(120), unique=False)
    cmc = db.Column(db.Integer, unique=False)
    image = db.Column(db.String(120), unique=False, nullable=False)
    rules_text = db.Column(db.String(120), unique=False, nullable=False)
    flavor_text = db.Column(db.String(120), unique=False, nullable=False)
    sets = db.Column(db.String(120), unique=False, nullable=False)
    legality = db.Column(db.String(120), unique=False, nullable=False)
    artist = db.Column(db.String(120), unique=False, nullable=False)

    def __repr__(self):
        return f'<Card: {self.name}>'
    
    def serialize(self):
        return {
            "id": self.id,
            "cardname": self.name,
            "type": self.maintype,
            "subtype": self.subtype,
            "mana cost": self.mana_cost,
            "rules text": self.rules_text,
            "sets": self.sets,
            "legal in": self.legality,
            "flavor text": self.flavor_text,
            "artist": self.artist,
            "image": self.image
        }
    
cards_in_decks = db.Table('cards_in_decks',
    db.Column("id", db.Integer, primary_key=True),    
    db.Column("card_id", db.Integer, db.ForeignKey("cards.id"), primary_key=True),
    db.Column("deck_id", db.Integer, db.ForeignKey("decks.id"), primary_key=True),
    db.Column("quantity", db.Integer)
)