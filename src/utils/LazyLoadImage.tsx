import React, { useState, useEffect, useRef } from 'react';

interface LazyLoadImagePropsType {
  src: string;
  alt: string;
  className?: string;
}

const LazyLoadImage = ({ src, alt, className }: LazyLoadImagePropsType) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '100px 0px 100px 0px',
      }
    );

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => {
      if (imageRef.current) {
        observer.unobserve(imageRef.current);
      }
    };
  }, []);

  return <img ref={imageRef} src={isVisible ? src : ''} alt={alt} className={className} />;
};

export default LazyLoadImage;
