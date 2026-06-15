import { usePageTranslations } from '@/hooks/useTranslation';
import { motion } from 'framer-motion';
import {
BarChart3,
Briefcase,
Calendar,
Check,
CheckCircle,Clock,
GraduationCap,
Lightbulb,Target,
Users,
Zap
} from 'lucide-react';
import { useState } from 'react';
import SEOHead from '../components/shared/SEOHead';

const services = [
  {
    icon: Lightbulb,
    title: 'Prompt Strategy Workshop',
    description: 'A 2-hour intensive workshop where we audit your current AI usage and design a custom prompt strategy for your team.',
    deliverables: ['Current state audit', 'Custom prompt library', 'Best practices guide', '30-day action plan'],
    price: 'From $1,500',
  },
  {
    icon: Target,
    title: 'AI Workflow Design',
    description: 'End-to-end design of AI-powered workflows tailored to your business processes and team structure.',
    deliverables: ['Workflow mapping', 'Prompt templates', 'Integration guide', 'Training materials'],
    price: 'From $3,500',
  },
  {
    icon: Users,
    title: 'Team Training Program',
    description: 'Custom training sessions for teams of 5-100+. From fundamentals to advanced techniques.',
    deliverables: ['Live training sessions', 'Custom curriculum', 'Practice exercises', 'Certification exam'],
    price: 'From $2,000',
  },
  {
    icon: BarChart3,
    title: 'AI Readiness Assessment',
    description: 'Comprehensive assessment of your organization\'s readiness for AI adoption with a detailed roadmap.',
    deliverables: ['Readiness scorecard', 'Gap analysis', 'ROI projections', 'Implementation roadmap'],
    price: 'From $2,500',
  },
  {
    icon: GraduationCap,
    title: 'Executive AI Briefing',
    description: 'A focused session for C-suite and leadership on AI capabilities, risks, and strategic opportunities.',
    deliverables: ['Market landscape overview', 'Competitive analysis', 'Risk assessment', 'Strategic recommendations'],
    price: 'From $1,000',
  },
  {
    icon: Zap,
    title: 'Prompt Engineering Retainer',
    description: 'Ongoing support with a dedicated prompt engineer for continuous optimization and new use cases.',
    deliverables: ['Dedicated engineer', 'Monthly optimization', 'New prompt development', 'Priority support'],
    price: 'From $5,000/mo',
  },
];

interface BookingForm {
  name: string;
  email: string;
  company: string;
  service: string;
  budget: string;
  timeline: string;
  message: string;
}

export default function Consulting() {
  const [form, setForm] = useState<BookingForm>({
    name: '', email: '', company: '', service: '', budget: '', timeline: '', message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const tt = usePageTranslations('common');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1000));
    setSubmitted(true);
    setSubmitting(false);
  };

  return (
    <>
      <SEOHead
        title="Consulting Services — Verbito.ai"
        description="Expert AI consulting services: prompt strategy workshops, team training, workflow design, and AI readiness assessments. Book a consultation."
      />
      <section className="pt-28 pb-16 bg-gray-50 dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-violet-100 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300 rounded-full px-4 py-1.5 text-sm font-medium mb-4">
              <Briefcase className="w-4 h-4" />
              Consulting
            </div>
            <h1 className="font-heading font-bold text-4xl sm:text-5xl text-gray-900 dark:text-white mb-6">
              Expert AI Consulting
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Get personalized guidance from prompt engineering experts. We help teams and 
              organizations unlock the full potential of AI.
            </p>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <div className="text-center mb-10">
              <h2 className="font-heading font-bold text-2xl text-gray-900 dark:text-white mb-2">Our Services</h2>
              <p className="text-gray-600 dark:text-gray-400">Choose the engagement that fits your needs.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((s, i) => (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 flex flex-col"
                >
                  <div className="w-10 h-10 bg-violet-100 dark:bg-violet-900/20 rounded-lg flex items-center justify-center text-violet-600 mb-4">
                    <s.icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{s.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 flex-1">{s.description}</p>
                  <div className="mb-4">
                    <p className="text-xs font-medium text-gray-500 mb-2">Deliverables:</p>
                    <ul className="space-y-1">
                      {s.deliverables.map((d) => (
                        <li key={d} className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-400">
                          <CheckCircle className="w-3 h-3 text-emerald-500" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <p className="text-violet-600 dark:text-violet-400 font-semibold text-sm">{s.price}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Process */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <div className="text-center mb-10">
              <h2 className="font-heading font-bold text-2xl text-gray-900 dark:text-white mb-2">How It Works</h2>
              <p className="text-gray-600 dark:text-gray-400">A simple process from inquiry to delivery.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {[
                { step: '1', title: 'Book a Call', desc: 'Schedule a free discovery call' },
                { step: '2', title: 'Assessment', desc: 'We audit your needs' },
                { step: '3', title: 'Proposal', desc: 'Custom plan and quote' },
                { step: '4', title: 'Delivery', desc: 'Execute and train' },
              ].map((s) => (
                <div key={s.step} className="text-center">
                  <div className="w-12 h-12 bg-violet-600 rounded-full flex items-center justify-center text-white font-bold mx-auto mb-3">
                    {s.step}
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">{s.title}</h3>
                  <p className="text-xs text-gray-500">{s.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Booking Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 sm:p-8">
              <div className="text-center mb-6">
                <h2 className="font-heading font-bold text-2xl text-gray-900 dark:text-white mb-2">
                  Book a Free Consultation
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Tell us about your project and we will get back to you within 24 hours.
                </p>
              </div>

              {submitted ? (
                <div className="text-center py-8">
                  <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="w-7 h-7 text-emerald-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{tt.success}</h3>
                  <p className="text-sm text-gray-500">We will be in touch within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
                      <input type="text" required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
                        placeholder="Your name" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                      <input type="email" required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
                        placeholder="you@company.com" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Company</label>
                    <input type="text" required
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
                      placeholder="Company name" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Service Interest</label>
                      <select required
                        value={form.service}
                        onChange={(e) => setForm({ ...form, service: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500">
                        <option value="">Select...</option>
                        {services.map((s) => (
                          <option key={s.title} value={s.title}>{s.title}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Budget Range</label>
                      <select
                        value={form.budget}
                        onChange={(e) => setForm({ ...form, budget: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
                      >
                        <option value="">Select...</option>
                        <option value="<5k">Under $5,000</option>
                        <option value="5k-10k">$5,000 - $10,000</option>
                        <option value="10k-25k">$10,000 - $25,000</option>
                        <option value="25k+">$25,000+</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Project Details</label>
                    <textarea
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      rows={4}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none"
                      placeholder="Tell us about your goals, team size, and timeline..."
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-violet-600 text-white rounded-xl font-semibold hover:bg-violet-700 transition-colors disabled:opacity-70"
                  >
                    {submitting ? <><Clock className="w-5 h-5 animate-spin" /> {tt.loading}</> : <><Calendar className="w-5 h-5" /> Book Consultation</>}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
