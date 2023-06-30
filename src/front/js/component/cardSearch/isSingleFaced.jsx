import React, { useContext, useEffect } from "react";
import { Context } from "../../store/appContext";

import { CardSearchControls } from "./cardSearchControls.jsx";
import { detailedLog } from "../../utils/detailedLog";

export const IsSingleFaced = () => {
    const { store } = useContext(Context)
    useEffect(()=> {
        detailedLog(store.searchedCard)
    },[store.searchedCard])
    const manaCost = () => {
        if (store.searchedCard.mana_cost) {
            return (
                <>
                    <h3>Mana cost: {store.searchedCard.mana_cost}</h3>
                </>
            );
        };
    };

    const cmc = () => {
        if (store.searchedCard.cmc) {
            return (
                <>
                    <h3>CMC: {store.searchedCard.cmc}</h3>
                </>
            );
        };
    };

    const typeLine = () => {
        if (store.searchedCard.type_line) {
            return (
                <>
                    <h3>Card type: {store.searchedCard.type_line}</h3>
                </>
            );
        };
    };

    const rulesText = () => {
        if (store.searchedCard.oracle_text) {
            return (
                <>
                    <h3>Rules text:</h3>
                    <h5>{store.searchedCard.oracle_text}</h5>
                </>
            );
        };
    };

    const flavorText = () => {
        if (store.searchedCard.flavor_text) {
            return (
                <>
                    <h3>Flavor text:</h3>
                    <h5><i>{`"${store.searchedCard.flavor_text}"`}</i></h5>
                </>
            );
        };
    };

    return (
        <>
            <div>
                <h1>{store.searchedCard.name}</h1>
                <CardSearchControls />
            </div>
            <div className="justify-text">
                {manaCost()}
                {cmc()}
                {typeLine()}
                {rulesText()}
                {flavorText()}
            </div>
            <img loading="lazy" src={store.searchedCard.image_uris.normal} />
        </>
    )
}