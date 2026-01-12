'use client';
import { use } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function PhotoModal({ params }: { params: Promise<{ id: string }>}) {
  const router = useRouter();
  const { id } = use(params);

  console.log('paramsExtract', id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      {/* Click outside to close */}
      <div className="absolute inset-0" onClick={() => router.back()} />
      
      <motion.div
        layoutId={`${id}`} // Matches the tile layoutId
        className="relative z-10 w-full max-w-5xl h-fit max-h-full bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-2xl"
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
      >
        <button 
          onClick={() => router.back()}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white transition"
        >✕</button>
        <div className="relative w-full md:aspect-auto md:h-[70vh]">
          <motion.div layoutId={`photo-image-${id}`} className="h-full">
            <Image 
              src={`https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=80`}
              alt="Enlarged view"
              fill
              className="object-contain"
            />
          </motion.div>
        </div>
        <div className="p-6">
          <h2 className="text-xl font-bold">Photo Details</h2>
          <p className="text-gray-500">Staff-level modal with route interception.</p>
        </div>
      </motion.div>
    </div>
  );
}