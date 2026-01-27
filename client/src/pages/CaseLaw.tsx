import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import CaseSearch from "@/components/caselaw/CaseSearch";
import CaseCard from "@/components/caselaw/CaseCard";
import { CaseLaw } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";

export default function CaseLaw() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [year, setYear] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const casesPerPage = 9;

  const { data: cases, isLoading } = useQuery<CaseLaw[]>({
    queryKey: ['/api/case-law', search, category, year],
  });

  const filteredCases = cases || [];
  
  // Calculate pagination
  const indexOfLastCase = currentPage * casesPerPage;
  const indexOfFirstCase = indexOfLastCase - casesPerPage;
  const currentCases = filteredCases.slice(indexOfFirstCase, indexOfLastCase);
  const totalPages = Math.ceil(filteredCases.length / casesPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      {/* Header Banner */}
      <div className="bg-[#0A0A0A] text-white py-24 md:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Case Law Database</h1>
          <p className="text-xl max-w-3xl">
            Search our comprehensive collection of cost-related case law, precedents, and legal resources.
          </p>
        </div>
      </div>

      {/* Search & Filters */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <CaseSearch 
            search={search} 
            setSearch={setSearch}
            category={category}
            setCategory={setCategory}
            year={year}
            setYear={setYear}
            showAdvanced={showAdvanced}
            setShowAdvanced={setShowAdvanced}
          />

          {/* Case List */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? (
              Array(9).fill(0).map((_, index) => (
                <div key={index} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                  <div className="p-6">
                    <Skeleton className="h-6 w-24 mb-4" />
                    <Skeleton className="h-8 w-full mb-2" />
                    <Skeleton className="h-20 w-full mb-4" />
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Skeleton className="h-8 w-8 rounded-full mr-2" />
                        <Skeleton className="h-4 w-24" />
                      </div>
                      <Skeleton className="h-4 w-16" />
                    </div>
                  </div>
                </div>
              ))
            ) : currentCases.length > 0 ? (
              currentCases.map((caseItem) => (
                <CaseCard key={caseItem.id} caseData={caseItem} />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <h3 className="text-xl font-semibold text-[#1D1D1F]">No case law found matching your criteria</h3>
                <p className="text-[#1D1D1F]/80 mt-2">Try adjusting your search filters</p>
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-10">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                      className={currentPage === 1 ? "cursor-not-allowed opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                  
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    // Create a window of 5 pages around the current page
                    let pageNum = currentPage - 2 + i;
                    if (pageNum < 1) pageNum = i + 1;
                    if (pageNum > totalPages) pageNum = totalPages - (4 - i);
                    if (pageNum > 0 && pageNum <= totalPages) {
                      return (
                        <PaginationItem key={i}>
                          <PaginationLink
                            isActive={pageNum === currentPage}
                            onClick={() => handlePageChange(pageNum)}
                          >
                            {pageNum}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    }
                    return null;
                  })}
                  
                  {totalPages > 5 && currentPage < totalPages - 2 && (
                    <>
                      <PaginationItem>
                        <span className="px-4 py-2 text-[#1D1D1F]/60">...</span>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink onClick={() => handlePageChange(totalPages)}>
                          {totalPages}
                        </PaginationLink>
                      </PaginationItem>
                    </>
                  )}
                  
                  <PaginationItem>
                    <PaginationNext 
                      onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                      className={currentPage === totalPages ? "cursor-not-allowed opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
