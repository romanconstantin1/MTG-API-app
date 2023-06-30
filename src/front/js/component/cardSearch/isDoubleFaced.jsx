import React, { useContext, useEffect } from "react";
import { Context } from "../../store/appContext";

import { CardSearchControls } from "./cardSearchControls.jsx";
import { detailedLog } from "../../utils/detailedLog";

export const IsDoubleFaced = () => {
    const { store } = useContext(Context)
    
    useEffect(()=> {
        detailedLog(store.searchedCard)
    },[store.searchedCard])
    

    const frontFlavorText = () => {
        if (store.searchedCard.card_faces[0].flavor_text) {
            return (
                <>
                    <h3>Flavor text:</h3>
                    <h5><i>{`"${store.searchedCard.card_faces[0].flavor_text}"`}</i></h5>
                </>
            );
        };
    };

    const backManaCost = () => {
        if (store.searchedCard.card_faces[1].mana_cost) {
            return (
                <>
                    <h3>Mana cost: {store.searchedCard.card_faces[1].mana_cost}</h3>
                </>
            );
        };
    };

    const backRulestext = () => {
        if (store.searchedCard.card_faces[1].oracle_text) {
            return (
                <>
                    <h3>Rules text:</h3>
                    <h5>{store.searchedCard.card_faces[1].oracle_text}</h5>
                </>
            );
        };
    };

    const backFlavorText = () => {
        if (store.searchedCard.card_faces[1].flavor_text) {
            return (
                <>
                    <h3>Flavor text:</h3>
                    <h5><i>{`"${store.searchedCard.card_faces[1].flavor_text}"`}</i></h5>
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

            {/* card front */}
            <div>
                <img src={store.searchedCard.card_faces[0].image_uris.normal} />
                <h3>Mana cost: {store.searchedCard.card_faces[0].mana_cost}</h3>
                <h3>CMC: {store.searchedCard.cmc}</h3>
                <h3>Type: {store.searchedCard.card_faces[0].type_line}</h3>
                <h3>Rules text:</h3>
                <h5>{store.searchedCard.card_faces[0].oracle_text}</h5>
                {frontFlavorText()}
            </div>

            {/* card back */}
            <div>
                <img src={store.searchedCard.card_faces[1].image_uris.normal} />
                {backManaCost()}
                <h3>Type: {store.searchedCard.card_faces[1].type_line}</h3>
                {backRulestext()}
                {backFlavorText()}
            </div>
        </>
    );
};