import React from 'react';
import { useAuth0 } from '@auth0/auth0-react'; // If you want to use Auth0

const Home = ({ user, setUser, setToken }) => {
  const { logout } = useAuth0();

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('authToken');  // Remove token from localStorage
    logout({ returnTo: window.location.origin }); // Auth0 logout
  };

  return (
    <div>
      <h1>Welcome to the Job Tracker App</h1>

      {user ? (
        <div>
          <p>Welcome, {user.name}!</p>
          <img src={user.picture} alt="User" />
          <p>Email: {user.email}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <p>You are not logged in.</p>
        </div>
      )}
    </div>
  );
};

export default Home;
