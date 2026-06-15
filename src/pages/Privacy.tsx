import { motion } from 'framer-motion';
import {
Clock,
Cookie,
CreditCard,
Database,
Eye,
FileKey,
Globe,
Lock,
Mail,
Server,
Share2,
Shield,UserCheck
} from 'lucide-react';
import SEOHead from '../components/shared/SEOHead';

const sections = [
  {
    id: 'introduction',
    title: '1. Introduction',
    icon: FileKey,
    content: `Verbito.ai is operated by Quantara LLC ("we", "our", or "us"), located at Sharjah Media City, Sharjah, UAE. We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, store, and protect your personal information when you use our website, services, and applications (collectively, "Services"). By using Verbito.ai, you consent to the practices described in this policy. This policy is designed to comply with global privacy regulations including GDPR (EU), CCPA (California), and other applicable laws.`
  },
  {
    id: 'collect',
    title: '2. Information We Collect',
    icon: Database,
    content: `We collect the following types of information:

• Account Information: Name, email address, and password when you register.
• Payment Information: Credit card details processed securely by Stripe. We never store full card numbers.
• Usage Data: Prompts you generate, templates you use, pages visited, features accessed.
• Device Information: IP address, browser type, operating system, and device identifiers.
• Cookies and Tracking: See our Cookie Policy for details.
• Communications: Emails, support tickets, and feedback you send us.`
  },
  {
    id: 'use',
    title: '3. How We Use Your Information',
    icon: Eye,
    content: `We use your information to:

• Provide and improve our Services
• Process payments and manage subscriptions
• Send transactional emails and optional newsletters
• Respond to support requests
• Analyze usage patterns to enhance user experience
• Detect and prevent fraud and abuse
• Comply with legal obligations

We process personal data based on: (a) contractual necessity, (b) your consent, (c) legitimate interests, and (d) legal compliance.`
  },
  {
    id: 'sharing',
    title: '4. Data Sharing and Third Parties',
    icon: Share2,
    content: `We share data only with trusted third parties necessary to provide our Services:

• Stripe: Payment processing (PCI-DSS compliant)
• OpenAI/Anthropic/Google: AI model providers for prompt generation
• Supabase: Database and authentication infrastructure
• Analytics: Anonymous usage analytics

We do not sell your personal information. We may disclose data if required by law or to protect our rights.`
  },
  {
    id: 'cookies',
    title: '5. Cookies and Tracking Technologies',
    icon: Cookie,
    content: `We use cookies and similar technologies to: (a) maintain your session, (b) remember preferences, (c) analyze site traffic, and (d) deliver relevant content. You can manage cookie preferences through your browser settings. For detailed information, please see our separate Cookie Policy.`
  },
  {
    id: 'security',
    title: '6. Data Security',
    icon: Shield,
    content: `We implement industry-standard security measures including:

• TLS/SSL encryption for all data in transit
• AES-256 encryption for data at rest
• Regular security audits and penetration testing
• Access controls and role-based permissions
• SOC 2 Type II compliant infrastructure providers

While we take these precautions, no internet transmission is completely secure. Use strong passwords and enable two-factor authentication.`
  },
  {
    id: 'retention',
    title: '7. Data Retention',
    icon: Clock,
    content: `We retain your personal data for as long as your account is active or as needed to provide Services. Upon account deletion, we remove personal data within 30 days, except where retention is required by law. Anonymized usage data may be retained indefinitely for analytical purposes.`
  },
  {
    id: 'rights',
    title: '8. Your Rights (GDPR & CCPA)',
    icon: UserCheck,
    content: `Depending on your location, you have the following rights:

• Access: Request a copy of your personal data
• Correction: Update inaccurate information
• Deletion: Request deletion of your data ("Right to be Forgotten")
• Portability: Receive data in a machine-readable format
• Objection: Object to certain processing activities
• Restriction: Limit how we process your data
• Withdraw Consent: Opt out of optional data collection

To exercise these rights, contact us at verbito.ai@wearequantara.com.`
  },
  {
    id: 'international',
    title: '9. International Data Transfers',
    icon: Globe,
    content: `Your data may be transferred to and processed in countries other than your country of residence, including countries where our trusted service providers operate. We ensure appropriate safeguards are in place through Standard Contractual Clauses (SCCs), adequacy decisions, or other lawful transfer mechanisms where required.`
  },
  {
    id: 'ai-processing',
    title: '10. AI Data Processing',
    icon: Server,
    content: `When you use our Services, your prompts are sent to third-party AI providers (OpenAI, Anthropic, Google). We do not use your prompts to train AI models. Your inputs are processed according to each provider's privacy policy. Do not submit sensitive personal information (SSN, medical records, financial account numbers) through our prompts.`
  },
  {
    id: 'children',
    title: '11. Children\'s Privacy',
    icon: Lock,
    content: `Our Services are not intended for children under 13. We do not knowingly collect personal information from children under 13. If you believe we have inadvertently collected such information, contact us immediately and we will delete it.`
  },
  {
    id: 'contact',
    title: '12. Contact Us',
    icon: Mail,
    content: `For privacy-related questions, requests, or concerns, contact Quantara LLC at verbito.ai@wearequantara.com or through our Contact page. Our registered address is Sharjah Media City, Sharjah, UAE. You may also reach our Data Protection Officer at the same email address. We aim to respond to all requests within 30 days.`
  },
];

const highlights = [
  { label: 'Data encrypted at rest', value: 'AES-256', icon: Shield },
  { label: 'Data encrypted in transit', value: 'TLS 1.3', icon: Lock },
  { label: 'Payment processor', value: 'PCI-DSS', icon: CreditCard },
  { label: 'DPA available', value: 'GDPR', icon: FileKey },
];

export default function Privacy() {
  return (
    <>
      <SEOHead
        title="Privacy Policy — Verbito.ai"
        description="Learn how Verbito.ai collects, uses, and protects your personal data. GDPR & CCPA compliant privacy practices."
      />
      <section className="pt-28 pb-16 bg-gray-50 dark:bg-gray-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
            <h1 className="font-heading font-bold text-4xl text-gray-900 dark:text-white mb-4">
              Privacy Policy
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Last updated: January 1, 2026. Your privacy is our priority.
            </p>
          </motion.div>

          {/* Data Highlights */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
            {highlights.map((h) => (
              <div key={h.label} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4 text-center">
                <h.icon className="w-5 h-5 text-violet-600 mx-auto mb-2" />
                <p className="text-lg font-bold text-gray-900 dark:text-white">{h.value}</p>
                <p className="text-xs text-gray-500">{h.label}</p>
              </div>
            ))}
          </div>

          {/* Table of Contents */}
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 mb-10">
            <h2 className="font-semibold text-gray-900 dark:text-white mb-4">Table of Contents</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {sections.map((s) => (
                <a key={s.id} href={`#${s.id}`} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-violet-600 transition-colors">
                  <s.icon className="w-3.5 h-3.5" />
                  {s.title}
                </a>
              ))}
            </div>
          </div>

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
                <div className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed whitespace-pre-line">
                  {s.content}
                </div>
              </motion.section>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
