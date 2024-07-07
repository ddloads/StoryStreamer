// client/src/index.js
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import './styles/App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
