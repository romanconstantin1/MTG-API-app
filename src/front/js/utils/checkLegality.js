//function to check if a card is legal in a format before adding to a deck
//cardData - card object
//decksData - store.savedDecks
//deckID - self-explanatory
//cardInDB - true/false to determine how to access legalities

export const checkFormatLegality = (cardData, decksData, deckID, cardInDB) => {
    if (cardInDB == false) {
        var isLegalIn = Object.keys(cardData.legalities).filter(isLegal => {
            return cardData.legalities[isLegal] === "legal"
        })
    } else {
        var isLegalIn = cardData.legalities
    }
    const findDeck = decksData.find(deck => deck.id == deckID)
    
    if (isLegalIn.includes(findDeck.format)) {
        return true
    } else {
        return findDeck.format
    }
}