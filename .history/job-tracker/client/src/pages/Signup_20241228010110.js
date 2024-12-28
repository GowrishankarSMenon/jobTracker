import React, { useState } from 'react';
import axios from 'axios';

const Signup = ({ setUser, setToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/signup', { email, password });
      setUser(response.data.user);  // Save user data
      setToken(response.data.token);  // Save token in state or localStorage

      // Store token in localStorage
      localStorage.setItem('authToken', response.data.token);

      // Redirect to login or home after successful signup
      // navigate('/login');
    } catch (error) {
      console.error('Signup error:', error);
      alert('Signup failed');
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
