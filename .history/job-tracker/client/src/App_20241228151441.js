import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Signup from './Signup';

const App = () => {
  const [user, setUser] = useState(null); // Holds the user data
  const [token, setToken] = useState(null); // Holds the auth token

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
