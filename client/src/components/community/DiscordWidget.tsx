import { motion } from "framer-motion";

export default function DiscordWidget() {
  // Mock online members for demonstration purposes
  const onlineMembers = [
    { name: "William Mackenzie", status: "online" },
    { name: "Sarah Johnson", status: "online" },
    { name: "David Thompson", status: "online" },
  ];

  // Active channels
  const channels = [
    "general-discussion",
    "case-law-updates",
    "costs-budgeting",
    "detailed-assessment"
  ];

  return (
    <motion.div 
      className="rounded-lg overflow-hidden shadow-xl"
      style={{ background: "linear-gradient(135deg, #5865F2 0%, #404EED 100%)" }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="p-8 text-white">
        <div className="flex items-center mb-6">
          <svg 
            className="h-8 w-8 mr-3" 
            fill="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3847-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
          </svg>
          <h3 className="text-2xl font-bold">Mackenzie Costs Community</h3>
        </div>
        
        <div className="bg-white/10 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="font-medium">Online Members</span>
            <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">24 Online</span>
          </div>
          
          <div className="space-y-3">
            {onlineMembers.map((member, index) => (
              <div key={index} className="flex items-center">
                <div className="w-8 h-8 bg-gray-300 rounded-full relative mr-3">
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#5865F2]"></div>
                </div>
                <span>{member.name}</span>
              </div>
            ))}
            
            <div className="text-sm text-white/70 pt-2">
              <a href="#" className="hover:text-white">and 21 more online...</a>
            </div>
          </div>
        </div>
        
        <div className="bg-white/10 rounded-lg p-4 mb-6">
          <div className="font-medium mb-3">Active Channels</div>
          
          <div className="space-y-3">
            {channels.map((channel, index) => (
              <div key={index} className="flex items-center">
                <svg 
                  className="h-4 w-4 mr-2 text-white/70" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
                  />
                </svg>
                <span>{channel}</span>
              </div>
            ))}
          </div>
        </div>
        
        <a 
          href="https://discord.gg/jRPTE4Bp" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="block w-full py-3 bg-white text-[#5865F2] text-center rounded-md font-medium hover:bg-gray-100 transition-colors"
        >
          Join Server
        </a>
      </div>
    </motion.div>
  );
}
