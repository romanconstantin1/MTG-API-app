class ScryfallAPIUtils(object):
    def create_db_card(cardData):
        legalities = []
        flavor_text = ""
        rules_text = ""
        for entry in cardData["legalities"]:
            if cardData["legalities"][entry] == "legal":
                legalities.append(entry)
            if "flavor_text" in cardData:
                flavor_text = cardData["flavor_text"]
            if "rules_text" in cardData:
                rules_text = cardData["rules_text"]

        return {
            "name": cardData["name"],
            "card_type": cardData["type_line"],
            "mana_cost": cardData["mana_cost"],
            "cmc": cardData["cmc"],
            "rules_text": rules_text,
            "flavor_text": flavor_text,
            "legalities": legalities,
            "artist": cardData["artist"],
            "image_uri": cardData["image_uris"]["normal"]
            # need to find a way to store all image uri's
            # but is that even necessary? normal images are 198kb
        }
