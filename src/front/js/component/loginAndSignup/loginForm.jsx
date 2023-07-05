import React, { useState } from "react";
import { Link } from "react-router-dom";

import { Context } from "../../store/appContext";

import { UserName } from "./userName.jsx";
import { Password } from "./password.jsx";

export const LoginForm = () => {
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
        <>
            <UserName username={username} setUsername={setUsername} labelText={"User name:"} elementId={"username"}/>
            <Password password={password} setPassword={setPassword} labelText={"Password:"} elementId={"password"}/>
            
            <button className="m-3" onClick={()=>handleSubmit()}>Log in</button>

            <Link to="/signup">Need to create an account? Sign up here</Link>
        </>
    )
}