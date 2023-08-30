import axios from "axios";
import { useRef } from "react";
const Login = () => {
    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const confirmPasswordInputRef = useRef();
const submitHandler = async (event) => {
    event.preventDefault();

    const emailInput = emailInputRef.current.value;
    const passwordInput = passwordInputRef.current.value;
    const confirmPasswordInput = confirmPasswordInputRef.current.value;

    

    const url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC88eK8XQXRR6cU6LtbTCJppJE6RKh3xAA'

    if(passwordInput === confirmPasswordInput) {
        try {
            const signUpData = {
                email:emailInput,
                password:passwordInput,
                returnSecureToken:true
            };
    
            const response = await axios.post(url,signUpData );
            

            
        } catch (error) {
            alert(error.response.data.error.message);
        }
        
    }
    else{
        alert('Password Does Not Match')
    }
};

    return (
        <form onSubmit={submitHandler}>
            <h2>Signup</h2>
            <input type="email" placeholder="Email" required ref={emailInputRef} />
            <input type="password" placeholder="Password" required ref={passwordInputRef} />
            <input type="password" placeholder="Confirm Password" required  ref={confirmPasswordInputRef}/>
            <button type="submit">Signup</button>
        </form>
    )
};

export default Login;