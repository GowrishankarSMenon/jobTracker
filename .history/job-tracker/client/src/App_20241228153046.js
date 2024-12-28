import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Login from './pages/Login';
import Signup from './pages/Signup';

const Home = ({ user, setUser, setToken }) => {
  const [view, setView] = useState('login'); // Tracks current view: 'login', 'signup', or 'home'
  const { logout } = useAuth0();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token && !user) {
      setUser({ name: 'John Doe', email: 'john@example.com', picture: '/path-to-avatar' });
      setView('home');
    }
  }, [user, setUser]);

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('authToken');
    logout({ returnTo: window.location.origin });
    setView('login');
  };

  const renderContent = () => {
    if (view === 'home' && user) {
      return (
        <div className="flex flex-col items-center">
          <p className="text-xl font-semibold">Welcome, {user.name}!</p>
          <img src={user.picture} alt="User Avatar" className="w-24 h-24 rounded-full my-4" />
          <p>Email: {user.email}</p>
          <button
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      );
    }

    if (view === 'login') {
      return (
        <div className="max-w-sm mx-auto">
          <Login setUser={setUser} setToken={setToken} />
          <p className="text-center mt-4">
            Don't have an account?{' '}
            <button
              className="text-blue-500 underline"
              onClick={() => setView('signup')}
            >
              Sign Up
            </button>
          </p>
        </div>
      );
    }

    return (
      <div className="max-w-sm mx-auto">
        <Signup setUser={setUser} setToken={setToken} />
        <p className="text-center mt-4">
          Already have an account?{' '}
          <button
            className="text-blue-500 underline"
            onClick={() => setView('login')}
          >
            Log In
          </button>
        </p>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 p-4">
      <h1 className="text-3xl font-bold mb-8">Welcome to the Job Tracker App</h1>
      {renderContent()}
    </div>
  );
};

export default Home;
