import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import AppState from './context/AppState.jsx';
import React from 'react';
createRoot(document.getElementById('root')).render(
  <AppState>
    <App />
  </AppState>
);