import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface FeedbackData {
  name: string;
  mobile: string;
  testTaken: string;
  comments: string;
}

export function FeedbackForm() {
  const [form, setForm] = useState<FeedbackData>({ name: '', mobile: '', testTaken: '', comments: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const stored = JSON.parse(localStorage.getItem('mithra_feedback') || '[]');
      stored.push({ ...form, timestamp: new Date().toISOString() });
      localStorage.setItem('mithra_feedback', JSON.stringify(stored));
      setLoading(false);
      setSubmitted(true);
    }, 1000);
  };

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
          <h2 className="text-orange-600 font-semibold tracking-wider uppercase text-sm mb-2">Feedback</h2>
          <h3 className="font-poppins text-3xl md:text-4xl font-bold text-foreground mb-4">
            Share Your Experience
          </h3>
          <p className="text-muted-foreground text-lg">
            Your feedback helps us serve you better.
          </p>
        </motion.div>

        <motion.div
          className="max-w-lg mx-auto bg-white border border-orange-100 rounded-3xl shadow-xl shadow-orange-500/5 p-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                className="flex flex-col items-center justify-center py-12 text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", bounce: 0.5 }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", bounce: 0.6, delay: 0.1 }}
                >
                  <CheckCircle2 className="w-20 h-20 text-green-500 mb-4" />
                </motion.div>
                <h4 className="font-poppins text-2xl font-bold text-foreground mb-2">Thank You!</h4>
                <p className="text-muted-foreground">Your feedback has been submitted successfully.</p>
                <Button
                  variant="outline"
                  className="mt-6 rounded-full"
                  onClick={() => { setSubmitted(false); setForm({ name: '', mobile: '', testTaken: '', comments: '' }); }}
                  data-testid="btn-feedback-again"
                >
                  Submit Another
                </Button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                className="flex flex-col gap-5"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="space-y-1.5">
                  <Label htmlFor="feedback-name">Your Name</Label>
                  <Input
                    id="feedback-name"
                    name="name"
                    placeholder="e.g. Ravi Kumar"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="rounded-xl"
                    data-testid="input-feedback-name"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="feedback-mobile">Mobile Number</Label>
                  <Input
                    id="feedback-mobile"
                    name="mobile"
                    type="tel"
                    placeholder="e.g. 91234 56789"
                    value={form.mobile}
                    onChange={handleChange}
                    required
                    className="rounded-xl"
                    data-testid="input-feedback-mobile"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="feedback-test">Test Taken</Label>
                  <Input
                    id="feedback-test"
                    name="testTaken"
                    placeholder="e.g. Blood Test, CBC, Thyroid Profile"
                    value={form.testTaken}
                    onChange={handleChange}
                    required
                    className="rounded-xl"
                    data-testid="input-feedback-test"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="feedback-comments">Comments</Label>
                  <Textarea
                    id="feedback-comments"
                    name="comments"
                    placeholder="Tell us about your experience..."
                    value={form.comments}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="rounded-xl resize-none"
                    data-testid="input-feedback-comments"
                  />
                </div>
                <Button
                  type="submit"
                  size="lg"
                  className="rounded-full font-bold gap-2 shadow-lg shadow-primary/20"
                  disabled={loading}
                  data-testid="btn-feedback-submit"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                      />
                      Sending...
                    </span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Feedback
                    </>
                  )}
                </Button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
