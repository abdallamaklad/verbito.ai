import Stripe from 'https://esm.sh/stripe@18.0.0?target=deno';
import { handleOptions,jsonResponse } from '../_shared/cors.ts';
import { getAuthenticatedUser,requireEnv } from '../_shared/supabase.ts';
import type { BillingPeriod,CheckoutSessionRequest,PlanType } from '../_shared/types.ts';

const PRICE_ENV: Record<Exclude<PlanType, 'free'>, Record<BillingPeriod, string>> = {
  starter: {
    monthly: 'STRIPE_STARTER_MONTHLY_PRICE_ID',
    yearly: 'STRIPE_STARTER_YEARLY_PRICE_ID',
  },
  pro: {
    monthly: 'STRIPE_PRO_MONTHLY_PRICE_ID',
    yearly: 'STRIPE_PRO_YEARLY_PRICE_ID',
  },
  unlimited: {
    monthly: 'STRIPE_UNLIMITED_MONTHLY_PRICE_ID',
    yearly: 'STRIPE_UNLIMITED_YEARLY_PRICE_ID',
  },
};

function isPaidPlan(planId: string): planId is Exclude<PlanType, 'free'> {
  return planId === 'starter' || planId === 'pro' || planId === 'unlimited';
}

Deno.serve(async (request) => {
  const options = handleOptions(request);
  if (options) return options;

  try {
    if (request.method !== 'POST') return jsonResponse(request, { error: 'Method not allowed' }, 405);

    const { supabase, user } = await getAuthenticatedUser(request);
    const body = await request.json() as CheckoutSessionRequest;
    const siteUrl = requireEnv('SITE_URL').replace(/\/$/, '');
    const stripe = new Stripe(requireEnv('STRIPE_SECRET_KEY'), {
      apiVersion: '2025-05-28.basil',
      httpClient: Stripe.createFetchHttpClient(),
    });

    const { data: profile } = await supabase
      .from('profiles')
      .select('email, full_name, stripe_customer_id')
      .eq('id', user.id)
      .single();

    let customerId = profile?.stripe_customer_id as string | undefined;
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        name: profile?.full_name || user.user_metadata?.full_name || undefined,
        metadata: { user_id: user.id },
      });
      customerId = customer.id;
      await supabase.from('profiles').update({ stripe_customer_id: customerId }).eq('id', user.id);
    }

    if (body.productType === 'course') {
      const courseSlug = body.courseSlug || 'master-prompt-engineering';
      const { data: course, error: courseError } = await supabase
        .from('course_products')
        .select('id, stripe_price_id')
        .eq('slug', courseSlug)
        .eq('active', true)
        .single();

      if (courseError || !course) throw new Error('Course product is not configured.');

      const priceId = course.stripe_price_id || requireEnv('STRIPE_COURSE_PRICE_ID');
      const session = await stripe.checkout.sessions.create({
        mode: 'payment',
        customer: customerId,
        line_items: [{ price: priceId, quantity: 1 }],
        success_url: body.successUrl || `${siteUrl}/course/dashboard?checkout=success`,
        cancel_url: body.cancelUrl || `${siteUrl}/course/master-prompt-engineering?checkout=cancelled`,
        client_reference_id: user.id,
        metadata: {
          user_id: user.id,
          product_type: 'course',
          course_id: course.id,
          course_slug: courseSlug,
        },
      });

      if (!session.url) throw new Error('Stripe did not return a checkout URL.');
      return jsonResponse(request, { url: session.url });
    }

    const planId = body.planId;
    const billingPeriod = body.billingPeriod;
    if (!planId || !isPaidPlan(planId)) throw new Error('Invalid paid plan.');
    if (billingPeriod !== 'monthly' && billingPeriod !== 'yearly') throw new Error('Invalid billing period.');

    const priceId = requireEnv(PRICE_ENV[planId][billingPeriod]);
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      customer: customerId,
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: body.successUrl || `${siteUrl}/billing?checkout=success`,
      cancel_url: body.cancelUrl || `${siteUrl}/pricing?checkout=cancelled`,
      client_reference_id: user.id,
      subscription_data: {
        metadata: { user_id: user.id, plan_type: planId, billing_period: billingPeriod },
      },
      metadata: { user_id: user.id, plan_type: planId, billing_period: billingPeriod },
      allow_promotion_codes: true,
    });

    if (!session.url) throw new Error('Stripe did not return a checkout URL.');
    return jsonResponse(request, { url: session.url });
  } catch (error) {
    console.error(error);
    const message = error instanceof Error ? error.message : 'Unable to start checkout.';
    return jsonResponse(request, { error: message }, 400);
  }
});
