import { useState, useEffect } from 'react';

export const useOnScreen = (ref, rootMargin = '0px') => {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        console.log(entry);
        setIntersecting(entry.isIntersecting);
      },
      { rootMargin }
    );

    return () => {
      observer.unobserve(ref.current);
    };
  }, [ref, rootMargin]);

  return isIntersecting;
};
