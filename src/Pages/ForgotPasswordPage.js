import axios from "axios";
import { useRef } from "react";
import './ForgotPasswordPage.css'

const ForgotPasswordPage = () => {
    
  const emailInputRef = useRef();

  const forgotPasswordHandler = async (event) => {
    event.preventDefault();
    const email = emailInputRef.current.value;
    const url =
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyC88eK8XQXRR6cU6LtbTCJppJE6RKh3xAA";

    try {
      const response = await axios.post(url , {
        requestType: "PASSWORD_RESET",
        email:email
      });
      if(response.status === 200) {
        alert('Please check your email');
      }else{
        console.log('error');
      }

    } catch (error) {
        console.log(error);
    }
  };
  return (
    <div className="forgot-password-container">
      <h2>Forgot Password</h2>
      <form onSubmit={forgotPasswordHandler} className="password-reset-form">
        <input
          type="email"
          placeholder="Enter Your Email"
          ref={emailInputRef}
          className="email-input"
        />
        <button type="submit" className="send-link-button">
          Send Reset Link
        </button>
      </form>
    </div>
  );
};

export default ForgotPasswordPage;
