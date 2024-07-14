import React, { useState, useEffect } from 'react';
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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Library</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {audiobooks.map(audiobook => (
          <AudiobookCard key={audiobook._id} audiobook={audiobook} />
        ))}
      </div>
    </div>
  );
};

export default Library;