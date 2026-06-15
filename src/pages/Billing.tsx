import { motion } from 'framer-motion';
import {
AlertTriangle,
ArrowUpRight,
CheckCircle,
Clock,
CreditCard,
Crown,
Download,
FolderOpen,
Shield,
Zap
} from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/shared/SEOHead';
import { createPortalSession } from '../services/stripe';

interface Invoice {
  id: string;
  date: string;
  description: string;
  amount: number;
  status: 'paid' | 'pending' | 'failed';
  pdf: string;
}

const mockInvoices: Invoice[] = [
  { id: 'INV-2026-0015', date: 'Jan 15, 2026', description: 'Pro Plan — Monthly', amount: 29.00, status: 'paid', pdf: '#' },
  { id: 'INV-2026-0014', date: 'Dec 15, 2025', description: 'Pro Plan — Monthly', amount: 29.00, status: 'paid', pdf: '#' },
  { id: 'INV-2026-0013', date: 'Nov 15, 2025', description: 'Pro Plan — Monthly', amount: 29.00, status: 'paid', pdf: '#' },
  { id: 'INV-2026-0012', date: 'Oct 15, 2025', description: 'Starter Plan — Monthly', amount: 12.00, status: 'paid', pdf: '#' },
  { id: 'INV-2026-0011', date: 'Sep 15, 2025', description: 'Starter Plan — Monthly', amount: 12.00, status: 'paid', pdf: '#' },
  { id: 'INV-2026-0010', date: 'Aug 15, 2025', description: 'Course — Master Prompt Engineering', amount: 197.00, status: 'paid', pdf: '#' },
];

const statusIcons = {
  paid: <CheckCircle className="w-4 h-4 text-emerald-500" />,
  pending: <Clock className="w-4 h-4 text-amber-500" />,
  failed: <AlertTriangle className="w-4 h-4 text-rose-500" />,
};

const statusClasses = {
  paid: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
  pending: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
  failed: 'bg-rose-500/10 text-rose-600 dark:text-rose-400',
};

export default function Billing() {
  const [plan] = useState<'Pro' | 'Starter' | 'Free'>('Pro');
  const [usagePercent] = useState(72);
  const [invoices] = useState<Invoice[]>(mockInvoices);
  const [portalLoading, setPortalLoading] = useState(false);
  const [portalError, setPortalError] = useState<string | null>(null);

  const planDetails = {
    Pro: { name: 'Pro', price: '$29/mo', prompts: 500, promptsUsed: 360, color: 'bg-violet-600', icon: Crown },
    Starter: { name: 'Starter', price: '$12/mo', prompts: 100, promptsUsed: 85, color: 'bg-sky-600', icon: Zap },
    Free: { name: 'Free', price: '$0', prompts: 20, promptsUsed: 18, color: 'bg-gray-600', icon: FolderOpen },
  };

  const current = planDetails[plan];

  const openStripePortal = async () => {
    setPortalLoading(true);
    setPortalError(null);
    try {
      const { url } = await createPortalSession();
      window.location.assign(url);
    } catch (error) {
      setPortalError(error instanceof Error ? error.message : 'Unable to open billing portal.');
    } finally {
      setPortalLoading(false);
    }
  };

  return (
    <>
      <SEOHead title="Billing — Verbito.ai" />
      <section className="pt-28 pb-16 bg-gray-50 dark:bg-gray-950">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
            <h1 className="font-heading font-bold text-3xl text-gray-900 dark:text-white mb-2">Billing</h1>
            <p className="text-gray-600 dark:text-gray-400">Manage your subscription, usage, and payment history.</p>
          </motion.div>
          {portalError && (
            <div className="mb-6 rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700 dark:border-rose-900/60 dark:bg-rose-950/30 dark:text-rose-300">
              {portalError}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
            {/* Current Plan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 ${current.color} rounded-lg flex items-center justify-center`}>
                    <current.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-gray-900 dark:text-white">{current.name} Plan</h2>
                    <p className="text-sm text-gray-500">{current.price} • Renews Feb 15, 2026</p>
                  </div>
                </div>
                <span className="text-xs bg-emerald-100 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 px-3 py-1 rounded-full font-medium">
                  Active
                </span>
              </div>

              {/* Usage */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Monthly Prompt Usage</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {current.promptsUsed} / {current.prompts}
                  </span>
                </div>
                <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full ${current.color} rounded-full`}
                    initial={{ width: 0 }}
                    animate={{ width: `${usagePercent}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1.5">
                  {usagePercent >= 90 ? (
                    <span className="text-amber-600 dark:text-amber-400 flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" />
                      Approaching your monthly limit. Consider upgrading.
                    </span>
                  ) : (
                    `${current.prompts - current.promptsUsed} prompts remaining this month`
                  )}
                </p>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={openStripePortal}
                  disabled={portalLoading}
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-violet-600 text-white rounded-lg text-sm font-medium hover:bg-violet-700 transition-colors"
                >
                  <CreditCard className="w-4 h-4" />
                  {portalLoading ? 'Opening...' : 'Manage Subscription'}
                </button>
                <Link
                  to="/pricing"
                  className="inline-flex items-center gap-2 px-4 py-2.5 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <ArrowUpRight className="w-4 h-4" />
                  Upgrade
                </Link>
              </div>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-4"
            >
              <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="w-5 h-5 text-violet-600" />
                  <h3 className="font-semibold text-gray-900 dark:text-white">Payment Method</h3>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-6 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center">
                    <span className="text-xs font-bold text-gray-600 dark:text-gray-400">VISA</span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-900 dark:text-white">•••• 4242</p>
                    <p className="text-xs text-gray-500">Expires 12/27</p>
                  </div>
                </div>
                <button
                  onClick={openStripePortal}
                  disabled={portalLoading}
                  className="mt-3 text-sm text-violet-600 hover:text-violet-700 font-medium"
                >
                  {portalLoading ? 'Opening...' : 'Update card →'}
                </button>
              </div>

              <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Need Help?</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  Questions about your billing or subscription?
                </p>
                <Link
                  to="/contact"
                  className="text-sm text-violet-600 hover:text-violet-700 font-medium"
                >
                  Contact Support →
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Invoice History */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-heading font-bold text-xl text-gray-900 dark:text-white">Invoice History</h2>
              <button
                onClick={openStripePortal}
                disabled={portalLoading}
                className="text-sm text-violet-600 hover:text-violet-700 font-medium"
              >
                {portalLoading ? 'Opening...' : 'View all in Stripe →'}
              </button>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-800 text-gray-500">
                      <th className="text-left px-6 py-3 font-medium">Invoice</th>
                      <th className="text-left px-6 py-3 font-medium">Date</th>
                      <th className="text-left px-6 py-3 font-medium">Description</th>
                      <th className="text-left px-6 py-3 font-medium">Amount</th>
                      <th className="text-left px-6 py-3 font-medium">Status</th>
                      <th className="text-left px-6 py-3 font-medium">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoices.map((inv) => (
                      <tr key={inv.id} className="border-b border-gray-200/50 dark:border-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-800/30">
                        <td className="px-6 py-4 font-mono text-xs text-gray-900 dark:text-white">{inv.id}</td>
                        <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{inv.date}</td>
                        <td className="px-6 py-4 text-gray-900 dark:text-white">{inv.description}</td>
                        <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">${inv.amount.toFixed(2)}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${statusClasses[inv.status]}`}>
                            {statusIcons[inv.status]}
                            {inv.status.charAt(0).toUpperCase() + inv.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button className="inline-flex items-center gap-1 text-xs text-violet-600 hover:text-violet-700 font-medium">
                            <Download className="w-3.5 h-3.5" />
                            PDF
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
