import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";
import { Link } from "react-router-dom";
import { htmlNameEncode } from "../../utils/htmlNameEncode";

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
        //actions.getAllPrintings(htmlNameEncode(cardname))
        setQuery('')
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
                <div className="search_dropdown d-flex flex-column">
                    {cards?.map((cardname, index) => {
                        const path = `/search/${htmlNameEncode(cardname)}`    
                        return (
                            <Link to={path} key={index} className="text-start p-1">
                                <div className="d-flex justify-content-start w-100" onClick={() => handleSelect(cardname)}>
                                    <h6 >{cardname}</h6>
                                </div>
                            </Link>
                        )
                    }
                    )}
                </div>
            </div>
            
            <h6 className="my-3">Try "Mishra," "Urza," "Swords To Plowshares," etc.</h6>

            <button onClick={() => alert("random card")}>Find a random card</button>
        </div>
    )
}