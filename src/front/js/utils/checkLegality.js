//function to check if a card is legal in a format before adding to a deck
//cardData - card object
//deckData - store.savedDecks
//deckID - self-explanatory
//cardInDB - true/false to determine how to access legalities

export const checkFormatLegality = (cardData, deckData, deckID, cardIsInDB) => {
    if (cardIsInDB == false) {
        var isLegalIn = Object.keys(cardData.legalities).filter(isLegal => {
            return cardData.legalities[isLegal] === "legal" || cardData.legalities[isLegal] === "restricted"
        })
    } else {
        var isLegalIn = cardData.legalities
    }
    //console.log(isLegalIn)
    const findDeck = deckData.find(deck => deck.id == deckID)
    if (isLegalIn.includes(findDeck.format)) {
        return true
    } else {
        return findDeck.format
    }
}