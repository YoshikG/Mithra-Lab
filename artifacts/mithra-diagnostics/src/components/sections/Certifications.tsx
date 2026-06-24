import { motion } from 'framer-motion';
import { ShieldCheck, Award, Star, Clock, FlaskConical, BadgeCheck, Link2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export function Certifications() {
  const badges = [
    { icon: ShieldCheck, title: "NABL Standards", sub: "National accreditation guidelines" },
    { icon: Award, title: "Quality Assured", sub: "ISO-compliant processes" },
    { icon: FlaskConical, title: "Advanced Equipment", sub: "Latest diagnostic technology" },
    { icon: Clock, title: "24×7 Service", sub: "Round-the-clock availability" },
    { icon: BadgeCheck, title: "Certified Lab", sub: "Licensed medical laboratory" },
    { icon: Star, title: "Expert Staff", sub: "Qualified professionals" }
  ];

  const partners = [
    {
      name: "Thyrocare",
      desc: "National reference lab for thyroid & specialized tests",
      initials: "TC",
      color: "bg-blue-100 text-blue-700"
    },
    {
      name: "Pathcare",
      desc: "Trusted diagnostics network for advanced pathology",
      initials: "PC",
      color: "bg-purple-100 text-purple-700"
    },
    {
      name: "Yodha Diagnostics",
      desc: "Regional diagnostic partner for specialized panels",
      initials: "YD",
      color: "bg-green-100 text-green-700"
    },
    {
      name: "Focus Diagnostics",
      desc: "Reference partner for infectious disease testing",
      initials: "FD",
      color: "bg-orange-100 text-orange-700"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-orange-50 to-white">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <h2 className="text-orange-600 font-semibold tracking-wider uppercase text-sm mb-2">Excellence</h2>
        <h3 className="font-poppins text-3xl font-bold text-foreground mb-12">
          Our Certifications & Standards
        </h3>

        <div className="flex flex-wrap justify-center gap-6 mb-20">
          {badges.map((badge, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="w-full sm:w-[calc(50%-12px)] md:w-[calc(33.33%-16px)] lg:w-[calc(16.66%-20px)] min-w-[160px]"
            >
              <Card className="h-full border-none shadow-sm hover:shadow-md transition-shadow bg-white/50 backdrop-blur-sm">
                <CardContent className="p-6 flex flex-col items-center justify-center text-center h-full">
                  <badge.icon className="w-10 h-10 text-primary mb-4" strokeWidth={1.5} />
                  <h4 className="font-bold text-sm mb-1">{badge.title}</h4>
                  <p className="text-xs text-gray-500">{badge.sub}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Lab Connections */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <Link2 className="w-5 h-5 text-orange-500" />
            <h3 className="font-poppins text-2xl font-bold text-foreground">Our Lab Connections</h3>
          </div>
          <p className="text-gray-500 text-sm mb-8">
            We are connected with leading national and regional reference laboratories for specialized and advanced testing.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {partners.map((partner, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="h-full border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 bg-white">
                  <CardContent className="p-5 flex flex-col items-center text-center">
                    <div className={`w-14 h-14 rounded-2xl ${partner.color} flex items-center justify-center font-bold text-lg mb-4`}>
                      {partner.initials}
                    </div>
                    <h4 className="font-bold text-base text-gray-900 mb-1">{partner.name}</h4>
                    <p className="text-xs text-gray-500 leading-relaxed">{partner.desc}</p>
                    <div className="mt-3 flex items-center gap-1 text-xs text-orange-500 font-semibold">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Reference Partner
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
