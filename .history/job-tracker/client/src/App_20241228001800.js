import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';

const App = () => {
  return (
    <Auth0Provider
      domain="dev-yx51zo7bdgwb2h76.us.auth0.com"
      clientId="6yANjqkhGlke1mLDa5mfUaS9F5xllYwE"
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
