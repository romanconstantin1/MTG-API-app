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
    default: 4,
    nazgul: 9,
    sevendwarves: 7
  };
  
  export const checkMaxQty = (deckData, cardData, cardQty) => {
    if (anyNumberOf.includes(cardData.cardname) || cardData.card_type.includes("Basic Land")) {
      return true;
    }
    const maxQty = getMaxQuantity(deckData.format, cardData);
    if (cardQty > maxQty) {
      return (
        `"${deckData.deckname}" already contains ${maxQty} cop${maxQty === 1 ? 'y' : 'ies'} of ${cardData.cardname}.` + 
        ` A ${deckData.format} deck cannot contain more than ${maxQty} cop${maxQty === 1 ? 'y' : 'ies'} of ${cardData.cardname}.`
        );
    }

    return true;
  };
  
  const getMaxQuantity = (deckFormat, cardData) => {
    console.log(cardData)

    if (cardData.cardname === "Nazgûl") {
      return maxQuantities.nazgul 
    } else if (cardData.cardname === "Seven Dwarves") {
      return maxQuantities.sevendwarves
    }

    if (deckFormat === "commander") {
      return maxQuantities.commander;
    } else if (deckFormat === "vintage" && 
              cardData.is_restricted === true ||
              cardData.is_restricted === "true") {
      console.log("is restricted")
      return maxQuantities.vintage.restricted;
    } else if (deckFormat === "vintage") {
      return maxQuantities.vintage.unrestricted;
    }
  
    return maxQuantities.default;
  };