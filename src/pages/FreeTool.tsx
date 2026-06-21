import { usePageTranslations } from '@/hooks/useTranslation';
import { generator as gt } from '@/lib/translations/generator';
import type { PromptGenerationInput,PromptGenerationResult } from '@/types';
import { AnimatePresence,motion } from 'framer-motion';
import {
ArrowRight,
BarChart3,
BookOpen,
Check,ChevronRight,
Copy,
Layers,
Lightbulb,
Loader2,
MessageSquare,
Shield,
Sparkles,
Star,TrendingUp,
Users,
Volume2,
Zap
} from 'lucide-react';
import { useCallback,useState } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/shared/SEOHead';
import { generatePrompt } from '../services/openai';
import { captureLead } from '../services/supabase';

const tones = ['Professional', 'Friendly', 'Persuasive', 'Concise', 'Creative', 'Bold'];
const categories = [
  'Business', 'Marketing', 'Sales', 'SEO', 'Content Creation', 'Email Writing',
  'Social Media', 'Coding', 'Education', 'Research', 'Productivity', 'ChatGPT', 'Midjourney'
];

export default function FreeTool() {
  const tt = usePageTranslations(gt);
  const [goal, setGoal] = useState('');
  const [category, setCategory] = useState('Business');
  const [tone, setTone] = useState('Professional');
  const [result, setResult] = useState<PromptGenerationResult | null>(null);
  const [generating, setGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [email, setEmail] = useState('');
  const [showGate, setShowGate] = useState(false);
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
        outputType: 'blog post',
        targetModel: 'chatgpt',
        language: 'English',
        tone: tone.toLowerCase(),
      };
      const res = await generatePrompt(input);
      setResult(res);
      setGenerationsLeft(prev => {
        const next = prev - 1;
        if (next <= 0) setShowGate(true);
        return next;
      });
    } catch {
      // silent
    } finally {
      setGenerating(false);
    }
  }, [goal, category, tone, generationsLeft, emailSubmitted]);

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
        await captureLead(email, 'free-tool', 'extra-generations');
      } catch (error) {
        console.warn('Unable to capture lead', error);
      }
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-600';
    if (score >= 60) return 'text-amber-600';
    return 'text-rose-600';
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } }),
  };

  return (
    <>
      <SEOHead
        title={tt.pageTitle}
        description="Generate AI prompts for free. No signup required for your first prompt. Create expert-level prompts for ChatGPT, Claude, Gemini, and more."
        ogImage="/og-default.jpg"
      />

      <div className="min-h-[100dvh] pt-24 pb-16 bg-gradient-to-br from-indigo-50 via-white to-violet-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {/* ── Hero ── */}
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0} className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 rounded-full text-xs font-medium mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              {tt.freeBadge}
            </div>
            <h1 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-gray-900 dark:text-white mb-3">
              {tt.pageTitle}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 max-w-lg mx-auto text-sm sm:text-base">
              {tt.pageSubtitle}
            </p>
          </motion.div>

          {/* ── Trust Signals ── */}
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={1} className="flex flex-wrap items-center justify-center gap-4 mb-8 text-xs text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1"><Shield className="w-3.5 h-3.5 text-emerald-500" /> {tt.noSignupRequired}</span>
            <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 text-amber-500" /> {tt.freeForever}</span>
            <span className="flex items-center gap-1"><Zap className="w-3.5 h-3.5 text-violet-500" /> {generationsLeft > 0 ? `${generationsLeft} ${tt.generationsLeft}` : tt.upgradeForMore}</span>
          </motion.div>

          {/* ── Generator Card ── */}
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={2} className="max-w-2xl mx-auto">
            <div className="bg-white/70 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/60 dark:border-gray-700/60 rounded-2xl p-6 lg:p-8 shadow-sm mb-8">
              {/* Goal */}
              <div className="mb-4">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
                  <MessageSquare className="w-4 h-4 text-violet-500" />
                  {tt.describeGoal}
                </label>
                <textarea
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  placeholder={tt.goalPlaceholderFree}
                  rows={4}
                  className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 resize-none dark:text-gray-200 dark:placeholder-gray-500 transition-all"
                />
              </div>

              {/* Category + Tone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                <div>
                  <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <Layers className="w-3.5 h-3.5 text-gray-400" /> {tt.chooseCategory}
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:border-violet-500 dark:text-gray-200"
                  >
                    {categories.map((c) => <option key={c} value={c}>{c}</option>)}
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
                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mb-8">
                  {/* Quality Score */}
                  <div className="flex items-center gap-3 mb-4 px-4 py-3 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-2">
                      <TrendingUp className={`w-5 h-5 ${getScoreColor(result.promptScore)}`} />
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">{tt.promptScore}: {result.promptScore}/100</span>
                    </div>
                    <div className="flex-1 h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                      <motion.div className="h-full bg-violet-500 rounded-full" initial={{ width: 0 }} animate={{ width: `${result.promptScore}%` }} transition={{ duration: 0.8 }} />
                    </div>
                  </div>

                  {/* Prompt Output */}
                  <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden mb-6">
                    <div className="flex items-center justify-between px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                      <span className="text-[10px] font-medium text-gray-500 uppercase tracking-wider">{tt.output}</span>
                      <button onClick={handleCopy} className="flex items-center gap-1 px-3 py-1.5 bg-violet-600 text-white rounded-lg text-xs font-medium hover:bg-violet-700 transition-colors">
                        {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                        {copied ? tt.copied : tt.copy}
                      </button>
                    </div>
                    <pre className="text-xs font-mono text-gray-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed p-4 max-h-[400px] overflow-auto">
                      {result.finalPrompt}
                    </pre>
                  </div>

                  {/* Why it works */}
                  <div className="p-4 bg-indigo-50 dark:bg-indigo-900/10 rounded-xl border border-indigo-100 dark:border-indigo-900/20 mb-6">
                    <div className="flex items-start gap-2">
                      <Lightbulb className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                      <p className="text-xs text-indigo-600 dark:text-indigo-400 leading-relaxed">{result.whyItWorks}</p>
                    </div>
                  </div>

                  {/* Variables */}
                  {result.variables.length > 0 && (
                    <div className="mb-6">
                      <p className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">{tt.variables}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {result.variables.map((v, i) => (
                          <span key={i} className="px-2 py-1 bg-violet-50 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300 rounded text-[10px] font-medium border border-violet-100 dark:border-violet-800/30">
                            {v}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Follow-ups */}
                  <div className="mb-6">
                    <p className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">{tt.followUps}</p>
                    <div className="space-y-1.5">
                      {result.followUpPrompts.map((f, i) => (
                        <button key={i} onClick={() => { navigator.clipboard.writeText(f); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
                          className="flex items-center gap-2 w-full text-left px-3 py-2 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-lg text-xs text-gray-600 dark:text-gray-400 hover:border-violet-300 dark:hover:border-violet-700 transition-all group"
                        >
                          <ChevronRight className="w-3 h-3 text-gray-400 group-hover:text-violet-500 transition-colors shrink-0" />
                          <span className="flex-1 truncate">{f}</span>
                          <Copy className="w-3 h-3 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── Email Gate ── */}
            <AnimatePresence>
              {showGate && !emailSubmitted && (
                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
                  <div className="bg-gradient-to-r from-violet-50 to-indigo-50 dark:from-violet-900/20 dark:to-indigo-900/20 rounded-2xl p-6 lg:p-8 border border-violet-100 dark:border-violet-800/30 text-center">
                    <Sparkles className="w-8 h-8 text-violet-600 mx-auto mb-3" />
                    <h3 className="font-heading font-semibold text-lg text-gray-900 dark:text-white mb-2">{tt.emailGateTitle}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 max-w-sm mx-auto">{tt.emailGateText}</p>
                    <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-2 max-w-sm mx-auto">
                      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={tt.emailPlaceholder} required
                        className="flex-1 px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm dark:text-gray-200 focus:outline-none focus:border-violet-500" />
                      <button type="submit" className="px-6 py-2.5 bg-violet-600 text-white rounded-lg text-sm font-semibold hover:bg-violet-700 transition-colors whitespace-nowrap">{tt.unlock}</button>
                    </form>
                    <div className="flex items-center justify-center gap-4 mt-4">
                      <Link to="/prompt-generator" className="text-xs text-violet-600 hover:underline flex items-center gap-1"><ArrowRight className="w-3 h-3" /> {tt.tryFullGenerator}</Link>
                      <Link to="/signup" className="text-xs text-gray-500 hover:text-violet-600 transition-colors">{tt.createAccount}</Link>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {emailSubmitted && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-10 text-center p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border border-emerald-100 dark:border-emerald-800/30">
                <Check className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
                <p className="text-sm font-medium text-emerald-700 dark:text-emerald-300">{tt.unlocked}</p>
              </motion.div>
            )}
          </motion.div>

          {/* ── Example Prompts ── */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-2xl mx-auto mb-16">
            <h3 className="font-heading font-semibold text-lg text-gray-900 dark:text-white mb-4 text-center">{tt.examplePrompts}</h3>
            <div className="space-y-3">
              {[
                'Write a sales email for a SaaS product targeting small business owners',
                'Generate Python code for a REST API with user authentication',
                'Create a lesson plan about photosynthesis for 7th graders',
                'Write a LinkedIn post about AI trends in healthcare',
                'Generate an SEO-optimized blog post about remote work productivity',
              ].map((ex) => (
                <button key={ex} onClick={() => setGoal(ex)}
                  className="w-full text-left p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-400 hover:border-violet-300 dark:hover:border-violet-700 hover:text-violet-600 dark:hover:text-violet-400 transition-all flex items-center gap-3 group"
                >
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-violet-500 transition-colors shrink-0" />
                  {ex}
                </button>
              ))}
            </div>
          </motion.div>

          {/* ── SEO Content: What is a Prompt Generator ── */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-3xl mx-auto mb-16">
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6 lg:p-8">
              <h2 className="font-heading font-semibold text-xl text-gray-900 dark:text-white mb-4">
                {tt.whatIsPromptGenerator}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                An AI prompt generator is a tool that transforms your rough ideas into optimized instructions for AI models like ChatGPT, Claude, Gemini, and Midjourney. By structuring your request with proven techniques like role assignment, context setting, and output formatting, a prompt generator helps you get dramatically better results from AI on the first try.
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                Think of it as a translator between human thinking and AI understanding. While you might say &ldquo;write me something about marketing,&rdquo; a prompt generator turns that into a comprehensive, structured prompt with role, context, and format instructions.
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-5">
                Studies show that well-structured prompts can improve AI output quality by 40-60%. Our free prompt generator analyzes your request, adds the missing structure, and delivers a ready-to-use prompt — completely free, no signup required.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Link to="/knowledge/what-is-prompt-engineering-beginners-guide" className="inline-flex items-center gap-1 text-sm text-violet-600 hover:underline">
                  <BookOpen className="w-4 h-4" /> Learn prompt engineering
                </Link>
                <Link to="/prompt-generator" className="inline-flex items-center gap-1 text-sm text-violet-600 hover:underline">
                  <Sparkles className="w-4 h-4" /> {tt.tryFullGenerator}
                </Link>
              </div>
            </div>
          </motion.div>

          {/* ── Features Grid ── */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16 max-w-3xl mx-auto">
            {[
              { icon: Zap, title: 'Instant Results', desc: 'Get optimized prompts in under 2 seconds.' },
              { icon: Shield, title: 'No Signup', desc: 'Start generating immediately, no account needed.' },
              { icon: BarChart3, title: 'Quality Scoring', desc: 'See how well your prompt is structured.' },
              { icon: Users, title: 'All AI Models', desc: 'Works with ChatGPT, Claude, Gemini, and more.' },
            ].map((f) => (
              <motion.div key={f.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="text-center p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700"
              >
                <div className="w-10 h-10 bg-violet-50 dark:bg-violet-900/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <f.icon className="w-5 h-5 text-violet-600" />
                </div>
                <h4 className="font-medium text-gray-900 dark:text-white text-sm mb-1">{f.title}</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">{f.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* ── Lead Magnet CTA ── */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center bg-gradient-to-r from-violet-600 to-indigo-600 rounded-2xl p-8 mb-16"
          >
            <h3 className="font-heading font-semibold text-xl text-white mb-2">{tt.tryFullGeneratorCta}</h3>
            <p className="text-violet-100 text-sm mb-6">{tt.tryFullGeneratorCtaDesc}</p>
            <Link to="/prompt-generator" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-violet-600 rounded-xl font-semibold text-sm hover:bg-violet-50 transition-colors shadow-lg">
              <Sparkles className="w-4 h-4" />
              {tt.tryFullGenerator}
            </Link>
          </motion.div>
        </div>
      </div>
    </>
  );
}
