import { useInfiniteQuery } from '@tanstack/react-query';
import CONFIG from '@/lib/config';

export function usePhotos() {
  return useInfiniteQuery({
    queryKey: ['photos'],
    queryFn: async ({ pageParam = 1 }: { pageParam: number }) => {
      const res = await fetch(
        `${CONFIG.API_BASE_URL}photos?page=${pageParam}&per_page=${CONFIG.PER_PAGE_ITEMS_COUNT}&client_id=${CONFIG.UNSPLASH_ACCESS_KEY}`
      );
      if (!res.ok) throw new Error('Network error');
      return res.json();
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => allPages.length + 1,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}