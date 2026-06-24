import { motion } from 'framer-motion';
import { MapPin, ExternalLink, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function MapSection() {
  const mapsUrl = "https://share.google/loOECprj7qsyLNvSY";
  const embedUrl = "https://maps.google.com/maps?q=Mithra+Diagnostics+24+Hrs+Service,+Chirala,+Andhra+Pradesh&output=embed";

  return (
    <section className="py-16 bg-orange-50/30">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          className="text-center max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-orange-600 font-semibold tracking-wider uppercase text-sm mb-2">Location</h2>
          <h3 className="font-poppins text-3xl md:text-4xl font-bold text-foreground mb-4">
            Find Us Easily
          </h3>
          <p className="text-muted-foreground text-lg flex items-start gap-2 justify-center">
            <MapPin className="w-5 h-5 text-primary mt-0.5 shrink-0" />
            Government Hospital Rd, Opp. to Apollo Hospital, Perala, Chirala, Andhra Pradesh 523155
          </p>
        </motion.div>

        <motion.div
          className="max-w-4xl mx-auto bg-white/70 backdrop-blur-md border border-orange-100 rounded-3xl overflow-hidden shadow-xl shadow-orange-500/5"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="relative h-80 md:h-96 w-full">
            <iframe
              src={embedUrl}
              className="w-full h-full border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Mithra Diagnostics Location"
              data-testid="map-embed"
            />
          </div>
          <div className="p-6 flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              size="lg"
              className="rounded-full font-semibold gap-2"
              onClick={() => window.open(mapsUrl, '_blank')}
              data-testid="btn-open-maps"
            >
              <ExternalLink className="w-4 h-4" />
              Open in Google Maps
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full font-semibold gap-2 border-2 border-primary text-primary hover:bg-orange-50"
              onClick={() => window.open("https://share.google/loOECprj7qsyLNvSY", '_blank')}
              data-testid="btn-get-directions"
            >
              <Navigation className="w-4 h-4" />
              Get Directions
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
