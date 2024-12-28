import React from 'react';
import { useRoutes } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';

const App = () => {
  const routes = useRoutes([
    { path: '/login', element: <Login /> },
    { path: '/home', element: <Home /> },
  ]);

  return routes;
};

export default App;
