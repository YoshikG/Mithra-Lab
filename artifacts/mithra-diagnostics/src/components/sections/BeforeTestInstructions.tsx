import { motion } from 'framer-motion';
import { Droplet, Activity, FlaskConical, TestTube2, Info, AlertTriangle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export function BeforeTestInstructions() {
  const instructions: { icon: React.ElementType; title: string; text: string; highlight?: string }[] = [
    {
      icon: Droplet,
      title: "Blood Test",
      text: "Fast for 8–10 hours. Drink only water."
    },
    {
      icon: Activity,
      title: "Diabetes Test",
      text: "Morning sample preferred. 8-hour fast.",
      highlight: "Take your regular diabetes tablet before the test (2nd dose as usual)."
    },
    {
      icon: TestTube2,
      title: "Thyroid Test",
      text: "Morning sample preferred.",
      highlight: "Take your thyroid medicines as usual before the test."
    },
    {
      icon: FlaskConical,
      title: "Lipid Profile",
      text: "12-hour fasting recommended. No fatty foods.",
      highlight: "Do NOT consume alcohol at least 24 hours before the test."
    },
    {
      icon: Info,
      title: "Kidney Function",
      text: "Stay well hydrated. Drink water normally."
    },
    {
      icon: Droplet,
      title: "Vitamin D Test",
      text: "No special preparation needed."
    }
  ];

  const scrollServices = () => {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12">
          <h2 className="text-orange-600 font-semibold tracking-wider uppercase text-sm mb-2">Preparation</h2>
          <h3 className="font-poppins text-3xl font-bold text-foreground">
            Before Your Test — Important Instructions
          </h3>
        </div>

        <div className="flex overflow-x-auto pb-8 -mx-4 px-4 snap-x snap-mandatory hide-scrollbar gap-6">
          {instructions.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="snap-start shrink-0 w-[280px]"
            >
              <Card className="h-full bg-gradient-to-br from-orange-50 to-amber-50/50 border-orange-100 hover:shadow-md transition-shadow">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 mb-4">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-lg mb-2">{item.title}</h4>
                  <p className="text-gray-600 text-sm mb-3">{item.text}</p>
                  {item.highlight && (
                    <div className="flex items-start gap-2 bg-amber-50 border border-amber-300 rounded-lg px-3 py-2 mb-4">
                      <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <p className="text-amber-800 text-xs font-semibold leading-snug">{item.highlight}</p>
                    </div>
                  )}
                  <div className="flex-1" />
                  <button 
                    onClick={scrollServices}
                    className="text-primary font-semibold text-sm hover:underline text-left"
                  >
                    Learn More &rarr;
                  </button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
