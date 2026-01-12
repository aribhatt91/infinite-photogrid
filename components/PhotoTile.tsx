'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { decode } from 'blurhash';

// Helper to convert BlurHash to DataURL
function getBlurDataUrl(hash: string, width: number = 32, height: number = 32) {
  if (!hash) return undefined;
  const pixels = decode(hash, width, height);
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return undefined;
  
  const imageData = ctx.createImageData(width, height);
  imageData.data.set(pixels);
  ctx.putImageData(imageData, 0, 0);
  return canvas.toDataURL();
}

export default function PhotoTile({ data, index }: { data: any, index: number }) {
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Memoize the blur URL so we don't re-decode on every render
  const blurDataURL = useMemo(() => 
    getBlurDataUrl(data.blur_hash), 
    [data.blur_hash]
  );

  const aspectRatio = data.width / data.height;
  const fullUrl = data?.urls?.full;
  const layoutId = fullUrl.split('?')[0].replace('https://images.unsplash.com/', '');
  return (
    <Link 
      href={`/photo/${layoutId}`}
      // scroll={false} prevents the background page from jumping to the top
      scroll={false}
      >
      <motion.div 
        layoutId={layoutId}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative w-full overflow-hidden" //bg-gray-100 dark:bg-gray-800 rounded-xl
        style={{ overflow: 'hidden', padding: '4px', aspectRatio: `${aspectRatio}` }}
      >
        <div className='w-full overflow-hidden relative'
          style={{ 
            position: 'relative', 
            width: '100%', 
            height: '100%', 
            display: 'inline-block' 
          }}>
          <Image
            src={data.urls.regular}
            alt={data.alt_description || "Unsplash Image"}
            fill
            sizes="(max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
            placeholder="blur"
            blurDataURL={blurDataURL}
            onLoad={() => setIsLoaded(true)}
            className={`
              object-cover transition-all duration-500
              ${isLoaded ? 'scale-100 blur-0' : 'scale-110 blur-xl'}
            `}
          />
        </div>
        
        {/* Dark mode overlay: keeps the colorful blurhash from being too bright in dark mode */}
        <div className="absolute inset-0 bg-black/5 dark:bg-black/20 pointer-events-none" />
      </motion.div>
    </Link>
  );
}