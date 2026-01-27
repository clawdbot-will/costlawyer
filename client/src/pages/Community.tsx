import DiscordWidget from "@/components/community/DiscordWidget";
import Newsletter from "@/components/home/Newsletter";

export default function Community() {
  return (
    <div>
      {/* Header Banner */}
      <div className="bg-[#0A0A0A] text-white py-24 md:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Legal Costs Community</h1>
          <p className="text-xl max-w-3xl">
            Connect with other legal professionals, share insights, and stay updated on costs law developments.
          </p>
        </div>
      </div>

      {/* Community Overview */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#0A0A0A]">Join Our Legal Costs Community</h2>
              <p className="text-lg text-[#1D1D1F]/80 mb-6">
                Connect with other legal professionals, share insights, and stay updated on the latest developments in costs law through our Discord community.
              </p>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#007AFF]/10 flex items-center justify-center mt-1">
                    <svg className="h-4 w-4 text-[#007AFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <span className="ml-3 text-[#1D1D1F]/90">Access exclusive case law updates and analysis</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#007AFF]/10 flex items-center justify-center mt-1">
                    <svg className="h-4 w-4 text-[#007AFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <span className="ml-3 text-[#1D1D1F]/90">Network with experienced costs professionals</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#007AFF]/10 flex items-center justify-center mt-1">
                    <svg className="h-4 w-4 text-[#007AFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <span className="ml-3 text-[#1D1D1F]/90">Participate in regular Q&A sessions with our experts</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#007AFF]/10 flex items-center justify-center mt-1">
                    <svg className="h-4 w-4 text-[#007AFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <span className="ml-3 text-[#1D1D1F]/90">Receive notifications about upcoming training events</span>
                </li>
              </ul>
              
              <a 
                href="https://discord.gg/mackenzie-costs" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center px-6 py-3 bg-[#007AFF] text-white rounded-md hover:bg-[#2997FF] transition-colors duration-200 font-medium"
              >
                <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3847-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"></path>
                </svg>
                Join Our Discord Community
              </a>
            </div>
            
            <DiscordWidget />
          </div>
        </div>
      </section>

      {/* Community Events */}
      <section className="py-20 bg-[#F5F5F7]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-[#0A0A0A]">Upcoming Community Events</h2>
            <p className="text-lg text-[#1D1D1F]/80">
              Join us for these upcoming events and connect with fellow legal professionals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="bg-[#007AFF] p-4 text-white flex justify-between items-center">
                <div>
                  <span className="text-2xl font-bold">23</span>
                  <span className="ml-1">Jun</span>
                </div>
                <span className="px-3 py-1 bg-white text-[#007AFF] rounded-full text-sm font-medium">Online</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-[#0A0A0A]">Q&A Session: Recent Developments in QOCS</h3>
                <p className="text-[#1D1D1F]/80 mb-4">
                  Join William Mackenzie for a live Q&A session discussing the latest developments in Qualified One-way Costs Shifting.
                </p>
                <div className="flex items-center text-[#1D1D1F]/70 text-sm mb-6">
                  <svg className="h-5 w-5 mr-2 text-[#007AFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span>3:00 PM - 4:30 PM BST</span>
                </div>
                <a href="#" className="inline-block text-[#007AFF] hover:text-[#2997FF] font-medium">
                  Register Now
                </a>
              </div>
            </div>

            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="bg-[#007AFF] p-4 text-white flex justify-between items-center">
                <div>
                  <span className="text-2xl font-bold">15</span>
                  <span className="ml-1">Jul</span>
                </div>
                <span className="px-3 py-1 bg-white text-[#007AFF] rounded-full text-sm font-medium">In-Person</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-[#0A0A0A]">Workshop: Mastering Costs Budgeting</h3>
                <p className="text-[#1D1D1F]/80 mb-4">
                  A hands-on workshop focused on effective costs budgeting strategies for legal professionals.
                </p>
                <div className="flex items-center text-[#1D1D1F]/70 text-sm mb-2">
                  <svg className="h-5 w-5 mr-2 text-[#007AFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span>10:00 AM - 3:00 PM BST</span>
                </div>
                <div className="flex items-center text-[#1D1D1F]/70 text-sm mb-6">
                  <svg className="h-5 w-5 mr-2 text-[#007AFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                  <span>London Legal Center, EC4A 2AB</span>
                </div>
                <a href="#" className="inline-block text-[#007AFF] hover:text-[#2997FF] font-medium">
                  Register Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Resources */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-[#0A0A0A]">Community Resources</h2>
            <p className="text-lg text-[#1D1D1F]/80">
              Access these exclusive resources as a member of our community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#F5F5F7] rounded-lg p-6">
              <div className="w-14 h-14 rounded-full bg-[#007AFF]/10 flex items-center justify-center mb-4">
                <svg className="h-7 w-7 text-[#007AFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-[#0A0A0A]">Templates & Precedents</h3>
              <p className="text-[#1D1D1F]/80 mb-4">
                Access our library of templates, precedents, and sample documents for costs work.
              </p>
              <a href="#" className="text-[#007AFF] hover:text-[#2997FF] font-medium flex items-center">
                Access Library
                <svg className="h-4 w-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </a>
            </div>

            <div className="bg-[#F5F5F7] rounded-lg p-6">
              <div className="w-14 h-14 rounded-full bg-[#007AFF]/10 flex items-center justify-center mb-4">
                <svg className="h-7 w-7 text-[#007AFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-[#0A0A0A]">Webinar Recordings</h3>
              <p className="text-[#1D1D1F]/80 mb-4">
                Catch up on past webinars and educational sessions on various aspects of costs law.
              </p>
              <a href="#" className="text-[#007AFF] hover:text-[#2997FF] font-medium flex items-center">
                View Recordings
                <svg className="h-4 w-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </a>
            </div>

            <div className="bg-[#F5F5F7] rounded-lg p-6">
              <div className="w-14 h-14 rounded-full bg-[#007AFF]/10 flex items-center justify-center mb-4">
                <svg className="h-7 w-7 text-[#007AFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-[#0A0A0A]">Event Calendar</h3>
              <p className="text-[#1D1D1F]/80 mb-4">
                Stay updated with upcoming events, webinars, and networking opportunities.
              </p>
              <a href="#" className="text-[#007AFF] hover:text-[#2997FF] font-medium flex items-center">
                View Calendar
                <svg className="h-4 w-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      <Newsletter />
    </div>
  );
}
