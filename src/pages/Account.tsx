import { motion } from 'framer-motion';
import { CreditCard,Receipt,Settings,User } from 'lucide-react';
import { useState } from 'react';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import SEOHead from '../components/shared/SEOHead';

const tabs = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'subscription', label: 'Subscription', icon: CreditCard },
  { id: 'billing', label: 'Billing', icon: Receipt },
  { id: 'preferences', label: 'Preferences', icon: Settings },
];

export default function Account() {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <>
      <SEOHead title="Account — Verbito.ai" />
      <DashboardLayout>
        <h1 className="font-heading font-bold text-2xl text-gray-900 dark:text-white mb-6">Account Settings</h1>

        {/* Tabs */}
        <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 rounded-xl p-1 mb-8 overflow-x-auto">
          {tabs.map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${activeTab === tab.id ? 'bg-white dark:bg-gray-700 text-violet-600 dark:text-violet-400 shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}>
              <tab.icon className="w-4 h-4" />{tab.label}
            </button>
          ))}
        </div>

        <motion.div key={activeTab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
          {activeTab === 'profile' && (
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-800 p-6 max-w-lg">
              <h2 className="font-heading font-semibold text-lg text-gray-900 dark:text-white mb-4">Profile Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                  <input defaultValue="John Doe" className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm dark:text-gray-200 focus:outline-none focus:border-violet-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                  <input defaultValue="john@example.com" className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm dark:text-gray-200 focus:outline-none focus:border-violet-500" />
                </div>
                <button className="px-5 py-2.5 bg-violet-600 text-white rounded-lg text-sm font-semibold hover:bg-violet-700 transition-colors">Save Changes</button>
              </div>
            </div>
          )}

          {activeTab === 'subscription' && (
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-800 p-6 max-w-lg">
              <h2 className="font-heading font-semibold text-lg text-gray-900 dark:text-white mb-4">Current Plan</h2>
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg mb-4">
                <p className="font-medium text-gray-900 dark:text-white">Free Plan</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">2 prompts/day · Basic features</p>
              </div>
              <button className="px-5 py-2.5 bg-violet-600 text-white rounded-lg text-sm font-semibold hover:bg-violet-700 transition-colors">Upgrade Plan</button>
            </div>
          )}

          {activeTab === 'billing' && (
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-800 p-6 max-w-lg">
              <h2 className="font-heading font-semibold text-lg text-gray-900 dark:text-white mb-4">Billing History</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">No billing history available.</p>
            </div>
          )}

          {activeTab === 'preferences' && (
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-800 p-6 max-w-lg">
              <h2 className="font-heading font-semibold text-lg text-gray-900 dark:text-white mb-4">Preferences</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700 dark:text-gray-300">Email notifications</span>
                  <button className="w-11 h-6 bg-violet-600 rounded-full relative"><div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1" /></button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700 dark:text-gray-300">Marketing emails</span>
                  <button className="w-11 h-6 bg-gray-200 dark:bg-gray-700 rounded-full relative"><div className="w-4 h-4 bg-white rounded-full absolute top-1 left-1" /></button>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </DashboardLayout>
    </>
  );
}
