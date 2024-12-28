import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';

const App = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('authToken'));

  return (
    <Router>
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
    </Router>
  );
};

export default App;
