export const checkDeckSize = (deckData, card_total) => {
    if (
        deckData.format === "commander" ||
        deckData.format === "gladiator" || 
        deckData.format === "brawl" ||
        deckData.format === "historicbrawl" ||
        deckData.format === "duel" ||
        deckData.format === "paupercommander" ||
        deckData.format === "predh" 
    ) {
        if (card_total > 100) {
            return `"${deckData.deckname}" is a ${deckData.format} deck. A ${deckData.format} deck cannot contain more than 100 cards`  
        } else if (card_total != 100) {
            return false
        } else {
            console.log("legal")
            return true
        }
    } else if (card_total < 60) {
        console.log("not legal")
        return false
    } else {
        console.log("legal")
        return true
    } 
}

export const checkSideboardSize = (deckData, sideboard_total) => {
    if (sideboard_total > 15) {
        return `${deckData.deckname} cannot have more than 15 cards in the sideboard`
    } else {
        return true
    }
}