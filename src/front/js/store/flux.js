import { detailedLog } from "../utils/detailedLog";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			randomCard: "",
			searchedCard: {name: null, image_uris: {normal: null}},
			allCardPrintings: [],
			savedCards: [],
			savedDecks: []
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			resetSearch: () => {
				setStore({searchedCard: {name: null, image_uris: {normal: null}}})
			},

			getSavedCards: async () => {
				try{
					const resp = await fetch(process.env.BACKEND_URL + "/api/cards", {
						method: "GET",
						headers: {
							"Content-Type": "application/json"
						}
					})
					const data = await resp.json()
					setStore({savedCards: data.saved_cards})
					return data;
				}catch(error){
					console.log("Unable to get saved cards on load", error)
				}
			},

			getRandomCards: async () => {
				try {
					const resp = await fetch("https://api.scryfall.com/cards/random?q=is%3Acommander", {
						method: "GET"
					})
					const data = await resp.json()
					setStore({randomCard: data.name})
					return data.name
				} catch(error) {
					alert(`Something went wrong while fetching a random card`, error)
				}
			},

			getAllPrintings: async (encodedname) => {
				const store = getStore()
				try {
					console.log(`attempt to get all prints of ${encodedname}`)
					const resp = await fetch(`https://api.scryfall.com/cards/search?q=%22${encodedname}%22&include%3Aextras&unique=prints`, {
						method: "GET"
					})
					const data = await resp.json()
					setStore({allCardPrintings: data})
				} catch(error) {
					alert(`Something went wrong while searching for all printings`, error)
				}
			},

			searchForCard: async (cardname) => {
				const store = getStore()
				try {
					const resp = await fetch(`https://api.scryfall.com/cards/named?fuzzy=${cardname}`, {
						method: "GET"
					})
					const data = await resp.json()
					console.log(data)
					setStore({searchedCard: data})
					return data
				} catch(error) {
					alert(`Something went wrong while searching for ${cardname}`, error)
				}
			},

			saveCardToDB: async (cardData) => {
				const store = getStore()
				const actions = getActions()

				//check if a card being added is already in the DB
				console.log(cardData)
				const savedCardCheck = store.savedCards.find(
					cardExists => cardExists.image_small === cardData.image_uris.small)
				if (savedCardCheck) {
					// in the future, this could potentially just add 1 to the total # in collection
					console.log(`${savedCardCheck.cardname} is already in the db`)
					return savedCardCheck
				}
				//a function here to transform cardData to same format as the backend
				//it might make more sense to do the transformation here & have this be the only place where the card format changes
				// but this doesn't work because i need the backend id
				// this is the same problem as the spotify project. 
				// if the user can deal with the very minor inconvenience of waiting a second
				// this will be fine
				try {
					const resp = await fetch(process.env.BACKEND_URL + "/api/add_card", {
						method: "POST",
						headers: {
							"Access-Control-Allow-Origin": "*",
							"Content-Type": "application/json"
						},
						body: JSON.stringify(cardData)
					})
					const data = await resp.json()
					await actions.getSavedCards()
					return data;
				} catch(error) {
					console.log(`Error saving ${cardData.name} to the db`, error)
				}
			},

			deleteCard: async (cardData) => {
				const store = getStore()
				const actions = getActions()
				const newSavedList = store.savedCards.filter(cardToFind => cardToFind.id !== cardData.id);
				setStore({savedCards: newSavedList});


				//update this to pass json message instead of value in url
				try {
					const resp = await fetch(process.env.BACKEND_URL + `/api/delete_card/${cardData.id}`, {
						method: "DELETE",
						headers: {
							"Access-Control-Allow-Origin": "*",
							"Content-Type": "application/json"
						}
					})
					const data = await resp.json();
					console.log(`deleted ${cardData.cardname} from saved cards db`)
					actions.getSavedDecks();
					return data;
				} catch (error) {
					console.log(`Error deleting ${cardData.cardname} from the db`, error)
				}
			},

			getSavedDecks: async () => {
				try{
					const resp = await fetch(process.env.BACKEND_URL + "/api/decks", {
						method: "GET",
						headers: {
							"Content-Type": "application/json"
						}
					})
					const data = await resp.json()
					console.log(data.saved_decks)
					setStore({savedDecks: data.saved_decks})
					return data;
				}catch(error){
					console.log("Unable to get saved decks on load", error)
				}
			},

			saveDeckToDB: async (deckName, formatName) => {
				const store = getStore()
				const actions = getActions()

				const newDeck = {"deckname": deckName, "format": formatName, "cards": []}
				const newDeckList = [...store.savedDecks]

				newDeckList.push(newDeck)
				setStore({savedDecks: newDeckList})

				try {
					const resp = await fetch(process.env.BACKEND_URL + "/api/add_deck", {
						method: "POST",
						headers: {
							"Access-Control-Allow-Origin": "*",
							"Content-Type": "application/json"
						},
						body: JSON.stringify(newDeck)
					})
					const data = await resp.json()
					actions.getSavedDecks()
					return data;
				} catch(error) {
					console.log(`Error saving ${deckName} to the db`, error)
				}

			},

			deleteDeck: async (deckData) => {
				const store = getStore()
				const actions = getActions()
				const newSavedList = store.savedDecks.filter(deckToFind => {
					return deckToFind.id !== deckData.id;
				  	});
				setStore({savedDecks: newSavedList});

				try {
					const resp = await fetch(process.env.BACKEND_URL + `/api/delete_deck/${deckData.id}`, {
						method: "DELETE",
						headers: {
							"Access-Control-Allow-Origin": "*",
							"Content-Type": "application/json"
						}
					})
					const data = await resp.json();
					actions.getSavedDecks()
					return data;
				} catch (error) {
					console.log(`Error deleting ${deckData.deckname} from the db`, error)
				}
			},

			// the next few functions are basically the same; would be good to find a way to reduce it to one
			// or add more modularity to how the functions... function
			addNewCardToDeck: async (deckId, quantity) => {
				const store = getStore()
				const actions = getActions()
				const savedCard = await actions.saveCardToDB(store.searchedCard)
				if (quantity == undefined) {
					quantity = 1
				}
				let newDeckList = [...store.savedDecks]
				const findDeck = newDeckList.find(cardList => cardList.id == deckId)
				
				if (findDeck) {
					const findCardInDeck = await findDeck.cards.find(cardInDeck => cardInDeck.id == savedCard.id)
					if (findCardInDeck) {
						findCardInDeck.quantity += quantity
					} else {
						savedCard.quantity = quantity
						await findDeck.cards.push(savedCard)
					}
				}
				
				// if (findDeck) {
				// 	await findDeck.cards.push(savedCard)
				// }
				console.log(newDeckList)
				await setStore({savedDecks: newDeckList})
				
				try {
					const resp = await fetch(process.env.BACKEND_URL + '/api/decks/add_card/', {
						method: "PUT",
						headers: {
							"Access-Control-Allow-Origin": "*",
							"Content-Type": "application/json"
						},
						body: JSON.stringify({
							'deck_id': deckId,
							'card_id': savedCard.id,
							'quantity': quantity
						})
					})
					const data = await resp.json(); 
					return data;
				} catch (error) {
					console.log(`Error adding ${savedCard.cardname} to a deck`, error)
				}
			},

			addSavedCardToDeck: async (deckId, cardData, quantity) => {
				const store = getStore()
				const actions = getActions()
				if (quantity == undefined) {
					quantity = 1
				}
				cardData.quantity = quantity

				let newDeckList = [...store.savedDecks]
				const findDeck = newDeckList.find(cardList => cardList.id == deckId)

				if (findDeck) {
					const findCardInDeck = findDeck.cards.find(cardInDeck => cardInDeck.id == cardData.id)
					if (findCardInDeck) {
						findCardInDeck.quantity += quantity
					} else {
						findDeck.cards.push(cardData)
					}
				}
				setStore({savedDecks: newDeckList})

				try {
					const resp = await fetch(process.env.BACKEND_URL + '/api/decks/add_card/', {
						method: "PUT",
						headers: {
							"Access-Control-Allow-Origin": "*",
							"Content-Type": "application/json"
						},
						body: JSON.stringify({
							'deck_id': deckId,
							'card_id': cardData.id,
							'quantity': quantity
						})
					})
					const data = await resp.json();
					console.log(data)
					return data;
				} catch (error) {
					console.log(`Error adding ${cardData.cardname} to a deck`, error)
				}
			},

			deleteCardFromDeck: async (deckId, cardData) => {
				const store = getStore()
				const actions = getActions()

				let newDeckList = [...store.savedDecks]
				const cardListSearch = newDeckList.find(cardList => cardList.id == deckId)
				if (cardListSearch) {
					const cardIndex = cardListSearch.cards.indexOf(cardData)
					cardListSearch.cards.splice(cardIndex, 1)
				}
				setStore({savedDecks: newDeckList})

				try {
					const resp = await fetch(process.env.BACKEND_URL + '/api/decks/delete_card/', {
						method: "DELETE",
						headers: {
							"Access-Control-Allow-Origin": "*",
							"Content-Type": "application/json"
						},
						body: JSON.stringify({
							'deck_id': deckId,
							'card_id': cardData.id
						})
					})
					const data = await resp.json();
					console.log(data)
					return data;
				} catch (error) {
					console.log(`Error removing ${cardData.cardname} from a deck`, error)
				}
			},

			changeCardQuantity: async (deckId, cardData, quantity) => {
				const store = getStore()
				const actions = getActions()

				let newDeckList = [...store.savedDecks]
				console.log(newDeckList)
				const cardListSearch = newDeckList.find(cardList => cardList.id == deckId)
				if (cardListSearch) {
					const cardIndex = cardListSearch.cards.indexOf(cardData)
					cardListSearch.cards[cardIndex].quantity += quantity
				}
				setStore({savedDecks: newDeckList})

				try {
					const resp = await fetch(process.env.BACKEND_URL + '/api/decks/change_card_qty/', {
						method: "PUT",
						headers: {
							"Access-Control-Allow-Origin": "*",
							"Content-Type": "application/json"
						},
						body: JSON.stringify({
							'deck_id': deckId,
							'card_id': cardData.id,
							'quantity': quantity
						})
					})
					const data = await resp.json();
					console.log(data)
					return data;
				} catch (error) {
					console.log(`Error adding ${cardData.cardname} to a deck`, error)
				}
			}
			,
			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello/")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
