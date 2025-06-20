// src/components/CarouselComponent.js
import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const CarouselComponent = ({ slides, autoPlay, interval, infiniteLoop }) => {
  return (
    <Carousel 
        autoPlay={autoPlay || true}
        infiniteLoop={infiniteLoop || true}
        interval={interval || 5000}
        emulateTouch={true}
        dynamicHeight={false}
        showThumbs={false}
    >
      {slides.map((slide, index) => (
        <div key={index} className="video-slide" style={{ pointerEvents: 'none' }}>
          <iframe 
            src={slide.src} 
            title={`Video Slide ${index + 1}`} 
            frameBorder="0" 
            allow="autoplay; encrypted-media" 
            allowFullScreen 
          />
        </div>
      ))}
    </Carousel>
  );
};

export default CarouselComponent;
