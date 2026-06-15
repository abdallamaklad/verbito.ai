export const adminStats = {
  totalUsers: 12453,
  activeUsers: 8321,
  totalRevenue: 284750,
  mrr: 45230,
  totalPrompts: 124078,
  promptsToday: 1847,
  courseEnrollments: 3241,
  conversionRate: 3.2,
  avgSessionDuration: '4m 32s',
  bounceRate: 34.5,
};

export const revenueChartData = [
  { month: 'Aug', revenue: 28000, users: 1800 },
  { month: 'Sep', revenue: 32000, users: 2100 },
  { month: 'Oct', revenue: 35000, users: 2400 },
  { month: 'Nov', revenue: 38000, users: 2700 },
  { month: 'Dec', revenue: 42000, users: 3100 },
  { month: 'Jan', revenue: 45230, users: 3321 },
];

export const userGrowthData = [
  { month: 'Aug', free: 5200, starter: 800, pro: 1200, unlimited: 300 },
  { month: 'Sep', free: 5800, starter: 950, pro: 1400, unlimited: 350 },
  { month: 'Oct', free: 6400, starter: 1100, pro: 1600, unlimited: 400 },
  { month: 'Nov', free: 7100, starter: 1250, pro: 1800, unlimited: 450 },
  { month: 'Dec', free: 7800, starter: 1400, pro: 2100, unlimited: 520 },
  { month: 'Jan', free: 8500, starter: 1600, pro: 2400, unlimited: 610 },
];

export const recentUsers = [
  { id: 1, name: 'Sarah Chen', email: 'sarah@example.com', plan: 'Pro', prompts: 342, joined: '2026-01-15', lastActive: '2 min ago', status: 'active' },
  { id: 2, name: 'Marcus Johnson', email: 'marcus@example.com', plan: 'Starter', prompts: 89, joined: '2026-01-14', lastActive: '5 min ago', status: 'active' },
  { id: 3, name: 'Aisha Patel', email: 'aisha@example.com', plan: 'Free', prompts: 12, joined: '2026-01-14', lastActive: '1 hour ago', status: 'active' },
  { id: 4, name: 'James Wilson', email: 'james@example.com', plan: 'Unlimited', prompts: 567, joined: '2026-01-13', lastActive: '12 min ago', status: 'active' },
  { id: 5, name: 'Elena Rodriguez', email: 'elena@example.com', plan: 'Pro', prompts: 278, joined: '2026-01-12', lastActive: '3 hours ago', status: 'active' },
  { id: 6, name: 'David Kim', email: 'david@example.com', plan: 'Free', prompts: 5, joined: '2026-01-11', lastActive: '1 day ago', status: 'inactive' },
  { id: 7, name: 'Olivia Brown', email: 'olivia@example.com', plan: 'Starter', prompts: 156, joined: '2026-01-10', lastActive: '45 min ago', status: 'active' },
  { id: 8, name: 'Liam Garcia', email: 'liam@example.com', plan: 'Pro', prompts: 423, joined: '2026-01-09', lastActive: '2 hours ago', status: 'active' },
];

export const recentPayments = [
  { id: 1, user: 'Sarah Chen', email: 'sarah@example.com', amount: 29, plan: 'Pro Monthly', date: '2026-01-15', status: 'completed' },
  { id: 2, user: 'Marcus Johnson', email: 'marcus@example.com', amount: 115, plan: 'Starter Annual', date: '2026-01-15', status: 'completed' },
  { id: 3, user: 'James Wilson', email: 'james@example.com', amount: 79, plan: 'Unlimited Monthly', date: '2026-01-14', status: 'completed' },
  { id: 4, user: 'Elena Rodriguez', email: 'elena@example.com', amount: 278, plan: 'Pro Annual', date: '2026-01-14', status: 'completed' },
  { id: 5, user: 'Olivia Brown', email: 'olivia@example.com', amount: 12, plan: 'Starter Monthly', date: '2026-01-13', status: 'completed' },
  { id: 6, user: 'David Kim', email: 'david@example.com', amount: 29, plan: 'Pro Monthly', date: '2026-01-12', status: 'refunded' },
  { id: 7, user: 'Liam Garcia', email: 'liam@example.com', amount: 758, plan: 'Unlimited Annual', date: '2026-01-11', status: 'completed' },
  { id: 8, user: 'Sophia Martinez', email: 'sophia@example.com', amount: 115, plan: 'Starter Annual', date: '2026-01-10', status: 'completed' },
];

export const courseProgressData = [
  { module: 'Module 1', completed: 3241, avgScore: 94 },
  { module: 'Module 2', completed: 2890, avgScore: 91 },
  { module: 'Module 3', completed: 2543, avgScore: 88 },
  { module: 'Module 4', completed: 2100, avgScore: 85 },
  { module: 'Module 5', completed: 1876, avgScore: 87 },
  { module: 'Module 6', completed: 1654, avgScore: 82 },
  { module: 'Module 7', completed: 1432, avgScore: 84 },
  { module: 'Module 8', completed: 1201, avgScore: 80 },
  { module: 'Module 9', completed: 987, avgScore: 78 },
  { module: 'Module 10', completed: 756, avgScore: 92 },
];

export const leadsData = [
  { id: 1, name: 'TechStart Inc', contact: 'john@techstart.com', source: 'Free Tool', status: 'new', value: 348, lastContact: '2026-01-15' },
  { id: 2, name: 'GrowthLabs', contact: 'sarah@growthlabs.com', source: 'Course', status: 'contacted', value: 197, lastContact: '2026-01-14' },
  { id: 3, name: 'NexGen Marketing', contact: 'mike@nexgen.com', source: 'Pricing Page', status: 'qualified', value: 758, lastContact: '2026-01-13' },
  { id: 4, name: 'DevStudio Pro', contact: 'alex@devstudio.com', source: 'Blog', status: 'new', value: 348, lastContact: '2026-01-15' },
  { id: 5, name: 'EduVision', contact: 'lisa@eduvision.com', source: 'Free Tool', status: 'contacted', value: 197, lastContact: '2026-01-12' },
  { id: 6, name: 'CloudScale AI', contact: 'tom@cloudscale.com', source: 'Enterprise', status: 'negotiation', value: 2400, lastContact: '2026-01-10' },
  { id: 7, name: 'PixelCraft', contact: 'emma@pixelcraft.com', source: 'Course', status: 'qualified', value: 197, lastContact: '2026-01-11' },
  { id: 8, name: 'DataDrive', contact: 'chris@datadrive.com', source: 'Pricing Page', status: 'new', value: 758, lastContact: '2026-01-15' },
];

export const blogPostsData = [
  { id: 1, title: 'What Is Prompt Engineering?', author: 'Alex Morgan', category: 'Fundamentals', views: 12400, published: '2026-01-15', status: 'published' },
  { id: 2, title: 'ChatGPT vs Claude vs Gemini', author: 'Sam Taylor', category: 'AI Tools', views: 8900, published: '2026-01-10', status: 'published' },
  { id: 3, title: '10 Prompt Engineering Techniques', author: 'Jordan Lee', category: 'Advanced', views: 15200, published: '2026-01-05', status: 'published' },
  { id: 4, title: 'AI Prompts for Marketing', author: 'Casey Reed', category: 'Marketing', views: 6700, published: '2025-12-28', status: 'published' },
  { id: 5, title: 'Midjourney Master Guide', author: 'Riley Park', category: 'Midjourney', views: 22100, published: '2025-12-15', status: 'published' },
  { id: 6, title: 'The Future of AI Prompts', author: 'Alex Morgan', category: 'Fundamentals', views: 4500, published: '2025-12-10', status: 'draft' },
  { id: 7, title: 'Prompt Chaining Workflows', author: 'Jordan Lee', category: 'Advanced', views: 3200, published: '2025-12-05', status: 'published' },
  { id: 8, title: 'AI for Data Analysis', author: 'Casey Reed', category: 'Data Analysis', views: 7800, published: '2025-11-28', status: 'published' },
  { id: 9, title: 'Building AI Teams', author: 'Sam Taylor', category: 'Business', views: 5400, published: '2025-11-20', status: 'draft' },
  { id: 10, title: 'Ethics in AI Prompting', author: 'Alex Morgan', category: 'Fundamentals', views: 6100, published: '2025-11-15', status: 'published' },
];

export const promptLibraryData = [
  { id: 1, title: 'Business Plan Generator', category: 'Business', uses: 4520, type: 'premium' },
  { id: 2, title: 'High-Converting Ad Copy', category: 'Marketing', uses: 3890, type: 'premium' },
  { id: 3, title: 'Sales Outreach Sequence', category: 'Sales', uses: 3210, type: 'premium' },
  { id: 4, title: 'Blog Post Writer', category: 'Content Creation', uses: 6780, type: 'free' },
  { id: 5, title: 'Social Media Calendar', category: 'Social Media', uses: 2890, type: 'premium' },
  { id: 6, title: 'SEO Content Optimizer', category: 'SEO', uses: 4120, type: 'free' },
  { id: 7, title: 'Email Subject Lines', category: 'Email Writing', uses: 3560, type: 'free' },
  { id: 8, title: 'Code Review Assistant', category: 'Coding', uses: 2340, type: 'free' },
  { id: 9, title: 'Data Analyst Prompt', category: 'Data Analysis', uses: 1890, type: 'premium' },
  { id: 10, title: 'Lesson Plan Generator', category: 'Education', uses: 1450, type: 'free' },
  { id: 11, title: 'Research Summarizer', category: 'Research', uses: 2670, type: 'free' },
  { id: 12, title: 'Task Automation Builder', category: 'Automation', uses: 1980, type: 'premium' },
  { id: 13, title: 'Meeting Minutes Formatter', category: 'Productivity', uses: 3120, type: 'free' },
  { id: 14, title: 'ChatGPT System Prompt', category: 'ChatGPT Prompts', uses: 5430, type: 'free' },
  { id: 15, title: 'Midjourney Art Prompt', category: 'Midjourney', uses: 4210, type: 'premium' },
];
