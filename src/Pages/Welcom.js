import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import "./Welcom.css";

const Welcome = () => {
  const idToken = useSelector((state) => state.auth.token);

  const verifyEmailHandler = async () => {
    const url =
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyC88eK8XQXRR6cU6LtbTCJppJE6RKh3xAA";
    alert("Please Check your Email");
    try {
      const response = await axios.post(url, {
        requestType: "VERIFY_EMAIL",
        idToken: idToken,
      });

      if (response.status === 200) {
        console.log(response);
      } else {
        console.log("Email not sent");
      }
    } catch (error) {
      console.log(error);
    }
  };


 
  return (
    <div className="welcome-container">
      <div className="message">
        <button className="link-button" onClick={verifyEmailHandler}>
          Verify Email
        </button>
        <div className="profile">
          <h2 className="text"> Your Profile is Incomplete</h2>
          <div className="link-button">
            <Link to="/profile">Complete Now</Link>
          </div>
        </div>
      </div>
      <div className="add-expense">
        <Link to="expenses">
          <button className="button">Add Expenses</button>
        </Link>
      </div>
    </div>
  );
};

export default Welcome;
