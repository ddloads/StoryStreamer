 // client/src/components/AudiobookCard.js
import React from 'react';
import { Link } from 'react-router-dom';

const AudiobookCard = ({ audiobook }) => {
  return (
    <div className="audiobook-card">
      <img src={audiobook.coverImage} alt={audiobook.title} />
      <h3>{audiobook.title}</h3>
      <p>{audiobook.author}</p>
      <Link to={`/audiobook/${audiobook._id}`}>More Details</Link>
    </div>
  );
};

export default AudiobookCard;