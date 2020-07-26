import { useState, useMemo, useCallback, useEffect, useRef } from 'react';

// export const useHover = () => {
//   const [isHovered, setIsHovered] = useState(false);

//   const bind = useMemo(() => {
//     return {
//       onMouseOver: () => setIsHovered(true),
//       onMouseLeave: () => setIsHovered(true),
//     };
//   }, []);

//   return [isHovered, bind];
// };

export const useHover = () => {
  const [isHovered, setIsHovered] = useState(false);

  const ref = useRef();

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);

  const callbackRef = useCallback(
    (node) => {
      if (ref.current) {
        ref.current.removeEventListener('mouseenter', handleMouseEnter);
        ref.current.removeEventListener('mouseleave', handleMouseEnter);
      }

      ref.current = node;

      if (ref.current) {
        ref.current.addEventListener('mouseenter', handleMouseEnter);
        ref.current.addEventListener('mouseleave', handleMouseEnter);
      }
    },
    [handleMouseEnter, handleMouseLeave]
  );

  useEffect(() => {
    return () => {
      if (ref.current) {
        ref.current.removeEventListener('mouseenter', handleMouseEnter);
        ref.current.removeEventListener('mouseleave', handleMouseEnter);
      }
    };
  }, [handleMouseEnter, handleMouseLeave]);

  return [callbackRef, isHovered];
};
