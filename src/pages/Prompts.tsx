import { usePageTranslations } from '@/hooks/useTranslation';
import { motion } from 'framer-motion';
import {
ArrowRight,
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
import { Link } from 'react-router-dom';
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


const categoryBgColors: Record<string, string> = {
  'Business': 'bg-violet-50 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300',
  'Marketing': 'bg-rose-50 dark:bg-rose-900/20 text-rose-700 dark:text-rose-300',
  'Sales': 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300',
  'Content Creation': 'bg-sky-50 dark:bg-sky-900/20 text-sky-700 dark:text-sky-300',
  'Social Media': 'bg-pink-50 dark:bg-pink-900/20 text-pink-700 dark:text-pink-300',
  'SEO': 'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300',
  'Email Writing': 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300',
  'Coding': 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300',
  'Data Analysis': 'bg-cyan-50 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-300',
  'Education': 'bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-300',
  'Research': 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300',
  'Productivity': 'bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300',
  'Automation': 'bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300',
  'ChatGPT Prompts': 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300',
  'Midjourney Prompts': 'bg-fuchsia-50 dark:bg-fuchsia-900/20 text-fuchsia-700 dark:text-fuchsia-300',
};

export default function Prompts() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const gt = usePageTranslations('gen');
  const ct = usePageTranslations('common');

  const filtered = prompts.filter((p) => {
    const matchSearch = !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase());
    const matchCategory = activeCategory === 'All' || p.category === activeCategory;
    return matchSearch && matchCategory;
  });

  const handleCopy = async (text: string, id: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      // Fallback
    }
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
        title="Prompt Library — 200+ AI Prompt Templates"
        description="Browse 200+ ready-to-use AI prompt templates organized by category. Copy, customize, and deploy expert-level prompts instantly."
        canonicalUrl="https://verbito.ai/prompts"
      />

      {/* Hero */}
      <section className="pt-28 pb-12 bg-gray-50 dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            variants={fadeUp} initial="hidden" animate="visible" custom={0}
            className="text-center max-w-2xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 bg-violet-100 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300 rounded-full px-4 py-1.5 text-sm font-medium mb-4">
              <FolderOpen className="w-4 h-4" />
              200+ Templates
            </div>
            <h1 className="font-heading font-bold text-4xl sm:text-5xl text-gray-900 dark:text-white mb-4">
              {gt.pageTitle}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg mb-8">
              Browse our collection of expert-crafted prompt templates. Copy with one click,
              customize for your needs, and deploy better AI results instantly.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-lg mx-auto mb-6">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder={`${ct.search} prompts by name or description...`}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
              />
            </div>
          </motion.div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            <button
              onClick={() => setActiveCategory('All')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeCategory === 'All'
                  ? 'bg-violet-600 text-white'
                  : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}
            >
              {ct.viewAll}
            </button>
            {promptCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeCategory === cat
                    ? 'bg-violet-600 text-white'
                    : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                {categoryIcons[cat]}
                {cat}
              </button>
            ))}
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {ct.search}: {filtered.length} prompt{filtered.length !== 1 ? 's' : ''}
              {activeCategory !== 'All' && ` in ${activeCategory}`}
              {search && ` for "${search}"`}
            </p>
            <Link
              to="/prompt-generator"
              className="inline-flex items-center gap-1.5 text-sm text-violet-600 hover:text-violet-700 font-medium"
            >
              <Sparkles className="w-4 h-4" />
              {gt.generate}
            </Link>
          </div>

          {/* Prompt Grid */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((prompt, i) => (
                <motion.div
                  key={prompt.id}
                  variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i}
                  className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5 hover:shadow-card-hover transition-shadow group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full ${categoryBgColors[prompt.category] || 'bg-gray-100 text-gray-700'}`}>
                      {categoryIcons[prompt.category]}
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
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-500" />
                          {ct.copied}
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          {ct.copy}
                        </>
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
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <Search className="w-12 h-12 text-gray-300 dark:text-gray-700 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400 font-medium">No prompts found</p>
              <p className="text-sm text-gray-400 dark:text-gray-500">Try adjusting your search or category filter.</p>
            </div>
          )}

          {/* Free Preview CTA */}
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0}
            className="mt-16 bg-violet-50 dark:bg-violet-950/20 rounded-2xl border border-violet-200 dark:border-violet-800 p-8 text-center"
          >
            <h3 className="font-heading font-bold text-xl text-gray-900 dark:text-white mb-2">
              Want unlimited access to all 200+ prompts?
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-lg mx-auto">
              Upgrade to Verbito Pro to unlock every template, generate custom prompts, and save your favorites.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/pricing"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-violet-600 text-white rounded-xl font-semibold hover:bg-violet-700 transition-colors"
              >
                <Crown className="w-5 h-5" />
                {ct.upgrade}
              </Link>
              <Link
                to="/prompt-generator"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <Sparkles className="w-5 h-5" />
                {gt.generate}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
