import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Login from './Login';
import Signup from './Signup';

const Home = ({ user, setUser, setToken }) => {
  const [view, setView] = useState('login');
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
        <div className="flex flex-col items-center space-y-4">
          <p className="text-xl font-semibold">Welcome, {user.name}!</p>
          <img
            src={user.picture}
            alt="User Avatar"
            className="w-24 h-24 rounded-full"
          />
          <p className="text-gray-600">Email: {user.email}</p>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      );
    }

    return view === 'login' ? (
      <div>
        <Login setUser={setUser} setToken={setToken} />
        <p className="mt-4 text-sm text-gray-500">
          Don't have an account?{' '}
          <button
            className="text-blue-500 hover:underline"
            onClick={() => setView('signup')}
          >
            Sign Up
          </button>
        </p>
      </div>
    ) : (
      <div>
        <Signup setUser={setUser} setToken={setToken} />
        <p className="mt-4 text-sm text-gray-500">
          Already have an account?{' '}
          <button
            className="text-blue-500 hover:underline"
            onClick={() => setView('login')}
          >
            Log In
          </button>
        </p>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-6 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">Welcome to the Job Tracker App</h1>
      {renderContent()}
    </div>
  );
};

export default Home;
