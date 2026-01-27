import { Link } from "wouter";
import { Case } from "@shared/schema";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CaseCardProps {
  caseData: Case;
}

const CaseCard = ({ caseData }: CaseCardProps) => {
  // Determine category badge color
  const getCategoryBadgeStyle = (category: string) => {
    switch (category) {
      case 'QOCS':
        return 'bg-blue-100 text-blue-700';
      case 'Solicitor\'s Act':
        return 'bg-green-100 text-green-700';
      case 'Cost Budgeting':
        return 'bg-purple-100 text-purple-700';
      case 'Detailed Assessment':
        return 'bg-orange-100 text-orange-700';
      case 'Part 36':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <motion.div 
      className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow duration-300"
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <span className={cn(
            "px-3 py-1 text-xs font-medium rounded-full", 
            getCategoryBadgeStyle(caseData.category)
          )}>
            {caseData.category}
          </span>
          <span className="text-sm text-gray-500">{caseData.date}</span>
        </div>
        
        <h3 className="font-display font-bold text-xl mb-2 line-clamp-2">{caseData.title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-3">{caseData.summary}</p>
        
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500 flex items-center">
            <i className="fas fa-user-tie mr-1"></i> {caseData.author}
          </span>
          <Link href={`/cases/${caseData.slug}`} className="text-[#007AFF] hover:text-[#2997FF] flex items-center transition-colors duration-300">
            Read more <i className="fas fa-angle-right ml-1"></i>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default CaseCard;
