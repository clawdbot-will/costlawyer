import { useQuery } from "@tanstack/react-query";
import { TeamMember as TeamMemberType } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";
import { SEO } from "@/components/seo/SEO";
import { Link } from "wouter";
import { Twitter, Linkedin, Mail } from "lucide-react";
import { motion } from "framer-motion";

export default function Team() {
  const { data: teamMembers, isLoading } = useQuery<TeamMemberType[]>({
    queryKey: ['/api/team']
  });

  const teamMember = teamMembers?.[0];
  const imageUrl = teamMember?.imageUrl || '';

  return (
    <div>
      <SEO
        title="William Mackenzie | Cost Lawyer | Mackenzie Costs"
        description="William Mackenzie is a Legal 500 ranked cost lawyer with over 15 years of experience in costs law, specializing in complex high-value litigation."
        keywords={["William Mackenzie", "cost lawyer", "legal costs expert", "mackenzie costs", "Legal 500 ranked lawyer"]}
        type="website"
        canonical="/team"
      />
      {/* Header Banner */}
      <div className="bg-[#0A0A0A] text-white py-24 md:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About Me</h1>
          <p className="text-xl max-w-3xl">
            Founder and Legal 500 ranked costs lawyer with over 15 years of experience in costs law.
          </p>
        </div>
      </div>

      {/* Team Overview */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto mb-16">
            {isLoading ? (
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <Skeleton className="w-full md:w-1/2 h-[500px] rounded-lg" />
                <div className="w-full md:w-1/2">
                  <Skeleton className="h-10 w-60 mb-4" />
                  <Skeleton className="h-6 w-40 mb-8" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4 mb-6" />
                  <div className="flex space-x-4 mt-8">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <Skeleton className="h-10 w-10 rounded-full" />
                  </div>
                </div>
              </div>
            ) : teamMember ? (
              <div className="flex flex-col md:flex-row gap-12 items-start">
                <motion.div 
                  className="w-full md:w-1/2 rounded-lg overflow-hidden shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <img 
                    src={teamMember.imageUrl || ''} 
                    alt={`${teamMember.name} - ${teamMember.position}`} 
                    className="w-full h-auto object-cover"
                  />
                </motion.div>
                <motion.div 
                  className="w-full md:w-1/2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <h2 className="text-3xl font-bold mb-2 text-[#0A0A0A]">{teamMember.name}</h2>
                  <p className="text-xl text-[#007AFF] font-medium mb-6">{teamMember.position}</p>
                  <div className="prose prose-lg max-w-none">
                    <p className="text-[#1D1D1F]/80 mb-6">{teamMember.bio}</p>
                  </div>
                  <div className="flex space-x-6 mt-8">
                    {teamMember.linkedin && (
                      <a 
                        href={teamMember.linkedin} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-gray-600 hover:text-[#007AFF] transition-colors p-2 bg-gray-100 rounded-full"
                        aria-label={`${teamMember.name}'s LinkedIn profile`}
                      >
                        <Linkedin className="h-6 w-6" />
                      </a>
                    )}
                    {teamMember.twitter && (
                      <a 
                        href={teamMember.twitter} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-gray-600 hover:text-[#007AFF] transition-colors p-2 bg-gray-100 rounded-full"
                        aria-label={`${teamMember.name}'s Twitter profile`}
                      >
                        <Twitter className="h-6 w-6" />
                      </a>
                    )}
                    {teamMember.email && (
                      <a 
                        href={`mailto:${teamMember.email}`} 
                        className="text-gray-600 hover:text-[#007AFF] transition-colors p-2 bg-gray-100 rounded-full"
                        aria-label={`Email ${teamMember.name}`}
                      >
                        <Mail className="h-6 w-6" />
                      </a>
                    )}
                  </div>
                </motion.div>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      {/* Company Values */}
      <section className="py-20 bg-[#F5F5F7]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-[#0A0A0A]">Our Values</h2>
            <p className="text-lg text-[#1D1D1F]/80">
              The core principles that drive everything we do at Mackenzie Costs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-[#007AFF]/10 rounded-full flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-[#007AFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-[#0A0A0A]">Integrity</h3>
              <p className="text-[#1D1D1F]/80">
                We uphold the highest ethical standards and deliver on our promises with honesty and transparency.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-[#007AFF]/10 rounded-full flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-[#007AFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-[#0A0A0A]">Excellence</h3>
              <p className="text-[#1D1D1F]/80">
                We strive for excellence in everything we do, constantly refining our expertise to deliver superior results.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-[#007AFF]/10 rounded-full flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-[#007AFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-[#0A0A0A]">Collaboration</h3>
              <p className="text-[#1D1D1F]/80">
                We work closely with our clients, fostering partnerships built on mutual respect and shared objectives.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-[#007AFF]/10 rounded-full flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-[#007AFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-[#0A0A0A]">Innovation</h3>
              <p className="text-[#1D1D1F]/80">
                We embrace innovative approaches to costs law, constantly adapting to meet the evolving needs of our clients.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Join Us Banner */}
      <section className="py-16 bg-[#0A0A0A] text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Join Our Team</h2>
            <p className="text-lg text-gray-300 mb-8">
              Are you passionate about costs law and looking to join a team of experts? We're always interested in hearing from talented professionals.
            </p>
            <Link href="/contact" className="px-8 py-3 bg-[#007AFF] text-white rounded-md hover:bg-[#2997FF] transition-colors duration-200 inline-block font-medium">
              Get In Touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
