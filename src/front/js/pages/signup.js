import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext.js";

import { UserName } from "../component/loginAndSignup/userName.jsx";
import { Password } from "../component/loginAndSignup/password.jsx";
import { Email } from "../component/loginAndSignup/email.jsx";

export const Signup = () => {
    const { store, actions } = useContext(Context);

    const [ firstName, setFirstName ] = useState("");
    const [ username, setUsername ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ emailConfirm, setEmaiConfirm ] = useState("");
    const [ password, setPassword ] = useState("");;
    const [ passwordConfirm, setPasswordConfirm ] = useState("")
    
    const handleCreateAccount = () => {
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
        <div className="d-flex flex-column align-items-center">
            <h1>Create an account</h1>
            <h6>All fields are required</h6>

            <UserName 
                username={firstName} 
                setUsername={setFirstName} 
                labelText={"First name:"} 
                elementId={"firstname"} 
                />
            <UserName 
                username={username} 
                setUsername={setUsername} 
                labelText={"User name:"} 
                elementId={"username"} 
                />
            <Email 
                email={email} 
                setEmail={setEmail} 
                labelText={"E-mail:"} 
                elementId={"email"} 
                />
            <Email 
                email={emailConfirm} 
                setEmail={setEmaiConfirm} 
                labelText={"Confirm e-mail:"} 
                elementId={"emailconfirm"} 
                />
            <Password 
                password={password} 
                setPassword={setPassword} 
                labelText={"Password:"} 
                elementId={"password"} 
                />
            <Password 
                password={passwordConfirm} 
                setPassword={setPasswordConfirm} 
                labelText={"Confirm password:"} 
                elementId={"passwordconfirm"}/>
            
            {/* <div>
                <label htmlFor="email_init" className="me-3">Email address:</label>
                <input type="email" id="email_init" placeholder="curseremoval@strixhaven.edu" />
            </div>
                
            <div>
                <label htmlFor="email_confirm" className="me-3">Confirm email address:</label>
                <input type="email" id="email_confirm" />
            </div>

            <div>
                <label htmlFor="user_name_signup" className="me-3">User name:</label>
                <input type="text" id="user_name_signup" placeholder="caller_of_beasts" />
            </div>

            <div>  
                <label htmlFor="password_signup_init" className="me-3">Password: </label>
                <input type="password" id="password_signup_init" placeholder="password" />
            </div>

            <div>  
                <label htmlFor="password_signup_confirm" className="me-3">Confirm password:</label>
                <input type="password" id="password_signup_confirm" />
            </div> */}
            
            <button className="m-3" onClick={() => handleCreateAccount()}>Create account</button>
            <Link to="/login">Already have an account? Log in here</Link>
        </div>
    ) 
    
}