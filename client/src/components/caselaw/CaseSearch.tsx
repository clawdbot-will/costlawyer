import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronDown, ChevronUp, Search } from "lucide-react";

interface CaseSearchProps {
  search: string;
  setSearch: (value: string) => void;
  category: string;
  setCategory: (value: string) => void;
  year: string;
  setYear: (value: string) => void;
  showAdvanced: boolean;
  setShowAdvanced: (value: boolean) => void;
}

export default function CaseSearch({
  search,
  setSearch,
  category,
  setCategory,
  year,
  setYear,
  showAdvanced,
  setShowAdvanced
}: CaseSearchProps) {
  // For advanced filters
  const [judge, setJudge] = useState("");
  const [court, setCourt] = useState("");

  return (
    <div className="bg-[#F5F5F7] rounded-lg p-6">
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <div className="flex-grow">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search cases by keyword, judge, or citation..."
              className="w-full px-4 py-3 pr-10 rounded-md border border-gray-300 focus:ring-[#007AFF]"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          </div>
        </div>
        <div>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-full md:w-48 px-4 py-3 rounded-md border border-gray-300 h-[46px]">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Categories</SelectItem>
              <SelectItem value="detailed-assessment">Detailed Assessment</SelectItem>
              <SelectItem value="costs-budgeting">Costs Budgeting</SelectItem>
              <SelectItem value="fixed-costs">Fixed Costs</SelectItem>
              <SelectItem value="qocs">QOCS</SelectItem>
              <SelectItem value="solicitors-act">Solicitor's Act</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Select value={year} onValueChange={setYear}>
            <SelectTrigger className="w-full md:w-48 px-4 py-3 rounded-md border border-gray-300 h-[46px]">
              <SelectValue placeholder="All Years" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Years</SelectItem>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2023">2023</SelectItem>
              <SelectItem value="2022">2022</SelectItem>
              <SelectItem value="2021">2021</SelectItem>
              <SelectItem value="2020">2020</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {/* Advanced Filters Toggle */}
      <div className="mt-2">
        <Button
          variant="ghost"
          className="text-[#007AFF] hover:text-[#2997FF] font-medium text-sm flex items-center p-0 h-auto"
          onClick={() => setShowAdvanced(!showAdvanced)}
        >
          Advanced Filters
          {showAdvanced ? 
            <ChevronUp className="ml-2 h-4 w-4" /> : 
            <ChevronDown className="ml-2 h-4 w-4" />
          }
        </Button>
      </div>

      {/* Advanced Filters (conditionally rendered) */}
      {showAdvanced && (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-200">
          <div>
            <label htmlFor="judge" className="block text-sm font-medium text-gray-700 mb-1">Judge</label>
            <Input
              id="judge"
              type="text"
              placeholder="Filter by judge name..."
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-[#007AFF]"
              value={judge}
              onChange={(e) => setJudge(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="court" className="block text-sm font-medium text-gray-700 mb-1">Court</label>
            <Select value={court} onValueChange={setCourt}>
              <SelectTrigger id="court" className="w-full px-4 py-2 rounded-md border border-gray-300">
                <SelectValue placeholder="All Courts" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Courts</SelectItem>
                <SelectItem value="high-court">High Court</SelectItem>
                <SelectItem value="court-of-appeal">Court of Appeal</SelectItem>
                <SelectItem value="supreme-court">Supreme Court</SelectItem>
                <SelectItem value="county-court">County Court</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label htmlFor="citation" className="block text-sm font-medium text-gray-700 mb-1">Citation</label>
            <Input
              id="citation"
              type="text"
              placeholder="Case citation..."
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-[#007AFF]"
            />
          </div>
          <div>
            <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
            <Select defaultValue="date-desc">
              <SelectTrigger id="sort" className="w-full px-4 py-2 rounded-md border border-gray-300">
                <SelectValue placeholder="Sort by..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date-desc">Newest First</SelectItem>
                <SelectItem value="date-asc">Oldest First</SelectItem>
                <SelectItem value="title-asc">Title (A-Z)</SelectItem>
                <SelectItem value="title-desc">Title (Z-A)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}
    </div>
  );
}
