import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import './App.css';
import { Register } from "./pages/Register";
import { Interface } from "./pages/Interface";
import { Login } from "./pages/Login";
import {RecoilRoot} from 'recoil'
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { NavbarDefault } from "./components/Navbar";

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  useEffect(() => {
    // Check for token on initial render
    const storedToken = localStorage.getItem('token');
    if (storedToken !== token) {
      setToken(storedToken);
    }
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };
  return (
    <>
      <NavbarDefault token={token} handleLogout={handleLogout} />
      <RecoilRoot>
        <Routes>
          <Route path = "/" element ={<Home setToken={setToken} />}></Route>
            <Route path = "/register" element ={<Register/>}></Route>
            <Route
              path="/login"
              element={token ? <Navigate to="/interface" /> : <Login setToken={setToken} />}
            />
            <Route
              path="/interface"
              element={token ? <Interface /> : <Navigate to="/login" />}
            />
        </Routes> 
      </RecoilRoot>
      
    </>
  )
}

export default App;
