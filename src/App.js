import Login from "./Pages/Login";
import { Route, Routes } from "react-router-dom";
import Welcome from "./Pages/Welcom";

const App = () => {
  const token = localStorage.getItem('token');

  const isLoggedIn = !!token
  return (
   <Routes>
   {!isLoggedIn && <Route path="/" element={<Login />} />}
   {isLoggedIn && <Route path="/welcome" element={<Welcome />}  />}
    
    </Routes>
    );
}

export default App;
