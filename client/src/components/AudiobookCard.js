// AudiobookCard.js
import React from 'react';
import { Link } from 'react-router-dom';

const AudiobookCard = ({ audiobook }) => {
  const coverImageUrl = audiobook.coverImage ? `${audiobook.coverImage}` : `${process.env.PUBLIC_URL}/images/book-cover-placeholder.png`;

  return (
    <Link to={`/audiobooks/${audiobook._id}`} className="block">
      <div className="bg-gray shadow-lg rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105 dark:bg-gray-800 dark:text-white">
        <img src={coverImageUrl} alt={audiobook.title} className="w-full h-60 object-cover" />
        <div className="p-4">
          <h3 className="text-lg font-semibold text-black-800 truncate dark:text-gray">{audiobook.title}</h3>
          <p className="text-sm text-white mt-1 dark:text-red-850">{audiobook.author}</p>
        </div>
      </div>
    </Link>
  );
};

export default AudiobookCard;
