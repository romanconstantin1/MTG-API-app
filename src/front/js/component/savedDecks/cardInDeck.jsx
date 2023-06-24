import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Context } from "../../store/appContext";

import { CardInDeckControls } from "./cardInDeckControls.jsx";

export const CardInDeck = (props) => {
    const { store, actions } = useContext(Context)
    const cardData = props.props[0]
    const deckData = props.props[1]

    const cardString = encodeURIComponent(JSON.stringify(
        {
            "cardname": cardData.cardname,
            "id": cardData.id
        }
        ))

    return (
        <div className="text-center px-2">
            <div className="card_display mx-auto">
                <Link to={`/cards/single/${cardString}`}>
                    <img src={cardData.image_small} />
                </Link>
            </div>
            <div>
                <h4>{cardData.quantity}x {cardData.cardname}</h4>
            </div>
            <div className="d-flex">
                <CardInDeckControls props={[cardData, deckData]} />
            </div>
        </div>
      );
}