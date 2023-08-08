import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Context } from "../../store/appContext";

import { CardInSideboardControls } from "./cardInSideboardControls.jsx";

export const CardInSideboard = (props) => {
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
        <div className="d-flex flex-column align-items-center px-2">
            {/* <div className="card_display mx-auto">
                <Link to={`/cards/single/${cardString}`}>
                    <img src={cardData.image_small} />
                </Link>
            </div> */}
            <div>
                <h4>{cardData.quantity}x {cardData.cardname}</h4>
            </div>
            <div className="d-flex">
                <CardInSideboardControls props={[cardData, deckData]} />
            </div>
        </div>
      );
}