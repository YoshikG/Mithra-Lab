import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function LeadPopup() {
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [joined, setJoined] = useState(false);

  useEffect(() => {
    const seen = localStorage.getItem('mithra_lead_popup_shown');
    if (!seen) {
      const timer = setTimeout(() => setVisible(true), 8000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setVisible(false);
    localStorage.setItem('mithra_lead_popup_shown', '1');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const leads = JSON.parse(localStorage.getItem('mithra_leads') || '[]');
    leads.push({ name, phone, timestamp: new Date().toISOString() });
    localStorage.setItem('mithra_leads', JSON.stringify(leads));
    localStorage.setItem('mithra_lead_popup_shown', '1');
    setJoined(true);
    setTimeout(() => setVisible(false), 2000);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          data-testid="lead-popup-overlay"
        >
          <motion.div
            className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden"
            initial={{ y: 80, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 80, opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", bounce: 0.35 }}
            onClick={(e) => e.stopPropagation()}
            data-testid="lead-popup"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-orange-500 to-amber-400 p-6 text-white relative">
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
                data-testid="lead-popup-close"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                  <Bell className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-poppins font-bold text-xl leading-tight">
                    Get Health Updates
                  </h3>
                  <p className="text-orange-100 text-sm mt-0.5">& Special Offers</p>
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="p-6">
              <AnimatePresence mode="wait">
                {joined ? (
                  <motion.div
                    key="success"
                    className="text-center py-6"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", bounce: 0.5 }}
                  >
                    <div className="text-5xl mb-3">🎉</div>
                    <h4 className="font-poppins font-bold text-xl text-foreground">You're in!</h4>
                    <p className="text-muted-foreground text-sm mt-1">Thank you for joining, {name}!</p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-4"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <p className="text-muted-foreground text-sm">
                      Join our health updates list and get exclusive offers from Mithra Diagnostics.
                    </p>
                    <div className="space-y-1">
                      <Label htmlFor="lead-name">Your Name</Label>
                      <Input
                        id="lead-name"
                        placeholder="Enter your name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                        className="rounded-xl"
                        data-testid="input-lead-name"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="lead-phone">Phone Number</Label>
                      <Input
                        id="lead-phone"
                        type="tel"
                        placeholder="Enter your phone number"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        required
                        className="rounded-xl"
                        data-testid="input-lead-phone"
                      />
                    </div>
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full rounded-full font-bold shadow-lg shadow-primary/20 mt-2"
                      data-testid="btn-lead-join"
                    >
                      Join Now
                    </Button>
                    <button
                      type="button"
                      onClick={handleClose}
                      className="text-sm text-muted-foreground hover:text-foreground text-center transition-colors"
                    >
                      No thanks
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
