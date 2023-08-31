import React from "react";

import { cardTypes, typePriority } from "./dataLists";
import { detailedLog } from "./detailedLog";

export const sortCards = (deckData, sortType) => {
    let cardsToSort = [...deckData];
    
    switch (sortType) {
        case "byMana":
            cardsToSort = sortByMana(cardsToSort);
            break;
        case "byColor":
            cardsToSort = sortByColor(cardsToSort);
            break;
        case "byType":
            cardsToSort = sortByType(cardsToSort);
            break;
        default:
            cardsToSort = alphabetize(cardsToSort);
            break;
    };
    return cardsToSort;
};

const sortByMana = (deckData) => {
    deckData.sort((a, b) => a.cmc - b.cmc);

        const groupedCards = [];
            let currentManaValue = null;
            let currentGroup = null;

            for (const card of deckData) {
                if (card.cmc !== currentManaValue) {
                    currentManaValue = card.cmc;
                    currentGroup = [];
                    groupedCards.push({ manaValue: currentManaValue, cards: currentGroup });
                }
                currentGroup.push(card);
                alphabetize(currentGroup)
            }
        return groupedCards;
};

const sortByType = (deckData) => {

    const groupedCards = [];

    for (const card of deckData) {
        console.log(card)
        const typeString = card.card_type || "";
        const type = typeString.split(" ");
        
        type.sort((a, b) => (typePriority[a] || Infinity) - (typePriority[b] || Infinity));

        const primaryType = type[0] || "Uncategorized";

        if (!groupedCards[primaryType]) {
            groupedCards[primaryType] = [];
        }

        groupedCards[primaryType].push(card);
        alphabetize(groupedCards[primaryType]);
    };

    const sortedCards = cardTypes
        .filter(category => groupedCards.hasOwnProperty(category))
        .map(category => ({
        type: category,
        cards: groupedCards[category] || []
    }));

    return sortedCards;
};

const sortByColor = (deckData) => {
    const sortingOrder = ["W", "U", "B", "R", "G", "Multicolor", "Colorless", "Land"];
    const groupedCards = [];

    for (const card of deckData) {
        if (card.colors.length === 0) {
            if (card.card_type.includes("Land")) {
                if (!groupedCards["Land"]) {
                    groupedCards["Land"] = [];
                }
                groupedCards["Land"].push(card);
                alphabetize(groupedCards["Land"]);
            } else {
                if (!groupedCards["Colorless"]) {
                    groupedCards["Colorless"] = [];
                }
                groupedCards["Colorless"].push(card);
                alphabetize(groupedCards["Colorless"]);
            }
        } else if (card.colors.length === 1) {
            const color = card.colors[0];
            if (!groupedCards[color]) {
                groupedCards[color] = [];
            }
            groupedCards[color].push(card);
            alphabetize(groupedCards[color]);
        } else {
            if (!groupedCards["Multicolor"]) {
                groupedCards["Multicolor"] = [];
            }
            groupedCards["Multicolor"].push(card);
            alphabetize(groupedCards["Multicolor"]);
        };
    };
    
    const sortedCards = sortingOrder
        .filter(category => groupedCards.hasOwnProperty(category))
        .map(category => ({
        color: category,
        cards: groupedCards[category] || []
    }));

    return sortedCards;
};

const alphabetize = (deckData, alphaOrder) => {
    if (alphaOrder === "zToA") {
        deckData.sort((a, b) => b.cardname.localeCompare(a.cardname))
    } else {
        deckData.sort((a, b) => a.cardname.localeCompare(b.cardname))
    }

    return deckData;
}

