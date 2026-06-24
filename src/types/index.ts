/* ================================================================ */
/*  VERBITO TYPE DEFINITIONS                                         */
/* ================================================================ */

export type PlanType = 'free' | 'starter' | 'pro' | 'unlimited';
export type SubscriptionStatus = 'active' | 'canceled' | 'past_due' | 'trialing' | 'unpaid';
export type BillingPeriod = 'monthly' | 'yearly';
export type Complexity = 'beginner' | 'intermediate' | 'expert';
export type TargetModel = 'chatgpt' | 'gpt-4.1' | 'gpt-4o' | 'claude' | 'gemini' | 'midjourney' | 'dall-e' | 'general-ai';

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
  plan_type: PlanType;
  role: 'user' | 'admin';
  stripe_customer_id?: string;
  created_at: string;
  updated_at: string;
}

export interface Subscription {
  id: string;
  user_id: string;
  stripe_subscription_id: string;
  stripe_customer_id: string;
  stripe_price_id: string;
  plan_type: PlanType;
  status: SubscriptionStatus;
  current_period_start: string;
  current_period_end: string;
  cancel_at_period_end: boolean;
  created_at: string;
}

export interface PromptGenerationInput {
  goal: string;
  category: string;
  outputType: string;
  targetModel: TargetModel;
  language: string;
  context?: string;
  audience?: string;
  tone?: string;
  complexity?: Complexity;
  industry?: string;
  constraints?: string;
  avoid?: string;
  exampleInput?: string;
  exampleOutput?: string;
  desiredLength?: string;
  brandVoice?: string;
  additionalInstructions?: string;
}

export interface QualityBreakdown {
  clarity: number;
  context: number;
  specificity: number;
  constraints: number;
  outputFormat: number;
  reusability: number;
}

export interface PromptGenerationResult {
  id: string;
  finalPrompt: string;
  shortVersion: string;
  advancedVersion: string;
  whyItWorks: string;
  variables: string[];
  followUpPrompts: string[];
  bestModel: string;
  commonMistakes: string[];
  promptScore: number;
  qualityBreakdown: QualityBreakdown;
  category: string;
  targetModel: TargetModel;
  createdAt: string;
}

export interface DailyUsage {
  userId?: string;
  anonymousId?: string;
  date: string;
  generationsUsed: number;
  dailyLimit: number;
}

export interface CoursePurchase {
  id: string;
  user_id: string;
  course_id: string;
  status: 'active' | 'refunded' | 'expired';
  purchased_at: string;
}

export interface MonthlyUsage {
  userId: string;
  billingPeriodStart: string;
  billingPeriodEnd: string;
  generationsUsed: number;
  monthlyLimit: number;
  planType: PlanType;
}

export interface SavedPrompt {
  id: string;
  user_id: string;
  title: string;
  category: string;
  prompt_text: string;
  notes?: string;
  collection_id?: string;
  created_at: string;
  updated_at: string;
}

export interface PromptCollection {
  id: string;
  user_id: string;
  name: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

export interface PromptGenerationHistoryItem {
  id: string;
  user_id?: string;
  anonymous_id?: string;
  category?: string;
  goal?: string;
  target_model?: string;
  output_type?: string;
  generated_prompt?: PromptGenerationResult | Record<string, unknown>;
  prompt_score?: number;
  created_at: string;
}

export interface PromptTemplate {
  id: string;
  slug: string;
  title: string;
  category: string;
  description: string;
  prompt_text: string;
  how_to_customize: string;
  example_output: string;
  is_premium: boolean;
  published: boolean;
  seo_title?: string;
  seo_description?: string;
  created_at: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category_id: string;
  category_name: string;
  published: boolean;
  seo_title?: string;
  seo_description?: string;
  og_image?: string;
  created_at: string;
  updated_at: string;
}

export interface CourseProduct {
  id: string;
  slug: string;
  title: string;
  description: string;
  price_cents: number;
  stripe_price_id?: string;
  active: boolean;
}

export interface CourseModule {
  id: string;
  course_product_id: string;
  title: string;
  description: string;
  sort_order: number;
  lessons: CourseLesson[];
}

export interface CourseLesson {
  id: string;
  module_id: string;
  title: string;
  slug: string;
  video_url?: string;
  content: string;
  resource_url?: string;
  sort_order: number;
  completed?: boolean;
}

export interface Lead {
  id: string;
  email: string;
  source?: string;
  lead_magnet?: string;
  created_at: string;
}

export interface PricingPlan {
  id: PlanType;
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  monthlyLimit: number;
  features: string[];
  highlighted?: boolean;
  cta: string;
}

export interface CheckoutSessionRequest {
  planId?: Exclude<PlanType, 'free'>;
  billingPeriod?: BillingPeriod;
  productType?: 'subscription' | 'course';
  courseSlug?: string;
  gaClientId?: string;
  gaSessionId?: string;
}

export interface CheckoutSessionResponse {
  clientSecret: string;
}

export interface CheckoutSessionStatusRequest {
  sessionId: string;
}

export interface CheckoutSessionStatusResponse {
  id: string;
  status: 'open' | 'complete' | 'expired';
  paymentStatus: 'paid' | 'unpaid' | 'no_payment_required';
  mode: 'payment' | 'subscription' | 'setup';
  amountTotal: number;
  currency: string;
  productType: 'subscription' | 'course';
  productId: string;
  productName: string;
}

export interface PortalSessionRequest {
  returnUrl?: string;
}

export interface PortalSessionResponse {
  url: string;
}

export interface AnalyticsEvent {
  event: string;
  properties?: Record<string, unknown>;
  timestamp: string;
  user_id?: string;
  anonymous_id?: string;
}

export interface SEOMetadata {
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'product';
  canonical?: string;
  noindex?: boolean;
  schema?: Record<string, unknown>;
}
