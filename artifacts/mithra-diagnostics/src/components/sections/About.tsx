import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Target, Users, Zap, Clock } from 'lucide-react';

const ABOUT_BG = "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=1600&q=80&auto=format&fit=crop";

export function About() {
  const containerRef = useRef<HTMLDivElement>(null);

  const cards = [
    {
      icon: <Target className="w-8 h-8 text-primary" />,
      title: "Accurate Diagnostics",
      description: "Advanced testing with reliable reports you can trust for your health journey."
    },
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      title: "Experienced Professionals",
      description: "Skilled technicians and doctors committed to maintaining the highest quality standards."
    },
    {
      icon: <Zap className="w-8 h-8 text-primary" />,
      title: "Fast Report Delivery",
      description: "Quick turnaround times for patient convenience without compromising accuracy."
    },
    {
      icon: <Clock className="w-8 h-8 text-primary" />,
      title: "24×7 Availability",
      description: "Round-the-clock healthcare support whenever you need emergency testing."
    }
  ];

  return (
    <section id="about" className="py-16 relative overflow-hidden" ref={containerRef}>
      {/* Subtle real photo background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url('${ABOUT_BG}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="absolute inset-0 z-[1] bg-white/92" />

      <div className="container mx-auto px-4 md:px-6 relative z-[2]">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-orange-600 font-semibold tracking-wider uppercase text-sm mb-2">About Us</h2>
            <h3 className="font-poppins text-3xl md:text-4xl font-bold text-foreground mb-4">
              Dedicated to Precision & Care
            </h3>
            <p className="text-muted-foreground text-lg">
              At Mithra Diagnostics, we combine state-of-the-art technology with compassionate care to deliver accurate results when you need them most.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full bg-white/80 border-orange-100/60 backdrop-blur-md hover:shadow-xl hover:shadow-orange-500/10 transition-all duration-300 group overflow-hidden">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-2xl bg-orange-50 shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:[&>*]:text-white transition-all duration-300">
                    {card.icon}
                  </div>
                  <h4 className="font-poppins font-bold text-xl mb-3 text-foreground">
                    {card.title}
                  </h4>
                  <p className="text-muted-foreground leading-relaxed">
                    {card.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
