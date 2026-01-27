import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SearchFiltersProps {
  initialQuery?: string;
  initialCategory?: string;
  initialYear?: string;
  onSearch?: (query: string, category: string, year: string) => void;
}

const SearchFilters = ({
  initialQuery = "",
  initialCategory = "All Categories",
  initialYear = "All Years",
  onSearch
}: SearchFiltersProps) => {
  const [location, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [category, setCategory] = useState(initialCategory);
  const [year, setYear] = useState(initialYear);

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchQuery, category, year);
    } else {
      // Default behavior - update URL and navigate
      const params = new URLSearchParams();
      if (searchQuery) params.set("q", searchQuery);
      if (category !== "All Categories") params.set("category", category);
      if (year !== "All Years") params.set("year", year);
      
      const queryString = params.toString();
      setLocation(`/cases${queryString ? `?${queryString}` : ''}`);
    }
  };

  const handleReset = () => {
    setSearchQuery("");
    setCategory("All Categories");
    setYear("All Years");
    
    if (onSearch) {
      onSearch("", "All Categories", "All Years");
    } else {
      setLocation("/cases");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="bg-[#F5F5F7] rounded-xl p-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search cases by keyword, citation or judge..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full pl-4 pr-10 py-3 rounded-md border border-gray-300 focus:border-[#007AFF] focus:ring-1 focus:ring-[#007AFF] outline-none"
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
          {(searchQuery || category !== "All Categories" || year !== "All Years") && (
            <Button 
              variant="ghost"
              className="text-[#007AFF] hover:text-[#2997FF]"
              onClick={handleReset}
            >
              Reset
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;
