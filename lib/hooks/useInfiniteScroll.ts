// hooks/useInfiniteScroll.ts
import { useEffect, useRef } from 'react';

export function useInfiniteScroll(
  callback: () => void,
  hasNextPage: boolean | undefined,
  isFetching: boolean
) {
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        // Only trigger if the element is visible AND we have more to fetch
        // AND we aren't currently fetching (mutex)
        if (first.isIntersecting && hasNextPage && !isFetching) {
          callback();
        }
      },
      { 
        threshold: 0.1, 
        rootMargin: '800px' // Load 800px before reaching the bottom
      }
    );

    const currentSentinel = sentinelRef.current;
    if (currentSentinel) {
      observer.observe(currentSentinel);
    }

    return () => {
      if (currentSentinel) {
        observer.unobserve(currentSentinel);
      }
    };
  }, [callback, hasNextPage, isFetching]);

  return sentinelRef;
}