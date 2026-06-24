import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

export function AppointmentBooking() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState(() => {
    try {
      const saved = localStorage.getItem('mithra_user');
      const user = saved ? JSON.parse(saved) : null;
      return {
        name: user?.name ?? '',
        phone: user?.phone ?? '',
        date: '',
        timeSlot: '',
        test: '',
        notes: ''
      };
    } catch {
      return { name: '', phone: '', date: '', timeSlot: '', test: '', notes: '' };
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const existing = JSON.parse(localStorage.getItem('mithra_appointments') || '[]');
    localStorage.setItem('mithra_appointments', JSON.stringify([...existing, { ...formData, id: Date.now() }]));
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setFormData({ name: '', phone: '', date: '', timeSlot: '', test: '', notes: '' });
    }, 4000);
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(`New Appointment Booking:
Name: ${formData.name}
Phone: ${formData.phone}
Date: ${formData.date}
Time Slot: ${formData.timeSlot}
Test Required: ${formData.test}
Notes: ${formData.notes}`);
    window.open(`https://wa.me/918247557270?text=${text}`, '_blank');
  };

  const today = new Date().toISOString().split('T')[0];

  const timeSlots = (() => {
    const slots: { value: string; label: string }[] = [];
    for (let h = 6; h <= 22; h++) {
      for (const m of [0, 30]) {
        if (h === 22 && m === 30) break;
        const hour12 = h % 12 === 0 ? 12 : h % 12;
        const ampm = h < 12 ? 'AM' : 'PM';
        const min = m === 0 ? '00' : '30';
        const label = `${hour12}:${min} ${ampm}`;
        const value = `${String(h).padStart(2, '0')}:${min}`;
        slots.push({ value, label });
      }
    }
    return slots;
  })();

  return (
    <section id="appointment" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-orange-50 to-white -z-10" />
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-orange-600 font-semibold tracking-wider uppercase text-sm mb-1">Book Online</h2>
            <p className="text-orange-500 text-xs font-bold mb-2">ఆన్‌లైన్‌లో బుక్ చేయండి</p>
            <h3 className="font-poppins text-3xl md:text-4xl font-bold text-foreground mb-1">
              Schedule Your Visit
            </h3>
            <p className="text-orange-700/80 text-lg font-bold mb-6">మీ సందర్శనను నిర్ణయించుకోండి</p>
            <p className="text-muted-foreground text-lg mb-6">
              Book your diagnostic test appointment online to avoid waiting. We provide fast, accurate, and reliable results.
            </p>

            {/* Real clinic photo */}
            <div className="rounded-2xl overflow-hidden shadow-lg mb-7 aspect-[16/9]">
              <img
                src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=900&q=80&auto=format&fit=crop"
                alt="Patient scheduling visit at Mithra Diagnostics"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>

            <div className="space-y-3">
              {[
                "Same-day reports available",
                "Walk-in and online booking",
                "24 hours emergency testing",
                "Certified laboratory professionals",
                "Affordable pricing"
              ].map((benefit, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-orange-600" />
                  </div>
                  <span className="font-medium text-gray-800">{benefit}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-xl p-6 md:p-8 relative"
          >
            <AnimatePresence>
              {isSuccess && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="absolute inset-0 z-10 bg-white rounded-2xl flex flex-col items-center justify-center p-8 text-center"
                >
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-8 h-8 text-green-600" />
                  </div>
                  <h4 className="text-2xl font-bold mb-2">Appointment Booked!</h4>
                  <p className="text-gray-600">We will contact you shortly to confirm your booking.</p>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Patient Name <span className="text-orange-500 font-bold text-xs ml-1">/ పేరు</span></Label>
                  <Input 
                    id="name" 
                    required 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Mobile Number <span className="text-orange-500 font-bold text-xs ml-1">/ ఫోన్ నంబర్</span></Label>
                  <Input 
                    id="phone" 
                    type="tel" 
                    required 
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Date <span className="text-orange-500 font-bold text-xs ml-1">/ తేదీ</span></Label>
                  <Input 
                    id="date" 
                    type="date" 
                    min={today}
                    required 
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Time Slot <span className="text-orange-500 font-bold text-xs ml-1">/ సమయం</span></Label>
                  <select
                    value={formData.timeSlot}
                    onChange={(e) => setFormData({...formData, timeSlot: e.target.value})}
                    required
                    className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    data-testid="select-timeslot"
                  >
                    <option value="">Select a time slot</option>
                    {timeSlots.map(slot => (
                      <option key={slot.value} value={slot.value}>{slot.label}</option>
                    ))}
                    <option value="emergency">Emergency (Any Time)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="test">Required Test <span className="text-orange-500 font-bold text-xs ml-1">/ పరీక్ష పేరు</span></Label>
                <Input 
                  id="test" 
                  placeholder="e.g. Blood Test, CBC, Thyroid"
                  required 
                  value={formData.test}
                  onChange={(e) => setFormData({...formData, test: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes (Optional)</Label>
                <Textarea 
                  id="notes" 
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <Button type="submit" className="w-full text-base h-12">
                  Book Appointment
                </Button>
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={handleWhatsApp}
                  className="w-full text-base h-12 border-green-500 text-green-600 hover:bg-green-50 hover:text-green-700"
                >
                  Book via WhatsApp
                </Button>
              </div>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
