// client/src/components/Carousel.js
import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import AudiobookCard from './AudiobookCard';
import '../styles/components/Carousel.css';

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
    items: 5
  }
};

const CustomCarousel = ({ title, audiobooks }) => {
  return (
    <div className="carousel-container">

      <h2>{title}</h2>
      <Carousel responsive={responsive} arrows>
        {audiobooks.map(audiobook => (
          <AudiobookCard key={audiobook._id} audiobook={audiobook} />
        ))}
      </Carousel>
    </div>
  );
};

export default CustomCarousel;
