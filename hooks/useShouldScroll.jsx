import { useEffect, useRef } from 'react';

// scroll if scroll at the bootom and automatically scroll down if at bottom otherwise did't

export function useShouldScroll(ref) {
  const shouldScrollRef = useRef(true);

  useEffect(() => {
    const node = ref.current;

    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } = node;
      const atBottom = scrollHeight === clientHeight + scrollTop;
      shouldScrollRef.current = atBottom;
    };

    node.addEventListener('scroll', handleScroll);

    return () => {
      node.removeEventListener('scroll', handleScroll);
    };
  }, [ref]);

  useEffect(() => {
    if (shouldScrollRef.current) {
      const node = ref.current;
      node.scrollTop = node.scrollHeight;
    }
  });
}
