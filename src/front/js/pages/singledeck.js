import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Context } from "../store/appContext";
import { CardInDeck } from "../component/savedDecks/cardInDeck.jsx";
import { detailedLog } from "../utils/detailedLog";

export const SingleDeck = () => {
    const { store } = useContext(Context)
    
    const { deckdata } = useParams();
    const decodedData = decodeURIComponent(deckdata);
    const parsedData = JSON.parse(decodedData);
    const [ deckData, setDeckData ] = useState({"deckname": "Loading...", "cards":[]})

    useEffect(() => {
        if (store.savedDecks.length > 0) {
            getDeck()
        }
    }, [store.savedDecks])
    
    const getDeck = () => {
        const deckToFind = store.savedDecks.find(foundDeck => 
            foundDeck.id === parsedData.id && foundDeck.deckname === parsedData.deckname);
        console.log(deckToFind)
        if (deckToFind == undefined) {
            setDeckData({"deckname": "No deck found!", "cards":[]})
        } else {
            setDeckData(deckToFind)
        }    
    }

    return (
        <div>
            <h1>Name</h1>
            <h1>{deckData.deckname}</h1>
            <h1>{deckData.card_total} cards</h1>
            <div className="d-flex p-2">
                {deckData.cards.map(cardindeck => (
                    <CardInDeck props={[cardindeck, deckData]} />
                ))}
            </div>
        </div>
    );
};