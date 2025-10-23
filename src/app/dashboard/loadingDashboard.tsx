// app/loading.tsx (Next.js App Router)
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Spinner } from '@/components/ui/Spinner'; // Puedes crear este componente o usar uno de Radix/React Icons

export default function LoadingScreen() {
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowText(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-[#0F172A] to-[#1E293B] text-white">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="flex flex-col items-center space-y-6"
      >
        <Spinner className="w-12 h-12 text-cyan-400 animate-spin" />
        {showText && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center text-sm tracking-wide text-slate-300"
          >
            Cargando tu experiencia administrativa...
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}