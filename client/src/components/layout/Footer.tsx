import { Link } from "wouter";

const Footer = () => {
  return (
    <footer className="bg-[#1D1D1F] py-12 text-white">
      <div className="container mx-auto px-4">
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-display font-bold text-xl mb-4">Mackenzie Costs</h3>
            <p className="text-gray-300 mb-4">"Maximising your legal costs success, minimising your stress."</p>
            <div className="flex space-x-4">
              <a 
                href="https://twitter.com/mackenziecosts" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-300 hover:text-white transition-colors duration-300"
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a 
                href="https://linkedin.com/company/mackenziecosts" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-300 hover:text-white transition-colors duration-300"
              >
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a 
                href="https://facebook.com/mackenziecosts" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-300 hover:text-white transition-colors duration-300"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white transition-colors duration-300">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-300 hover:text-white transition-colors duration-300">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/cases" className="text-gray-300 hover:text-white transition-colors duration-300">
                  Case Law
                </Link>
              </li>
              <li>
                <Link href="/community" className="text-gray-300 hover:text-white transition-colors duration-300">
                  Community
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white transition-colors duration-300">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/services/drafting-bills-of-costs" className="text-gray-300 hover:text-white transition-colors duration-300">
                  Drafting & Bills of Costs
                </Link>
              </li>
              <li>
                <Link href="/services/negotiations-analysis" className="text-gray-300 hover:text-white transition-colors duration-300">
                  Negotiations & Analysis
                </Link>
              </li>
              <li>
                <Link href="/services/cost-budgeting" className="text-gray-300 hover:text-white transition-colors duration-300">
                  Cost Budgeting
                </Link>
              </li>
              <li>
                <Link href="/services/detailed-assessment" className="text-gray-300 hover:text-white transition-colors duration-300">
                  Detailed Assessment
                </Link>
              </li>
              <li>
                <Link href="/services/points-of-dispute-reply" className="text-gray-300 hover:text-white transition-colors duration-300">
                  Points of Dispute/Reply
                </Link>
              </li>
              <li>
                <Link href="/services/costs-consultation" className="text-gray-300 hover:text-white transition-colors duration-300">
                  Costs Consultation
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <i className="fas fa-envelope mt-1 mr-3 text-[#007AFF]"></i>
                <span>william@costlawyer.co.uk</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-phone mt-1 mr-3 text-[#007AFF]"></i>
                <span>+44 20 4576 8203</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-map-marker-alt mt-1 mr-3 text-[#007AFF]"></i>
                <span>86-90 Paul Street, London EC2A 4NE</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Mackenzie Costs. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-300">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-300">
              Terms of Service
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-300">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
