import { usePageTranslations } from '@/hooks/useTranslation';
import { motion } from 'framer-motion';
import {
BarChart3,
Building2,
Check,
CheckCircle,Clock,
GraduationCap,Lock,Send,
Shield,
Users,
Zap
} from 'lucide-react';
import { useState } from 'react';
import SEOHead from '../components/shared/SEOHead';

const features = [
  { icon: Users, title: 'Team Management', desc: 'Add/remove team members, assign roles, and track usage across your organization.' },
  { icon: Shield, title: 'SSO & SAML', desc: 'Enterprise-grade single sign-on with SAML 2.0 and OIDC support.' },
  { icon: Lock, title: 'Advanced Security', desc: 'SOC 2 Type II, GDPR compliance, custom data retention policies, and audit logs.' },
  { icon: BarChart3, title: 'Usage Analytics', desc: 'Detailed reports on prompt usage, team productivity, and ROI metrics.' },
  { icon: GraduationCap, title: 'Team Training', desc: 'Custom onboarding sessions and dedicated training for your team.' },
  { icon: Zap, title: 'API Access', desc: 'Direct API integration with higher rate limits and custom endpoints.' },
];

const plans = [
  {
    name: 'Team',
    price: '$79',
    period: '/user/month',
    description: 'For teams of 5-50 users',
    features: ['Up to 50 users', 'Shared prompt library', 'Team analytics', 'Priority support', 'API access'],
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'For organizations with 50+ users',
    features: ['Unlimited users', 'SSO & SAML', 'Advanced security', 'Custom integrations', 'Dedicated account manager', 'SLA guarantee'],
  },
];

interface DemoForm {
  name: string;
  email: string;
  company: string;
  teamSize: string;
  message: string;
}

export default function Enterprise() {
  const [form, setForm] = useState<DemoForm>({ name: '', email: '', company: '', teamSize: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const tt = usePageTranslations('common');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1000));
    setSubmitted(true);
    setSubmitting(false);
  };

  return (
    <>
      <SEOHead
        title="Enterprise — Verbito.ai for Teams"
        description="Verbito.ai for teams and enterprises. SSO, advanced security, team analytics, and dedicated support. Request a demo."
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
              <Building2 className="w-4 h-4" />
              For Teams & Organizations
            </div>
            <h1 className="font-heading font-bold text-4xl sm:text-5xl text-gray-900 dark:text-white mb-6">
              Verbito for Enterprise
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Empower your entire team with AI prompt engineering tools, security, 
              and support designed for organizations at scale.
            </p>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <div className="text-center mb-10">
              <h2 className="font-heading font-bold text-2xl text-gray-900 dark:text-white mb-2">Built for Teams</h2>
              <p className="text-gray-600 dark:text-gray-400">Everything you need to deploy AI prompting across your organization.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((f, i) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6"
                >
                  <div className="w-10 h-10 bg-violet-100 dark:bg-violet-900/20 rounded-lg flex items-center justify-center text-violet-600 mb-4">
                    <f.icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{f.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{f.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Plans */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <div className="text-center mb-10">
              <h2 className="font-heading font-bold text-2xl text-gray-900 dark:text-white mb-2">Enterprise Plans</h2>
              <p className="text-gray-600 dark:text-gray-400">Choose the plan that fits your organization.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {plans.map((plan) => (
                <div
                  key={plan.name}
                  className={`rounded-2xl border p-8 ${
                    plan.name === 'Enterprise'
                      ? 'bg-violet-50 dark:bg-violet-950/20 border-violet-200 dark:border-violet-800'
                      : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800'
                  }`}
                >
                  <h3 className="font-heading font-bold text-xl text-gray-900 dark:text-white mb-1">{plan.name}</h3>
                  <p className="text-sm text-gray-500 mb-4">{plan.description}</p>
                  <div className="flex items-baseline gap-1 mb-6">
                    <span className="text-4xl font-heading font-bold text-gray-900 dark:text-white">{plan.price}</span>
                    <span className="text-gray-500 text-sm">{plan.period}</span>
                  </div>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                        <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button className={`w-full py-3 rounded-xl font-medium transition-colors ${
                    plan.name === 'Enterprise'
                      ? 'bg-violet-600 text-white hover:bg-violet-700'
                      : 'border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}>
                    {plan.name === 'Enterprise' ? 'Contact Sales' : tt.getStarted}
                  </button>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Demo Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 sm:p-8">
              <div className="text-center mb-6">
                <h2 className="font-heading font-bold text-2xl text-gray-900 dark:text-white mb-2">
                  Request a Demo
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  See how Verbito can work for your team. We will get back to you within 1 business day.
                </p>
              </div>

              {submitted ? (
                <div className="text-center py-8">
                  <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="w-7 h-7 text-emerald-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Demo Request Received!</h3>
                  <p className="text-sm text-gray-500">Our team will reach out within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
                      <input
                        type="text" required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Work Email</label>
                      <input
                        type="email" required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
                        placeholder="you@company.com"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Company</label>
                      <input
                        type="text" required
                        value={form.company}
                        onChange={(e) => setForm({ ...form, company: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
                        placeholder="Company name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Team Size</label>
                      <select
                        required
                        value={form.teamSize}
                        onChange={(e) => setForm({ ...form, teamSize: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
                      >
                        <option value="">Select...</option>
                        <option value="5-10">5-10</option>
                        <option value="11-50">11-50</option>
                        <option value="51-200">51-200</option>
                        <option value="200+">200+</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message (Optional)</label>
                    <textarea
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none"
                      placeholder="Tell us about your needs..."
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-violet-600 text-white rounded-xl font-semibold hover:bg-violet-700 transition-colors disabled:opacity-70"
                  >
                    {submitting ? <><Clock className="w-5 h-5 animate-spin" /> {tt.loading}</> : <><Send className="w-5 h-5" /> Request Demo</>}
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
