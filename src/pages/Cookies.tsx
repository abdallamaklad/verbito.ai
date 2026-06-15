import { motion } from 'framer-motion';
import { Check,Clock,Cookie,Eye,Globe,Settings,Shield } from 'lucide-react';
import SEOHead from '../components/shared/SEOHead';

const cookieTypes = [
  {
    name: 'Essential Cookies',
    purpose: 'Required for the website to function properly',
    duration: 'Session / 1 year',
    required: true,
    examples: ['session_id', 'auth_token', 'csrf_token'],
  },
  {
    name: 'Preference Cookies',
    purpose: 'Remember your settings and preferences',
    duration: '1 year',
    required: false,
    examples: ['dark_mode', 'language', 'ui_layout'],
  },
  {
    name: 'Analytics Cookies',
    purpose: 'Help us understand how visitors use our site',
    duration: '2 years',
    required: false,
    examples: ['_ga', '_gid', '_gcl_au'],
  },
  {
    name: 'Marketing Cookies',
    purpose: 'Used to deliver relevant advertisements',
    duration: '1 year',
    required: false,
    examples: ['_fbp', 'fr', 'ads_prefs'],
  },
  {
    name: 'Security Cookies',
    purpose: 'Help detect and prevent security threats',
    duration: 'Session',
    required: true,
    examples: ['__cf_bm', '_cfuvid'],
  },
];

const sections = [
  {
    id: 'what',
    title: '1. What Are Cookies?',
    icon: Cookie,
    content: `Cookies are small text files that are placed on your device when you visit a website. They are widely used to make websites work more efficiently and provide information to website owners. Cookies can be "session cookies" (deleted when you close your browser) or "persistent cookies" (remain on your device until they expire or you delete them).`
  },
  {
    id: 'how',
    title: '2. How We Use Cookies',
    icon: Eye,
    content: `Verbito.ai uses cookies for the following purposes: to authenticate users and maintain sessions; to remember your preferences (such as dark mode); to analyze site traffic and usage patterns; to improve our Services; to deliver relevant content and marketing; and to detect and prevent fraud and abuse.`
  },
  {
    id: 'types',
    title: '3. Types of Cookies We Use',
    icon: Settings,
    content: `The table below lists the specific cookies we use, their purpose, and their duration.`
  },
  {
    id: 'third-party',
    title: '4. Third-Party Cookies',
    icon: Globe,
    content: `We may allow third-party service providers to place cookies on your device for analytics and marketing purposes. These providers include: Google Analytics (usage analytics), Stripe (payment processing), and Supabase (authentication). Each third-party provider is responsible for their own cookies and data practices.`
  },
  {
    id: 'manage',
    title: '5. Managing Your Cookie Preferences',
    icon: Shield,
    content: `You can manage cookies through your browser settings. Most browsers allow you to: view what cookies are stored; delete existing cookies; block all or specific cookies; and receive warnings before a cookie is placed. Note that blocking essential cookies may prevent the website from functioning properly. You can also opt out of non-essential cookies by using our cookie consent banner.`
  },
  {
    id: 'changes',
    title: '6. Changes to This Policy',
    icon: Clock,
    content: `We may update this Cookie Policy from time to time. Changes will be posted on this page with an updated effective date. We encourage you to review this policy periodically.`
  },
];

export default function Cookies() {
  return (
    <>
      <SEOHead
        title="Cookie Policy — Verbito.ai"
        description="Learn how Verbito.ai uses cookies and how you can manage your cookie preferences."
      />
      <section className="pt-28 pb-16 bg-gray-50 dark:bg-gray-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
            <h1 className="font-heading font-bold text-4xl text-gray-900 dark:text-white mb-4">Cookie Policy</h1>
            <p className="text-gray-600 dark:text-gray-400">Last updated: January 1, 2026</p>
          </motion.div>

          {/* Cookie Types Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden mb-10"
          >
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800">
              <h2 className="font-semibold text-gray-900 dark:text-white">Cookie Types We Use</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-800 text-gray-500">
                    <th className="text-left px-6 py-3 font-medium">Cookie Type</th>
                    <th className="text-left px-6 py-3 font-medium">Purpose</th>
                    <th className="text-left px-6 py-3 font-medium">Duration</th>
                    <th className="text-left px-6 py-3 font-medium">Required</th>
                  </tr>
                </thead>
                <tbody>
                  {cookieTypes.map((c, i) => (
                    <tr key={i} className="border-b border-gray-200/50 dark:border-gray-800/50">
                      <td className="px-6 py-3 font-medium text-gray-900 dark:text-white">{c.name}</td>
                      <td className="px-6 py-3 text-gray-600 dark:text-gray-400">{c.purpose}</td>
                      <td className="px-6 py-3 text-gray-600 dark:text-gray-400">{c.duration}</td>
                      <td className="px-6 py-3">
                        {c.required ? (
                          <span className="inline-flex items-center gap-1 text-xs bg-emerald-100 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 px-2 py-1 rounded-full">
                            <Check className="w-3 h-3" /> Required
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-2 py-1 rounded-full">
                            Optional
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Sections */}
          <div className="space-y-8">
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
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{s.content}</p>

                {/* Detailed cookie table for the types section */}
                {s.id === 'types' && (
                  <div className="mt-4 overflow-x-auto">
                    <table className="w-full text-sm border border-gray-200 dark:border-gray-800 rounded-lg">
                      <thead>
                        <tr className="bg-gray-50 dark:bg-gray-800 text-gray-500">
                          <th className="text-left px-4 py-2 font-medium">Cookie Name</th>
                          <th className="text-left px-4 py-2 font-medium">Type</th>
                          <th className="text-left px-4 py-2 font-medium">Purpose</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cookieTypes.flatMap(c => c.examples.map((ex, j) => (
                          <tr key={`${c.name}-${j}`} className="border-t border-gray-200 dark:border-gray-800">
                            <td className="px-4 py-2 text-gray-900 dark:text-white font-mono text-xs">{ex}</td>
                            <td className="px-4 py-2 text-gray-600 dark:text-gray-400">{c.name}</td>
                            <td className="px-4 py-2 text-gray-600 dark:text-gray-400">{c.purpose}</td>
                          </tr>
                        )))}
                      </tbody>
                    </table>
                  </div>
                )}
              </motion.section>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
