import { usePageTranslations } from '@/hooks/useTranslation';
import { about as at } from '@/lib/translations/about';
import { motion } from 'framer-motion';
import {
ArrowRight,
Award,
BookOpen,
Code2,
Globe,
Heart,
Lightbulb,
Shield,
Sparkles,
Target,
TrendingUp,
Users,
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
    {
      title: tt.value5Title,
      description: tt.value5Desc,
      icon: Users,
    },
    {
      title: tt.value6Title,
      description: tt.value6Desc,
      icon: TrendingUp,
    },
  ];

  const stats = [
    { value: '200+', label: tt.statTemplates },
    { value: '50', label: tt.statLessons },
    { value: '12K+', label: tt.statReaders },
    { value: '3K+', label: tt.statStudents },
  ];

  const milestones = [
    { year: '2024', title: 'Verbito Founded', desc: 'Started with a simple mission: make prompt engineering accessible.' },
    { year: '2025', title: 'Prompt Library Launch', desc: 'Released our first 100 prompt templates across 15 categories.' },
    { year: '2025', title: 'Course Released', desc: 'Launched the Master Prompt Engineering course with 10 modules.' },
    { year: '2026', title: 'Full Platform', desc: 'Reached 12,000+ active users with comprehensive AI tools and resources.' },
  ];

  return (
    <>
      <SEOHead
        title={tt.pageTitle}
        description="Learn about Verbito.ai's mission to make prompt engineering accessible. Meet our values, milestones, and the team behind the platform."
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

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-20"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 text-center">
                <p className="text-3xl font-heading font-bold text-violet-600 dark:text-violet-400 mb-1">{stat.value}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
              </div>
            ))}
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

          {/* Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <div className="text-center mb-10">
              <h2 className="font-heading font-bold text-3xl text-gray-900 dark:text-white mb-4">{tt.journey}</h2>
              <p className="text-gray-600 dark:text-gray-400">{tt.journeySubtitle}</p>
            </div>
            <div className="max-w-2xl mx-auto">
              {milestones.map((m, i) => (
                <motion.div
                  key={m.year}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-4 mb-8 last:mb-0"
                >
                  <div className="w-16 h-16 bg-violet-100 dark:bg-violet-900/20 rounded-xl flex items-center justify-center shrink-0">
                    <span className="font-heading font-bold text-violet-600 dark:text-violet-400">{m.year}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{m.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{m.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Team Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="font-heading font-bold text-3xl text-gray-900 dark:text-white mb-4">{tt.team}</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-10">
              {tt.teamText}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
              {[
                { role: tt.roleFounder, icon: Lightbulb, desc: tt.roleFounderDesc },
                { role: tt.roleProduct, icon: Code2, desc: tt.roleProductDesc },
                { role: tt.roleEducator, icon: BookOpen, desc: tt.roleEducatorDesc },
              ].map((t) => (
                <div key={t.role} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
                  <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-3">
                    <t.icon className="w-7 h-7 text-gray-500" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{t.role}</h3>
                  <p className="text-sm text-gray-500">{t.desc}</p>
                </div>
              ))}
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
