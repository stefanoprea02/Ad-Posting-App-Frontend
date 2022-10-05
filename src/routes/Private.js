import Cookies from "js-cookie";
import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../UserProvider";

const Private = (props) => {
    const user = useUser();

    const[isLoading, setIsLoading] = React.useState(true);
    const[isValid, setIsValid] = React.useState(null);
    const { children } = props;

    if(user && user.jwt){
        fetch(`http://localhost:8080/api/auth/validate`,{
            credentials: 'include',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.jwt}`
            }
        }).then((response) => response.text())
          .then((data) => {
            setIsValid(data);
            setIsLoading(false);
          });
    }else{
        return <Navigate to="/login" />;
    }

    return isLoading ? (
        <div>Loading...</div> 
        ) : isValid === "true" ? ( 
            children ) : ( <Navigate to="/login" /> );
}

export default Private;