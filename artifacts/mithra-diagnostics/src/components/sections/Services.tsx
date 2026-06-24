import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import {
  Activity, Droplet, Thermometer,
  HeartPulse, Pill, FlaskConical,
  Sun, Dna, FileSearch, Stethoscope,
  ShieldPlus, Microscope, Baby, Scissors, Users, ScanLine, Image, Flame
} from 'lucide-react';

const SERVICES_BG = "https://images.unsplash.com/photo-1582560475093-ba66accbc424?w=1600&q=80&auto=format&fit=crop";

export function Services() {
  const services = [
    { icon: <Droplet className="w-6 h-6" />, name: "Blood Tests", desc: "Comprehensive hematology panels" },
    { icon: <Activity className="w-6 h-6" />, name: "Diabetes Profile", desc: "HbA1c, Fasting & PP Sugars" },
    { icon: <Thermometer className="w-6 h-6" />, name: "Thyroid Profile", desc: "T3, T4, TSH evaluations" },
    { icon: <FlaskConical className="w-6 h-6" />, name: "Liver Function", desc: "Complete LFT assessments" },
    { icon: <Pill className="w-6 h-6" />, name: "Kidney Function", desc: "Creatinine, Urea & more" },
    { icon: <HeartPulse className="w-6 h-6" />, name: "Lipid Profile", desc: "Cholesterol & Triglycerides" },
    { icon: <Sun className="w-6 h-6" />, name: "Vitamin D Test", desc: "Bone health monitoring" },
    { icon: <Dna className="w-6 h-6" />, name: "CBC Test", desc: "Complete Blood Count" },
    { icon: <FileSearch className="w-6 h-6" />, name: "Urine Analysis", desc: "Detailed routine examinations" },
    { icon: <Stethoscope className="w-6 h-6" />, name: "ECG Services", desc: "Heart rhythm monitoring" },
    { icon: <ShieldPlus className="w-6 h-6" />, name: "Health Packages", desc: "Full body checkups" },
    { icon: <Microscope className="w-6 h-6" />, name: "Cancer Screening", desc: "Female & Male cancer markers" },
    { icon: <Baby className="w-6 h-6" />, name: "Fertility Profile", desc: "FSH, LH, AMH, Prolactin & more" },
    { icon: <Scissors className="w-6 h-6" />, name: "Hairfall – Women", desc: "51-parameter root cause analysis" },
    { icon: <Users className="w-6 h-6" />, name: "Hairfall – Men", desc: "47-parameter advanced profile" },
    { icon: <ScanLine className="w-6 h-6" />, name: "OPG X-Ray", desc: "Dental & jaw panoramic imaging" },
    { icon: <Image className="w-6 h-6" />, name: "X-Ray Services", desc: "Digital chest, bone & joint X-rays" },
    { icon: <Flame className="w-6 h-6" />, name: "Fever Profile", desc: "Malaria, Typhoid, Dengue & CBC" },
  ];

  return (
    <section id="services" className="py-16 relative overflow-hidden">
      {/* Blurred lab background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url('${SERVICES_BG}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(2px)',
          transform: 'scale(1.05)',
        }}
      />
      <div className="absolute inset-0 z-[1] bg-orange-50/90" />

      <div className="container mx-auto px-4 md:px-6 relative z-[2]">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-orange-600 font-semibold tracking-wider uppercase text-sm mb-2">Our Services</h2>
              <h3 className="font-poppins text-3xl md:text-4xl font-bold text-foreground mb-4">
                Comprehensive Diagnostic Solutions
              </h3>
              <p className="text-muted-foreground text-lg">
                We offer a wide range of pathological tests and diagnostic services using advanced equipment.
              </p>
            </motion.div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {services.map((service, index) => (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, scale: 0.93 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <Card className="h-full bg-white/80 backdrop-blur-md hover:border-primary/50 hover:shadow-md transition-all cursor-default group border-orange-100/60">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-orange-100 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 shrink-0">
                    {service.icon}
                  </div>
                  <div>
                    <h4 className="font-poppins font-semibold text-foreground mb-1">
                      {service.name}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {service.desc}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
