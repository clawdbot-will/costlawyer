import { CaseLaw } from "@shared/schema";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { Link } from "wouter";

interface CaseCardProps {
  caseData: CaseLaw;
}

export default function CaseCard({ caseData }: CaseCardProps) {
  // Convert the date string to a Date object
  const caseDate = new Date(caseData.date);
  
  return (
    <motion.div 
      className="case-card bg-white rounded-lg border border-gray-200 overflow-hidden transition-all duration-300 h-full"
      whileHover={{ 
        y: -5,
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
      }}
    >
      <div className="p-6 flex flex-col h-full">
        <div className="flex justify-between items-start mb-4">
          <span className="px-3 py-1 bg-[#007AFF]/10 text-[#007AFF] rounded-full text-sm font-medium">
            {caseData.category}
          </span>
          <span className="text-sm text-gray-500">
            {format(caseDate, "MMM d, yyyy")}
          </span>
        </div>
        <h3 className="text-xl font-semibold mb-2 text-[#0A0A0A] hover:text-[#007AFF] transition-colors">
          <Link href={`/case-law/${caseData.id}`}>
            <a>{caseData.title}</a>
          </Link>
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-3 flex-grow">
          {caseData.summary}
        </p>
        <div className="flex justify-between items-center mt-auto">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-[#0A0A0A] flex items-center justify-center text-white text-xs font-bold mr-2">
              {caseData.author.split(' ').map(name => name[0]).join('')}
            </div>
            <span className="text-sm text-gray-600">{caseData.author}</span>
          </div>
          <Link href={`/case-law/${caseData.id}`}>
            <a className="text-[#007AFF] hover:text-[#2997FF] text-sm font-medium">Read More</a>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
