import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../../store/appContext";

export const SavedCardInGrid = (cardData) => {
    const { store, actions } = useContext(Context)
    const cardEntry = cardData.cardData
    const cardString = encodeURIComponent(JSON.stringify(
        {
            "cardname": cardEntry.cardname,
            "id": cardEntry.id
        }
        ))

    return (
        <div className="d-flex text-center">
            <Link to={`/cards/single/${cardString}`}>
            <img
                src={cardEntry.image_small}
                    style={{ width: '200px', height: '300px', borderRadius: '9px' }}
                />
            </Link>
        </div>
    )
}