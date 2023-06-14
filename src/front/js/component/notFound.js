import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const NotFound = () => {
    const navigate = useNavigate();
  
    // React.useEffect(() => {
    //   navigate('/');
    // }, [navigate]);
  
    return (
        <div>
            <h1>Not found!</h1>
        </div>
    );
  }