import React, { useState } from 'react';
import axios from 'axios';

const Signup = ({ setUser, setToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // Loading state for UX
  const [errorMessage, setErrorMessage] = useState(''); // Error message for better feedback

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(''); // Reset error message on form submit

    try {
      const response = await axios.post('http://localhost:5000/api/auth/signup', { email, password });

      // Save user and token in state
      setUser(response.data.user);
      setToken(response.data.token);

      // Store token in localStorage for persistence
      localStorage.setItem('authToken', response.data.token);

      // navigate('/login'); // Uncomment if using react-router
    } catch (error) {
      console.error('Signup error:', error);

      // Handle errors more gracefully
      if (error.response && error.response.data && error.response.data.message) {
        setErrorMessage(error.response.data.message); // Display error message from backend
      } else {
        setErrorMessage('An unexpected error occurred. Please try again later.');
      }
    } finally {
      setLoading(false); // Stop the loading spinner
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
      <h2>Sign Up</h2>
      {errorMessage && (
        <div style={{ color: 'red', marginBottom: '10px' }}>{errorMessage}</div>
      )}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '10px',
              marginBottom: '10px',
              border: '1px solid #ccc',
              borderRadius: '4px',
            }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength="6" // Optional: enforce password length
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '4px',
            }}
          />
        </div>
        <button
          type="submit"
          disabled={loading} // Disable button during signup
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: loading ? '#ccc' : '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer',
          }}
        >
          {loading ? 'Signing Up...' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
};

export default Signup;
