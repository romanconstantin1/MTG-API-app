import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Search } from "./pages/search";
import { Login } from "./pages/login";
import { Signup } from "./pages/signup";
import { NewDeck } from "./pages/newdeck";
import { SavedCards } from "./pages/cards";
import { SavedDecks } from "./pages/decks";
import { SingleCard } from "./pages/singlecard";
import { SingleDeck } from "./pages/singledeck";
import { CardInDeck } from "./component/savedDecks/cardInDeck.jsx";
import injectContext from "./store/appContext";
import { NeedAuth } from "./component/needAuth";
import { NotFound } from "./component/notFound";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";


//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if(!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL/ >;

    const isAuthenticatedUser = localStorage.getItem("username");

    const ProtectedRoute = ({ children }) => {
        if (!isAuthenticatedUser) {
          return <Navigate to="/autherror" replace />
        }
      
        return children;
      };

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Login />} path="/login" />
                        <Route element={<Signup />} path="/signup" />
                        <Route element={<Search />} path="/search/:cardname" />
                        <Route element={<NotFound />} path="*" />
                        <Route element={<NeedAuth />} path="autherror" />
                        
                        <Route element={
                            <ProtectedRoute>
                                <SavedCards />
                            </ProtectedRoute>
                        } path="/cards" />
                            
                        <Route element={
                            <ProtectedRoute>
                                <SingleCard />
                            </ProtectedRoute>    
                        } path="/cards/single/:carddata" />

                        <Route element={
                            <ProtectedRoute>
                                <SavedDecks />
                            </ProtectedRoute>
                        } path="/decks" />

                        <Route element={
                            <ProtectedRoute>
                                <NewDeck />
                            </ProtectedRoute>
                        } path="/create_new_deck" />

                        <Route element={
                            <ProtectedRoute>
                                <SingleDeck />
                            </ProtectedRoute>
                        } path="/decks/single/:deckdata" />
                        
                        
                        <Route element={<Demo />} path="/demo" />
                        
                        
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
