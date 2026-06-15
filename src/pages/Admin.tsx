import { motion } from 'framer-motion';
import {
Activity,
ArrowUpDown,CheckCircle,
Clock,
DollarSign,
Download,
Edit,
Eye,Plus,
Search,
Trash2,
TrendingUp,
Users,
XCircle
} from 'lucide-react';
import { useState } from 'react';
import {
Area,
AreaChart,
Bar,
BarChart,
CartesianGrid,
Cell,
Pie,
PieChart,
ResponsiveContainer,
Tooltip,
XAxis,YAxis
} from 'recharts';
import AdminLayout from '../components/admin/AdminLayout';
import SEOHead from '../components/shared/SEOHead';
import {
adminStats,
blogPostsData,
courseProgressData,leadsData,
promptLibraryData,
recentPayments,
recentUsers,
revenueChartData,userGrowthData
} from '../lib/data/admin-data';

function StatCard({ label, value, icon: Icon, change, color }: {
  label: string; value: string; icon: typeof Users; change?: string; color: string;
}) {
  return (
    <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
      <div className="flex items-center justify-between mb-3">
        <div className={`w-10 h-10 ${color} rounded-lg flex items-center justify-center`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        {change && <span className="text-xs text-emerald-400 font-medium">+{change}%</span>}
      </div>
      <p className="text-2xl font-heading font-bold text-white">{value}</p>
      <p className="text-xs text-gray-400">{label}</p>
    </div>
  );
}

const planColors: Record<string, string> = {
  Free: 'bg-gray-500',
  Starter: 'bg-sky-500',
  Pro: 'bg-violet-500',
  Unlimited: 'bg-amber-500',
};

export default function Admin() {
  const [activeTab, setActiveTab] = useState('overview');
  const [userSearch, setUserSearch] = useState('');
  const [userPage, setUserPage] = useState(1);
  const [paymentFilter, setPaymentFilter] = useState('all');
  const [leadFilter, setLeadFilter] = useState('all');
  const [postStatus, setPostStatus] = useState('all');
  const [promptCat, setPromptCat] = useState('all');
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');

  const USERS_PER_PAGE = 5;

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDir('desc');
    }
  };

  const exportCSV = (data: Array<Record<string, unknown>>, filename: string) => {
    const headers = Object.keys(data[0]).join(',');
    const rows = data.map((row) => Object.values(row).join(','));
    const csv = [headers, ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Filtered users
  const filteredUsers = recentUsers.filter(
    (u) => !userSearch || u.name.toLowerCase().includes(userSearch.toLowerCase()) || u.email.toLowerCase().includes(userSearch.toLowerCase())
  );
  const totalUserPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE);
  const paginatedUsers = filteredUsers.slice((userPage - 1) * USERS_PER_PAGE, userPage * USERS_PER_PAGE);

  // Filtered payments
  const filteredPayments = recentPayments.filter(
    (p) => paymentFilter === 'all' || p.status === paymentFilter
  );

  // Filtered leads
  const filteredLeads = leadsData.filter(
    (l) => leadFilter === 'all' || l.status === leadFilter
  );

  // Filtered posts
  const filteredPosts = blogPostsData.filter(
    (p) => postStatus === 'all' || p.status === postStatus
  );

  // Filtered prompts
  const filteredPrompts = promptLibraryData.filter(
    (p) => promptCat === 'all' || p.category === promptCat
  );

  // Revenue stats
  const totalRevenue = recentPayments.filter((p) => p.status === 'completed').reduce((acc, p) => acc + p.amount, 0);

  const fadeIn = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <>
      <SEOHead title="Admin Dashboard — Verbito.ai" />
      <AdminLayout activeTab={activeTab} onTabChange={setActiveTab}>
        {/* ===== OVERVIEW ===== */}
        {activeTab === 'overview' && (
          <motion.div variants={fadeIn} initial="hidden" animate="visible" className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard label="Total Users" value={adminStats.totalUsers.toLocaleString()} icon={Users} change="12" color="bg-violet-600" />
              <StatCard label="MRR" value={`$${adminStats.mrr.toLocaleString()}`} icon={DollarSign} change="8" color="bg-emerald-600" />
              <StatCard label="Prompts Generated" value={adminStats.totalPrompts.toLocaleString()} icon={TrendingUp} change="24" color="bg-sky-600" />
              <StatCard label="Course Enrollments" value={adminStats.courseEnrollments.toLocaleString()} icon={Activity} change="15" color="bg-amber-600" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
                <h3 className="text-sm font-semibold text-gray-300 mb-4">Revenue Trend (6 months)</h3>
                <ResponsiveContainer width="100%" height={220}>
                  <AreaChart data={revenueChartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="month" stroke="#9CA3AF" fontSize={12} />
                    <YAxis stroke="#9CA3AF" fontSize={12} tickFormatter={(v) => `$${v / 1000}k`} />
                    <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px' }} />
                    <Area type="monotone" dataKey="revenue" stroke="#7c3aed" fill="#7c3aed" fillOpacity={0.15} strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
                <h3 className="text-sm font-semibold text-gray-300 mb-4">User Growth by Plan</h3>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={userGrowthData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="month" stroke="#9CA3AF" fontSize={12} />
                    <YAxis stroke="#9CA3AF" fontSize={12} />
                    <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px' }} />
                    <Bar dataKey="pro" fill="#7c3aed" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="starter" fill="#6366f1" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="unlimited" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Plan Distribution */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
                <h3 className="text-sm font-semibold text-gray-300 mb-4">Plan Distribution</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie data={[
                      { name: 'Free', value: adminStats.activeUsers * 0.55 },
                      { name: 'Starter', value: adminStats.activeUsers * 0.18 },
                      { name: 'Pro', value: adminStats.activeUsers * 0.22 },
                      { name: 'Unlimited', value: adminStats.activeUsers * 0.05 },
                    ]} cx="50%" cy="50%" outerRadius={80} dataKey="value" label>
                      {[{ fill: '#6b7280' }, { fill: '#0ea5e9' }, { fill: '#7c3aed' }, { fill: '#f59e0b' }].map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
                <h3 className="text-sm font-semibold text-gray-300 mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  {recentUsers.slice(0, 6).map((u) => (
                    <div key={u.id} className="flex items-center gap-3 text-sm">
                      <div className={`w-2 h-2 rounded-full ${u.status === 'active' ? 'bg-emerald-500' : 'bg-gray-500'}`} />
                      <span className="text-gray-300 flex-1 truncate">{u.name}</span>
                      <span className="text-gray-500 text-xs">{u.lastActive}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ===== USERS ===== */}
        {activeTab === 'users' && (
          <motion.div variants={fadeIn} initial="hidden" animate="visible" className="space-y-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative w-full sm:w-auto">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={userSearch}
                  onChange={(e) => { setUserSearch(e.target.value); setUserPage(1); }}
                  className="w-full sm:w-64 pl-9 pr-4 py-2 bg-gray-900 border border-gray-800 rounded-lg text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
              </div>
              <button onClick={() => exportCSV(filteredUsers, 'users.csv')} className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800 text-gray-300 rounded-lg text-sm hover:bg-gray-700 transition-colors">
                <Download className="w-4 h-4" /> Export CSV
              </button>
            </div>

            <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-800 text-gray-400">
                      <th className="text-left px-4 py-3 font-medium cursor-pointer hover:text-white" onClick={() => handleSort('name')}>
                        <span className="flex items-center gap-1">User <ArrowUpDown className="w-3 h-3" /></span>
                      </th>
                      <th className="text-left px-4 py-3 font-medium">Plan</th>
                      <th className="text-left px-4 py-3 font-medium">Prompts</th>
                      <th className="text-left px-4 py-3 font-medium cursor-pointer hover:text-white" onClick={() => handleSort('joined')}>
                        <span className="flex items-center gap-1">Joined <ArrowUpDown className="w-3 h-3" /></span>
                      </th>
                      <th className="text-left px-4 py-3 font-medium">Status</th>
                      <th className="text-left px-4 py-3 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedUsers.map((u) => (
                      <tr key={u.id} className="border-b border-gray-800/50 hover:bg-gray-800/30">
                        <td className="px-4 py-3">
                          <div>
                            <p className="text-white font-medium">{u.name}</p>
                            <p className="text-gray-500 text-xs">{u.email}</p>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`text-xs font-medium px-2 py-1 rounded-full text-white ${planColors[u.plan] || 'bg-gray-500'}`}>
                            {u.plan}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-gray-300">{u.prompts.toLocaleString()}</td>
                        <td className="px-4 py-3 text-gray-400">{u.joined}</td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex items-center gap-1 text-xs ${u.status === 'active' ? 'text-emerald-400' : 'text-gray-500'}`}>
                            {u.status === 'active' ? <CheckCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                            {u.status}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1">
                            <button className="p-1.5 text-gray-500 hover:text-white hover:bg-gray-800 rounded transition-colors"><Eye className="w-3.5 h-3.5" /></button>
                            <button className="p-1.5 text-gray-500 hover:text-white hover:bg-gray-800 rounded transition-colors"><Edit className="w-3.5 h-3.5" /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {totalUserPages > 1 && (
                <div className="flex items-center justify-between px-4 py-3 border-t border-gray-800 text-sm">
                  <span className="text-gray-500">Page {userPage} of {totalUserPages}</span>
                  <div className="flex items-center gap-2">
                    <button onClick={() => setUserPage(Math.max(1, userPage - 1))} disabled={userPage === 1} className="px-3 py-1 bg-gray-800 text-gray-300 rounded hover:bg-gray-700 disabled:opacity-50">Prev</button>
                    <button onClick={() => setUserPage(Math.min(totalUserPages, userPage + 1))} disabled={userPage === totalUserPages} className="px-3 py-1 bg-gray-800 text-gray-300 rounded hover:bg-gray-700 disabled:opacity-50">Next</button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* ===== PAYMENTS ===== */}
        {activeTab === 'payments' && (
          <motion.div variants={fadeIn} initial="hidden" animate="visible" className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
                <p className="text-2xl font-heading font-bold text-white">${totalRevenue.toLocaleString()}</p>
                <p className="text-xs text-gray-400">Total Revenue</p>
              </div>
              <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
                <p className="text-2xl font-heading font-bold text-white">{recentPayments.filter(p => p.status === 'completed').length}</p>
                <p className="text-xs text-gray-400">Completed Payments</p>
              </div>
              <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
                <p className="text-2xl font-heading font-bold text-white">{recentPayments.filter(p => p.status === 'refunded').length}</p>
                <p className="text-xs text-gray-400">Refunds</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {['all', 'completed', 'refunded', 'pending'].map((f) => (
                <button
                  key={f}
                  onClick={() => setPaymentFilter(f)}
                  className={`px-3 py-1.5 rounded-lg text-sm capitalize transition-colors ${
                    paymentFilter === f ? 'bg-violet-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                  }`}
                >
                  {f}
                </button>
              ))}
              <button onClick={() => exportCSV(filteredPayments, 'payments.csv')} className="ml-auto inline-flex items-center gap-2 px-3 py-1.5 bg-gray-800 text-gray-300 rounded-lg text-sm hover:bg-gray-700">
                <Download className="w-3.5 h-3.5" /> Export
              </button>
            </div>

            <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-800 text-gray-400">
                      <th className="text-left px-4 py-3 font-medium">User</th>
                      <th className="text-left px-4 py-3 font-medium">Plan</th>
                      <th className="text-left px-4 py-3 font-medium">Amount</th>
                      <th className="text-left px-4 py-3 font-medium">Date</th>
                      <th className="text-left px-4 py-3 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPayments.map((p) => (
                      <tr key={p.id} className="border-b border-gray-800/50 hover:bg-gray-800/30">
                        <td className="px-4 py-3">
                          <p className="text-white">{p.user}</p>
                          <p className="text-gray-500 text-xs">{p.email}</p>
                        </td>
                        <td className="px-4 py-3 text-gray-300">{p.plan}</td>
                        <td className="px-4 py-3 text-white font-medium">${p.amount}</td>
                        <td className="px-4 py-3 text-gray-400">{p.date}</td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex items-center gap-1 text-xs ${
                            p.status === 'completed' ? 'text-emerald-400' : p.status === 'refunded' ? 'text-rose-400' : 'text-amber-400'
                          }`}>
                            {p.status === 'completed' ? <CheckCircle className="w-3 h-3" /> : p.status === 'refunded' ? <XCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                            {p.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {/* ===== BLOG POSTS ===== */}
        {activeTab === 'blog' && (
          <motion.div variants={fadeIn} initial="hidden" animate="visible" className="space-y-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                {['all', 'published', 'draft'].map((s) => (
                  <button
                    key={s}
                    onClick={() => setPostStatus(s)}
                    className={`px-3 py-1.5 rounded-lg text-sm capitalize transition-colors ${
                      postStatus === s ? 'bg-violet-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
              <button className="inline-flex items-center gap-2 px-4 py-2 bg-violet-600 text-white rounded-lg text-sm font-medium hover:bg-violet-700">
                <Plus className="w-4 h-4" /> New Post
              </button>
            </div>

            <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-800 text-gray-400">
                      <th className="text-left px-4 py-3 font-medium">Title</th>
                      <th className="text-left px-4 py-3 font-medium">Author</th>
                      <th className="text-left px-4 py-3 font-medium">Category</th>
                      <th className="text-left px-4 py-3 font-medium">Views</th>
                      <th className="text-left px-4 py-3 font-medium">Status</th>
                      <th className="text-left px-4 py-3 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPosts.map((p) => (
                      <tr key={p.id} className="border-b border-gray-800/50 hover:bg-gray-800/30">
                        <td className="px-4 py-3 text-white">{p.title}</td>
                        <td className="px-4 py-3 text-gray-300">{p.author}</td>
                        <td className="px-4 py-3 text-gray-400">{p.category}</td>
                        <td className="px-4 py-3 text-gray-300">{p.views.toLocaleString()}</td>
                        <td className="px-4 py-3">
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            p.status === 'published' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
                          }`}>
                            {p.status}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1">
                            <button className="p-1.5 text-gray-500 hover:text-white hover:bg-gray-800 rounded"><Edit className="w-3.5 h-3.5" /></button>
                            <button className="p-1.5 text-gray-500 hover:text-rose-400 hover:bg-gray-800 rounded"><Trash2 className="w-3.5 h-3.5" /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {/* ===== PROMPT LIBRARY ===== */}
        {activeTab === 'prompts' && (
          <motion.div variants={fadeIn} initial="hidden" animate="visible" className="space-y-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 flex-wrap">
                {['all', ...Array.from(new Set(promptLibraryData.map(p => p.category)))].map((c) => (
                  <button
                    key={c}
                    onClick={() => setPromptCat(c)}
                    className={`px-3 py-1.5 rounded-lg text-sm capitalize transition-colors ${
                      promptCat === c ? 'bg-violet-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
              <button className="inline-flex items-center gap-2 px-4 py-2 bg-violet-600 text-white rounded-lg text-sm font-medium hover:bg-violet-700">
                <Plus className="w-4 h-4" /> Add Template
              </button>
            </div>

            <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-800 text-gray-400">
                      <th className="text-left px-4 py-3 font-medium">Template</th>
                      <th className="text-left px-4 py-3 font-medium">Category</th>
                      <th className="text-left px-4 py-3 font-medium">Uses</th>
                      <th className="text-left px-4 py-3 font-medium">Type</th>
                      <th className="text-left px-4 py-3 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPrompts.map((p) => (
                      <tr key={p.id} className="border-b border-gray-800/50 hover:bg-gray-800/30">
                        <td className="px-4 py-3 text-white">{p.title}</td>
                        <td className="px-4 py-3 text-gray-400">{p.category}</td>
                        <td className="px-4 py-3 text-gray-300">{p.uses.toLocaleString()}</td>
                        <td className="px-4 py-3">
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            p.type === 'premium' ? 'bg-amber-500/20 text-amber-400' : 'bg-emerald-500/20 text-emerald-400'
                          }`}>
                            {p.type}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1">
                            <button className="p-1.5 text-gray-500 hover:text-white hover:bg-gray-800 rounded"><Edit className="w-3.5 h-3.5" /></button>
                            <button className="p-1.5 text-gray-500 hover:text-rose-400 hover:bg-gray-800 rounded"><Trash2 className="w-3.5 h-3.5" /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {/* ===== COURSE ===== */}
        {activeTab === 'course' && (
          <motion.div variants={fadeIn} initial="hidden" animate="visible" className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
                <p className="text-2xl font-heading font-bold text-white">{adminStats.courseEnrollments.toLocaleString()}</p>
                <p className="text-xs text-gray-400">Total Enrollments</p>
              </div>
              <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
                <p className="text-2xl font-heading font-bold text-white">
                  {Math.round(courseProgressData.reduce((acc, m) => acc + m.avgScore, 0) / courseProgressData.length)}%
                </p>
                <p className="text-xs text-gray-400">Avg. Completion Score</p>
              </div>
              <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
                <p className="text-2xl font-heading font-bold text-white">42%</p>
                <p className="text-xs text-gray-400">Completion Rate</p>
              </div>
            </div>

            <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
              <h3 className="text-sm font-semibold text-gray-300 mb-4">Module Completion</h3>
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={courseProgressData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis type="number" stroke="#9CA3AF" fontSize={12} />
                  <YAxis dataKey="module" type="category" stroke="#9CA3AF" fontSize={11} width={70} />
                  <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px' }} />
                  <Bar dataKey="completed" fill="#7c3aed" radius={[0, 4, 4, 0]} name="Completed" />
                  <Bar dataKey="avgScore" fill="#10b981" radius={[0, 4, 4, 0]} name="Avg Score" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-800">
                <h3 className="text-sm font-semibold text-gray-300">Recent Students</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-800 text-gray-400">
                      <th className="text-left px-4 py-3 font-medium">Student</th>
                      <th className="text-left px-4 py-3 font-medium">Progress</th>
                      <th className="text-left px-4 py-3 font-medium">Enrolled</th>
                      <th className="text-left px-4 py-3 font-medium">Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentUsers.slice(0, 6).map((u, i) => (
                      <tr key={u.id} className="border-b border-gray-800/50 hover:bg-gray-800/30">
                        <td className="px-4 py-3 text-white">{u.name}</td>
                        <td className="px-4 py-3">
                          <div className="w-24 h-2 bg-gray-800 rounded-full overflow-hidden">
                            <div className="h-full bg-violet-500 rounded-full" style={{ width: `${Math.min(100, (i + 1) * 15)}%` }} />
                          </div>
                        </td>
                        <td className="px-4 py-3 text-gray-400">{u.joined}</td>
                        <td className="px-4 py-3 text-emerald-400">{85 + i * 2}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {/* ===== LEADS ===== */}
        {activeTab === 'leads' && (
          <motion.div variants={fadeIn} initial="hidden" animate="visible" className="space-y-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                {['all', 'new', 'contacted', 'qualified', 'negotiation'].map((f) => (
                  <button
                    key={f}
                    onClick={() => setLeadFilter(f)}
                    className={`px-3 py-1.5 rounded-lg text-sm capitalize transition-colors ${
                      leadFilter === f ? 'bg-violet-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
              <button onClick={() => exportCSV(filteredLeads, 'leads.csv')} className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800 text-gray-300 rounded-lg text-sm hover:bg-gray-700">
                <Download className="w-4 h-4" /> Export CSV
              </button>
            </div>

            <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-800 text-gray-400">
                      <th className="text-left px-4 py-3 font-medium">Company</th>
                      <th className="text-left px-4 py-3 font-medium">Contact</th>
                      <th className="text-left px-4 py-3 font-medium">Source</th>
                      <th className="text-left px-4 py-3 font-medium">Value</th>
                      <th className="text-left px-4 py-3 font-medium">Status</th>
                      <th className="text-left px-4 py-3 font-medium">Last Contact</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredLeads.map((l) => (
                      <tr key={l.id} className="border-b border-gray-800/50 hover:bg-gray-800/30">
                        <td className="px-4 py-3 text-white">{l.name}</td>
                        <td className="px-4 py-3 text-gray-400">{l.contact}</td>
                        <td className="px-4 py-3 text-gray-400">{l.source}</td>
                        <td className="px-4 py-3 text-white font-medium">${l.value.toLocaleString()}</td>
                        <td className="px-4 py-3">
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            l.status === 'new' ? 'bg-sky-500/20 text-sky-400' :
                            l.status === 'contacted' ? 'bg-violet-500/20 text-violet-400' :
                            l.status === 'qualified' ? 'bg-emerald-500/20 text-emerald-400' :
                            'bg-amber-500/20 text-amber-400'
                          }`}>
                            {l.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-gray-400">{l.lastContact}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {/* ===== SETTINGS ===== */}
        {activeTab === 'settings' && (
          <motion.div variants={fadeIn} initial="hidden" animate="visible" className="space-y-6 max-w-2xl">
            <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
              <h3 className="text-sm font-semibold text-gray-300 mb-4">General Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1.5">Site Name</label>
                  <input type="text" defaultValue="Quantara LLC" className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-violet-500" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1.5">Support Email</label>
                  <input type="email" defaultValue="verbito.ai@wearequantara.com" className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-violet-500" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1.5">Default Plan</label>
                  <select className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-violet-500">
                    <option>Free</option>
                    <option>Starter</option>
                    <option>Pro</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
              <h3 className="text-sm font-semibold text-gray-300 mb-4">Pricing Settings</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1.5">Starter Price ($)</label>
                    <input type="number" defaultValue={12} className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-violet-500" />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1.5">Pro Price ($)</label>
                    <input type="number" defaultValue={29} className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-violet-500" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1.5">Unlimited Price ($)</label>
                    <input type="number" defaultValue={79} className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-violet-500" />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1.5">Course Price ($)</label>
                    <input type="number" defaultValue={197} className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-violet-500" />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
              <h3 className="text-sm font-semibold text-gray-300 mb-4">API & Integrations</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1.5">OpenAI API Key</label>
                  <input type="password" defaultValue="sk-••••••••••••••••" className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-violet-500" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1.5">Stripe Secret Key</label>
                  <input type="password" defaultValue="sk_••••••••••••" className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-violet-500" />
                </div>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-sm text-gray-400">Maintenance Mode</span>
                  <button className="w-11 h-6 bg-gray-700 rounded-full relative transition-colors">
                    <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform" />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="px-6 py-2.5 bg-violet-600 text-white rounded-lg text-sm font-medium hover:bg-violet-700 transition-colors">
                Save Changes
              </button>
              <button className="px-6 py-2.5 bg-gray-800 text-gray-300 rounded-lg text-sm hover:bg-gray-700 transition-colors">
                Reset
              </button>
            </div>
          </motion.div>
        )}
      </AdminLayout>
    </>
  );
}
