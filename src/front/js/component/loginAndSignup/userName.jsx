import React from "react";

export const UserName = ({ username, setUsername, labelText, elementId, handleSubmit }) => {
    const handleKeyPress = event => {
        if (event.key === "Enter") {
            handleSubmit();
        };
    };
    
    return (
        <div>
            <label htmlFor={elementId} className="me-3">{labelText}</label>
            <input  type="text" 
                    id={elementId} 
                    placeholder="example_user" 
                    onChange={event => setUsername(event.target.value)}
                    onKeyDown={event => handleKeyPress(event)}
                    value={username}/>
        </div>
    );
};