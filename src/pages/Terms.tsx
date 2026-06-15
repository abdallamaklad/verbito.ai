import { motion } from 'framer-motion';
import { AlertTriangle,Ban,BookOpen,CreditCard,FileText,Gavel,Lock,Mail,RefreshCw,Scale,Shield,UserCheck } from 'lucide-react';
import SEOHead from '../components/shared/SEOHead';

const sections = [
  {
    id: 'acceptance',
    title: '1. Acceptance of Terms',
    icon: BookOpen,
    content: `By accessing and using Verbito.ai ("the Platform"), you accept and agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, you may not use the Platform. These Terms constitute a legally binding agreement between you and Quantara LLC, operating Verbito.ai. We reserve the right to update or modify these Terms at any time without prior notice. Your continued use of the Platform following any changes indicates your acceptance of the updated Terms.`
  },
  {
    id: 'eligibility',
    title: '2. Eligibility and Accounts',
    icon: UserCheck,
    content: `You must be at least 13 years old to use the Platform. By using Verbito.ai, you represent and warrant that you meet this requirement. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account. We reserve the right to suspend or terminate accounts that violate these Terms or for any other reason at our sole discretion.`
  },
  {
    id: 'services',
    title: '3. Description of Services',
    icon: FileText,
    content: `Verbito.ai provides AI-powered prompt generation, a prompt template library, educational courses, and related services (collectively, "Services"). We use third-party AI providers including OpenAI, Anthropic, and Google to generate content. The quality and accuracy of outputs depend on the inputs you provide and the capabilities of these underlying AI models. We do not guarantee that outputs will always be accurate, complete, or suitable for your specific purposes.`
  },
  {
    id: 'subscriptions',
    title: '4. Subscriptions and Payments',
    icon: CreditCard,
    content: `Some Services require payment of fees. All fees are quoted in US dollars unless otherwise specified. Subscription fees are billed in advance on a monthly or annual basis. You authorize us to charge your designated payment method for all applicable fees. Subscriptions automatically renew unless cancelled at least 24 hours before the renewal date. You may cancel your subscription at any time through your account settings or by contacting support. No refunds will be provided for partial months.`
  },
  {
    id: 'ai-disclaimer',
    title: '5. AI Output Disclaimer',
    icon: AlertTriangle,
    content: `IMPORTANT: Verbito.ai uses artificial intelligence to generate content. AI-generated outputs may contain errors, inaccuracies, or biases. You should never rely solely on AI-generated content for critical decisions without independent verification. We make no representations or warranties about the accuracy, reliability, or suitability of AI-generated outputs for any specific purpose. Always review and validate AI outputs before use, especially for legal, medical, financial, or professional applications.`
  },
  {
    id: 'content',
    title: '6. User Content and Conduct',
    icon: Shield,
    content: `You retain ownership of any content you submit to the Platform ("User Content"). By submitting User Content, you grant us a worldwide, non-exclusive, royalty-free license to use, process, and display your content solely for the purpose of providing the Services. You agree not to use the Platform for any unlawful purpose or to generate content that is harmful, abusive, defamatory, discriminatory, or otherwise objectionable. We reserve the right to remove any User Content that violates these Terms.`
  },
  {
    id: 'privacy',
    title: '7. Privacy and Data Protection',
    icon: Lock,
    content: `Your use of the Platform is subject to our Privacy Policy, which is incorporated into these Terms by reference. We collect and process personal data in accordance with applicable privacy laws including GDPR and CCPA. For details on what data we collect, how we use it, and your rights, please review our Privacy Policy.`
  },
  {
    id: 'ip',
    title: '8. Intellectual Property',
    icon: Scale,
    content: `The Platform, including all software, designs, text, graphics, logos, and other content provided by Verbito.ai, is owned by Quantara LLC or our licensors and is protected by intellectual property laws. You may not copy, modify, distribute, or create derivative works of our content without express written permission. AI-generated outputs are provided "as-is" and we make no claim of ownership over outputs generated for you. However, we do not guarantee that AI outputs do not infringe third-party rights.`
  },
  {
    id: 'prohibited',
    title: '9. Prohibited Uses',
    icon: Ban,
    content: `You may not use the Platform to: (a) generate content that violates any law or regulation; (b) create malware, viruses, or harmful code; (c) impersonate any person or entity; (d) engage in unauthorized automated access or scraping; (e) circumvent usage limits or security measures; (f) generate sexually explicit content involving minors; (g) create disinformation or deepfakes intended to deceive; or (h) infringe intellectual property rights. Violation may result in immediate account termination.`
  },
  {
    id: 'liability',
    title: '10. Limitation of Liability',
    icon: Gavel,
    content: `TO THE MAXIMUM EXTENT PERMITTED BY LAW, QUANTARA LLC, VERBITO.AI, AND THEIR AFFILIATES SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOST PROFITS, ARISING FROM YOUR USE OF THE PLATFORM. OUR TOTAL LIABILITY FOR ANY CLAIM SHALL NOT EXCEED THE AMOUNT YOU PAID TO US IN THE 12 MONTHS PRECEDING THE CLAIM. THIS LIMITATION APPLIES REGARDLESS OF THE LEGAL THEORY ASSERTED.`
  },
  {
    id: 'termination',
    title: '11. Termination',
    icon: RefreshCw,
    content: `You may terminate your account at any time by following the instructions in your account settings. We may suspend or terminate your access to the Platform at any time, with or without cause, and with or without notice. Upon termination, your right to use the Platform ceases immediately. Provisions of these Terms that by their nature should survive termination shall survive.`
  },
  {
    id: 'contact',
    title: '12. Contact Information',
    icon: Mail,
    content: `If you have any questions about these Terms, please contact Quantara LLC at verbito.ai@wearequantara.com or through our Contact page. Our registered address is Sharjah Media City, Sharjah, UAE. These Terms are governed by the laws of the United Arab Emirates. Any disputes arising under these Terms shall be subject to the competent courts of the UAE, unless otherwise required by applicable consumer protection law.`
  },
];

export default function Terms() {
  return (
    <>
      <SEOHead
        title="Terms of Service — Verbito.ai"
        description="Read the Terms of Service for Verbito.ai. Learn about our policies, your rights, and responsibilities when using our AI prompt platform."
      />
      <section className="pt-28 pb-16 bg-gray-50 dark:bg-gray-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h1 className="font-heading font-bold text-4xl text-gray-900 dark:text-white mb-4">
              Terms of Service
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Last updated: January 1, 2026. Please read these terms carefully before using Verbito.ai.
            </p>
          </motion.div>

          {/* AI Disclaimer Banner */}
          <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800 rounded-xl p-5 mb-10 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-amber-900 dark:text-amber-400 mb-1">
                AI-Generated Content Notice
              </p>
              <p className="text-sm text-amber-800 dark:text-amber-300">
                Verbito.ai uses artificial intelligence to generate content. AI outputs may contain errors, 
                inaccuracies, or biases. Always review and validate AI-generated content before use. 
                See Section 5 for our full AI disclaimer.
              </p>
            </div>
          </div>

          {/* Table of Contents */}
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 mb-10">
            <h2 className="font-semibold text-gray-900 dark:text-white mb-4">Table of Contents</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
                >
                  <s.icon className="w-3.5 h-3.5" />
                  {s.title}
                </a>
              ))}
            </div>
          </div>

          {/* Sections */}
          <div className="space-y-10">
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
                  <h2 className="font-heading font-bold text-lg text-gray-900 dark:text-white">
                    {s.title}
                  </h2>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  {s.content}
                </p>
              </motion.section>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
