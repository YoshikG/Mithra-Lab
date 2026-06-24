import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronDown, Home, Shield, Zap, Star, FlaskConical } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CATEGORIES = ['All', 'Cancer Screening', 'Hairfall Profile', 'Fertility Profile', 'Health Packages'];

const PACKAGES = [
  {
    id: 'female-cancer',
    category: 'Cancer Screening',
    emoji: '🩺',
    name: 'Female Cancer Screening',
    badge: 'Basic',
    price: '1999',
    paramCount: 6,
    description: 'Early detection package for common cancers in women.',
    accent: 'text-rose-600',
    badgeBg: 'bg-rose-100 text-rose-700',
    iconBg: 'bg-rose-50',
    btnClass: 'bg-rose-500 hover:bg-rose-600',
    border: 'border-rose-200',
    parameters: [
      'Alpha Feto Protein (AFP)', 'Beta HCG', 'CA-125',
      'CA 15.3', 'CA 19.9', 'Carcino Embryonic Antigen (CEA)',
    ],
  },
  {
    id: 'male-cancer',
    category: 'Cancer Screening',
    emoji: '🩺',
    name: 'Male Cancer Screening',
    badge: 'Advanced',
    price: '1999',
    paramCount: 35,
    description: 'Advanced cancer screening package for men with complete prostate profile.',
    accent: 'text-blue-600',
    badgeBg: 'bg-blue-100 text-blue-700',
    iconBg: 'bg-blue-50',
    btnClass: 'bg-blue-500 hover:bg-blue-600',
    border: 'border-blue-200',
    parameters: [
      'CA 19.9', 'Carcino Embryonic Antigen (CEA)',
      'Free PSA', 'Percent Free PSA', 'PSA',
      'Alpha Feto Protein (AFP-C)', 'Beta HCG',
      'CBC — Hemoglobin', 'CBC — RBC Count', 'CBC — WBC Count', 'CBC — Platelet Count',
      'CBC — Neutrophils', 'CBC — Lymphocytes', 'CBC — Monocytes', 'CBC — Eosinophils',
      'CBC — Basophils', 'CBC — MCV', 'CBC — MCH', 'CBC — MCHC', 'CBC — RDW',
      'CBC — Hematocrit', 'CBC — MPV', 'CBC — PDW', 'CBC — PCT', 'CBC — NLR',
      'CBC — PLR', 'CBC — ESR', 'CBC — Reticulocyte Count',
      'Prostate — Total PSA', 'Prostate — Free PSA', 'Prostate — % Free PSA',
      'Prostate — PSA Density', 'Prostate — PSA Velocity',
      'Prostate — PSA Ratio', 'Prostate Profile Complete',
    ],
  },
  {
    id: 'infertility',
    category: 'Fertility Profile',
    emoji: '👨‍👩‍👧',
    name: 'Infertility Screening',
    badge: 'Basic',
    price: '2199',
    paramCount: 7,
    description: 'Detect hormonal causes of infertility and reproductive disorders.',
    accent: 'text-purple-600',
    badgeBg: 'bg-purple-100 text-purple-700',
    iconBg: 'bg-purple-50',
    btnClass: 'bg-purple-500 hover:bg-purple-600',
    border: 'border-purple-200',
    parameters: [
      'FSH', 'LH', 'Prolactin (PRL)',
      'Anti Mullerian Hormone (AMH)',
      'Total T3', 'Total T4', 'Ultrasensitive TSH',
    ],
  },
  {
    id: 'hairfall-women',
    category: 'Hairfall Profile',
    emoji: '💇',
    name: 'Hairfall Profile – Women',
    badge: 'Advanced',
    price: '3299',
    paramCount: 51,
    description: 'Root-cause analysis of hair fall: stress, nutrition, hormones & infections.',
    accent: 'text-amber-600',
    badgeBg: 'bg-amber-100 text-amber-700',
    iconBg: 'bg-amber-50',
    btnClass: 'bg-amber-500 hover:bg-amber-600',
    border: 'border-amber-200',
    parameters: [
      'Vitamin D', 'Vitamin B12',
      'T3', 'T4', 'UTSH',
      'Total Iron Binding Capacity', 'Serum Iron', 'Transferrin Saturation', 'UIBC', 'Ferritin',
      'CBC (28 parameters)',
      'SHBG', 'Anti Nuclear Antibody', 'CRP', 'Cortisol', 'Calcium',
      'Serum Phosphorus', 'Magnesium', 'Serum Zinc',
      'FSH', 'LH', 'Prolactin', 'Testosterone', 'VDRL',
    ],
  },
  {
    id: 'hairfall-men',
    category: 'Hairfall Profile',
    emoji: '👨',
    name: 'Hairfall Profile – Men',
    badge: 'Advanced',
    price: '3299',
    paramCount: 47,
    description: 'Advanced screening for hair loss due to hormonal imbalance & nutrition.',
    accent: 'text-cyan-600',
    badgeBg: 'bg-cyan-100 text-cyan-700',
    iconBg: 'bg-cyan-50',
    btnClass: 'bg-cyan-500 hover:bg-cyan-600',
    border: 'border-cyan-200',
    parameters: [
      'Vitamin D', 'Vitamin B12',
      'T3', 'T4', 'UTSH',
      'Total Iron Binding Capacity', 'Serum Iron', 'Transferrin Saturation', 'UIBC',
      'Ferritin', 'CBC (28 parameters)',
      'DHT', 'SHBG', 'Anti Nuclear Antibody', 'CRP', 'Calcium',
      'Serum Phosphorus', 'Magnesium', 'Serum Zinc',
    ],
  },
  {
    id: 'heart',
    category: 'Health Packages',
    emoji: '❤️',
    name: 'Heart Health Package',
    badge: '',
    price: '799',
    paramCount: 5,
    description: 'Comprehensive heart health checkup with lipid profile and ECG.',
    accent: 'text-red-600',
    badgeBg: 'bg-red-100 text-red-700',
    iconBg: 'bg-red-50',
    btnClass: 'bg-red-500 hover:bg-red-600',
    border: 'border-red-200',
    parameters: ['CBC', 'Lipid Profile', 'ECG', 'Blood Sugar', 'Troponin'],
  },
  {
    id: 'diabetes',
    category: 'Health Packages',
    emoji: '🩸',
    name: 'Diabetes Package',
    badge: '',
    price: '599',
    paramCount: 5,
    description: 'Complete diabetes screening and monitoring panel.',
    accent: 'text-orange-600',
    badgeBg: 'bg-orange-100 text-orange-700',
    iconBg: 'bg-orange-50',
    btnClass: 'bg-orange-500 hover:bg-orange-600',
    border: 'border-orange-200',
    parameters: ['HbA1c', 'Fasting Sugar', 'PP Sugar', 'Urine Routine', 'Kidney Function'],
  },
  {
    id: 'thyroid',
    category: 'Health Packages',
    emoji: '🦋',
    name: 'Thyroid Package',
    badge: '',
    price: '499',
    paramCount: 5,
    description: 'Full thyroid function evaluation including free hormones.',
    accent: 'text-teal-600',
    badgeBg: 'bg-teal-100 text-teal-700',
    iconBg: 'bg-teal-50',
    btnClass: 'bg-teal-500 hover:bg-teal-600',
    border: 'border-teal-200',
    parameters: ['T3', 'T4', 'TSH', 'Free T4', 'Free T3'],
  },
  {
    id: 'senior',
    category: 'Health Packages',
    emoji: '👴',
    name: 'Senior Citizen Package',
    badge: 'Popular',
    price: '1299',
    paramCount: 7,
    description: 'Comprehensive health checkup designed for senior citizens.',
    accent: 'text-green-600',
    badgeBg: 'bg-green-100 text-green-700',
    iconBg: 'bg-green-50',
    btnClass: 'bg-green-500 hover:bg-green-600',
    border: 'border-green-200',
    parameters: ['CBC', 'Blood Sugar', 'Lipid Profile', 'Liver Function', 'Kidney Function', 'Thyroid', 'Urine Routine'],
  },
  {
    id: 'women',
    category: 'Health Packages',
    emoji: '👩',
    name: "Women's Wellness Package",
    badge: '',
    price: '999',
    paramCount: 6,
    description: 'Essential wellness tests tailored specifically for women.',
    accent: 'text-pink-600',
    badgeBg: 'bg-pink-100 text-pink-700',
    iconBg: 'bg-pink-50',
    btnClass: 'bg-pink-500 hover:bg-pink-600',
    border: 'border-pink-200',
    parameters: ['CBC', 'Thyroid', 'Vitamin D', 'Iron Studies', 'Urine Routine', 'Blood Sugar'],
  },
  {
    id: 'children',
    category: 'Health Packages',
    emoji: '👶',
    name: "Children's Health Package",
    badge: '',
    price: '699',
    paramCount: 5,
    description: 'Age-appropriate health screening for children.',
    accent: 'text-sky-600',
    badgeBg: 'bg-sky-100 text-sky-700',
    iconBg: 'bg-sky-50',
    btnClass: 'bg-sky-500 hover:bg-sky-600',
    border: 'border-sky-200',
    parameters: ['CBC', 'Blood Sugar', 'Liver Function', 'Vitamin D', 'Urine Routine'],
  },
  {
    id: 'fullbody',
    category: 'Health Packages',
    emoji: '🏥',
    name: 'Full Body Checkup',
    badge: 'Best Value',
    price: '1499',
    paramCount: 40,
    description: 'Complete 40+ test full body health checkup covering all major systems.',
    accent: 'text-indigo-600',
    badgeBg: 'bg-indigo-100 text-indigo-700',
    iconBg: 'bg-indigo-50',
    btnClass: 'bg-indigo-500 hover:bg-indigo-600',
    border: 'border-indigo-200',
    parameters: [
      'CBC (28 parameters)', 'Lipid Profile', 'Liver Function', 'Kidney Function',
      'Thyroid (T3, T4, TSH)', 'Fasting Blood Sugar', 'PP Blood Sugar', 'HbA1c',
      'Urine Routine', 'ECG', 'Vitamin D', 'Vitamin B12', 'Iron Studies',
    ],
  },
];

const TRUST_BADGES = [
  { icon: Shield, label: 'NABL Certified' },
  { icon: Zap, label: 'Fast Reports' },
  { icon: Star, label: 'Trusted Diagnostics' },
  { icon: Home, label: 'Home Collection' },
];

export function HealthPackages() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return PACKAGES.filter(pkg => {
      const matchCat = activeCategory === 'All' || pkg.category === activeCategory;
      const q = search.toLowerCase();
      const matchSearch = !q ||
        pkg.name.toLowerCase().includes(q) ||
        pkg.category.toLowerCase().includes(q) ||
        pkg.parameters.some(p => p.toLowerCase().includes(q));
      return matchCat && matchSearch;
    });
  }, [search, activeCategory]);

  const handleBook = (pkgName: string) => {
    const saved = localStorage.getItem('mithra_user');
    const user = saved ? JSON.parse(saved) : null;
    const intro = user
      ? `Hello, I am *${user.name}* (📞 ${user.phone}). I would like to book the *${pkgName}* from Mithra Diagnostics.`
      : `Hello, I would like to book the *${pkgName}* from Mithra Diagnostics.`;
    window.open(`https://wa.me/918247557270?text=${encodeURIComponent(intro)}`, '_blank');
  };

  return (
    <section id="packages" className="py-24 bg-gray-50 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-orange-50 via-transparent to-transparent" />

      <div className="container mx-auto px-4 md:px-6 relative">

        {/* Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-orange-600 font-semibold tracking-wider uppercase text-sm mb-2">Tests & Packages</h2>
          <h3 className="font-poppins text-3xl md:text-5xl font-bold text-gray-900 mb-3">
            Diagnostic Packages
          </h3>
          <p className="text-gray-500 text-lg">
            Affordable, accurate, and comprehensive diagnostic packages for every health need
          </p>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          {TRUST_BADGES.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-1.5 bg-white border border-gray-200 shadow-sm rounded-full px-4 py-1.5 text-gray-600 text-sm font-medium">
              <Icon className="w-3.5 h-3.5 text-orange-500" />
              {label}
            </div>
          ))}
        </motion.div>

        {/* Search */}
        <motion.div
          className="max-w-xl mx-auto mb-8"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search tests, packages, parameters…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-white border border-gray-200 shadow-sm rounded-full pl-11 pr-5 py-3 text-gray-800 placeholder:text-gray-400 text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all"
            />
          </div>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-orange-500 text-white shadow-md shadow-orange-200'
                  : 'bg-white border border-gray-200 text-gray-600 hover:border-orange-300 hover:text-orange-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Cards Grid */}
        <AnimatePresence mode="wait">
          {filtered.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-16 text-gray-400"
            >
              <FlaskConical className="w-12 h-12 mx-auto mb-4 opacity-30" />
              <p className="text-lg">No packages found for "{search}"</p>
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filtered.map((pkg, i) => {
                const isExpanded = expandedId === pkg.id;
                return (
                  <motion.div
                    key={pkg.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.4 }}
                    className={`bg-white rounded-2xl border ${pkg.border} shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col cursor-pointer`}
                    onClick={() => setExpandedId(isExpanded ? null : pkg.id)}
                  >
                    <div className="p-6 flex flex-col flex-1">
                      {/* Header row */}
                      <div className="flex items-start justify-between mb-4">
                        <div className={`w-12 h-12 rounded-xl ${pkg.iconBg} flex items-center justify-center text-2xl`}>
                          {pkg.emoji}
                        </div>
                        <div className="flex flex-col items-end gap-1.5">
                          {pkg.badge && (
                            <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${pkg.badgeBg}`}>
                              {pkg.badge}
                            </span>
                          )}
                          <span className="text-[10px] font-semibold text-gray-400 bg-gray-50 border border-gray-100 rounded-full px-2 py-0.5">
                            {pkg.category}
                          </span>
                        </div>
                      </div>

                      {/* Name */}
                      <h4 className="font-poppins text-lg font-bold text-gray-900 mb-1 leading-tight">
                        {pkg.name}
                      </h4>
                      <p className="text-gray-500 text-sm mb-4 leading-relaxed">{pkg.description}</p>

                      {/* Tap hint */}
                      <div className="flex items-center justify-between text-xs font-medium mb-1 text-orange-500">
                        <span>{isExpanded ? 'Hide details' : 'Tap to see cost & details'}</span>
                        <motion.span animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
                          <ChevronDown className="w-4 h-4" />
                        </motion.span>
                      </div>

                      {/* Expandable: price, params, book */}
                      <AnimatePresence initial={false}>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            {/* Price & param count */}
                            <div className="flex items-end justify-between mt-3 mb-3">
                              <div>
                                <span className="text-xs text-gray-400">Starting from</span>
                                <div className="text-2xl font-bold text-orange-500">₹{pkg.price}</div>
                              </div>
                              <div className="text-right">
                                <div className="text-2xl font-bold text-gray-800">{pkg.paramCount}</div>
                                <div className="text-xs text-gray-400">Parameters</div>
                              </div>
                            </div>

                            {/* Home collection */}
                            <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-medium mb-3">
                              <Home className="w-3.5 h-3.5" />
                              Home Sample Collection Available
                            </div>

                            {/* Parameters list */}
                            <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 max-h-48 overflow-y-auto">
                              <ul className="space-y-1.5">
                                {pkg.parameters.map((param, j) => (
                                  <li key={j} className="flex items-start gap-2 text-xs text-gray-600">
                                    <span className={`mt-1 w-1.5 h-1.5 rounded-full ${pkg.btnClass.replace('hover:', 'bg-').split(' ')[0].replace('bg-', 'bg-')} shrink-0`} />
                                    {param}
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Book button */}
                            <Button
                              className="mt-4 w-full font-bold bg-orange-500 hover:bg-orange-600 text-white border-0 rounded-xl h-11"
                              onClick={e => { e.stopPropagation(); handleBook(pkg.name); }}
                            >
                              Book Test
                            </Button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer note */}
        <motion.p
          className="text-center text-gray-400 text-sm mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          All prices include sample collection at lab. Home collection charges may apply. &nbsp;
          Call <a href="tel:+918247557270" className="text-orange-500 font-semibold">+91 82475 57270</a> for custom packages.
        </motion.p>

      </div>
    </section>
  );
}
