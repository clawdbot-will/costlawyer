import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Search, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import CaseCard from "@/components/case-law/CaseCard";
import { Case } from "@shared/schema";

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

const CaseLawSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [year, setYear] = useState("All Years");

  const { data: cases, isLoading } = useQuery<Case[]>({
    queryKey: ['/api/cases'],
  });

  // Filter cases based on search criteria for the homepage preview
  const filteredCases = cases?.slice(0, 3) || [];

  return (
    <section id="cases" className="py-24 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDdBRkYiIGZpbGwtb3BhY2l0eT0iMC4wMiI+PHBhdGggZD0iTTM2IDM0djItMnptMC0ydjJ6bTAtMnYyem0wLTJ2MnptMC0ydjJ6bTAtMnYyem0wLTJ2MnptMC0ydjJ6bTAtMnYyem0wLTJ2MnptMC0ydjJ6bTAtMnYyem0wLTJ2MnptMC0ydjJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-50"></div>
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="inline-block mb-4 px-4 py-2 bg-blue-50 border border-blue-100 rounded-full"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-sm font-semibold text-[#007AFF]">Legal Resources</span>
          </motion.div>
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl mb-4 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">Case Law Database</h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">Access our comprehensive collection of costs law cases and precedents</p>
        </motion.div>
        
        {/* Search and Filter Tools */}
        <motion.div 
          className="mb-12 bg-white rounded-2xl p-6 md:p-8 shadow-xl shadow-gray-200/50 border border-gray-100"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5 group-focus-within:text-[#007AFF] transition-colors" />
                <Input
                  type="text"
                  placeholder="Search cases by keyword, citation or judge..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-200 focus:border-[#007AFF] focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="w-full sm:w-48 h-12 rounded-xl border-2 border-gray-200 hover:border-gray-300 transition-colors">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All Categories">All Categories</SelectItem>
                  <SelectItem value="Cost Budgeting">Cost Budgeting</SelectItem>
                  <SelectItem value="Detailed Assessment">Detailed Assessment</SelectItem>
                  <SelectItem value="QOCS">QOCS</SelectItem>
                  <SelectItem value="Solicitor's Act">Solicitor's Act</SelectItem>
                  <SelectItem value="Part 36">Part 36</SelectItem>
                </SelectContent>
              </Select>
              <Select value={year} onValueChange={setYear}>
                <SelectTrigger className="w-full sm:w-32 h-12 rounded-xl border-2 border-gray-200 hover:border-gray-300 transition-colors">
                  <SelectValue placeholder="All Years" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All Years">All Years</SelectItem>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="2023">2023</SelectItem>
                  <SelectItem value="2022">2022</SelectItem>
                  <SelectItem value="2021">2021</SelectItem>
                  <SelectItem value="2020">2020</SelectItem>
                </SelectContent>
              </Select>
              <Button 
                className="bg-[#007AFF] hover:bg-[#0066DD] text-white h-12 px-8 rounded-xl font-semibold shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all hover:scale-105"
                asChild
              >
                <Link href={`/cases?q=${searchQuery}&category=${category}&year=${year}`}>
                  Search
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>
        
        {/* Case Cards */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {isLoading ? (
            // Loading skeleton
            Array(3).fill(0).map((_, index) => (
              <motion.div 
                key={index} 
                className="border border-gray-200 rounded-xl overflow-hidden animate-pulse h-64"
                variants={item}
              />
            ))
          ) : (
            filteredCases.map((caseItem) => (
              <motion.div key={caseItem.id} variants={item}>
                <CaseCard caseData={caseItem} />
              </motion.div>
            ))
          )}
        </motion.div>
        
        <div className="text-center">
          <Button 
            variant="outline" 
            className="inline-flex items-center px-6 py-3 border border-[#1D1D1F] text-[#1D1D1F] hover:bg-gray-100 transition-colors duration-300"
            asChild
          >
            <Link href="/cases" className="inline-flex items-center gap-2">
              View All Cases <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CaseLawSection;
