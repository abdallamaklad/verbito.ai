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
import OptimizedImage from '../components/shared/OptimizedImage';
import { articles } from '../lib/data/articles';

const defaultArticleFaqs = [
  { q: 'How do I apply these techniques to my work?', a: 'Start with one technique at a time. Pick the method that seems most relevant to your current projects and practice it for a week before adding another.' },
  { q: 'Which AI model works best with these prompts?', a: 'Most techniques work across major models including ChatGPT, Claude, and Gemini. Any model-specific considerations are noted in the article.' },
  { q: 'Can I share these prompts with my team?', a: 'Yes. Verbito knowledge articles can be shared with your team with credit to Verbito.ai as the source.' },
];

const toolsByCategory: Record<string, { title: string; href: string; description: string }[]> = {
  Marketing: [
    { title: 'Marketing Prompt Generator', href: '/tools/marketing-prompt-generator', description: 'Build campaign and content prompts.' },
    { title: 'Email Prompt Generator', href: '/tools/email-prompt-generator', description: 'Create outreach and newsletter prompts.' },
    { title: 'SEO Prompt Generator', href: '/tools/seo-prompt-generator', description: 'Plan search-focused content prompts.' },
  ],
  Development: [
    { title: 'Coding Prompt Generator', href: '/tools/coding-prompt-generator', description: 'Structure coding and debugging requests.' },
    { title: 'ChatGPT Prompt Generator', href: '/tools/chatgpt-prompt-generator', description: 'Create detailed ChatGPT prompts.' },
    { title: 'Prompt Doctor', href: '/tools/prompt-doctor', description: 'Diagnose and improve an existing prompt.' },
  ],
  Midjourney: [
    { title: 'Midjourney Prompt Generator', href: '/tools/midjourney-prompt-generator', description: 'Direct style, lighting, and composition.' },
    { title: 'Image Prompt Generator', href: '/tools/image-prompt-generator', description: 'Create prompts for AI image tools.' },
    { title: 'Video Prompt Generator', href: '/tools/video-prompt-generator', description: 'Plan scenes, motion, and visual direction.' },
  ],
  Students: [
    { title: 'Student Prompt Generator', href: '/tools/student-prompt-generator', description: 'Build responsible study prompts.' },
    { title: 'Research Prompt Generator', href: '/tools/research-prompt-generator', description: 'Structure research and synthesis prompts.' },
    { title: 'ChatGPT Prompt Generator', href: '/tools/chatgpt-prompt-generator', description: 'Create detailed ChatGPT prompts.' },
  ],
};

const defaultRelatedTools = [
  { title: 'Free AI Prompt Generator', href: '/tools/free-ai-prompt-generator', description: 'Turn an idea into a structured prompt.' },
  { title: 'Prompt Doctor', href: '/tools/prompt-doctor', description: 'Diagnose and improve an existing prompt.' },
  { title: 'Business Prompt Generator', href: '/tools/business-prompt-generator', description: 'Build practical business prompts.' },
];

function prepareArticleContent(content: string) {
  const ids = new Map<string, number>();
  const toc: { id: string; label: string }[] = [];
  const html = content.replace(/<h2>([\s\S]*?)<\/h2>/g, (_, heading: string) => {
    const label = heading.replace(/<[^>]+>/g, '').replaceAll('&amp;', '&').trim();
    const base = label
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-') || 'section';
    const count = ids.get(base) || 0;
    ids.set(base, count + 1);
    const id = count ? `${base}-${count + 1}` : base;
    toc.push({ id, label });
    return `<h2 id="${id}">${heading}</h2>`;
  });

  return { html, toc };
}

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
  const relatedTools = article ? toolsByCategory[article.category] || defaultRelatedTools : defaultRelatedTools;
  const preparedArticle = article ? prepareArticleContent(article.content) : { html: '', toc: [] };

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

  const publishedDate = new Date(`${article.date} 12:00:00 UTC`).toISOString().slice(0, 10);
  const reviewedDate = article.updatedDate
    ? new Date(`${article.updatedDate} 12:00:00 UTC`).toISOString().slice(0, 10)
    : null;
  const articleFaqs = article.faqs?.length ? article.faqs : defaultArticleFaqs;

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
          '@graph': [
            {
              '@type': 'Article',
              headline: article.title,
              description: article.excerpt,
              image: `https://verbito.ai${article.image}`,
              datePublished: publishedDate,
              ...(reviewedDate ? { dateModified: reviewedDate } : {}),
              author: { '@type': 'Organization', name: 'Quantara Editorial Team', url: 'https://verbito.ai/about' },
              publisher: { '@type': 'Organization', name: 'Quantara LLC', url: 'https://verbito.ai' },
            },
            {
              '@type': 'FAQPage',
              mainEntity: articleFaqs.map(({ q, a }) => ({
                '@type': 'Question',
                name: q,
                acceptedAnswer: { '@type': 'Answer', text: a },
              })),
            },
          ],
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
            <div className="flex items-center gap-2 overflow-hidden text-sm text-gray-500">
              <Link to="/knowledge" className="flex shrink-0 items-center gap-1 whitespace-nowrap transition-colors hover:text-violet-600">
                <BookOpen className="w-3.5 h-3.5" />
                {tt.hubTitle}
              </Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="shrink-0 whitespace-nowrap text-gray-400">{article.category}</span>
              <ChevronRight className="hidden h-3.5 w-3.5 sm:block" />
              <span className="hidden max-w-[200px] truncate text-gray-400 sm:block">{article.title}</span>
            </div>
          </motion.div>

          {/* Article Header */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <header className="mb-8 sm:mb-10">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="text-xs font-medium bg-violet-100 dark:bg-violet-900/20 text-violet-700 dark:text-violet-400 px-3 py-1 rounded-full">
                  {article.category}
                </span>
              </div>
              <h1 className="mb-5 max-w-3xl font-heading text-[2.125rem] font-bold leading-[1.12] text-gray-900 sm:text-5xl dark:text-white">
                {article.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-2">
                  <OptimizedImage src="/quantara-logo.png" alt="" width="20" height="20" className="h-5 w-5 object-contain" />
                  By <Link to="/about" rel="author" className="font-medium text-gray-700 hover:text-violet-600 dark:text-gray-300">Quantara Editorial Team</Link>
                </span>
                <time dateTime={publishedDate} className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Published {article.date}
                </time>
                {reviewedDate && (
                  <time dateTime={reviewedDate} className="flex items-center gap-1">
                    <Check className="h-4 w-4" /> Last reviewed {article.updatedDate}
                  </time>
                )}
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
            <div className="aspect-[43/24] overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-800 mb-10">
              <OptimizedImage
                src={article.image}
                alt={article.imageAlt || article.title}
                formats={article.imageFormats}
                cacheKey={article.imageVersion}
                width="1376"
                height="768"
                sizes="(min-width: 1024px) 896px, 100vw"
                className="h-full w-full object-cover"
                fetchPriority="high"
              />
            </div>

            {preparedArticle.toc.length > 2 && (
              <nav aria-label="Article contents" className="mx-auto mb-12 max-w-[720px] border-y border-gray-200 py-6 dark:border-gray-800">
                <p className="mb-3 font-heading text-sm font-bold uppercase text-gray-900 dark:text-white">
                  In this article
                </p>
                <ol className="grid gap-x-8 gap-y-2 text-sm sm:grid-cols-2">
                  {preparedArticle.toc.map((item, index) => (
                    <li key={item.id} className="flex min-w-0 gap-2">
                      <span className="shrink-0 text-gray-400">{String(index + 1).padStart(2, '0')}</span>
                      <a href={`#${item.id}`} className="text-gray-600 hover:text-violet-600 dark:text-gray-300 dark:hover:text-violet-400">
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            )}

            {/* Article Content */}
            <div
              className="article-content mx-auto mb-12 max-w-[720px]"
              dangerouslySetInnerHTML={{ __html: preparedArticle.html }}
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
                {articleFaqs.map((faq, i) => (
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
                        <OptimizedImage
                          src={r.image}
                          alt={r.imageAlt || r.title}
                          formats={r.imageFormats}
                          cacheKey={r.imageVersion}
                          width="1376"
                          height="768"
                          sizes="(min-width: 640px) 33vw, 100vw"
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

            <div className="mb-10">
              <h3 className="mb-6 font-heading text-xl font-bold text-gray-900 dark:text-white">Related Prompt Tools</h3>
              <div className="grid gap-4 sm:grid-cols-3">
                {relatedTools.map((tool) => (
                  <Link
                    key={tool.href}
                    to={tool.href}
                    className="border-l-2 border-violet-500 bg-gray-50 p-4 transition-colors hover:bg-violet-50 dark:bg-gray-900 dark:hover:bg-violet-950/20"
                  >
                    <h4 className="mb-1 text-sm font-semibold text-gray-900 dark:text-white">{tool.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{tool.description}</p>
                  </Link>
                ))}
              </div>
            </div>

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
