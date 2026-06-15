import { AnimatePresence,motion } from 'framer-motion';
import {
AlertTriangle,
CheckCircle2,
Clock,FileText,
Folder,
FolderPlus,
Plus,
Trash2,
X
} from 'lucide-react';
import { useState } from 'react';
import SEOHead from '../components/shared/SEOHead';

interface PromptItem {
  id: number;
  title: string;
  category: string;
}

interface Collection {
  id: string;
  name: string;
  description: string;
  prompts: PromptItem[];
  createdAt: string;
  isDefault?: boolean;
}

const defaultCollections: Collection[] = [
  {
    id: 'default-1',
    name: 'Favorites',
    description: 'Your most-used and favorite prompts',
    prompts: [
      { id: 1, title: 'Business Plan Generator', category: 'Business' },
      { id: 2, title: 'High-Converting Ad Copy', category: 'Marketing' },
      { id: 4, title: 'Blog Post Writer', category: 'Content Creation' },
    ],
    createdAt: 'Jan 10, 2026',
    isDefault: true,
  },
  {
    id: 'default-2',
    name: 'Marketing Workflows',
    description: 'All marketing-related prompts and templates',
    prompts: [
      { id: 2, title: 'High-Converting Ad Copy', category: 'Marketing' },
      { id: 5, title: 'Social Media Calendar', category: 'Social Media' },
      { id: 6, title: 'SEO Content Optimizer', category: 'SEO' },
      { id: 7, title: 'Email Subject Lines', category: 'Email Writing' },
    ],
    createdAt: 'Jan 5, 2026',
  },
  {
    id: 'default-3',
    name: 'Dev Team',
    description: 'Coding and development prompts',
    prompts: [
      { id: 8, title: 'Code Review Assistant', category: 'Coding' },
      { id: 9, title: 'Data Analyst Prompt', category: 'Data Analysis' },
    ],
    createdAt: 'Dec 28, 2025',
  },
];

const availablePrompts: PromptItem[] = [
  { id: 1, title: 'Business Plan Generator', category: 'Business' },
  { id: 2, title: 'High-Converting Ad Copy', category: 'Marketing' },
  { id: 3, title: 'Sales Outreach Sequence', category: 'Sales' },
  { id: 4, title: 'Blog Post Writer', category: 'Content Creation' },
  { id: 5, title: 'Social Media Calendar', category: 'Social Media' },
  { id: 6, title: 'SEO Content Optimizer', category: 'SEO' },
  { id: 7, title: 'Email Subject Lines', category: 'Email Writing' },
  { id: 8, title: 'Code Review Assistant', category: 'Coding' },
  { id: 9, title: 'Data Analyst Prompt', category: 'Data Analysis' },
  { id: 10, title: 'Lesson Plan Generator', category: 'Education' },
  { id: 11, title: 'Research Summarizer', category: 'Research' },
  { id: 12, title: 'Task Automation Builder', category: 'Automation' },
];

export default function Collections() {
  const [collections, setCollections] = useState<Collection[]>(defaultCollections);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState<string | null>(null);
  const [showAddPromptModal, setShowAddPromptModal] = useState<string | null>(null);
  const [newCollection, setNewCollection] = useState({ name: '', description: '' });
  const [searchPrompt, setSearchPrompt] = useState('');

  const createCollection = () => {
    if (!newCollection.name.trim()) return;
    const collection: Collection = {
      id: `coll-${Date.now()}`,
      name: newCollection.name,
      description: newCollection.description,
      prompts: [],
      createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    };
    setCollections([...collections, collection]);
    setNewCollection({ name: '', description: '' });
    setShowCreateModal(false);
  };

  const deleteCollection = (id: string) => {
    setCollections(collections.filter((c) => c.id !== id));
    setShowDeleteModal(null);
  };

  const addPromptToCollection = (collectionId: string, prompt: PromptItem) => {
    setCollections(collections.map((c) => {
      if (c.id === collectionId && !c.prompts.find((p) => p.id === prompt.id)) {
        return { ...c, prompts: [...c.prompts, prompt] };
      }
      return c;
    }));
  };

  const removePromptFromCollection = (collectionId: string, promptId: number) => {
    setCollections(collections.map((c) => {
      if (c.id === collectionId) {
        return { ...c, prompts: c.prompts.filter((p) => p.id !== promptId) };
      }
      return c;
    }));
  };

  const filteredAvailable = availablePrompts.filter(
    (p) => !searchPrompt || p.title.toLowerCase().includes(searchPrompt.toLowerCase())
  );

  const totalPrompts = collections.reduce((acc, c) => acc + c.prompts.length, 0);

  return (
    <>
      <SEOHead title="My Collections — Verbito.ai" description="Organize your favorite prompts into collections for quick access." />
      <section className="pt-28 pb-16 bg-gray-50 dark:bg-gray-950">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h1 className="font-heading font-bold text-3xl text-gray-900 dark:text-white mb-1">My Collections</h1>
                <p className="text-gray-600 dark:text-gray-400">
                  {collections.length} collections • {totalPrompts} prompts saved
                </p>
              </div>
              <button
                onClick={() => setShowCreateModal(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-violet-600 text-white rounded-xl text-sm font-medium hover:bg-violet-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                New Collection
              </button>
            </div>
          </motion.div>

          {/* Collections Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {collections.map((collection, i) => (
              <motion.div
                key={collection.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5 group"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 bg-violet-100 dark:bg-violet-900/20 rounded-lg flex items-center justify-center text-violet-600">
                    <Folder className="w-5 h-5" />
                  </div>
                  {!collection.isDefault && (
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                      <button
                        onClick={() => setShowDeleteModal(collection.id)}
                        className="p-1.5 text-gray-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>

                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{collection.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 line-clamp-2">{collection.description}</p>

                <div className="flex items-center gap-3 text-xs text-gray-500 mb-4">
                  <span className="flex items-center gap-1">
                    <FileText className="w-3.5 h-3.5" />
                    {collection.prompts.length} prompts
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {collection.createdAt}
                  </span>
                </div>

                {/* Preview of prompts */}
                {collection.prompts.length > 0 && (
                  <div className="space-y-1.5 mb-4">
                    {collection.prompts.slice(0, 3).map((p) => (
                      <div
                        key={p.id}
                        className="flex items-center justify-between text-xs bg-gray-50 dark:bg-gray-800 rounded-lg px-2.5 py-1.5"
                      >
                        <span className="text-gray-700 dark:text-gray-300 truncate">{p.title}</span>
                        {!collection.isDefault && (
                          <button
                            onClick={() => removePromptFromCollection(collection.id, p.id)}
                            className="text-gray-400 hover:text-rose-500 ml-1"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    ))}
                    {collection.prompts.length > 3 && (
                      <p className="text-xs text-gray-500 text-center">
                        +{collection.prompts.length - 3} more
                      </p>
                    )}
                  </div>
                )}

                <button
                  onClick={() => setShowAddPromptModal(collection.id)}
                  className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-xs font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add Prompt
                </button>
              </motion.div>
            ))}
          </div>

          {/* Empty state */}
          {collections.length === 0 && (
            <div className="text-center py-20">
              <FolderPlus className="w-12 h-12 text-gray-300 dark:text-gray-700 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">No collections yet</h3>
              <p className="text-sm text-gray-500 mb-4">Create your first collection to organize your prompts.</p>
              <button
                onClick={() => setShowCreateModal(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-violet-600 text-white rounded-xl text-sm font-medium hover:bg-violet-700"
              >
                <Plus className="w-4 h-4" />
                Create Collection
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Create Collection Modal */}
      <AnimatePresence>
        {showCreateModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowCreateModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 w-full max-w-md"
            >
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-heading font-bold text-xl text-gray-900 dark:text-white">New Collection</h2>
                <button onClick={() => setShowCreateModal(false)} className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
                  <input
                    type="text"
                    value={newCollection.name}
                    onChange={(e) => setNewCollection({ ...newCollection, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
                    placeholder="e.g., Marketing Campaigns"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                  <textarea
                    value={newCollection.description}
                    onChange={(e) => setNewCollection({ ...newCollection, description: e.target.value })}
                    rows={2}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none"
                    placeholder="Brief description of this collection..."
                  />
                </div>
                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={createCollection}
                    disabled={!newCollection.name.trim()}
                    className="flex-1 py-2.5 bg-violet-600 text-white rounded-xl font-medium hover:bg-violet-700 disabled:opacity-50 transition-colors"
                  >
                    Create Collection
                  </button>
                  <button
                    onClick={() => setShowCreateModal(false)}
                    className="px-4 py-2.5 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowDeleteModal(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 w-full max-w-sm"
            >
              <div className="w-12 h-12 bg-rose-100 dark:bg-rose-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-6 h-6 text-rose-600" />
              </div>
              <h2 className="font-heading font-bold text-lg text-gray-900 dark:text-white text-center mb-2">
                Delete Collection?
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 text-center mb-6">
                This action cannot be undone. The prompts inside will not be deleted.
              </p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => deleteCollection(showDeleteModal)}
                  className="flex-1 py-2.5 bg-rose-600 text-white rounded-xl font-medium hover:bg-rose-700 transition-colors"
                >
                  Delete
                </button>
                <button
                  onClick={() => setShowDeleteModal(null)}
                  className="flex-1 py-2.5 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Prompt Modal */}
      <AnimatePresence>
        {showAddPromptModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => { setShowAddPromptModal(null); setSearchPrompt(''); }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 w-full max-w-md"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-heading font-bold text-lg text-gray-900 dark:text-white">
                  Add Prompt to Collection
                </h2>
                <button
                  onClick={() => { setShowAddPromptModal(null); setSearchPrompt(''); }}
                  className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <input
                type="text"
                value={searchPrompt}
                onChange={(e) => setSearchPrompt(e.target.value)}
                placeholder="Search prompts..."
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 mb-4"
              />
              <div className="max-h-64 overflow-y-auto space-y-1">
                {filteredAvailable.map((prompt) => {
                  const coll = collections.find((c) => c.id === showAddPromptModal);
                  const alreadyAdded = coll?.prompts.some((p) => p.id === prompt.id);
                  return (
                    <button
                      key={prompt.id}
                      onClick={() => {
                        if (!alreadyAdded) {
                          addPromptToCollection(showAddPromptModal, prompt);
                        }
                      }}
                      disabled={alreadyAdded}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-colors ${
                        alreadyAdded
                          ? 'bg-emerald-50 dark:bg-emerald-900/10 text-emerald-700 dark:text-emerald-400 cursor-default'
                          : 'hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <FileText className="w-3.5 h-3.5 text-gray-400" />
                        <span>{prompt.title}</span>
                      </div>
                      {alreadyAdded ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      ) : (
                        <Plus className="w-4 h-4 text-gray-400" />
                      )}
                    </button>
                  );
                })}
                {filteredAvailable.length === 0 && (
                  <p className="text-sm text-gray-500 text-center py-4">No prompts found</p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
