'use client';

import { useTheme } from 'next-themes';
import { useIsMounted } from '@/lib/hooks/useIsMounted';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const isMounted = useIsMounted();

  // On the server, isMounted is false.
  // On the client, React synchronizes it to true during hydration.
  if (!isMounted) {
    return <div className="p-3 w-10 h-10" />; // Placeholder with same dimensions
  }

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="fixed top-4 right-4 z-[100] p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700"
    >
      {theme === 'dark' ? '🌙' : '☀️'}
    </button>
  );
}