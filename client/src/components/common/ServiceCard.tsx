import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, FileText, Calculator, Gavel, Scale, FileCheck, Briefcase, LucideIcon } from "lucide-react";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: string;
  slug: string;
  showFullCard?: boolean;
}

const iconMap: Record<string, LucideIcon> = {
  "file-text": FileText,
  "calculator": Calculator,
  "gavel": Gavel,
  "balance-scale": Scale,
  "file-check": FileCheck,
  "briefcase": Briefcase,
};

const ServiceCard = ({ 
  title, 
  description, 
  icon, 
  slug,
  showFullCard = false 
}: ServiceCardProps) => {
  const IconComponent = iconMap[icon] || FileText;
  
  return (
    <motion.div 
      className={`group ${showFullCard ? 'bg-white border-2 border-gray-200' : 'bg-white/10 backdrop-blur-xl border-2 border-white/20'} rounded-2xl p-8 transition-all duration-300 hover:shadow-2xl ${showFullCard ? 'hover:border-[#007AFF] hover:shadow-blue-500/20' : 'hover:border-white/40 hover:bg-white/15'}`}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
    >
      <div className="flex items-start justify-between mb-6">
        <h3 className={`font-display font-bold text-xl ${showFullCard ? 'text-gray-900 group-hover:text-[#007AFF]' : 'text-white'} transition-colors duration-300`}>{title}</h3>
        <div className={`w-12 h-12 rounded-xl ${showFullCard ? 'bg-blue-50' : 'bg-white/10'} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
          <IconComponent className={`w-6 h-6 ${showFullCard ? 'text-[#007AFF]' : 'text-white'}`} />
        </div>
      </div>
      <p className={`${showFullCard ? 'text-gray-600' : 'text-gray-200'} mb-6 line-clamp-3 leading-relaxed`}>
        {description}
      </p>
      <Link 
        href={`/services/${slug}`} 
        className={`inline-flex items-center gap-2 ${showFullCard ? 'text-[#007AFF]' : 'text-white'} hover:gap-3 transition-all duration-300 font-semibold`}
      >
        Learn more <ArrowRight className="w-4 h-4" />
      </Link>
    </motion.div>
  );
};

export default ServiceCard;
