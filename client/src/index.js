import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { AuthProvider } from './components/AuthProvider';
import { MediaPlayerProvider } from './context/MediaPlayerContext';
import MediaPlayer from './components/MediaPlayer';
import './styles/tailwind.css'; // Make sure to create this file and import Tailwind
import './styles/output.css';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <AuthProvider>
      <MediaPlayerProvider>
        <div className="font-sans text-gray-900 bg-gray-100">
          <App />
          <MediaPlayer />
        </div>
      </MediaPlayerProvider>
    </AuthProvider>
  </React.StrictMode>
);