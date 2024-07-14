// Home.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CustomCarousel from '../components/Carousel';

const Home = ({ isDarkMode }) => {
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
    <div className={`space-y-8 ${isDarkMode ? 'dark' : ''}`}>
      <section>
        <h2 className="text-2xl font-bold mb-4 dark:text-white">Recently Added</h2>
        <CustomCarousel audiobooks={recentlyAdded} />
      </section>
      <section>
        <h2 className="text-2xl font-bold mb-4 dark:text-white">Recommended for You</h2>
        <CustomCarousel audiobooks={recommended} />
      </section>
    </div>
  );
};

export default Home;
