import axios from "axios";
import { useRef } from "react";

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
    <form onSubmit={forgotPasswordHandler}>
      <input placeholder="Enter Your Email" ref={emailInputRef} />
      <button>Send Link</button>
    </form>
  );
};

export default ForgotPasswordPage;
