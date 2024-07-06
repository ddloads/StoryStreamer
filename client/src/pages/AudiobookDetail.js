 // client/src/pages/AudiobookDetail.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const AudiobookDetail = () => {
  const { id } = useParams();
  const [audiobook, setAudiobook] = useState(null);

  useEffect(() => {
    const fetchAudiobook = async () => {
      const response = await fetch(`/api/audiobooks/${id}`);
      const data = await response.json();
      setAudiobook(data);
    };

    fetchAudiobook();
  }, [id]);

  if (!audiobook) return <p>Loading...</p>;

  return (
    <div className="audiobook-detail">
      <img src={audiobook.coverImage} alt={audiobook.title} />
      <h1>{audiobook.title}</h1>
      <p>{audiobook.author}</p>
      <p>{audiobook.narrator}</p>
      <p>{audiobook.description}</p>
    </div>
  );
};

export default AudiobookDetail;