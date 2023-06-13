import React, { useContext, useState } from "react";

import { Context } from "../store/appContext.js";
import { listOfFormats } from "../utils/dataLists.js";

export const DeckCreator = () => {
	const { actions } = useContext(Context);
    const [ deckName, setDeckName ] = useState('');
    const [ formatName, setFormatName ] = useState('Select a format')

    const handleSetFormat = (name) => {
        setFormatName(name);
    }

	const handleDeckSave = () => {
        if (deckName=="" || formatName=='Select a format') {
            alert("One or more required parameters is missing");
        } else {
            actions.saveDeckToDB(deckName, formatName);
        }	
	}

	return (
        <div className="d-flex flex-wrap">
            <div className="deckname_input_div">
                <input type="text"
                    placeholder="Create a new deck"
                    className="deckname_input"
                    onChange={event => setDeckName(event.target.value)}
                    value={deckName}
                />
            </div>
            
            <label htmlFor="new-deck-format-select">Format:</label>
            <select name="decks" id="deck-select" onChange={(event) => handleSetFormat(event.target.value)}>
                <option value="">Select a format</option>
                {listOfFormats.map((formatName) => (
                <option key={formatName} value={formatName}>{formatName}</option>
                ))}
            </select>
            <div>
                <button onClick={() => handleDeckSave()}>Save this deck</button>
            </div>
        </div>
    );
};