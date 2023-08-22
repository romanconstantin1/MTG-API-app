import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Context } from "../store/appContext";
import { CardInDeck } from "../component/savedDecks/cardInDeck.jsx";
import { CardInSideboard } from "../component/savedDecks/cardInSideboard.jsx";
import { detailedLog } from "../utils/detailedLog";
import { checkDeckSize } from "../utils/checkDeckSize";

export const SingleDeck = () => {
    const { store } = useContext(Context);
    const { deckdata } = useParams();
    const decodedData = decodeURIComponent(deckdata);
    const parsedData = JSON.parse(decodedData);
    const [ deckData, setDeckData ] = useState({"deckname": "Loading...", "cards":[]});
    const [ isLegal, setIsLegal ] = useState();
    
    useEffect(() => {
        if (store.savedDecks.length > 0) {
            getDeck();
            getDeckSize();
        }
    }, [store.savedDecks]);

    useEffect(() => {
        getDeckSize()
    }, [deckData]);
    
    const getDeck = () => {
        const deckToFind = store.savedDecks.find(foundDeck => 
            foundDeck.id === parsedData.id && foundDeck.deckname === parsedData.deckname);
            
        if (deckToFind == undefined) {
            setDeckData({"deckname": "No deck found!", "cards":[]});
        } else {
            setDeckData(deckToFind);
        };    
    };

    const getDeckSize = () => {
        if (Object.keys(deckData).length === 0) {
            setIsLegal("Loading...");
        } else {
            const checkDeckQty = checkDeckSize(deckData, deckData.card_total);
            setIsLegal(checkDeckQty ? `legal in ${deckData.format}` : `not legal in ${deckData.format}`);
        }
    }

    const getDeckTotal = () => {
        var deckTotal = deckData.card_total
        if (deckData.sideboard && deckData.sideboard_total !== undefined) deckTotal += deckData.sideboard_total

        return deckTotal
    }

    return (
        <div>
            <h1>{deckData.deckname}</h1>
            <h1>{getDeckTotal()} cards</h1>

            {deckData.sideboard && deckData.sideboard_total !== undefined && (
               <h1>({deckData.card_total} in main deck, {deckData.sideboard_total} in sideboard)</h1> 
            )}

            <h1>{isLegal}</h1>
            <div className="row p-2" id="maindiv">
                <div className = "col-8" id="maindeck">
                    <h1>main deck</h1>
                    <div className="d-flex flex-column justify-content-start p-2">
                        {deckData.cards.map((cardindeck, index) => (
                            <CardInDeck key={cardindeck.id} props={[cardindeck, deckData]} />
                        ))}
                    </div>
                </div>
                {deckData.sideboard && deckData.sideboard.length > 0 && (
                    <div className = "col-4" id="sideboard">
                        <h1>sideboard</h1>
                        {deckData.sideboard.map((cardinsideboard, index) => (
                            <CardInSideboard key={cardinsideboard.id} props={[cardinsideboard, deckData]} />
                        ))}
                    </div>
                )}
            </div>
            
        </div>
    );
};