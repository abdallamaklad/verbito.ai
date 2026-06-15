import { usePageTranslations } from '@/hooks/useTranslation';
import { motion } from 'framer-motion';
import {
Bookmark,
BookOpen,
Bot,
Check,
ChevronRight,
Clock,
Code2,
Copy,
Crown,
Database,GraduationCap,
Layers,
Mail,
MessageSquare,
Palette as PaletteIcon,
PenTool,
Search as SearchIcon,
Share2,
Sparkles,
Target,
TrendingUp,
Zap
} from 'lucide-react';
import { useState } from 'react';
import { Link,useParams } from 'react-router-dom';
import SEOHead from '../components/shared/SEOHead';
import { promptCategories,prompts } from '../lib/data/prompts';

const categoryIcons: Record<string, React.ReactNode> = {
  'Business': <Target className="w-4 h-4" />,
  'Marketing': <TrendingUp className="w-4 h-4" />,
  'Sales': <Zap className="w-4 h-4" />,
  'Content Creation': <PenTool className="w-4 h-4" />,
  'Social Media': <Share2 className="w-4 h-4" />,
  'SEO': <SearchIcon className="w-4 h-4" />,
  'Email Writing': <Mail className="w-4 h-4" />,
  'Coding': <Code2 className="w-4 h-4" />,
  'Data Analysis': <Database className="w-4 h-4" />,
  'Education': <GraduationCap className="w-4 h-4" />,
  'Research': <SearchIcon className="w-4 h-4" />,
  'Productivity': <Layers className="w-4 h-4" />,
  'Automation': <Bot className="w-4 h-4" />,
  'ChatGPT Prompts': <MessageSquare className="w-4 h-4" />,
  'Midjourney Prompts': <PaletteIcon className="w-4 h-4" />,
};

export default function PromptDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  const gt = usePageTranslations('gen');
  const ct = usePageTranslations('common');

  const prompt = prompts.find((p) => p.slug === slug);

  // Related prompts (same category, excluding current)
  const related = prompt
    ? prompts.filter((p) => p.category === prompt.category && p.id !== prompt.id).slice(0, 4)
    : [];

  const handleCopy = async () => {
    if (!prompt) return;
    try {
      await navigator.clipboard.writeText(prompt.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* ignore */ }
  };

  if (!prompt) {
    return (
      <>
        <SEOHead title="Prompt Not Found — Verbito.ai" />
        <div className="pt-28 pb-12 min-h-[100dvh] bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
          <div className="text-center">
            <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h1 className="font-heading font-bold text-2xl text-gray-900 dark:text-white mb-2">Prompt Not Found</h1>
            <p className="text-gray-500 mb-4">This prompt doesn\'t exist or may have been moved.</p>
            <Link to="/prompts" className="text-violet-600 hover:underline font-medium">
              Browse all prompts
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <SEOHead
        title={`${prompt.title} — Verbito.ai Prompt Library`}
        description={prompt.description}
        canonicalUrl={`https://verbito.ai/prompt/${prompt.slug}`}
      />

      <section className="pt-28 pb-12 bg-gray-50 dark:bg-gray-950">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
              <Link to="/prompts" className="hover:text-violet-600 transition-colors">Prompt Library</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <Link to={`/prompts/${prompt.category}`} className="hover:text-violet-600 transition-colors flex items-center gap-1">
                {categoryIcons[prompt.category]}
                {prompt.category}
              </Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-gray-400 truncate max-w-[200px]">{prompt.title}</span>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                {/* Header */}
                <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 mb-6">
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    <span className="inline-flex items-center gap-1 text-xs font-medium bg-violet-100 dark:bg-violet-900/20 text-violet-700 dark:text-violet-400 px-3 py-1 rounded-full">
                      {categoryIcons[prompt.category]}
                      {prompt.category}
                    </span>
                    {prompt.id <= 5 && (
                      <span className="inline-flex items-center gap-1 text-xs font-medium bg-amber-100 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 px-3 py-1 rounded-full">
                        <Crown className="w-3 h-3" />
                        {ct.pro}
                      </span>
                    )}
                  </div>
                  <h1 className="font-heading font-bold text-3xl text-gray-900 dark:text-white mb-3">
                    {prompt.title}
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {prompt.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      ~2 min read
                    </span>
                    <span className="flex items-center gap-1">
                      <BookOpen className="w-4 h-4" />
                      {prompt.content.split(' ').length} words
                    </span>
                  </div>
                </div>

                {/* Prompt Content */}
                <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-semibold text-gray-900 dark:text-white">{gt.copyPrompt}</h2>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSaved(!saved)}
                        className={`p-2 rounded-lg transition-colors ${
                          saved
                            ? 'bg-violet-100 dark:bg-violet-900/20 text-violet-600'
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-500 hover:bg-gray-200'
                        }`}
                      >
                        <Bookmark className="w-4 h-4" />
                      </button>
                      <button
                        onClick={handleCopy}
                        className="inline-flex items-center gap-1.5 px-3 py-2 bg-violet-600 text-white rounded-lg text-sm font-medium hover:bg-violet-700 transition-colors"
                      >
                        {copied ? (
                          <><Check className="w-3.5 h-3.5" /> {ct.copied}</>
                        ) : (
                          <><Copy className="w-3.5 h-3.5" /> {gt.copyPrompt}</>
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 border border-gray-200 dark:border-gray-800">
                    <pre className="text-sm text-gray-800 dark:text-gray-200 whitespace-pre-wrap font-mono leading-relaxed">
                      {prompt.content}
                    </pre>
                  </div>
                </div>

                {/* Customization Guide */}
                <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 mb-6">
                  <h2 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-amber-500" />
                    How to Customize This Prompt
                  </h2>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-violet-100 dark:bg-violet-900/20 rounded-full flex items-center justify-center text-xs font-bold text-violet-600 shrink-0">1</div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        <strong className="text-gray-900 dark:text-white">Identify placeholders</strong> — Look for text in [brackets] like [INSERT BUSINESS TYPE] or [DESCRIBE TARGET AUDIENCE]. These are your customization points.
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-violet-100 dark:bg-violet-900/20 rounded-full flex items-center justify-center text-xs font-bold text-violet-600 shrink-0">2</div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        <strong className="text-gray-900 dark:text-white">Fill in your details</strong> — Replace each placeholder with specific information about your use case. The more specific, the better the output.
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-violet-100 dark:bg-violet-900/20 rounded-full flex items-center justify-center text-xs font-bold text-violet-600 shrink-0">3</div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        <strong className="text-gray-900 dark:text-white">Adjust tone and constraints</strong> — Modify the tone, length, or format instructions to match your exact needs.
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-violet-100 dark:bg-violet-900/20 rounded-full flex items-center justify-center text-xs font-bold text-violet-600 shrink-0">4</div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        <strong className="text-gray-900 dark:text-white">Iterate and refine</strong> — Use the AI\'s first output as a starting point. Refine your prompt based on what works and what doesn\'t.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Example Output */}
                <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 mb-6">
                  <h2 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-emerald-500" />
                    Example Output
                  </h2>
                  <div className="bg-emerald-50/50 dark:bg-emerald-900/10 rounded-xl p-4 border border-emerald-100 dark:border-emerald-900/20">
                    <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                      After filling in the placeholders with your specific details and submitting to ChatGPT, Claude, or Gemini, you can expect a comprehensive, structured response tailored to your exact requirements. The output will follow the format specified in the prompt template above.
                    </p>
                  </div>
                  <div className="mt-4 flex items-center gap-2">
                    <Link
                      to={`/prompt-generator?prompt=${encodeURIComponent(prompt.title)}`}
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-violet-600 text-white rounded-lg text-sm font-medium hover:bg-violet-700 transition-colors"
                    >
                      <Sparkles className="w-4 h-4" />
                      {gt.improve}
                    </Link>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6"
              >
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Actions</h3>
                <div className="space-y-2">
                  <button
                    onClick={handleCopy}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-violet-600 text-white rounded-xl font-medium hover:bg-violet-700 transition-colors"
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    {copied ? ct.copied : gt.copyPrompt}
                  </button>
                  <Link
                    to="/prompt-generator"
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  >
                    <Sparkles className="w-4 h-4" />
                    Customize in Generator
                  </Link>
                  <button
                    onClick={() => setSaved(!saved)}
                    className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors ${
                      saved
                        ? 'bg-violet-100 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200'
                    }`}
                  >
                    <Bookmark className="w-4 h-4" />
                    {saved ? ct.save : gt.savePrompt}
                  </button>
                </div>
              </motion.div>

              {/* Pro Upgrade Card */}
              {prompt.id <= 5 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-amber-50 dark:bg-amber-900/10 rounded-2xl border border-amber-200 dark:border-amber-800 p-6"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Crown className="w-5 h-5 text-amber-600" />
                    <h3 className="font-semibold text-amber-900 dark:text-amber-400">Premium Template</h3>
                  </div>
                  <p className="text-sm text-amber-800 dark:text-amber-300 mb-4">
                    This is a premium template. Upgrade to Pro for full access to all 200+ templates.
                  </p>
                  <Link
                    to="/pricing"
                    className="block w-full text-center px-4 py-3 bg-amber-500 text-white rounded-xl font-medium hover:bg-amber-600 transition-colors"
                  >
                    {ct.upgrade}
                  </Link>
                </motion.div>
              )}

              {/* Related Prompts */}
              {related.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6"
                >
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Related Prompts</h3>
                  <div className="space-y-3">
                    {related.map((r) => (
                      <Link
                        key={r.id}
                        to={`/prompt/${r.slug}`}
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group"
                      >
                        <div className={`w-8 h-8 ${r.color} rounded-lg flex items-center justify-center text-white text-xs font-bold shrink-0`}>
                          {r.title.charAt(0)}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors truncate">
                            {r.title}
                          </p>
                          <p className="text-xs text-gray-500">{r.category}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Categories */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6"
              >
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Categories</h3>
                <div className="flex flex-wrap gap-2">
                  {promptCategories.slice(0, 10).map((cat) => (
                    <Link
                      key={cat}
                      to={`/prompts/${cat}`}
                      className="text-xs px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full hover:bg-violet-100 dark:hover:bg-violet-900/20 hover:text-violet-700 dark:hover:text-violet-400 transition-colors"
                    >
                      {cat}
                    </Link>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
