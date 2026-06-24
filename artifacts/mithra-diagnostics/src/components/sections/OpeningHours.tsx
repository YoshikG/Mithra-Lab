import { motion } from 'framer-motion';
import { Clock, AlertCircle } from 'lucide-react';

export function OpeningHours() {
  return (
    <section className="py-16 bg-gradient-to-br from-orange-600 to-amber-500 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-40 h-40 rounded-full border-4 border-white" />
        <div className="absolute top-20 left-20 w-20 h-20 rounded-full border-2 border-white" />
        <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full border-4 border-white" />
        <div className="absolute bottom-20 right-20 w-32 h-32 rounded-full border-2 border-white" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          className="max-w-2xl mx-auto text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Animated clock icon */}
          <motion.div
            className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-white/20 backdrop-blur mb-8"
            animate={{ boxShadow: ['0 0 0 0 rgba(255,255,255,0.3)', '0 0 0 20px rgba(255,255,255,0)', '0 0 0 0 rgba(255,255,255,0)'] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Clock className="w-12 h-12 text-white" />
          </motion.div>

          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-10 shadow-2xl">
            <h3 className="font-poppins text-sm font-semibold text-orange-100 tracking-widest uppercase mb-4">
              Working Hours
            </h3>
            <h2 className="font-poppins text-4xl md:text-5xl font-extrabold text-white mb-2">
              MONDAY – SUNDAY
            </h2>
            <div className="flex items-center justify-center gap-3 my-6">
              <div className="h-px bg-white/30 w-16" />
              <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
              <div className="h-px bg-white/30 w-16" />
            </div>
            <p className="font-poppins text-5xl md:text-6xl font-black text-white mb-6 tracking-tight">
              OPEN 24 HOURS
            </p>
            <div className="flex items-center justify-center gap-2 bg-white/10 rounded-full py-3 px-6 inline-flex">
              <AlertCircle className="w-5 h-5 text-orange-200" />
              <span className="font-semibold text-orange-100 text-lg">Emergency Testing Available</span>
            </div>
            <p className="text-white/70 mt-6 text-sm">
              No appointment required. Walk-ins welcome at any hour.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
