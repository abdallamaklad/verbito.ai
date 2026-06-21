import { usePageTranslations } from '@/hooks/useTranslation';
import { generator as gt } from '@/lib/translations/generator';
import type { PromptGenerationResult } from '@/types';
import { AnimatePresence,motion } from 'framer-motion';
import {
AlertTriangle,
ArrowRight,
Check,
ChevronDown,
ChevronUp,
Copy,
Lightbulb,
Loader2,
RotateCcw,Shield,
Sparkles,
Stethoscope,
TrendingUp,
Wand2,
Zap
} from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../../components/shared/SEOHead';
import { generatePrompt } from '../../services/openai';

/* ------------------------------------------------------------------ */
/*  DIAGNOSIS DATA                                                     */
/* ------------------------------------------------------------------ */

interface DiagnosisIssue {
  type: 'critical' | 'warning' | 'suggestion';
  title: string;
  description: string;
  fix: string;
}

function diagnosePrompt(prompt: string): DiagnosisIssue[] {
  const issues: DiagnosisIssue[] = [];
  const lower = prompt.toLowerCase();

  if (prompt.length < 30) {
    issues.push({
      type: 'critical',
      title: 'Too vague',
      description: 'Your prompt is very short. AI models need context to produce quality results.',
      fix: 'Add specific details about what you want, your goals, and any constraints.',
    });
  }

  if (!lower.includes('you are') && !lower.includes('act as') && !lower.includes('role:') && !lower.includes('role of')) {
    issues.push({
      type: 'warning',
      title: 'No role assignment',
      description: 'You haven\'t assigned a role to the AI. Role assignment improves output quality by 40%.',
      fix: 'Start with "You are an expert [role]..." to guide the AI\'s response style.',
    });
  }

  if (!lower.includes('format') && !lower.includes('structure') && !lower.includes('output') && !lower.includes('return')) {
    issues.push({
      type: 'warning',
      title: 'No output format specified',
      description: 'Without format instructions, the AI may return unstructured text.',
      fix: 'Add "Provide your response as..." with your preferred format (bullet points, table, JSON, etc.).',
    });
  }

  if (!lower.includes('example') && !lower.includes('for instance')) {
    issues.push({
      type: 'suggestion',
      title: 'No examples provided',
      description: 'Examples (few-shot prompting) dramatically improve response accuracy.',
      fix: 'Include an example of the input and expected output format.',
    });
  }

  if (!lower.includes('avoid') && !lower.includes('don\'t') && !lower.includes('do not')) {
    issues.push({
      type: 'suggestion',
      title: 'No constraints set',
      description: 'Without constraints, the AI may include unwanted content or go off-topic.',
      fix: 'Add a "Constraints" or "Avoid" section listing what should not be included.',
    });
  }

  if (prompt.length > 0 && !lower.includes('audience') && !lower.includes('reader') && !lower.includes('target')) {
    issues.push({
      type: 'suggestion',
      title: 'Target audience not defined',
      description: 'Knowing the audience helps the AI adjust language complexity and tone.',
      fix: 'Mention who the content is for (e.g., beginners, executives, children).',
    });
  }

  if (lower.includes('etc') || lower.includes('...') || lower.includes('and so on')) {
    issues.push({
      type: 'warning',
      title: 'Ambiguous instructions',
      description: 'Using "etc." or "..." leaves too much to the AI\'s interpretation.',
      fix: 'Be explicit and list all items or requirements instead of using placeholders.',
    });
  }

  if (!lower.includes('step') && !lower.includes('first') && !lower.includes('1.')) {
    issues.push({
      type: 'suggestion',
      title: 'Consider adding step-by-step instructions',
      description: 'Breaking complex tasks into steps improves AI reasoning and output structure.',
      fix: 'For complex tasks, ask the AI to think step-by-step or provide numbered instructions.',
    });
  }

  if (issues.length === 0) {
    issues.push({
      type: 'suggestion',
      title: 'Great prompt!',
      description: 'Your prompt looks well-structured. You could still optimize it further.',
      fix: 'Try adding more context or using the full generator for the best results.',
    });
  }

  return issues;
}

/* ------------------------------------------------------------------ */
/*  COMPONENT                                                          */
/* ------------------------------------------------------------------ */

export default function PromptDoctor() {
  const tt = usePageTranslations(gt);
  const [badPrompt, setBadPrompt] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [diagnosis, setDiagnosis] = useState<DiagnosisIssue[] | null>(null);
  const [improvedPrompt, setImprovedPrompt] = useState<PromptGenerationResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [showIssues, setShowIssues] = useState(true);

  const handleDiagnose = async () => {
    if (!badPrompt.trim()) return;
    setAnalyzing(true);
    setDiagnosis(null);
    setImprovedPrompt(null);

    // Run diagnosis immediately
    const issues = diagnosePrompt(badPrompt);
    setDiagnosis(issues);

    // Generate improved version
    try {
      const res = await generatePrompt({
        goal: `Improve and rewrite the following prompt to make it more effective and structured. Original prompt: ${badPrompt}`,
        category: 'custom',
        outputType: 'custom',
        targetModel: 'chatgpt',
        language: 'English',
      });
      setImprovedPrompt(res);
    } catch {
      // Silent fail
    } finally {
      setAnalyzing(false);
    }
  };

  const handleCopy = () => {
    if (improvedPrompt?.finalPrompt) {
      navigator.clipboard.writeText(improvedPrompt.finalPrompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleReset = () => {
    setBadPrompt('');
    setDiagnosis(null);
    setImprovedPrompt(null);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-600';
    if (score >= 60) return 'text-amber-600';
    return 'text-rose-600';
  };

  const issueScore = diagnosis
    ? Math.max(30, 100 - diagnosis.filter(i => i.type === 'critical').length * 20 - diagnosis.filter(i => i.type === 'warning').length * 10 - diagnosis.filter(i => i.type === 'suggestion').length * 5)
    : 0;

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } }),
  };

  return (
    <>
      <SEOHead
        title="Prompt Doctor — Fix & Improve Your AI Prompts | Verbito.ai"
        description="Paste your prompt and get instant diagnosis with specific fixes. Improve your AI prompts for ChatGPT, Claude, and Gemini with our free Prompt Doctor tool."
        ogImage="/og-default.jpg"
      />

      <div className="min-h-[100dvh] pt-24 pb-16 bg-gradient-to-br from-amber-50 via-white to-orange-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {/* ── Hero ── */}
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0} className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/20 dark:to-orange-900/20 mb-4">
              <Stethoscope className="w-7 h-7 text-amber-600" />
            </div>
            <h1 className="font-heading font-bold text-3xl sm:text-4xl text-gray-900 dark:text-white mb-3">
              Prompt Doctor
            </h1>
            <p className="text-gray-600 dark:text-gray-400 max-w-lg mx-auto text-sm">
              Paste your prompt and get an instant diagnosis with specific fixes. Transform weak prompts into powerful ones.
            </p>
          </motion.div>

          {/* ── Input Section ── */}
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={1} className="mb-8">
            <div className="bg-white/70 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/60 dark:border-gray-700/60 rounded-2xl p-6 lg:p-8 shadow-sm">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-800 dark:text-gray-200 mb-3">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                {tt.pastePrompt}
              </label>
              <textarea
                value={badPrompt}
                onChange={(e) => setBadPrompt(e.target.value)}
                placeholder={tt.pastePromptPlaceholder}
                rows={6}
                className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 resize-none dark:text-gray-200 dark:placeholder-gray-500 transition-all mb-4"
              />
              <div className="flex items-center gap-3">
                <motion.button
                  onClick={handleDiagnose}
                  disabled={!badPrompt.trim() || analyzing}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-semibold hover:from-amber-600 hover:to-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-orange-500/20 text-sm"
                >
                  {analyzing ? <Loader2 className="w-5 h-5 animate-spin" /> : <Stethoscope className="w-5 h-5" />}
                  {analyzing ? tt.improving : tt.improve}
                </motion.button>
                {(diagnosis || improvedPrompt) && (
                  <button
                    onClick={handleReset}
                    className="flex items-center gap-1.5 px-4 py-3.5 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 rounded-xl text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" />
                    {tt.newPrompt}
                  </button>
                )}
              </div>
            </div>
          </motion.div>

          {/* ── Results ── */}
          <AnimatePresence>
            {diagnosis && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* Score Card */}
                <div className="bg-white/70 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/60 dark:border-gray-700/60 rounded-2xl p-6 shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className="relative w-20 h-20">
                      <svg className="w-20 h-20 -rotate-90" viewBox="0 0 36 36">
                        <path className="text-gray-100 dark:text-gray-800" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="2.5" />
                        <motion.path
                          className={issueScore >= 70 ? 'stroke-emerald-500' : issueScore >= 50 ? 'stroke-amber-500' : 'stroke-rose-500'}
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeDasharray={`${issueScore}, 100`}
                          strokeLinecap="round"
                          initial={{ strokeDasharray: '0, 100' }}
                          animate={{ strokeDasharray: `${issueScore}, 100` }}
                          transition={{ duration: 1 }}
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className={`text-lg font-bold ${getScoreColor(issueScore)}`}>{issueScore}</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                        {tt.promptHealthScore}
                      </h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                        {issueScore >= 80
                          ? tt.goodStructure
                          : issueScore >= 60
                            ? tt.decentPrompt
                            : tt.needsImprovement}
                      </p>
                      <div className="flex items-center gap-3 mt-2 text-xs">
                        {diagnosis.filter(i => i.type === 'critical').length > 0 && (
                          <span className="flex items-center gap-1 text-rose-600">
                            <AlertTriangle className="w-3 h-3" /> {diagnosis.filter(i => i.type === 'critical').length} {tt.critical}
                          </span>
                        )}
                        {diagnosis.filter(i => i.type === 'warning').length > 0 && (
                          <span className="flex items-center gap-1 text-amber-600">
                            <Shield className="w-3 h-3" /> {diagnosis.filter(i => i.type === 'warning').length} {tt.warnings}
                          </span>
                        )}
                        {diagnosis.filter(i => i.type === 'suggestion').length > 0 && (
                          <span className="flex items-center gap-1 text-blue-600">
                            <Lightbulb className="w-3 h-3" /> {diagnosis.filter(i => i.type === 'suggestion').length} {tt.suggestions}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Issues List */}
                <div className="bg-white/70 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/60 dark:border-gray-700/60 rounded-2xl p-6 shadow-sm">
                  <button
                    onClick={() => setShowIssues(!showIssues)}
                    className="flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-white mb-4"
                  >
                    {tt.diagnosisResults}
                    {showIssues ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                  <AnimatePresence>
                    {showIssues && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="space-y-3 overflow-hidden"
                      >
                        {diagnosis.map((issue, i) => (
                          <div
                            key={i}
                            className={`p-4 rounded-xl border ${
                              issue.type === 'critical'
                                ? 'bg-rose-50 dark:bg-rose-900/10 border-rose-100 dark:border-rose-900/20'
                                : issue.type === 'warning'
                                  ? 'bg-amber-50 dark:bg-amber-900/10 border-amber-100 dark:border-amber-900/20'
                                  : 'bg-blue-50 dark:bg-blue-900/10 border-blue-100 dark:border-blue-900/20'
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              {issue.type === 'critical' && <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />}
                              {issue.type === 'warning' && <Shield className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />}
                              {issue.type === 'suggestion' && <Lightbulb className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />}
                              <div>
                                <h4 className={`text-sm font-semibold ${
                                  issue.type === 'critical'
                                    ? 'text-rose-700 dark:text-rose-300'
                                    : issue.type === 'warning'
                                      ? 'text-amber-700 dark:text-amber-300'
                                      : 'text-blue-700 dark:text-blue-300'
                                }`}>
                                  {issue.title}
                                </h4>
                                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{issue.description}</p>
                                <p className={`text-xs mt-1.5 font-medium ${
                                  issue.type === 'critical'
                                    ? 'text-rose-600 dark:text-rose-400'
                                    : issue.type === 'warning'
                                      ? 'text-amber-600 dark:text-amber-400'
                                      : 'text-blue-600 dark:text-blue-400'
                                }`}>
                                  Fix: {issue.fix}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Improved Prompt */}
                {improvedPrompt && (
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white/70 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/60 dark:border-gray-700/60 rounded-2xl p-6 shadow-sm"
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <Wand2 className="w-5 h-5 text-violet-500" />
                      <h3 className="text-sm font-semibold text-gray-900 dark:text-white">{tt.improvedPrompt}</h3>
                    </div>

                    {/* Quality Score */}
                    <div className="flex items-center gap-3 mb-4 px-3 py-2 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                      <TrendingUp className={`w-4 h-4 ${getScoreColor(improvedPrompt.promptScore)}`} />
                      <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                        {tt.improvedScore}: {improvedPrompt.promptScore}/100
                      </span>
                      <div className="flex-1 h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-violet-500 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${improvedPrompt.promptScore}%` }}
                          transition={{ duration: 0.8 }}
                        />
                      </div>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-800 overflow-hidden mb-4">
                      <div className="flex items-center justify-between px-3 py-2 bg-gray-100/50 dark:bg-gray-800/80 border-b border-gray-100 dark:border-gray-700">
                        <span className="text-[10px] font-medium text-gray-500 uppercase tracking-wider">{tt.rewrittenPrompt}</span>
                        <button
                          onClick={handleCopy}
                          className="p-1.5 rounded-md hover:bg-white dark:hover:bg-gray-700 transition-colors"
                          title={tt.copy}
                        >
                          {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5 text-gray-500" />}
                        </button>
                      </div>
                      <pre className="text-xs font-mono text-gray-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed p-4 max-h-[350px] overflow-auto">
                        {improvedPrompt.finalPrompt}
                      </pre>
                    </div>

                    {/* Why it works */}
                    <div className="p-3 bg-indigo-50 dark:bg-indigo-900/10 rounded-lg border border-indigo-100 dark:border-indigo-900/20 mb-4">
                      <div className="flex items-start gap-2">
                        <Lightbulb className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                        <p className="text-xs text-indigo-600 dark:text-indigo-400 leading-relaxed">
                          {improvedPrompt.whyItWorks}
                        </p>
                      </div>
                    </div>

                    {/* Variables */}
                    {improvedPrompt.variables.length > 0 && (
                      <div className="mb-4">
                        <p className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">{tt.customizeVariables}</p>
                        <div className="flex flex-wrap gap-1.5">
                          {improvedPrompt.variables.map((v, i) => (
                            <span key={i} className="px-2 py-1 bg-violet-50 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300 rounded text-[10px] font-medium">
                              {v}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Best Model */}
                    <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 dark:bg-gray-800/50 rounded-lg mb-4">
                      <Zap className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        <span className="font-medium">{tt.recommendedModel}:</span> {improvedPrompt.bestModel}
                      </span>
                    </div>

                    {/* Follow-ups */}
                    <div>
                      <p className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">{tt.followUps}</p>
                      <div className="space-y-1.5">
                        {improvedPrompt.followUpPrompts.map((f, i) => (
                          <button
                            key={i}
                            onClick={() => {
                              navigator.clipboard.writeText(f);
                              setCopied(true);
                              setTimeout(() => setCopied(false), 2000);
                            }}
                            className="flex items-center gap-2 w-full text-left px-3 py-2 bg-gray-50 dark:bg-gray-800/50 hover:bg-violet-50 dark:hover:bg-violet-900/20 rounded-lg text-xs text-gray-600 dark:text-gray-400 hover:text-violet-600 transition-all group"
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
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Educational Content ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16"
          >
            <h2 className="font-heading font-semibold text-2xl text-gray-900 dark:text-white mb-4">
              {tt.commonProblems}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: 'Too vague', desc: 'Write about marketing → produces generic content.', fix: 'Specify: "Write a 500-word blog post about email marketing for SaaS startups with 5 actionable tips."' },
                { title: 'No role assigned', desc: 'The AI has no context for expertise level.', fix: 'Start with: "You are an experienced email marketing consultant..."' },
                { title: 'Missing constraints', desc: 'Output may be too long, off-topic, or use wrong tone.', fix: 'Add: "Keep it under 500 words, use a professional tone, avoid jargon."' },
                { title: 'No format specified', desc: 'Get wall of text instead of structured output.', fix: 'Request: "Format as bullet points with bold headings."' },
                { title: 'No context', desc: 'AI makes wrong assumptions about audience.', fix: 'Include: "Target audience: busy professionals aged 30-45."' },
                { title: 'No examples', desc: 'AI doesn\'t know the style you want.', fix: 'Provide: "Here\'s an example of the style I like: [example]"' },
              ].map((item, i) => (
                <div key={i} className="p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700">
                  <h4 className="font-medium text-sm text-gray-900 dark:text-white mb-1">{item.title}</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">{item.desc}</p>
                  <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">{item.fix}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── CTA ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 text-center bg-gradient-to-r from-violet-600 to-indigo-600 rounded-2xl p-8"
          >
            <h3 className="font-heading font-semibold text-xl text-white mb-2">
              {tt.wantGenerate}
            </h3>
            <p className="text-violet-100 text-sm mb-6">
              {tt.useFullGenerator}
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
