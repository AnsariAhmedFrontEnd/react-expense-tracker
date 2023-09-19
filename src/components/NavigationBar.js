import { useNavigate } from "react-router-dom";
import { authActions } from "../store/authReducer";
import { useDispatch, useSelector } from "react-redux";
import './NavigationBar.css';

const NavigationBar = () => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(state => state.auth.isAuthenticated);
    const navigate = useNavigate();

    const logoutHandler = () => {
        dispatch(authActions.logout());
        localStorage.removeItem('token');
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