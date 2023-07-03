import { element } from "prop-types";
import React from "react";

export const Password = ({ password, setPassword, labelText, elementId }) => {
    return (
        <div>
            <label htmlFor={elementId} className="me-3">{labelText}</label>
            <input  type="password" 
                    id={elementId}
                    onChange={event => setPassword(event.target.value)}
                    value={password}/>
        </div>
    );
};