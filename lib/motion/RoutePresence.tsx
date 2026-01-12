// components/motion/RoutePresence.tsx
'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

export function RoutePresence({ 
  children, 
  modal 
}: { 
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <>
      {/* The main content (Feed) */}
      {children}

      {/* The Modal Slot with AnimatePresence */}
      <AnimatePresence mode="wait">
        {/* The 'key' forces AnimatePresence to trigger when the URL changes */}
        <motion.div key={pathname}>
          {modal}
        </motion.div>
      </AnimatePresence>
    </>
  );
}