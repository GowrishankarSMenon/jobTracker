import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const Home = () => {
  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
    <div>
      <h1>Welcome to the Job Tracker App</h1>

      {isAuthenticated ? (
        <div>
          <p>Welcome, {user.name}!</p>
          <img src={user.picture} alt="User" />
          <p>Email: {user.email}</p>
          <button onClick={() => logout({ returnTo: window.location.origin })}>Logout</button>
        </div>
      ) : (
        <div>
          <p>You are not logged in.</p>
          <button onClick={() => loginWithRedirect()}>Login</button>
        </div>
      )}
    </div>
  );
};

export default Home;
