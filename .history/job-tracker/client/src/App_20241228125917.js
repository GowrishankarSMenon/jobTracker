import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';  // You can keep this for other auth if you want
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';

const App = () => {
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('authToken');  // Remove token from localStorage
    navigate('/login');  // Redirect to login page
  };

  return (
    <div>
      <Auth0Provider
        domain="dev-yx51zo7bdgwb2h76.us.auth0.com"
        clientId="6yANjqkhGlke1mLDa5mfUaS9F5xllYwE"
        authorizationParams={{ redirect_uri: window.location.origin }}
      >
        <nav>
          <button onClick={handleLogout}>Logout</button>
        </nav>
        <Routes>
          <Route path="/" element={<Home user={user} setUser={setUser} setToken={setToken} />} />
          <Route path="/login" element={<Login setUser={setUser} setToken={setToken} />} />
          <Route path="/signup" element={<Signup setUser={setUser} setToken={setToken} />} />
        </Routes>
      </Auth0Provider>
    </div>
  );
};

export default App;
