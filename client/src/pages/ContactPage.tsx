import { motion } from "framer-motion";
import ContactSection from "@/components/home/ContactSection";
import EmailSubscription from "@/components/home/EmailSubscription";
import { SEO } from "@/components/seo/SEO";
import { trackEvent } from "@/lib/analytics";

const ContactPage = () => {
  // SEO is now handled by the SEO component
  
  // Track social media clicks
  const trackSocialClick = (platform: string) => {
    trackEvent('social_click', 'contact', platform);
  };
  
  // Track email clicks
  const trackEmailClick = () => {
    trackEvent('contact_method', 'email', 'william@costlawyer.co.uk');
  };
  
  // Track phone clicks
  const trackPhoneClick = () => {
    trackEvent('contact_method', 'phone', '+442045768203');
  };

  return (
    <div className="pt-32 pb-0">
      <SEO 
        title="Contact Us | Mackenzie Costs"
        description="Get in touch with Mackenzie Costs. We provide expert advice and services in costs law. Contact us for all your legal costs needs."
        keywords={["contact", "legal costs", "costs lawyer contact", "legal advice", "costs consultation"]}
        type="website"
        canonical="/contact"
      />
      <section className="mb-20">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl mb-4">Contact Mackenzie Costs</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">We're here to help with all your costs law needs. Reach out to us for expert assistance.</p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="font-display font-bold text-2xl mb-6">Our Office</h2>
              <div className="bg-[#F5F5F7] rounded-xl overflow-hidden h-[400px] mb-6">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2482.396192410174!2d-0.08843742342595705!3d51.52459757181649!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48761ca8d33fbb8d%3A0xb10f147dd3ed9b25!2s86-90%20Paul%20St%2C%20London%20EC2A%204NE!5e0!3m2!1sen!2suk!4v1715058858626!5m2!1sen!2suk" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={true} 
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Mackenzie Costs Office Location"
                ></iframe>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <div className="w-12 h-12 rounded-full bg-[#007AFF]/10 flex items-center justify-center mb-4">
                    <i className="fas fa-map-marker-alt text-[#007AFF]"></i>
                  </div>
                  <h3 className="font-bold text-lg mb-2">Address</h3>
                  <p className="text-gray-600">
                    86-90 Paul Street<br />
                    London EC2A 4NE<br />
                    United Kingdom
                  </p>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <div className="w-12 h-12 rounded-full bg-[#007AFF]/10 flex items-center justify-center mb-4">
                    <i className="fas fa-clock text-[#007AFF]"></i>
                  </div>
                  <h3 className="font-bold text-lg mb-2">Office Hours</h3>
                  <p className="text-gray-600">
                    Monday - Friday<br />
                    9:00 AM - 5:30 PM<br />
                    Weekends: Closed
                  </p>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="font-display font-bold text-2xl mb-6">Contact Information</h2>
              
              <div className="space-y-6 mb-8">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-full bg-[#007AFF]/10 flex items-center justify-center mr-4">
                      <i className="fas fa-envelope text-[#007AFF]"></i>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">Email Us</h3>
                      <p className="text-gray-600 mb-2">For general inquiries:</p>
                      <a 
                        href="mailto:william@costlawyer.co.uk" 
                        className="text-[#007AFF] hover:text-[#2997FF] transition-colors duration-300"
                        onClick={trackEmailClick}
                      >
                        william@costlawyer.co.uk
                      </a>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-full bg-[#007AFF]/10 flex items-center justify-center mr-4">
                      <i className="fas fa-phone text-[#007AFF]"></i>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">Call Us</h3>
                      <p className="text-gray-600 mb-2">Our team is ready to assist you:</p>
                      <a 
                        href="tel:+442045768203" 
                        className="text-[#007AFF] hover:text-[#2997FF] transition-colors duration-300"
                        onClick={trackPhoneClick}
                      >
                        +44 20 4576 8203
                      </a>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-full bg-[#007AFF]/10 flex items-center justify-center mr-4">
                      <i className="fas fa-comments text-[#007AFF]"></i>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">Connect With Us</h3>
                      <p className="text-gray-600 mb-3">Follow us on social media:</p>
                      <div className="flex space-x-4">
                        <a 
                          href="https://twitter.com/mackenziecosts" 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="w-10 h-10 rounded-full bg-[#0A0A0A] text-white flex items-center justify-center hover:bg-[#007AFF] transition-colors duration-300"
                          onClick={() => trackSocialClick('twitter')}
                        >
                          <i className="fab fa-twitter"></i>
                        </a>
                        <a 
                          href="https://linkedin.com/company/mackenziecosts" 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="w-10 h-10 rounded-full bg-[#0A0A0A] text-white flex items-center justify-center hover:bg-[#007AFF] transition-colors duration-300"
                          onClick={() => trackSocialClick('linkedin')}
                        >
                          <i className="fab fa-linkedin-in"></i>
                        </a>
                        <a 
                          href="https://facebook.com/mackenziecosts" 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="w-10 h-10 rounded-full bg-[#0A0A0A] text-white flex items-center justify-center hover:bg-[#007AFF] transition-colors duration-300"
                          onClick={() => trackSocialClick('facebook')}
                        >
                          <i className="fab fa-facebook-f"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-[#F5F5F7] rounded-xl p-6">
                <h3 className="font-display font-bold text-xl mb-4">Quick Response Guarantee</h3>
                <p className="text-gray-600 mb-3">We aim to respond to all inquiries within 24 hours during business days. Your questions and concerns are important to us.</p>
                <div className="flex items-center text-[#007AFF]">
                  <i className="fas fa-check-circle mr-2"></i>
                  <span className="font-medium">Typically responds within 24 hours</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      <ContactSection />
      <EmailSubscription />
    </div>
  );
};

export default ContactPage;
