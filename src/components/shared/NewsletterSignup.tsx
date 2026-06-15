import { Check,Send } from 'lucide-react';
import { useState } from 'react';

interface NewsletterSignupProps {
  variant?: 'inline' | 'footer';
}

export default function NewsletterSignup({ variant = 'inline' }: NewsletterSignupProps) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.includes('@')) {
      setSubmitted(true);
      setEmail('');
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  if (variant === 'footer') {
    return (
      <form onSubmit={handleSubmit} className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 sm:w-56"
        />
        <button
          type="submit"
          className="w-full px-4 py-2.5 bg-violet-600 text-white rounded-lg text-sm font-medium hover:bg-violet-700 transition-colors flex items-center justify-center gap-2 shrink-0 sm:w-auto"
        >
          {submitted ? <Check className="w-4 h-4" /> : <Send className="w-4 h-4" />}
          {submitted ? 'Subscribed!' : 'Subscribe'}
        </button>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email address"
        className="flex-1 w-full px-5 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:text-gray-200 dark:placeholder-gray-500"
      />
      <button
        type="submit"
        className="w-full sm:w-auto px-6 py-3 bg-violet-600 text-white rounded-xl text-sm font-semibold hover:bg-violet-700 transition-colors flex items-center justify-center gap-2 shrink-0 shadow-lg shadow-violet-600/20"
      >
        {submitted ? <Check className="w-4 h-4" /> : <Send className="w-4 h-4" />}
        {submitted ? 'Subscribed!' : 'Subscribe'}
      </button>
    </form>
  );
}
