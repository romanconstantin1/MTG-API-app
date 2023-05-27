class ScryfallAPIUtils(object):
    def create_db_card(cardData):
        legalities = []
        for entry in cardData["legalities"]:
            if cardData["legalities"][entry] == "legal":
                legalities.append(entry)
        # add some stuff here to allow flavor text & rules text to be null
        print(legalities)
        return {
            "name": cardData["name"],
            "card_type": cardData["type_line"],
            "mana_cost": cardData["mana_cost"],
            "cmc": cardData["cmc"],
            "rules_text": cardData["oracle_text"],
            "flavor_text": cardData["flavor_text"],
            "legalities": legalities,
            "artist": cardData["artist"],
            "image_uri": cardData["image_uris"]["normal"]
            # need to find a way to store all image uri's
        }
