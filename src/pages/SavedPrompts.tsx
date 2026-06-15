import { motion } from 'framer-motion';
import { Check,Copy,Grid3X3,List,Search,Trash2 } from 'lucide-react';
import { useEffect,useMemo,useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import SEOHead from '../components/shared/SEOHead';
import { useAuth } from '../hooks/useAuth';
import { deleteSavedPrompt,getSavedPrompts } from '../services/supabase';
import type { SavedPrompt } from '../types';

function formatDate(value: string) {
  return new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(value));
}

export default function SavedPrompts() {
  const { user, loading: authLoading } = useAuth();
  const [search, setSearch] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [prompts, setPrompts] = useState<SavedPrompt[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    if (authLoading) return;
    if (!user) return;

    Promise.resolve()
      .then(() => {
        if (!active) return [];
        setLoading(true);
        setError(null);
        return getSavedPrompts(user.id);
      })
      .then((data) => {
        if (active) setPrompts(data);
      })
      .catch((err) => {
        if (active) setError(err instanceof Error ? err.message : 'Unable to load saved prompts.');
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [authLoading, user]);

  const filtered = useMemo(
    () => prompts.filter((p) => p.title.toLowerCase().includes(search.toLowerCase())),
    [prompts, search]
  );

  const handleCopy = async (prompt: SavedPrompt) => {
    await navigator.clipboard.writeText(prompt.prompt_text);
    setCopiedId(prompt.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = async (promptId: string) => {
    if (!user) return;
    setError(null);
    try {
      await deleteSavedPrompt(user.id, promptId);
      setPrompts((current) => current.filter((prompt) => prompt.id !== promptId));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to delete saved prompt.');
    }
  };

  return (
    <>
      <SEOHead title="Saved Prompts — Verbito.ai" />
      <DashboardLayout>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <h1 className="font-heading font-bold text-2xl text-gray-900 dark:text-white">Saved Prompts</h1>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search..." className="pl-9 pr-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:border-violet-500 w-48 dark:text-gray-200" />
            </div>
            <button onClick={() => setViewMode('grid')} className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-violet-100 dark:bg-violet-900/30 text-violet-600' : 'text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'}`} aria-label="Grid view"><Grid3X3 className="w-4 h-4" /></button>
            <button onClick={() => setViewMode('list')} className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-violet-100 dark:bg-violet-900/30 text-violet-600' : 'text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'}`} aria-label="List view"><List className="w-4 h-4" /></button>
          </div>
        </div>

        {!user && !authLoading && (
          <div className="rounded-xl border border-gray-200 bg-white p-8 text-center dark:border-gray-800 dark:bg-gray-900">
            <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">Sign in to view and manage your saved prompts.</p>
            <Link to="/login" className="inline-flex items-center justify-center rounded-lg bg-violet-600 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-700">
              Log in
            </Link>
          </div>
        )}

        {error && (
          <div className="mb-6 rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700 dark:border-rose-900/60 dark:bg-rose-950/30 dark:text-rose-300">
            {error}
          </div>
        )}

        {loading && user && <p className="text-gray-500 dark:text-gray-400 text-center py-20">Loading saved prompts...</p>}

        {!loading && user && filtered.length === 0 && <p className="text-gray-500 dark:text-gray-400 text-center py-20">No saved prompts found.</p>}

        {!loading && user && filtered.length > 0 && (
          viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filtered.map((p, i) => (
                <motion.div key={p.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-800 p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <span className="text-xs text-gray-500 dark:text-gray-400">{p.category}</span>
                      <h3 className="font-heading font-semibold text-gray-900 dark:text-white">{p.title}</h3>
                    </div>
                  </div>
                  <pre className="text-xs font-mono text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-900 p-3 rounded-lg whitespace-pre-wrap max-h-24 overflow-auto mb-3">{p.prompt_text}</pre>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">{formatDate(p.created_at)}</span>
                    <div className="flex items-center gap-1">
                      <button onClick={() => handleCopy(p)} className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" aria-label="Copy prompt">
                        {copiedId === p.id ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                      </button>
                      <button onClick={() => handleDelete(p.id)} className="p-1.5 rounded-lg text-gray-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-500 transition-colors" aria-label="Delete prompt">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-800 overflow-hidden">
              {filtered.map((p, i) => (
                <div key={p.id} className={`flex items-center justify-between p-4 ${i < filtered.length - 1 ? 'border-b border-gray-100 dark:border-gray-800' : ''}`}>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white text-sm">{p.title}</h3>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{p.category} · {formatDate(p.created_at)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <button onClick={() => handleCopy(p)} className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700" aria-label="Copy prompt">
                      {copiedId === p.id ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                    </button>
                    <button onClick={() => handleDelete(p.id)} className="p-1.5 rounded-lg text-gray-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-500" aria-label="Delete prompt">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )
        )}
      </DashboardLayout>
    </>
  );
}
