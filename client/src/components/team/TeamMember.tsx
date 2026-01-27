import { TeamMember as TeamMemberType } from "@shared/schema";
import { motion } from "framer-motion";
import { Twitter, Linkedin, Mail } from "lucide-react";

interface TeamMemberProps {
  member: TeamMemberType;
}

export default function TeamMember({ member }: TeamMemberProps) {
  return (
    <div className="group">
      <motion.div 
        className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform duration-300 h-full cursor-pointer"
        whileHover={{ y: -8 }}
      >
        {member.imageUrl ? (
          <img 
            src={member.imageUrl} 
            alt={`${member.name} - ${member.position}`} 
            className="w-full h-72 object-cover object-center"
          />
        ) : (
          <div className="w-full h-72 bg-gradient-to-br from-[#007AFF]/80 to-[#2997FF] flex items-center justify-center">
            <span className="text-white text-6xl font-bold">
              {member.name.split(' ').map(name => name[0]).join('')}
            </span>
          </div>
        )}
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-1 text-[#0A0A0A]">{member.name}</h3>
          <p className="text-[#007AFF] font-medium mb-4">{member.position}</p>
          <p className="text-gray-600 mb-5">{member.bio}</p>
          <div className="flex space-x-4">
            {member.linkedin && (
              <a 
                href={member.linkedin} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-600 hover:text-[#007AFF] transition-colors"
                aria-label={`${member.name}'s LinkedIn profile`}
              >
                <Linkedin className="h-5 w-5" />
              </a>
            )}
            {member.twitter && (
              <a 
                href={member.twitter} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-600 hover:text-[#007AFF] transition-colors"
                aria-label={`${member.name}'s Twitter profile`}
              >
                <Twitter className="h-5 w-5" />
              </a>
            )}
            {member.email && (
              <a 
                href={`mailto:${member.email}`} 
                className="text-gray-600 hover:text-[#007AFF] transition-colors"
                aria-label={`Email ${member.name}`}
              >
                <Mail className="h-5 w-5" />
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
