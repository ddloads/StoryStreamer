// Carousel.js
import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import AudiobookCard from './AudiobookCard';

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1024 },
    items: 7
  },
  desktop: {
    breakpoint: { max: 1024, min: 768 },
    items: 5
  },
  tablet: {
    breakpoint: { max: 768, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

const CustomCarousel = ({ title, audiobooks }) => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-0 text-black-800 dark:text-black">{title}</h2>
      <Carousel responsive={responsive} arrows className="pb-0">
        {audiobooks.map(audiobook => (
          <div key={audiobook._id} className="px-2">
            <AudiobookCard audiobook={audiobook} />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default CustomCarousel;
