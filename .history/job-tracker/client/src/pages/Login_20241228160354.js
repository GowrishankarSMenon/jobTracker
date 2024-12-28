import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { setUser, setToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });
      const { token, user } = response.data;

      setToken(token);
      setUser(user);
      localStorage.setItem('authToken', token);

      navigate('/home');
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 shadow-md rounded-md w-full max-w-md">
      <h2 className="text-2xl font-bold mb-4">Log In</h2>
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
          {loading ? 'Logging In...' : 'Log In'}
        </button>
      </form>
      <div className="mt-4 text-center">
        <p className="text-gray-600">
          Don't have an account?{' '}
          <button
            className="text-blue-500 underline hover:text-blue-700"
            onClick={() => navigate('/signup')}
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
