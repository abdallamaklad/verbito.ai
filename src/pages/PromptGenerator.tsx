import { usePageTranslations } from '@/hooks/useTranslation';
import { generator } from '@/lib/translations/generator';
import type { Complexity,PromptGenerationInput,PromptGenerationResult,QualityBreakdown,TargetModel } from '@/types';
import { AnimatePresence,motion } from 'framer-motion';
import {
ArrowRight,
Award,
Ban,
BarChart3,
Bookmark,
Building2,
Check,
ChevronDown,
ChevronRight,
ChevronUp,
Copy,
FileText,
Info,
Layers,
Lightbulb,
Loader2,
MessageSquare,
Mic,Plus,
RefreshCw,
Ruler,
Shield,
Sliders,
Sparkles,
TrendingUp,
Type,
Users,
Volume2,
Wand2,
Zap
} from 'lucide-react';
import { useRef,useState } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/shared/SEOHead';
import UpgradeModal from '../components/shared/UpgradeModal';
import { useAuth } from '../hooks/useAuth';
import { useUsage } from '../hooks/useUsage';
import { generatePrompt,improvePrompt } from '../services/openai';
import { savePrompt } from '../services/supabase';

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const presets = [
  { label: 'Marketing Email', goal: 'Write a welcome email sequence for new SaaS trial users', category: 'Marketing', tone: 'Friendly', outputType: 'Email', complexity: 'intermediate' },
  { label: 'SEO Blog Post', goal: 'Create a comprehensive guide about AI automation for small businesses', category: 'SEO', tone: 'Professional', outputType: 'Blog Post', complexity: 'expert' },
  { label: 'Code Review', goal: 'Review my React component for performance issues and best practices', category: 'Coding', tone: 'Professional', outputType: 'Code', complexity: 'expert' },
  { label: 'Sales Script', goal: 'Write a cold call script for selling digital marketing services to dentists', category: 'Sales', tone: 'Persuasive', outputType: 'Sales Script', complexity: 'intermediate' },
  { label: 'Social Post', goal: 'Create a viral LinkedIn post about the future of AI in healthcare', category: 'Social Media', tone: 'Bold', outputType: 'Social Media Post', complexity: 'beginner' },
  { label: 'Lesson Plan', goal: 'Design a 45-minute lesson plan about photosynthesis for 7th graders', category: 'Education', tone: 'Friendly', outputType: 'Lesson Plan', complexity: 'intermediate' },
];

const categories = [
  'Business', 'Marketing', 'Sales', 'SEO', 'Content Creation', 'Email Writing',
  'Social Media', 'Coding', 'Data Analysis', 'Education', 'Research',
  'Productivity', 'Automation', 'ChatGPT', 'Claude', 'Gemini',
  'Midjourney', 'Image Generation', 'Video Generation', 'Career',
  'Personal Development', 'Custom'
];

const outputTypes = [
  'Blog Post', 'Email', 'Landing Page', 'Advertisement', 'Social Media Post',
  'Code', 'Analysis', 'Research Summary', 'Lesson Plan', 'Strategy',
  'SOP', 'Image Prompt', 'Video Prompt', 'Sales Script', 'Business Plan', 'Custom'
];

const targetModels = [
  { value: 'chatgpt', label: 'ChatGPT' },
  { value: 'gpt-4.1', label: 'GPT-4.1' },
  { value: 'gpt-4o', label: 'GPT-4o' },
  { value: 'claude', label: 'Claude' },
  { value: 'gemini', label: 'Gemini' },
  { value: 'midjourney', label: 'Midjourney' },
  { value: 'dall-e', label: 'DALL-E' },
  { value: 'general-ai', label: 'General AI' },
];

const languages = ['English', 'Spanish', 'French', 'German', 'Portuguese', 'Chinese', 'Japanese', 'Korean'];

const tones = [
  'Professional', 'Friendly', 'Persuasive', 'Academic', 'Concise',
  'Creative', 'Luxury', 'Bold', 'Casual', 'Empathetic'
];

const complexities = ['Beginner', 'Intermediate', 'Expert'];

const desiredLengths = ['Short (1-2 paragraphs)', 'Medium (3-5 paragraphs)', 'Long (detailed)', 'Very Long (comprehensive)', 'Custom'];

const generatorFallbacks: Record<string, string> = {
  actionConstraints: 'Add constraints',
  actionCopied: 'Copied',
  actionCopy: 'Copy',
  actionDetailed: 'More detailed',
  actionExamples: 'Add examples',
  actionImprove: 'Improve',
  actionPro: 'Pro',
  actionRegenerate: 'Regenerate',
  actionSave: 'Save',
  actionSaved: 'Saved',
  actionShorter: 'Shorter',
  additionalInstructionsLabel: 'Additional instructions',
  additionalInstructionsPlaceholder: 'Anything else the AI should know?',
  advancedToggle: 'Advanced options',
  audienceLabel: 'Target audience',
  audiencePlaceholder: 'Who is this for?',
  avoidLabel: 'Avoid',
  avoidPlaceholder: 'Words, topics, or formats to avoid',
  bestModelLabel: 'Best model',
  brandVoiceLabel: 'Brand voice',
  brandVoicePlaceholder: 'Describe your brand voice',
  categoryLabel: 'Category',
  complexityLabel: 'Complexity',
  constraintsLabel: 'Constraints',
  constraintsPlaceholder: 'Limits, rules, requirements, or must-haves',
  contextLabel: 'Context',
  contextPlaceholder: 'Add background, source material, or examples',
  ctaBannerButton1: 'Start free',
  ctaBannerButton2: 'View pricing',
  ctaBannerDesc: 'Generate stronger prompts, save your best work, and build a repeatable AI workflow.',
  ctaBannerTitle: 'Ready to create better prompts?',
  desiredLengthLabel: 'Desired length',
  desiredLengthPlaceholder: 'How long should the output be?',
  emptySubtitle: 'Fill in your goal and generate an optimized prompt.',
  emptyTitle: 'Your generated prompt will appear here',
  exampleInputLabel: 'Example input',
  exampleInputPlaceholder: 'Optional sample input',
  exampleOutputLabel: 'Example output',
  exampleOutputPlaceholder: 'Optional sample output',
  feature1Desc: 'Create polished prompts quickly.',
  feature1Title: 'Fast generation',
  feature2Desc: 'Tune model, format, tone, and complexity.',
  feature2Title: 'Advanced controls',
  feature3Desc: 'Score prompts across quality dimensions.',
  feature3Title: 'Quality scoring',
  feature4Desc: 'Get variables, mistakes, and follow-ups.',
  feature4Title: 'Reusable workflows',
  followupsLabel: 'Follow-up prompts',
  generateButton: 'Generate Prompt',
  generatedPromptLabel: 'Generated prompt',
  generatingButton: 'Generating...',
  goalLabel: 'What do you want to create?',
  goalPlaceholder: 'Describe your goal, task, or desired AI output...',
  headerBadge: 'AI Prompt Generator',
  headerSubtitle: 'Turn a rough idea into a structured prompt for ChatGPT, Claude, Gemini, Midjourney, and more.',
  headerTitle: 'Create Expert-Level AI Prompts',
  improvingText: 'Improving...',
  industryLabel: 'Industry',
  industryPlaceholder: 'e.g. SaaS, healthcare, education',
  languageLabel: 'Language',
  loadingSteps: 'Analyzing goal, adding structure, optimizing output',
  loadingText: 'Building your optimized prompt...',
  mistakesLabel: 'Common mistakes to avoid',
  outputTypeLabel: 'Output type',
  proTip1: 'Be specific about the final outcome you want.',
  proTip2: 'Add audience, context, and constraints whenever possible.',
  proTip3: 'Use examples when style or format matters.',
  proTip4: 'Tell the AI what to avoid.',
  proTip5: 'Iterate once or twice for best results.',
  proTipsTitle: 'Pro tips',
  quickStartLabel: 'Quick start:',
  scoreExcellent: 'Excellent',
  scoreFair: 'Fair',
  scoreGood: 'Good',
  scoreTitle: 'Quality score',
  targetModelLabel: 'Target model',
  toneLabel: 'Tone',
  usageLabel: 'Usage',
  variablesLabel: 'Variables to customize',
  whyToggle: 'Why it works',
};

const tabs = [
  { id: 'optimized', label: 'Optimized Prompt' },
  { id: 'short', label: 'Short Version' },
  { id: 'advanced', label: 'Advanced Version' },
];

const qualityLabels: Record<keyof QualityBreakdown, string> = {
  clarity: 'Clarity',
  context: 'Context',
  specificity: 'Specificity',
  constraints: 'Constraints',
  outputFormat: 'Output Format',
  reusability: 'Reusability',
};

function getGenerationErrorMessage(error: unknown): string {
  const fallback = 'Prompt generation failed. Please try again in a moment.';
  if (!(error instanceof Error) || !error.message) return fallback;
  if (error.message.includes('non-2xx')) return fallback;
  return error.message;
}

/* ------------------------------------------------------------------ */
/*  MAIN COMPONENT                                                     */
/* ------------------------------------------------------------------ */

export default function PromptGenerator() {
  const gt = { ...generatorFallbacks, ...usePageTranslations(generator) };

  /* ── Form State ── */
  const [goal, setGoal] = useState('');
  const [category, setCategory] = useState('Business');
  const [outputType, setOutputType] = useState('Blog Post');
  const [targetModel, setTargetModel] = useState('chatgpt');
  const [language, setLanguage] = useState('English');

  /* Advanced */
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [context, setContext] = useState('');
  const [audience, setAudience] = useState('');
  const [tone, setTone] = useState('Professional');
  const [complexity, setComplexity] = useState('Intermediate');
  const [industry, setIndustry] = useState('');
  const [constraints, setConstraints] = useState('');
  const [avoid, setAvoid] = useState('');
  const [exampleInput, setExampleInput] = useState('');
  const [exampleOutput, setExampleOutput] = useState('');
  const [desiredLength, setDesiredLength] = useState('');
  const [brandVoice, setBrandVoice] = useState('');
  const [additionalInstructions, setAdditionalInstructions] = useState('');

  /* Result State */
  const [generating, setGenerating] = useState(false);
  const [result, setResult] = useState<PromptGenerationResult | null>(null);
  const [generationError, setGenerationError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('optimized');
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showWhy, setShowWhy] = useState(false);
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [improving, setImproving] = useState(false);
  const [activePrompt, setActivePrompt] = useState<string>('');

  /* Hooks */
  const { user, isLoggedIn } = useAuth();
  const { usage, dailyLimit, hasReachedLimit, refresh: refreshUsage } = useUsage(user?.id, user?.plan_type || 'free');

  /* Refs for scroll */
  const outputRef = useRef<HTMLDivElement>(null);

  /* ── Preset handler ── */
  const handlePreset = (preset: typeof presets[0]) => {
    setGoal(preset.goal);
    setGenerationError(null);
    setCategory(preset.category);
    setTone(preset.tone);
    setOutputType(preset.outputType);
    setComplexity(preset.complexity.charAt(0).toUpperCase() + preset.complexity.slice(1));
  };

  /* ── Generate ── */
  const handleGenerate = async () => {
    if (!goal.trim()) return;

    setGenerationError(null);
    if (hasReachedLimit) {
      setShowUpgrade(true);
      return;
    }

    setGenerating(true);
    setResult(null);
    setActiveTab('optimized');

    try {
      const input: PromptGenerationInput = {
        goal,
        category: category.toLowerCase(),
        outputType: outputType.toLowerCase(),
        targetModel: targetModel as TargetModel,
        language,
        context: context || undefined,
        audience: audience || undefined,
        tone: tone.toLowerCase(),
        complexity: complexity.toLowerCase() as Complexity,
        industry: industry || undefined,
        constraints: constraints || undefined,
        avoid: avoid || undefined,
        exampleInput: exampleInput || undefined,
        exampleOutput: exampleOutput || undefined,
        desiredLength: desiredLength || undefined,
        brandVoice: brandVoice || undefined,
        additionalInstructions: additionalInstructions || undefined,
      };

      const res = await generatePrompt(input);
      setResult(res);
      setActivePrompt(res.finalPrompt);
      void refreshUsage();

      setTimeout(() => {
        outputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } catch (err) {
      console.error('Generation failed:', err);
      setGenerationError(getGenerationErrorMessage(err));
    } finally {
      setGenerating(false);
    }
  };

  /* ── Copy ── */
  const handleCopy = (text?: string) => {
    const toCopy = text || activePrompt;
    if (toCopy) {
      navigator.clipboard.writeText(toCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  /* ── Save ── */
  const handleSave = async () => {
    if (!result) return;
    if (!isLoggedIn) {
      setShowUpgrade(true);
      return;
    }
    try {
      await savePrompt(user!.id, {
        title: goal.slice(0, 80) + (goal.length > 80 ? '...' : ''),
        category,
        prompt_text: result.finalPrompt,
        notes: `Output: ${outputType} | Model: ${targetModel} | Tone: ${tone}`,
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch {
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  };

  /* ── Improve actions ── */
  const handleImprove = async (instruction: string) => {
    if (!activePrompt) return;
    setImproving(true);
    try {
      const improved = await improvePrompt(activePrompt, instruction);
      setActivePrompt(improved);
      if (result) {
        setResult({ ...result, finalPrompt: improved });
      }
    } finally {
      setImproving(false);
    }
  };

  /* ── Get tab content ── */
  const getTabContent = () => {
    if (!result) return activePrompt;
    if (activeTab === 'optimized') return result.finalPrompt;
    if (activeTab === 'short') return result.shortVersion;
    if (activeTab === 'advanced') return result.advancedVersion;
    return result.finalPrompt;
  };

  /* ── Score color ── */
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-600';
    if (score >= 60) return 'text-amber-600';
    return 'text-rose-600';
  };
  const getScoreBg = (score: number) => {
    if (score >= 80) return 'bg-emerald-50 border-emerald-200';
    if (score >= 60) return 'bg-amber-50 border-amber-200';
    return 'bg-rose-50 border-rose-200';
  };
  const getScoreRing = (score: number) => {
    if (score >= 80) return 'stroke-emerald-500';
    if (score >= 60) return 'stroke-amber-500';
    return 'stroke-rose-500';
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
  };

  /* ── Usage percent ── */
  const usagePercent = usage ? Math.min((usage.generationsUsed / dailyLimit) * 100, 100) : 0;

  return (
    <>
      <SEOHead
        title="AI Prompt Generator — Verbito.ai"
        description="Generate expert-level AI prompts for ChatGPT, Claude, Gemini, Midjourney, and more. Get optimized prompts with quality scores, multiple versions, and follow-up suggestions."
        ogImage="/og-default.jpg"
      />
      <UpgradeModal isOpen={showUpgrade} onClose={() => setShowUpgrade(false)} />

      <div className="min-h-[100dvh] pt-24 pb-16 bg-gradient-to-br from-indigo-50 via-white to-violet-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* ── Header ── */}
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 rounded-full text-xs font-medium mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              {gt.headerBadge}
            </div>
            <h1 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-gray-900 dark:text-white mb-3">
              {gt.headerTitle}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto text-sm sm:text-base">
              {gt.headerSubtitle}
            </p>
          </motion.div>

          {/* ── Preset Chips ── */}
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="flex flex-wrap items-center justify-center gap-2 mb-8">
            {gt.quickStartLabel}
            {presets.map((preset) => (
              <button
                key={preset.label}
                onClick={() => handlePreset(preset)}
                className="px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full text-xs font-medium text-gray-600 dark:text-gray-300 hover:border-violet-400 hover:text-violet-600 dark:hover:text-violet-400 transition-all hover:shadow-sm"
              >
                {preset.label}
              </button>
            ))}
          </motion.div>

          {/* ── Main Grid ── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* ═══════════════ LEFT PANEL: Input Form ═══════════════ */}
            <motion.div initial="hidden" animate="visible" variants={fadeUp} className="lg:col-span-7">
              <div className="bg-white/70 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/60 dark:border-gray-700/60 rounded-2xl p-6 lg:p-8 shadow-sm">
                {/* Goal */}
                <div className="mb-5">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
                    <MessageSquare className="w-4 h-4 text-violet-500" />
                    {gt.goalLabel}
                    <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    value={goal}
                    onChange={(e) => {
                      setGoal(e.target.value);
                      if (generationError) setGenerationError(null);
                    }}
                    placeholder={gt.goalPlaceholder}
                    className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 resize-none dark:text-gray-200 dark:placeholder-gray-500 transition-all"
                    rows={4}
                  />
                </div>

                {/* Required Settings Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                  <div>
                    <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <Layers className="w-3.5 h-3.5 text-gray-400" /> {gt.categoryLabel}
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-3 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:border-violet-500 dark:text-gray-200 transition-all"
                    >
                      {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <FileText className="w-3.5 h-3.5 text-gray-400" /> {gt.outputTypeLabel}
                    </label>
                    <select
                      value={outputType}
                      onChange={(e) => setOutputType(e.target.value)}
                      className="w-full px-3 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:border-violet-500 dark:text-gray-200 transition-all"
                    >
                      {outputTypes.map((o) => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <Sparkles className="w-3.5 h-3.5 text-gray-400" /> {gt.targetModelLabel}
                    </label>
                    <select
                      value={targetModel}
                      onChange={(e) => setTargetModel(e.target.value)}
                      className="w-full px-3 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:border-violet-500 dark:text-gray-200 transition-all"
                    >
                      {targetModels.map((m) => <option key={m.value} value={m.value}>{m.label}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <Type className="w-3.5 h-3.5 text-gray-400" /> {gt.languageLabel}
                    </label>
                    <select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      className="w-full px-3 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:border-violet-500 dark:text-gray-200 transition-all"
                    >
                      {languages.map((l) => <option key={l} value={l}>{l}</option>)}
                    </select>
                  </div>
                </div>

                {/* ── Advanced Options Toggle ── */}
                <div className="mb-5">
                  <button
                    onClick={() => setShowAdvanced(!showAdvanced)}
                    className="flex items-center gap-2 text-sm font-medium text-violet-600 dark:text-violet-400 hover:text-violet-700 transition-colors"
                  >
                    <Sliders className="w-4 h-4" />
                    {gt.advancedToggle}
                    {showAdvanced ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>
                </div>

                {/* ── Advanced Options Panel ── */}
                <AnimatePresence>
                  {showAdvanced && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="space-y-4 mb-5 pb-2">
                        {/* Context */}
                        <div>
                          <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            <Info className="w-3.5 h-3.5 text-gray-400" /> {gt.contextLabel}
                          </label>
                          <textarea
                            value={context}
                            onChange={(e) => setContext(e.target.value)}
                            placeholder={gt.contextPlaceholder}
                            className="w-full px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:border-violet-500 dark:text-gray-200 resize-none transition-all"
                            rows={3}
                          />
                        </div>

                        {/* Audience + Tone */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              <Users className="w-3.5 h-3.5 text-gray-400" /> {gt.audienceLabel}
                            </label>
                            <input
                              value={audience}
                              onChange={(e) => setAudience(e.target.value)}
                              placeholder={gt.audiencePlaceholder}
                              className="w-full px-3 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:border-violet-500 dark:text-gray-200 transition-all"
                            />
                          </div>
                          <div>
                            <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              <Volume2 className="w-3.5 h-3.5 text-gray-400" /> {gt.toneLabel}
                            </label>
                            <select
                              value={tone}
                              onChange={(e) => setTone(e.target.value)}
                              className="w-full px-3 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:border-violet-500 dark:text-gray-200 transition-all"
                            >
                              {tones.map((t) => <option key={t} value={t}>{t}</option>)}
                            </select>
                          </div>
                        </div>

                        {/* Complexity + Industry */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              <BarChart3 className="w-3.5 h-3.5 text-gray-400" /> {gt.complexityLabel}
                            </label>
                            <select
                              value={complexity}
                              onChange={(e) => setComplexity(e.target.value)}
                              className="w-full px-3 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:border-violet-500 dark:text-gray-200 transition-all"
                            >
                              {complexities.map((c) => <option key={c} value={c}>{c}</option>)}
                            </select>
                          </div>
                          <div>
                            <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              <Building2 className="w-3.5 h-3.5 text-gray-400" /> {gt.industryLabel}
                            </label>
                            <input
                              value={industry}
                              onChange={(e) => setIndustry(e.target.value)}
                              placeholder={gt.industryPlaceholder}
                              className="w-full px-3 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:border-violet-500 dark:text-gray-200 transition-all"
                            />
                          </div>
                        </div>

                        {/* Constraints + Avoid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              <Shield className="w-3.5 h-3.5 text-gray-400" /> {gt.constraintsLabel}
                            </label>
                            <textarea
                              value={constraints}
                              onChange={(e) => setConstraints(e.target.value)}
                              placeholder={gt.constraintsPlaceholder}
                              className="w-full px-3 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:border-violet-500 dark:text-gray-200 resize-none transition-all"
                              rows={2}
                            />
                          </div>
                          <div>
                            <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              <Ban className="w-3.5 h-3.5 text-gray-400" /> {gt.avoidLabel}
                            </label>
                            <textarea
                              value={avoid}
                              onChange={(e) => setAvoid(e.target.value)}
                              placeholder={gt.avoidPlaceholder}
                              className="w-full px-3 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:border-violet-500 dark:text-gray-200 resize-none transition-all"
                              rows={2}
                            />
                          </div>
                        </div>

                        {/* Examples */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">{gt.exampleInputLabel}</label>
                            <textarea
                              value={exampleInput}
                              onChange={(e) => setExampleInput(e.target.value)}
                              placeholder={gt.exampleInputPlaceholder}
                              className="w-full px-3 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:border-violet-500 dark:text-gray-200 resize-none transition-all"
                              rows={2}
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">{gt.exampleOutputLabel}</label>
                            <textarea
                              value={exampleOutput}
                              onChange={(e) => setExampleOutput(e.target.value)}
                              placeholder={gt.exampleOutputPlaceholder}
                              className="w-full px-3 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:border-violet-500 dark:text-gray-200 resize-none transition-all"
                              rows={2}
                            />
                          </div>
                        </div>

                        {/* Length + Brand Voice */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              <Ruler className="w-3.5 h-3.5 text-gray-400" /> {gt.desiredLengthLabel}
                            </label>
                            <select
                              value={desiredLength}
                              onChange={(e) => setDesiredLength(e.target.value)}
                              className="w-full px-3 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:border-violet-500 dark:text-gray-200 transition-all"
                            >
                              <option value="">{gt.desiredLengthPlaceholder}</option>
                              {desiredLengths.map((l) => <option key={l} value={l}>{l}</option>)}
                            </select>
                          </div>
                          <div>
                            <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              <Mic className="w-3.5 h-3.5 text-gray-400" /> {gt.brandVoiceLabel}
                            </label>
                            <input
                              value={brandVoice}
                              onChange={(e) => setBrandVoice(e.target.value)}
                              placeholder={gt.brandVoicePlaceholder}
                              className="w-full px-3 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:border-violet-500 dark:text-gray-200 transition-all"
                            />
                          </div>
                        </div>

                        {/* Additional Instructions */}
                        <div>
                          <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            <Plus className="w-3.5 h-3.5 text-gray-400" /> {gt.additionalInstructionsLabel}
                          </label>
                          <textarea
                            value={additionalInstructions}
                            onChange={(e) => setAdditionalInstructions(e.target.value)}
                            placeholder={gt.additionalInstructionsPlaceholder}
                            className="w-full px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:border-violet-500 dark:text-gray-200 resize-none transition-all"
                            rows={2}
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* ── Usage + Generate Button ── */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                  <div className="flex items-center gap-3">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      <span className={hasReachedLimit ? 'text-rose-500 font-medium' : 'font-medium'}>
                        {usage?.generationsUsed || 0}/{dailyLimit} {gt.usageLabel}
                      </span>
                      <div className="w-28 h-2 bg-gray-100 dark:bg-gray-800 rounded-full mt-1.5 overflow-hidden">
                        <motion.div
                          className="h-full bg-violet-600 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${usagePercent}%` }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                    </div>
                    {!isLoggedIn && (
                      <span className="text-[10px] text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-full">
                        Sign in for more
                      </span>
                    )}
                  </div>
                  <motion.button
                    onClick={handleGenerate}
                    disabled={!goal.trim() || generating}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center gap-2 px-8 py-3.5 bg-violet-600 text-white rounded-xl font-semibold hover:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-violet-600/20 hover:shadow-violet-600/30 text-sm"
                  >
                    {generating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Wand2 className="w-5 h-5" />}
                    {generating ? gt.generatingButton : gt.generateButton}
                  </motion.button>
                </div>
              </div>
            </motion.div>

            {/* ═══════════════ RIGHT PANEL: Output ═══════════════ */}
            <motion.div ref={outputRef} initial="hidden" animate="visible" variants={fadeUp} className="lg:col-span-5">
              <div className="bg-white/70 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/60 dark:border-gray-700/60 rounded-2xl p-6 lg:p-8 shadow-sm min-h-[560px] flex flex-col">
                <AnimatePresence mode="wait">
                  {/* Empty State */}
                  {!result && !generating && (
                    <motion.div
                      key="empty"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex-1 flex flex-col items-center justify-center text-center py-16"
                    >
                      {generationError && (
                        <div className="mb-6 w-full rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-left text-sm text-rose-700 dark:border-rose-900/50 dark:bg-rose-950/30 dark:text-rose-300">
                          <p className="font-semibold">Generation failed</p>
                          <p className="mt-1">{generationError}</p>
                        </div>
                      )}
                      <div className="w-20 h-20 bg-gradient-to-br from-violet-100 to-indigo-100 dark:from-violet-900/20 dark:to-indigo-900/20 rounded-2xl flex items-center justify-center mb-5">
                        <Sparkles className="w-10 h-10 text-violet-400" />
                      </div>
                      <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-1">{gt.emptyTitle}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 max-w-xs">{gt.emptySubtitle}</p>
                      <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-gray-400 dark:text-gray-500">
                        <span className="flex items-center gap-1"><BarChart3 className="w-3.5 h-3.5" /> Quality Score</span>
                        <span className="flex items-center gap-1"><Layers className="w-3.5 h-3.5" /> Multiple Variants</span>
                        <span className="flex items-center gap-1"><Zap className="w-3.5 h-3.5" /> Follow-ups</span>
                      </div>
                    </motion.div>
                  )}

                  {/* Loading State */}
                  {generating && (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex-1 flex flex-col items-center justify-center py-16"
                    >
                      <div className="w-full max-w-sm space-y-3">
                        {[1, 0.85, 0.95, 0.7, 0.9].map((w, i) => (
                          <div
                            key={i}
                            className="h-3 rounded bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 bg-[length:200%_100%] animate-shimmer"
                            style={{ width: `${w * 100}%` }}
                          />
                        ))}
                      </div>
                      <div className="flex items-center gap-2 mt-6 text-sm text-gray-500 dark:text-gray-400">
                        <Loader2 className="w-4 h-4 animate-spin text-violet-500" />
                        {gt.loadingText}
                      </div>
                      <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">{gt.loadingSteps}</p>
                    </motion.div>
                  )}

                  {/* Result State */}
                  {result && (
                    <motion.div
                      key="result"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col h-full"
                    >
                      {/* ── Prompt Score Header ── */}
                      <div className="flex items-center gap-4 mb-5">
                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center border-2 ${getScoreBg(result.promptScore)}`}>
                          <svg className="w-14 h-14 -rotate-90" viewBox="0 0 36 36">
                            <path className="text-gray-200 dark:text-gray-700" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
                            <path className={getScoreRing(result.promptScore)} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray={`${result.promptScore}, 100`} strokeLinecap="round" />
                          </svg>
                          <span className={`absolute text-sm font-bold ${getScoreColor(result.promptScore)}`}>{result.promptScore}</span>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">{gt.scoreTitle}</h3>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                            {result.promptScore >= 80 ? gt.scoreExcellent :
                             result.promptScore >= 60 ? gt.scoreGood :
                             gt.scoreFair}
                          </p>
                        </div>
                      </div>

                      {/* ── Quality Breakdown ── */}
                      <div className="grid grid-cols-2 gap-2 mb-5">
                        {Object.entries(result.qualityBreakdown).map(([key, value]) => (
                          <div key={key} className="flex items-center gap-2">
                            <span className="text-[10px] text-gray-500 dark:text-gray-400 w-20 shrink-0">{qualityLabels[key as keyof QualityBreakdown]}</span>
                            <div className="flex-1 h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                              <motion.div
                                className={`h-full rounded-full ${value >= 80 ? 'bg-emerald-400' : value >= 60 ? 'bg-amber-400' : 'bg-rose-400'}`}
                                initial={{ width: 0 }}
                                animate={{ width: `${value}%` }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                              />
                            </div>
                            <span className="text-[10px] font-medium text-gray-600 dark:text-gray-400 w-6 text-right">{value}</span>
                          </div>
                        ))}
                      </div>

                      {/* ── Tabs ── */}
                      <div className="flex items-center gap-1 mb-4 bg-gray-100 dark:bg-gray-800 rounded-xl p-1">
                        {tabs.map((t) => (
                          <button
                            key={t.id}
                            onClick={() => setActiveTab(t.id)}
                            className={`flex-1 py-2 px-2 rounded-lg text-xs font-medium transition-all ${
                              activeTab === t.id
                                ? 'bg-white dark:bg-gray-700 text-violet-600 dark:text-violet-400 shadow-sm'
                                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                            }`}
                          >
                            {t.label}
                          </button>
                        ))}
                      </div>

                      {/* ── Prompt Content ── */}
                      <div className="relative mb-4">
                        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-800 overflow-hidden">
                          <div className="flex items-center justify-between px-3 py-2 bg-gray-100/50 dark:bg-gray-800/80 border-b border-gray-100 dark:border-gray-700">
                            <span className="text-[10px] font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">{gt.generatedPromptLabel}</span>
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => handleCopy()}
                                className="p-1.5 rounded-md hover:bg-white dark:hover:bg-gray-700 transition-colors text-gray-500 dark:text-gray-400"
                                title="Copy prompt"
                              >
                                {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                              </button>
                            </div>
                          </div>
                          <pre className="text-xs font-mono text-gray-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed p-4 overflow-auto max-h-[300px]">
                            {improving ? (
                              <div className="flex items-center gap-2 text-gray-400">
                                <Loader2 className="w-3.5 h-3.5 animate-spin" /> {gt.improvingText}
                              </div>
                            ) : getTabContent()}
                          </pre>
                        </div>
                      </div>

                      {/* ── Action Bar ── */}
                      <div className="flex flex-wrap items-center gap-1.5 mb-4">
                        <ActionButton icon={copied ? Check : Copy} label={copied ? gt.actionCopied : gt.actionCopy} onClick={() => handleCopy()} active={copied} />
                        <ActionButton icon={saved ? Check : Bookmark} label={saved ? gt.actionSaved : gt.actionSave} onClick={handleSave} active={saved} />
                        <ActionButton icon={RefreshCw} label={gt.actionRegenerate} onClick={handleGenerate} disabled={generating} />
                        <ActionButton icon={Sparkles} label={gt.actionImprove} onClick={() => handleImprove('improve')} disabled={improving} />
                        <ActionButton icon={ArrowRight} label={gt.actionShorter} onClick={() => handleImprove('shorter')} disabled={improving} />
                        <ActionButton icon={TrendingUp} label={gt.actionDetailed} onClick={() => handleImprove('more-detailed')} disabled={improving} />
                        <ActionButton icon={Award} label={gt.actionPro} onClick={() => handleImprove('more-professional')} disabled={improving} />
                        <ActionButton icon={FileText} label={gt.actionExamples} onClick={() => handleImprove('add-examples')} disabled={improving} />
                        <ActionButton icon={Shield} label={gt.actionConstraints} onClick={() => handleImprove('add-constraints')} disabled={improving} />
                      </div>

                      {/* ── Why It Works ── */}
                      <div className="mb-4">
                        <button
                          onClick={() => setShowWhy(!showWhy)}
                          className="flex items-center gap-2 text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 transition-colors mb-2"
                        >
                          <Lightbulb className="w-3.5 h-3.5" />
                          {gt.whyToggle}
                          {showWhy ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                        </button>
                        <AnimatePresence>
                          {showWhy && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <p className="text-xs text-indigo-600 dark:text-indigo-400 leading-relaxed bg-indigo-50 dark:bg-indigo-900/10 rounded-lg p-3">
                                {result.whyItWorks}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* ── Variables ── */}
                      {result.variables.length > 0 && (
                        <div className="mb-4">
                          <p className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">{gt.variablesLabel}</p>
                          <div className="flex flex-wrap gap-1.5">
                            {result.variables.map((v, i) => (
                              <span key={i} className="px-2 py-1 bg-violet-50 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300 rounded-md text-[10px] font-medium border border-violet-100 dark:border-violet-800/30">
                                {v}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* ── Best Model ── */}
                      <div className="flex items-center gap-2 mb-4 px-3 py-2 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-100 dark:border-gray-800">
                        <Zap className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                        <span className="text-xs text-gray-600 dark:text-gray-400">
                          <span className="font-medium">{gt.bestModelLabel}</span>{' '}
                          {result.bestModel}
                        </span>
                      </div>

                      {/* ── Common Mistakes ── */}
                      <div className="mb-4">
                        <p className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">{gt.mistakesLabel}</p>
                        <div className="space-y-1">
                          {result.commonMistakes.map((m, i) => (
                            <div key={i} className="flex items-start gap-2 text-xs text-gray-600 dark:text-gray-400">
                              <Ban className="w-3 h-3 text-rose-400 shrink-0 mt-0.5" />
                              {m}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* ── Follow-up Prompts ── */}
                      <div className="mt-auto">
                        <p className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">{gt.followupsLabel}</p>
                        <div className="space-y-1.5">
                          {result.followUpPrompts.map((f, i) => (
                            <button
                              key={i}
                              onClick={() => handleCopy(f)}
                              className="flex items-center gap-2 w-full text-left px-3 py-2 bg-gray-50 dark:bg-gray-800/50 hover:bg-violet-50 dark:hover:bg-violet-900/20 rounded-lg text-xs text-gray-600 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 transition-all group"
                            >
                              <ArrowRight className="w-3 h-3 text-gray-400 group-hover:text-violet-500 transition-colors shrink-0" />
                              <span className="flex-1 truncate">{f}</span>
                              <Copy className="w-3 h-3 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                            </button>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>

          {/* ── Features Section ── */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
            {[
              { icon: Zap, title: gt.feature1Title, desc: gt.feature1Desc },
              { icon: Sliders, title: gt.feature2Title, desc: gt.feature2Desc },
              { icon: BarChart3, title: gt.feature3Title, desc: gt.feature3Desc },
              { icon: Layers, title: gt.feature4Title, desc: gt.feature4Desc },
            ].map((f, i) => (
              <motion.div
                key={`${f.title}-${i}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center p-5 bg-white/50 dark:bg-gray-900/40 rounded-xl border border-gray-100 dark:border-gray-800"
              >
                <div className="w-10 h-10 bg-violet-50 dark:bg-violet-900/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <f.icon className="w-5 h-5 text-violet-600" />
                </div>
                <h4 className="font-medium text-gray-900 dark:text-white text-sm mb-1">{f.title}</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">{f.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* ── Pro Tips ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto mt-16"
          >
            <h3 className="font-heading font-semibold text-xl text-gray-900 dark:text-white mb-5 text-center">
              {gt.proTipsTitle}
            </h3>
            <div className="space-y-3">
              {[
                gt.proTip1,
                gt.proTip2,
                gt.proTip3,
                gt.proTip4,
                gt.proTip5,
              ].map((tip, i) => (
                <div key={i} className="flex items-start gap-3 p-3.5 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-800">
                  <div className="w-5 h-5 bg-violet-50 dark:bg-violet-900/20 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    <ChevronRight className="w-3 h-3 text-violet-500" />
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">{tip}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── CTA Banner ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 text-center bg-gradient-to-r from-violet-600 to-indigo-600 rounded-2xl p-8 lg:p-10"
          >
            <h3 className="font-heading font-semibold text-xl lg:text-2xl text-white mb-2">
              {gt.ctaBannerTitle}
            </h3>
            <p className="text-violet-100 text-sm mb-6 max-w-md mx-auto">
              {gt.ctaBannerDesc}
            </p>
            <div className="flex items-center justify-center gap-3">
              <Link
                to="/pricing"
                className="px-6 py-3 bg-white text-violet-600 rounded-xl font-semibold text-sm hover:bg-violet-50 transition-colors shadow-lg"
              >
                {gt.ctaBannerButton1}
              </Link>
              <Link
                to="/tools/free-ai-prompt-generator"
                className="px-6 py-3 bg-violet-700 text-white rounded-xl font-semibold text-sm hover:bg-violet-800 transition-colors border border-violet-500"
              >
                {gt.ctaBannerButton2}
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  ACTION BUTTON                                                      */
/* ------------------------------------------------------------------ */

function ActionButton({ icon: Icon, label, onClick, disabled, active }: { icon: React.ElementType; label: string; onClick: () => void; disabled?: boolean; active?: boolean }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[10px] font-medium transition-all ${
        active
          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
          : 'bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-100 dark:border-gray-700 hover:bg-violet-50 dark:hover:bg-violet-900/20 hover:text-violet-600 dark:hover:text-violet-400 hover:border-violet-200'
      } disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      <Icon className="w-3 h-3" />
      {label}
    </button>
  );
}
