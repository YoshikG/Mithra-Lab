import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cross, CheckCircle2, UserCircle2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import type { MithraUser } from '@/hooks/use-user';

interface Props {
  existingUser: MithraUser | null;
  onComplete: (user: MithraUser) => void;
}

function validatePhone(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  if (digits.length === 0) return 'Mobile number is required.';
  if (digits.length !== 10) return `Please enter a 10-digit number (you entered ${digits.length} digit${digits.length === 1 ? '' : 's'}).`;
  return '';
}

export function RegistrationScreen({ existingUser, onComplete }: Props) {
  const [step, setStep] = useState<'welcome-back' | 'register'>(
    existingUser ? 'welcome-back' : 'register'
  );
  const [form, setForm] = useState<MithraUser>(
    existingUser ?? { name: '', phone: '', address: '' }
  );
  const [phoneError, setPhoneError] = useState('');
  const [phoneTouched, setPhoneTouched] = useState(false);

  const handlePhoneChange = (value: string) => {
    setForm(f => ({ ...f, phone: value }));
    if (phoneTouched) setPhoneError(validatePhone(value));
  };

  const handlePhoneBlur = () => {
    setPhoneTouched(true);
    setPhoneError(validatePhone(form.phone));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPhoneTouched(true);
    const err = validatePhone(form.phone);
    if (err) {
      setPhoneError(err);
      return;
    }
    onComplete(form);
  };

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden"
        initial={{ y: 60, opacity: 0, scale: 0.96 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ type: 'spring', bounce: 0.3, duration: 0.6 }}
      >
        {/* Branded header */}
        <div className="bg-gradient-to-r from-orange-500 to-amber-400 px-8 py-7 text-white">
          <div className="flex items-center gap-3 mb-1">
            <div className="bg-white/20 p-2 rounded-xl">
              <Cross className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-poppins font-bold text-xl leading-tight">Mithra Diagnostics</h1>
              <p className="text-orange-100 text-xs font-semibold">మిత్ర డయాగ్నోస్టిక్స్ · 24 Hrs Service</p>
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {step === 'welcome-back' && existingUser ? (
            <motion.div
              key="welcome-back"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="px-8 py-8 text-center"
            >
              <UserCircle2 className="w-16 h-16 text-orange-400 mx-auto mb-4" />
              <h2 className="font-poppins font-bold text-2xl text-gray-900 mb-1">
                Welcome back!
              </h2>
              <p className="text-gray-500 text-sm mb-1">Logged in as</p>
              <p className="font-bold text-orange-600 text-lg mb-1">{existingUser.name}</p>
              <p className="text-gray-400 text-sm mb-6">{existingUser.phone}</p>

              <div className="flex flex-col gap-3">
                <Button
                  size="lg"
                  className="w-full rounded-full font-bold shadow-lg shadow-orange-200"
                  onClick={() => onComplete(existingUser)}
                >
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Continue
                </Button>
                <button
                  className="text-sm text-muted-foreground hover:text-orange-600 transition-colors"
                  onClick={() => setStep('register')}
                >
                  Not you? Update details
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.form
              key="register"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              onSubmit={handleSubmit}
              className="px-8 py-7 flex flex-col gap-4"
            >
              <div>
                <h2 className="font-poppins font-bold text-xl text-gray-900">
                  {existingUser ? 'Update Your Details' : 'Quick Registration'}
                </h2>
                <p className="text-gray-500 text-sm mt-1">
                  {existingUser
                    ? 'Edit your saved information below.'
                    : "Enter your details once — we'll remember you for faster booking."}
                </p>
              </div>

              <div className="space-y-1">
                <Label htmlFor="reg-name">Full Name <span className="text-orange-500">*</span></Label>
                <Input
                  id="reg-name"
                  placeholder="e.g. Ravi Kumar"
                  required
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  className="rounded-xl"
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="reg-phone">
                  Mobile Number <span className="text-orange-500">*</span>
                  <span className="text-gray-400 font-normal text-xs ml-1">(10 digits)</span>
                </Label>
                <Input
                  id="reg-phone"
                  type="tel"
                  placeholder="e.g. 9876543210"
                  value={form.phone}
                  onChange={e => handlePhoneChange(e.target.value)}
                  onBlur={handlePhoneBlur}
                  className={`rounded-xl ${phoneError && phoneTouched ? 'border-red-400 focus-visible:ring-red-300' : ''}`}
                  maxLength={15}
                />
                {phoneError && phoneTouched && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-1.5 text-red-600 text-xs font-medium mt-1"
                  >
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    {phoneError}
                  </motion.div>
                )}
              </div>

              <div className="space-y-1">
                <Label htmlFor="reg-address">Address <span className="text-orange-500">*</span></Label>
                <Textarea
                  id="reg-address"
                  placeholder="House no., Street, Area, City"
                  required
                  value={form.address}
                  onChange={e => setForm({ ...form, address: e.target.value })}
                  className="rounded-xl resize-none"
                  rows={2}
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full rounded-full font-bold shadow-lg shadow-orange-200 mt-1"
              >
                Save & Continue →
              </Button>

              <p className="text-center text-xs text-gray-400">
                Your details are stored locally and never shared.
              </p>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
