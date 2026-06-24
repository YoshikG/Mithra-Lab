import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type Message = {
  id: string;
  text: string;
  sender: 'bot' | 'user';
};

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! Welcome to Mithra Diagnostics. How can I help you today? You can ask about our tests, packages, home collection, or report timing.',
      sender: 'bot'
    }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input.trim();
    setMessages(prev => [...prev, { id: Date.now().toString(), text: userMsg, sender: 'user' }]);
    setInput('');

    // Bot response logic
    setTimeout(() => {
      const lowerInput = userMsg.toLowerCase();
      let botResponse = "Thank you for your message! For specific queries, please call us at +91 82475 57270 or WhatsApp us. We are available 24×7.";

      if (lowerInput.includes('blood')) {
        botResponse = "We offer comprehensive blood tests including CBC, blood sugar, lipid profile, and more. Fasting for 8 hours is recommended. Call us at +91 82475 57270 to book!";
      } else if (lowerInput.includes('diabetes') || lowerInput.includes('sugar')) {
        botResponse = "Our Diabetes Package (₹599) includes HbA1c, Fasting Sugar, PP Sugar, Urine Routine, and Kidney Function tests. Would you like to book?";
      } else if (lowerInput.includes('thyroid')) {
        botResponse = "Our Thyroid Package (₹499) includes T3, T4, TSH, Free T4, and Free T3 tests. No special preparation needed except avoiding thyroid medications.";
      } else if (lowerInput.includes('report') || lowerInput.includes('result')) {
        botResponse = "Most reports are ready in 4-6 hours. We send reports via WhatsApp as PDF. Contact us at +91 82475 57270.";
      } else if (lowerInput.includes('home') || lowerInput.includes('collection')) {
        botResponse = "Yes! We provide home sample collection. Our team will visit you at your preferred time. Call +91 82475 57270 to schedule.";
      } else if (lowerInput.includes('price') || lowerInput.includes('cost') || lowerInput.includes('rate')) {
        botResponse = "Our tests are very affordable! Blood tests start from ₹99, packages from ₹499. Call us for exact pricing.";
      } else if (lowerInput.includes('time') || lowerInput.includes('hours') || lowerInput.includes('open')) {
        botResponse = "We are open 24 hours a day, 7 days a week — including all holidays. Emergency testing always available!";
      } else if (lowerInput.includes('appointment') || lowerInput.includes('book')) {
        botResponse = "You can book an appointment using our online form on this website, or WhatsApp us at +91 82475 57270.";
      }

      setMessages(prev => [...prev, { id: Date.now().toString(), text: botResponse, sender: 'bot' }]);
    }, 600);
  };

  return (
    <div className="fixed bottom-24 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="absolute bottom-16 right-0 w-[320px] h-[400px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-orange-500 to-primary p-4 flex justify-between items-center text-white">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5" />
                <span className="font-semibold">Mithra Health Assistant</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map(msg => (
                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div 
                    className={`max-w-[85%] rounded-2xl p-3 text-sm ${
                      msg.sender === 'user' 
                        ? 'bg-primary text-white rounded-tr-sm' 
                        : 'bg-white border border-gray-200 text-gray-800 rounded-tl-sm shadow-sm'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSend} className="p-3 bg-white border-t border-gray-100 flex gap-2">
              <Input
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Type your question..."
                className="flex-1 bg-gray-50 border-gray-200 focus-visible:ring-primary focus-visible:border-primary"
              />
              <Button type="submit" size="icon" className="shrink-0 bg-primary hover:bg-orange-600">
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-primary hover:bg-orange-600 text-white rounded-full shadow-xl flex items-center justify-center transition-transform hover:scale-110 active:scale-95"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </button>
    </div>
  );
}
