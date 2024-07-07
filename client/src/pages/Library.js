// client/src/pages/Library.js
import React, { useState, useEffect } from 'react';
import '../styles/pages/Library.css';
import AudiobookCard from '../components/AudiobookCard';

const Library = () => {
  const [audiobooks, setAudiobooks] = useState([]);

  useEffect(() => {
    const fetchAudiobooks = async () => {
      try {
        const response = await fetch('/api/audiobooks');
        const data = await response.json();
        setAudiobooks(data);
      } catch (error) {
        console.error('Failed to fetch audiobooks', error);
      }
    };

    fetchAudiobooks();
  }, []);

  return (
    <div className="library">
      <h1>Library</h1>
      <div className="audiobooks-grid">
        {audiobooks.map(audiobook => (
          <AudiobookCard key={audiobook._id} audiobook={audiobook} />
        ))}
      </div>
    </div>
  );
};

export default Library; // Ensure this is a default export
