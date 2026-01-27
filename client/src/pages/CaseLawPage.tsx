import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useParams } from "wouter";
import { motion } from "framer-motion";
import { Search, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import CaseCard from "@/components/case-law/CaseCard";
import CaseContent from "@/components/caselaw/CaseContent";
import { Case } from "@shared/schema";
import { SEO } from "@/components/seo/SEO";
import { CaseLawSEO } from "@/components/seo/CaseLawSEO";

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

const CaseLawPage = () => {
  const [location, setLocation] = useLocation();
  const params = useParams();
  const searchParams = new URLSearchParams(location.split("?")[1] || "");
  
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "All Categories");
  const [year, setYear] = useState(searchParams.get("year") || "All Years");

  // If there's a slug parameter, we're viewing a single case
  const isViewingSingleCase = !!params.slug;

  const { data: cases, isLoading: isLoadingAllCases } = useQuery<Case[]>({
    queryKey: ['/api/cases'],
    enabled: !isViewingSingleCase,
  });

  const { data: singleCase, isLoading: isLoadingSingleCase } = useQuery<Case>({
    queryKey: [`/api/cases/${params.slug}`],
    enabled: isViewingSingleCase,
  });

  // Filter cases based on search criteria
  const filteredCases = cases?.filter(caseItem => {
    let matchesSearch = true;
    let matchesCategory = true;
    let matchesYear = true;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      matchesSearch = 
        caseItem.title.toLowerCase().includes(query) ||
        caseItem.summary.toLowerCase().includes(query) ||
        caseItem.content.toLowerCase().includes(query) ||
        caseItem.author.toLowerCase().includes(query) ||
        caseItem.tags.some(tag => tag.toLowerCase().includes(query));
    }

    if (category && category !== "All Categories") {
      matchesCategory = caseItem.category === category;
    }

    if (year && year !== "All Years") {
      matchesYear = caseItem.date.includes(year);
    }

    return matchesSearch && matchesCategory && matchesYear;
  });

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchQuery) params.set("q", searchQuery);
    if (category !== "All Categories") params.set("category", category);
    if (year !== "All Years") params.set("year", year);
    
    const queryString = params.toString();
    setLocation(`/cases${queryString ? `?${queryString}` : ''}`);
  };

  // We no longer need to manually set the document title as React Helmet handles this
  // through our SEO components

  if (isViewingSingleCase) {
    return (
      <div className="pt-32 pb-20">
        {singleCase && !isLoadingSingleCase && (
          <CaseLawSEO caseData={singleCase} />
        )}
        <div className="container mx-auto px-4">
          {isLoadingSingleCase ? (
            <div className="animate-pulse">
              <div className="h-10 bg-gray-200 rounded-md w-3/4 mb-4"></div>
              <div className="h-6 bg-gray-200 rounded-md w-1/4 mb-8"></div>
              <div className="h-40 bg-gray-200 rounded-md mb-6"></div>
              <div className="h-6 bg-gray-200 rounded-md w-full mb-4"></div>
              <div className="h-6 bg-gray-200 rounded-md w-full mb-4"></div>
              <div className="h-6 bg-gray-200 rounded-md w-3/4"></div>
            </div>
          ) : singleCase ? (
            <div>
              <Button 
                variant="ghost" 
                className="mb-6 text-[#007AFF] hover:text-[#2997FF]" 
                onClick={() => setLocation("/cases")}
              >
                <ArrowLeft className="w-4 h-4 mr-2" /> Back to Cases
              </Button>
              
              <div className="flex justify-between items-start mb-6">
                <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                  singleCase.category === 'QOCS' ? 'bg-blue-100 text-blue-700' :
                  singleCase.category === 'Solicitor\'s Act' ? 'bg-green-100 text-green-700' :
                  singleCase.category === 'Cost Budgeting' ? 'bg-purple-100 text-purple-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {singleCase.category}
                </span>
                <span className="text-sm text-gray-500">{singleCase.date}</span>
              </div>
              
              <h1 className="font-display font-bold text-3xl md:text-4xl mb-4">{singleCase.title}</h1>
              <p className="text-lg text-gray-700 mb-8">{singleCase.summary}</p>
              
              <div className="mb-6 flex items-center">
                <div className="w-10 h-10 rounded-full bg-[#007AFF] flex items-center justify-center text-white font-bold mr-3">
                  {singleCase.author.split(" ").map(name => name[0]).join("")}
                </div>
                <span className="font-medium">{singleCase.author}</span>
              </div>
              
              <div className="case-content mb-8">
                {/* Use our custom CaseContent component to properly format the content */}
                <CaseContent content={singleCase.content} />
              </div>
              
              <div className="border-t border-gray-200 pt-6 mt-8">
                <h3 className="font-display font-bold text-xl mb-4">Related Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {singleCase.tags.map((tag, index) => (
                    <span key={index} className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-16">
              <h2 className="font-display font-bold text-2xl mb-4">Case Not Found</h2>
              <p className="text-gray-600 mb-6">The case you're looking for doesn't exist or may have been removed.</p>
              <Button 
                className="bg-[#007AFF] hover:bg-[#2997FF] text-white"
                onClick={() => setLocation("/cases")}
              >
                Return to Case Library
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20">
      <SEO 
        title="Case Law Database | Mackenzie Costs"
        description="Access our comprehensive collection of costs law cases and precedents. Browse through detailed case analyses, summaries and expert commentary."
        keywords={["legal costs", "cost budgeting", "case law", "QOCS", "detailed assessment"]}
        type="website"
      />
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="font-display font-bold text-3xl md:text-4xl mb-4">Case Law Database</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Access our comprehensive collection of costs law cases and precedents</p>
        </motion.div>
        
        {/* Search and Filter Tools */}
        <motion.div 
          className="mb-10 bg-[#F5F5F7] rounded-xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search cases by keyword, citation or judge..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-4 pr-10 py-3 rounded-md border border-gray-300 focus:border-[#007AFF] focus:ring-1 focus:ring-[#007AFF] outline-none"
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
                <Search className="absolute right-3 top-3 text-gray-400 h-5 w-5" />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="w-full sm:w-40">
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
                <SelectTrigger className="w-full sm:w-32">
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
                className="bg-[#007AFF] hover:bg-[#2997FF] text-white"
                onClick={handleSearch}
              >
                Search
              </Button>
            </div>
          </div>
        </motion.div>
        
        {/* Results Info */}
        <div className="mb-6 flex justify-between items-center">
          <h2 className="font-display font-medium text-xl">
            {isLoadingAllCases ? (
              <span className="animate-pulse bg-gray-200 rounded-md h-8 w-40 inline-block"></span>
            ) : (
              `${filteredCases?.length || 0} cases found`
            )}
          </h2>
          {(searchQuery || category !== "All Categories" || year !== "All Years") && (
            <Button 
              variant="ghost" 
              className="text-[#007AFF] hover:text-[#2997FF]"
              onClick={() => {
                setSearchQuery("");
                setCategory("All Categories");
                setYear("All Years");
                setLocation("/cases");
              }}
            >
              Clear Filters <i className="fas fa-times ml-2"></i>
            </Button>
          )}
        </div>
        
        {/* Case Cards */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {isLoadingAllCases ? (
            // Loading skeleton
            Array(6).fill(0).map((_, index) => (
              <motion.div 
                key={index} 
                className="border border-gray-200 rounded-xl overflow-hidden animate-pulse h-64"
                variants={item}
              />
            ))
          ) : filteredCases && filteredCases.length > 0 ? (
            filteredCases.map((caseItem) => (
              <motion.div key={caseItem.id} variants={item}>
                <CaseCard caseData={caseItem} />
              </motion.div>
            ))
          ) : (
            <div className="col-span-3 text-center py-16">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <i className="fas fa-search text-gray-400 text-2xl"></i>
              </div>
              <h3 className="font-display font-bold text-xl mb-2">No cases found</h3>
              <p className="text-gray-600">Try adjusting your search criteria or browse our full case library.</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default CaseLawPage;
