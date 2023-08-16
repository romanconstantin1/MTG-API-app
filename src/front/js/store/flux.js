import { checkMaxQty } from "../utils/checkMaxQty";
import { detailedLog } from "../utils/detailedLog";

const basename = process.env.BASENAME;

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
			savedCards: ["default"],
			savedDecks: ["default"],
			selectedCard: null
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			setSelectedCard: (cardData) => {
				console.log(cardData)
				setStore({selectedCard: cardData})
			},

			resetSearch: () => {
				setStore({searchedCard: {name: null, image_uris: {normal: null}}})
			},

			createNewUser: async (userData) => {
				const actions = getActions()
				try {
					const resp = await fetch(process.env.BACKEND_URL + "/api/create_new_user", {
						method: "POST",
						headers: {
							"Access-Control-Allow-Origin": "*",
							"Content-Type": "application/json"
						},
						body: JSON.stringify(userData)
					})
					const data = await resp.json()

					if (resp.status != 200) {
						return alert(data.msg)
					}

					await actions.loginUser({
						"username": userData.username,
						"password": userData.password
					})
					return data;
				} catch(error) {
					console.log(`Error saving ${userData.username} to the db`, error)
				}
			},

			loginUser: async (userData) => {
				const actions = getActions()
				try {
					const resp = await fetch(process.env.BACKEND_URL + "/api/token_auth", {
						method: "POST",
						headers: {
							"Access-Control-Allow-Origin": "*",
							"Content-Type": "application/json"
						},
						body: JSON.stringify(userData)
					})
					const data = await resp.json()
					
					if (resp.status != 200) {
						return alert(data.msg)
					}

					localStorage.setItem("jwt_token", data.token);
					localStorage.setItem("user_id", data.user_id);
					localStorage.setItem("username", data.username);
					await actions.getSavedCards();
					await actions.getSavedDecks();
					//console.log(data);
					return data;
				} catch(error) {
					console.log(`Error trying to log in ${userData.username}`, error)
				}
			},

			logoutUser: () => {
				try {
					localStorage.removeItem("jwt_token");
					localStorage.removeItem("user_id");
					localStorage.removeItem("username");
					setStore({savedCards: []});
					setStore({savedDecks: []})
					console.log("Successfully logged out")
				} catch(error) {
					alert("No user is currently logged in")
				}

			},

			getSavedCards: async () => {
				const token = localStorage.getItem("jwt_token");
				try {
					const resp = await fetch(process.env.BACKEND_URL + "/api/cards", {
						method: "GET",
						headers: {
							"Content-Type": "application/json",
							"Authorization": `Bearer ${token}`
						}
					})
					const data = await resp.json()
					setStore({savedCards: data.saved_cards})
					return data;
				} catch(error) {
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
					console.log(data)
					setStore({allCardPrintings: data})
				} catch(error) {
					alert(`Something went wrong while searching for all printings`, error)
				}
			},

			searchForCard: async (cardname) => {
				const store = getStore()
				setStore({searchedCard: {name: "Loading...", image_uris: {normal: null}}})
				try {
					const resp = await fetch(`https://api.scryfall.com/cards/named?fuzzy=${cardname}`, {
						method: "GET"
					})
					const data = await resp.json()
					setStore({searchedCard: data})
					return data
				} catch(error) {
					alert(`Something went wrong while searching for ${cardname}`, error)
				}
			},

			saveCardToDB: async (cardData) => {
				const store = getStore()
				const actions = getActions()
				const token = localStorage.getItem("jwt_token");
				const user_id = localStorage.getItem("user_id");
				//check if a card being added is already in the DB
				const savedCardCheck = store.savedCards.find(
					cardExists => cardExists.scryfall_id === cardData.id || 
								cardExists.scryfall_id === cardData.scryfall_id)
				if (savedCardCheck) {
					console.log("this card is already in the database")
					return savedCardCheck
				}

				try {
					cardData.user_id = user_id;
					detailedLog(cardData)
					const resp = await fetch(process.env.BACKEND_URL + "/api/add_card", {
						method: "POST",
						headers: {
							"Access-Control-Allow-Origin": "*",
							"Content-Type": "application/json",
							"Authorization": `Bearer ${token}`,
						},
						body: JSON.stringify(cardData)
					})
					const data = await resp.json()
					await actions.getSavedCards()
					console.log("updated saved cards list")
					detailedLog(store.savedCards)
					return data;
				} catch(error) {
					console.log(`Error saving ${cardData.name} to the db`, error)
				}
			},

			getSingleSavedCard: async (cardID) => {
				const store = getStore()
				console.log(cardID)
				console.log(store.savedCards)
			},

			deleteCard: async (cardData) => {
				const store = getStore()
				const actions = getActions()
				const token = localStorage.getItem("jwt_token");
				const newSavedList = store.savedCards.filter(cardToFind => cardToFind.id !== cardData.id);
				setStore({savedCards: newSavedList});


				//update this to pass json message instead of value in url
				try {
					const resp = await fetch(process.env.BACKEND_URL + `/api/delete_card/${cardData.id}`, {
						method: "DELETE",
						headers: {
							"Access-Control-Allow-Origin": "*",
							"Content-Type": "application/json",
							"Authorization": `Bearer ${token}`
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
				const token = localStorage.getItem("jwt_token");
				try{
					const resp = await fetch(process.env.BACKEND_URL + "/api/decks", {
						method: "GET",
						headers: {
							"Content-Type": "application/json",
							"Authorization": `Bearer ${token}`
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
				const token = localStorage.getItem("jwt_token");
				const user_id = localStorage.getItem("user_id");
				const newDeck = {"deckname": deckName, "format": formatName, "cards": [], "user_id": user_id}
				const newDeckList = [...store.savedDecks]

				newDeckList.push(newDeck)
				setStore({savedDecks: newDeckList})

				try {
					const resp = await fetch(process.env.BACKEND_URL + "/api/add_deck", {
						method: "POST",
						headers: {
							"Access-Control-Allow-Origin": "*",
							"Content-Type": "application/json",
							"Authorization": `Bearer ${token}`
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
				const store = getStore();
				const actions = getActions();
				const token = localStorage.getItem("jwt_token");
				const newSavedList = store.savedDecks.filter(deckToFind => {
					return deckToFind.id !== deckData.id;
				  	});
				setStore({savedDecks: newSavedList});

				try {
					const resp = await fetch(process.env.BACKEND_URL + `/api/delete_deck/${deckData.id}`, {
						method: "DELETE",
						headers: {
							"Access-Control-Allow-Origin": "*",
							"Content-Type": "application/json",
							"Authorization": `Bearer ${token}`
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
			addSavedCardToDeck: async (deckId, cardData, quantity) => {
				const store = getStore()
				let newDeckList = [...store.savedDecks]

				const findDeck = newDeckList.find(cardList => cardList.id == deckId)
				const findCardInDeck = findDeck.cards.find(cardInDeck => cardInDeck.id == cardData.id)

				if (quantity === undefined) {
					quantity = 1
				}

				if (findCardInDeck) {
					const maxCheck = checkMaxQty(findDeck, findCardInDeck, findCardInDeck.quantity + 1)
					if (maxCheck == true) {
						findDeck.card_total += quantity
						findCardInDeck.quantity += quantity
					} else {
						return alert(maxCheck)
					}
				} else {
					cardData.quantity = quantity
					findDeck.card_total += quantity
					findDeck.cards.push(cardData)
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
					return data;
				} catch (error) {
					console.log(`Error adding ${cardData.cardname} to a deck`, error)
				}
			},

			addNewCardToDeck: async (deckId, quantity) => {
				const store = getStore()
				const actions = getActions()
				const savedCard = await actions.saveCardToDB(store.searchedCard)
				
				let newDeckList = [...store.savedDecks]
				
				if (quantity == undefined) {
					quantity = 1
				}

				const findDeck = newDeckList.find(cardList => cardList.id == deckId)
				const findCardInDeck = await findDeck.cards.find(cardToFind => cardToFind.cardname === savedCard.cardname)

				if (findCardInDeck) {
					// console.log("found card in deck:")
					// detailedLog(findCardInDeck)
					return actions.addSavedCardToDeck(deckId, findCardInDeck, quantity)
				} else {
					savedCard.quantity = quantity
					findDeck.card_total += quantity
					// console.log("new card in deck added")
					// detailedLog(savedCard)
					// console.log("deck details")
					// detailedLog(findDeck)
					await findDeck.cards.push(savedCard)
				}

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

			deleteCardFromDeck: async (deckId, cardData) => {
				const store = getStore()
				const actions = getActions()

				let newDeckList = [...store.savedDecks]
				const cardListSearch = newDeckList.find(cardList => cardList.id == deckId)
				if (cardListSearch) {
					const cardIndex = cardListSearch.cards.indexOf(cardData)
					cardListSearch.card_total -= cardData.quantity
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
							'card_id': cardData.id,
							'quantity': cardData.quantity
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
				const cardListSearch = newDeckList.find(cardList => cardList.id == deckId)
				if (cardListSearch) {
					const cardIndex = cardListSearch.cards.indexOf(cardData)
					cardListSearch.card_total += quantity
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
			},

			// when cards are moved to/from sideboard they briefly exist with a quantity of 0
			// need to fix that so that they don't display if the quantity is 0 
			
			// alternatively, a separate generic function that deletes a card from the list
			// but only on the front end?

			moveToSideboard: async (deckId, cardData) => {
				const store = getStore()
				const actions = getActions()
				let newDeckList = [...store.savedDecks]

				const findDeck = newDeckList.find(cardList => cardList.id == deckId)
				const findCardInDeck = {...findDeck.cards.find(cardInDeck => cardInDeck.id == cardData.id)}
				const findCardInSideboard = findDeck.sideboard.find(cardInDeck => cardInDeck.id == cardData.id)

				if (findCardInSideboard) {
					findCardInSideboard.quantity += 1
					cardData.quantity -= 1
				} else {
					findCardInDeck.quantity = 1
					findDeck.sideboard.push(findCardInDeck)
					cardData.quantity -= 1
				}

				findDeck.card_total -= 1
				findDeck.sideboard_total += 1
				setStore({savedDecks: newDeckList})

				try {
					const resp = await fetch(process.env.BACKEND_URL + '/api/decks/add_sideboard/', {
						method: "PUT",
						headers: {
							"Access-Control-Allow-Origin": "*",
							"Content-Type": "application/json"
						},
						body: JSON.stringify({
							'deck_id': deckId,
							'card_id': cardData.id,
							'quantity': cardData.quantity
						})
					})
					
					if (cardData.quantity <= 0) {
						await actions.deleteCardFromDeck(deckId, cardData)
					}

					const data = await resp.json();
					return data;
				} catch (error) {
					console.log(`Error adding ${cardData.cardname} to the sideboard`, error)
				}
			},

			moveToMaindeck: async (deckId, cardData) => {
				const store = getStore()
				const actions = getActions()
				let newDeckList = [...store.savedDecks]

				const findDeck = newDeckList.find(cardList => cardList.id == deckId)
				const findCardInDeck = findDeck.cards.find(cardInDeck => cardInDeck.id == cardData.id)
				const findCardInSideboard = {...findDeck.sideboard.find(cardInDeck => cardInDeck.id == cardData.id)}

				if (findCardInDeck) {
					findCardInDeck.quantity += 1
					cardData.quantity -= 1
				} else {
					findCardInSideboard.quantity = 1
					findDeck.cards.push(findCardInSideboard)
					cardData.quantity -= 1
				}

				findDeck.card_total += 1
				findDeck.sideboard_total -= 1
				setStore({savedDecks: newDeckList})

				try {
					const resp = await fetch(process.env.BACKEND_URL + '/api/decks/move_card_main/', {
						method: "PUT",
						headers: {
							"Access-Control-Allow-Origin": "*",
							"Content-Type": "application/json"
						},
						body: JSON.stringify({
							'deck_id': deckId,
							'card_id': cardData.id,
							'quantity': cardData.quantity
						})
					})
					
					if (cardData.quantity <= 0) {
						await actions.deleteCardFromSideboard(deckId, cardData)
					}

					const data = await resp.json();
					return data;
				} catch (error) {
					console.log(`Error adding ${cardData.cardname} to the sideboard`, error)
				}
			},

			deleteCardFromSideboard: async (deckId, cardData) => {
				const store = getStore()
				const actions = getActions()

				let newDeckList = [...store.savedDecks]

				const findDeck = newDeckList.find(cardList => cardList.id == deckId)
				const cardListSearch = newDeckList.find(cardList => cardList.id == deckId)
				if (cardListSearch) {
					const cardIndex = cardListSearch.sideboard.indexOf(cardData)
					cardListSearch.sideboard.splice(cardIndex, 1)
				}

				findDeck.sideboard_total -= cardData.quantity
				setStore({savedDecks: newDeckList})

				try {
					const resp = await fetch(process.env.BACKEND_URL + '/api/decks/delete_sideboard/', {
						method: "DELETE",
						headers: {
							"Access-Control-Allow-Origin": "*",
							"Content-Type": "application/json"
						},
						body: JSON.stringify({
							'deck_id': deckId,
							'card_id': cardData.id,
							'quantity': cardData.quantity
						})
					})
					const data = await resp.json();
					console.log(data)
					return data;
				} catch (error) {
					console.log(`Error removing ${cardData.cardname} from a deck`, error)
				}
			},

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
