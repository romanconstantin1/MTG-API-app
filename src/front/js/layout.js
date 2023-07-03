import React from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Search } from "./pages/search";
import { Login } from "./pages/login";
import { Signup } from "./pages/signup";
import { SavedCards } from "./pages/cards";
import { SavedDecks } from "./pages/decks";
import { SingleCard } from "./pages/singlecard";
import { SingleDeck } from "./pages/singledeck";
import { CardInDeck } from "./component/savedDecks/cardInDeck.jsx";
import injectContext from "./store/appContext";
import { NotFound } from "./component/notFound";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";


//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if(!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL/ >;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Login />} path="/login" />
                        <Route element={<Signup />} path="/signup" />
                        <Route element={<SavedCards />} path="/cards" />
                        <Route element={<SingleCard />} path="/cards/single/:carddata" />
                        <Route element={<SavedDecks />} path="/decks" />
                        <Route element={<SingleDeck />} path="/decks/single/:deckdata" />
                        <Route element={<Demo />} path="/demo" />
                        <Route element={<Search />} path="/search/:cardname" />
                        <Route element={<NotFound />} path="*" />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
