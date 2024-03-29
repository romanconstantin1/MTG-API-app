import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";

import { Context } from "../../store/appContext.js";

import { UserName } from "./userName.jsx";
import { Password } from "./password.jsx";
import { Email } from "./email.jsx";
import { validateEmail } from "../../utils/validateEmail.js";

export const SignupForm = () => {
    const { store, actions } = useContext(Context);

    const [ firstName, setFirstName ] = useState("");
    const [ username, setUsername ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ emailConfirm, setEmaiConfirm ] = useState("");
    const [ password, setPassword ] = useState("");;
    const [ passwordConfirm, setPasswordConfirm ] = useState("")
    
    const handleSubmit = () => {
        if (validateEmail(email) == false) {
            return alert("Invalid email format!")
        }

        if (email !== emailConfirm) {
            return alert("Emails do not match!")
        } else if (password !== passwordConfirm) {
            return alert("Passwords do not match!")
        } else if (
            firstName === "" ||
            username === "" ||
            email === "" ||
            emailConfirm === "" ||
            password === "" ||
            passwordConfirm === ""
           ) {
            return alert("One or more required fields is missing!")
        } else {
            const userData = {
                "username": username,
                "firstname": firstName,
                "email": email,
                "password": password
            }

            actions.createNewUser(userData)

            setFirstName("")
            setUsername("")
            setEmail("")
            setEmaiConfirm("")
            setPassword("")
            setPasswordConfirm("")
    }};

    return (
        <>
            <UserName 
                username={firstName} 
                setUsername={setFirstName} 
                labelText={"First name:"} 
                elementId={"firstname"} 
                handleSubmit={handleSubmit}
            />
            <UserName 
                username={username} 
                setUsername={setUsername} 
                labelText={"User name:"} 
                elementId={"username"}
                handleSubmit={handleSubmit} 
            />
            <Email 
                email={email} 
                setEmail={setEmail} 
                labelText={"E-mail:"} 
                elementId={"email"}
                handleSubmit={handleSubmit} 
            />
            <Email 
                email={emailConfirm} 
                setEmail={setEmaiConfirm} 
                labelText={"Confirm e-mail:"} 
                elementId={"emailconfirm"}
                handleSubmit={handleSubmit} 
            />
            <Password 
                password={password} 
                setPassword={setPassword} 
                labelText={"Password:"} 
                elementId={"password"}
                handleSubmit={handleSubmit} 
            />
            <Password 
                password={passwordConfirm} 
                setPassword={setPasswordConfirm} 
                labelText={"Confirm password:"} 
                elementId={"passwordconfirm"}
                handleSubmit={handleSubmit}
            />
            
            <button className="m-3" onClick={() => handleSubmit()}>Create account</button>
            
            <Link to="/login">Already have an account? Log in here</Link>
        </>
    )
}