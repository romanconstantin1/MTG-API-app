import React, { useState } from "react";

import { LoginForm } from "../component/loginAndSignup/loginForm.jsx";

export const Login = () => {

    return (
        <div className="d-flex flex-column align-items-center">
            <h1>Log in to your account</h1>

            <LoginForm />
        </div>
    ) 
}