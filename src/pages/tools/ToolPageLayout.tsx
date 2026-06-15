import { usePageTranslations } from '@/hooks/useTranslation';
import { generator as gt } from '@/lib/translations/generator';
import type { Complexity,PromptGenerationInput,PromptGenerationResult } from '@/types';
import { AnimatePresence,motion } from 'framer-motion';
import {
ArrowRight,
Check,ChevronRight,
Copy,
Layers,
Loader2,
MessageSquare,
Shield,
Sparkles,
Star,
TrendingUp,
Volume2,
Zap
} from 'lucide-react';
import { useCallback,useState } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../../components/shared/SEOHead';
import { generatePrompt } from '../../services/openai';
import { captureLead } from '../../services/supabase';

/* ------------------------------------------------------------------ */
/*  TYPES                                                              */
/* ------------------------------------------------------------------ */

interface ToolPageLayoutProps {
  slug: string;
  title?: string;
  description?: string;
  h1: string;
  subtitle: string;
  category: string;
  defaultOutputType: string;
  seoTitle: string;
  seoDescription: string;
  ogImage?: string;
  icon: React.ElementType;
  iconColor: string;
  gradientFrom: string;
  gradientTo: string;
  educationContent: {
    whatIs: string;
    whyUse: string;
    bestPractices: string[];
    tips: string[];
    examples: { title: string; description: string }[];
  };
  faqs?: { question: string; answer: string }[];
}

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const tones = ['Professional', 'Friendly', 'Persuasive', 'Academic', 'Concise', 'Creative', 'Bold'];
const complexities = ['Beginner', 'Intermediate', 'Expert'];
const outputTypes = [
  'Blog Post', 'Email', 'Landing Page', 'Social Media Post', 'Code',
  'Analysis', 'Lesson Plan', 'Strategy', 'Image Prompt', 'Video Prompt', 'Sales Script', 'Custom'
];

/* ------------------------------------------------------------------ */
/*  COMPONENT                                                          */
/* ------------------------------------------------------------------ */

export default function ToolPageLayout({
  slug,
  h1,
  subtitle,
  category,
  defaultOutputType,
  seoTitle,
  seoDescription,
  ogImage,
  icon: Icon,
  iconColor,
  gradientFrom,
  gradientTo,
  educationContent,
  faqs = [],
}: ToolPageLayoutProps) {
  const tt = usePageTranslations(gt);

  /* Form state */
  const [goal, setGoal] = useState('');
  const [outputType, setOutputType] = useState(defaultOutputType);
  const [tone, setTone] = useState('Professional');
  const [complexity, setComplexity] = useState('Intermediate');
  const [context, setContext] = useState('');
  const [audience, setAudience] = useState('');

  /* Result state */
  const [generating, setGenerating] = useState(false);
  const [result, setResult] = useState<PromptGenerationResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [showGate, setShowGate] = useState(false);
  const [email, setEmail] = useState('');
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [generationsLeft, setGenerationsLeft] = useState(2);

  const handleGenerate = useCallback(async () => {
    if (!goal.trim()) return;
    if (generationsLeft <= 0 && !emailSubmitted) {
      setShowGate(true);
      return;
    }

    setGenerating(true);
    setResult(null);

    try {
      const input: PromptGenerationInput = {
        goal,
        category: category.toLowerCase(),
        outputType: outputType.toLowerCase(),
        targetModel: 'chatgpt',
        language: 'English',
        context: context || undefined,
        audience: audience || undefined,
        tone: tone.toLowerCase(),
        complexity: complexity.toLowerCase() as Complexity,
      };

      const res = await generatePrompt(input);
      setResult(res);
      setGenerationsLeft(prev => prev - 1);
      if (generationsLeft <= 1) {
        setShowGate(true);
      }
    } catch {
      // Silent fail
    } finally {
      setGenerating(false);
    }
  }, [goal, category, outputType, tone, complexity, context, audience, generationsLeft, emailSubmitted]);

  const handleCopy = () => {
    if (result?.finalPrompt) {
      navigator.clipboard.writeText(result.finalPrompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email.includes('@')) {
      setEmailSubmitted(true);
      setGenerationsLeft(10);
      try {
        await captureLead(email, slug, 'extra-generations');
      } catch (error) {
        console.warn('Unable to capture lead', error);
      }
    }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } }),
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-600';
    if (score >= 60) return 'text-amber-600';
    return 'text-rose-600';
  };

  return (
    <>
      <SEOHead title={seoTitle} description={seoDescription} ogImage={ogImage} />

      <div className="min-h-[100dvh] pt-24 pb-16 bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* ── Hero ── */}
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0} className="text-center mb-8">
            <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${gradientFrom} ${gradientTo} mb-4`}>
              <Icon className={`w-7 h-7 ${iconColor}`} />
            </div>
            <h1 className="font-heading font-bold text-3xl sm:text-4xl text-gray-900 dark:text-white mb-3">
              {h1}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 max-w-lg mx-auto text-sm">
              {subtitle}
            </p>
          </motion.div>

          {/* ── Trust Signals ── */}
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={1} className="flex flex-wrap items-center justify-center gap-4 mb-8 text-xs text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1"><Shield className="w-3.5 h-3.5 text-emerald-500" /> {tt.noSignupRequired}</span>
            <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 text-amber-500" /> {tt.freeForever}</span>
            <span className="flex items-center gap-1"><Zap className="w-3.5 h-3.5 text-violet-500" /> {generationsLeft} {tt.generationsLeft}</span>
          </motion.div>

          {/* ── Generator Card ── */}
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={2} className="max-w-2xl mx-auto mb-16">
            <div className="bg-white/70 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/60 dark:border-gray-700/60 rounded-2xl p-6 lg:p-8 shadow-sm">
              {/* Goal */}
              <div className="mb-4">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
                  <MessageSquare className="w-4 h-4 text-violet-500" />
                  {tt.describeGoal}
                  <span className="text-rose-500">*</span>
                </label>
                <textarea
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  placeholder={tt.goalPlaceholder}
                  rows={4}
                  className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 resize-none dark:text-gray-200 dark:placeholder-gray-500 transition-all"
                />
              </div>

              {/* Settings */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <Layers className="w-3.5 h-3.5 text-gray-400" /> {tt.outputFormat}
                  </label>
                  <select
                    value={outputType}
                    onChange={(e) => setOutputType(e.target.value)}
                    className="w-full px-3 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:border-violet-500 dark:text-gray-200"
                  >
                    {outputTypes.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
                <div>
                  <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <Volume2 className="w-3.5 h-3.5 text-gray-400" /> {tt.chooseTone}
                  </label>
                  <select
                    value={tone}
                    onChange={(e) => setTone(e.target.value)}
                    className="w-full px-3 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:border-violet-500 dark:text-gray-200"
                  >
                    {tones.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>

              {/* Advanced toggle */}
              <div className="mb-4">
                <details className="group">
                  <summary className="flex items-center gap-2 text-sm font-medium text-violet-600 dark:text-violet-400 cursor-pointer hover:text-violet-700 transition-colors list-none">
                    <Sparkles className="w-4 h-4" />
                    {tt.advancedOptions}
                    <ChevronRight className="w-3.5 h-3.5 group-open:rotate-90 transition-transform" />
                  </summary>
                  <div className="mt-3 space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">{tt.complexity}</label>
                        <select
                          value={complexity}
                          onChange={(e) => setComplexity(e.target.value)}
                          className="w-full px-3 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:border-violet-500 dark:text-gray-200"
                        >
                          {complexities.map((c) => <option key={c} value={c}>{c}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">{tt.targetAudience}</label>
                        <input
                          value={audience}
                          onChange={(e) => setAudience(e.target.value)}
                          placeholder={tt.audiencePlaceholder}
                          className="w-full px-3 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:border-violet-500 dark:text-gray-200"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">{tt.additionalContext}</label>
                      <textarea
                        value={context}
                        onChange={(e) => setContext(e.target.value)}
                        placeholder={tt.contextPlaceholder}
                        rows={2}
                        className="w-full px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:border-violet-500 resize-none dark:text-gray-200"
                      />
                    </div>
                  </div>
                </details>
              </div>

              {/* Generate Button */}
              <button
                onClick={handleGenerate}
                disabled={!goal.trim() || generating}
                className="w-full py-3.5 bg-violet-600 text-white rounded-xl font-semibold hover:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-violet-600/20 flex items-center justify-center gap-2 text-sm"
              >
                {generating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
                {generating ? tt.generating : tt.generate}
              </button>
            </div>

            {/* ── Result ── */}
            <AnimatePresence>
              {result && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-6"
                >
                  {/* Quality Score Badge */}
                  <div className="flex items-center gap-3 mb-4 px-4 py-3 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-2">
                      <TrendingUp className={`w-5 h-5 ${getScoreColor(result.promptScore)}`} />
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">{tt.promptScore}: {result.promptScore}/100</span>
                    </div>
                    <div className="flex-1 h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-violet-500 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${result.promptScore}%` }}
                        transition={{ duration: 0.8 }}
                      />
                    </div>
                  </div>

                  {/* Prompt Output */}
                  <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden mb-6">
                    <div className="flex items-center justify-between px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                      <span className="text-[10px] font-medium text-gray-500 uppercase tracking-wider">{tt.output}</span>
                      <button
                        onClick={handleCopy}
                        className="flex items-center gap-1 px-3 py-1.5 bg-violet-600 text-white rounded-lg text-xs font-medium hover:bg-violet-700 transition-colors"
                      >
                        {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                        {copied ? tt.copied : tt.copy}
                      </button>
                    </div>
                    <pre className="text-xs font-mono text-gray-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed p-4 max-h-[400px] overflow-auto">
                      {result.finalPrompt}
                    </pre>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── Email Gate ── */}
            <AnimatePresence>
              {showGate && !emailSubmitted && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 bg-gradient-to-r from-violet-50 to-indigo-50 dark:from-violet-900/20 dark:to-indigo-900/20 rounded-2xl p-6 lg:p-8 border border-violet-100 dark:border-violet-800/30 text-center"
                >
                  <Sparkles className="w-8 h-8 text-violet-600 mx-auto mb-3" />
                  <h3 className="font-heading font-semibold text-lg text-gray-900 dark:text-white mb-2">
                    {tt.emailGateTitle}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 max-w-sm mx-auto">
                    {tt.emailGateTextLayout}
                  </p>
                  <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-2 max-w-sm mx-auto">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={tt.emailPlaceholder}
                      required
                      className="flex-1 px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm dark:text-gray-200 focus:outline-none focus:border-violet-500"
                    />
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-violet-600 text-white rounded-lg text-sm font-semibold hover:bg-violet-700 transition-colors whitespace-nowrap"
                    >
                      {tt.unlock}
                    </button>
                  </form>
                  <div className="flex items-center justify-center gap-4 mt-4">
                    <Link to="/prompt-generator" className="text-xs text-violet-600 hover:underline flex items-center gap-1">
                      <ArrowRight className="w-3 h-3" /> {tt.tryFullGenerator}
                    </Link>
                    <Link to="/signup" className="text-xs text-gray-500 hover:text-violet-600 transition-colors">
                      {tt.createAccount}
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {emailSubmitted && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-6 text-center p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border border-emerald-100 dark:border-emerald-800/30"
              >
                <Check className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
                <p className="text-sm font-medium text-emerald-700 dark:text-emerald-300">{tt.unlocked}</p>
              </motion.div>
            )}
          </motion.div>

          {/* ── Educational Content ── */}
          <div className="max-w-3xl mx-auto">
            {/* What is */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="font-heading font-semibold text-2xl text-gray-900 dark:text-white mb-4">
                {tt.whatIs} {educationContent.whatIs}?
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
                {educationContent.whyUse}
              </p>
            </motion.div>

            {/* Best Practices */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="font-heading font-semibold text-2xl text-gray-900 dark:text-white mb-4">
                {tt.bestPractices}
              </h2>
              <div className="space-y-3">
                {educationContent.bestPractices.map((practice, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700">
                    <div className="w-6 h-6 bg-violet-50 dark:bg-violet-900/20 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-xs font-semibold text-violet-600">{i + 1}</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{practice}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Tips */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="font-heading font-semibold text-2xl text-gray-900 dark:text-white mb-4">
                {tt.tips}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {educationContent.tips.map((tip, i) => (
                  <div key={i} className="flex items-start gap-2 p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700">
                    <ChevronRight className="w-4 h-4 text-violet-500 shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">{tip}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Examples */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="font-heading font-semibold text-2xl text-gray-900 dark:text-white mb-4">
                {tt.examplePrompts}
              </h2>
              <div className="space-y-3">
                {educationContent.examples.map((ex, i) => (
                  <button
                    key={i}
                    onClick={() => setGoal(ex.description)}
                    className="w-full text-left p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 hover:border-violet-300 dark:hover:border-violet-700 transition-all group"
                  >
                    <h4 className="font-medium text-sm text-gray-900 dark:text-white mb-1 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                      {ex.title}
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{ex.description}</p>
                  </button>
                ))}
              </div>
            </motion.div>

            {/* FAQs */}
            {faqs.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-12"
              >
                <h2 className="font-heading font-semibold text-2xl text-gray-900 dark:text-white mb-4">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-3">
                  {faqs.map((faq, i) => (
                    <details key={i} className="group bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
                      <summary className="flex items-center justify-between p-4 cursor-pointer list-none">
                        <span className="text-sm font-medium text-gray-900 dark:text-white">{faq.question}</span>
                        <ChevronRight className="w-4 h-4 text-gray-400 group-open:rotate-90 transition-transform shrink-0" />
                      </summary>
                      <div className="px-4 pb-4 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                        {faq.answer}
                      </div>
                    </details>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* ── CTA ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto mt-8 text-center bg-gradient-to-r from-violet-600 to-indigo-600 rounded-2xl p-8"
          >
            <h3 className="font-heading font-semibold text-xl text-white mb-2">
              {tt.tryFullGeneratorCta}
            </h3>
            <p className="text-violet-100 text-sm mb-6">
              {tt.tryFullGeneratorCtaDesc}
            </p>
            <Link
              to="/prompt-generator"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-violet-600 rounded-xl font-semibold text-sm hover:bg-violet-50 transition-colors shadow-lg"
            >
              <Sparkles className="w-4 h-4" />
              {tt.openFullGenerator}
            </Link>
          </motion.div>
        </div>
      </div>
    </>
  );
}
