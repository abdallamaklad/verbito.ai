import type { BillingPeriod,CheckoutSessionResponse,CheckoutSessionStatusResponse,PlanType,PortalSessionResponse,PricingPlan } from '@/types';
import { analytics } from './analytics';
import { invokeEdgeFunction,isBackendConfigured } from './backend';

export const PRICING_PLANS: PricingPlan[] = [
  { id: 'free', name: 'Free', description: 'Get started with AI prompts', monthlyPrice: 0, yearlyPrice: 0, monthlyLimit: 2, features: ['2 prompt generations/day', 'Basic prompt categories', 'Copy generated prompts', 'Free articles access'], cta: 'Get Started' },
  { id: 'starter', name: 'Starter', description: 'For regular AI users', monthlyPrice: 12, yearlyPrice: 115, monthlyLimit: 300, features: ['300 prompts/month', 'All categories', 'Save 50 prompts', 'Prompt history', 'Basic improvements', 'Email support'], cta: 'Start Starter' },
  { id: 'pro', name: 'Pro', description: 'For professionals', monthlyPrice: 29, yearlyPrice: 278, monthlyLimit: 2000, features: ['2,000 prompts/month', 'Advanced generation', 'Prompt scoring', 'Prompt library', 'Save unlimited', 'Collections', 'Priority support'], highlighted: true, cta: 'Start Pro' },
  { id: 'unlimited', name: 'Unlimited', description: 'For power users & teams', monthlyPrice: 79, yearlyPrice: 758, monthlyLimit: 99999, features: ['Unlimited prompts', 'All Pro features', 'Advanced workflows', 'Premium templates', 'API access', 'Team features', 'Dedicated support'], cta: 'Go Unlimited' },
];

export function getPlanById(id: string): PricingPlan | undefined {
  return PRICING_PLANS.find(p => p.id === id);
}

function isPaidPlan(planId: string): planId is Exclude<PlanType, 'free'> {
  return planId === 'starter' || planId === 'pro' || planId === 'unlimited';
}

export async function createCheckoutSession(planId: string, billingPeriod: BillingPeriod): Promise<CheckoutSessionResponse> {
  if (!isPaidPlan(planId)) throw new Error('Please choose a paid plan.');

  if (isBackendConfigured()) {
    const plan = getPlanById(planId);
    const value = billingPeriod === 'yearly' ? plan?.yearlyPrice : plan?.monthlyPrice;
    const attribution = await analytics.getAttributionContext();
    analytics.track('begin_checkout', {
      currency: 'USD',
      value,
      items: [{ item_id: `${planId}_${billingPeriod}`, item_name: `${plan?.name || planId} ${billingPeriod}`, price: value, quantity: 1 }],
    });
    return invokeEdgeFunction<CheckoutSessionResponse>('create-checkout-session', {
      planId,
      billingPeriod,
      gaClientId: attribution.clientId,
      gaSessionId: attribution.sessionId,
    });
  }

  if (import.meta.env.PROD) {
    throw new Error('Checkout is temporarily unavailable because the production backend is not configured.');
  }

  throw new Error('Embedded checkout requires the Supabase backend.');
}

export async function createCourseCheckoutSession(courseSlug = 'master-prompt-engineering'): Promise<CheckoutSessionResponse> {
  if (isBackendConfigured()) {
    const attribution = await analytics.getAttributionContext();
    analytics.track('begin_checkout', {
      currency: 'USD',
      items: [{ item_id: courseSlug, item_name: 'Master Prompt Engineering', quantity: 1 }],
    });
    return invokeEdgeFunction<CheckoutSessionResponse>('create-checkout-session', {
      productType: 'course',
      courseSlug,
      gaClientId: attribution.clientId,
      gaSessionId: attribution.sessionId,
    });
  }

  if (import.meta.env.PROD) {
    throw new Error('Course checkout is temporarily unavailable because the production backend is not configured.');
  }

  throw new Error('Embedded checkout requires the Supabase backend.');
}

export async function getCheckoutSessionStatus(sessionId: string): Promise<CheckoutSessionStatusResponse> {
  return invokeEdgeFunction<CheckoutSessionStatusResponse>('get-checkout-session', { sessionId });
}

export async function createPortalSession(): Promise<PortalSessionResponse> {
  if (isBackendConfigured()) {
    return invokeEdgeFunction<PortalSessionResponse>('create-portal-session', {
      returnUrl: `${window.location.origin}/billing`,
    });
  }

  if (import.meta.env.PROD) {
    throw new Error('Billing portal is temporarily unavailable because the production backend is not configured.');
  }

  return { url: '/billing' };
}
