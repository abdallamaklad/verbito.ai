import { motion } from 'framer-motion';
import {
ArrowLeftRight,
ArrowRight,
Bookmark,
BookOpen,
Brain,
Briefcase,
Check,
ChevronDown,ChevronUp,
Code,
Copy,
DollarSign,
FileText,Gift,
GraduationCap,
Image,
Mail,
Megaphone,
Monitor,
Play,
Search,
Share2,
Sparkles,
Star,
TrendingUp,
Type,
Video,
X,
Zap
} from 'lucide-react';
import { useEffect,useRef,useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import SEOHead from '../components/shared/SEOHead';
import UpgradeModal from '../components/shared/UpgradeModal';
import { usePageTranslations } from '../hooks/useTranslation';
import { homepage as homepageTranslations } from '../lib/translations/homepage';

/* ------------------------------------------------------------------ */
/*  ANIMATION VARIANTS                                                 */
/* ------------------------------------------------------------------ */

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  }),
};

/* ------------------------------------------------------------------ */
/*  PARTICLE FIELD                                                     */
/* ------------------------------------------------------------------ */

function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.innerWidth < 768 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const particles: { x: number; y: number; baseX: number; baseY: number; dx: number; dy: number; size: number; color: string }[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const colors = ['#7c3aed', '#8b5cf6', '#a78bfa', '#6366f1', '#818cf8'];
    for (let i = 0; i < 40; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      particles.push({
        x, y, baseX: x, baseY: y,
        dx: (Math.random() - 0.5) * 0.5,
        dy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1.5,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    const handleMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    canvas.addEventListener('mousemove', handleMouse);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;

        const mx = mouseRef.current.x;
        const my = mouseRef.current.y;
        const dx = p.x - mx;
        const dy = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          const force = (150 - dist) / 150 * 8;
          p.x += (dx / dist) * force;
          p.y += (dy / dist) * force;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = 0.7;
        ctx.fill();
      });

      ctx.globalAlpha = 0.12;
      ctx.strokeStyle = '#7c3aed';
      ctx.lineWidth = 1;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.globalAlpha = (1 - dist / 120) * 0.12;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;

      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', handleMouse);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="hidden md:block"
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  FAQ ITEM                                                           */
/* ------------------------------------------------------------------ */

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
      >
        <span className="font-medium text-gray-900 dark:text-white pr-4">{q}</span>
        {open ? <ChevronUp className="w-5 h-5 text-gray-400 shrink-0" /> : <ChevronDown className="w-5 h-5 text-gray-400 shrink-0" />}
      </button>
      {open && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          transition={{ duration: 0.25 }}
          className="px-5 pb-5"
        >
          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{a}</p>
        </motion.div>
      )}
    </div>
  );
}

/* ================================================================== */
/*  HOME PAGE                                                          */
/* ================================================================== */

export default function Home() {
  const [miniGoal, setMiniGoal] = useState('');
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [copiedAfter, setCopiedAfter] = useState(false);
  const [leadEmail, setLeadEmail] = useState('');
  const [leadSubmitting, setLeadSubmitting] = useState(false);
  const ht = usePageTranslations(homepageTranslations);

  const handleMiniGenerate = () => {
    if (!miniGoal.trim()) return;
    localStorage.setItem('verbito_prefill_goal', miniGoal.trim());
    window.location.href = '/prompt-generator';
  };

  const handleCopyAfter = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedAfter(true);
      setTimeout(() => setCopiedAfter(false), 2000);
    });
  };

  const handleLeadCapture = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadEmail.trim() || !leadEmail.includes('@')) {
      toast.error('Please enter a valid email');
      return;
    }
    setLeadSubmitting(true);
    try {
      const { captureLead } = await import('../services/supabase');
      await captureLead(leadEmail, 'homepage_lead_magnet', 'ai-prompting-resources');
      toast.success('Check your inbox! Resources are on their way.');
      setLeadEmail('');
    } catch {
      toast.error('Something went wrong. Please try again.');
    }
    setLeadSubmitting(false);
  };

  return (
    <>
      <SEOHead
        title="Verbito.ai — Turn Rough Ideas Into Expert-Level AI Prompts"
        description="Generate powerful prompts for ChatGPT, Claude, Gemini, and Midjourney. Verbito helps you get better AI results without becoming a prompt engineer."
        canonicalUrl="https://verbito.ai/"
        ogImage="/og-default.jpg"
        schema={{
          '@context': 'https://schema.org',
          '@type': 'SoftwareApplication',
          name: 'Verbito.ai',
          description: 'AI prompt generator that turns rough ideas into expert-level prompts',
          applicationCategory: 'ProductivityApplication',
          offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        }}
      />

      <UpgradeModal isOpen={showUpgrade} onClose={() => setShowUpgrade(false)} />

      {/* ========== 1. HERO ========== */}
      <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-violet-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
        <ParticleField />

        {/* Floating Prompt Cards — hidden on mobile, visible on md+ */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden hidden md:block">
          <motion.div
            className="absolute top-[15%] left-[8%] bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-xl p-4 shadow-lg border border-white/30 dark:border-gray-700/30 max-w-[200px]"
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <p className="text-xs font-mono text-gray-600 dark:text-gray-300">
              You are a senior copywriter. Write a compelling email for...
            </p>
          </motion.div>
          <motion.div
            className="absolute top-[25%] right-[10%] bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-xl p-4 shadow-lg border border-white/30 dark:border-gray-700/30 max-w-[180px]"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          >
            <p className="text-xs font-mono text-gray-600 dark:text-gray-300">
              Act as a Python expert. Debug this function...
            </p>
          </motion.div>
          <motion.div
            className="absolute bottom-[20%] left-[12%] bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-xl p-4 shadow-lg border border-white/30 dark:border-gray-700/30 max-w-[190px]"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          >
            <p className="text-xs font-mono text-gray-600 dark:text-gray-300">
              You are a business analyst. Create a SWOT analysis for...
            </p>
          </motion.div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center pt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          >
            <div className="inline-flex items-center gap-2 bg-violet-50 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300 rounded-full px-4 py-1.5 text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              {ht.heroBadge}
            </div>
          </motion.div>

          <h1 className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl text-gray-900 dark:text-white leading-tight mb-6">
            {ht.heroTitle}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-4 max-w-2xl mx-auto leading-relaxed"
          >
            {ht.heroSubtitle}
          </motion.p>

          {/* Microcopy */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="text-sm text-gray-500 dark:text-gray-400 mb-6"
          >
            Get 2 free prompt generations every day. No credit card required.
          </motion.p>

          {/* Product proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            <span className="inline-flex items-center gap-1.5"><Check className="h-4 w-4 text-emerald-500" /> Structured prompts</span>
            <span className="inline-flex items-center gap-1.5"><Check className="h-4 w-4 text-emerald-500" /> Model-specific output</span>
            <span className="inline-flex items-center gap-1.5"><Check className="h-4 w-4 text-emerald-500" /> Quality feedback</span>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <Link
              to="/prompt-generator"
              className="flex items-center gap-2 px-8 py-4 bg-violet-600 text-white rounded-xl font-semibold text-lg hover:bg-violet-700 transition-all hover:-translate-y-0.5 shadow-lg shadow-violet-600/25"
            >
              <Zap className="w-5 h-5" />
              {ht.heroCta}
            </Link>
            <a
              href="#examples"
              onClick={(e) => { e.preventDefault(); document.getElementById('examples')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="text-sm text-gray-400 underline underline-offset-2 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
            >
              {ht.heroSecondary}
            </a>
          </motion.div>

          {/* Mini Prompt Generator */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="max-w-xl mx-auto"
          >
            <div className="glass-card p-6 text-left">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                What do you want the AI to help you with?
              </label>
              <textarea
                value={miniGoal}
                onChange={(e) => setMiniGoal(e.target.value)}
                placeholder="Example: I want to write a landing page for my new app..."
                className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 resize-none dark:text-gray-200 dark:placeholder-gray-500"
                rows={3}
              />
              <div className="mt-4 flex items-center justify-between">
                <p className="text-xs text-gray-500 dark:text-gray-400">Free accounts get 2 prompts/day</p>
                <button
                  onClick={handleMiniGenerate}
                  className="flex items-center gap-2 px-5 py-2.5 bg-violet-600 text-white rounded-lg text-sm font-semibold hover:bg-violet-700 transition-colors"
                >
                  <Zap className="w-4 h-4" />
                  Generate My First Prompt
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========== 2. BEFORE / AFTER ========== */}
      <section id="examples" className="py-20 lg:py-28 bg-white dark:bg-gray-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            className="text-center mb-16"
          >
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-gray-900 dark:text-white mb-4">
              See the Difference Verbito Makes
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
              A rough idea versus a Verbito-optimized prompt. The difference is night and day.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-6 items-center">
            {/* BEFORE */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0}
              className="border-t-4 border-red-400 bg-red-50/50 dark:bg-red-900/10 rounded-2xl p-6 border border-red-200 dark:border-red-900/20"
            >
              <div className="flex items-center gap-2 mb-4">
                <X className="w-5 h-5 text-red-500" />
                <span className="text-xs font-semibold text-red-600 dark:text-red-400 uppercase tracking-wider">Your rough idea</span>
              </div>
              <p className="text-gray-700 dark:text-gray-300 text-sm italic">
                &ldquo;Help me write ads for my course.&rdquo;
              </p>
            </motion.div>

            {/* Arrow */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={1}
              className="hidden lg:flex items-center justify-center"
            >
              <div className="w-12 h-12 bg-violet-100 dark:bg-violet-900/30 rounded-full flex items-center justify-center">
                <ArrowLeftRight className="w-5 h-5 text-violet-600" />
              </div>
            </motion.div>

            {/* AFTER */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={2}
              className="border-t-4 border-violet-500 bg-violet-50/50 dark:bg-violet-900/10 rounded-2xl p-6 border border-violet-200 dark:border-violet-800/30"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-violet-600" />
                  <span className="text-xs font-semibold text-violet-700 dark:text-violet-400 uppercase tracking-wider">Your Verbito-optimized prompt</span>
                </div>
                <button
                  onClick={() => handleCopyAfter('Act as a senior direct-response marketer with 10+ years of experience creating high-converting ad campaigns for digital courses.\n\nCreate 10 high-converting ad angles for a prompt engineering course targeting busy professionals who want to leverage AI tools like ChatGPT and Claude to increase productivity and save time.\n\nFor each ad angle, include:\n1. A compelling headline (under 60 characters)\n2. An emotional hook that addresses a pain point\n3. A clear value proposition\n4. A strong call-to-action\n\nTarget audience: Working professionals aged 28-45, tech-curious but time-poor\nTone: Professional, aspirational, urgent without being aggressive\nConstraints: Avoid hype words like "revolutionary" or "game-changer." Focus on concrete outcomes.')}
                  className="text-xs text-gray-500 dark:text-gray-400 hover:text-violet-600 transition-colors flex items-center gap-1"
                >
                  {copiedAfter ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedAfter ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <pre className="text-gray-700 dark:text-gray-300 text-xs font-mono whitespace-pre-wrap leading-relaxed">
                Act as a senior direct-response marketer. Create 10 high-converting ad angles for a prompt engineering course targeting busy professionals who want to leverage AI tools like ChatGPT and Claude to increase productivity and save time.

For each ad angle, include:
1. A compelling headline (under 60 characters)
2. An emotional hook that addresses a pain point
3. A clear value proposition
4. A strong call-to-action

Target audience: Working professionals aged 28-45, tech-curious but time-poor
Tone: Professional, aspirational, urgent without being aggressive
              </pre>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========== 3. WHY VERBITO ========== */}
      <section className="py-20 lg:py-28 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            className="text-center mb-16"
          >
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-gray-900 dark:text-white mb-4">
              Why Verbito Is Better Than Writing Prompts Manually
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
              Professional prompt engineering built into every generation.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Brain, title: 'Structured Expert Prompts', desc: 'Every prompt is built with role, context, task, constraints, and output format — the proven framework top AI experts use.' },
              { icon: Star, title: 'Prompt Score & Quality Feedback', desc: 'Get a quality score out of 100 with a detailed breakdown of every prompt you generate. Understand what makes a great prompt.' },
              { icon: Monitor, title: 'Model-Specific Optimization', desc: 'Tailored for ChatGPT, Claude, Gemini, Midjourney, and more. Each model gets a prompt optimized for its unique strengths.' },
              { icon: Bookmark, title: 'Save & Reuse Prompts', desc: 'Build your personal prompt library organized by category. Never lose a great prompt again.' },
              { icon: TrendingUp, title: 'Advanced Improvements', desc: 'One-click improvements: shorter, more detailed, more professional, add examples, change tone — instantly.' },
              { icon: BookOpen, title: 'Prompt Library & Course', desc: 'Access 200+ ready-to-use prompt templates and a complete prompt engineering course to level up your skills.' },
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 bg-violet-50 dark:bg-violet-900/20 rounded-xl flex items-center justify-center mb-5">
                  <feature.icon className="w-6 h-6 text-violet-600" />
                </div>
                <h3 className="font-heading font-semibold text-lg text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== 4. USE CASE GRID ========== */}
      <section className="py-20 lg:py-28 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            className="text-center mb-16"
          >
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-gray-900 dark:text-white mb-4">
              Prompts for Every Use Case
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
              Whatever you need, Verbito has a prompt generator for it.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { icon: Briefcase, title: 'Business', desc: 'Strategy, planning, analysis, and operations', href: '/tools/business-prompt-generator' },
              { icon: Megaphone, title: 'Marketing', desc: 'Ad copy, campaigns, content strategy', href: '/tools/marketing-prompt-generator' },
              { icon: Search, title: 'SEO', desc: 'Keyword research, on-page optimization', href: '/tools/seo-prompt-generator' },
              { icon: DollarSign, title: 'Sales', desc: 'Pitches, outreach, closing scripts', href: '/tools/sales-prompt-generator' },
              { icon: Mail, title: 'Email', desc: 'Sequences, newsletters, cold outreach', href: '/tools/email-prompt-generator' },
              { icon: Share2, title: 'Social Media', desc: 'Posts, captions, engagement strategies', href: '/tools/social-media-prompt-generator' },
              { icon: Code, title: 'Coding', desc: 'Code generation, debugging, architecture', href: '/tools/coding-prompt-generator' },
              { icon: BookOpen, title: 'Research', desc: 'Summaries, analysis, literature reviews', href: '/tools/research-prompt-generator' },
              { icon: GraduationCap, title: 'Students', desc: 'Study guides, essays, exam prep', href: '/tools/students-prompt-generator' },
              { icon: Image, title: 'Image Gen', desc: 'Midjourney, DALL-E prompts', href: '/tools/image-prompt-generator' },
              { icon: Video, title: 'Video Gen', desc: 'Scripts, storyboards, descriptions', href: '/tools/video-prompt-generator' },
              { icon: Zap, title: 'Productivity', desc: 'Workflows, automation, task management', href: '/tools/productivity-prompt-generator' },
            ].map((useCase, i) => (
              <motion.a
                key={useCase.title}
                href={`/#${useCase.href}`}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                className="group bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 hover:border-violet-200 dark:hover:border-violet-800/50 hover:bg-violet-50 dark:hover:bg-violet-900/10 transition-all duration-300 text-center"
              >
                <div className="w-12 h-12 bg-violet-50 dark:bg-violet-900/20 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <useCase.icon className="w-6 h-6 text-violet-600" />
                </div>
                <h3 className="font-heading font-semibold text-gray-900 dark:text-white mb-1 text-sm">{useCase.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed">{useCase.desc}</p>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ========== 5. PROMPT GENERATOR PREVIEW ========== */}
      <section className="py-20 lg:py-28 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0}
            >
              <h2 className="font-heading font-bold text-3xl sm:text-4xl text-gray-900 dark:text-white mb-4">
                Generate Your First Prompt in Seconds
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                Just describe what you want, choose your settings, and get a professionally engineered prompt ready to paste into any AI tool.
              </p>

              <ul className="space-y-4 mb-8">
                {[
                  'Describe your goal in plain language — no technical jargon needed',
                  'Choose your AI model, tone, output format, and complexity',
                  'Get an optimized prompt with a quality score and breakdown',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-700 dark:text-gray-300">
                    <Check className="w-5 h-5 text-violet-600 shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>

              <Link
                to="/prompt-generator"
                className="inline-flex items-center gap-2 px-6 py-3 bg-violet-600 text-white rounded-xl font-semibold hover:bg-violet-700 transition-colors"
              >
                <Zap className="w-5 h-5" />
                Try It Free
              </Link>
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={1}
              className="relative"
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-xl p-6">
                <div className="flex items-center gap-2 mb-4 pb-4 border-b border-gray-100 dark:border-gray-700">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400" />
                  <span className="ml-2 text-xs text-gray-400">Verbito Prompt Generator</span>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">What do you want to achieve?</label>
                    <div className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-xl text-sm text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600">
                      Write a marketing email for a fitness app
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">AI Model</label>
                      <div className="px-3 py-2 bg-gray-50 dark:bg-gray-700 rounded-lg text-sm text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600">ChatGPT</div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Tone</label>
                      <div className="px-3 py-2 bg-gray-50 dark:bg-gray-700 rounded-lg text-sm text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600">Professional</div>
                    </div>
                  </div>
                  <div className="p-4 bg-violet-50 dark:bg-violet-900/20 rounded-xl border border-violet-100 dark:border-violet-800/30">
                    <p className="text-xs font-medium text-violet-700 dark:text-violet-300 mb-2">Generated Prompt</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 font-mono leading-relaxed">
                      Act as a senior email copywriter with 10+ years of experience in fitness marketing...
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500">Score:</span>
                      <span className="text-sm font-bold text-violet-600">94/100</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-emerald-600">
                      <Check className="w-3.5 h-3.5" />
                      Optimized for ChatGPT
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========== 6. PRICING PREVIEW ========== */}
      <section className="py-20 lg:py-28 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            className="text-center mb-16"
          >
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-gray-900 dark:text-white mb-4">
              Start Free, Upgrade When You Need More
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
              No credit card required to start. Upgrade when you need more generations.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Free', price: '$0', period: '/mo', features: ['2 prompts/day', 'Basic categories', 'Copy prompts', 'Prompt score'], cta: 'Get Started', featured: false },
              { name: 'Starter', price: '$12', period: '/mo', features: ['300 prompts/mo', 'All categories', 'Save & organize', 'History & collections'], cta: 'Start Trial', featured: false },
              { name: 'Pro', price: '$29', period: '/mo', features: ['2,000 prompts/mo', 'Advanced improvements', 'Priority support', 'Course access'], cta: 'Start Trial', featured: true },
              { name: 'Unlimited', price: '$79', period: '/mo', features: ['Unlimited prompts', 'API access', 'White-label exports', 'Dedicated support'], cta: 'Go Unlimited', featured: false },
            ].map((plan, i) => (
              <motion.div
                key={plan.name}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                className={`bg-white dark:bg-gray-800 rounded-2xl p-8 border ${
                  plan.featured
                    ? 'border-violet-600 shadow-lg shadow-violet-600/10 relative'
                    : 'border-gray-200 dark:border-gray-700'
                } hover:-translate-y-1 transition-all duration-300`}
              >
                {plan.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-violet-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}
                <h3 className="font-heading font-semibold text-lg text-gray-900 dark:text-white mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-3xl font-heading font-bold text-gray-900 dark:text-white">{plan.price}</span>
                  <span className="text-gray-500 dark:text-gray-400 text-sm">{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/pricing"
                  className={`block text-center w-full py-3 rounded-xl font-semibold text-sm transition-colors ${
                    plan.featured
                      ? 'bg-violet-600 text-white hover:bg-violet-700'
                      : 'border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  {plan.cta}
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link to="/pricing" className="inline-flex items-center gap-1 text-sm text-violet-600 hover:underline font-medium">
              See full plan comparison <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ========== 7. COURSE PREVIEW ========== */}
      <section className="py-20 lg:py-28 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0}
            >
              <div className="inline-flex items-center gap-2 bg-violet-600/20 text-violet-300 rounded-full px-4 py-1.5 text-sm font-medium mb-6">
                <BookOpen className="w-4 h-4" />
                Featured Course
              </div>
              <h2 className="font-heading font-bold text-3xl sm:text-4xl mb-4">
                Master Prompt Engineering
              </h2>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Go from beginner to expert in 10 comprehensive modules. Learn the techniques top AI professionals use to get extraordinary results from ChatGPT, Claude, Gemini, and Midjourney.
              </p>

              <p className="mb-8 text-sm text-gray-400">10 modules · 50 lessons · Self-paced learning</p>

              <ul className="space-y-3 mb-8">
                {[
                  '10 modules with 50 bite-sized lessons',
                  'Real-world projects and assignments',
                  'Certificate of completion',
                  'Lifetime access + all future updates',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-gray-300">
                    <Check className="w-4 h-4 text-violet-400 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <Link
                  to="/course/master-prompt-engineering"
                  className="flex items-center gap-2 px-6 py-3 bg-violet-600 text-white rounded-xl font-semibold hover:bg-violet-700 transition-colors"
                >
                  Enroll Now — $197
                </Link>
                <Link
                  to="/course/master-prompt-engineering"
                  className="flex items-center gap-2 px-6 py-3 border border-gray-700 text-gray-300 rounded-xl font-medium hover:bg-gray-800 transition-colors"
                >
                  <Play className="w-4 h-4" />
                  Watch Preview
                </Link>
              </div>
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={1}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/course-preview.jpg"
                  alt="Master Prompt Engineering Course"
                  width="1376"
                  height="768"
                  loading="lazy"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-white font-semibold">Master Prompt Engineering</p>
                  <p className="text-gray-300 text-sm">10 Modules · 50 Lessons · Certificate</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========== 8. KNOWLEDGE HUB PREVIEW ========== */}
      <section className="py-20 lg:py-28 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            className="text-center mb-16"
          >
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-gray-900 dark:text-white mb-4">
              Latest from the Knowledge Hub
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
              Deep dives into prompt engineering, AI tools, and getting the most from your AI.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'What Is Prompt Engineering? A Complete Beginner\'s Guide for 2026', excerpt: 'Learn what prompt engineering is, why it matters, and how you can use it to get dramatically better results from AI tools.', image: '/blog-featured-1.jpg', slug: 'what-is-prompt-engineering-beginners-guide', category: 'Fundamentals' },
              { title: 'ChatGPT vs Claude vs Gemini: Which AI Model Should You Use?', excerpt: 'A detailed comparison of the top three AI models, their strengths, weaknesses, and which one is best for different tasks.', image: '/blog-featured-2.jpg', slug: 'chatgpt-vs-claude-vs-gemini-2026', category: 'AI Tools' },
              { title: '10 Prompt Engineering Techniques That Actually Work', excerpt: 'Stop guessing and start using these science-backed prompt engineering techniques to get better AI outputs every time.', image: '/blog-featured-3.jpg', slug: '10-prompt-engineering-techniques-that-actually-work', category: 'Advanced' },
            ].map((article, i) => (
              <motion.div
                key={article.slug}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
              >
                <Link to={`/knowledge/${article.slug}`} className="group block">
                  <div className="relative rounded-xl overflow-hidden mb-4">
                    <img
                      src={article.image}
                      alt={article.title}
                      loading="lazy"
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm text-xs font-medium px-2.5 py-1 rounded-full text-gray-700 dark:text-gray-300">
                        {article.category}
                      </span>
                    </div>
                  </div>
                  <h3 className="font-heading font-semibold text-lg text-gray-900 dark:text-white mb-2 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{article.excerpt}</p>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link to="/knowledge" className="inline-flex items-center gap-1 text-sm text-violet-600 hover:underline font-medium">
              Browse all articles <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ========== 9. PROMPT LIBRARY PREVIEW ========== */}
      <section className="py-20 lg:py-28 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            className="text-center mb-16"
          >
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-gray-900 dark:text-white mb-4">
              Browse the Prompt Library
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
              200+ ready-to-use prompt templates across every category.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {[
              { title: 'SWOT Analysis Generator', category: 'Business', desc: 'Generate a comprehensive SWOT analysis for any business.', slug: 'business-swot-analysis' },
              { title: 'High-Converting Ad Copy', category: 'Marketing', desc: 'Create compelling ad copy for any product or service.', slug: 'marketing-ad-copy' },
              { title: 'SEO Keyword Strategy', category: 'SEO', desc: 'Generate a comprehensive keyword research brief.', slug: 'seo-keyword-research' },
              { title: 'Code Review & Refactor', category: 'Coding', desc: 'Get expert code reviews with actionable improvements.', slug: 'code-review-refactor' },
            ].map((prompt, i) => (
              <motion.div
                key={prompt.slug}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
              >
                <Link to={`/prompts/${prompt.category.toLowerCase()}`} className="group block bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                  <span className="inline-block text-xs font-medium text-violet-600 bg-violet-50 dark:bg-violet-900/20 px-2.5 py-1 rounded-full mb-3">
                    {prompt.category}
                  </span>
                  <h3 className="font-heading font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                    {prompt.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{prompt.desc}</p>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Link to="/prompts" className="inline-flex items-center gap-1 text-sm text-violet-600 hover:underline font-medium">
              Explore all 200+ prompts <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ========== 10. LEAD MAGNET ========== */}
      <section className="py-20 lg:py-28 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            className="text-center mb-16"
          >
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-gray-900 dark:text-white mb-4">
              Free Resources to Master AI Prompting
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
              Download these free resources and start improving your AI results today.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              { icon: FileText, title: 'Prompt Engineering Cheat Sheet', desc: 'A one-page reference with the 20 most important prompting patterns. Print it and keep it by your desk.', color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-900/20' },
              { icon: Gift, title: '100 Business Prompts', desc: 'A curated collection of 100 battle-tested prompts for strategy, marketing, operations, and growth.', color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
              { icon: Type, title: 'The AI Prompt Formula', desc: 'Learn the simple R-C-T-C-O framework that makes every prompt 10x more effective.', color: 'text-amber-600', bg: 'bg-amber-50 dark:bg-amber-900/20' },
            ].map((resource, i) => (
              <motion.div
                key={resource.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 text-center"
              >
                <div className={`w-14 h-14 ${resource.bg} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                  <resource.icon className={`w-7 h-7 ${resource.color}`} />
                </div>
                <h3 className="font-heading font-semibold text-gray-900 dark:text-white mb-2">{resource.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{resource.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Email Capture Form */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            className="max-w-md mx-auto"
          >
            <form onSubmit={handleLeadCapture} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={leadEmail}
                onChange={(e) => setLeadEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:text-gray-200 dark:placeholder-gray-500"
              />
              <button
                type="submit"
                disabled={leadSubmitting}
                className="px-6 py-3 bg-violet-600 text-white rounded-xl text-sm font-semibold hover:bg-violet-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
              >
                {leadSubmitting ? 'Sending...' : 'Get Free Resources'}
              </button>
            </form>
            <p className="text-xs text-gray-400 text-center mt-3">No spam. Unsubscribe anytime.</p>
          </motion.div>
        </div>
      </section>

      {/* ========== 11. TESTIMONIALS (commented out — Task 1) ========== */}
      {/*
      <section className="py-20 lg:py-28 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
          >
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-gray-900 dark:text-white mb-4">
              What Our Users Say
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-10">
              Real testimonials coming soon. Be the first to share your experience.
            </p>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-center gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-5 h-5 text-amber-400 fill-amber-400" />
                ))}
              </div>
              <p className="text-gray-500 dark:text-gray-400 text-sm italic mb-4">
                &ldquo;We&apos;re collecting honest feedback from our users. If you&apos;ve used Verbito, we&apos;d love to hear about your experience.&rdquo;
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Share Your Feedback
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
      */}

      {/* ========== 12. FAQ ========== */}
      <section className="py-20 lg:py-28 bg-white dark:bg-gray-950">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            className="text-center mb-16"
          >
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-gray-900 dark:text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Everything you need to know about Verbito.ai.
            </p>
          </motion.div>

          <div className="space-y-4">
            {[
              { q: 'What is Verbito.ai?', a: 'Verbito.ai is an AI-powered prompt generator that transforms your rough ideas into expertly crafted prompts for ChatGPT, Claude, Gemini, Midjourney, and other AI tools. We use advanced prompt engineering techniques like role assignment, context framing, and structured output formatting to ensure you get the best possible results.' },
              { q: 'How many free prompts do I get?', a: 'Free accounts can generate up to 2 prompts per day. No credit card is required to sign up. Upgrade to Starter ($12/mo) for 300 prompts/month, Pro ($29/mo) for 2,000/month, or Unlimited ($79/mo) for unlimited generations.' },
              { q: 'Do I need to know prompt engineering?', a: 'Not at all. Verbito is designed for both beginners and experts. Just describe what you want in plain language, and our system handles all the technical prompt engineering for you. If you want to learn, our course teaches you the fundamentals.' },
              { q: 'Which AI models does Verbito support?', a: 'We optimize prompts for ChatGPT (GPT-4o), GPT-4.1, Claude (3.5 Sonnet), Google Gemini, Midjourney, DALL-E, Stable Diffusion, and general-purpose AI models. You select your target model when generating, and we tailor the prompt structure accordingly.' },
              { q: 'Can I save and organize my prompts?', a: 'Yes! Starter, Pro, and Unlimited plans include prompt saving, history, and collections. You can organize your prompts with folders and tags for easy access. Free users can copy prompts to the clipboard.' },
              { q: 'Is there a prompt engineering course?', a: 'Yes! Our "Master Prompt Engineering" course is a comprehensive 10-module program with 50 lessons, real-world projects, and a certificate of completion. It is a one-time purchase of $197 with lifetime access.' },
              { q: 'What is the Prompt Score?', a: 'Every generated prompt receives a quality score out of 100, with a detailed breakdown across 6 dimensions: clarity, context, specificity, constraints, output format, and reusability. This helps you understand and improve your prompting over time.' },
              { q: 'How do I cancel my subscription?', a: 'You can cancel anytime from your account settings. After canceling, you will continue to have access until the end of your current billing period. We also offer a 14-day money-back guarantee on all paid plans.' },
            ].map((faq, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
              >
                <FaqItem q={faq.q} a={faq.a} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== 13. FINAL CTA ========== */}
      <section className="py-20 lg:py-28 bg-gradient-to-br from-violet-600 to-indigo-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
          >
            <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl mb-6">
              Start with 2 free prompt generations today.
            </h2>
            <p className="text-lg text-violet-100 mb-10 max-w-2xl mx-auto leading-relaxed">
              Create clearer, more useful AI prompts with a free account. No credit card required.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/prompt-generator"
                className="flex items-center gap-2 px-8 py-4 bg-white text-violet-700 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all hover:-translate-y-0.5 shadow-lg"
              >
                <Zap className="w-5 h-5" />
                Generate Your First Prompt
              </Link>
              <a
                href="#examples"
                onClick={(e) => { e.preventDefault(); document.getElementById('examples')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="flex items-center gap-2 px-8 py-4 border border-white/30 text-white rounded-xl font-semibold text-lg hover:bg-white/10 transition-all"
              >
                See Examples
              </a>
            </div>
            <p className="text-sm text-violet-200 mt-6">No credit card required. Free plan includes 2 prompts/day.</p>
          </motion.div>
        </div>
      </section>
    </>
  );
}
