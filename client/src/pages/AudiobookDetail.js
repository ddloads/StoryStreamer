import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MediaPlayer from '../components/MediaPlayer';

const AudiobookDetail = () => {
  const { id } = useParams();
  const [audiobook, setAudiobook] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const fetchAudiobook = async () => {
      try {
        const response = await fetch(`/api/audiobooks/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setAudiobook(data);
      } catch (error) {
        console.error("Failed to fetch audiobook details", error);
      }
    };

    fetchAudiobook();
  }, [id]);

  if (!audiobook) {
    return <p className="text-center text-gray-600 text-xl mt-8">Loading...</p>;
  }

  const baseUrl = window.location.origin.includes('localhost') ? 'http://localhost:5000' : 'http://192.168.1.63:5000';
  const coverImagePath = (audiobook.coverImage && audiobook.coverImage.trim() !== "" && audiobook.coverImage !== "null")
    ? `${baseUrl}${audiobook.coverImage}`
    : '/images/book-cover-placeholder.png';

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white shadow-lg rounded-lg">
      <div className="md:flex">
        <div className="md:flex-shrink-0">
          <img className="h-48 w-full object-cover md:w-48" src={coverImagePath} alt={audiobook.title} />
        </div>
        <div className="mt-4 md:mt-0 md:ml-6">
          <h1 className="text-2xl font-bold text-gray-900">{audiobook.title}</h1>
          <h2 className="text-xl text-gray-600">by {audiobook.author}</h2>
          <p className="mt-2"><strong>Narrator:</strong> {audiobook.narrator}</p>
          <p><strong>Publish Year:</strong> {new Date(audiobook.dateAdded).getFullYear()}</p>
          <p><strong>Genres:</strong> {audiobook.genres ? audiobook.genres.join(', ') : 'N/A'}</p>
          <p><strong>Language:</strong> {audiobook.language || 'N/A'}</p>
          <p><strong>Duration:</strong> {audiobook.duration || 'N/A'}</p>
          <p><strong>Size:</strong> {audiobook.size || 'N/A'}</p>
          <div className="mt-4">
            <p>Your Progress: {audiobook.progress || 0}%</p>
            <p>{audiobook.timeRemaining || '0 min'} remaining</p>
          </div>
          <button 
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => setIsPlaying(true)}
          >
            Play
          </button>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-semibold">Description</h3>
        <p className="mt-2 text-gray-600">{audiobook.description}</p>
      </div>
      {isPlaying && <MediaPlayer audiobook={audiobook} onClose={() => setIsPlaying(false)} />}
    </div>
  );
};

export default AudiobookDetail;