import { useContext } from "react";
import AuthContext from "../store/auth-context";
import { useNavigate } from "react-router-dom";

const NavigationBar = () => {
    const authCtx = useContext(AuthContext);
    const navigate = useNavigate();

    const logoutHandler = () => {
        authCtx.logout();
        navigate('/')
    };
    return (
        <header>
            <h2>Expense Tracker</h2>
            <button onClick={logoutHandler}>Logout</button>
        </header>
    )
};

export default NavigationBar;