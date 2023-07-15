import React from "react";

export const Email = ({ email, setEmail, labelText, elementId, handleSubmit }) => {
    const handleKeyPress = event => {
        if (event.key === "Enter") {
            handleSubmit();
        };
    };
    
    return (
        <div>
            <label htmlFor={elementId} className="me-3">{labelText}</label>
            <input  type="email" 
                    id={elementId} 
                    placeholder="curseremoval@strixhaven.edu" 
                    onChange={event => setEmail(event.target.value)}
                    onKeyDown={event => handleKeyPress(event)}
                    value={email}/>
        </div>
        
    )
}