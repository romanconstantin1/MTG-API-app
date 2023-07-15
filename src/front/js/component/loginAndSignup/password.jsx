import React from "react";

export const Password = ({ password, setPassword, labelText, elementId, handleSubmit }) => {
    const handleKeyPress = event => {
        if (event.key === "Enter") {
            handleSubmit();
        };
    };
    
    return (
        <div>
            <label htmlFor={elementId} className="me-3">{labelText}</label>
            <input  type="password" 
                    id={elementId}
                    onChange={event => setPassword(event.target.value)}
                    onKeyDown={event => handleKeyPress(event)}
                    value={password}/>
        </div>
    );
};