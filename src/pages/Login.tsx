import { usePageTranslations } from '@/hooks/useTranslation';
import { auth as aut } from '@/lib/translations/auth';
import { motion } from 'framer-motion';
import { Eye,EyeOff,Github,Sparkles } from 'lucide-react';
import { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { signIn,signInWithOAuth } from '../services/supabase';

const loginBubbles = Array.from({ length: 20 }, (_, i) => ({
  width: 50 + ((i * 37) % 100),
  height: 50 + ((i * 53) % 100),
  top: `${(i * 29) % 100}%`,
  left: `${(i * 47) % 100}%`,
}));

function getErrorMessage(error: unknown, fallback: string) {
  return error instanceof Error ? error.message : fallback;
}

export default function Login() {
  const navigate = useNavigate();
  const tt = usePageTranslations(aut);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!email.trim()) newErrors.email = tt.emailRequired;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = tt.emailInvalid;
    if (!password) newErrors.password = tt.passwordRequired;
    else if (password.length < 8) newErrors.password = tt.passwordMin;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    if (!validate()) return;

    setLoading(true);
    try {
      await signIn(email, password);
      toast.success(tt.signedIn);
      navigate('/dashboard');
    } catch (err: unknown) {
      const message = getErrorMessage(err, tt.invalidCredentials);
      setErrors({ general: message });
      toast.error(message);
    }
    setLoading(false);
  };

  const handleOAuth = async (provider: 'google' | 'github') => {
    try {
      await signInWithOAuth(provider);
    } catch (err: unknown) {
      toast.error(getErrorMessage(err, `${provider} sign-in is not configured`));
    }
  };

  return (
    <div className="min-h-[100dvh] flex">
      {/* Left - Decorative */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-violet-600 to-indigo-700 items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          {loginBubbles.map((bubble, i) => (
            <div key={i} className="absolute rounded-full bg-white" style={bubble} />
          ))}
        </div>
        <div className="relative z-10 text-white text-center px-12">
          <h2 className="font-heading font-bold text-3xl mb-4">{tt.welcomeBackTitle}</h2>
          <p className="text-violet-100 mb-8">{tt.welcomeBackText}</p>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-left">
            <p className="text-sm text-violet-100 italic">&ldquo;{tt.testimonialQuote}&rdquo;</p>
            <p className="text-xs text-violet-200 mt-3">{tt.testimonialAuthor}</p>
          </div>
        </div>
      </div>

      {/* Right - Form */}
      <div className="flex-1 flex items-center justify-center p-6 bg-white dark:bg-gray-950">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm">
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-0.5 mb-6">
              <span className="font-heading font-bold text-2xl text-gray-900 dark:text-white">verbito</span>
              <span className="font-heading font-bold text-2xl text-violet-600">.ai</span>
            </Link>
            <h1 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-1">{tt.login}</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">{tt.enterCredentials}</p>
          </div>

          {/* Social */}
          <div className="space-y-3 mb-6">
            <button
              type="button"
              onClick={() => handleOAuth('google')}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
              {tt.google}
            </button>
            <button
              type="button"
              onClick={() => handleOAuth('github')}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <Github className="w-4 h-4" /> {tt.github}
            </button>
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200 dark:border-gray-700" /></div>
            <div className="relative flex justify-center text-xs"><span className="bg-white dark:bg-gray-950 px-2 text-gray-500 dark:text-gray-400">{tt.orContinueWith}</span></div>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {errors.general && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/20 rounded-lg text-sm text-red-600 dark:text-red-400">
                {errors.general}
              </motion.div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{tt.email}</label>
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); if (errors.email) setErrors(prev => ({ ...prev, email: undefined })); }}
                placeholder={tt.placeholderEmail}
                className={`w-full px-4 py-2.5 bg-white dark:bg-gray-800 border rounded-lg text-sm focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:text-gray-200 ${
                  errors.email ? 'border-red-300 dark:border-red-700' : 'border-gray-200 dark:border-gray-700'
                }`}
              />
              {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{tt.password}</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); if (errors.password) setErrors(prev => ({ ...prev, password: undefined })); }}
                  placeholder={tt.placeholderPassword}
                  className={`w-full px-4 py-2.5 bg-white dark:bg-gray-800 border rounded-lg text-sm focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:text-gray-200 pr-10 ${
                    errors.password ? 'border-red-300 dark:border-red-700' : 'border-gray-200 dark:border-gray-700'
                  }`}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password}</p>}
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <input type="checkbox" className="rounded border-gray-300" /> {tt.rememberMe}
              </label>
              <Link to="/forgot-password" className="text-sm text-violet-600 hover:underline">{tt.forgotPassword}</Link>
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
                  {tt.signInButton}
                </>
              )}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">{tt.noAccount} <Link to="/signup" className="text-violet-600 font-medium hover:underline">{tt.signup}</Link></p>
        </motion.div>
      </div>
    </div>
  );
}
