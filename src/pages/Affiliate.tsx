import { motion } from 'framer-motion';
import {
CheckCircle,
Eye,
Gift,
Percent,
Scale,
TrendingUp,Users
} from 'lucide-react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/shared/SEOHead';

const sections = [
  {
    id: 'disclosure',
    title: '1. Affiliate Disclosure',
    icon: Eye,
    content: `Verbito.ai participates in affiliate marketing programs. This means we may earn commissions when you click on links to products or services from our partner companies and make a purchase. We only recommend products and services that we genuinely believe will provide value to our users. Our editorial content is independent and not influenced by affiliate partnerships.`
  },
  {
    id: 'ftc',
    title: '2. FTC Compliance Statement',
    icon: Scale,
    content: `In accordance with the Federal Trade Commission (FTC) guidelines concerning the use of endorsements and testimonials in advertising, we disclose affiliate relationships transparently. This disclosure is made pursuant to the FTC's 16 CFR, Part 255: Guides Concerning the Use of Endorsements and Testimonials in Advertising. We are committed to full transparency about our affiliate relationships.`
  },
  {
    id: 'how',
    title: '3. How Affiliate Links Work',
    icon: LinkIcon,
    content: `When you click an affiliate link on Verbito.ai, a tracking cookie is placed on your browser. If you make a purchase within a specified time period (typically 30 days), we receive a small commission at no additional cost to you. These commissions help support the development and maintenance of our free tools and content. The price you pay is exactly the same whether you use our affiliate link or go directly to the vendor's website.`
  },
  {
    id: 'partners',
    title: '4. Our Affiliate Partners',
    icon: Users,
    content: `We currently maintain affiliate relationships with: OpenAI (ChatGPT/ChatGPT Plus), Anthropic (Claude), Midjourney, Jasper AI, Copy.ai, Grammarly, Notion, and other AI-related tools and services. We regularly evaluate our partnerships and may add or remove partners at any time. A current list is always available upon request.`
  },
  {
    id: 'integrity',
    title: '5. Editorial Integrity',
    icon: CheckCircle,
    content: `Our reviews, comparisons, and recommendations are based on thorough testing and genuine user experience. Affiliate partnerships do not influence our editorial opinions. If a product has significant drawbacks, we will always disclose them. We prioritize user trust over affiliate revenue. If we cannot honestly recommend a product, we will not include it in our recommendations regardless of commission rates.`
  },
];

function LinkIcon(props: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className}>
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}

export default function Affiliate() {
  return (
    <>
      <SEOHead
        title="Affiliate Disclosure — Verbito.ai"
        description="Transparent affiliate disclosure and FTC compliance. Learn about our affiliate partnerships and how they support our platform."
      />
      <section className="pt-28 pb-16 bg-gray-50 dark:bg-gray-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
            <h1 className="font-heading font-bold text-4xl text-gray-900 dark:text-white mb-4">
              Affiliate Disclosure
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Transparency is important to us. Learn about our affiliate relationships.
            </p>
          </motion.div>

          {/* FTC Banner */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-2xl p-6 mb-10"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/20 rounded-xl flex items-center justify-center shrink-0">
                <Scale className="w-6 h-6 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <h2 className="font-heading font-bold text-lg text-gray-900 dark:text-white mb-2">
                  FTC Compliance Notice
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  This page contains our affiliate disclosure in compliance with the Federal Trade Commission
                  (FTC) guidelines. We believe in being transparent about how we generate revenue to maintain
                  trust with our users. This disclosure is provided pursuant to 16 CFR Part 255.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
            {[
              { icon: Percent, label: 'Commission', value: '10-30%', desc: 'Typical rate' },
              { icon: Gift, label: 'User Cost', value: '$0', desc: 'No extra cost to you' },
              { icon: TrendingUp, label: 'Cookie Life', value: '30 days', desc: 'Tracking period' },
              { icon: Users, label: 'Partners', value: '8+', desc: 'Active partnerships' },
            ].map((stat) => (
              <div key={stat.label} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4 text-center">
                <stat.icon className="w-5 h-5 text-violet-600 mx-auto mb-2" />
                <p className="text-lg font-bold text-gray-900 dark:text-white">{stat.value}</p>
                <p className="text-xs text-gray-500">{stat.desc}</p>
              </div>
            ))}
          </div>

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

          {/* Contact */}
          <div className="mt-10 text-center">
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
              Questions about our affiliate relationships?
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-violet-600 text-white rounded-xl font-medium hover:bg-violet-700 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
