// client/src/components/AudiobookCard.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/components/AudiobookCard.css';

const AudiobookCard = ({ audiobook }) => {
  const coverImageUrl = audiobook.coverImage ? `${audiobook.coverImage}` : `${process.env.PUBLIC_URL}/images/book-cover-placeholder.png`;

  return (
    <Link to={`/audiobooks/${audiobook._id}`} className="audiobook-link">
      <div className="audiobook-card">
        <img src={coverImageUrl} alt={audiobook.title} className="cover-image" />
        <div className="audiobook-info">
          <h3 className="title">{audiobook.title}</h3>
          <p className="author">{audiobook.author}</p>
        </div>
      </div>
    </Link>
  );
};

export default AudiobookCard;
