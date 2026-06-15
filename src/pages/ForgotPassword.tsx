import { usePageTranslations } from '@/hooks/useTranslation';
import { AnimatePresence,motion } from 'framer-motion';
import { ArrowLeft,Check,Sparkles } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { resetPassword } from '../services/supabase';

function getErrorMessage(error: unknown, fallback: string) {
  return error instanceof Error ? error.message : fallback;
}

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const tt = usePageTranslations('auth');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);
    try {
      await resetPassword(email);
      setSubmitted(true);
      toast.success('Password reset link sent to your email');
    } catch (err: unknown) {
      const message = getErrorMessage(err, 'Failed to send reset link');
      setError(message);
      toast.error(message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-[100dvh] flex items-center justify-center p-6 bg-white dark:bg-gray-950">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-0.5 mb-6">
            <span className="font-heading font-bold text-2xl text-gray-900 dark:text-white">verbito</span>
            <span className="font-heading font-bold text-2xl text-violet-600">.ai</span>
          </Link>
          <h1 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-1">Reset password</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">We will send you a reset link</p>
        </div>

        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
              onSubmit={handleSubmit}
            >
              {error && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/20 rounded-lg text-sm text-red-600 dark:text-red-400">
                  {error}
                </motion.div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{tt.email}</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(''); }}
                  placeholder="you@example.com"
                  className={`w-full px-4 py-2.5 bg-white dark:bg-gray-800 border rounded-lg text-sm focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:text-gray-200 ${
                    error ? 'border-red-300 dark:border-red-700' : 'border-gray-200 dark:border-gray-700'
                  }`}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 bg-violet-600 text-white rounded-lg font-semibold text-sm hover:bg-violet-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    {tt.sendResetLink}
                  </>
                )}
              </button>

              <div className="text-center">
                <Link to="/login" className="inline-flex items-center gap-1 text-sm text-violet-600 hover:underline">
                  <ArrowLeft className="w-4 h-4" /> {tt.backToLogin}
                </Link>
              </div>
            </motion.form>
          ) : (
            <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
              <div className="w-16 h-16 bg-emerald-50 dark:bg-emerald-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-emerald-500" />
              </div>
              <h2 className="font-heading font-semibold text-lg text-gray-900 dark:text-white mb-2">Check your email</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">We sent a password reset link to</p>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-6">{email}</p>
              <p className="text-xs text-gray-400 mb-6">Didn&apos;t receive it? Check your spam folder or <button onClick={() => setSubmitted(false)} className="text-violet-600 hover:underline">try again</button>.</p>
              <Link to="/login" className="inline-flex items-center gap-1 text-sm text-violet-600 hover:underline">
                <ArrowLeft className="w-4 h-4" /> {tt.backToLogin}
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
