import React, { useContext, useState } from "react";

import { Context } from "../store/appContext.js";

export const DeckCreator = () => {
	const {store, actions} = useContext(Context);
    const [deckName, setDeckName] = useState('');
    const [formatName, setFormatName] = useState('Select a format')
    const [open, setOpen] = useState(false);

    const listOfFormats = [
        "standard","future","historic",
        "gladiator","pioneer","explorer",
        "modern","legacy","pauper",
        "vintage","penny","commander",
        "oathbreaker","brawl","historicbrawl",
        "alchemy","paupercommander","duel",
        "premodern","predh"
    ]
    const handleOpen = () => {
        setOpen(!open);
    };

    const handleSetFormat = (name) => {
        setFormatName(name);
    }

	const handleDeckSave = () => {
        if (deckName=="" || formatName=='Select a format') {
            alert("One or more required parameters is missing");
        } else {
            actions.saveDeck(deckName, formatName);
        }	
	}

	return (
        <div className="deckname_input_div">
			<input  type="text"
                        placeholder="Create a new deck"
                        className="deckname_input"
                        onChange={event => setDeckName(event.target.value)}
                        value={deckName}
                />
            <div className="dropdown">
                <button onClick={handleOpen}>{formatName}</button>
                    {open ? (
                        <ul className="menu">
                            {listOfFormats.map(name => (
                                <li className="menu-item" key={name}>
                                    <div onClick={() => handleSetFormat(name)}>
                                        <h1>{name}</h1>
                                    </div>
                                    
                                </li>
                                ))
                            };    
                        </ul>
                    ) : null}
            </div>
			<button onClick={() => handleDeckSave()}>Save this deck</button>
		</div>
    );
};