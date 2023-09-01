import { useState } from "react";
import AuthContext from "./auth-context";

const AuthProvider = (props) => {
const initialToken = localStorage.getItem('token');
const [token, setToken] = useState(initialToken);

const isLoggedIn = !!token;

const loginHandler = (token) => {
setToken(token);
localStorage.setItem('token' , token);
}

const logoutHandler = (token) => {
    setToken(null);
    localStorage.removeItem('token');
    }

const contextValue = {
    token:token,
    isLoggedIn: isLoggedIn,
    login: loginHandler,
    logout:logoutHandler,
}

    return (
        <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>
    )
};

export default AuthProvider