import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useParams } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Service } from "@shared/schema";
import ServiceCard from "@/components/common/ServiceCard";
import ContactSection from "@/components/home/ContactSection";
import EmailSubscription from "@/components/home/EmailSubscription";
import { SEO } from "@/components/seo/SEO";

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

const ServicePage = () => {
  const [location, setLocation] = useLocation();
  const params = useParams();
  
  // If there's a slug parameter, we're viewing a single service
  const isViewingSingleService = !!params.slug;

  const { data: services, isLoading: isLoadingAllServices } = useQuery<Service[]>({
    queryKey: ['/api/services'],
    enabled: !isViewingSingleService,
  });

  const { data: singleService, isLoading: isLoadingSingleService } = useQuery<Service>({
    queryKey: [`/api/services/${params.slug}`],
    enabled: isViewingSingleService,
  });

  // SEO is now handled by the SEO component instead of manually setting document.title

  if (isViewingSingleService) {
    return (
      <div className="pt-32 pb-0">
        {!isLoadingSingleService && singleService && (
          <SEO
            title={`${singleService.title} | Mackenzie Costs`}
            description={singleService.description}
            keywords={["legal costs", "costs specialist", singleService.title.toLowerCase(), "legal services"]}
            type="article"
            canonical={`/services/${singleService.slug}`}
          />
        )}
        <div className="container mx-auto px-4 mb-20">
          {isLoadingSingleService ? (
            <div className="animate-pulse">
              <div className="h-10 bg-gray-200 rounded-md w-3/4 mb-4"></div>
              <div className="h-6 bg-gray-200 rounded-md w-1/4 mb-8"></div>
              <div className="h-40 bg-gray-200 rounded-md mb-6"></div>
              <div className="h-6 bg-gray-200 rounded-md w-full mb-4"></div>
              <div className="h-6 bg-gray-200 rounded-md w-full mb-4"></div>
              <div className="h-6 bg-gray-200 rounded-md w-3/4"></div>
            </div>
          ) : singleService ? (
            <div>
              <Button 
                variant="ghost" 
                className="mb-6 text-[#007AFF] hover:text-[#2997FF]" 
                onClick={() => setLocation("/services")}
              >
                <i className="fas fa-arrow-left mr-2"></i> Back to Services
              </Button>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-[#007AFF]/10 flex items-center justify-center">
                  <i className={`fas fa-${singleService.icon} text-[#007AFF] text-2xl`}></i>
                </div>
                <h1 className="font-display font-bold text-3xl md:text-4xl">{singleService.title}</h1>
              </div>
              
              <div className="prose prose-lg max-w-none mb-12">
                <p className="text-lg text-gray-700 mb-6">{singleService.description}</p>
                
                {/* Extended service content - in a real application this would come from the backend */}
                <h2>How We Can Help</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget aliquam nisl nisl eget nisl. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget aliquam nisl nisl eget nisl.</p>
                
                <h2>Our Approach</h2>
                <p>Our team of experienced professionals takes a meticulous approach to {singleService.title.toLowerCase()}. We begin with a comprehensive assessment of your situation, identifying key areas for cost recovery or reduction. Through detailed analysis and leveraging our extensive knowledge of case law, we develop tailored strategies to maximize your outcomes.</p>
                
                <h2>Why Choose Us</h2>
                <ul>
                  <li>Legal 500 ranked expertise in costs law</li>
                  <li>Proven track record of successful outcomes</li>
                  <li>Personalized service tailored to your specific needs</li>
                  <li>Clear, straightforward communication throughout the process</li>
                  <li>Efficient management of all documentation and proceedings</li>
                </ul>
                
                <div className="mt-8 p-6 bg-[#F5F5F7] rounded-xl">
                  <h3 className="text-xl font-bold mb-4">Ready to discuss your requirements?</h3>
                  <p>Contact us today to learn how we can assist with your {singleService.title.toLowerCase()} needs.</p>
                  <Button 
                    className="mt-4 bg-[#007AFF] hover:bg-[#2997FF] text-white"
                    onClick={() => setLocation("/contact")}
                  >
                    Get in Touch
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-16">
              <h2 className="font-display font-bold text-2xl mb-4">Service Not Found</h2>
              <p className="text-gray-600 mb-6">The service you're looking for doesn't exist or may have been removed.</p>
              <Button 
                className="bg-[#007AFF] hover:bg-[#2997FF] text-white"
                onClick={() => setLocation("/services")}
              >
                View All Services
              </Button>
            </div>
          )}
        </div>
        
        <ContactSection />
        <EmailSubscription />
      </div>
    );
  }

  return (
    <div className="pt-32 pb-0">
      <SEO
        title="Our Services | Mackenzie Costs"
        description="Explore our comprehensive range of legal costs services designed to help solicitors and legal professionals manage costs effectively."
        keywords={["legal costs services", "costs management", "detailed assessment", "legal costs advice", "costs budgeting"]}
        type="website"
        canonical="/services"
      />
      <div className="container mx-auto px-4 mb-20">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="font-display font-bold text-3xl md:text-4xl mb-4">Our Services</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Comprehensive costs law services designed to help you achieve your objectives</p>
        </motion.div>
        
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {isLoadingAllServices ? (
            // Loading skeleton
            Array(6).fill(0).map((_, index) => (
              <motion.div 
                key={index} 
                className="bg-white/5 backdrop-blur-lg rounded-xl p-8 border border-gray-200 animate-pulse h-64"
                variants={item}
              />
            ))
          ) : services && services.length > 0 ? (
            services.map((service) => (
              <motion.div key={service.id} variants={item}>
                <ServiceCard
                  title={service.title}
                  description={service.description}
                  icon={service.icon}
                  slug={service.slug}
                  showFullCard={true}
                />
              </motion.div>
            ))
          ) : (
            <div className="col-span-3 text-center py-16">
              <h3 className="font-display font-bold text-xl mb-2">No services found</h3>
              <p className="text-gray-600">Please check back later for our service offerings.</p>
            </div>
          )}
        </motion.div>
        
        <div className="mt-16 p-8 bg-[#F5F5F7] rounded-xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="font-display font-bold text-2xl mb-2">Need a Custom Solution?</h2>
              <p className="text-gray-600">Contact us to discuss your specific costs law requirements. We offer tailored solutions for all legal costs needs.</p>
            </div>
            <Button 
              className="bg-[#007AFF] hover:bg-[#2997FF] text-white px-8 py-6 text-lg"
              onClick={() => setLocation("/contact")}
            >
              Get in Touch
            </Button>
          </div>
        </div>
      </div>
      
      <ContactSection />
      <EmailSubscription />
    </div>
  );
};

export default ServicePage;
