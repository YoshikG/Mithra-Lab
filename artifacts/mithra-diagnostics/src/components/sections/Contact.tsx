import { motion } from 'framer-motion';
import { MapPin, Phone, MessageCircle, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CONTACT_BG = "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=1600&q=80&auto=format&fit=crop";

export function Contact() {
  return (
    <section id="contact" className="py-16 relative overflow-hidden">
      {/* Doctor + patient background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url('${CONTACT_BG}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
        }}
      />
      <div className="absolute inset-0 z-[1] bg-gradient-to-br from-white/95 via-orange-50/90 to-amber-50/95" />

      <div className="container mx-auto px-4 md:px-6 relative z-[2]">
        <motion.div
          className="text-center max-w-2xl mx-auto mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-orange-600 font-semibold tracking-wider uppercase text-sm mb-2">Contact</h2>
          <h3 className="font-poppins text-3xl md:text-4xl font-bold text-foreground mb-4">
            Get in Touch
          </h3>
          <p className="text-muted-foreground text-lg">
            We're available around the clock. Reach us anytime.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            className="bg-white/80 backdrop-blur-md border border-orange-100 rounded-2xl p-8 shadow-sm"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-start gap-4">
              <div className="p-3 bg-orange-100 rounded-xl shadow-sm shrink-0">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h4 className="font-poppins font-bold text-lg text-foreground mb-2">Address</h4>
                <p className="text-muted-foreground leading-relaxed">
                  Government Hospital Rd,<br />
                  Opp. to Apollo Hospital,<br />
                  Perala, Chirala,<br />
                  Andhra Pradesh 523155
                </p>
                <p className="text-xs text-muted-foreground mt-2">Google Plus Code: R9G5+9P Chirala</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="bg-white/80 backdrop-blur-md border border-orange-100 rounded-2xl p-8 shadow-sm"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-start gap-4">
              <div className="p-3 bg-orange-100 rounded-xl shadow-sm shrink-0">
                <Phone className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h4 className="font-poppins font-bold text-lg text-foreground mb-2">Phone</h4>
                <p className="text-foreground font-semibold text-xl">+91 82475 57270</p>
                <p className="text-muted-foreground text-sm mt-1">Available 24 hours, 7 days a week</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="md:col-span-2 bg-gradient-to-br from-orange-500 to-amber-400 rounded-2xl p-8 text-white shadow-xl shadow-orange-500/20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="font-poppins font-bold text-xl mb-6">Reach Us Now</h4>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                size="lg"
                className="rounded-full bg-white text-primary hover:bg-orange-50 font-bold gap-2 shadow-lg"
                onClick={() => window.open('tel:+918247557270')}
                data-testid="btn-contact-call"
              >
                <Phone className="w-4 h-4" />
                Call Now
              </Button>
              <Button
                size="lg"
                className="rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold gap-2 shadow-lg"
                onClick={() => window.open('https://wa.me/918247557270?text=Hello%2C%20I%20would%20like%20to%20know%20about%20diagnostic%20tests%20and%20reports.', '_blank')}
                data-testid="btn-contact-whatsapp"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </Button>
              <Button
                size="lg"
                className="rounded-full bg-white/20 hover:bg-white/30 text-white border border-white/30 font-bold gap-2 backdrop-blur"
                onClick={() => window.open('https://share.google/loOECprj7qsyLNvSY', '_blank')}
                data-testid="btn-contact-directions"
              >
                <Navigation className="w-4 h-4" />
                Get Directions
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
