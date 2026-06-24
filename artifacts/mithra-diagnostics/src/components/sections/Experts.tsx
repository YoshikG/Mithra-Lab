import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';

export function Experts() {
  const experts = [
    {
      name: "Dr. M. Suresh",
      role: "Chief Pathologist",
      exp: "15+ years",
      qual: "MBBS, MD Pathology",
      desc: "Leading our diagnostics with precision and expertise",
      initials: "MS"
    },
    {
      name: "B. Ramesh",
      role: "Senior Lab Technician",
      exp: "10+ years",
      qual: "B.Sc MLT",
      desc: "Expert in hematology and biochemistry testing",
      initials: "BR"
    },
    {
      name: "K. Priya",
      role: "Sample Collection Specialist",
      exp: "8+ years",
      qual: "DMLT",
      desc: "Ensuring painless and accurate sample collection",
      initials: "KP"
    },
    {
      name: "Dr. A. Kavitha",
      role: "Medical Consultant",
      exp: "12+ years",
      qual: "MBBS, MD",
      desc: "Providing expert medical consultation and guidance",
      initials: "AK"
    }
  ];

  return (
    <section id="experts" className="py-16 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-orange-600 font-semibold tracking-wider uppercase text-sm mb-2">Our Team</h2>
          <h3 className="font-poppins text-3xl md:text-4xl font-bold text-foreground">
            Meet Our Experts
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {experts.map((expert, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ rotateX: 5, rotateY: 5, scale: 1.02 }}
              style={{ perspective: 1000 }}
            >
              <Card className="h-full border-orange-100 hover:shadow-lg transition-all overflow-hidden bg-gradient-to-b from-white to-orange-50/30">
                <CardContent className="p-6 text-center">
                  <div className="w-24 h-24 mx-auto bg-gradient-to-br from-orange-400 to-primary rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4 shadow-inner">
                    {expert.initials}
                  </div>
                  <h4 className="font-bold text-xl mb-1">{expert.name}</h4>
                  <p className="text-primary font-medium text-sm mb-3">{expert.role}</p>
                  
                  <div className="space-y-1 mb-4 text-sm text-gray-600">
                    <p><span className="font-medium text-gray-900">Experience:</span> {expert.exp}</p>
                    <p><span className="font-medium text-gray-900">Qualification:</span> {expert.qual}</p>
                  </div>
                  
                  <p className="text-sm text-gray-500 italic">"{expert.desc}"</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
