import React, { useState } from "react";
import { Link } from "react-router-dom";

import { UserName } from "../component/loginAndSignup/userName.jsx";
import { Password } from "../component/loginAndSignup/password.jsx";

export const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    
    const handleSubmit = () => {
        if (username === "" || password === "") {
            return alert("One or more required parameters is missing")
        }

        alert(`username: ${username} \n password: ${password}`)
        setUsername("")
        setPassword("")
    }

    return (
        <div className="d-flex flex-column align-items-center">
            <h1>Log in to your account</h1>

            <UserName username={username} setUsername={setUsername} labelText={"User name:"} elementId={"username"}/>
            <Password password={password} setPassword={setPassword} labelText={"Password:"} elementId={"password"}/>
            
            <button className="m-3" onClick={()=>handleSubmit()}>Log in</button>

            <Link to="/signup">Need to create an account? Sign up here</Link>
        </div>
    ) 
}