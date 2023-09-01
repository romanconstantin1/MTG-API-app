import React from "react";

export const cardDisplayBuilder = (passedCardData, cardSide) => {
    return (
        <div className="container">
            <div className="row">
                
                <h1>{passedCardData.cardname}</h1>
                <div className="col">
                    {cardSide?.image_uris && (
                        <img src = {cardSide.image_uris.normal} />
                    ) || passedCardData.image_uris?.normal && (
                        <img src = {passedCardData.image_uris.normal} />
                    ) || passedCardData.image_normal && (
                        <img src = {passedCardData.image_normal} />
                    )}  
                </div>

                <div className="col">
                    {cardSide?.mana_cost && (
                        <h5>Mana Cost: {cardSide.mana_cost}</h5>
                    ) || passedCardData.mana_cost && (
                        <h5>Mana Cost: {passedCardData.mana_cost}</h5>
                    )}

                    <h5>Type: {cardSide?.type_line || passedCardData.card_type || passedCardData.type_line}</h5>
                    
                    {passedCardData.loyalty && (
                        <h5>Starting Loyalty: {passedCardData.loyalty}</h5>
                    )}

                    {passedCardData.defense && (
                        <h5>Defense: {passedCardData.defense}</h5>
                    )}
                    {passedCardData. power && passedCardData.toughness && (
                        <h5>P/T: {passedCardData.power}/{passedCardData.toughness}</h5>
                    )}

                    {cardSide?.oracle_text && (
                        <>
                            <h5>Rules Text:</h5> 
                            <p className="css-fix">{cardSide.oracle_text}</p>
                        </>
                    ) || passedCardData.oracle_text && (
                        <>
                            <h5>Rules Text:</h5> 
                            <p className="css-fix">{passedCardData.oracle_text}</p>
                        </>
                    )}

                    {cardSide?.flavor_text && (
                        <>
                            <h5>Flavor Text:</h5>
                            <p className="css-fix"><i>{cardSide.flavor_text}</i></p>
                        </>
                    ) || passedCardData.flavor_text && (
                        <>
                            <h5>Flavor Text:</h5>
                            <p className="css-fix"><i>{passedCardData.flavor_text}</i></p>
                        </>
                    )}
                </div>
                
            </div>
        </div>
        )
}