import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import ServiceCard from "@/components/common/ServiceCard";
import { Service } from "@shared/schema";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const ServicesSection = () => {
  const { data: services, isLoading } = useQuery<Service[]>({
    queryKey: ['/api/services'],
  });

  return (
    <section id="services" className="py-24 bg-gradient-to-br from-gray-900 via-[#0A0A0A] to-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNGRkZGRkYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItMnptMC0ydjJ6bTAtMnYyem0wLTJ2MnptMC0ydjJ6bTAtMnYyem0wLTJ2MnptMC0ydjJ6bTAtMnYyem0wLTJ2MnptMC0ydjJ6bTAtMnYyem0wLTJ2MnptMC0ydjJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-50"></div>
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="inline-block mb-4 px-4 py-2 bg-white/10 border border-white/20 rounded-full backdrop-blur-sm"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-sm font-semibold text-white">What We Offer</span>
          </motion.div>
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl mb-4 text-white">Our Services</h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">Comprehensive costs law services designed to help you achieve your objectives</p>
        </motion.div>
        
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {isLoading ? (
            Array(6).fill(0).map((_, index) => (
              <motion.div 
                key={index} 
                className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 animate-pulse h-64"
                variants={item}
              />
            ))
          ) : (
            services?.map((service) => (
              <motion.div key={service.id} variants={item}>
                <ServiceCard
                  title={service.title}
                  description={service.description}
                  icon={service.icon}
                  slug={service.slug}
                />
              </motion.div>
            ))
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
