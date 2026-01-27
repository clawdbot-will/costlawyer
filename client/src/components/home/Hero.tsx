import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';

export default function Hero() {
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!parallaxRef.current) return;
      const scrollY = window.scrollY;
      // Apply a subtle parallax effect
      parallaxRef.current.style.backgroundPositionY = `${scrollY * 0.5}px`;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section 
      ref={parallaxRef} 
      className="min-h-[80vh] flex items-center text-white relative"
      style={{
        background: 'linear-gradient(to right, rgba(10, 10, 10, 0.9), rgba(10, 10, 10, 0.7)), url("https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="container mx-auto px-4 md:px-6 py-24 md:py-32">
        <motion.div 
          className="max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Maximising your legal costs success, minimising your stress.
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200">
            The online home of leading costs lawyers dedicated to helping clients achieve their objectives in all areas of costs law.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/services">
              <motion.a 
                className="px-8 py-3 bg-[#007AFF] text-white rounded-md hover:bg-[#2997FF] transition-colors duration-200 text-center font-medium text-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Our Services
              </motion.a>
            </Link>
            <Link href="/case-law">
              <motion.a 
                className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-md hover:bg-white hover:text-[#0A0A0A] transition-colors duration-200 text-center font-medium text-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Explore Case Law
              </motion.a>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
