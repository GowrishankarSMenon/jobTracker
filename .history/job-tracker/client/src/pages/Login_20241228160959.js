import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const { setUser } = useContext(AuthContext); // Access setUser from AuthContext
  const [username, setUsername] = useState('');

  const handleLogin = () => {
    if (username) {
      setUser(username); // Set the user
      console.log('User logged in:', username);
    } else {
      console.error('Username is required!');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Enter username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
