// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import Home from './Home';
import { useAuth0 } from '@auth0/auth0-react';

const App = () => {
  const { isAuthenticated, user } = useAuth0();

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <Navigate to="/home" /> : <Navigate to="/login" />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={isAuthenticated ? <Home user={user} /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
