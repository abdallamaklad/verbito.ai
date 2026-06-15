import { motion } from 'framer-motion';
import {
Calendar,CheckCircle,
Clock,
CreditCard,
Mail,
RefreshCw,
Shield,
XCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/shared/SEOHead';

const sections = [
  {
    id: 'overview',
    title: '1. Overview',
    icon: Shield,
    content: `At Verbito.ai, we stand behind the quality of our products. We want you to be completely satisfied with your purchase. This Refund Policy outlines when and how you can request a refund for our Services, including subscriptions and course purchases.`
  },
  {
    id: 'guarantee',
    title: '2. 30-Day Money-Back Guarantee',
    icon: CheckCircle,
    content: `We offer a 30-day money-back guarantee on all purchases. If you are not completely satisfied with your purchase for any reason, you may request a full refund within 30 days of the original purchase date. No questions asked. This applies to: one-time course purchases, first-time subscriptions, and annual plans. Refunds will be processed to the original payment method within 5-10 business days.`
  },
  {
    id: 'subscriptions',
    title: '3. Subscription Cancellations',
    icon: CreditCard,
    content: `You may cancel your subscription at any time through your Account settings or by contacting support. When you cancel: your subscription remains active until the end of the current billing period; you will not be charged again; you can continue using the service until the period ends; no partial refunds for unused time within a billing period. To avoid being charged for the next period, cancel at least 24 hours before your renewal date.`
  },
  {
    id: 'not-eligible',
    title: '4. What Is Not Eligible for Refund',
    icon: XCircle,
    content: `The following are not eligible for refund: (a) refunds requested after the 30-day guarantee period; (b) partial refunds for unused portions of a subscription period; (c) refunds for accounts terminated due to violations of our Terms of Service; (d) promotional or discounted purchases marked as non-refundable; (e) refunds for gift cards or credits already redeemed. We reserve the right to deny refund requests that appear to be abusive.`
  },
  {
    id: 'process',
    title: '5. How to Request a Refund',
    icon: RefreshCw,
    content: `To request a refund: (1) Log into your account and visit the Billing section, (2) Click "Request Refund" next to the eligible purchase, or (3) Email verbito.ai@wearequantara.com with your order details. Please include: your account email, the purchase date, and the reason for the refund (optional). We process most refunds within 2 business days. The refund will appear on your statement within 5-10 business days depending on your payment method.`
  },
  {
    id: 'timing',
    title: '6. Refund Timing',
    icon: Clock,
    content: `Refund processing times: Credit/Debit cards: 5-10 business days; PayPal: 3-5 business days; Apple Pay/Google Pay: 5-10 business days. If you do not see your refund after 10 business days, please contact your payment provider first, then reach out to us if needed.`
  },
  {
    id: 'course',
    title: '7. Course-Specific Policy',
    icon: Calendar,
    content: `Our Master Prompt Engineering course comes with a 30-day satisfaction guarantee. If you complete less than 30% of the course content and request a refund within 30 days, we will issue a full refund. If you have completed more than 30%, we may offer a partial refund at our discretion. Certificate of completion is revoked upon refund.`
  },
];

export default function RefundPolicy() {
  return (
    <>
      <SEOHead
        title="Refund Policy — Verbito.ai"
        description="30-day money-back guarantee on all purchases. Learn about our refund process, eligibility, and timelines."
      />
      <section className="pt-28 pb-16 bg-gray-50 dark:bg-gray-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
            <h1 className="font-heading font-bold text-4xl text-gray-900 dark:text-white mb-4">
              Refund Policy
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Last updated: January 1, 2026. We want you to be 100% satisfied.
            </p>
          </motion.div>

          {/* Guarantee Banner */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 rounded-2xl p-6 mb-10 flex items-start gap-4"
          >
            <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-900/20 rounded-xl flex items-center justify-center shrink-0">
              <Shield className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <h2 className="font-heading font-bold text-xl text-gray-900 dark:text-white mb-1">
                30-Day Money-Back Guarantee
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                Not satisfied? Get a full refund within 30 days — no questions asked.
              </p>
              <div className="flex flex-wrap items-center gap-3 text-sm">
                <span className="flex items-center gap-1 text-emerald-700 dark:text-emerald-400">
                  <CheckCircle className="w-4 h-4" /> Full refund
                </span>
                <span className="flex items-center gap-1 text-emerald-700 dark:text-emerald-400">
                  <Clock className="w-4 h-4" /> 30 days
                </span>
                <span className="flex items-center gap-1 text-emerald-700 dark:text-emerald-400">
                  <RefreshCw className="w-4 h-4" /> 5-10 business days
                </span>
              </div>
            </div>
          </motion.div>

          {/* Sections */}
          <div className="space-y-6">
            {sections.map((s, i) => (
              <motion.section
                key={s.id}
                id={s.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 bg-violet-100 dark:bg-violet-900/20 rounded-lg flex items-center justify-center text-violet-600 dark:text-violet-400">
                    <s.icon className="w-4.5 h-4.5" />
                  </div>
                  <h2 className="font-heading font-bold text-lg text-gray-900 dark:text-white">{s.title}</h2>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  {s.content}
                </p>
              </motion.section>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-10 text-center">
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
              Need help with a refund? Contact our support team.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-violet-600 text-white rounded-xl font-medium hover:bg-violet-700 transition-colors"
            >
              <Mail className="w-5 h-5" />
              Contact Support
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
