import React, { createContext, useContext } from "react";
import Cookies from "js-cookie";
const UserContext = createContext();

const UserProvider = ( {children} ) => {
    const [jwt, setJwt] = React.useState(Cookies.get("jwt"));

    const value = { jwt, setJwt };
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
};

function useUser(){
    const context = useContext(UserContext);
    if(context == undefined){
        throw new Error("useUser must be used within a UserProvider");
    }

    return context;
}

export{useUser, UserProvider};