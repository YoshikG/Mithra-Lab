import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Home, MapPin, Loader2, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

type LocationState = 'idle' | 'fetching' | 'granted' | 'denied';

const timeSlots = (() => {
  const slots: { value: string; label: string }[] = [];
  for (let h = 6; h <= 22; h++) {
    for (const m of [0, 30]) {
      if (h === 22 && m === 30) break;
      const hour12 = h % 12 === 0 ? 12 : h % 12;
      const ampm = h < 12 ? 'AM' : 'PM';
      const min = m === 0 ? '00' : '30';
      slots.push({ value: `${String(h).padStart(2, '0')}:${min}`, label: `${hour12}:${min} ${ampm}` });
    }
  }
  return slots;
})();

export function HomeSampleCollection() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [locationState, setLocationState] = useState<LocationState>('idle');
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);

  const [formData, setFormData] = useState(() => {
    try {
      const saved = localStorage.getItem('mithra_user');
      const user = saved ? JSON.parse(saved) : null;
      return {
        name: user?.name ?? '',
        phone: user?.phone ?? '',
        address: user?.address ?? '',
        date: '',
        timeSlot: ''
      };
    } catch {
      return { name: '', phone: '', address: '', date: '', timeSlot: '' };
    }
  });

  const requestLocation = () => {
    if (!navigator.geolocation) {
      setLocationState('denied');
      return;
    }
    setLocationState('fetching');
    navigator.geolocation.getCurrentPosition(
      pos => {
        setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setLocationState('granted');
      },
      () => setLocationState('denied'),
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const mapsLink = coords
      ? `https://www.google.com/maps?q=${coords.lat},${coords.lng}`
      : null;

    // Save to localStorage
    const existing = JSON.parse(localStorage.getItem('mithra_home_collection') || '[]');
    localStorage.setItem(
      'mithra_home_collection',
      JSON.stringify([...existing, { ...formData, mapsLink, id: Date.now() }])
    );

    // Send WhatsApp notification to Mithra with all details + location
    const msg = [
      `🏠 *Home Sample Collection Request*`,
      `👤 Name: ${formData.name}`,
      `📞 Phone: ${formData.phone}`,
      `🏡 Address: ${formData.address}`,
      `📅 Date: ${formData.date}`,
      `🕐 Time: ${formData.timeSlot}`,
      mapsLink ? `📍 Location: ${mapsLink}` : `📍 Location: Not shared`,
    ].join('\n');

    window.open(`https://wa.me/918247557270?text=${encodeURIComponent(msg)}`, '_blank');

    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setFormData(prev => ({ ...prev, date: '', timeSlot: '' }));
      setCoords(null);
      setLocationState('idle');
    }, 4000);
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <section className="py-16 bg-gradient-to-br from-orange-50 to-orange-100/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center text-primary mb-6">
              <Home className="w-8 h-8" />
            </div>
            <h2 className="text-orange-600 font-semibold tracking-wider uppercase text-sm mb-1">Doorstep Service</h2>
            <p className="text-orange-500 text-xs font-bold mb-2">మీ ఇంటికే సేవ</p>
            <h3 className="font-poppins text-3xl md:text-4xl font-bold text-foreground mb-1">
              Home Sample Collection
            </h3>
            <p className="text-orange-700/80 text-lg font-bold mb-6">ఇంటి వద్ద శాంపిల్ సేకరణ</p>
            <p className="text-muted-foreground text-lg mb-6">
              Can't visit the lab? No problem. Our certified phlebotomists will collect samples from the comfort of your home.
            </p>

            {/* Real home collection photo */}
            <div className="rounded-2xl overflow-hidden shadow-lg mb-7 aspect-[16/9]">
              <img
                src="https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?w=900&q=80&auto=format&fit=crop"
                alt="Phlebotomist collecting blood sample at patient's home"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>

            <div className="space-y-4">
              {[
                "Blood Collection At Home",
                "Elderly & Bedridden Care",
                "Fast Response Time",
                "Certified Phlebotomists",
                "Safe & Hygienic Equipment",
                "Available 24 Hours"
              ].map((benefit, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                  <span className="font-medium text-gray-800">{benefit}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/80 backdrop-blur-xl border border-white/40 rounded-3xl shadow-xl p-6 md:p-8 relative"
          >
            <AnimatePresence>
              {isSuccess && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="absolute inset-0 z-10 bg-white rounded-3xl flex flex-col items-center justify-center p-8 text-center"
                >
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-8 h-8 text-green-600" />
                  </div>
                  <h4 className="text-2xl font-bold mb-2">Request Sent!</h4>
                  <p className="text-gray-600">Our team will contact you to confirm the collection time.</p>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Name <span className="text-orange-500 font-bold text-xs ml-1">/ పేరు</span></Label>
                  <Input required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Phone <span className="text-orange-500 font-bold text-xs ml-1">/ ఫోన్ నంబర్</span></Label>
                  <Input type="tel" required value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Address <span className="text-orange-500 font-bold text-xs ml-1">/ చిరునామా</span></Label>
                <Textarea required value={formData.address} onChange={e => setFormData({ ...formData, address: e.target.value })} />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Preferred Date <span className="text-orange-500 font-bold text-xs ml-1">/ తేదీ</span></Label>
                  <Input type="date" min={today} required value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Preferred Time <span className="text-orange-500 font-bold text-xs ml-1">/ సమయం</span></Label>
                  <select
                    value={formData.timeSlot}
                    onChange={e => setFormData({ ...formData, timeSlot: e.target.value })}
                    required
                    className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    data-testid="select-hometime"
                  >
                    <option value="">Select a time slot</option>
                    {timeSlots.map(slot => (
                      <option key={slot.value} value={slot.value}>{slot.label}</option>
                    ))}
                    <option value="emergency">Emergency (Any Time)</option>
                  </select>
                </div>
              </div>

              {/* Location sharing */}
              <div className="rounded-xl border border-orange-100 bg-orange-50/60 p-4 space-y-2">
                <p className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-orange-500" />
                  Share Your Live Location
                </p>
                <p className="text-xs text-gray-500">
                  Share your GPS location so our team can navigate directly to your home via Google Maps.
                </p>

                {locationState === 'idle' && (
                  <button
                    type="button"
                    onClick={requestLocation}
                    className="flex items-center gap-2 text-sm font-semibold text-orange-600 hover:text-orange-700 transition-colors underline underline-offset-2"
                  >
                    <MapPin className="w-4 h-4" /> Tap to share my location
                  </button>
                )}

                {locationState === 'fetching' && (
                  <div className="flex items-center gap-2 text-sm text-orange-500 font-medium">
                    <Loader2 className="w-4 h-4 animate-spin" /> Getting your location…
                  </div>
                )}

                {locationState === 'granted' && coords && (
                  <div className="flex items-center gap-2 text-sm text-green-700 font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    Location captured ✓ — will be sent with request
                    <a
                      href={`https://www.google.com/maps?q=${coords.lat},${coords.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline ml-1 text-xs font-normal"
                    >
                      Preview
                    </a>
                  </div>
                )}

                {locationState === 'denied' && (
                  <div className="flex items-start gap-2 text-xs text-amber-700">
                    <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-amber-500" />
                    Location access denied. Our team will use the address you entered instead.
                  </div>
                )}
              </div>

              <Button type="submit" className="w-full text-base h-12 mt-2 gap-2">
                <MapPin className="w-4 h-4" />
                Schedule Home Collection via WhatsApp
              </Button>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
