import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ setUser, setToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      setToken(response.data.token);
      setUser(response.data.user);
      localStorage.setItem('authToken', response.data.token);
      navigate('/home');
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 shadow-md rounded-md w-full max-w-md">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="block w-full p-2 border border-gray-300 rounded mb-4"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="block w-full p-2 border border-gray-300 rounded mb-4"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className={`w-full p-2 rounded text-white ${
            loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          {loading ? 'Logging In...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default Login;
