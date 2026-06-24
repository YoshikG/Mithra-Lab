import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const reviews = [
  { id: 1, name: "Koteswara Rao Katta", rating: 5, comment: "Superb quality report.", initial: "K" },
  { id: 2, name: "Venkatesh Vemula", rating: 4, comment: "Good, but premises are small.", initial: "V" },
  { id: 3, name: "Ramyakrishna Malisetty", rating: 4, comment: "Service is good and staff are supportive.", initial: "R" },
  { id: 4, name: "Suresh Kumar", rating: 5, comment: "Very professional and quick reports.", initial: "S" },
  { id: 5, name: "Priya Reddy", rating: 5, comment: "Excellent service, results on time!", initial: "P" },
  { id: 6, name: "Ravi Shankar", rating: 4, comment: "Good diagnostic center in Chirala.", initial: "R" },
];

const REVIEWS_BG = "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1600&q=80&auto=format&fit=crop";

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i <= count ? 'fill-amber-400 text-amber-400' : 'text-gray-200 fill-gray-200'}`}
        />
      ))}
    </div>
  );
}

export function Reviews() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const itemsPerPage = typeof window !== 'undefined' && window.innerWidth >= 1024 ? 3 : typeof window !== 'undefined' && window.innerWidth >= 768 ? 2 : 1;

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % (reviews.length - itemsPerPage + 1));
    }, 4000);
    return () => clearInterval(timer);
  }, [isHovered, itemsPerPage]);

  const next = () => setCurrentIndex((prev) => Math.min(prev + 1, reviews.length - itemsPerPage));
  const prev = () => setCurrentIndex((prev) => Math.max(prev - 1, 0));

  const visibleReviews = reviews.slice(currentIndex, currentIndex + itemsPerPage);

  return (
    <section id="reviews" className="py-16 relative overflow-hidden">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url('${REVIEWS_BG}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="absolute inset-0 z-[1] bg-gradient-to-br from-orange-900/80 via-orange-800/75 to-amber-800/80" />

      <div className="container mx-auto px-4 md:px-6 relative z-[2]">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-amber-300 font-semibold tracking-wider uppercase text-sm mb-2">Patient Reviews</h2>
          <h3 className="font-poppins text-3xl md:text-4xl font-bold text-white mb-4">
            What Patients Say
          </h3>
          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="text-5xl font-poppins font-bold text-amber-300">4.3</div>
            <div className="flex flex-col items-start">
              <StarRating count={4} />
              <span className="text-sm text-white/70 mt-1">out of 5 — Google Reviews</span>
            </div>
          </div>
        </div>

        <div 
          className="relative max-w-6xl mx-auto"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="flex gap-6 overflow-hidden py-4">
            <AnimatePresence mode="popLayout">
              {visibleReviews.map((review) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] shrink-0"
                >
                  <Card className="h-full bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300">
                    <CardContent className="p-6">
                      <Quote className="w-8 h-8 text-amber-300/50 mb-4" />
                      <StarRating count={review.rating} />
                      <p className="mt-4 text-white font-medium leading-relaxed h-20 overflow-hidden">
                        "{review.comment}"
                      </p>
                      <div className="flex items-center gap-3 mt-6">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-bold font-poppins text-sm shrink-0">
                          {review.initial}
                        </div>
                        <div>
                          <p className="font-semibold text-white text-sm">{review.name}</p>
                          <p className="text-xs text-white/60">Google Review</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="flex justify-center gap-4 mt-8">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={prev} 
              disabled={currentIndex === 0}
              className="bg-white/10 text-white border-white/20 hover:bg-white/20 hover:text-white disabled:opacity-50"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <div className="flex items-center gap-2">
              {Array.from({ length: reviews.length - itemsPerPage + 1 }).map((_, idx) => (
                <div 
                  key={idx} 
                  className={`w-2 h-2 rounded-full transition-all ${idx === currentIndex ? 'bg-amber-400 w-6' : 'bg-white/30'}`}
                />
              ))}
            </div>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={next} 
              disabled={currentIndex >= reviews.length - itemsPerPage}
              className="bg-white/10 text-white border-white/20 hover:bg-white/20 hover:text-white disabled:opacity-50"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
