const anyNumberOf = [
    "Dragon's Approach",
    "Persistent Petitioners",
    "Rat Colony",
    "Relentless Rats",
    "Shadowborn Apostle"
  ];
  
  const maxQuantities = {
    commander: 1,
    vintage: {
      restricted: 1,
      unrestricted: 4
    },
    default: 4
  };
  
  export const CheckMaxQty = (deckFormat, cardData, cardQty) => {
    if (anyNumberOf.includes(cardData.cardname) || cardData.card_type.includes("Basic Land")) {
      return true;
    }
  
    const maxQty = getMaxQuantity(deckFormat, cardData);
    if (cardQty > maxQty) {
      return `A ${deckFormat} deck cannot contain more than ${maxQty} cop${maxQty === 1 ? 'y' : 'ies'} of ${cardData.cardname}`;
    }

    return true;
  };
  
  const getMaxQuantity = (deckFormat, cardData) => {
    if (deckFormat === "commander") {
      return maxQuantities.commander;
    } else if (deckFormat === "vintage" && cardData.is_restricted) {
      return maxQuantities.vintage.restricted;
    } else if (deckFormat === "vintage") {
      return maxQuantities.vintage.unrestricted;
    }
  
    return maxQuantities.default;
  };