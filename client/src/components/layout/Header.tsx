import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useScrollEffect } from "@/hooks/useScrollEffect";

const Header = () => {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const scrolled = useScrollEffect(10);

  // Close mobile menu when location changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Case Law", path: "/cases" },
    { name: "Our Team", path: "/team" },
    { name: "Community", path: "/community" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 transition-all duration-300",
        scrolled ? "shadow-md" : ""
      )}
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <div className="h-12 w-12 bg-[#0A0A0A] flex items-center justify-center text-white rounded-md">
            <span className="font-display font-bold text-lg">MC</span>
          </div>
          <div className="ml-3">
            <h1 className="font-display font-bold text-xl tracking-tight">Mackenzie Costs</h1>
          </div>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={cn(
                "font-medium hover:text-[#007AFF] transition-colors duration-300",
                location === item.path ? "text-[#007AFF]" : "text-[#1D1D1F]"
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>
        
        <div className="flex items-center">
          <Link href="/contact">
            <Button className="hidden md:inline-flex bg-[#007AFF] hover:bg-[#2997FF] text-white transition-colors duration-300">
              Get in Touch
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white absolute w-full left-0 top-full border-b border-gray-200 shadow-lg animate-fade-in">
          <div className="px-4 py-3 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={cn(
                  "block py-2 font-medium hover:text-[#007AFF] transition-colors duration-300",
                  location === item.path ? "text-[#007AFF]" : "text-[#1D1D1F]"
                )}
              >
                {item.name}
              </Link>
            ))}
            <Link href="/contact">
              <Button className="w-full mt-3 bg-[#007AFF] hover:bg-[#2997FF] text-white transition-colors duration-300">
                Get in Touch
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
