import ContactForm from "@/components/contact/ContactForm";

export default function Contact() {
  return (
    <div>
      {/* Header Banner */}
      <div className="bg-[#0A0A0A] text-white py-24 md:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl max-w-3xl">
            Have a question or need assistance with a costs matter? Get in touch with our team of experts today.
          </p>
        </div>
      </div>

      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#0A0A0A]">Get In Touch</h2>
              <p className="text-lg text-[#1D1D1F]/80 mb-8">
                Have a question or need assistance with a costs matter? Contact our team of experts today.
              </p>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#007AFF]/10 flex items-center justify-center">
                    <svg className="h-5 w-5 text-[#007AFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-[#0A0A0A] mb-1">Email Us</h3>
                    <a href="mailto:william@costlawyer.co.uk" className="text-[#007AFF] hover:text-[#2997FF]">william@costlawyer.co.uk</a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#007AFF]/10 flex items-center justify-center">
                    <svg className="h-5 w-5 text-[#007AFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-[#0A0A0A] mb-1">Call Us</h3>
                    <a href="tel:+442045768203" className="text-[#007AFF] hover:text-[#2997FF]">+44 20 4576 8203</a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#007AFF]/10 flex items-center justify-center">
                    <svg className="h-5 w-5 text-[#007AFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-[#0A0A0A] mb-1">Location</h3>
                    <p className="text-[#1D1D1F]/80">86-90 Paul Street, London EC2A 4NE</p>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-4">
                <a href="https://twitter.com/mackenziecosts" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#007AFF] text-white flex items-center justify-center hover:bg-[#2997FF] transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                  </svg>
                </a>
                <a href="https://linkedin.com/company/mackenziecosts" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#007AFF] text-white flex items-center justify-center hover:bg-[#2997FF] transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path>
                  </svg>
                </a>
                <a href="https://discord.gg/mackenziecosts" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#007AFF] text-white flex items-center justify-center hover:bg-[#2997FF] transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3847-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"></path>
                  </svg>
                </a>
              </div>
            </div>
            
            <ContactForm />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-[#F5F5F7]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-[#0A0A0A]">Frequently Asked Questions</h2>
            <p className="text-lg text-[#1D1D1F]/80">
              Find answers to commonly asked questions about our services.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-3 text-[#0A0A0A]">What areas of costs law do you specialize in?</h3>
              <p className="text-[#1D1D1F]/80">
                We specialize in all areas of costs law including detailed assessment, costs budgeting, fixed costs disputes, solicitor-client costs, and costs management. Our team has expertise across various practice areas including commercial litigation, clinical negligence, personal injury, and more.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-3 text-[#0A0A0A]">How quickly can you prepare a bill of costs?</h3>
              <p className="text-[#1D1D1F]/80">
                We pride ourselves on our efficiency. While the exact timeframe depends on the complexity and volume of the matter, we typically prepare bills of costs within 7-14 days. For urgent matters, we can often accommodate faster turnarounds.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-3 text-[#0A0A0A]">Do you offer fixed fee arrangements?</h3>
              <p className="text-[#1D1D1F]/80">
                Yes, we offer fixed fee arrangements for many of our services including bill drafting, costs budgeting, and attendance at detailed assessment hearings. We'll provide a clear quote based on the specifics of your case after an initial consultation.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-3 text-[#0A0A0A]">Can you assist with costs budgeting for ongoing litigation?</h3>
              <p className="text-[#1D1D1F]/80">
                Absolutely. We regularly assist solicitors with preparing Precedent H cost budgets, attending costs and case management conferences (CCMCs), and advising on budget revisions throughout the litigation process.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="h-96 relative">
        <div className="absolute inset-0 bg-gray-300">
          <iframe 
            width="100%" 
            height="100%" 
            frameBorder="0" 
            title="Map" 
            marginHeight={0} 
            marginWidth={0} 
            scrolling="no" 
            src="https://maps.google.com/maps?width=100%&height=600&hl=en&q=86-90%20Paul%20Street,%20London%20EC2A%204NE+(Mackenzie%20Costs)&ie=UTF8&t=&z=15&iwloc=B&output=embed"
            style={{ filter: 'grayscale(1) contrast(1.2) opacity(0.8)' }}
          ></iframe>
        </div>
      </section>
    </div>
  );
}
