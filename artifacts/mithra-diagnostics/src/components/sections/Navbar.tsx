import { useState, useEffect } from 'react';
import { Menu, X, Cross, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Services', id: 'services' },
    { name: 'Packages', id: 'packages' },
    { name: 'Gallery', id: 'gallery' },
    { name: 'Reviews', id: 'reviews' },
    { name: 'FAQ', id: 'faq' },
    { name: 'Contact', id: 'contact' },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/80 backdrop-blur-md shadow-sm border-b border-white/20'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div 
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => scrollTo('home')}
            data-testid="nav-logo"
          >
            <div className="bg-primary p-2 rounded-xl text-white">
              <Cross size={24} />
            </div>
            <div className="flex flex-col">
              <span className="font-poppins font-bold text-xl text-foreground leading-tight tracking-tight">
                Mithra Diagnostics
              </span>
              <span className="text-[11px] font-bold text-orange-500 leading-tight">
                మిత్ర డయాగ్నోస్టిక్స్
              </span>
              <span className="text-[10px] font-semibold text-primary uppercase tracking-wider">
                24 Hrs Service
              </span>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollTo(link.id)}
                className="px-4 py-2 rounded-full text-sm font-medium text-muted-foreground hover:text-primary hover:bg-orange-50 transition-colors"
                data-testid={`nav-link-${link.id}`}
              >
                {link.name}
              </button>
            ))}
            <div className="flex items-center gap-2 ml-4">
              <Button 
                variant="outline"
                className="font-semibold rounded-full border-primary text-primary hover:bg-primary/10"
                onClick={() => window.open('tel:+918247557270')}
                data-testid="nav-call-btn"
              >
                <Phone className="w-4 h-4 mr-2" />
                Call Now
              </Button>
              <Button 
                className="font-semibold rounded-full shadow-md shadow-orange-500/20"
                onClick={() => scrollTo('appointment')}
                data-testid="nav-cta"
              >
                Book Test
              </Button>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-2 text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            data-testid="nav-mobile-toggle"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl border-b shadow-lg py-4 px-4 flex flex-col gap-2 animate-in slide-in-from-top-4">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => scrollTo(link.id)}
              className="w-full text-left px-4 py-3 rounded-lg text-base font-medium text-foreground hover:bg-orange-50 hover:text-primary transition-colors"
            >
              {link.name}
            </button>
          ))}
          <div className="flex flex-col gap-2 mt-2">
            <Button 
              variant="outline"
              className="w-full font-semibold rounded-full border-primary text-primary"
              onClick={() => window.open('tel:+918247557270')}
            >
              <Phone className="w-4 h-4 mr-2" />
              Call Now
            </Button>
            <Button 
              className="w-full font-semibold rounded-full"
              onClick={() => scrollTo('appointment')}
            >
              Book Test Now
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
