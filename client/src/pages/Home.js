// client/src/pages/Home.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CustomCarousel from '../components/Carousel';
import '../styles/pages/Home.css';

const Home = () => {
  const [recentlyAdded, setRecentlyAdded] = useState([]);
  const [recommended, setRecommended] = useState([]);

  useEffect(() => {
    const fetchAudiobooks = async () => {
      try {
        const recent = await axios.get('/api/audiobooks/recent');
        const recommend = await axios.get('/api/audiobooks/recommended');
        setRecentlyAdded(recent.data);
        setRecommended(recommend.data);
      } catch (error) {
        console.error('Error fetching audiobooks:', error);
      }
    };

    fetchAudiobooks();
  }, []);

  return (
    <div className="home-page">
      <CustomCarousel title="Recently Added" audiobooks={recentlyAdded} />
      <CustomCarousel title="Recommended for You" audiobooks={recommended} />
    </div>
  );
};

export default Home;
