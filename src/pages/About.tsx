import { usePageTranslations } from '@/hooks/useTranslation';
import { about as at } from '@/lib/translations/about';
import { motion } from 'framer-motion';
import {
ArrowRight,
Award,
Building2,
Globe,
Heart,
Mail,
MapPin,
Shield,
Sparkles,
Target,
Zap
} from 'lucide-react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/shared/SEOHead';

export default function About() {
  const tt = usePageTranslations(at);

  const values = [
    {
      title: tt.value1Title,
      description: tt.value1Desc,
      icon: Globe,
    },
    {
      title: tt.value2Title,
      description: tt.value2Desc,
      icon: Award,
    },
    {
      title: tt.value3Title,
      description: tt.value3Desc,
      icon: Sparkles,
    },
    {
      title: tt.value4Title,
      description: tt.value4Desc,
      icon: Shield,
    },
  ];

  return (
    <>
      <SEOHead
        title={tt.pageTitle}
        description="Learn about Verbito.ai's mission, values, and the Quantara LLC company behind the platform."
        canonicalUrl="https://verbito.ai/about"
        schema={{
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'Quantara LLC',
          url: 'https://verbito.ai',
          email: 'verbito.ai@wearequantara.com',
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Sharjah Media City',
            addressLocality: 'Sharjah',
            addressCountry: 'AE',
          },
        }}
      />

      {/* Hero */}
      <section className="pt-28 pb-16 bg-gray-50 dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-violet-100 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300 rounded-full px-4 py-1.5 text-sm font-medium mb-4">
              <Heart className="w-4 h-4" />
              {tt.ourStory}
            </div>
            <h1 className="font-heading font-bold text-4xl sm:text-5xl text-gray-900 dark:text-white mb-6">
              {tt.heroTitle}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-600">
                {tt.heroTitleGradient}
              </span>
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
              {tt.heroText}
            </p>
          </motion.div>

          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-violet-50 dark:bg-violet-950/20 rounded-2xl border border-violet-200 dark:border-violet-800 p-8 sm:p-12 text-center mb-20"
          >
            <div className="max-w-2xl mx-auto">
              <div className="w-16 h-16 bg-violet-100 dark:bg-violet-900/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Target className="w-8 h-8 text-violet-600" />
              </div>
              <h2 className="font-heading font-bold text-2xl text-gray-900 dark:text-white mb-4">{tt.mission}</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {tt.missionText}
              </p>
            </div>
          </motion.div>

          {/* Values */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <div className="text-center mb-10">
              <h2 className="font-heading font-bold text-3xl text-gray-900 dark:text-white mb-4">{tt.values}</h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
                {tt.valuesSubtitle}
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {values.map((v, i) => (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6"
                >
                  <div className="w-10 h-10 bg-violet-100 dark:bg-violet-900/20 rounded-lg flex items-center justify-center text-violet-600 dark:text-violet-400 mb-4">
                    <v.icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{v.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{v.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Company details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <div className="mx-auto max-w-4xl border-y border-gray-200 py-10 dark:border-gray-800">
              <div className="mb-8 max-w-2xl">
                <p className="mb-2 text-sm font-semibold uppercase text-violet-600">Company</p>
                <h2 className="mb-3 font-heading text-3xl font-bold text-gray-900 dark:text-white">
                  Built and operated by Quantara LLC
                </h2>
                <p className="leading-relaxed text-gray-600 dark:text-gray-400">
                  Verbito is a Quantara LLC product developed in the UAE to make practical prompt engineering more accessible to individuals and teams.
                </p>
              </div>
              <dl className="grid gap-6 sm:grid-cols-3">
                <div>
                  <dt className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-white">
                    <Building2 className="h-4 w-4 text-violet-600" /> Legal entity
                  </dt>
                  <dd className="text-sm text-gray-600 dark:text-gray-400">Quantara LLC</dd>
                </div>
                <div>
                  <dt className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-white">
                    <MapPin className="h-4 w-4 text-violet-600" /> Registered address
                  </dt>
                  <dd className="text-sm text-gray-600 dark:text-gray-400">Sharjah Media City, Sharjah, UAE</dd>
                </div>
                <div>
                  <dt className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-white">
                    <Mail className="h-4 w-4 text-violet-600" /> Contact
                  </dt>
                  <dd className="text-sm">
                    <a className="text-violet-600 hover:underline dark:text-violet-400" href="mailto:verbito.ai@wearequantara.com">
                      verbito.ai@wearequantara.com
                    </a>
                  </dd>
                </div>
              </dl>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gray-900 rounded-2xl p-8 sm:p-12 text-center"
          >
            <h2 className="font-heading font-bold text-2xl text-white mb-4">
              {tt.ctaTitle}
            </h2>
            <p className="text-gray-400 mb-6 max-w-lg mx-auto">
              {tt.ctaText}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/prompt-generator"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-violet-600 text-white rounded-xl font-semibold hover:bg-violet-700 transition-colors"
              >
                <Zap className="w-5 h-5" />
                {tt.ctaGenerator}
              </Link>
              <Link
                to="/course/master-prompt-engineering"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-gray-600 text-gray-300 rounded-xl font-medium hover:bg-gray-800 transition-colors"
              >
                {tt.ctaCourse}
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
