import React from "react";

export const UserName = ({ username, setUsername, labelText, elementId }) => {
    return (
        <div>
            <label htmlFor={elementId} className="me-3">{labelText}</label>
            <input  type="text" 
                    id={elementId} 
                    placeholder="example_user" 
                    onChange={event => setUsername(event.target.value)}
                    value={username}/>
        </div>
    );
};