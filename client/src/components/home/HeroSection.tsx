import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Award, ExternalLink, Search, Calculator } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="pt-32 pb-24 md:pt-40 md:pb-32 relative overflow-hidden min-h-[90vh] flex items-center">
      {/* Background */}
      <div className="absolute inset-0 bg-white z-0"></div>
      
      {/* Floating geometric elements */}
      <div className="absolute top-20 right-[10%] w-72 h-72 bg-[#007AFF]/5 rounded-full"></div>
      <div className="absolute top-40 right-[20%] w-48 h-48 bg-[#007AFF]/10 rounded-full"></div>
      <div className="absolute bottom-32 right-[8%] w-24 h-24 border-2 border-[#007AFF]/20 rounded-full"></div>
      <div className="absolute top-32 right-[40%] w-4 h-4 bg-[#007AFF] rounded-full"></div>
      <div className="absolute bottom-48 right-[35%] w-6 h-6 bg-[#007AFF]/30 rounded-full"></div>
      
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.02] z-10" style={{backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23000\"%3E%3Cpath d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')"}}></div>
      
      <div className="container mx-auto px-4 relative z-20">
        <div className="flex items-center min-h-[60vh]">
          {/* Left Content */}
          <motion.div 
            className="w-full lg:w-3/5 xl:w-1/2"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-100 rounded-full mb-6"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Award className="w-4 h-4 text-amber-500" />
              <span className="text-sm font-semibold text-[#007AFF]">Legal 500 Ranked Experts</span>
            </motion.div>
            
            {/* Headline */}
            <motion.h1 
              className="font-display font-bold text-4xl md:text-5xl lg:text-6xl leading-[1.1] mb-6 text-gray-900"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Maximising legal costs success, minimising your stress.
            </motion.h1>
            
            {/* Subheadline */}
            <motion.p 
              className="text-lg md:text-xl text-gray-600 mb-8 max-w-xl leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              A premier costs law practice with expertise in all aspects of legal costs. Led by William Mackenzie, ranked in the Legal 500.
            </motion.p>
            
            {/* CTAs */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 mb-10"
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
                className="px-8 py-6 border-2 border-gray-200 text-gray-700 hover:border-[#007AFF] hover:text-[#007AFF] hover:bg-blue-50 text-lg font-semibold transition-all duration-300"
                asChild
              >
                <Link href="/team">Meet Our Team</Link>
              </Button>
            </motion.div>
            
            {/* CLSB Logo */}
            <motion.div
              className="flex items-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
            >
              <img 
                src="/images/clsb-mark-2026.png" 
                alt="Regulated by the Costs Lawyer Standards Board 2026" 
                className="h-16 w-auto"
              />
            </motion.div>

            {/* Mobile Products - shown only on smaller screens */}
            <motion.div 
              className="lg:hidden mt-12 pt-8 border-t border-gray-100"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">From Mackenzie Costs</p>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Our Products</h3>
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="https://findacostslawyer.co.uk" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 bg-gray-50 hover:bg-emerald-50 border border-gray-200 hover:border-emerald-300 rounded-xl transition-all group"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Search className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 text-sm group-hover:text-emerald-700">Find a Costs Lawyer</p>
                    <p className="text-xs text-gray-500">Search the marketplace</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-emerald-500" />
                </a>
                <a 
                  href="https://taxoncosts.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 bg-gray-50 hover:bg-violet-50 border border-gray-200 hover:border-violet-300 rounded-xl transition-all group"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-violet-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Calculator className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 text-sm group-hover:text-violet-700">Taxon</p>
                    <p className="text-xs text-gray-500">Bills & schedules software</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-violet-500" />
                </a>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side - Our Products (Desktop only) */}
          <motion.div 
            className="hidden lg:block absolute right-8 xl:right-16 2xl:right-24 top-1/2 -translate-y-1/2 w-80"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            {/* Section Header */}
            <div className="mb-4">
              <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">From Mackenzie Costs</p>
              <h3 className="text-lg font-bold text-gray-900">Our Products</h3>
            </div>

            {/* Product Card 1 - Find a Costs Lawyer */}
            <a 
              href="https://findacostslawyer.co.uk" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block p-5 bg-white border-2 border-gray-200 hover:border-emerald-400 rounded-2xl shadow-lg hover:shadow-xl mb-4 cursor-pointer transition-all duration-300 hover:-translate-y-1 group"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-emerald-500/30">
                    <Search className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-base">Find a Costs Lawyer</p>
                    <p className="text-xs text-emerald-600 font-medium">findacostslawyer.co.uk</p>
                  </div>
                </div>
                <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-emerald-500 transition-all group-hover:translate-x-1" />
              </div>
              <p className="text-sm text-gray-600 mt-3 leading-relaxed">Search and compare costs lawyers across the UK marketplace.</p>
              <div className="mt-3 flex items-center gap-2 text-xs font-semibold text-emerald-600">
                <span>Visit site</span>
                <ExternalLink className="w-3 h-3" />
              </div>
            </a>

            {/* Product Card 2 - Taxon */}
            <a 
              href="https://taxoncosts.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block p-5 bg-white border-2 border-gray-200 hover:border-violet-400 rounded-2xl shadow-lg hover:shadow-xl cursor-pointer transition-all duration-300 hover:-translate-y-1 group"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-violet-500 to-violet-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-violet-500/30">
                    <Calculator className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-base">Taxon</p>
                    <p className="text-xs text-violet-600 font-medium">taxoncosts.com</p>
                  </div>
                </div>
                <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-violet-500 transition-all group-hover:translate-x-1" />
              </div>
              <p className="text-sm text-gray-600 mt-3 leading-relaxed">Draft bills of costs and schedules quickly and accurately with our software.</p>
              <div className="mt-3 flex items-center gap-2 text-xs font-semibold text-violet-600">
                <span>Visit site</span>
                <ExternalLink className="w-3 h-3" />
              </div>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
