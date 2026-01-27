import { Link } from "wouter";
import { motion } from "framer-motion";
import { News } from "@shared/schema";
import { cn } from "@/lib/utils";

interface NewsCardProps {
  newsData: News;
}

const NewsCard = ({ newsData }: NewsCardProps) => {
  // Determine category badge color
  const getCategoryBadgeStyle = (category: string) => {
    switch (category) {
      case 'News':
        return 'bg-blue-100 text-blue-700';
      case 'Case Study':
        return 'bg-green-100 text-green-700';
      case 'Event':
        return 'bg-purple-100 text-purple-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <motion.article 
      className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow duration-300"
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <img 
        src={newsData.imageUrl || "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"} 
        alt={`${newsData.title} thumbnail`} 
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm text-gray-500">{newsData.date}</span>
          <span className={cn(
            "px-3 py-1 text-xs font-medium rounded-full", 
            getCategoryBadgeStyle(newsData.category)
          )}>
            {newsData.category}
          </span>
        </div>
        <h3 className="font-display font-bold text-xl mb-3 line-clamp-2">{newsData.title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-3">{newsData.summary}</p>
        <Link 
          href={`/news/${newsData.slug}`} 
          className="inline-flex items-center text-[#007AFF] hover:text-[#2997FF] transition-colors duration-300"
        >
          {newsData.category === 'Event' ? 'Register now' : 'Read more'} <i className="fas fa-arrow-right ml-2"></i>
        </Link>
      </div>
    </motion.article>
  );
};

export default NewsCard;
