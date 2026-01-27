import Hero from "@/components/home/Hero";
import WhyUs from "@/components/home/WhyUs";
import ServicesHighlight from "@/components/home/ServicesHighlight";
import Newsletter from "@/components/home/Newsletter";
import { useQuery } from "@tanstack/react-query";
import { Service, TeamMember, CaseLaw } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";
import CaseCard from "@/components/caselaw/CaseCard";
import TeamMember from "@/components/team/TeamMember";
import { Link } from "wouter";

export default function Home() {
  const { data: services, isLoading: servicesLoading } = useQuery<Service[]>({
    queryKey: ['/api/services']
  });

  const { data: teamMembers, isLoading: teamLoading } = useQuery<TeamMember[]>({
    queryKey: ['/api/team']
  });

  const { data: featuredCases, isLoading: casesLoading } = useQuery<CaseLaw[]>({
    queryKey: ['/api/case-law/featured']
  });

  return (
    <div>
      <Hero />
      <WhyUs />
      
      {/* Services Section */}
      <ServicesHighlight 
        isLoading={servicesLoading} 
        services={services || []} 
      />

      {/* Featured Case Law Section */}
      <section className="py-20 bg-white" id="featured-cases">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#0A0A0A]">Latest Case Law Updates</h2>
            <p className="text-lg text-[#1D1D1F]/80">Stay informed with our most recent case law insights</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {casesLoading ? (
              Array(3).fill(0).map((_, index) => (
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
            ) : (
              featuredCases?.slice(0, 3).map((caseItem) => (
                <CaseCard key={caseItem.id} caseData={caseItem} />
              ))
            )}
          </div>

          <div className="text-center mt-10">
            <Link href="/case-law">
              <a className="px-8 py-3 inline-block bg-[#007AFF] text-white rounded-md hover:bg-[#2997FF] transition-colors duration-200 font-medium">
                View All Case Law
              </a>
            </Link>
          </div>
        </div>
      </section>

      {/* Team Overview Section */}
      <section className="py-20 bg-[#F5F5F7]" id="team-overview">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#0A0A0A]">Our Team</h2>
            <p className="text-lg text-[#1D1D1F]/80">Meet our expert cost lawyers and legal professionals</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamLoading ? (
              Array(3).fill(0).map((_, index) => (
                <div key={index} className="bg-white rounded-lg overflow-hidden shadow-lg">
                  <Skeleton className="w-full h-72" />
                  <div className="p-6">
                    <Skeleton className="h-6 w-40 mb-1" />
                    <Skeleton className="h-5 w-32 mb-4" />
                    <Skeleton className="h-20 w-full mb-5" />
                    <div className="flex space-x-4">
                      <Skeleton className="h-8 w-8 rounded-full" />
                      <Skeleton className="h-8 w-8 rounded-full" />
                      <Skeleton className="h-8 w-8 rounded-full" />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              teamMembers?.slice(0, 3).map((member) => (
                <TeamMember key={member.id} member={member} />
              ))
            )}
          </div>

          <div className="text-center mt-10">
            <Link href="/team">
              <a className="px-8 py-3 inline-block bg-[#007AFF] text-white rounded-md hover:bg-[#2997FF] transition-colors duration-200 font-medium">
                Meet The Full Team
              </a>
            </Link>
          </div>
        </div>
      </section>

      <Newsletter />
    </div>
  );
}
