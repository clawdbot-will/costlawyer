import { motion } from "framer-motion";

interface DiscordWidgetProps {
  serverId: string;
  username?: string;
  eventName?: string;
}

const DiscordWidget = ({ serverId, username = "William Mackenzie", eventName = "Monthly Discussion" }: DiscordWidgetProps) => {
  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-lg">
      <div className="bg-[#5865F2] text-white p-4 rounded-t-lg">
        <div className="flex items-center">
          <i className="fab fa-discord text-2xl mr-3"></i>
          <h3 className="font-bold text-xl">Mackenzie Costs Community</h3>
        </div>
      </div>
      <div className="mt-4 space-y-4">
        <motion.div 
          className="p-3 bg-gray-100 rounded-lg"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-start">
            <div className="w-10 h-10 rounded-full bg-[#5865F2] flex items-center justify-center text-white font-bold mr-3">
              {username.split(" ").map(part => part[0]).join("")}
            </div>
            <div>
              <div className="flex items-center">
                <span className="font-bold">{username}</span>
                <span className="text-xs text-gray-500 ml-2">Today at 10:45</span>
              </div>
              <p className="text-sm mt-1">Welcome to our discussion on {eventName}. Excited to analyze the recent Court of Appeal decision!</p>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className="p-3 bg-gray-100 rounded-lg"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-start">
            <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold mr-3">
              JD
            </div>
            <div>
              <div className="flex items-center">
                <span className="font-bold">Jane Doe</span>
                <span className="text-xs text-gray-500 ml-2">Today at 10:50</span>
              </div>
              <p className="text-sm mt-1">Thanks for hosting, William. The implications of this case on our current files will be significant.</p>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className="p-3 bg-gray-100 rounded-lg"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="flex items-start">
            <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white font-bold mr-3">
              RB
            </div>
            <div>
              <div className="flex items-center">
                <span className="font-bold">Robert Brown</span>
                <span className="text-xs text-gray-500 ml-2">Today at 10:55</span>
              </div>
              <p className="text-sm mt-1">I've been dealing with a similar case. Would love to discuss the strategy that worked for us.</p>
            </div>
          </div>
        </motion.div>
        
        <div className="flex items-center gap-2 mt-4">
          <div className="bg-gray-100 rounded-full px-4 py-2 text-sm flex-1">
            <span className="text-gray-400">Message #costs-discussion</span>
          </div>
          <button className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700">
            <i className="fas fa-paper-plane"></i>
          </button>
        </div>
        
        <motion.div 
          className="border-t border-gray-200 pt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="flex flex-wrap gap-2">
            <div className="px-3 py-1 bg-gray-200 rounded-md text-sm flex items-center">
              <i className="fas fa-users mr-2 text-gray-500"></i>
              <span>127 members</span>
            </div>
            <div className="px-3 py-1 bg-gray-200 rounded-md text-sm flex items-center">
              <i className="fas fa-comment mr-2 text-gray-500"></i>
              <span>5 channels</span>
            </div>
            <div className="px-3 py-1 bg-gray-200 rounded-md text-sm flex items-center">
              <i className="fas fa-calendar-alt mr-2 text-gray-500"></i>
              <span>Monthly events</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DiscordWidget;
