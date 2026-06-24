import { Phone, MessageCircle, MapPin, Calendar } from 'lucide-react';

export function EmergencyBar() {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div 
      className="fixed bottom-0 w-full z-40 bg-gray-900/95 backdrop-blur-md border-t border-gray-800 hidden md:block"
      data-testid="emergency-bar"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14 md:h-16 gap-2">
          <a
            href="tel:+918247557270"
            className="flex items-center justify-center gap-2 flex-1 text-gray-300 hover:text-primary transition-colors font-medium text-sm md:text-base py-2 hover:bg-white/5 rounded-lg"
          >
            <Phone className="w-4 h-4 md:w-5 md:h-5" />
            <span className="hidden sm:inline">Call</span>
          </a>
          
          <div className="w-px h-8 bg-gray-700 hidden sm:block"></div>

          <a
            href="https://wa.me/918247557270"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 flex-1 text-gray-300 hover:text-green-500 transition-colors font-medium text-sm md:text-base py-2 hover:bg-white/5 rounded-lg"
          >
            <MessageCircle className="w-4 h-4 md:w-5 md:h-5" />
            <span className="hidden sm:inline">WhatsApp</span>
          </a>

          <div className="w-px h-8 bg-gray-700 hidden sm:block"></div>

          <a
            href="https://share.google/loOECprj7qsyLNvSY"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 flex-1 text-gray-300 hover:text-blue-500 transition-colors font-medium text-sm md:text-base py-2 hover:bg-white/5 rounded-lg"
          >
            <MapPin className="w-4 h-4 md:w-5 md:h-5" />
            <span className="hidden sm:inline">Directions</span>
          </a>

          <div className="w-px h-8 bg-gray-700 hidden sm:block"></div>

          <button
            onClick={() => scrollTo('appointment')}
            className="flex items-center justify-center gap-2 flex-1 text-primary hover:text-orange-400 transition-colors font-medium text-sm md:text-base py-2 hover:bg-white/5 rounded-lg"
          >
            <Calendar className="w-4 h-4 md:w-5 md:h-5" />
            <span className="hidden sm:inline">Book Test</span>
          </button>
        </div>
      </div>
    </div>
  );
}
