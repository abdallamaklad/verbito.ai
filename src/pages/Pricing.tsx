import { motion } from 'framer-motion';
import { Check,ChevronDown,ChevronUp,Sparkles,Zap } from 'lucide-react';
import { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import SEOHead from '../components/shared/SEOHead';
import { createCheckoutSession } from '../services/stripe';
import { supabase } from '../services/supabase';
import type { BillingPeriod,PlanType } from '../types';

const plans = [
  {
    name: 'Free',
    monthlyPrice: 0,
    yearlyPrice: 0,
    period: 'forever',
    description: 'Get started with AI prompt generation.',
    features: ['2 prompts/day', 'Basic categories', 'Copy generated prompts', 'Access free articles', 'Community support'],
    cta: 'Get Started',
    href: '/signup',
    featured: false,
  },
  {
    name: 'Starter',
    monthlyPrice: 12,
    yearlyPrice: 115,
    period: 'month',
    description: 'For individuals getting serious about AI.',
    features: ['300 prompts/month', 'All 17 categories', 'Save & organize prompts', 'Full prompt history', 'Email support'],
    cta: 'Start Free Trial',
    href: '/signup',
    featured: false,
  },
  {
    name: 'Pro',
    monthlyPrice: 29,
    yearlyPrice: 278,
    period: 'month',
    description: 'For professionals who use AI daily.',
    features: ['2,000 prompts/month', 'Advanced generation modes', 'Templates & collections', 'Priority support', 'Course discount (20%)', 'Export prompts (PDF/CSV)'],
    cta: 'Start Free Trial',
    href: '/signup',
    featured: true,
  },
  {
    name: 'Unlimited',
    monthlyPrice: 79,
    yearlyPrice: 758,
    period: 'month',
    description: 'For power users and teams.',
    features: ['Unlimited prompts', 'Advanced workflows', 'Premium templates library', 'Priority support', 'API access (beta)', 'Custom integrations'],
    cta: 'Contact Sales',
    href: '/enterprise',
    featured: false,
  },
];

const comparisonRows = [
  { feature: 'Prompts per month', free: '2/day', starter: '300', pro: '2,000', unlimited: 'Unlimited' },
  { feature: 'Categories', free: 'Basic', starter: 'All 17', pro: 'All 17', unlimited: 'All 17 + Custom' },
  { feature: 'Save prompts', free: false, starter: true, pro: true, unlimited: true },
  { feature: 'Prompt history', free: false, starter: '30 days', pro: 'Unlimited', unlimited: 'Unlimited' },
  { feature: 'Collections', free: false, starter: '3', pro: 'Unlimited', unlimited: 'Unlimited' },
  { feature: 'Advanced modes', free: false, starter: false, pro: true, unlimited: true },
  { feature: 'Templates', free: false, starter: false, pro: true, unlimited: 'Premium' },
  { feature: 'Export (PDF/CSV)', free: false, starter: false, pro: true, unlimited: true },
  { feature: 'API access', free: false, starter: false, pro: false, unlimited: 'Beta' },
  { feature: 'Support', free: 'Community', starter: 'Email', pro: 'Priority', unlimited: 'Dedicated' },
  { feature: 'Course discount', free: false, starter: false, pro: '20%', unlimited: '30%' },
  { feature: 'Custom integrations', free: false, starter: false, pro: false, unlimited: true },
  { feature: 'Team sharing', free: false, starter: false, pro: false, unlimited: true },
];

const faqs = [
  { q: 'Can I switch plans at any time?', a: 'Yes, you can upgrade, downgrade, or cancel your plan at any time. When you upgrade, you will be charged the prorated difference. When you downgrade, the new rate takes effect at your next billing cycle.' },
  { q: 'Is there a free trial for paid plans?', a: 'Yes! Starter and Pro plans come with a 7-day free trial. You can explore all features risk-free. No credit card required for Starter; credit card required for Pro but you can cancel before the trial ends.' },
  { q: 'What happens if I hit my monthly limit?', a: 'If you reach your monthly prompt limit, you can either wait for the next billing cycle or upgrade to a higher plan. Well send you a notification when you are at 80% of your limit.' },
  { q: 'Do you offer refunds?', a: 'We offer a 14-day money-back guarantee on all paid plans. If you are not satisfied, contact our support team for a full refund, no questions asked.' },
  { q: 'Can I use Verbito for my team?', a: 'Absolutely! Our Unlimited plan includes team sharing features. For larger organizations, check out our Enterprise plans with SSO, admin controls, and custom integrations.' },
  { q: 'What payment methods do you accept?', a: 'We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and bank transfers for annual plans. Enterprise customers can also pay by invoice.' },
];

function SimpleFaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden">
      <button type="button" aria-expanded={open} onClick={() => setOpen(!open)} className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
        <span className="font-medium text-gray-900 dark:text-white pr-4">{q}</span>
        {open ? <ChevronUp className="w-5 h-5 text-gray-400 shrink-0" /> : <ChevronDown className="w-5 h-5 text-gray-400 shrink-0" />}
      </button>
      {open && <div className="px-5 pb-5"><p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{a}</p></div>}
    </div>
  );
}

export default function Pricing() {
  const navigate = useNavigate();
  const [isAnnual, setIsAnnual] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState<string | null>(null);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } }),
  };

  const startCheckout = async (planName: string) => {
    const planId = planName.toLowerCase() as PlanType;
    if (planId === 'free') return;

    const billingPeriod: BillingPeriod = isAnnual ? 'yearly' : 'monthly';
    const { data: sessionData } = supabase ? await supabase.auth.getSession() : { data: { session: null } };
    if (!sessionData.session) {
      navigate(`/signup?plan=${planId}&billing=${billingPeriod}`);
      return;
    }

    setCheckoutLoading(planId);
    setCheckoutError(null);
    try {
      const { url } = await createCheckoutSession(planId, billingPeriod);
      window.location.assign(url);
    } catch (error) {
      setCheckoutError(error instanceof Error ? error.message : 'Unable to start checkout. Please try again or contact support.');
    } finally {
      setCheckoutLoading(null);
    }
  };

  return (
    <>
      <SEOHead
        title="Pricing — Verbito.ai"
        description="Start free with 2 prompts/day. Upgrade to Starter, Pro, or Unlimited when you're ready. Cancel anytime."
        canonicalUrl="https://verbito.ai/pricing"
        ogImage="/og-default.jpg"
        schema={{
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'SoftwareApplication',
              name: 'Verbito AI Prompt Generator',
              applicationCategory: 'ProductivityApplication',
              operatingSystem: 'Web',
              url: 'https://verbito.ai/pricing',
              offers: plans.map((plan) => ({
                '@type': 'Offer',
                name: `${plan.name} plan`,
                price: String(plan.monthlyPrice),
                priceCurrency: 'USD',
                url: 'https://verbito.ai/pricing',
              })),
            },
            {
              '@type': 'FAQPage',
              mainEntity: faqs.map(({ q, a }) => ({
                '@type': 'Question',
                name: q,
                acceptedAnswer: { '@type': 'Answer', text: a },
              })),
            },
          ],
        }}
      />

      <div className="min-h-[100dvh] pt-24 pb-16 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Hero */}
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0} className="text-center mb-12">
            <h1 className="font-heading font-bold text-4xl sm:text-5xl text-gray-900 dark:text-white mb-4">Simple, Transparent Pricing</h1>
            <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">Choose the plan that fits your needs. No hidden fees, cancel anytime.</p>

            {/* Toggle */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <span className={`text-sm font-medium ${!isAnnual ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>Monthly</span>
              <button type="button" aria-label="Toggle annual billing" aria-pressed={isAnnual} onClick={() => setIsAnnual(!isAnnual)} className="relative w-14 h-7 bg-violet-600 rounded-full transition-colors">
                <div className={`absolute top-0.5 w-6 h-6 bg-white rounded-full shadow-sm transition-transform ${isAnnual ? 'translate-x-7' : 'translate-x-0.5'}`} />
              </button>
              <span className={`text-sm font-medium ${isAnnual ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>Annual</span>
              {isAnnual && <span className="text-xs bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-full font-medium">Save 20%</span>}
            </div>
          </motion.div>

          {/* Plans Grid */}
          {checkoutError && (
            <div className="mb-6 rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700 dark:border-rose-900/60 dark:bg-rose-950/30 dark:text-rose-300">
              {checkoutError}
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.name}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                className={`bg-white dark:bg-gray-800 rounded-2xl p-6 border ${plan.featured ? 'border-violet-600 shadow-featured relative' : 'border-gray-200 dark:border-gray-700'} hover:-translate-y-1 hover:shadow-card-hover transition-all duration-300`}
              >
                {plan.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-violet-600 text-white text-xs font-semibold px-3 py-1 rounded-full">Most Popular</span>
                  </div>
                )}
                <h3 className="font-heading font-semibold text-lg text-gray-900 dark:text-white mb-1">{plan.name}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">{plan.description}</p>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-3xl font-heading font-bold text-gray-900 dark:text-white">${isAnnual ? Math.round(plan.yearlyPrice / 12) : plan.monthlyPrice}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">/mo</span>
                </div>
                {isAnnual && plan.yearlyPrice > 0 && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">Billed at ${plan.yearlyPrice}/year</p>
                )}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li key={f as string} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      {f as string}
                    </li>
                  ))}
                </ul>
                {plan.monthlyPrice === 0 ? (
                  <Link
                    to={plan.href}
                    className={`block text-center w-full py-3 rounded-xl font-semibold text-sm transition-colors ${plan.featured ? 'bg-violet-600 text-white hover:bg-violet-700' : 'border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                  >
                    {plan.cta}
                  </Link>
                ) : (
                  <button
                    type="button"
                    onClick={() => startCheckout(plan.name)}
                    disabled={checkoutLoading === plan.name.toLowerCase()}
                    className={`block text-center w-full py-3 rounded-xl font-semibold text-sm transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${plan.featured ? 'bg-violet-600 text-white hover:bg-violet-700' : 'border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                  >
                    {checkoutLoading === plan.name.toLowerCase() ? 'Opening checkout...' : plan.cta}
                  </button>
                )}
                {plan.monthlyPrice > 0 && (
                  <>
                    <p className="text-sm text-center text-gray-500 mt-3">Billed {isAnnual ? 'annually' : 'monthly'} &middot; Cancel anytime</p>
                    <p className="text-xs text-center text-gray-400 mt-1">30-day money-back guarantee</p>
                    <p className="text-xs text-center text-gray-400 mt-1">No charge today. Payment method required to start.</p>
                  </>
                )}
              </motion.div>
            ))}
          </div>

          {/* Comparison Table */}
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} className="mb-20">
            <h2 className="font-heading font-bold text-2xl text-gray-900 dark:text-white text-center mb-8">Feature Comparison</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <th className="text-left py-4 px-4 font-medium text-gray-500 dark:text-gray-400">Feature</th>
                    <th className="text-center py-4 px-4 font-medium text-gray-500 dark:text-gray-400">Free</th>
                    <th className="text-center py-4 px-4 font-medium text-gray-500 dark:text-gray-400">Starter</th>
                    <th className="text-center py-4 px-4 font-medium text-violet-600">Pro</th>
                    <th className="text-center py-4 px-4 font-medium text-gray-500 dark:text-gray-400">Unlimited</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row) => (
                    <tr key={row.feature} className="border-b border-gray-100 dark:border-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-800/30">
                      <td className="py-3 px-4 text-gray-700 dark:text-gray-300">{row.feature}</td>
                      <td className="py-3 px-4 text-center text-gray-600 dark:text-gray-400">{typeof row.free === 'boolean' ? (row.free ? <Check className="w-4 h-4 text-emerald-500 mx-auto" /> : <span className="text-gray-300 dark:text-gray-700">-</span>) : row.free}</td>
                      <td className="py-3 px-4 text-center text-gray-600 dark:text-gray-400">{typeof row.starter === 'boolean' ? (row.starter ? <Check className="w-4 h-4 text-emerald-500 mx-auto" /> : <span className="text-gray-300 dark:text-gray-700">-</span>) : row.starter}</td>
                      <td className="py-3 px-4 text-center text-violet-600 font-medium">{typeof row.pro === 'boolean' ? (row.pro ? <Check className="w-4 h-4 text-emerald-500 mx-auto" /> : <span className="text-gray-300 dark:text-gray-700">-</span>) : row.pro}</td>
                      <td className="py-3 px-4 text-center text-gray-600 dark:text-gray-400">{typeof row.unlimited === 'boolean' ? (row.unlimited ? <Check className="w-4 h-4 text-emerald-500 mx-auto" /> : <span className="text-gray-300 dark:text-gray-700">-</span>) : row.unlimited}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* FAQ */}
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} className="max-w-3xl mx-auto mb-20">
            <h2 className="font-heading font-bold text-2xl text-gray-900 dark:text-white text-center mb-8">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq) => <SimpleFaqItem key={faq.q} q={faq.q} a={faq.a} />)}
            </div>
          </motion.div>

          {/* Bundle CTA */}
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} className="bg-violet-50 dark:bg-violet-900/10 rounded-2xl p-8 text-center border border-violet-100 dark:border-violet-800/30 max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-violet-600" />
              <span className="font-heading font-semibold text-lg text-gray-900 dark:text-white">Bundle & Save</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">Get Pro + the Master Prompt Engineering course for $388/year (save $116).</p>
            <Link to="/signup" className="inline-flex items-center gap-2 px-6 py-3 bg-violet-600 text-white rounded-xl font-semibold hover:bg-violet-700 transition-colors">
              <Zap className="w-4 h-4" />
              Get the Bundle
            </Link>
          </motion.div>
        </div>
      </div>
    </>
  );
}
