import React, { useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';

const App = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const logout = () => {
    setUser(null); // Reset user data on logout
    navigate('/login'); // Redirect to login page
  };

  return (
    <Auth0Provider
      domain="dev-yx51zo7bdgwb2h76.us.auth0.com"
      clientId="6yANjqkhGlke1mLDa5mfUaS9F5xllYwE"
      authorizationParams={{ redirect_uri: window.location.origin }}
    >
      <nav>
        <Link to="/">Home</Link>
        {user ? (
          <>
            <span>Welcome, {user.name}!</span>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </>
        )}
      </nav>
      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/signup" element={<Signup setUser={setUser} />} />
      </Routes>
    </Auth0Provider>
  );
};

export default App;
