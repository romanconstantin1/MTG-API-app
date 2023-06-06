import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";

import { htmlNameEncode } from "./htmlNameEncode";

export const CardSearchBar = () => {
    const { store, actions } = useContext(Context)
    const [ query, setQuery ] = useState('')
    const [ cards, setCards ] = useState([])
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const resp = await fetch(`https://api.scryfall.com/cards/autocomplete?q=${query}`,
                {
                    method: "GET"
                })
                const data = await resp.json()
                setCards(data.data)
            } catch (error) {
                console.error(error)
            }
        }
        fetchData()
    }, [query])

    const handleSelect = (cardname) => {
        actions.searchForCard(cardname)
        actions.getAllPrintings(htmlNameEncode(cardname))
    }

    return (
        <div>
            <div className="search">
                <h5>Card search</h5>
                <input  type="text"
                        placeholder="Search for a card"
                        className="search_input"
                        onChange={event => setQuery(event.target.value)}
                        value={query}
                />
            </div>
            <div className="search_dropdown">
            {cards?.map((cardname, index) => 
                <div key={index} onClick={() => handleSelect(cardname)}>
                    <h6>{cardname}</h6>
                </div>
            )}
            </div>
            <h6>Try "Mishra," "Urza," "Swords To Plowshares," etc.</h6>
        </div>
    )
}