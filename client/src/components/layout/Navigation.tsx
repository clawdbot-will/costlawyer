import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when changing routes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Case Law', path: '/cases' },
    { name: 'Our Team', path: '/team' },
    { name: 'Community', path: '/community' },
  ];

  const isLinkActive = (path: string) => {
    if (path === '/' && location === '/') return true;
    if (path !== '/' && location.startsWith(path)) return true;
    return false;
  };

  return (
    <header className={`sticky top-0 z-50 bg-white ${isScrolled ? 'border-b border-[#F5F5F7] shadow-sm bg-white/90 backdrop-blur-md' : 'bg-white'} transition-all duration-200`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <div className="w-12 h-12 bg-[#0A0A0A] rounded-md flex items-center justify-center">
                <span className="text-white font-bold text-xl">MC</span>
              </div>
              <div className="ml-3">
                <span className="text-lg font-semibold text-[#0A0A0A]">Mackenzie Costs</span>
              </div>
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-[#0A0A0A]" />
            ) : (
              <Menu className="h-6 w-6 text-[#0A0A0A]" />
            )}
          </button>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                href={link.path} 
                className={`text-[#1D1D1F] hover:text-[#007AFF] transition-colors duration-200 font-medium ${isLinkActive(link.path) ? 'text-[#007AFF]' : ''}`}
              >
                {link.name}
              </Link>
            ))}
            <Link href="/contact">
              <Button className="bg-[#007AFF] hover:bg-[#2997FF] text-white">
                Contact Us
              </Button>
            </Link>
          </nav>
        </div>
      </div>
      
      {/* Mobile Navigation Menu (hidden by default) */}
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} transition-all duration-200`}>
        <div className="px-4 py-3 space-y-4 bg-white border-t border-[#F5F5F7]/40">
          {navLinks.map((link) => (
            <Link 
              key={link.path} 
              href={link.path}
              className={`block text-[#1D1D1F] hover:text-[#007AFF] font-medium py-2 ${isLinkActive(link.path) ? 'text-[#007AFF]' : ''}`}
            >
              {link.name}
            </Link>
          ))}
          <Link 
            href="/contact"
            className="block px-5 py-2 bg-[#007AFF] text-white rounded-md text-center font-medium"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </header>
  );
}
