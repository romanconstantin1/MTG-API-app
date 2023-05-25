import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";

export const CardSearchBar = () => {
    const { store, actions } = useContext(Context)
    const [query, setQuery] = useState('')
    const [cards, setCards] = useState([])
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

    const handleClick = (cardname) => {
        actions.searchForCard(cardname)
    }

    return (
        <div>
            <div className="search">
                <h5>Card search</h5>
                <input  type="text"
                        placeholder={"Search for a card"}
                        className={"input"}
                        onChange={event => setQuery(event.target.value)}
                        value={query}
                />
            </div>
            {cards?.map((cardname, index) => 
                <div key={index} onClick={() => handleClick(cardname)}>
                    <h6>{cardname}</h6>
                </div>
            )}
            <h5>Try "Sigarda," "Avacyn," "Lightning Bolt," etc.</h5>
        </div>
    )
}