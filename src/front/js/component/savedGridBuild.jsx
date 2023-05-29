import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

export const SavedGridBuild = () => {
    const { store, actions } = useContext(Context);
    
    const gridBuilder = () => {
        if (store?.savedCards) {
            return (
                <div className="d-flex flex-wrap">
                    {store.savedCards.map(entry => (
                        console.log(entry),
                        <img src={entry.image} style={{width:"200px", height:"300px"}}/>
                    )
                )}
                {console.log(store.savedCards)}
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