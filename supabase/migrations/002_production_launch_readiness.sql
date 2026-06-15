-- ============================================================
-- VERBITO PRODUCTION LAUNCH READINESS
-- Auth profile trigger, public lead/contact inserts, usage writes,
-- Stripe idempotency hardening, and function-supporting indexes.
-- ============================================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url, plan_type, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    NEW.raw_user_meta_data->>'avatar_url',
    'free',
    'user'
  )
  ON CONFLICT (id) DO UPDATE
  SET
    email = EXCLUDED.email,
    full_name = COALESCE(public.profiles.full_name, EXCLUDED.full_name),
    avatar_url = COALESCE(public.profiles.avatar_url, EXCLUDED.avatar_url),
    updated_at = NOW();

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE prompt_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE stripe_events ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public insert leads" ON leads;
CREATE POLICY "Public insert leads"
ON leads FOR INSERT
WITH CHECK (email IS NOT NULL AND length(email) <= 320);

DROP POLICY IF EXISTS "Public insert contacts" ON contact_messages;
CREATE POLICY "Public insert contacts"
ON contact_messages FOR INSERT
WITH CHECK (
  email IS NOT NULL
  AND message IS NOT NULL
  AND length(email) <= 320
  AND length(message) <= 5000
);

DROP POLICY IF EXISTS "Users insert own usage" ON prompt_usage_daily;
CREATE POLICY "Users insert own usage"
ON prompt_usage_daily FOR INSERT
WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users update own usage" ON prompt_usage_daily;
CREATE POLICY "Users update own usage"
ON prompt_usage_daily FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users insert own generations" ON prompt_generations;
CREATE POLICY "Users insert own generations"
ON prompt_generations FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE UNIQUE INDEX IF NOT EXISTS idx_course_purchases_checkout_session
ON course_purchases (stripe_checkout_session_id)
WHERE stripe_checkout_session_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_profiles_stripe_customer
ON profiles (stripe_customer_id)
WHERE stripe_customer_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_prompt_usage_daily_anonymous
ON prompt_usage_daily (anonymous_id, usage_date)
WHERE anonymous_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_stripe_events_processed
ON stripe_events (processed, created_at);
