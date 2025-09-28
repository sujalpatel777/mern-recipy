// src/main.jsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { ReduxProvider } from './store/ReduxProvider';
import { ThemeProvider } from './context/ThemeContext';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ReduxProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </ReduxProvider>
  </React.StrictMode>
);