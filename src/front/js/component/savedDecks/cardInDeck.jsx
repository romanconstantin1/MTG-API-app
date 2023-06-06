import React, { useContext, useEffect, useState } from "react";

import { Context } from "../../store/appContext";

import { CardInDeckControls } from "./cardInDeckControls.jsx";

export const CardInDeck = (props) => {
    const { store, actions } = useContext(Context)
    const cardData = props.props

    return (
        <div className="px-2">
            <div className="mx-auto">
                <img src={cardData.image_small} />
            </div>
            <div className="d-flex">
                <CardInDeckControls props={cardData} />
            </div>
        </div>
    )
}