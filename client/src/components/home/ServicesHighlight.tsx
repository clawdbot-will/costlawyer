import { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'wouter';
import { Service } from '@shared/schema';
import { 
  FileText, 
  Handshake,
  Calculator,
  ChevronRight
} from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const iconMap: Record<string, React.ReactNode> = {
  "file-text": <FileText className="text-[#007AFF] h-8 w-8" />,
  "handshake": <Handshake className="text-[#007AFF] h-8 w-8" />,
  "calculator": <Calculator className="text-[#007AFF] h-8 w-8" />
};

interface ServicesHighlightProps {
  services: Service[];
  isLoading: boolean;
}

export default function ServicesHighlight({ services, isLoading }: ServicesHighlightProps) {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 20 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="services" className="py-20 bg-[#F5F5F7]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#0A0A0A]">Our Services</h2>
          <p className="text-lg text-[#1D1D1F]/80">Comprehensive solutions tailored to your legal costs needs</p>
        </div>

        <motion.div 
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {isLoading ? (
            // Skeleton loaders while data is loading
            Array(3).fill(0).map((_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-8">
                <Skeleton className="w-14 h-14 rounded-full mb-6" />
                <Skeleton className="h-7 w-48 mb-3" />
                <Skeleton className="h-20 w-full mb-6" />
                <Skeleton className="h-6 w-24" />
              </div>
            ))
          ) : (
            services.slice(0, 3).map((service) => (
              <motion.div 
                key={service.id}
                variants={itemVariants}
                className="bg-white rounded-lg shadow-lg p-8 transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1"
              >
                <div className="w-14 h-14 rounded-full bg-[#007AFF]/10 flex items-center justify-center mb-6">
                  {iconMap[service.icon] || <FileText className="text-[#007AFF] h-8 w-8" />}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-[#0A0A0A]">{service.title}</h3>
                <p className="text-[#1D1D1F]/80 mb-6">{service.description}</p>
                <Link href="/services">
                  <motion.a 
                    className="inline-flex items-center text-[#007AFF] hover:text-[#2997FF] font-medium"
                    whileHover={{ x: 5 }}
                  >
                    Learn more
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </motion.a>
                </Link>
              </motion.div>
            ))
          )}
        </motion.div>

        {!isLoading && (
          <div className="text-center mt-10">
            <Link href="/services">
              <motion.a 
                className="px-8 py-3 inline-block bg-[#007AFF] text-white rounded-md hover:bg-[#2997FF] transition-colors duration-200 font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View All Services
              </motion.a>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
