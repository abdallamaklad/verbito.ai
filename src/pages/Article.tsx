import { usePageTranslations } from '@/hooks/useTranslation';
import { motion } from 'framer-motion';
import {
ArrowLeft,
Bookmark,
BookOpen,
Calendar,
Check,
ChevronRight,
Clock,
Lightbulb,
Mail,
Share2,
Target,
Users
} from 'lucide-react';
import { useEffect,useState } from 'react';
import { Link,useParams } from 'react-router-dom';
import SEOHead from '../components/shared/SEOHead';
import { articles } from '../lib/data/articles';

export default function Article() {
  const { slug } = useParams<{ slug: string }>();
  const [progress, setProgress] = useState(0);
  const [saved, setSaved] = useState(false);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const tt = usePageTranslations('knowledge');
  const ct = usePageTranslations('common');

  const article = articles.find((a) => a.slug === slug);

  // Related articles (same category, excluding current)
  const related = article
    ? articles.filter((a) => a.category === article.category && a.id !== article.id).slice(0, 3)
    : [];

  // Reading progress
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      setProgress(totalHeight > 0 ? (scrolled / totalHeight) * 100 : 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: article?.title || 'Verbito.ai Article',
          url: window.location.href,
        });
      } catch { /* ignore */ }
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  if (!article) {
    return (
      <>
        <SEOHead title="Article Not Found — Verbito.ai" />
        <div className="pt-28 pb-12 min-h-[100dvh] bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
          <div className="text-center">
            <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h1 className="font-heading font-bold text-2xl text-gray-900 dark:text-white mb-2">Article Not Found</h1>
            <p className="text-gray-500 mb-4">This article doesn\'t exist or may have been moved.</p>
            <Link to="/knowledge" className="text-violet-600 hover:underline font-medium">
              Browse all articles
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <SEOHead
        title={`${article.title} — Verbito.ai`}
        description={article.excerpt}
        ogType="article"
        ogImage={article.image}
        canonicalUrl={`https://verbito.ai/knowledge/${article.slug}`}
        schema={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: article.title,
          description: article.excerpt,
          image: `https://verbito.ai${article.image}`,
          datePublished: new Date(article.date).toISOString().slice(0, 10),
          author: { '@type': 'Organization', name: 'Quantara LLC' },
          publisher: { '@type': 'Organization', name: 'Quantara LLC', url: 'https://verbito.ai' },
        }}
      />

      {/* Reading Progress Bar */}
      <div className="fixed top-16 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-800 z-40">
        <motion.div
          className="h-full bg-violet-600"
          style={{ width: `${progress}%` }}
        />
      </div>

      <section className="pt-28 pb-12 bg-gray-50 dark:bg-gray-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Link to="/knowledge" className="hover:text-violet-600 transition-colors flex items-center gap-1">
                <BookOpen className="w-3.5 h-3.5" />
                {tt.hubTitle}
              </Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-gray-400">{article.category}</span>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-gray-400 truncate max-w-[200px]">{article.title}</span>
            </div>
          </motion.div>

          {/* Article Header */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <header className="mb-10">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="text-xs font-medium bg-violet-100 dark:bg-violet-900/20 text-violet-700 dark:text-violet-400 px-3 py-1 rounded-full">
                  {article.category}
                </span>
              </div>
              <h1 className="font-heading font-bold text-3xl sm:text-4xl text-gray-900 dark:text-white mb-4 leading-tight">
                {article.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {article.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {article.readTime}
                </span>
                <span className="flex items-center gap-1">
                  <Target className="w-4 h-4" />
                  {article.category}
                </span>
              </div>
            </header>

            {/* Hero Image */}
            <div className="aspect-[16/9] sm:aspect-[21/9] overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-800 mb-10">
              <img
                src={article.image}
                alt={article.title}
                className="h-full w-full object-cover"
                fetchPriority="high"
              />
            </div>

            {/* Article Content */}
            <div
              className="prose dark:prose-invert prose-lg max-w-none mb-10"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* Inline CTA */}
            <div className="bg-violet-50 dark:bg-violet-950/20 rounded-2xl border border-violet-200 dark:border-violet-800 p-6 mb-10">
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="flex-1">
                  <h3 className="font-heading font-bold text-lg text-gray-900 dark:text-white mb-2">
                    Want Even Better Prompts?
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Our AI Prompt Generator creates custom, optimized prompts tailored to your exact needs — in seconds.
                  </p>
                </div>
                <Link
                  to="/prompt-generator"
                  className="shrink-0 inline-flex items-center gap-2 px-6 py-3 bg-violet-600 text-white rounded-xl font-medium hover:bg-violet-700 transition-colors"
                >
                  <Lightbulb className="w-5 h-5" />
                  Try the Generator
                </Link>
              </div>
            </div>

            {/* Author Bio */}
            <div className="flex items-start gap-4 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 mb-10">
              <div className="w-14 h-14 bg-violet-100 dark:bg-violet-900/20 rounded-full flex items-center justify-center shrink-0">
                <Users className="w-7 h-7 text-violet-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Verbito Editorial Team</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  Our team of AI researchers, prompt engineers, and technical writers creates in-depth,
                  actionable content to help you master prompt engineering and get the most out of AI tools.
                </p>
              </div>
            </div>

            {/* Share & Save */}
            <div className="flex items-center justify-between py-6 border-t border-gray-200 dark:border-gray-800 mb-10">
              <div className="flex items-center gap-3">
                <button
                  onClick={handleShare}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                  {ct.share}
                </button>
                <button
                  onClick={() => setSaved(!saved)}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    saved
                      ? 'bg-violet-100 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200'
                  }`}
                >
                  <Bookmark className="w-4 h-4" />
                  {saved ? ct.save : ct.save}
                </button>
              </div>
              <Link
                to="/knowledge"
                className="inline-flex items-center gap-1.5 text-sm text-violet-600 hover:text-violet-700 font-medium"
              >
                <ArrowLeft className="w-4 h-4" />
                All Articles
              </Link>
            </div>

            {/* FAQ Section */}
            <div className="mb-10">
              <h3 className="font-heading font-bold text-xl text-gray-900 dark:text-white mb-6">
                Frequently Asked Questions
              </h3>
              <div className="space-y-4">
                {[
                  { q: 'How do I apply these techniques to my work?', a: 'Start with one technique at a time. Pick the method that seems most relevant to your current projects and practice it for a week before adding another.' },
                  { q: 'Which AI model works best with these prompts?', a: 'Most techniques work across all major models (ChatGPT, Claude, Gemini). We note any model-specific optimizations in the article.' },
                  { q: 'Can I share these prompts with my team?', a: 'Yes! All our knowledge base content is free to share. We just ask that you credit Verbito.ai as the source.' },
                ].map((faq, i) => (
                  <div key={i} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">{faq.q}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Related Articles */}
            {related.length > 0 && (
              <div className="mb-10">
                <h3 className="font-heading font-bold text-xl text-gray-900 dark:text-white mb-6">
                  {tt.relatedArticles}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {related.map((r) => (
                    <Link
                      key={r.id}
                      to={`/knowledge/${r.slug}`}
                      className="group overflow-hidden bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 hover:shadow-card-hover transition-shadow"
                    >
                      <div className="aspect-[16/9] overflow-hidden bg-gray-100 dark:bg-gray-800">
                        <img
                          src={r.image}
                          alt={r.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                          loading="lazy"
                        />
                      </div>
                      <div className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-2 py-0.5 rounded-full">
                            {r.category}
                          </span>
                          <span className="text-xs text-gray-500 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {r.readTime}
                          </span>
                        </div>
                        <h4 className="font-medium text-gray-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors text-sm line-clamp-2">
                          {r.title}
                        </h4>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Email Capture */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-violet-50 dark:bg-violet-950/20 rounded-2xl border border-violet-200 dark:border-violet-800 p-8 text-center"
            >
              <div className="max-w-md mx-auto">
                <div className="w-12 h-12 bg-violet-100 dark:bg-violet-900/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-6 h-6 text-violet-600" />
                </div>
                <h3 className="font-heading font-bold text-xl text-gray-900 dark:text-white mb-2">
                  Enjoyed This Article?
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">
                  Get practical prompt engineering tips delivered to your inbox.
                </p>
                {subscribed ? (
                  <div className="bg-emerald-100 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 rounded-lg py-3 text-sm font-medium flex items-center justify-center gap-2">
                    <Check className="w-4 h-4" />
                    Thanks for subscribing!
                  </div>
                ) : (
                  <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="email"
                      required
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-1 px-4 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
                    />
                    <button
                      type="submit"
                      className="px-6 py-3 bg-violet-600 text-white rounded-xl font-medium hover:bg-violet-700 transition-colors shrink-0"
                    >
                      {ct.submit}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </motion.article>
        </div>
      </section>
    </>
  );
}
