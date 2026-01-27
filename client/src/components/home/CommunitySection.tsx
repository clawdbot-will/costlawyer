import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import DiscordWidget from "@/components/ui/DiscordWidget";
import { Community } from "@shared/schema";

const CommunitySection = () => {
  const { data: communityData, isLoading } = useQuery<Community>({
    queryKey: ['/api/community'],
  });

  return (
    <section id="community" className="py-20 bg-[#F5F5F7]">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-display font-bold text-3xl md:text-4xl mb-6">Join Our Legal Costs Community</h2>
            <p className="text-lg text-gray-600 mb-6">Connect with other legal professionals, share insights, ask questions, and stay updated on the latest developments in costs law.</p>
            
            <motion.div 
              className="bg-white rounded-xl p-6 border border-gray-200 mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="font-display font-bold text-xl mb-4">Community Benefits</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-[#007AFF] mt-1 mr-3"></i>
                  <span>Network with costs professionals from across the UK</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-[#007AFF] mt-1 mr-3"></i>
                  <span>Access exclusive case law analysis and discussions</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-[#007AFF] mt-1 mr-3"></i>
                  <span>Participate in monthly webinars on hot costs topics</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-[#007AFF] mt-1 mr-3"></i>
                  <span>Get quick answers to your costs law questions</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-[#007AFF] mt-1 mr-3"></i>
                  <span>Stay updated on the latest industry news and changes</span>
                </li>
              </ul>
            </motion.div>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Button 
                className="bg-[#5865F2] hover:bg-[#4752C4] text-white flex items-center justify-center"
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
                className="bg-[#007AFF] hover:bg-[#2997FF] text-white flex items-center justify-center"
                asChild
              >
                <a href="#newsletter">
                  <i className="fas fa-envelope mr-2"></i> Subscribe to Updates
                </a>
              </Button>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
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
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
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
  );
};

export default CommunitySection;
