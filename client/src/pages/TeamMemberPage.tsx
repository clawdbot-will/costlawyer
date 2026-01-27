import { useQuery } from "@tanstack/react-query";
import { useRoute } from "wouter";
import { TeamMember as TeamMemberType } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";
import { SEO } from "@/components/seo/SEO";
import { Twitter, Linkedin, Mail, ChevronLeft } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function TeamMemberPage() {
  const [, params] = useRoute("/team/:id");
  const id = params?.id ? parseInt(params.id) : undefined;

  const { data: teamMember, isLoading, error } = useQuery<TeamMemberType>({
    queryKey: ['/api/team', id],
    enabled: !!id
  });

  if (error) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Error Loading Team Member</h1>
        <p className="text-gray-600 mb-8">We couldn't find the team member you're looking for.</p>
        <Link href="/team" className={cn(buttonVariants({ variant: "default" }))}>
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to Team
        </Link>
      </div>
    );
  }

  return (
    <div>
      {teamMember && (
        <SEO
          title={`${teamMember.name} - ${teamMember.position} | Mackenzie Costs`}
          description={`${teamMember.bio.substring(0, 155)}...`}
          keywords={[teamMember.name, teamMember.position, "legal costs team", "cost lawyer", "mackenzie costs"]}
          type="profile"
          canonical={`/team/${teamMember.id}`}
        />
      )}

      {/* Header with Back Link */}
      <div className="bg-[#F5F5F7] py-8">
        <div className="container mx-auto px-4">
          <Link href="/team" className="inline-flex items-center text-[#007AFF] hover:text-[#0A0A0A] transition-colors">
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back to Team
          </Link>
        </div>
      </div>

      {/* Team Member Profile */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-1">
                <Skeleton className="w-full h-96 rounded-lg" />
              </div>
              <div className="md:col-span-2">
                <Skeleton className="h-10 w-64 mb-2" />
                <Skeleton className="h-6 w-48 mb-6" />
                <Skeleton className="h-32 w-full mb-6" />
                <div className="flex space-x-4">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <Skeleton className="h-10 w-10 rounded-full" />
                </div>
              </div>
            </div>
          ) : teamMember ? (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="md:col-span-1">
                {teamMember.imageUrl ? (
                  <img 
                    src={teamMember.imageUrl || ''} 
                    alt={`${teamMember.name} - ${teamMember.position}`} 
                    className="w-full h-auto rounded-lg shadow-lg object-cover"
                  />
                ) : (
                  <div className="w-full aspect-[3/4] bg-gradient-to-br from-[#007AFF]/80 to-[#2997FF] rounded-lg shadow-lg flex items-center justify-center">
                    <span className="text-white text-8xl font-bold">
                      {teamMember.name.split(' ').map(name => name[0]).join('')}
                    </span>
                  </div>
                )}
              </div>
              <div className="md:col-span-2">
                <h1 className="text-3xl md:text-4xl font-bold mb-2 text-[#0A0A0A]">{teamMember.name}</h1>
                <p className="text-xl text-[#007AFF] font-medium mb-6">{teamMember.position}</p>
                <div className="prose prose-lg max-w-none mb-8 text-gray-700">
                  <p>{teamMember.bio}</p>
                </div>
                <div className="flex space-x-5">
                  {teamMember.linkedin && (
                    <a 
                      href={teamMember.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-gray-600 hover:text-[#007AFF] transition-colors bg-gray-100 hover:bg-gray-200 p-3 rounded-full"
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
                      className="text-gray-600 hover:text-[#007AFF] transition-colors bg-gray-100 hover:bg-gray-200 p-3 rounded-full"
                      aria-label={`${teamMember.name}'s Twitter profile`}
                    >
                      <Twitter className="h-6 w-6" />
                    </a>
                  )}
                  {teamMember.email && (
                    <a 
                      href={`mailto:${teamMember.email}`} 
                      className="text-gray-600 hover:text-[#007AFF] transition-colors bg-gray-100 hover:bg-gray-200 p-3 rounded-full"
                      aria-label={`Email ${teamMember.name}`}
                    >
                      <Mail className="h-6 w-6" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="text-center py-12">
              <h2 className="text-2xl font-semibold text-gray-800">Team member not found</h2>
              <p className="mt-4 text-gray-600">The team member you're looking for doesn't exist or may have been removed.</p>
              <Link href="/team" className={cn(buttonVariants({ variant: "default" }), "mt-8")}>
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back to Team
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-[#F5F5F7]">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[#0A0A0A]">Get in Touch</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-8">
            Want to discuss how our team can help with your legal costs? Contact us today for a consultation.
          </p>
          <Link href="/contact" className={cn(buttonVariants({ variant: "default", size: "lg" }))}>
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
}