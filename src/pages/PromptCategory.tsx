import { usePageTranslations } from '@/hooks/useTranslation';
import { motion } from 'framer-motion';
import {
ArrowLeft,
Bot,
Check,
Code2,
Copy,
Crown,
Database,
FolderOpen,
GraduationCap,
Layers,
Mail,
MessageSquare,
Palette as PaletteIcon,
PenTool,
Search,
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
  'Business': <Target className="w-5 h-5" />,
  'Marketing': <TrendingUp className="w-5 h-5" />,
  'Sales': <Zap className="w-5 h-5" />,
  'Content Creation': <PenTool className="w-5 h-5" />,
  'Social Media': <Share2 className="w-5 h-5" />,
  'SEO': <SearchIcon className="w-5 h-5" />,
  'Email Writing': <Mail className="w-5 h-5" />,
  'Coding': <Code2 className="w-5 h-5" />,
  'Data Analysis': <Database className="w-5 h-5" />,
  'Education': <GraduationCap className="w-5 h-5" />,
  'Research': <SearchIcon className="w-5 h-5" />,
  'Productivity': <Layers className="w-5 h-5" />,
  'Automation': <Bot className="w-5 h-5" />,
  'ChatGPT Prompts': <MessageSquare className="w-5 h-5" />,
  'Midjourney Prompts': <PaletteIcon className="w-5 h-5" />,
};

const categoryDescriptions: Record<string, string> = {
  'Business': 'Expert prompts for business strategy, planning, operations, and growth.',
  'Marketing': 'High-converting prompts for marketing campaigns, ads, and brand building.',
  'Sales': 'Prompts designed to boost sales performance and close more deals.',
  'Content Creation': 'Creative prompts for blogs, videos, podcasts, and multimedia content.',
  'Social Media': 'Engaging prompts for all major social media platforms.',
  'SEO': 'Data-driven prompts for search engine optimization and content strategy.',
  'Email Writing': 'Professional email prompts for marketing, sales, and communication.',
  'Coding': 'Developer-focused prompts for code generation, review, and debugging.',
  'Data Analysis': 'Analytical prompts for extracting insights from any dataset.',
  'Education': 'Teaching and learning prompts for educators and students.',
  'Research': 'Academic and market research prompts for deep investigation.',
  'Productivity': 'Workflow automation and personal productivity prompts.',
  'Automation': 'Business process automation and integration prompts.',
  'ChatGPT Prompts': 'Advanced prompts optimized specifically for ChatGPT.',
  'Midjourney Prompts': 'Visual art and image generation prompts for Midjourney.',
};

export default function PromptCategory() {
  const { category } = useParams<{ category: string }>();
  const [search, setSearch] = useState('');
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const gt = usePageTranslations('gen');
  const ct = usePageTranslations('common');

  const categoryName = category || 'All';
  const isValidCategory = promptCategories.includes(categoryName);

  const filtered = prompts.filter((p) => {
    const matchCategory = p.category === categoryName;
    const matchSearch = !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  const handleCopy = async (text: string, id: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch { /* ignore */ }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1, y: 0,
      transition: { delay: i * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
    }),
  };

  return (
    <>
      <SEOHead
        title={`${categoryName} Prompts — Verbito.ai`}
        description={categoryDescriptions[categoryName] || `Browse ${categoryName} prompts in our library.`}
        canonicalUrl={`https://verbito.ai/prompts/${category}`}
      />

      <section className="pt-28 pb-12 bg-gray-50 dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Breadcrumb */}
          <div className="mb-6">
            <Link
              to="/prompts"
              className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-violet-600 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to All Prompts
            </Link>
          </div>

          <motion.div
            variants={fadeUp} initial="hidden" animate="visible" custom={0}
            className="mb-10"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-violet-100 dark:bg-violet-900/20 rounded-xl flex items-center justify-center text-violet-600">
                {categoryIcons[categoryName] || <FolderOpen className="w-5 h-5" />}
              </div>
              <div>
                <h1 className="font-heading font-bold text-3xl text-gray-900 dark:text-white">
                  {categoryName} Prompts
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {filtered.length} prompt{filtered.length !== 1 ? 's' : ''} available
                </p>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl">
              {categoryDescriptions[categoryName] || `Browse our collection of ${categoryName.toLowerCase()} prompts.`}
            </p>
          </motion.div>

          {/* Search */}
          <div className="relative max-w-lg mb-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder={`${ct.search} ${categoryName} prompts...`}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>

          {!isValidCategory ? (
            <div className="text-center py-20">
              <FolderOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Category Not Found</h3>
              <Link to="/prompts" className="text-violet-600 hover:underline">
                Browse all prompts
              </Link>
            </div>
          ) : filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((prompt, i) => (
                <motion.div
                  key={prompt.id}
                  variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i}
                  className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5 hover:shadow-card-hover transition-shadow group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                      {prompt.category}
                    </span>
                    {prompt.id <= 5 && (
                      <span className="inline-flex items-center gap-1 text-xs font-medium bg-amber-100 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 px-2 py-1 rounded-full">
                        <Crown className="w-3 h-3" />
                        {ct.pro}
                      </span>
                    )}
                  </div>
                  <Link to={`/prompt/${prompt.slug}`}>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                      {prompt.title}
                    </h3>
                  </Link>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                    {prompt.description}
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleCopy(prompt.content, prompt.id)}
                      className="inline-flex items-center gap-1.5 px-3 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                    >
                      {copiedId === prompt.id ? (
                        <><Check className="w-3.5 h-3.5 text-emerald-500" /> {ct.copied}</>
                      ) : (
                        <><Copy className="w-3.5 h-3.5" /> {ct.copy}</>
                      )}
                    </button>
                    <Link
                      to={`/prompt-generator?prompt=${encodeURIComponent(prompt.title)}`}
                      className="inline-flex items-center gap-1.5 px-3 py-2 bg-violet-100 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300 rounded-lg text-sm font-medium hover:bg-violet-200 dark:hover:bg-violet-900/40 transition-colors"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      {gt.generate}
                    </Link>
                    <Link
                      to={`/prompt/${prompt.slug}`}
                      className="ml-auto text-gray-400 hover:text-violet-600 transition-colors"
                    >
                      <ArrowLeft className="w-4 h-4 rotate-180" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 font-medium">No prompts found</p>
              <p className="text-sm text-gray-400">Try a different search term.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
