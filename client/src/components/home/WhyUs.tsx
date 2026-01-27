import { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'wouter';

export default function WhyUs() {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const childVariants = {
    hidden: { 
      opacity: 0, 
      y: 50 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="flex flex-col md:flex-row gap-12 items-center"
        >
          <motion.div 
            variants={childVariants}
            className="md:w-1/2"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#0A0A0A]">Why Us?</h2>
            <div className="space-y-6 text-lg text-[#1D1D1F]/80">
              <p>
                Welcome to Mackenzie Costs, the online home of a leading costs lawyers dedicated to helping clients achieve their objectives in all areas of costs law. William Mackenzie is ranked in the Legal 500 and our team of experienced professionals provides practical, effective solutions to clients across a wide range of industries and sectors.
              </p>
              <p>
                At Mackenzie Costs, we understand that costs law can be complex and confusing, which is why we pride ourselves on offering clear, straightforward advice that our clients can rely on.
              </p>
              <p>
                With a proven track record of success in all aspects of costs law, we have the expertise and knowledge necessary to handle even the most complex and challenging cases.
              </p>
            </div>
            <div className="mt-8">
              <Link href="/contact">
                <motion.a 
                  className="inline-flex items-center text-[#007AFF] hover:text-[#2997FF] font-medium"
                  whileHover={{ x: 5 }}
                >
                  Contact us today
                  <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </motion.a>
              </Link>
            </div>
          </motion.div>
          
          <motion.div 
            variants={childVariants}
            className="md:w-1/2"
          >
            <img 
              src="https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
              alt="Legal professionals in a meeting" 
              className="rounded-lg shadow-xl w-full h-auto object-cover"
              style={{ maxHeight: '500px' }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
