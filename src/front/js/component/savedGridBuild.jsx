import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

export const SavedGridBuild = () => {
    const { store, actions } = useContext(Context);
    const handleClick = (cardData) => {
        actions.deleteCard(cardData)
    }
    
    const gridBuilder = () => {
        if (store?.savedCards) {
            return (
                <div className="d-flex flex-wrap">
                    {store.savedCards.map(entry => (
                        <div>
                            <img 
                                src={entry.image} 
                                style={{width:"200px", height:"300px"}}
                                onClick={() => console.log(entry)}/>
                            <button onClick={() => handleClick(entry)}>Delete this card</button>
                        </div>
                    )
                )}
                </div>
            )
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