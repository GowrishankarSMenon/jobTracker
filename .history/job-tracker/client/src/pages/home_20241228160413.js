import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Home = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="min-h-screen flex flex-col items-center p-6 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">Welcome to the Job Tracker App</h1>
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
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Home;
