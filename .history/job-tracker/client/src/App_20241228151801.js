import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';  // You can keep this for other auth if you want
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';

const App = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('authToken')); // Retrieve token if available

  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('authToken');  // Remove token from localStorage
    navigate('/login');  // Redirect to login page
  };

  return (
    <Router>
      <Routes>
        {/* Redirect to login if user isn't authenticated */}
        <Route
          path="/"
          element={
            user ? (
              <Home user={user} setUser={setUser} setToken={setToken} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/login"
          element={<Login setUser={setUser} setToken={setToken} />}
        />
        <Route
          path="/signup"
          element={<Signup setUser={setUser} setToken={setToken} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
