import axios from "axios";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import AuthContext from "../store/auth-context";
import { useNavigate } from "react-router-dom";

const UpdateProfile = () => {
  const authCtx = useContext(AuthContext);
  const displayNameRef = useRef();
  const photoUrlRef = useRef();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  const updateProfileHandler = async (event) => {
    event.preventDefault();

    const token = authCtx.token;
    const displayName = displayNameRef.current.value;
    const photoUrl = photoUrlRef.current.value;

    const url = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyC88eK8XQXRR6cU6LtbTCJppJE6RKh3xAA`;

    try {
      const response = await axios.post(url, {
        idToken: token,
        displayName: displayName,
        photoUrl: photoUrl,
        returnSecureToken: true,
      });

      if (response.status === 200) {
        navigate('/welcome')
      } else {
        // Handle error responses (e.g., invalid token)
        console.error("Profile update failed:", response.data.error);
      }
    } catch (error) {
      console.error("Profile update failed:", error);
    }
  };

  

  const getUserDetails =useCallback(async() => {
    const url = 'https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyC88eK8XQXRR6cU6LtbTCJppJE6RKh3xAA';
    const token = authCtx.token;
    const response = await axios.post(url, {
      idToken:token
    });

    if(response.status === 200) {
      setUserData(response.data.users[0]);
    }else{
      console.log('Failed to Fetch');
    }
  },[authCtx.token]);

  useEffect(() => {
    getUserDetails();
  }, [getUserDetails]);

  return (
    <form onSubmit={updateProfileHandler}>
      <h2>Update Profile</h2>
      <input type="text" placeholder="Display Name" ref={displayNameRef} defaultValue={userData ? userData.displayName : ''} />
      <input type="text" placeholder="Photo URL" ref={photoUrlRef} defaultValue={userData ? userData.photoUrl : ''} />
      <button type="submit">Update Profile</button>
    </form>
  );
};

export default UpdateProfile;
