import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Phone, MapPin, MessageCircle, Star, Clock } from 'lucide-react';
import { ThreeBackground } from '../ThreeBackground';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const HERO_BG = "https://images.unsplash.com/photo-1579165466741-7f35e4755660?w=1920&q=85&auto=format&fit=crop";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current || !textRef.current) return;

    gsap.to(bgRef.current, {
      y: 120,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      }
    });

    gsap.to(textRef.current, {
      y: 60,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      }
    });

    gsap.fromTo(
      textRef.current.children,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, stagger: 0.12, ease: "power3.out" }
    );
  }, { scope: containerRef });

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-[100dvh] flex items-center justify-center pt-20 overflow-hidden"
    >
      {/* Real photo background with parallax */}
      <div
        ref={bgRef}
        className="absolute inset-0 -top-10 -bottom-10 z-0"
        style={{
          backgroundImage: `url('${HERO_BG}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 30%',
        }}
      />

      {/* Gradient overlays for readability */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-orange-950/75 via-orange-900/60 to-amber-900/40" />
      <div className="absolute inset-0 z-[2] bg-gradient-to-t from-black/50 via-transparent to-black/20" />

      {/* Particle network on top */}
      <div className="absolute inset-0 z-[3]">
        <ThreeBackground />
      </div>

      {/* Content */}
      <div className="container relative z-[4] px-4 md:px-6 mx-auto">
        <div ref={textRef} className="max-w-4xl mx-auto text-center flex flex-col items-center">

          <div className="flex flex-wrap justify-center gap-3 mb-6">
            <Badge className="bg-white/15 backdrop-blur-md border border-white/30 text-white py-1.5 px-4 text-sm flex items-center gap-1.5 rounded-full shadow-lg">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              4.3 ★ Google Rated
            </Badge>
            <Badge className="bg-green-500/20 backdrop-blur-md border border-green-400/40 text-green-300 py-1.5 px-4 text-sm flex items-center gap-1.5 rounded-full shadow-lg">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse inline-block" />
              <Clock className="w-3.5 h-3.5" />
              Open 24 Hours
            </Badge>
          </div>

          <h1 className="font-poppins text-4xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1] mb-6 drop-shadow-2xl">
            Trusted Diagnostic Care{' '}
            <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-400">
              Available 24×7
            </span>
          </h1>

          <p className="text-lg md:text-xl text-white/85 font-medium mb-4 max-w-2xl drop-shadow-lg">
            Accurate Reports • Advanced Testing • Reliable Healthcare Services
          </p>

          <div className="flex flex-col items-center gap-1 mb-10">
            <h2 className="text-xl md:text-2xl font-bold text-white font-poppins drop-shadow-lg">
              Mithra Diagnostics 24 Hrs Service
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Button
              size="lg"
              className="rounded-full font-bold text-base h-14 px-8 bg-orange-500 hover:bg-orange-600 text-white shadow-2xl shadow-orange-500/40 hover:scale-105 transition-transform border-0"
              onClick={() => window.open('tel:+918247557270')}
              data-testid="btn-call-hero"
            >
              <Phone className="w-5 h-5 mr-2" />
              Call Now
            </Button>
            <Button
              size="lg"
              className="rounded-full font-bold text-base h-14 px-8 bg-white/15 backdrop-blur-md border border-white/40 text-white hover:bg-white/25 hover:scale-105 transition-transform"
              onClick={() => window.open('https://share.google/loOECprj7qsyLNvSY', '_blank')}
              data-testid="btn-directions-hero"
            >
              <MapPin className="w-5 h-5 mr-2 text-amber-300" />
              Get Directions
            </Button>
            <Button
              size="lg"
              className="rounded-full font-bold text-base h-14 px-8 bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-2xl shadow-[#25D366]/40 hover:scale-105 transition-transform border-0"
              onClick={() => window.open('https://wa.me/918247557270?text=Hello%2C%20I%20would%20like%20to%20know%20about%20diagnostic%20tests%20and%20reports.', '_blank')}
              data-testid="btn-whatsapp-hero"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              WhatsApp
            </Button>
          </div>

          {/* Scroll indicator */}
          <div className="mt-16 flex flex-col items-center gap-2 opacity-60">
            <span className="text-white/60 text-xs uppercase tracking-widest">Scroll to explore</span>
            <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center pt-2">
              <div className="w-1.5 h-1.5 rounded-full bg-white animate-bounce" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
