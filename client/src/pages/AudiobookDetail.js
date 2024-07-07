// client/src/pages/AudiobookDetail.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/pages/AudiobookDetail.css';

const AudiobookDetail = () => {
  const { id } = useParams();
  const [audiobook, setAudiobook] = useState(null);

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
    return <p>Loading...</p>;
  }

  const baseUrl = window.location.origin.includes('localhost') ? 'http://localhost:5000' : 'http://192.168.1.63:5000';
  const coverImagePath = (audiobook.coverImage && audiobook.coverImage.trim() !== "" && audiobook.coverImage !== "null")
    ? `${baseUrl}${audiobook.coverImage}`
    : '/images/book-cover-placeholder.png';

  return (
    <div className="audiobook-detail">
      <div className="cover-section">
        <img src={coverImagePath} alt={audiobook.title} />
      </div>
      <div className="info-section">
        <h1>{audiobook.title}</h1>
        <h2>by {audiobook.author}</h2>
        <p><strong>Narrator:</strong> {audiobook.narrator}</p>
        <p><strong>Publish Year:</strong> {new Date(audiobook.dateAdded).getFullYear()}</p>
        <p><strong>Genres:</strong> {audiobook.genres ? audiobook.genres.join(', ') : 'N/A'}</p>
        <p><strong>Language:</strong> {audiobook.language || 'N/A'}</p>
        <p><strong>Duration:</strong> {audiobook.duration || 'N/A'}</p>
        <p><strong>Size:</strong> {audiobook.size || 'N/A'}</p>
        <div className="progress-section">
          <p>Your Progress: {audiobook.progress || 0}%</p>
          <p>{audiobook.timeRemaining || '0 min'} remaining</p>
        </div>
        <div className="play-section">
          <button className="play-button">Play</button>
        </div>
        <div className="description-section">
          <p>{audiobook.description}</p>
        </div>
      </div>
    </div>
  );
};

export default AudiobookDetail;
