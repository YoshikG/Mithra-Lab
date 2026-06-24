import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Activity, Heart, TestTube2, Sparkles, X } from 'lucide-react';

const posts = [
  {
    cat: "Diabetes Care",
    icon: Activity,
    title: "10 Tips for Managing Blood Sugar Levels",
    desc: "Regular monitoring and healthy habits can help control diabetes effectively.",
    color: "from-blue-400 to-blue-600",
    content: `Managing blood sugar is essential for a healthy life. Here are 10 key tips:

1. **Check your sugar regularly** — Monitor fasting and post-meal sugar levels as advised by your doctor.
2. **Eat balanced meals** — Include whole grains, vegetables, and lean proteins. Avoid refined sugar and white rice.
3. **Exercise daily** — Even a 30-minute walk can lower blood sugar significantly.
4. **Stay hydrated** — Drink 8–10 glasses of water daily to help kidneys flush out excess sugar.
5. **Avoid skipping meals** — Skipping meals causes sugar spikes. Eat small meals every 3–4 hours.
6. **Reduce stress** — Stress hormones raise blood sugar. Try yoga or deep breathing.
7. **Get enough sleep** — Poor sleep affects insulin sensitivity. Aim for 7–8 hours.
8. **Limit alcohol** — Alcohol interferes with sugar regulation. Drink only in moderation.
9. **Take medications on time** — Never skip prescribed medications or insulin doses.
10. **Get HbA1c tested every 3 months** — This test shows your average blood sugar over 3 months.

📍 Get your HbA1c, Fasting Sugar, and Diabetes Profile tested at Mithra Diagnostics — Call +91 82475 57270.`
  },
  {
    cat: "Heart Health",
    icon: Heart,
    title: "Heart Health: Foods to Eat and Avoid",
    desc: "Discover which foods protect your heart and which ones to limit.",
    color: "from-red-400 to-red-600",
    content: `Your heart health depends greatly on what you eat. Here's a guide:

✅ **Foods to Eat:**
- **Oily fish** (sardines, mackerel) — rich in Omega-3 fatty acids that reduce inflammation.
- **Oats and whole grains** — lower LDL (bad cholesterol).
- **Fruits and vegetables** — especially berries, tomatoes, spinach, and broccoli.
- **Nuts (walnuts, almonds)** — good fats that protect the heart.
- **Olive oil** — use instead of saturated fats for cooking.
- **Legumes** (lentils, beans) — high fiber, low in fat.

❌ **Foods to Avoid:**
- **Fried and processed foods** — high in trans fats that clog arteries.
- **Excess salt** — raises blood pressure, a major heart risk.
- **Sugary drinks** — increase triglycerides and weight.
- **Red meat in excess** — opt for poultry or fish instead.
- **Packaged snacks** — loaded with sodium and unhealthy oils.

📍 Get your Lipid Profile, ECG, and Heart Health Package tested at Mithra Diagnostics — Call +91 82475 57270.`
  },
  {
    cat: "Lab Testing",
    icon: TestTube2,
    title: "Why Regular Blood Tests Are Important",
    desc: "Annual blood tests can detect hidden conditions before they become serious.",
    color: "from-orange-400 to-orange-600",
    content: `Blood tests are one of the most powerful tools in preventive healthcare. Here's why you should get tested regularly:

🔬 **What blood tests reveal:**
- **CBC (Complete Blood Count)** — detects anemia, infections, blood disorders.
- **Blood Sugar (Fasting & HbA1c)** — identifies diabetes risk early.
- **Lipid Profile** — measures cholesterol and triglycerides for heart risk.
- **Liver Function Test (LFT)** — monitors liver health, especially if you take medications.
- **Kidney Function Test (KFT)** — checks creatinine, urea, and kidney efficiency.
- **Thyroid Profile (T3, T4, TSH)** — detects thyroid imbalance causing fatigue or weight gain.
- **Vitamin D & B12** — deficiencies are very common and cause fatigue, bone pain.

📅 **How often should you get tested?**
- Healthy adults: once a year.
- Diabetics & BP patients: every 3–6 months.
- Senior citizens: every 3 months.

📍 Get your Full Body Checkup (40+ tests) at Mithra Diagnostics — Walk-in anytime, 24 Hours open. Call +91 82475 57270.`
  },
  {
    cat: "Lifestyle",
    icon: Sparkles,
    title: "Healthy Lifestyle Tips for Busy Professionals",
    desc: "Simple daily habits that can dramatically improve your health markers.",
    color: "from-green-400 to-green-600",
    content: `Being busy is no excuse to neglect health. Small changes add up:

⏰ **Morning Habits:**
- Drink a glass of warm water with lemon before tea/coffee.
- Do 10–15 minutes of stretching or yoga.
- Eat a protein-rich breakfast — eggs, sprouts, or peanut butter toast.

🏃 **During the Day:**
- Take stairs instead of the lift whenever possible.
- Stand up and walk every 45–60 minutes if you sit at a desk.
- Pack healthy snacks — fruits, nuts, or buttermilk instead of chips.
- Stay hydrated — keep a water bottle at your desk.

🌙 **Evening Habits:**
- Walk for 20–30 minutes after dinner.
- Avoid screens 30 minutes before sleep.
- Sleep by 10–11 PM for 7–8 hours of rest.

🩺 **Health Checks:**
- Get an annual blood test even if you feel fine — many conditions are silent.
- Check your BP and weight monthly.
- Don't ignore fatigue, hair fall, or unexplained weight changes — they may indicate thyroid or vitamin deficiency.

📍 Mithra Diagnostics offers early morning slots from 6:00 AM. Book your test around your busy schedule — Call +91 82475 57270.`
  }
];

export function Blog() {
  const [openPost, setOpenPost] = useState<number | null>(null);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-orange-600 font-semibold tracking-wider uppercase text-sm mb-2">Health Insights</h2>
          <h3 className="font-poppins text-3xl font-bold text-foreground">
            Latest from Our Blog
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {posts.map((post, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="h-full overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className={`h-32 bg-gradient-to-br ${post.color} flex items-center justify-center text-white`}>
                  <post.icon className="w-12 h-12 opacity-80" />
                </div>
                <CardContent className="p-6 flex flex-col items-start h-[calc(100%-8rem)]">
                  <Badge variant="secondary" className="mb-3 bg-orange-100 text-orange-700 hover:bg-orange-200">
                    {post.cat}
                  </Badge>
                  <h4 className="font-bold text-lg mb-2 line-clamp-2">{post.title}</h4>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-1">{post.desc}</p>
                  <Button
                    variant="outline"
                    className="w-full mt-auto border-orange-300 text-orange-600 hover:bg-orange-50"
                    onClick={() => setOpenPost(i)}
                  >
                    Read More
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal overlay */}
      <AnimatePresence>
        {openPost !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setOpenPost(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25 }}
              className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              {/* Modal header */}
              <div className={`h-28 bg-gradient-to-br ${posts[openPost].color} flex items-center justify-between px-6 text-white relative`}>
                <div className="flex items-center gap-3">
                  {(() => { const Icon = posts[openPost].icon; return <Icon className="w-10 h-10 opacity-90" />; })()}
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider opacity-80">{posts[openPost].cat}</p>
                    <h3 className="font-bold text-lg leading-tight">{posts[openPost].title}</h3>
                  </div>
                </div>
                <button
                  onClick={() => setOpenPost(null)}
                  className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors shrink-0"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal content */}
              <div className="p-6 overflow-y-auto max-h-[calc(85vh-7rem)]">
                <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed whitespace-pre-line">
                  {posts[openPost].content.split('\n').map((line, idx) => {
                    if (line.startsWith('**') && line.endsWith('**')) {
                      return <p key={idx} className="font-bold text-gray-900 mt-3 mb-1">{line.replace(/\*\*/g, '')}</p>;
                    }
                    if (line.match(/^\d+\.\s\*\*/)) {
                      const clean = line.replace(/\*\*/g, '');
                      return <p key={idx} className="mb-1 text-sm">{clean}</p>;
                    }
                    if (line.startsWith('- **')) {
                      const clean = line.replace(/\*\*/g, '');
                      return <p key={idx} className="mb-1 text-sm pl-2">• {clean.replace('- ', '')}</p>;
                    }
                    if (line.startsWith('✅') || line.startsWith('❌') || line.startsWith('🔬') || line.startsWith('📅') || line.startsWith('⏰') || line.startsWith('🏃') || line.startsWith('🌙') || line.startsWith('🩺')) {
                      return <p key={idx} className="font-bold text-gray-900 mt-4 mb-1 text-sm">{line}</p>;
                    }
                    if (line.startsWith('📍')) {
                      return <p key={idx} className="mt-4 text-sm font-semibold text-orange-600 bg-orange-50 border border-orange-200 rounded-lg p-3">{line}</p>;
                    }
                    if (line === '') return <br key={idx} />;
                    return <p key={idx} className="text-sm mb-1">{line}</p>;
                  })}
                </div>
                <Button
                  className="w-full mt-6 bg-orange-500 hover:bg-orange-600 text-white rounded-xl h-11"
                  onClick={() => {
                    setOpenPost(null);
                    window.open('https://wa.me/918247557270?text=Hello%2C%20I%20would%20like%20to%20book%20a%20test%20at%20Mithra%20Diagnostics.', '_blank');
                  }}
                >
                  Book a Test
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
