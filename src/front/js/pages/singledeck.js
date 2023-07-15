import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Context } from "../store/appContext";
import { CardInDeck } from "../component/savedDecks/cardInDeck.jsx";
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
            setIsLegal(checkDeckQty ? `${deckData.format} legal` : `not ${deckData.format} legal`);
        }
    }

    return (
        <div>
            <h1>{deckData.deckname}</h1>
            <h1>{deckData.card_total} cards</h1>
            <h1>{isLegal}</h1>
            <div className="row d-flex p-2" id="maindiv">
                <div className = "col-8" id="maindeck">
                    <h1>main deck</h1>
                    <div className="d-flex p-2">
                        {deckData.cards.map(cardindeck => (
                            <CardInDeck props={[cardindeck, deckData]} />
                        ))}
                    </div>
                </div>
                <div className = "col-4" id="sideboard">
                    <h1>sideboard</h1>
                </div>
            </div>
            
        </div>
    );
};