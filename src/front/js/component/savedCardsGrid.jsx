import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

export const SavedCardsGrid = () => {
    const { store, actions } = useContext(Context);
    const handleClick = (cardData) => {
        actions.deleteCard(cardData)
    }
    
    const gridBuilder = () => {
        if (store.savedCards.length > 0) {
            return (
                <div className="d-flex flex-wrap">
                    {store.savedCards.map(entry => (
                        <div className="d-flex align-items-center">
                            <img 
                                src={entry.image} 
                                style={{width:"200px", height:"300px", borderRadius: "9px"}}
                                onClick={() => console.log(entry)}/>
                            
                            <button onClick={() => handleClick(entry)}>Delete this card</button>
                        </div>
                    )
                )}
                </div>
            )
        } else if (store.savedCards.length <= 0){
            return <h1>No saved cards</h1>
        } else {
        return <h1>Loading...</h1>
        }
    }
    
    return (
        <>
            {gridBuilder()}
        </>
        
    )
}