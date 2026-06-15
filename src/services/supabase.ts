/* ================================================================ */
/*  SUPABASE SERVICE — Production-ready client with fallbacks       */
/*  Swap mock data for real Supabase calls when backend is live     */
/* ================================================================ */

import type { BlogPost,CoursePurchase,DailyUsage,Lead,PromptCollection,PromptGenerationHistoryItem,PromptTemplate,SavedPrompt,Subscription,UserProfile } from '@/types';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

function canUseLocalMocks() {
  return import.meta.env.DEV;
}

function requireSupabaseClient() {
  if (!supabase) {
    throw new Error('Supabase is not configured. Production data services are unavailable.');
  }
  return supabase;
}

/* ---------- AUTH ---------- */

export async function signUp(email: string, password: string, fullName: string) {
  if (!supabase && canUseLocalMocks()) return mockSignUp(email, fullName);
  const client = requireSupabaseClient();
  const { data, error } = await client.auth.signUp({ email, password, options: { data: { full_name: fullName } } });
  if (error) throw error;
  return data;
}

export async function signIn(email: string, password: string) {
  if (!supabase && canUseLocalMocks()) return mockSignIn(email);
  const client = requireSupabaseClient();
  const { data, error } = await client.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
}

export async function signInWithOAuth(provider: 'google' | 'github') {
  if (!supabase) throw new Error('Supabase not configured');
  const { data, error } = await supabase.auth.signInWithOAuth({ provider });
  if (error) throw error;
  return data;
}

export async function signOut() {
  if (!supabase && canUseLocalMocks()) { localStorage.removeItem('verbito_user'); return; }
  const client = requireSupabaseClient();
  await client.auth.signOut();
  localStorage.removeItem('verbito_user');
}

export async function getCurrentUser() {
  if (!supabase && canUseLocalMocks()) {
    const stored = localStorage.getItem('verbito_user');
    return stored ? JSON.parse(stored) as UserProfile : null;
  }
  const client = requireSupabaseClient();
  const { data: { user } } = await client.auth.getUser();
  if (!user) return null;
  const { data: profile } = await client.from('profiles').select('*').eq('id', user.id).maybeSingle();
  if (profile) return profile as UserProfile;

  const fallbackProfile: UserProfile = {
    id: user.id,
    email: user.email || '',
    full_name: (user.user_metadata?.full_name as string | undefined) || user.email?.split('@')[0] || 'User',
    avatar_url: user.user_metadata?.avatar_url as string | undefined,
    plan_type: 'free',
    role: 'user',
    created_at: user.created_at,
    updated_at: new Date().toISOString(),
  };

  await client.from('profiles').upsert(fallbackProfile, { onConflict: 'id' });
  return fallbackProfile;
}

export async function resetPassword(email: string) {
  if (!supabase && canUseLocalMocks()) return { message: 'Check your email for reset instructions (mock).' };
  const client = requireSupabaseClient();
  const { error } = await client.auth.resetPasswordForEmail(email);
  if (error) throw error;
  return { message: 'Check your email for reset instructions.' };
}

export async function updateProfile(userId: string, updates: Partial<UserProfile>) {
  if (!supabase && canUseLocalMocks()) {
    const stored = JSON.parse(localStorage.getItem('verbito_user') || '{}');
    const updated = { ...stored, ...updates };
    localStorage.setItem('verbito_user', JSON.stringify(updated));
    return updated;
  }
  const client = requireSupabaseClient();
  const { data, error } = await client.from('profiles').update(updates).eq('id', userId).select().single();
  if (error) throw error;
  return data;
}

/* ---------- USAGE ---------- */

export async function getDailyUsage(userId?: string, anonymousId?: string): Promise<DailyUsage> {
  const today = new Date().toISOString().split('T')[0];
  if (supabase) {
    let query = supabase.from('prompt_usage_daily').select('*').eq('usage_date', today);
    query = userId ? query.eq('user_id', userId) : query.eq('anonymous_id', anonymousId);
    const { data, error } = await query.maybeSingle();
    if (error) throw error;
    return {
      userId,
      anonymousId,
      date: today,
      generationsUsed: data?.generations_used || 0,
      dailyLimit: 2,
    };
  }
  if (!canUseLocalMocks()) requireSupabaseClient();
  const key = userId ? `usage:${userId}:${today}` : `usage:anon:${anonymousId}:${today}`;
  const stored = localStorage.getItem(key);
  if (stored) return JSON.parse(stored);
  return { userId, anonymousId, date: today, generationsUsed: 0, dailyLimit: 2 };
}

export async function incrementUsage(userId?: string, anonymousId?: string): Promise<DailyUsage> {
  const usage = await getDailyUsage(userId, anonymousId);
  usage.generationsUsed += 1;
  if (supabase) return usage;
  const key = userId ? `usage:${userId}:${usage.date}` : `usage:anon:${anonymousId}:${usage.date}`;
  localStorage.setItem(key, JSON.stringify(usage));
  return usage;
}

export async function getSubscription(userId: string): Promise<Subscription | null> {
  if (!supabase && canUseLocalMocks()) {
    const stored = localStorage.getItem(`sub:${userId}`);
    return stored ? JSON.parse(stored) : null;
  }
  const client = requireSupabaseClient();
  const { data } = await client.from('subscriptions').select('*').eq('user_id', userId).single();
  return data;
}

/* ---------- SAVED PROMPTS ---------- */

export async function getSavedPrompts(userId: string): Promise<SavedPrompt[]> {
  if (!supabase && canUseLocalMocks()) return getMockSavedPrompts();
  const client = requireSupabaseClient();
  const { data, error } = await client.from('saved_prompts').select('*').eq('user_id', userId).order('created_at', { ascending: false });
  if (error) throw error;
  return data || [];
}

export async function getPromptGenerations(userId: string, limit = 10): Promise<PromptGenerationHistoryItem[]> {
  if (!supabase && canUseLocalMocks()) return [];
  const client = requireSupabaseClient();
  const { data, error } = await client
    .from('prompt_generations')
    .select('id,user_id,anonymous_id,category,goal,target_model,output_type,generated_prompt,prompt_score,created_at')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(limit);
  if (error) throw error;
  return data || [];
}

export async function getPromptCollections(userId: string): Promise<PromptCollection[]> {
  if (!supabase && canUseLocalMocks()) return [];
  const client = requireSupabaseClient();
  const { data, error } = await client
    .from('prompt_collections')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data || [];
}

export async function createPromptCollection(userId: string, collection: Pick<PromptCollection, 'name' | 'description'>): Promise<PromptCollection> {
  if (!supabase && canUseLocalMocks()) {
    return {
      id: crypto.randomUUID(),
      user_id: userId,
      name: collection.name,
      description: collection.description,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
  }
  const client = requireSupabaseClient();
  const { data, error } = await client
    .from('prompt_collections')
    .insert({ ...collection, user_id: userId })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function savePrompt(userId: string, prompt: Omit<SavedPrompt, 'id' | 'user_id' | 'created_at' | 'updated_at'>): Promise<SavedPrompt> {
  if (!supabase && canUseLocalMocks()) return mockSavePrompt(userId, prompt);
  const client = requireSupabaseClient();
  const { data, error } = await client.from('saved_prompts').insert({ ...prompt, user_id: userId }).select().single();
  if (error) throw error;
  return data;
}

export async function deleteSavedPrompt(userId: string, promptId: string) {
  if (!supabase && canUseLocalMocks()) return;
  const client = requireSupabaseClient();
  const { error } = await client.from('saved_prompts').delete().eq('id', promptId).eq('user_id', userId);
  if (error) throw error;
}

/* ---------- LEADS ---------- */

export async function captureLead(email: string, source: string, leadMagnet?: string): Promise<Lead> {
  if (!supabase && canUseLocalMocks()) return mockCaptureLead(email, source, leadMagnet);
  const client = requireSupabaseClient();
  const { data, error } = await client.from('leads').insert({ email, source, lead_magnet: leadMagnet }).select().single();
  if (error) throw error;
  return data;
}

/* ---------- PROMPT TEMPLATES ---------- */

export async function getPromptTemplates(category?: string): Promise<PromptTemplate[]> {
  if (!supabase && canUseLocalMocks()) return getMockTemplates(category);
  const client = requireSupabaseClient();
  let query = client.from('prompt_templates').select('*').eq('published', true);
  if (category) query = query.eq('category', category);
  const { data, error } = await query.order('created_at', { ascending: false });
  if (error) throw error;
  return data || [];
}

export async function getPromptTemplateBySlug(slug: string): Promise<PromptTemplate | null> {
  if (!supabase && canUseLocalMocks()) return getMockTemplates().find(t => t.slug === slug) || null;
  const client = requireSupabaseClient();
  const { data } = await client.from('prompt_templates').select('*').eq('slug', slug).single();
  return data;
}

/* ---------- BLOG ---------- */

export async function getBlogPosts(categorySlug?: string): Promise<BlogPost[]> {
  if (!supabase && canUseLocalMocks()) return getMockBlogPosts(categorySlug);
  const client = requireSupabaseClient();
  let query = client.from('blog_posts').select('*, blog_categories(name)').eq('published', true);
  if (categorySlug) query = query.eq('blog_categories.slug', categorySlug);
  const { data, error } = await query.order('created_at', { ascending: false });
  if (error) throw error;
  return (data || []).map(d => ({ ...d, category_name: d.blog_categories?.name || '' }));
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  if (!supabase && canUseLocalMocks()) return getMockBlogPosts().find(p => p.slug === slug) || null;
  const client = requireSupabaseClient();
  const { data } = await client.from('blog_posts').select('*, blog_categories(name)').eq('slug', slug).single();
  return data ? { ...data, category_name: data.blog_categories?.name || '' } : null;
}

/* ---------- COURSE ---------- */

export async function getCoursePurchases(userId: string): Promise<CoursePurchase[]> {
  if (!supabase && canUseLocalMocks()) return getMockCoursePurchases(userId);
  const client = requireSupabaseClient();
  const { data } = await client.from('course_purchases').select('*').eq('user_id', userId);
  return data || [];
}

/* ---------- MOCK HELPERS ---------- */

function mockSignUp(email: string, fullName: string) {
  const user: UserProfile = {
    id: 'user-' + Date.now(), email, full_name: fullName,
    plan_type: 'free', role: 'user', created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
  };
  localStorage.setItem('verbito_user', JSON.stringify(user));
  return { user, session: { access_token: 'mock-token' } };
}

function mockSignIn(email: string) {
  const user: UserProfile = {
    id: 'user-mock-123', email, full_name: email.split('@')[0],
    plan_type: 'free', role: 'user', created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
  };
  localStorage.setItem('verbito_user', JSON.stringify(user));
  return { user, session: { access_token: 'mock-token' } };
}

function getMockSavedPrompts(): SavedPrompt[] {
  const stored = localStorage.getItem('verbito_saved_prompts');
  return stored ? JSON.parse(stored) : [];
}

function mockSavePrompt(userId: string, p: Omit<SavedPrompt, 'id' | 'user_id' | 'created_at' | 'updated_at'>): SavedPrompt {
  const prompt: SavedPrompt = { ...p, id: 'sp-' + Date.now(), user_id: userId, created_at: new Date().toISOString(), updated_at: new Date().toISOString() };
  const existing = getMockSavedPrompts();
  existing.unshift(prompt);
  localStorage.setItem('verbito_saved_prompts', JSON.stringify(existing));
  return prompt;
}

function mockCaptureLead(email: string, source: string, leadMagnet?: string): Lead {
  const leads = JSON.parse(localStorage.getItem('verbito_leads') || '[]');
  const lead: Lead = { id: 'lead-' + Date.now(), email, source, lead_magnet: leadMagnet, created_at: new Date().toISOString() };
  leads.push(lead);
  localStorage.setItem('verbito_leads', JSON.stringify(leads));
  return lead;
}

function getMockTemplates(category?: string): PromptTemplate[] {
  const templates: PromptTemplate[] = [
    { id: '1', slug: 'business-swot-analysis', title: 'SWOT Analysis Generator', category: 'Business', description: 'Generate a comprehensive SWOT analysis for any business or product.', prompt_text: 'Act as a senior business strategist. Conduct a detailed SWOT analysis for [COMPANY/PRODUCT]. Consider market position, competitive landscape, internal capabilities, and external opportunities/threats. Format with clear sections and actionable insights.', how_to_customize: 'Replace [COMPANY/PRODUCT] with your specific target. Add industry context in the additional instructions field.', example_output: 'Strengths: Market leader in X, strong brand recognition...\nWeaknesses: Limited distribution in Y region...', is_premium: false, published: true, created_at: '2026-01-01' },
    { id: '2', slug: 'marketing-ad-copy', title: 'High-Converting Ad Copy', category: 'Marketing', description: 'Create compelling ad copy for any product or service across multiple platforms.', prompt_text: 'Act as a direct-response copywriter with 10+ years of experience. Write 5 ad variations for [PRODUCT/SERVICE] targeting [AUDIENCE]. Include: attention-grabbing headline, emotional hook, key benefits, social proof angle, and strong CTA. Adapt tone for Facebook, Google, and LinkedIn.', how_to_customize: 'Replace [PRODUCT/SERVICE] and [AUDIENCE]. Specify platform priorities in constraints.', example_output: 'Facebook Ad: "Stop struggling with X. 10,000+ professionals already switched..."', is_premium: false, published: true, created_at: '2026-01-02' },
    { id: '3', slug: 'seo-keyword-research', title: 'SEO Keyword Strategy', category: 'SEO', description: 'Generate a comprehensive keyword research brief for any topic or industry.', prompt_text: 'Act as an SEO specialist. Create a keyword strategy for [TOPIC/INDUSTRY] including: primary keywords (high volume), long-tail keywords (low competition), LSI keywords, question-based keywords, and content cluster suggestions. Include search intent classification and priority scoring.', how_to_customize: 'Replace [TOPIC/INDUSTRY] with your niche. Specify target geography or language.', example_output: 'Primary: "project management software" (40K vol, medium comp)...', is_premium: true, published: true, created_at: '2026-01-03' },
  ];
  return category ? templates.filter(t => t.category.toLowerCase() === category.toLowerCase()) : templates;
}

function getMockBlogPosts(categorySlug?: string): BlogPost[] {
  const posts: BlogPost[] = [
    { id: '1', slug: 'what-is-prompt-engineering', title: 'What Is Prompt Engineering? A Complete Beginner\'s Guide for 2026', excerpt: 'Learn what prompt engineering is, why it matters, and how you can use it to get dramatically better results from ChatGPT, Claude, and other AI tools.', content: '<h2>What Is Prompt Engineering?</h2><p>Prompt engineering is the practice of designing and refining inputs (prompts) to AI language models to produce optimal outputs...</p>', category_id: '1', category_name: 'Fundamentals', published: true, seo_title: 'What Is Prompt Engineering? A Beginner\'s Guide', seo_description: 'Learn prompt engineering fundamentals and how to get better AI results.', created_at: '2026-05-01', updated_at: '2026-05-01', og_image: '/blog-featured-1.jpg' },
    { id: '2', slug: 'how-to-write-chatgpt-prompts', title: 'How to Write Better ChatGPT Prompts: 10 Proven Techniques', excerpt: 'Master these 10 techniques to dramatically improve your ChatGPT prompt quality and get more useful, accurate, and actionable responses every time.', content: '<h2>Why Most ChatGPT Prompts Underperform</h2><p>Most people write vague one-sentence prompts and wonder why the AI gives generic answers...</p>', category_id: '2', category_name: 'ChatGPT', published: true, seo_title: 'How to Write Better ChatGPT Prompts', seo_description: '10 proven techniques for writing better ChatGPT prompts.', created_at: '2026-05-05', updated_at: '2026-05-05', og_image: '/blog-featured-2.jpg' },
    { id: '3', slug: 'best-chatgpt-prompts-for-business', title: 'Best ChatGPT Prompts for Business Growth in 2026', excerpt: 'Discover the most effective ChatGPT prompts for strategy, operations, marketing, sales, and customer support that actually drive business results.', content: '<h2>ChatGPT for Business Strategy</h2><p>Business leaders are using AI to accelerate decision-making, analyze markets, and automate workflows...</p>', category_id: '3', category_name: 'Business', published: true, seo_title: 'Best ChatGPT Prompts for Business', seo_description: 'Effective ChatGPT prompts for business strategy and growth.', created_at: '2026-05-10', updated_at: '2026-05-10', og_image: '/blog-featured-3.jpg' },
  ];
  return categorySlug ? posts.filter(p => p.category_name.toLowerCase() === categorySlug.toLowerCase()) : posts;
}

function getMockCoursePurchases(userId: string): CoursePurchase[] {
  return JSON.parse(localStorage.getItem(`course:${userId}`) || '[]');
}
