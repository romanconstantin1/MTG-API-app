import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Context } from "../store/appContext";
import { CardInDeck } from "../component/savedDecks/cardInDeck.jsx";
import { CardInSideboard } from "../component/savedDecks/cardInSideboard.jsx";
import { detailedLog } from "../utils/detailedLog";
import { checkDeckSize } from "../utils/checkDeckSize";
import { sortCards } from "../utils/sortDeckBy";
import { render } from "react-dom";

export const SingleDeck = () => {
    const { store, actions } = useContext(Context);
    const { deckdata } = useParams();
    const decodedData = decodeURIComponent(deckdata);
    const parsedData = JSON.parse(decodedData);
    const [ hasMounted, setHasMounted ] = useState(false)
    const [ deckData, setDeckData ] = useState({"deckname": "Loading...", "cards":[]});
    const [ isLegal, setIsLegal ] = useState();
    const [ sortType, setSortType ] = useState("byMana");
    
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
        
        if (deckToFind !== undefined) {
            setDeckData(deckToFind);
            setHasMounted(true);
        };  
    };

    const getDeckSize = () => {
        if (Object.keys(deckData).length === 0) {
            setIsLegal("Loading...");
        } else if (hasMounted) {
            const checkDeckQty = checkDeckSize(deckData, deckData.card_total);
            setIsLegal(checkDeckQty ? `legal in ${deckData.format}` : `not legal in ${deckData.format}`);
        }
    };

    const getDeckTotal = () => {
        var deckTotal = deckData.card_total
        if (deckData.sideboard && deckData.sideboard_total !== undefined) {
            deckTotal += deckData.sideboard_total
        };

        return deckTotal;
    };

    const handleSortDeckBy = (typeVal) => {
        actions.setDeckSortType(typeVal)
    };

    const renderCardsByMana = () => {
        const sortedCards = sortCards(deckData.cards, store.sortType)
        return (
            Object.keys(sortedCards).map(manaGroup => (
                <div key = {manaGroup}> 
                <h2>Mana value: {sortedCards[manaGroup].manaValue}</h2>
                {sortedCards[manaGroup].cards.map(card => (
                    <CardInDeck key={card.id} props={[card, deckData]} />
                ))}
                </div>
            ))
        );
    };

    const renderSideboard = () => {
        return (
            deckData.sideboard.map((cardinsideboard, index) => (
                <CardInSideboard key={cardinsideboard.id} props={[cardinsideboard, deckData]} />
            ))
        );
    };

    const renderCardsByColor = () => {
        const sortedCards = sortCards(deckData.cards, store.sortType)
        return (
            Object.keys(sortedCards).map(colorGroup => (
                <div key = {colorGroup}> 
                <h2>{sortedCards[colorGroup].color}</h2>
                {sortedCards[colorGroup].cards.map(card => (
                    <CardInDeck key={card.id} props={[card, deckData]} />
                ))}
                </div>
            ))
        );
    }

    const renderCardsByType = () => {
        const sortedCards = sortCards(deckData.cards, store.sortType)
        return (
            Object.keys(sortedCards).map(typeGroup => (
                <div key = {typeGroup}> 
                <h2>{sortedCards[typeGroup].type}</h2>
                {sortedCards[typeGroup].cards.map(card => (
                    <CardInDeck key={card.id} props={[card, deckData]} />
                ))}
                </div>
            ))
        );
    }

    return (
        <div>
            <h1>{deckData.deckname}</h1>
            <h1>{getDeckTotal()} cards</h1>

            {deckData.sideboard && deckData.sideboard_total !== undefined && (
               <h1>({deckData.card_total} in main deck, {deckData.sideboard_total} in sideboard)</h1> 
            )}
    
            <h1>{isLegal}</h1>
            
            <select 
                name="sortBy" 
                id="sortBy" 
                onChange={(event) => handleSortDeckBy(event.target.value)}
                value={store.sortType}
            >
                <option value="byMana">By mana value</option>
                <option value="byColor">By color</option>  
                <option value="byType">By card type</option>    
            </select>

            <button id="deckSort" onClick={() => handleDeckSort()}>Sort deck</button>

            <div className="row p-2" id="maindiv">
                <div className = "col-8" id="maindeck">
                    <h1>main deck</h1>
                    {store.sortType === "byMana" && renderCardsByMana()}
                    {store.sortType === "byColor" && renderCardsByColor()}
                    {store.sortType === "byType" && renderCardsByType()}
                </div>
                {deckData.sideboard && deckData.sideboard.length > 0 && (
                    <div className = "col-4" id="sideboard">
                        <h1>sideboard</h1>
                        {renderSideboard()}
                    </div>
                )}
            </div>          
        </div>
    );
};