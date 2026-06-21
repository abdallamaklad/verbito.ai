import { usePageTranslations } from '@/hooks/useTranslation';
import { common as cm } from '@/lib/translations/common';
import { knowledge as kt } from '@/lib/translations/knowledge';
import { motion } from 'framer-motion';
import {
ArrowRight,
BarChart3,
BookOpen,
Calendar,
Clock,
Code2,
Lightbulb,
Mail,
Palette,
Search,
Star,
Target,
TrendingUp,
Users,
Zap
} from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/shared/SEOHead';
import OptimizedImage from '../components/shared/OptimizedImage';
import { articles } from '../lib/data/articles';

const articleCategories = [
  'Fundamentals', 'AI Tools', 'Advanced', 'Marketing', 'Midjourney',
  'Business', 'Development', 'Students', 'SEO', 'Email Writing', 'Content Creation', 'Automation'
];

const categoryIcons: Record<string, React.ReactNode> = {
  [kt.en.allCategories]: <BookOpen className="w-4 h-4" />,
  'Fundamentals': <Lightbulb className="w-4 h-4" />,
  'AI Tools': <Zap className="w-4 h-4" />,
  'Advanced': <Target className="w-4 h-4" />,
  'Marketing': <TrendingUp className="w-4 h-4" />,
  'Midjourney': <Palette className="w-4 h-4" />,
  'Productivity': <BarChart3 className="w-4 h-4" />,
  'Business': <Users className="w-4 h-4" />,
  'Development': <Code2 className="w-4 h-4" />,
  'Students': <BookOpen className="w-4 h-4" />,
  'SEO': <Search className="w-4 h-4" />,
  'Email Writing': <Mail className="w-4 h-4" />,
  'Content Creation': <Palette className="w-4 h-4" />,
  'Automation': <Zap className="w-4 h-4" />,
  'Coding': <Code2 className="w-4 h-4" />,
  'Education': <BookOpen className="w-4 h-4" />,
  'Research': <Search className="w-4 h-4" />,
  'Case Studies': <Star className="w-4 h-4" />,
};

export default function Knowledge() {
  const tt = usePageTranslations(kt);
  const ct = usePageTranslations(cm);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState(tt.allCategories);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const categories = [tt.allCategories, ...articleCategories];

  const featured = articles[0];
  const rest = articles.slice(1);

  const visibleArticles = search || activeCategory !== tt.allCategories ? articles : rest;
  const filtered = visibleArticles.filter((a) => {
    const matchSearch = !search || a.title.toLowerCase().includes(search.toLowerCase()) || a.excerpt.toLowerCase().includes(search.toLowerCase());
    const matchCategory = activeCategory === tt.allCategories || a.category === activeCategory;
    return matchSearch && matchCategory;
  });

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
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
        title={`${tt.hubTitle} — Prompt Engineering Guides & Tutorials`}
        description="Expert articles, guides, and tutorials on prompt engineering. Learn how to get better results from ChatGPT, Claude, Midjourney, and more."
        canonicalUrl="https://verbito.ai/knowledge"
      />

      {/* Hero */}
      <section className="pt-28 pb-12 bg-gray-50 dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            variants={fadeUp} initial="hidden" animate="visible" custom={0}
            className="text-center max-w-2xl mx-auto mb-10"
          >
            <div className="inline-flex items-center gap-2 bg-violet-100 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300 rounded-full px-4 py-1.5 text-sm font-medium mb-4">
              <BookOpen className="w-4 h-4" />
              {tt.hubTitle}
            </div>
            <h1 className="font-heading font-bold text-4xl sm:text-5xl text-gray-900 dark:text-white mb-4">
              {tt.heroTitle}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-600">
                {tt.heroTitleGradient}
              </span>
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg mb-8">
              {tt.hubSubtitle}
            </p>

            {/* Search */}
            <div className="relative max-w-lg mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder={tt.searchPlaceholder}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>
          </motion.div>

          {/* Category Pills */}
          <div className="-mx-4 mb-10 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0 lg:justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`inline-flex shrink-0 items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeCategory === cat
                    ? 'bg-violet-600 text-white'
                    : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                {cat === tt.allCategories ? <BookOpen className="w-4 h-4" /> : categoryIcons[cat]}
                {cat}
              </button>
            ))}
          </div>

          {/* Featured Article */}
          {!search && activeCategory === tt.allCategories && (
            <motion.div
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0}
              className="mb-12"
            >
              <Link
                to={`/knowledge/${featured.slug}`}
                className="group block bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden hover:shadow-card-hover transition-shadow"
              >
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="aspect-video md:aspect-auto overflow-hidden bg-gray-100 dark:bg-gray-800">
                    <OptimizedImage
                      src={featured.image}
                      alt={featured.imageAlt || featured.title}
                      formats={featured.imageFormats}
                      cacheKey={featured.imageVersion}
                      width="1376"
                      height="768"
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      fetchPriority="high"
                    />
                  </div>
                  <div className="p-8 flex flex-col justify-center">
                    <div className="mb-3 flex flex-wrap items-center gap-3">
                      <span className="text-xs font-medium bg-violet-100 dark:bg-violet-900/20 text-violet-700 dark:text-violet-400 px-3 py-1 rounded-full">
                        {featured.category}
                      </span>
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {featured.readTime}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-gray-500">
                        <Calendar className="h-3 w-3" />
                        {featured.updatedDate || featured.date}
                      </span>
                    </div>
                    <h2 className="font-heading font-bold text-2xl text-gray-900 dark:text-white mb-3 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                      {featured.title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                      {featured.excerpt}
                    </p>
                    <div className="flex items-center gap-2 text-violet-600 font-medium text-sm">
                      {tt.readArticle} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          )}

          {/* Results count */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {filtered.length} article{filtered.length !== 1 ? 's' : ''}
              {activeCategory !== tt.allCategories && ` in ${activeCategory}`}
              {search && ` for "${search}"`}
            </p>
          </div>

          {/* Article Grid */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((article, i) => (
                <motion.div
                  key={article.id}
                  variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i}
                >
                  <Link
                    to={`/knowledge/${article.slug}`}
                    className="group block bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden hover:shadow-card-hover transition-shadow h-full"
                  >
                    <div className="aspect-[16/9] overflow-hidden bg-gray-100 dark:bg-gray-800">
                      <OptimizedImage
                        src={article.image}
                        alt={article.imageAlt || article.title}
                        formats={article.imageFormats}
                        cacheKey={article.imageVersion}
                        width="1376"
                        height="768"
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                        loading="lazy"
                      />
                    </div>
                    <div className="flex min-h-[245px] flex-col p-6">
                      <div className="mb-3 flex flex-wrap items-center gap-2">
                        <span className="text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-2 py-1 rounded-full">
                          {article.category}
                        </span>
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {article.readTime}
                        </span>
                      </div>
                      <h3 className="mb-3 line-clamp-3 font-heading text-lg font-bold leading-snug text-gray-900 transition-colors group-hover:text-violet-600 dark:text-white dark:group-hover:text-violet-400">
                        {article.title}
                      </h3>
                      <p className="line-clamp-3 text-[0.9375rem] leading-6 text-gray-600 dark:text-gray-400">
                        {article.excerpt}
                      </p>
                      <div className="mt-auto flex items-center justify-between gap-3 border-t border-gray-100 pt-4 text-xs dark:border-gray-800">
                        <span className="flex items-center gap-1.5 text-gray-500">
                          <Calendar className="h-3.5 w-3.5" /> {article.updatedDate || article.date}
                        </span>
                        <span className="flex items-center gap-1.5 font-medium text-violet-600">
                          {ct.readMore} <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 font-medium">{tt.noArticlesFound}</p>
              <p className="text-sm text-gray-400">{tt.tryAdjustingSearch}</p>
            </div>
          )}

          {/* Newsletter Signup */}
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0}
            className="mt-16 bg-violet-50 dark:bg-violet-950/20 rounded-2xl border border-violet-200 dark:border-violet-800 p-8 text-center"
          >
            <div className="max-w-md mx-auto">
              <div className="w-12 h-12 bg-violet-100 dark:bg-violet-900/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6 text-violet-600" />
              </div>
              <h3 className="font-heading font-bold text-xl text-gray-900 dark:text-white mb-2">
                {ct.newsletterCta}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">
                {ct.newsletterText}
              </p>
              {subscribed ? (
                <div className="bg-emerald-100 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 rounded-lg py-3 text-sm font-medium">
                  {ct.subscribed}
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    required
                    placeholder={ct.subscribe === 'Subscribe' ? 'your@email.com' : ct.subscribe}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 px-4 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 bg-violet-600 text-white rounded-xl font-medium hover:bg-violet-700 transition-colors shrink-0"
                  >
                    {ct.subscribe}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
