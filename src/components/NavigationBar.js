import { useContext } from "react";
import AuthContext from "../store/auth-context";
import { useNavigate } from "react-router-dom";
import './NavigationBar.css';

const NavigationBar = () => {
    const authCtx = useContext(AuthContext);
    const isLoggedIn = authCtx.isLoggedIn;
    const navigate = useNavigate();

    const logoutHandler = () => {
        authCtx.logout();
        navigate('/');
    };
    return (
        <header className="navbar">
            <h2>SpendSmartly</h2>
            {isLoggedIn && <button onClick={logoutHandler}>Logout</button>}
        </header>
    )
};

export default NavigationBar;