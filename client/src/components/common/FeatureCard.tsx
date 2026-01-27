import { motion } from "framer-motion";
import { Award, Users, Lightbulb, Database, MessageCircle, FileText, LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

const iconMap: Record<string, LucideIcon> = {
  award: Award,
  users: Users,
  lightbulb: Lightbulb,
  database: Database,
  comments: MessageCircle,
  "file-contract": FileText,
};

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
  const IconComponent = iconMap[icon] || Award;
  
  return (
    <motion.div 
      className="group bg-white rounded-2xl p-8 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 border border-gray-100 hover:border-blue-200"
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
    >
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#007AFF] to-[#0066DD] flex items-center justify-center mb-6 shadow-lg shadow-blue-500/30 group-hover:shadow-xl group-hover:shadow-blue-500/40 transition-all duration-300 group-hover:scale-110">
        <IconComponent className="w-8 h-8 text-white" />
      </div>
      <h3 className="font-display font-bold text-xl mb-3 text-gray-900 group-hover:text-[#007AFF] transition-colors duration-300">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </motion.div>
  );
};

export default FeatureCard;
