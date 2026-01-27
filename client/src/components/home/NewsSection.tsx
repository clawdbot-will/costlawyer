import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import NewsCard from "@/components/common/NewsCard";
import { News } from "@shared/schema";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const NewsSection = () => {
  const { data: news, isLoading } = useQuery<News[]>({
    queryKey: ['/api/news'],
  });

  // Only show the most recent 3 news items
  const recentNews = news?.slice(0, 3) || [];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-display font-bold text-3xl md:text-4xl mb-4">Latest News & Updates</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Stay informed with the latest developments in costs law</p>
        </motion.div>
        
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {isLoading ? (
            // Loading skeleton
            Array(3).fill(0).map((_, index) => (
              <motion.article 
                key={index} 
                className="bg-white border border-gray-200 rounded-xl overflow-hidden animate-pulse h-96"
                variants={item}
              />
            ))
          ) : (
            recentNews.map((newsItem) => (
              <motion.div key={newsItem.id} variants={item}>
                <NewsCard newsData={newsItem} />
              </motion.div>
            ))
          )}
        </motion.div>
        
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Button 
            variant="outline" 
            className="inline-flex items-center px-6 py-3 border border-[#1D1D1F] text-[#1D1D1F] hover:bg-gray-100 transition-colors duration-300"
            asChild
          >
            <Link href="/news" className="inline-flex items-center gap-2">
              View All News <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsSection;
