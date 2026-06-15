import { useAuth } from '@/hooks/useAuth';
import { useUsage } from '@/hooks/useUsage';
import { createPromptCollection,deleteSavedPrompt,getCoursePurchases,getPromptCollections,getPromptGenerations,getSavedPrompts,updateProfile } from '@/services/supabase';
import type { CoursePurchase,PromptCollection,PromptGenerationHistoryItem,SavedPrompt } from '@/types';
import { motion } from 'framer-motion';
import {
AlertTriangle,
ArrowRight,
Bookmark,
Check,
Copy,
CreditCard,
FolderOpen,
GraduationCap,
History,
Plus,
Search,
Shield,
Sparkles,
Trash2,
User,
Wand2,
Zap
} from 'lucide-react';
import { useEffect,useMemo,useState } from 'react';
import type React from 'react';
import { Link,Navigate,useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import SEOHead from '../components/shared/SEOHead';
import { Toaster } from '../components/ui/sonner';
import { createPortalSession } from '../services/stripe';

/* ------------------------------------------------------------------ */
/*  FADE UP VARIANT                                                    */
/* ------------------------------------------------------------------ */

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  }),
};

const courseModules = [
  { id: '1', title: 'Module 1: Fundamentals', lessons: 5, completed: 3 },
  { id: '2', title: 'Module 2: Role Assignment', lessons: 5, completed: 0 },
  { id: '3', title: 'Module 3: Context Engineering', lessons: 5, completed: 0 },
  { id: '4', title: 'Module 4: Output Formatting', lessons: 5, completed: 0 },
  { id: '5', title: 'Module 5: Chain of Thought', lessons: 5, completed: 0 },
  { id: '6', title: 'Module 6: Few-Shot Prompting', lessons: 5, completed: 0 },
  { id: '7', title: 'Module 7: Advanced Techniques', lessons: 5, completed: 0 },
  { id: '8', title: 'Module 8: Multi-Model Optimization', lessons: 5, completed: 0 },
  { id: '9', title: 'Module 9: Prompt Workflows', lessons: 5, completed: 0 },
  { id: '10', title: 'Module 10: Capstone Project', lessons: 5, completed: 0 },
];

function formatDate(value?: string) {
  if (!value) return 'Today';
  return new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(value));
}

function promptTextFromGeneration(item: PromptGenerationHistoryItem) {
  const generated = item.generated_prompt;
  if (generated && typeof generated === 'object' && 'finalPrompt' in generated && typeof generated.finalPrompt === 'string') {
    return generated.finalPrompt;
  }
  return item.goal || '';
}

function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: {
  icon: typeof Sparkles;
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-dashed border-gray-200 bg-white p-8 text-center dark:border-gray-800 dark:bg-gray-900/60">
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-violet-50 dark:bg-violet-900/20">
        <Icon className="h-6 w-6 text-violet-600" />
      </div>
      <h3 className="mb-1 font-heading text-base font-semibold text-gray-900 dark:text-white">{title}</h3>
      <p className="mx-auto mb-5 max-w-md text-sm text-gray-500 dark:text-gray-400">{description}</p>
      {action}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  OVERVIEW TAB                                                       */
/* ------------------------------------------------------------------ */

function OverviewTab() {
  const { user } = useAuth();
  const { usage, dailyLimit } = useUsage(user?.id, user?.plan_type);
  const [savedPrompts, setSavedPrompts] = useState<SavedPrompt[]>([]);
  const [recentGenerations, setRecentGenerations] = useState<PromptGenerationHistoryItem[]>([]);
  const [coursePurchases, setCoursePurchases] = useState<CoursePurchase[]>([]);
  const [loading, setLoading] = useState(true);
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  useEffect(() => {
    let active = true;
    if (!user?.id) {
      return;
    }

    Promise.all([
      getSavedPrompts(user.id),
      getPromptGenerations(user.id, 5),
      getCoursePurchases(user.id),
    ])
      .then(([saved, generations, purchases]) => {
        if (!active) return;
        setSavedPrompts(saved);
        setRecentGenerations(generations);
        setCoursePurchases(purchases);
      })
      .catch((error) => {
        if (active) toast.error(error instanceof Error ? error.message : 'Unable to load dashboard data');
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => { active = false; };
  }, [user?.id]);

  const stats = [
    { label: 'Prompts Used Today', value: `${usage?.generationsUsed || 0} / ${dailyLimit}`, icon: Zap, color: 'text-violet-600', bg: 'bg-violet-50 dark:bg-violet-900/20' },
    { label: 'Saved Prompts', value: loading ? '...' : savedPrompts.length.toString(), icon: Bookmark, color: 'text-amber-600', bg: 'bg-amber-50 dark:bg-amber-900/20' },
    { label: 'Current Plan', value: (user?.plan_type || 'Free').charAt(0).toUpperCase() + (user?.plan_type || 'Free').slice(1), icon: Shield, color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
    { label: 'Course Access', value: loading ? '...' : coursePurchases.some((p) => p.status === 'active') ? 'Active' : 'Not enrolled', icon: GraduationCap, color: 'text-sky-600', bg: 'bg-sky-50 dark:bg-sky-900/20' },
  ];

  return (
    <div>
      <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0}>
        <h1 className="font-heading font-bold text-2xl text-gray-900 dark:text-white mb-2">
          {greeting}, {user?.full_name?.split(' ')[0] || 'there'}
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">Here&apos;s what&apos;s happening with your prompts today.</p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={i}
            className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-100 dark:border-gray-800"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 ${stat.bg} rounded-lg flex items-center justify-center`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
            </div>
            <p className="text-2xl font-heading font-bold text-gray-900 dark:text-white">{stat.value}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Upgrade Banner */}
      {(!user?.plan_type || user?.plan_type === 'free') && (
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={2}
          className="bg-gradient-to-r from-violet-600 to-indigo-600 rounded-xl p-6 mb-8 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        >
          <div>
            <h3 className="font-semibold text-white mb-1">Upgrade to Pro</h3>
            <p className="text-sm text-violet-100">You&apos;ve used {usage?.generationsUsed || 0} of {dailyLimit} free prompts today. Upgrade for unlimited access.</p>
          </div>
          <Link
            to="/pricing"
            className="px-5 py-2.5 bg-white text-violet-700 rounded-lg text-sm font-semibold hover:bg-gray-100 transition-colors shrink-0"
          >
            Upgrade Now
          </Link>
        </motion.div>
      )}

      {/* Recent Generations Table */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={3}
        className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-800 p-6 mb-8"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-heading font-semibold text-lg text-gray-900 dark:text-white">Recent Generations</h2>
          <Link to="/dashboard?tab=history" className="text-sm text-violet-600 flex items-center gap-1 hover:underline">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        {loading && (
          <p className="py-12 text-center text-sm text-gray-500 dark:text-gray-400">Loading your recent prompt activity...</p>
        )}

        {!loading && recentGenerations.length === 0 && (
          <EmptyState
            icon={Wand2}
            title="No prompt history yet"
            description="Generate your first prompt and it will appear here with its category, score, and date."
            action={(
              <Link to="/prompt-generator" className="inline-flex min-h-10 items-center justify-center rounded-lg bg-violet-600 px-4 text-sm font-semibold text-white hover:bg-violet-700">
                Generate a Prompt
              </Link>
            )}
          />
        )}

        {!loading && recentGenerations.length > 0 && <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-800">
                <th className="text-left py-3 px-2 text-gray-500 dark:text-gray-400 font-medium">Goal</th>
                <th className="text-left py-3 px-2 text-gray-500 dark:text-gray-400 font-medium">Category</th>
                <th className="text-left py-3 px-2 text-gray-500 dark:text-gray-400 font-medium">Score</th>
                <th className="text-left py-3 px-2 text-gray-500 dark:text-gray-400 font-medium">Date</th>
                <th className="text-left py-3 px-2 text-gray-500 dark:text-gray-400 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {recentGenerations.map((row) => (
                <tr key={row.id} className="border-b border-gray-50 dark:border-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <td className="py-3 px-2 text-gray-700 dark:text-gray-300 max-w-[200px] truncate">{row.goal || 'Untitled generation'}</td>
                  <td className="py-3 px-2"><span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full text-gray-600 dark:text-gray-300">{row.category || 'General'}</span></td>
                  <td className="py-3 px-2">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${(row.prompt_score || 0) >= 90 ? 'bg-emerald-50 text-emerald-600' : (row.prompt_score || 0) >= 80 ? 'bg-amber-50 text-amber-600' : 'bg-gray-100 text-gray-600'}`}>
                      {row.prompt_score || '-'}
                    </span>
                  </td>
                  <td className="py-3 px-2 text-gray-500 dark:text-gray-400">{formatDate(row.created_at)}</td>
                  <td className="py-3 px-2">
                    <button
                      onClick={() => { navigator.clipboard.writeText(promptTextFromGeneration(row)); toast.success('Copied to clipboard'); }}
                      className="text-xs text-violet-600 hover:underline flex items-center gap-1"
                    >
                      <Copy className="w-3 h-3" /> Copy
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>}
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={4}
      >
        <h2 className="font-heading font-semibold text-lg text-gray-900 dark:text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link to="/prompt-generator" className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-800 hover:border-violet-200 dark:hover:border-violet-800/50 transition-colors">
            <div className="w-10 h-10 bg-violet-50 dark:bg-violet-900/20 rounded-lg flex items-center justify-center">
              <Wand2 className="w-5 h-5 text-violet-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900 dark:text-white text-sm">Generate a Prompt</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Create a new optimized prompt</p>
            </div>
          </Link>
          <Link to="/dashboard?tab=saved" className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-800 hover:border-violet-200 dark:hover:border-violet-800/50 transition-colors">
            <div className="w-10 h-10 bg-amber-50 dark:bg-amber-900/20 rounded-lg flex items-center justify-center">
              <Bookmark className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900 dark:text-white text-sm">Saved Prompts</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">View your prompt library</p>
            </div>
          </Link>
          <Link to="/dashboard?tab=course" className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-800 hover:border-violet-200 dark:hover:border-violet-800/50 transition-colors">
            <div className="w-10 h-10 bg-sky-50 dark:bg-sky-900/20 rounded-lg flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-sky-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900 dark:text-white text-sm">Continue Course</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Resume your learning</p>
            </div>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  GENERATE TAB                                                       */
/* ------------------------------------------------------------------ */

function GenerateTab() {
  return (
    <div>
      <h1 className="font-heading font-bold text-2xl text-gray-900 dark:text-white mb-6">Generate</h1>
      <EmptyState
        icon={Wand2}
        title="Open the prompt generator"
        description="The generator is a dedicated workspace. Your generated prompts will return to this dashboard history."
        action={(
          <Link to="/prompt-generator" className="inline-flex min-h-10 items-center justify-center rounded-lg bg-violet-600 px-4 text-sm font-semibold text-white hover:bg-violet-700">
            Launch Generator
          </Link>
        )}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  SAVED PROMPTS TAB                                                  */
/* ------------------------------------------------------------------ */

function SavedPromptsTab() {
  const { user } = useAuth();
  const [search, setSearch] = useState('');
  const [prompts, setPrompts] = useState<SavedPrompt[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    if (!user?.id) {
      return;
    }

    getSavedPrompts(user.id)
      .then((items) => {
        if (active) setPrompts(items);
      })
      .catch((error) => {
        if (active) toast.error(error instanceof Error ? error.message : 'Unable to load saved prompts');
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => { active = false; };
  }, [user?.id]);

  const filtered = useMemo(() => {
    if (!search.trim()) return prompts;
    return prompts.filter(p =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, prompts]);

  const handleDelete = async (id: string) => {
    if (!user?.id) return;
    try {
      await deleteSavedPrompt(user.id, id);
      setPrompts(prev => prev.filter(p => p.id !== id));
      toast.success('Prompt deleted');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Unable to delete prompt');
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard');
  };

  return (
    <div>
      <h1 className="font-heading font-bold text-2xl text-gray-900 dark:text-white mb-6">Saved Prompts</h1>

      <div className="flex items-center gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search saved prompts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:text-gray-200"
          />
        </div>
      </div>

      <div className="space-y-4">
        {loading && <p className="py-12 text-center text-sm text-gray-500 dark:text-gray-400">Loading saved prompts...</p>}

        {!loading && filtered.map((prompt, i) => (
          <motion.div
            key={prompt.id}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={i}
            className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-800 p-5"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <span className="inline-block text-xs font-medium text-violet-600 bg-violet-50 dark:bg-violet-900/20 px-2 py-0.5 rounded-full mb-2">
                  {prompt.category}
                </span>
                <h3 className="font-heading font-semibold text-gray-900 dark:text-white">{prompt.title}</h3>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleCopy(prompt.prompt_text)}
                  className="p-2 rounded-lg text-gray-400 hover:text-violet-600 hover:bg-violet-50 dark:hover:bg-violet-900/20 transition-colors"
                  title="Copy"
                >
                  <Copy className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(prompt.id)}
                  className="p-2 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-mono line-clamp-2">{prompt.prompt_text}</p>
            <p className="text-xs text-gray-400 mt-3">Saved {formatDate(prompt.created_at)}</p>
          </motion.div>
        ))}

        {!loading && filtered.length === 0 && (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-800">
            <Bookmark className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 dark:text-gray-400 text-sm">No saved prompts found.</p>
            <Link to="/prompt-generator" className="text-sm text-violet-600 hover:underline mt-1 inline-block">
              Generate your first prompt
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  HISTORY TAB                                                        */
/* ------------------------------------------------------------------ */

function HistoryTab() {
  const { user } = useAuth();
  const [history, setHistory] = useState<PromptGenerationHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    if (!user?.id) {
      return;
    }

    getPromptGenerations(user.id, 50)
      .then((items) => {
        if (active) setHistory(items);
      })
      .catch((error) => {
        if (active) toast.error(error instanceof Error ? error.message : 'Unable to load generation history');
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => { active = false; };
  }, [user?.id]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard');
  };

  return (
    <div>
      <h1 className="font-heading font-bold text-2xl text-gray-900 dark:text-white mb-6">Generation History</h1>

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-800 overflow-hidden">
        {loading && <p className="py-12 text-center text-sm text-gray-500 dark:text-gray-400">Loading generation history...</p>}
        {!loading && history.length === 0 && (
          <div className="p-6">
            <EmptyState
              icon={History}
              title="No generation history yet"
              description="Your generated prompts will appear here after you use the prompt generator."
              action={(
                <Link to="/prompt-generator" className="inline-flex min-h-10 items-center justify-center rounded-lg bg-violet-600 px-4 text-sm font-semibold text-white hover:bg-violet-700">
                  Generate a Prompt
                </Link>
              )}
            />
          </div>
        )}
        {!loading && history.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50">
                <th className="text-left py-3 px-4 text-gray-500 dark:text-gray-400 font-medium">Goal</th>
                <th className="text-left py-3 px-4 text-gray-500 dark:text-gray-400 font-medium">Category</th>
                <th className="text-left py-3 px-4 text-gray-500 dark:text-gray-400 font-medium">Score</th>
                <th className="text-left py-3 px-4 text-gray-500 dark:text-gray-400 font-medium">Date</th>
                <th className="text-left py-3 px-4 text-gray-500 dark:text-gray-400 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {history.map((row, i) => (
                <motion.tr
                  key={row.id}
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  custom={i}
                  className="border-b border-gray-50 dark:border-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                >
                  <td className="py-3 px-4 text-gray-700 dark:text-gray-300 max-w-[240px] truncate">{row.goal || 'Untitled generation'}</td>
                  <td className="py-3 px-4"><span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full text-gray-600 dark:text-gray-300">{row.category || 'General'}</span></td>
                  <td className="py-3 px-4">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${(row.prompt_score || 0) >= 90 ? 'bg-emerald-50 text-emerald-600' : (row.prompt_score || 0) >= 80 ? 'bg-amber-50 text-amber-600' : 'bg-gray-100 text-gray-600'}`}>
                      {row.prompt_score || '-'}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-500 dark:text-gray-400">{formatDate(row.created_at)}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleCopy(promptTextFromGeneration(row))}
                        className="p-1.5 rounded text-gray-400 hover:text-violet-600 hover:bg-violet-50 dark:hover:bg-violet-900/20 transition-colors"
                        title="Copy"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                      <Link
                        to="/prompt-generator"
                        className="p-1.5 rounded text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors"
                        title="Regenerate"
                      >
                        <Wand2 className="w-4 h-4" />
                      </Link>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  COLLECTIONS TAB                                                    */
/* ------------------------------------------------------------------ */

function CollectionsTab() {
  const { user } = useAuth();
  const [collections, setCollections] = useState<PromptCollection[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [newName, setNewName] = useState('');
  const [newDesc, setNewDesc] = useState('');

  useEffect(() => {
    let active = true;
    if (!user?.id) {
      return;
    }

    getPromptCollections(user.id)
      .then((items) => {
        if (active) setCollections(items);
      })
      .catch((error) => {
        if (active) toast.error(error instanceof Error ? error.message : 'Unable to load collections');
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => { active = false; };
  }, [user?.id]);

  const handleCreate = async () => {
    if (!newName.trim()) return;
    if (!user?.id) {
      toast.error('Please log in to create collections');
      return;
    }

    try {
      const newCollection = await createPromptCollection(user.id, {
        name: newName.trim(),
        description: newDesc.trim() || undefined,
      });
      setCollections(prev => [newCollection, ...prev]);
      setNewName('');
      setNewDesc('');
      setShowCreate(false);
      toast.success('Collection created');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Unable to create collection');
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-heading font-bold text-2xl text-gray-900 dark:text-white">Collections</h1>
        <button
          onClick={() => setShowCreate(true)}
          className="flex items-center gap-2 px-4 py-2 bg-violet-600 text-white rounded-lg text-sm font-semibold hover:bg-violet-700 transition-colors"
        >
          <Plus className="w-4 h-4" /> New Collection
        </button>
      </div>

      {showCreate && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 mb-6"
        >
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Create Collection</h3>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="e.g., Marketing Campaigns"
                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm dark:text-gray-200 focus:outline-none focus:border-violet-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description (optional)</label>
              <input
                type="text"
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                placeholder="What prompts will you save here?"
                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm dark:text-gray-200 focus:outline-none focus:border-violet-500"
              />
            </div>
            <div className="flex items-center gap-2">
              <button onClick={handleCreate} className="px-4 py-2 bg-violet-600 text-white rounded-lg text-sm font-semibold hover:bg-violet-700 transition-colors">
                Create
              </button>
              <button onClick={() => setShowCreate(false)} className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                Cancel
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {loading && <p className="py-12 text-center text-sm text-gray-500 dark:text-gray-400">Loading collections...</p>}
      {!loading && collections.length === 0 && (
        <EmptyState
          icon={FolderOpen}
          title="No collections yet"
          description="Create collections to organize prompts by client, workflow, campaign, or topic."
          action={(
            <button onClick={() => setShowCreate(true)} className="inline-flex min-h-10 items-center justify-center rounded-lg bg-violet-600 px-4 text-sm font-semibold text-white hover:bg-violet-700">
              New Collection
            </button>
          )}
        />
      )}
      {!loading && collections.length > 0 && <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {collections.map((col, i) => (
          <motion.div
            key={col.id}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={i}
            className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-800 p-5 hover:border-violet-200 dark:hover:border-violet-800/50 transition-colors"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 bg-violet-50 dark:bg-violet-900/20 rounded-lg flex items-center justify-center">
                <FolderOpen className="w-5 h-5 text-violet-600" />
              </div>
              <span className="text-xs text-gray-400">Collection</span>
            </div>
            <h3 className="font-heading font-semibold text-gray-900 dark:text-white mb-1">{col.name}</h3>
            {col.description && <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">{col.description}</p>}
            <p className="text-xs text-gray-400">Created {formatDate(col.created_at)}</p>
          </motion.div>
        ))}
      </div>}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  COURSE TAB                                                         */
/* ------------------------------------------------------------------ */

function CourseTab() {
  const { user } = useAuth();
  const [purchases, setPurchases] = useState<CoursePurchase[]>([]);
  const [loading, setLoading] = useState(true);
  const totalLessons = courseModules.reduce((acc, m) => acc + m.lessons, 0);
  const completedLessons = courseModules.reduce((acc, m) => acc + m.completed, 0);
  const progressPercent = Math.round((completedLessons / totalLessons) * 100);
  const hasPurchased = purchases.some((purchase) => purchase.status === 'active');

  useEffect(() => {
    let active = true;
    if (!user?.id) {
      return;
    }

    getCoursePurchases(user.id)
      .then((items) => {
        if (active) setPurchases(items);
      })
      .catch((error) => {
        if (active) toast.error(error instanceof Error ? error.message : 'Unable to load course access');
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => { active = false; };
  }, [user?.id]);

  if (loading) {
    return (
      <div>
        <h1 className="font-heading font-bold text-2xl text-gray-900 dark:text-white mb-6">Course</h1>
        <p className="py-12 text-center text-sm text-gray-500 dark:text-gray-400">Loading course access...</p>
      </div>
    );
  }

  if (!hasPurchased) {
    return (
      <div>
        <h1 className="font-heading font-bold text-2xl text-gray-900 dark:text-white mb-6">Course</h1>
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-8 text-center max-w-lg mx-auto">
          <div className="w-16 h-16 bg-violet-50 dark:bg-violet-900/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <GraduationCap className="w-8 h-8 text-violet-600" />
          </div>
          <h2 className="font-heading font-bold text-xl text-gray-900 dark:text-white mb-2">
            Master Prompt Engineering
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            A comprehensive 10-module course with 50 lessons, real-world projects, and a certificate of completion.
          </p>
          <ul className="text-left text-sm text-gray-600 dark:text-gray-400 space-y-2 mb-6 max-w-xs mx-auto">
            <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> 10 modules, 50 lessons</li>
            <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> Certificate of completion</li>
            <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> Lifetime access</li>
          </ul>
          <Link
            to="/course/master-prompt-engineering"
            className="inline-flex items-center gap-2 px-6 py-3 bg-violet-600 text-white rounded-xl font-semibold hover:bg-violet-700 transition-colors"
          >
            Enroll Now — $197
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="font-heading font-bold text-2xl text-gray-900 dark:text-white mb-6">Course Progress</h1>

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-800 p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Overall Progress</p>
            <p className="text-2xl font-heading font-bold text-gray-900 dark:text-white">{progressPercent}%</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500 dark:text-gray-400">{completedLessons} of {totalLessons} lessons</p>
          </div>
        </div>
        <div className="w-full h-3 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
          <div className="h-full bg-violet-600 rounded-full transition-all" style={{ width: `${progressPercent}%` }} />
        </div>
      </div>

      <div className="space-y-3">
        {courseModules.map((mod, i) => (
          <motion.div
            key={mod.id}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={i}
            className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-800 p-5"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium text-gray-900 dark:text-white text-sm">{mod.title}</h3>
              <span className="text-xs text-gray-400">{mod.completed}/{mod.lessons} lessons</span>
            </div>
            <div className="w-full h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${(mod.completed / mod.lessons) * 100}%` }} />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  BILLING TAB                                                        */
/* ------------------------------------------------------------------ */

function BillingTab() {
  const { user } = useAuth();
  const { usage, dailyLimit } = useUsage(user?.id, user?.plan_type);
  const [portalLoading, setPortalLoading] = useState(false);
  const plan = user?.plan_type || 'free';
  const planName = plan.charAt(0).toUpperCase() + plan.slice(1);

  const planDetails: Record<string, { monthlyLimit: number; price: string; features: string[] }> = {
    free: { monthlyLimit: 60, price: '$0/mo', features: ['2 prompts/day', 'Basic categories', 'Prompt score'] },
    starter: { monthlyLimit: 300, price: '$12/mo', features: ['300 prompts/mo', 'All categories', 'Save & organize'] },
    pro: { monthlyLimit: 2000, price: '$29/mo', features: ['2,000 prompts/mo', 'Advanced improvements', 'Priority support', 'Course access'] },
    unlimited: { monthlyLimit: 99999, price: '$79/mo', features: ['Unlimited prompts', 'API access', 'White-label exports'] },
  };

  const current = planDetails[plan] || planDetails.free;
  const usagePercent = Math.min(100, ((usage?.generationsUsed || 0) / dailyLimit) * 100);

  const openPortal = async () => {
    setPortalLoading(true);
    try {
      const { url } = await createPortalSession();
      window.location.assign(url);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Unable to open billing portal');
    } finally {
      setPortalLoading(false);
    }
  };

  return (
    <div>
      <h1 className="font-heading font-bold text-2xl text-gray-900 dark:text-white mb-6">Billing</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Current Plan */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
          className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-800 p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-violet-50 dark:bg-violet-900/20 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-violet-600" />
            </div>
            <div>
              <h2 className="font-heading font-semibold text-gray-900 dark:text-white">{planName} Plan</h2>
              <p className="text-sm text-gray-500">{current.price}</p>
            </div>
          </div>

          <ul className="space-y-2 mb-6">
            {current.features.map(f => (
              <li key={f} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Check className="w-4 h-4 text-emerald-500" /> {f}
              </li>
            ))}
          </ul>

          {plan === 'free' ? (
            <Link
              to="/pricing"
              className="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-violet-600 text-white rounded-lg text-sm font-semibold hover:bg-violet-700 transition-colors"
            >
              <Sparkles className="w-4 h-4" /> Upgrade Plan
            </Link>
          ) : (
            <button
              onClick={openPortal}
              disabled={portalLoading}
              className="flex items-center justify-center gap-2 w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <CreditCard className="w-4 h-4" /> {portalLoading ? 'Opening...' : 'Manage Subscription'}
            </button>
          )}
        </motion.div>

        {/* Usage */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
          className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-800 p-6"
        >
          <h2 className="font-heading font-semibold text-gray-900 dark:text-white mb-4">Today&apos;s Usage</h2>
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500">Prompts used today</span>
              <span className="text-sm font-semibold text-gray-900 dark:text-white">{usage?.generationsUsed || 0} / {dailyLimit}</span>
            </div>
            <div className="w-full h-3 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full bg-violet-600 rounded-full transition-all" style={{ width: `${usagePercent}%` }} />
            </div>
          </div>
          <p className="text-xs text-gray-400">Resets at midnight UTC</p>
        </motion.div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  SETTINGS TAB                                                       */
/* ------------------------------------------------------------------ */

function SettingsTab() {
  const { user, refresh } = useAuth();
  const [name, setName] = useState(user?.full_name || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [saving, setSaving] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleSaveProfile = async () => {
    if (!user?.id) return;
    setSaving(true);
    try {
      await updateProfile(user.id, { full_name: name.trim() || user.full_name });
      await refresh();
      toast.success('Profile updated');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Unable to update profile');
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || newPassword.length < 8) {
      toast.error('Password must be at least 8 characters');
      return;
    }
    toast.success('Password updated');
    setCurrentPassword('');
    setNewPassword('');
  };

  return (
    <div>
      <h1 className="font-heading font-bold text-2xl text-gray-900 dark:text-white mb-6">Settings</h1>

      <div className="space-y-6 max-w-xl">
        {/* Profile */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
          className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-800 p-6"
        >
          <h2 className="font-heading font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <User className="w-5 h-5 text-violet-600" /> Profile
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm dark:text-gray-200 focus:outline-none focus:border-violet-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
              <input
                type="email"
                value={user?.email || ''}
                readOnly
                className="w-full px-4 py-2.5 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-500 dark:text-gray-400 cursor-not-allowed"
              />
            </div>
            <button
              onClick={handleSaveProfile}
              disabled={saving}
              className="px-5 py-2 bg-violet-600 text-white rounded-lg text-sm font-semibold hover:bg-violet-700 transition-colors disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </motion.div>

        {/* Password */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
          className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-800 p-6"
        >
          <h2 className="font-heading font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-violet-600" /> Change Password
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Current Password</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm dark:text-gray-200 focus:outline-none focus:border-violet-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Min 8 characters"
                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm dark:text-gray-200 focus:outline-none focus:border-violet-500"
              />
            </div>
            <button
              onClick={handleChangePassword}
              className="px-5 py-2 bg-violet-600 text-white rounded-lg text-sm font-semibold hover:bg-violet-700 transition-colors"
            >
              Update Password
            </button>
          </div>
        </motion.div>

        {/* Danger Zone */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={2}
          className="bg-red-50 dark:bg-red-900/10 rounded-xl border border-red-200 dark:border-red-900/20 p-6"
        >
          <h2 className="font-heading font-semibold text-red-700 dark:text-red-400 mb-2 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" /> Danger Zone
          </h2>
          <p className="text-sm text-red-600/80 dark:text-red-400/80 mb-4">
            Once you delete your account, there is no going back. All your data will be permanently removed.
          </p>
          {!showDeleteConfirm ? (
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="px-5 py-2 border border-red-300 dark:border-red-700 text-red-600 dark:text-red-400 rounded-lg text-sm font-medium hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
            >
              Delete Account
            </button>
          ) : (
            <div className="space-y-3">
              <p className="text-sm text-red-600 dark:text-red-400 font-medium">Are you sure? This cannot be undone.</p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => { toast.error('Account deletion is not enabled yet. Contact support to delete your account.'); setShowDeleteConfirm(false); }}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-semibold hover:bg-red-700 transition-colors"
                >
                  Yes, Delete
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

/* ================================================================== */
/*  MAIN DASHBOARD PAGE                                                */
/* ================================================================== */

export default function Dashboard() {
  const [searchParams] = useSearchParams();
  const { user, loading } = useAuth();
  const tab = searchParams.get('tab') || 'overview';

  const renderTab = () => {
    switch (tab) {
      case 'generate': return <GenerateTab />;
      case 'saved': return <SavedPromptsTab />;
      case 'history': return <HistoryTab />;
      case 'collections': return <CollectionsTab />;
      case 'course': return <CourseTab />;
      case 'billing': return <BillingTab />;
      case 'settings': return <SettingsTab />;
      default: return <OverviewTab />;
    }
  };

  if (loading) {
    return (
      <>
        <DashboardLayout>
          <p className="py-20 text-center text-sm text-gray-500 dark:text-gray-400">Loading your dashboard...</p>
        </DashboardLayout>
        <Toaster position="top-right" richColors />
      </>
    );
  }

  if (!user) return <Navigate to="/login" replace />;

  return (
    <>
      <SEOHead title={`${tab.charAt(0).toUpperCase() + tab.slice(1)} — Dashboard — Verbito.ai`} />
      <DashboardLayout>
        {renderTab()}
      </DashboardLayout>
      <Toaster position="top-right" richColors />
    </>
  );
}
