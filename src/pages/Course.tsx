import { usePageTranslations } from '@/hooks/useTranslation';
import { common as cm } from '@/lib/translations/common';
import { course as cst } from '@/lib/translations/course';
import { motion } from 'framer-motion';
import {
AlertTriangle,
ArrowRight,
Award,
BarChart3,
BookOpen,
Briefcase,
Check,
CheckCircle2,
ChevronDown,ChevronUp,
Clock,
Code2,
Download,
FileText,
Frown,
Gift,
Headphones,
HelpCircle,
Lock,
MessageCircle,
Palette,
PlayCircle,
RefreshCw,
Shield,
Shuffle,
Sparkles,
Users,
Zap
} from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/shared/SEOHead';
import { createCourseCheckoutSession } from '../services/stripe';
import {
audienceCards,bonuses,
courseModules,
faqs,
painPoints,
totalBonusValue,
transformations
} from '../lib/data/course-data';

const iconMap: Record<string, React.ReactNode> = {
  frown: <Frown className="w-6 h-6" />,
  shuffle: <Shuffle className="w-6 h-6" />,
  clock: <Clock className="w-6 h-6" />,
  alert: <AlertTriangle className="w-6 h-6" />,
  briefcase: <Briefcase className="w-6 h-6" />,
  code: <Code2 className="w-6 h-6" />,
  trending: <BarChart3 className="w-6 h-6" />,
  palette: <Palette className="w-6 h-6" />,
};

const courseLandingFallbacks: Record<string, string> = {
  applePay: 'Apple Pay',
  bestValueBundle: 'Best Value Bundle',
  bonusValue: 'Bonus value',
  bonusesText: 'Enroll today and get ${totalBonusValue} in bonuses included with your purchase.',
  bundleText: 'Get the full course, templates, frameworks, and lifetime updates in one payment.',
  bundleTitle: 'Master Prompt Engineering Bundle',
  byTheEnd: 'By the end of this course',
  certificateCompletion: 'Certificate of completion',
  communityAccess: 'Community access',
  completeCurriculum: 'Complete Curriculum',
  completeCurriculumText: '{totalLessons} lessons across {totalDuration} of practical prompt engineering training.',
  courseDescription: 'A practical course for professionals who want to write better AI prompts and build repeatable workflows.',
  courseValue: 'Course value',
  creditCard: 'Credit card',
  dayGuarantee: '14-day guarantee',
  doesThisSoundFamiliar: 'Does this sound familiar?',
  enrollNow: 'Enroll Now',
  enrollToday: 'Enroll Today',
  enrollTodayText: 'Get instant access to the full course and all bonuses.',
  familiarText: 'You know AI can help, but your prompts still produce inconsistent, generic, or hard-to-use results.',
  faq: 'FAQ',
  finalCta: 'Start Mastering AI Prompts Today',
  finalCtaText: 'Join Verbito and build prompt skills you can use across business, marketing, content, research, and automation.',
  freeBonuses: 'Free Bonuses',
  getBundle: 'Get the Bundle',
  getInstantAccess: 'Get Instant Access',
  googlePay: 'Google Pay',
  heroText: 'Learn the frameworks behind high-performing prompts for business, marketing, content, research, coding, automation, and creative AI.',
  heroTitle: 'Master Prompt Engineering',
  heroTitleGradient: 'from Beginner to Pro',
  instantAccess: 'Instant access',
  lifetimeUpdates: 'Lifetime updates',
  moneyBack: 'Money-back guarantee',
  moneyBackText: 'Try the course for 14 days. If it is not useful, request a refund.',
  moneyBackTitle: 'Risk-free enrollment',
  oneTimeNoSub: 'One-time payment. No subscription.',
  oneTimePayment: 'One-time payment',
  payPal: 'PayPal',
  previewCurriculum: 'Preview Curriculum',
  saveAmount: 'Save today',
  secureCheckout: 'Secure checkout',
  securePayment: 'Secure payment',
  testimonialNote: 'Student results',
  testimonialNoteText: 'Built for creators, marketers, operators, consultants, and teams who use AI in real work.',
  totalValue: 'Total value',
  viewPlans: 'View plans',
  whoFor: 'Who this course is for',
  whoForText: 'Anyone who wants consistent, professional AI outputs without guessing what to type.',
  yourPrice: 'Your price',
  yourTransformationBadge: 'Your transformation',
};

function CourseFaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden bg-white dark:bg-gray-900">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
      >
        <span className="font-medium text-gray-900 dark:text-white pr-4 text-left">{q}</span>
        {open ? <ChevronUp className="w-5 h-5 text-gray-400 shrink-0" /> : <ChevronDown className="w-5 h-5 text-gray-400 shrink-0" />}
      </button>
      {open && (
        <div className="px-5 pb-5">
          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{a}</p>
        </div>
      )}
    </div>
  );
}

export default function Course() {
  const tt = { ...courseLandingFallbacks, ...usePageTranslations(cst) };
  const ct = usePageTranslations(cm);
  const [openModule, setOpenModule] = useState<number | null>(0);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  const startCourseCheckout = async () => {
    setCheckoutLoading(true);
    setCheckoutError(null);
    try {
      const { url } = await createCourseCheckoutSession();
      window.location.assign(url);
    } catch (error) {
      setCheckoutError(error instanceof Error ? error.message : 'Unable to start course checkout.');
    } finally {
      setCheckoutLoading(false);
    }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: (i: number) => ({
      opacity: 1, y: 0,
      transition: { delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
    }),
  };

  const totalLessons = courseModules.reduce((acc, m) => acc + m.lessons.length, 0);
  const totalDuration = courseModules.reduce((acc, m) => acc + parseInt(m.duration), 0);

  return (
    <>
      <SEOHead
        title={`${tt.courseTitle} Course — Verbito.ai`}
        description={tt.courseDescription}
        canonicalUrl="https://verbito.ai/course/master-prompt-engineering"
        ogImage="/og-course.jpg"
        schema={{
          '@context': 'https://schema.org',
          '@type': 'Course',
          name: tt.courseTitle,
          description: tt.courseDescription,
          provider: { '@type': 'Organization', name: 'Quantara LLC', url: 'https://verbito.ai' },
        }}
      />

      {/* 1. HERO */}
      <section className="relative pt-28 pb-20 bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#4c1d95_0%,_transparent_50%)] opacity-30" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0}>
              <div className="inline-flex items-center gap-2 bg-violet-600/20 text-violet-300 rounded-full px-4 py-1.5 text-sm font-medium mb-6">
                <BookOpen className="w-4 h-4" />
                {tt.courseSubtitle}
              </div>
              <h1 className="font-heading font-bold text-4xl sm:text-5xl text-white mb-6 leading-tight">
                {tt.heroTitle}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">
                  {tt.heroTitleGradient}
                </span>
              </h1>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                {tt.heroText}
              </p>
              <div className="flex flex-wrap gap-3 mb-8">
                {[
                  { icon: PlayCircle, label: `${totalLessons} ${tt.lessons}` },
                  { icon: Clock, label: `${totalDuration}+ Minutes` },
                  { icon: Users, label: '3,000+ Students' },
                  { icon: Award, label: tt.certificate },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-1.5 text-sm text-gray-400">
                    <Icon className="w-4 h-4 text-violet-400" />
                    {label}
                  </div>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  type="button"
                  onClick={startCourseCheckout}
                  disabled={checkoutLoading}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-violet-600 text-white rounded-xl font-semibold text-lg hover:bg-violet-700 transition-colors shadow-lg shadow-violet-600/25"
                >
                  <Zap className="w-5 h-5" />
                  {checkoutLoading ? 'Opening checkout...' : tt.enrollNow}
                </button>
                <button
                  onClick={() => document.getElementById('curriculum')?.scrollIntoView({ behavior: 'smooth' })}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-gray-600 text-gray-300 rounded-xl font-medium hover:bg-gray-800 transition-colors"
                >
                  <BookOpen className="w-5 h-5" />
                  {tt.previewCurriculum}
                </button>
              </div>
              {checkoutError && (
                <p className="mt-4 rounded-lg border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
                  {checkoutError}
                </p>
              )}
              <div className="flex items-center gap-4 mt-6 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <Shield className="w-4 h-4 text-emerald-400" />
                  {tt.dayGuarantee}
                </span>
                <span className="flex items-center gap-1">
                  <Lock className="w-4 h-4 text-gray-500" />
                  {tt.securePayment}
                </span>
              </div>
            </motion.div>

            {/* Course Card */}
            <motion.div
              variants={fadeUp} initial="hidden" animate="visible" custom={1}
              className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-8"
            >
              <p className="mb-6 text-sm font-medium text-violet-300">10 modules · 50 lessons · Lifetime access</p>
              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-heading font-bold text-white">$197</span>
                  <span className="text-gray-500 line-through text-lg">$497</span>
                  <span className="bg-emerald-500/20 text-emerald-400 text-xs font-semibold px-2 py-1 rounded-full">60% OFF</span>
                </div>
                <p className="text-gray-400 text-sm mt-2">{tt.oneTimePayment}</p>
              </div>
              <div className="space-y-3 mb-6">
                {[
                  `${totalLessons} video lessons across 10 modules`,
                  `$${totalBonusValue}+ in premium bonuses`,
                  tt.communityAccess,
                  tt.certificateCompletion,
                  tt.lifetimeUpdates,
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 text-sm text-gray-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={startCourseCheckout}
                disabled={checkoutLoading}
                className="block w-full text-center py-4 bg-violet-600 text-white rounded-xl font-semibold hover:bg-violet-700 transition-colors"
              >
                {checkoutLoading ? 'Opening checkout...' : tt.getInstantAccess}
              </button>
              <p className="text-center text-xs text-gray-500 mt-3">
                {tt.moneyBack}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. PAIN POINTS */}
      <section className="py-20 bg-gray-50 dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl text-gray-900 dark:text-white mb-4">
              {tt.doesThisSoundFamiliar}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {tt.familiarText}
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {painPoints.map((p, i) => (
              <motion.div
                key={p.title}
                variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i + 1}
                className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800 text-center"
              >
                <div className="w-12 h-12 bg-rose-100 dark:bg-rose-900/20 rounded-xl flex items-center justify-center text-rose-500 mx-auto mb-4">
                  {iconMap[p.icon]}
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{p.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{p.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. TRANSFORMATION */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-emerald-100 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 rounded-full px-4 py-1.5 text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4" />
              {tt.yourTransformationBadge}
            </div>
            <h2 className="font-heading font-bold text-3xl text-gray-900 dark:text-white mb-4">
              {tt.byTheEnd}
            </h2>
          </motion.div>
          <div className="max-w-3xl mx-auto space-y-4">
            {transformations.map((t, i) => (
              <motion.div
                key={i}
                variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i + 1}
                className="flex items-start gap-4 bg-emerald-50/50 dark:bg-emerald-900/10 rounded-xl p-5 border border-emerald-100 dark:border-emerald-900/20"
              >
                <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <p className="text-gray-800 dark:text-gray-200 font-medium">{t}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. WHO IT'S FOR */}
      <section className="py-20 bg-gray-50 dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl text-gray-900 dark:text-white mb-4">
              {tt.whoFor}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {tt.whoForText}
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {audienceCards.map((a, i) => (
              <motion.div
                key={a.title}
                variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i + 1}
                className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800"
              >
                <div className="w-12 h-12 bg-violet-100 dark:bg-violet-900/20 rounded-xl flex items-center justify-center text-violet-600 dark:text-violet-400 mb-4">
                  {iconMap[a.icon]}
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{a.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{a.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CURRICULUM */}
      <section id="curriculum" className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl text-gray-900 dark:text-white mb-4">
              {tt.completeCurriculum}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {tt.completeCurriculumText.replace('{totalLessons}', String(totalLessons)).replace('{totalDuration}', String(totalDuration))}
            </p>
          </motion.div>
          <div className="space-y-3">
            {courseModules.map((mod, i) => (
              <motion.div
                key={mod.id}
                variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i + 1}
                className="border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden bg-white dark:bg-gray-900"
              >
                <button
                  onClick={() => setOpenModule(openModule === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-violet-100 dark:bg-violet-900/20 rounded-lg flex items-center justify-center text-violet-600 dark:text-violet-400 font-heading font-bold text-sm">
                      {mod.id}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">{mod.title}</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{mod.lessons.length} {tt.lessons} &bull; {mod.duration}</p>
                    </div>
                  </div>
                  {openModule === i ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                </button>
                {openModule === i && (
                  <div className="border-t border-gray-200 dark:border-gray-800">
                    <p className="px-5 pt-4 pb-2 text-sm text-gray-600 dark:text-gray-400">{mod.description}</p>
                    {mod.lessons.map((lesson) => (
                      <div
                        key={lesson.id}
                        className="flex items-center justify-between px-5 py-3 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <PlayCircle className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-700 dark:text-gray-300">{lesson.title}</span>
                        </div>
                        <span className="text-xs text-gray-500">{lesson.duration}</span>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. BONUSES */}
      <section className="py-20 bg-gray-50 dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-amber-100 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 rounded-full px-4 py-1.5 text-sm font-medium mb-4">
              <Gift className="w-4 h-4" />
              {tt.freeBonuses}
            </div>
            <h2 className="font-heading font-bold text-3xl text-gray-900 dark:text-white mb-4">
              Enroll Today and Get These Bonuses
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {tt.bonusesText.replace('{totalBonusValue}', String(totalBonusValue))}
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bonuses.map((b, i) => (
              <motion.div
                key={b.title}
                variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i + 1}
                className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800 relative"
              >
                <div className="absolute top-4 right-4 text-xs font-semibold text-gray-400 line-through">
                  ${b.value}
                </div>
                <div className="w-10 h-10 bg-amber-100 dark:bg-amber-900/20 rounded-lg flex items-center justify-center text-amber-600 dark:text-amber-400 mb-3">
                  {i === 0 && <FileText className="w-5 h-5" />}
                  {i === 1 && <Users className="w-5 h-5" />}
                  {i === 2 && <MessageCircle className="w-5 h-5" />}
                  {i === 3 && <RefreshCw className="w-5 h-5" />}
                  {i === 4 && <Download className="w-5 h-5" />}
                  {i === 5 && <Zap className="w-5 h-5" />}
                  {i === 6 && <Sparkles className="w-5 h-5" />}
                  {i === 7 && <Headphones className="w-5 h-5" />}
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">{b.title}</h3>
                <p className="text-xs text-gray-600 dark:text-gray-400">{b.description}</p>
                <div className="mt-3 inline-block bg-emerald-100 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 text-xs font-semibold px-2 py-1 rounded-full">
                  {ct.free?.toUpperCase()}
                </div>
              </motion.div>
            ))}
          </div>
          {/* Value Stack */}
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={9}
            className="mt-12 max-w-md mx-auto bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6"
          >
            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>{tt.courseValue}</span>
                <span className="line-through">$497</span>
              </div>
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>{tt.bonusValue}</span>
                <span className="line-through">${totalBonusValue}</span>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-800 pt-3 flex justify-between font-semibold text-lg">
                <span className="text-gray-900 dark:text-white">{tt.totalValue}</span>
                <span className="text-gray-900 dark:text-white line-through">${497 + totalBonusValue}</span>
              </div>
              <div className="flex justify-between items-center text-emerald-600 dark:text-emerald-400 font-heading font-bold text-xl pt-1">
                <span>{tt.yourPrice}</span>
                <span>$197</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 7. PRICING */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0}>
            <h2 className="font-heading font-bold text-4xl mb-4">{tt.enrollToday}</h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              {tt.enrollTodayText}
            </p>
            <div className="bg-gray-800/50 rounded-2xl border border-gray-700/50 p-8 max-w-md mx-auto mb-8">
              <div className="flex items-baseline justify-center gap-3 mb-2">
                <span className="text-6xl font-heading font-bold">$197</span>
                <span className="text-gray-500 text-lg line-through">$497</span>
              </div>
              <p className="text-gray-400 text-sm mb-6">{tt.oneTimeNoSub}</p>
              <div className="space-y-2 mb-6 text-left">
                {[
                  `${totalLessons} video lessons across 10 modules`,
                  `$${totalBonusValue}+ in premium bonuses`,
                  tt.certificateCompletion,
                  tt.communityAccess,
                  tt.lifetimeUpdates,
                  tt.moneyBack,
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-gray-300">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={startCourseCheckout}
                disabled={checkoutLoading}
                className="block w-full py-4 bg-violet-600 text-white rounded-xl font-semibold hover:bg-violet-700 transition-colors shadow-lg shadow-violet-600/25 mb-3"
              >
                {checkoutLoading ? 'Opening checkout...' : tt.enrollNow}
              </button>
              <div className="flex items-center justify-center gap-6 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <Shield className="w-3.5 h-3.5" />
                  {tt.dayGuarantee}
                </span>
                <span className="flex items-center gap-1">
                  <Lock className="w-3.5 h-3.5" />
                  {tt.secureCheckout}
                </span>
              </div>
            </div>
            {/* Payment Options */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1"><Check className="w-3.5 h-3.5 text-emerald-400" /> {tt.creditCard}</span>
              <span className="flex items-center gap-1"><Check className="w-3.5 h-3.5 text-emerald-400" /> {tt.payPal}</span>
              <span className="flex items-center gap-1"><Check className="w-3.5 h-3.5 text-emerald-400" /> {tt.applePay}</span>
              <span className="flex items-center gap-1"><Check className="w-3.5 h-3.5 text-emerald-400" /> {tt.googlePay}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 8. BUNDLE OFFER */}
      <section className="py-20 bg-violet-50 dark:bg-violet-950/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0}
            className="bg-white dark:bg-gray-900 rounded-2xl border-2 border-violet-200 dark:border-violet-800 p-8 text-center"
          >
            <div className="inline-flex items-center gap-2 bg-violet-100 dark:bg-violet-900/20 text-violet-700 dark:text-violet-400 rounded-full px-4 py-1.5 text-sm font-medium mb-4">
              <Zap className="w-4 h-4" />
              {tt.bestValueBundle}
            </div>
            <h2 className="font-heading font-bold text-2xl text-gray-900 dark:text-white mb-4">
              {tt.bundleTitle}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-xl mx-auto">
              {tt.bundleText}
            </p>
            <div className="flex items-baseline justify-center gap-4 mb-6">
              <span className="text-4xl font-heading font-bold text-gray-900 dark:text-white">$346</span>
              <span className="text-gray-500 line-through">$694</span>
              <span className="bg-amber-100 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 text-sm font-semibold px-3 py-1 rounded-full">
                {tt.saveAmount}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/pricing"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-violet-600 text-white rounded-xl font-semibold hover:bg-violet-700 transition-colors"
              >
                {tt.getBundle}
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/pricing"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                {tt.viewPlans}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 9. FAQ */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl text-gray-900 dark:text-white mb-4">
              {tt.faq}
            </h2>
          </motion.div>
          <div className="space-y-3">
            {faqs.map((faq) => (
              <CourseFaqItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* 10. REFUND POLICY */}
      <section className="py-16 bg-emerald-50 dark:bg-emerald-950/20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0}>
            <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h3 className="font-heading font-bold text-2xl text-gray-900 dark:text-white mb-3">
              {tt.moneyBackTitle}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed max-w-xl mx-auto">
              {tt.moneyBackText}
            </p>
          </motion.div>
        </div>
      </section>

      {/* 11. FINAL CTA */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0}>
            <h2 className="font-heading font-bold text-4xl mb-4">
              {tt.finalCta}
            </h2>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto">
              {tt.finalCtaText}
            </p>
            <button
              type="button"
              onClick={startCourseCheckout}
              disabled={checkoutLoading}
              className="inline-flex items-center gap-2 px-10 py-5 bg-violet-600 text-white rounded-xl font-semibold text-lg hover:bg-violet-700 transition-colors shadow-lg shadow-violet-600/25"
            >
              <Zap className="w-5 h-5" />
              {checkoutLoading ? 'Opening checkout...' : tt.enrollNow}
            </button>
            <div className="flex items-center justify-center gap-6 mt-6 text-sm text-gray-500">
              <span className="flex items-center gap-1"><Shield className="w-4 h-4 text-emerald-400" /> {tt.dayGuarantee}</span>
              <span className="flex items-center gap-1"><Lock className="w-4 h-4 text-gray-500" /> {tt.securePayment}</span>
              <span className="flex items-center gap-1"><Clock className="w-4 h-4 text-gray-500" /> {tt.instantAccess}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 12. HONEST NOTE */}
      <section className="py-12 bg-gray-100 dark:bg-gray-900">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <div className="flex items-start gap-3 bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 text-left">
            <HelpCircle className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white text-sm mb-1">{tt.testimonialNote}</h4>
              <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                {tt.testimonialNoteText}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
