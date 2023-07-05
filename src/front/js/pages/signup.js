import React, { useContext, useState } from "react";

import { SignupForm } from "../component/loginAndSignup/signupForm.jsx";

export const Signup = () => {
    return (
        <div className="d-flex flex-column align-items-center">
            <h1>Create an account</h1>
            <h6>All fields are required</h6>

            <SignupForm />
        </div>
    ) 
    
}