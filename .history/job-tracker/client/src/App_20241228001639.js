import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';

const App = () => {
  return (
    <Auth0Provider
      domain="your-auth0-domain"
      clientId="your-auth0-client-id"
      authorizationParams={{ redirect_uri: window.location.origin }}
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Auth0Provider>
  );
};

export default App;
