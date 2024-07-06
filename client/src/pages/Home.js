// client/src/pages/Home.js
import React, { useEffect, useState } from 'react';
import AudiobookCard from '../components/AudiobookCard';

const Home = () => {
  const [audiobooks, setAudiobooks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAudiobooks = async () => {
      try {
        const response = await fetch('/api/audiobooks'); // Relative URL
        console.log('Response:', response); // Log the response
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Data:', data); // Log the data
        setAudiobooks(data);
      } catch (error) {
        console.error('Failed to fetch audiobooks:', error);
        setError(error.message);
      }
    };

    fetchAudiobooks();
  }, []);

  return (
    <div className="home">
      <h1>Audiobooks</h1>
      {error && <p>Error: {error}</p>}
      <div className="audiobook-list">
        {audiobooks.map(audiobook => (
          <AudiobookCard key={audiobook._id} audiobook={audiobook} />
        ))}
      </div>
    </div>
  );
};

export default Home;