class ScryfallAPIUtils(object):
    def create_db_card(cardData):
        legalities = []
        is_restricted = False
        flavor_text = ""
        oracle_text = ""
        print(cardData["legalities"])
        for entry in cardData["legalities"]:
            if cardData["legalities"][entry] == "legal":
                legalities.append(entry)
            if cardData["legalities"][entry] == "restricted":
                legalities.append(entry)
                is_restricted = True
            if "flavor_text" in cardData:
                flavor_text = cardData["flavor_text"]
            if "oracle_text" in cardData:
                oracle_text = cardData["oracle_text"]
        print(is_restricted)
        return {
            "name": cardData["name"],
            "card_type": cardData["type_line"],
            "mana_cost": cardData["mana_cost"],
            "cmc": cardData["cmc"],
            "oracle_text": oracle_text,
            "flavor_text": flavor_text,
            "legalities": legalities,
            "is_restricted": is_restricted,
            "artist": cardData["artist"],
            "image_uri_small": cardData["image_uris"]["small"],
            "image_uri_normal": cardData["image_uris"]["normal"]
            # need to find a way to store all image uri's
            # but is that even necessary? normal images are 198kb
        }
