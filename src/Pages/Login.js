import axios from "axios";
import { useRef, useState } from "react";
const Login = () => {
  const [isLogin, setIsLogin] = useState(false);

  const toggleButton = () => {
    setIsLogin((prevStat) => !prevStat);
  };
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();
  const submitHandler = async (event) => {
    event.preventDefault();


    if (!isLogin) {
      //Login Logic
      const emailInput = emailInputRef.current.value;
    const passwordInput = passwordInputRef.current.value;

      const Loginurl =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC88eK8XQXRR6cU6LtbTCJppJE6RKh3xAA";

      try {
        const authData = {
          email: emailInput,
          password: passwordInput,
          returnSecureToken: true,
        };

        const response= await axios.post(Loginurl, authData);
       console.log(response.data.idToken);
       localStorage.setItem('token', response.data.idToken);
      } catch (error) {
        alert(error.response.data.error.message);
      }
    } else {
      //Signup Logic
    const emailInput = emailInputRef.current.value;
    const passwordInput = passwordInputRef.current.value;
    const confirmPasswordInput = confirmPasswordInputRef.current.value;

      const url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC88eK8XQXRR6cU6LtbTCJppJE6RKh3xAA";

      if (passwordInput === confirmPasswordInput) {
        try {
          const authData = {
            email: emailInput,
            password: passwordInput,
            returnSecureToken: true,
          };

          await axios.post(url, authData);
        } catch (error) {
          alert(error.response.data.error.message);
        }
      } else {
        alert("Password Does Not Match");
      }
    }
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <h2>{isLogin ? "Signup" : "Login"}</h2>
        <input type="email" placeholder="Email" required ref={emailInputRef} />
        <input
          type="password"
          placeholder="Password"
          required
          ref={passwordInputRef}
        />
        {isLogin && (
          <input
            type="password"
            placeholder="Confirm Password"
            required
            ref={confirmPasswordInputRef}
          />
        )}
        <button type="submit">{isLogin ? "Signup" : "Login"}</button>
      </form>
      <button onClick={toggleButton}>
        {isLogin ? "Have an account? Login" : "Don't have an account ? Signup"}
      </button>
    </div>
  );
};

export default Login;
