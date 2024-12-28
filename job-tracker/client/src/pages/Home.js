import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Login from './Login';
import Signup from './Signup';

const Home = ({ user, setUser, setToken }) => {
  const [view, setView] = useState('login'); // Tracks current view: 'login', 'signup', or 'home'
  const { logout } = useAuth0();


  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('authToken');
    logout({ returnTo: window.location.origin });
    setView('login'); // Redirect to login view after logout
  };

  const renderContent = () => {
    if (view === 'home' && user) {
      return (
        <div style={styles.userContainer}>
          <p>Welcome, {user.name}!</p>
          <img src={user.picture} alt="User Avatar" style={styles.avatar} />
          <p>Email: {user.email}</p>
          <button style={styles.button} onClick={handleLogout}>
            Logout
          </button>
        </div>
      );
    }

    if (view === 'login') {
      return (
        <div style={styles.formContainer}>
          <Login setUser={setUser} setToken={setToken} />
          <p style={styles.switchText}>
            Don't have an account?{' '}
            <button style={styles.linkButton} onClick={() => setView('signup')}>
              Sign Up
            </button>
          </p>
        </div>
      );
    }

    return (
      <div style={styles.formContainer}>
        <Signup setUser={setUser} setToken={setToken} />
        <p style={styles.switchText}>
          Already have an account?{' '}
          <button style={styles.linkButton} onClick={() => setView('login')}>
            Log In
          </button>
        </p>
      </div>
    );
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Welcome to the Job Tracker App</h1>
      {renderContent()}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
  },
  heading: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  formContainer: {
    maxWidth: '400px',
    width: '100%',
  },
  userContainer: {
    textAlign: 'center',
  },
  avatar: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    marginBottom: '10px',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  switchText: {
    marginTop: '10px',
    fontSize: '14px',
    color: '#555',
  },
  linkButton: {
    background: 'none',
    color: '#007BFF',
    border: 'none',
    textDecoration: 'underline',
    cursor: 'pointer',
    fontSize: '14px',
  },
};

export default Home;
