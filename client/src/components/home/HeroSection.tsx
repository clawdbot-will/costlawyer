import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ChevronDown, Award, Users, Scale } from "lucide-react";

const HeroSection = () => {
  const scrollToNextSection = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <section className="pt-32 pb-24 md:pt-40 md:pb-32 relative overflow-hidden min-h-[90vh] flex items-center">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-gray-50 z-0"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDdBRkYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItMnptMC0ydjJ6bTAtMnYyem0wLTJ2MnptMC0ydjJ6bTAtMnYyem0wLTJ2MnptMC0ydjJ6bTAtMnYyem0wLTJ2MnptMC0ydjJ6bTAtMnYyem0wLTJ2MnptMC0ydjJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-40 z-10"></div>
      
      <div className="container mx-auto px-4 relative z-20">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
          <motion.div 
            className="w-full md:w-[55%] lg:w-3/5"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="inline-block mb-4 px-4 py-2 bg-blue-50 border border-blue-100 rounded-full"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <span className="text-sm font-semibold text-[#007AFF] flex items-center gap-2">
                <Award className="w-4 h-4" />
                Legal 500 Ranked Experts
              </span>
            </motion.div>
            
            <motion.h1 
              className="font-display font-bold text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-[1.1] mb-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-600 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Maximising legal costs success, minimising your stress.
            </motion.h1>
            
            <motion.p 
              className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              A premier costs law practice with expertise in all aspects of legal costs. Led by William Mackenzie, ranked in the Legal 500.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Button 
                className="px-8 py-6 bg-[#007AFF] hover:bg-[#0066DD] text-white text-lg font-semibold shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300 hover:scale-105"
                asChild
              >
                <Link href="/services">Explore Our Services</Link>
              </Button>
              <Button 
                variant="outline" 
                className="px-8 py-6 border-2 border-gray-300 text-gray-700 hover:border-[#007AFF] hover:text-[#007AFF] hover:bg-blue-50 text-lg font-semibold transition-all duration-300"
                asChild
              >
                <Link href="/team">Meet Our Team</Link>
              </Button>
            </motion.div>
            
            <motion.div
              className="flex flex-wrap items-center gap-6 pt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="flex items-center gap-2 text-gray-600">
                <Users className="w-5 h-5 text-[#007AFF]" />
                <span className="text-sm font-medium">Expert Team</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Scale className="w-5 h-5 text-[#007AFF]" />
                <span className="text-sm font-medium">Full-Service Practice</span>
              </div>
            </motion.div>
            
            {/* CLSB Regulation Mark */}
            <motion.div
              className="mt-6 flex items-center gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
            >
              <img 
                src="/images/clsb-logo.jpg" 
                alt="Costs Lawyer Standards Board Logo" 
                className="h-16 opacity-80"
              />
              <p className="text-xs text-gray-500">Regulated by the Costs Lawyer Standards Board</p>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="w-full md:w-[45%] lg:w-2/5 relative"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl blur-2xl opacity-20"></div>
              <img 
                src="/images/office-building.png" 
                alt="MacKinzie Costs Office Building" 
                className="relative rounded-2xl shadow-2xl w-full object-cover aspect-[4/5]"
              />
            </div>
            
            <motion.div 
              className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-2xl border border-gray-100 hidden lg:block"
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#007AFF] to-[#0066DD] flex items-center justify-center text-white shadow-lg">
                  <Award className="w-7 h-7" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Ranked in</p>
                  <p className="text-xl font-bold text-gray-900">Legal 500</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll Down Button */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center cursor-pointer z-20"
        onClick={scrollToNextSection}
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: 1,
          y: [0, 10, 0]
        }}
        transition={{ 
          delay: 1,
          duration: 1.5,
          repeat: Infinity,
          repeatType: "loop"
        }}
      >
        <p className="text-sm font-medium mb-2 text-gray-700">Scroll for more</p>
        <div className="bg-white p-2 rounded-full shadow-md">
          <ChevronDown size={24} className="text-[#007AFF]" />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
