import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';

const App = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('authToken'));

  return (
    <Routes>
      <Route
        path="/login"
        element={<Login setUser={setUser} setToken={setToken} />}
      />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/home"
        element={user ? <Home user={user} /> : <Navigate to="/login" />}
      />
    </Routes>
  );
};

export default App;
