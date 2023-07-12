import React from "react";
import { Navigate } from "react-router-dom";

const isAuthenticatedUser = localStorage.getItem("username");

export const NeedAuth = () => {
    return (
        <>
            {!isAuthenticatedUser && (<div>
                <h1>To access this content, please log in or sign up first</h1>
            </div>)}
            {isAuthenticatedUser && (
                <Navigate to="/" replace />
            )}
        </>
    );
};