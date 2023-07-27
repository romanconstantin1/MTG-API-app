import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Context } from "../../store/appContext";

import { UserName } from "./userName.jsx";
import { Password } from "./password.jsx";
import { detailedLog } from "../../utils/detailedLog";

export const LoginForm = () => {
    const { actions } = useContext(Context)
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    
    const handleSubmit = async () => {
        if (username === "" || password === "") {
            return alert("One or more required parameters is missing")
        };

        const userData = {
            "username": username,
            "password": password
        };

        const logincheck = await actions.loginUser(userData);

        if (logincheck.username === username) navigate("/cards");
        // setUsername("");
        // setPassword(""); 
        
    };

    return (
        <>
            <UserName 
                username={username} 
                setUsername={setUsername} 
                labelText={"User name:"} 
                elementId={"username"}
                handleSubmit={handleSubmit}  
            />

            <Password 
                password={password} 
                setPassword={setPassword} 
                labelText={"Password:"} 
                elementId={"password"}
                handleSubmit={handleSubmit} 
            />
            
            <button className="m-3" onClick={()=>handleSubmit()}>Log in</button>

            <Link to="/signup">Need to create an account? Sign up here</Link>
        </>
    );
};