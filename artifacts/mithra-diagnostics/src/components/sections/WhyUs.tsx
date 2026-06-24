import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

function Counter({ end, suffix = "", label }: { end: number, suffix?: string, label: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000;
      const increment = end / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.ceil(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isInView, end]);

  return (
    <div ref={ref} className="text-center p-6 bg-white/50 backdrop-blur-md rounded-2xl border border-white/20 shadow-sm">
      <div className="font-poppins text-4xl md:text-5xl font-bold text-primary mb-2">
        {count}{suffix}
      </div>
      <div className="font-medium text-foreground">{label}</div>
    </div>
  );
}

export function WhyUs() {
  const features = [
    "Accurate Reports",
    "Affordable Prices",
    "Latest Equipment",
    "Qualified Technicians",
    "Same-Day Reports",
    "24 Hours Service"
  ];

  return (
    <section id="why-us" className="py-16 bg-gradient-to-br from-orange-100/50 to-orange-50/20 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          <div>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-orange-600 font-semibold tracking-wider uppercase text-sm mb-2">Why Choose Us</h2>
              <h3 className="font-poppins text-3xl md:text-4xl font-bold text-foreground mb-6">
                Your Trusted Health Partner in Chirala
              </h3>
              <p className="text-muted-foreground text-lg mb-8">
                With a commitment to excellence and a patient-first approach, Mithra Diagnostics ensures you receive the highest standard of care at any hour of the day.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {features.map((feature, idx) => (
                  <motion.div 
                    key={feature}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm border border-orange-100"
                  >
                    <CheckCircle2 className="text-primary w-5 h-5 shrink-0" />
                    <span className="font-medium text-foreground">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Counter end={10000} suffix="+" label="Reports Generated" />
            <Counter end={5000} suffix="+" label="Happy Patients" />
            <Counter end={15} suffix="+" label="Years Experience" />
            <Counter end={4.3} suffix="★" label="Google Rating" />
          </div>

        </div>
      </div>
    </section>
  );
}
