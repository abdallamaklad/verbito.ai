export type PlanType = 'free' | 'starter' | 'pro' | 'unlimited';
export type BillingPeriod = 'monthly' | 'yearly';
export type Complexity = 'beginner' | 'intermediate' | 'expert';
export type TargetModel = 'chatgpt' | 'gpt-4.1' | 'gpt-4o' | 'claude' | 'gemini' | 'midjourney' | 'dall-e' | 'general-ai';

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

export interface CheckoutSessionRequest {
  planId?: Exclude<PlanType, 'free'>;
  billingPeriod?: BillingPeriod;
  productType?: 'subscription' | 'course';
  courseSlug?: string;
  successUrl?: string;
  cancelUrl?: string;
}

export interface CheckoutSessionResponse {
  url: string;
}

export interface PortalSessionRequest {
  returnUrl?: string;
}

export interface PortalSessionResponse {
  url: string;
}
