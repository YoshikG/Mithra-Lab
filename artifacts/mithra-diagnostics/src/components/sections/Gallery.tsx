import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn } from 'lucide-react';

const galleryItems = [
  {
    id: 1,
    title: "HbA1c Analyzer – LD-500",
    subtitle: "Aspen A1C HPLC Analyzer for diabetes testing",
    src: "/lab-hba1c.jpg",
    isOwn: true,
    span: "md:col-span-2 md:row-span-2",
  },
  {
    id: 2,
    title: "Diagnostic Control Panel",
    subtitle: "Automated sample analysis system",
    src: "/lab-equipment-1.jpg",
    isOwn: true,
    span: "",
  },
  {
    id: 3,
    title: "Mithra Diagnostics Centre",
    subtitle: "Government Hospital Rd, Chirala — Est. lab signage",
    src: "/lab-signboard.jpg",
    isOwn: true,
    span: "",
  },
  {
    id: 4,
    title: "Blood Sample Analysis",
    subtitle: "High-precision hematology testing",
    src: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=80&auto=format&fit=crop",
    isOwn: false,
    span: "",
  },
  {
    id: 5,
    title: "Laboratory Microscopy",
    subtitle: "Advanced microscopic examination of samples",
    src: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80&auto=format&fit=crop",
    isOwn: false,
    span: "",
  },
  {
    id: 6,
    title: "Clinical Lab Interior",
    subtitle: "State-of-the-art diagnostic facility",
    src: "https://images.unsplash.com/photo-1582560475093-ba66accbc424?w=800&q=80&auto=format&fit=crop",
    isOwn: false,
    span: "",
  },
  {
    id: 7,
    title: "Test Tube Sample Processing",
    subtitle: "Biochemistry panel preparation",
    src: "https://images.unsplash.com/photo-1614935151651-0bea6508db6b?w=800&q=80&auto=format&fit=crop",
    isOwn: false,
    span: "",
  },
  {
    id: 8,
    title: "ECG & Cardiac Monitoring",
    subtitle: "Digital electrocardiography services",
    src: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=800&q=80&auto=format&fit=crop",
    isOwn: false,
    span: "",
  },
];

export function Gallery() {
  const [selected, setSelected] = useState<typeof galleryItems[0] | null>(null);

  return (
    <section id="gallery" className="py-16 bg-gradient-to-b from-orange-50/30 to-white">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          className="text-center max-w-2xl mx-auto mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-orange-600 font-semibold tracking-wider uppercase text-sm mb-2">Our Facility</h2>
          <h3 className="font-poppins text-3xl md:text-4xl font-bold text-foreground mb-4">
            Real Lab — Real Equipment
          </h3>
          <p className="text-muted-foreground text-lg">
            A genuine look inside Mithra Diagnostics — our actual machines and facility.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {galleryItems.map((item, index) => (
            <motion.div
              key={item.id}
              className={`relative rounded-2xl overflow-hidden cursor-pointer group bg-orange-100 ${item.span}`}
              style={{ minHeight: item.span ? '300px' : '180px' }}
              initial={{ opacity: 0, scale: 0.93 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: index * 0.07 }}
              onClick={() => setSelected(item)}
              data-testid={`gallery-item-${item.id}`}
            >
              <img
                src={item.src}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              {/* Title on hover */}
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                <p className="text-white font-semibold text-sm font-poppins leading-tight">{item.title}</p>
                {item.isOwn && (
                  <span className="text-xs bg-orange-500/80 text-white rounded-full px-2 py-0.5 mt-1 inline-block">Our Lab</span>
                )}
              </div>
              {/* Zoom icon */}
              <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ZoomIn className="w-4 h-4 text-white" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            data-testid="gallery-lightbox"
          >
            <motion.div
              className="relative w-full max-w-3xl rounded-2xl overflow-hidden shadow-2xl bg-gray-900"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: "spring", bounce: 0.25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selected.src}
                alt={selected.title}
                className="w-full max-h-[70vh] object-contain"
              />
              <div className="p-4 bg-gray-900">
                <h3 className="font-poppins font-bold text-white text-lg">{selected.title}</h3>
                <p className="text-gray-400 text-sm mt-1">{selected.subtitle}</p>
                {selected.isOwn && (
                  <span className="text-xs bg-orange-500 text-white rounded-full px-3 py-1 mt-2 inline-block font-medium">
                    Actual Mithra Diagnostics Equipment
                  </span>
                )}
              </div>
              <button
                className="absolute top-3 right-3 bg-black/50 backdrop-blur rounded-full p-2 text-white hover:bg-black/70 transition-colors"
                onClick={() => setSelected(null)}
                data-testid="gallery-lightbox-close"
              >
                <X className="w-5 h-5" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
