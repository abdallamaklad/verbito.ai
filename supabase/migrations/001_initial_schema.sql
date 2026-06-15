-- ============================================================
-- VERBITO.AI FULL DATABASE SCHEMA
-- Run this in Supabase SQL Editor after creating your project
-- ============================================================

-- Profiles (extends auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  plan_type TEXT DEFAULT 'free' CHECK (plan_type IN ('free','starter','pro','unlimited')),
  role TEXT DEFAULT 'user' CHECK (role IN ('user','admin')),
  stripe_customer_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  stripe_subscription_id TEXT UNIQUE,
  stripe_customer_id TEXT,
  stripe_price_id TEXT,
  plan_type TEXT,
  status TEXT,
  current_period_start TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  cancel_at_period_end BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS prompt_generations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  anonymous_id TEXT,
  category TEXT,
  goal TEXT,
  context TEXT,
  target_model TEXT,
  output_type TEXT,
  tone TEXT,
  language TEXT,
  generated_prompt JSONB,
  prompt_score INT,
  tokens_used INT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS prompt_usage_daily (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  anonymous_id TEXT,
  usage_date DATE DEFAULT CURRENT_DATE,
  generations_used INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, usage_date),
  UNIQUE(anonymous_id, usage_date)
);

CREATE TABLE IF NOT EXISTS saved_prompts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT,
  category TEXT,
  prompt_text TEXT,
  notes TEXT,
  collection_id UUID,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS prompt_collections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  name TEXT,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS prompt_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE,
  title TEXT,
  category TEXT,
  description TEXT,
  prompt_text TEXT,
  how_to_customize TEXT,
  example_output TEXT,
  is_premium BOOLEAN DEFAULT FALSE,
  published BOOLEAN DEFAULT FALSE,
  seo_title TEXT,
  seo_description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS blog_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE,
  name TEXT,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE,
  title TEXT,
  excerpt TEXT,
  content TEXT,
  category_id UUID REFERENCES blog_categories(id),
  published BOOLEAN DEFAULT FALSE,
  seo_title TEXT,
  seo_description TEXT,
  og_image TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS course_products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE,
  title TEXT,
  description TEXT,
  price_cents INT,
  stripe_price_id TEXT,
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS course_modules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_product_id UUID REFERENCES course_products(id),
  title TEXT,
  description TEXT,
  sort_order INT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS course_lessons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  module_id UUID REFERENCES course_modules(id),
  title TEXT,
  slug TEXT,
  video_url TEXT,
  content TEXT,
  resource_url TEXT,
  sort_order INT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS course_purchases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id),
  course_product_id UUID REFERENCES course_products(id),
  stripe_payment_intent_id TEXT,
  stripe_checkout_session_id TEXT,
  status TEXT,
  purchased_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS lesson_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id),
  lesson_id UUID REFERENCES course_lessons(id),
  completed BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMPTZ,
  UNIQUE(user_id, lesson_id)
);

CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  source TEXT,
  lead_magnet TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT,
  email TEXT,
  subject TEXT,
  message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS admin_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id),
  role TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS stripe_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  stripe_event_id TEXT UNIQUE,
  type TEXT,
  processed BOOLEAN DEFAULT FALSE,
  payload JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_prompt_generations_user ON prompt_generations(user_id);
CREATE INDEX IF NOT EXISTS idx_saved_prompts_user ON saved_prompts(user_id);
CREATE INDEX IF NOT EXISTS idx_usage_daily_user ON prompt_usage_daily(user_id, usage_date);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_templates_slug ON prompt_templates(slug);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE prompt_generations ENABLE ROW LEVEL SECURITY;
ALTER TABLE prompt_usage_daily ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_prompts ENABLE ROW LEVEL SECURITY;
ALTER TABLE prompt_collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE lesson_progress ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Public profiles read" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users read own subscriptions" ON subscriptions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users read own generations" ON prompt_generations FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users read own usage" ON prompt_usage_daily FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users read own saved" ON saved_prompts FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users manage own saved" ON saved_prompts FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users read own collections" ON prompt_collections FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users manage own collections" ON prompt_collections FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users read own purchases" ON course_purchases FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users read own progress" ON lesson_progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users manage own progress" ON lesson_progress FOR ALL USING (auth.uid() = user_id);

-- Public read policies
CREATE POLICY "Public read published templates" ON prompt_templates FOR SELECT USING (published = true);
CREATE POLICY "Public read published posts" ON blog_posts FOR SELECT USING (published = true);
CREATE POLICY "Public read categories" ON blog_categories FOR SELECT USING (true);
CREATE POLICY "Public read courses" ON course_products FOR SELECT USING (active = true);
CREATE POLICY "Public read modules" ON course_modules FOR SELECT USING (true);
CREATE POLICY "Public read lessons" ON course_lessons FOR SELECT USING (true);

-- Admin policies
CREATE POLICY "Admin full access leads" ON leads FOR ALL USING (EXISTS (SELECT 1 FROM admin_roles WHERE user_id = auth.uid()));
CREATE POLICY "Admin full access contacts" ON contact_messages FOR ALL USING (EXISTS (SELECT 1 FROM admin_roles WHERE user_id = auth.uid()));
CREATE POLICY "Admin full access stripe events" ON stripe_events FOR ALL USING (EXISTS (SELECT 1 FROM admin_roles WHERE user_id = auth.uid()));

-- Insert default course
INSERT INTO course_products (slug, title, description, price_cents, active) VALUES
('master-prompt-engineering', 'Master Prompt Engineering', 'Learn the frameworks behind high-performing prompts for business, marketing, content, research, coding, automation, and creative AI.', 19700, true)
ON CONFLICT DO NOTHING;

-- Insert blog categories
INSERT INTO blog_categories (slug, name, description) VALUES
('fundamentals', 'AI Basics', 'Fundamental concepts in AI and prompt engineering'),
('prompt-engineering', 'Prompt Engineering', 'Advanced prompt engineering techniques and guides'),
('chatgpt', 'ChatGPT Guides', 'Tips and tutorials for using ChatGPT effectively'),
('business', 'AI for Business', 'How businesses can leverage AI for growth'),
('marketing', 'AI for Marketing', 'AI-powered marketing strategies and content creation'),
('students', 'AI for Students', 'How students can use AI for learning and research'),
('developers', 'AI for Developers', 'AI tools and techniques for software development'),
('tools', 'AI Tools', 'Reviews and guides for AI tools'),
('automation', 'AI Automation', 'Automating workflows with AI'),
('productivity', 'AI Productivity', 'Boosting productivity with AI assistants')
ON CONFLICT DO NOTHING;
