import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import DiscordWidget from "@/components/ui/DiscordWidget";
import { Community } from "@shared/schema";
import ContactSection from "@/components/home/ContactSection";
import EmailSubscription from "@/components/home/EmailSubscription";
import { SEO } from "@/components/seo/SEO";

const CommunityPage = () => {
  const [location, setLocation] = useLocation();
  
  // SEO is now handled by the SEO component

  const { data: communityData, isLoading } = useQuery<Community>({
    queryKey: ['/api/community'],
  });

  const upcomingEvents = [
    {
      id: 1,
      title: communityData?.eventName || "Monthly QOCS Discussion",
      description: communityData?.eventDescription || "Join us for our monthly discussion on QOCS applications and recent Court of Appeal decisions.",
      date: communityData?.eventDate || "May 25, 2024",
      time: "3:00 PM - 4:30 PM BST",
      host: "William Mackenzie"
    },
    {
      id: 2,
      title: "Cost Budgeting Masterclass",
      description: "Learn advanced strategies for effective cost budgeting from our expert team.",
      date: "June 10, 2024",
      time: "2:00 PM - 4:00 PM BST",
      host: "Sarah Johnson"
    },
    {
      id: 3,
      title: "Detailed Assessment Preparation Workshop",
      description: "Practical tips and strategies to maximize success in detailed assessment proceedings.",
      date: "June 17, 2024",
      time: "3:30 PM - 5:00 PM BST",
      host: "William Mackenzie"
    }
  ];

  const communityBenefits = [
    {
      id: 1,
      icon: "network-wired",
      title: "Professional Networking",
      description: "Connect with costs professionals from across the UK and build valuable relationships."
    },
    {
      id: 2,
      icon: "book-open",
      title: "Exclusive Resources",
      description: "Access our library of case law analysis, templates, and educational materials."
    },
    {
      id: 3,
      icon: "calendar-alt",
      title: "Monthly Webinars",
      description: "Participate in expert-led webinars on hot topics in costs law."
    },
    {
      id: 4,
      icon: "comments",
      title: "Discussion Forums",
      description: "Ask questions, share insights, and participate in focused discussions."
    },
    {
      id: 5,
      icon: "newspaper",
      title: "Breaking News",
      description: "Stay informed about the latest developments and changes in costs law."
    },
    {
      id: 6,
      icon: "users",
      title: "Mentorship Opportunities",
      description: "Learn from experienced practitioners and develop your professional skills."
    }
  ];

  return (
    <div className="pt-32 pb-0">
      <SEO
        title="Legal Costs Community | Mackenzie Costs"
        description="Join our community of legal costs professionals. Connect, share insights, and stay updated on the latest developments in costs law through events and discussions."
        keywords={["legal costs community", "costs lawyer network", "legal webinars", "costs law resources", "legal professional community"]}
        type="website"
        canonical="/community"
      />
      {/* Hero Section */}
      <section className="mb-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl mb-6">Join Our Legal Costs Community</h1>
              <p className="text-lg text-gray-600 mb-8">Connect with other legal professionals, share insights, ask questions, and stay updated on the latest developments in costs law.</p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  className="bg-[#5865F2] hover:bg-[#4752C4] text-white flex items-center justify-center py-6 px-8 text-lg"
                  asChild
                >
                  <a 
                    href={communityData?.discordInviteUrl || "https://discord.gg/mackenziecosts"} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-discord mr-2"></i> Join our Discord
                  </a>
                </Button>
                <Button 
                  variant="outline"
                  className="border-[#1D1D1F] text-[#1D1D1F] hover:bg-gray-100 flex items-center justify-center py-6 px-8 text-lg"
                  onClick={() => document.getElementById('events')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <i className="fas fa-calendar-alt mr-2"></i> View Events
                </Button>
              </div>
            </motion.div>
            
            <motion.div 
              className="relative"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <DiscordWidget 
                serverId={communityData?.discordServerId || "1234567890"}
                username="William Mackenzie"
                eventName={communityData?.eventName || "May Discussion on QOCS Applications"}
              />
              
              <motion.div 
                className="absolute -top-6 -right-6 bg-white p-4 rounded-lg shadow-lg rotate-6 z-10 hidden md:block"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <div className="w-16 h-16 rounded-xl bg-[#5865F2] flex items-center justify-center text-white">
                  <i className="fab fa-discord text-3xl"></i>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className="py-20 bg-[#F5F5F7]">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-display font-bold text-3xl md:text-4xl mb-4">Community Benefits</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Our community offers a range of benefits designed to support your professional development</p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {communityBenefits.map((benefit, index) => (
              <motion.div 
                key={benefit.id}
                className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="w-14 h-14 rounded-full bg-[#007AFF]/10 flex items-center justify-center mb-6">
                  <i className={`fas fa-${benefit.icon} text-[#007AFF] text-xl`}></i>
                </div>
                <h3 className="font-display font-bold text-xl mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Events Section */}
      <section id="events" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-display font-bold text-3xl md:text-4xl mb-4">Upcoming Events</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Join our virtual events to learn from experts and connect with fellow professionals</p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingEvents.map((event, index) => (
              <motion.div 
                key={event.id}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <span className="px-3 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">Virtual Event</span>
                    <span className="text-sm text-gray-500">{event.date}</span>
                  </div>
                  <h3 className="font-display font-bold text-xl mb-2">{event.title}</h3>
                  <p className="text-gray-600 mb-4">{event.description}</p>
                  
                  <div className="border-t border-gray-100 pt-4 mt-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-[#007AFF] flex items-center justify-center text-white font-bold mr-2">
                          {event.host.split(" ")[0][0]}{event.host.split(" ")[1][0]}
                        </div>
                        <span className="text-sm text-gray-600">{event.host}</span>
                      </div>
                      <span className="text-sm text-gray-600">{event.time}</span>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full mt-4 bg-[#007AFF] hover:bg-[#2997FF] text-white"
                    asChild
                  >
                    <a 
                      href={communityData?.discordInviteUrl || "https://discord.gg/mackenziecosts"} 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      Register Now
                    </a>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="bg-[#F5F5F7] rounded-xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="font-display font-bold text-2xl md:text-3xl mb-4">Ready to join our community?</h2>
                <p className="text-lg text-gray-600 mb-6">Connect with costs professionals, access exclusive resources, and stay updated on the latest developments in costs law.</p>
                <Button 
                  className="bg-[#5865F2] hover:bg-[#4752C4] text-white flex items-center justify-center py-6 px-8 text-lg"
                  asChild
                >
                  <a 
                    href={communityData?.discordInviteUrl || "https://discord.gg/mackenziecosts"} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-discord mr-2"></i> Join our Discord Community
                  </a>
                </Button>
              </div>
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                  alt="Legal professionals collaborating" 
                  className="rounded-xl shadow-lg"
                />
                <div className="absolute -bottom-4 -right-4 bg-white p-4 rounded-lg shadow-lg hidden md:block">
                  <div className="flex items-center">
                    <i className="fas fa-users text-[#007AFF] text-xl mr-3"></i>
                    <span className="font-bold">127+ Members</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <ContactSection />
      <EmailSubscription />
    </div>
  );
};

export default CommunityPage;
