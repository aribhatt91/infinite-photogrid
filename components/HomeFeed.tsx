// app/page.tsx
'use client';

import { VirtuosoMasonry } from '@virtuoso.dev/masonry';
import { usePhotos } from '@/lib/hooks/usePhotos';
import { useWindowWidth } from '@/lib/hooks/useWindowWidth';
import { useInfiniteScroll } from '@/lib/hooks/useInfiniteScroll';
import PhotoTile from '@/components/PhotoTile';
import { useMemo } from 'react';

export default function HomeFeed() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = usePhotos();
  const width = useWindowWidth();

  // Flattening the infinite query pages
  const allPhotos = useMemo(() => 
    data?.pages.flat() ?? [], 
    [data?.pages]
  );

  /**
   * Logic for column counts based on requirements:
   * 5 for lg, 4 for md, 3 for sm.
   */
  const columns = useMemo(() => {
    if (!width) return 3; // Default for SSR
    if (width >= 1280) return 5;
    if (width >= 1024) return 4;
    return 3;
  }, [width]);

  // Attach our custom observer
  const sentinelRef = useInfiniteScroll(
    fetchNextPage, 
    hasNextPage, 
    isFetchingNextPage
  );

  console.log('allPhotos::', allPhotos);

  return (
    <>
      <VirtuosoMasonry
      className='w-full'
        data={allPhotos}
        columnCount={columns}
        initialItemCount={30}
        // This is critical for performance; helps React identify nodes during recycling
        // computeItemKey={(item) => item.id} 
        // endReached={() => hasNextPage && fetchNextPage()}
        // overscan={800} // Pre-render 800px ahead to ensure smooth scrolling
        useWindowScroll // Uses the main window scrollbar instead of an internal div
        ItemContent={PhotoTile}
      />
      
      {/* Loading Sentinel */}
      <div 
        ref={sentinelRef} 
        className="h-20 w-full flex items-center justify-center"
      >
        {isFetchingNextPage && (
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-r-transparent" />
        )}
      </div>
    </>
  );
}