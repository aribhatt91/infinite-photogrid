// hooks/useWindowWidth.ts
import { useState, useEffect } from 'react';

/**
 * Hook to track window width with debouncing.
 * Handles SSR by initializing with undefined and updating on mount.
 */
export function useWindowWidth(delay = 200) {
  // Initialize with undefined so we know if we're on the server
  const [windowWidth, setWindowWidth] = useState<number | undefined>(
    undefined
  );

  useEffect(() => {
    // Set initial width on mount
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();

    let timeoutId: NodeJS.Timeout;

    const debouncedResize = () => {
      // Clear previous timeout to "debounce" the execution
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setWindowWidth(window.innerWidth);
      }, delay);
    };

    window.addEventListener('resize', debouncedResize);

    // Clean up to prevent memory leaks
    return () => {
      window.removeEventListener('resize', debouncedResize);
      clearTimeout(timeoutId);
    };
  }, [delay]);

  return windowWidth;
}