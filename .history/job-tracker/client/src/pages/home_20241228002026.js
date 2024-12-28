import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const Home = ({ user }) => {
  const { logout } = useAuth0();

  return (
    <div>
      <h1>Welcome to the Job Tracker App</h1>

      {user ? (
        <div>
          <p>Welcome, {user.name}!</p>
          <img src={user.picture} alt="User" />
          <p>Email: {user.email}</p>
          <button onClick={() => logout({ returnTo: window.location.origin })}>Logout</button>
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
