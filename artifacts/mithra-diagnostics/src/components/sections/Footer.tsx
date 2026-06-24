import { Cross, Phone, MapPin, Clock } from 'lucide-react';

export function Footer() {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-950 text-white py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-primary p-2.5 rounded-xl">
                <Cross className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-poppins font-bold text-xl leading-tight">Mithra Diagnostics</h3>
                <span className="text-xs font-semibold text-orange-400 uppercase tracking-wider">24 Hrs Service</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm mt-3">Trusted Diagnostic Care Since Always</p>
            <div className="flex items-center gap-2 mt-3">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-green-400 font-semibold text-sm">Open 24 Hours</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-poppins font-bold text-base mb-5 text-orange-400">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { name: 'Home', id: 'home' },
                { name: 'About', id: 'about' },
                { name: 'Services', id: 'services' },
                { name: 'Why Choose Us', id: 'why-us' },
                { name: 'Gallery', id: 'gallery' },
                { name: 'Reviews', id: 'reviews' },
                { name: 'Contact', id: 'contact' },
              ].map(link => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollTo(link.id)}
                    className="text-gray-400 hover:text-orange-400 transition-colors text-sm"
                    data-testid={`footer-link-${link.id}`}
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-poppins font-bold text-base mb-5 text-orange-400">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-orange-400 mt-0.5 shrink-0" />
                <span className="text-gray-400 text-sm">Government Hospital Rd, Opp. to Apollo Hospital, Perala, Chirala, Andhra Pradesh 523155</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-orange-400 shrink-0" />
                <a href="tel:+918247557270" className="text-gray-400 hover:text-orange-400 transition-colors text-sm">
                  +91 82475 57270
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-orange-400 shrink-0" />
                <span className="text-gray-400 text-sm">Monday – Sunday, 24 Hours</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            © 2026 Mithra Diagnostics 24 Hrs Service. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
