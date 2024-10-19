import React, { useRef, useEffect, useState } from 'react';
import './FadeIn.css';

const FadeIn = (props) => {
  const fadeInRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0, // Adjust this threshold as needed
    };

    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, options);

    if (fadeInRef.current) {
      observer.observe(fadeInRef.current);
    }

    return () => {
      if (fadeInRef.current) {
        observer.unobserve(fadeInRef.current);
      }
    };
  }, []);

  return (
    <div ref={fadeInRef} className={`fade-in ${isVisible ? 'visible' : ''}`}>
      {props.children}
    </div>
  );
};

export default FadeIn;