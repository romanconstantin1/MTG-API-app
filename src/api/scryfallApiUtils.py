class ScryfallAPIUtils(object):
    def create_db_card(cardData, isLegalIn):
        legalities = []
        is_restricted = False
        flavor_text = None
        oracle_text = None
        oracle_id = None
        power = None
        toughness = None
        loyalty = None
        defense = None
        colors = ""

        for entry in isLegalIn:
            if isLegalIn[entry] == "legal":
                legalities.append(entry)
            if isLegalIn[entry] == "restricted":
                legalities.append(entry)
                is_restricted = True
        
        for i in cardData["colors"]:
            if i.isalpha():
                colors += i

        if "flavor_text" in cardData:
            flavor_text = cardData["flavor_text"]
        if "oracle_text" in cardData:
            oracle_text = cardData["oracle_text"]
        if "oracle_id" in cardData:
            oracle_id = cardData["oracle_id"]

        # Scryfall API stores these values as strings for some reason
        if "power" in cardData:
            power = int(cardData["power"])
        if "toughness" in cardData:
            toughness = int(cardData["toughness"])
        if "loyalty" in cardData:
            loyalty = int(cardData["loyalty"])
        if "defense" in cardData:
            defense = int(cardData["defense"])

        return {
            "name": cardData["name"],
            "card_type": cardData["type_line"],
            "mana_cost": cardData["mana_cost"],
            "power": power,
            "toughness": toughness,
            "loyalty": loyalty,
            "defense": defense,
            "oracle_text": oracle_text,
            "flavor_text": flavor_text,
            "legalities": legalities,
            "is_restricted": is_restricted,
            "artist": cardData["artist"],
            "image_uri_small": cardData["image_uris"]["small"],
            "image_uri_normal": cardData["image_uris"]["normal"],
            "oracle_id": oracle_id,
            "colors": colors
            # need to find a way to store all image uri's
            # but is that even necessary? normal images are 198kb
        }
    
    def check_for_sideboard(formatData):
        noSideboard = [
            "gladiator",
            "commander",
            "oathbreaker",
            "brawl",
            "historicbrawl",
            "paupercommander",
            "duel",
            "predh"
        ]
        if formatData in noSideboard:
            return False
        else:
            return True
