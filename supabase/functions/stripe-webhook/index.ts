import Stripe from 'https://esm.sh/stripe@18.0.0?target=deno';
import { corsHeaders,jsonResponse } from '../_shared/cors.ts';
import { adminClient,requireEnv } from '../_shared/supabase.ts';
import type { PlanType } from '../_shared/types.ts';

function unixToIso(value: number | null | undefined): string | null {
  return value ? new Date(value * 1000).toISOString() : null;
}

function planFromMetadata(metadata: Stripe.Metadata | null | undefined): PlanType {
  const plan = metadata?.plan_type;
  return plan === 'starter' || plan === 'pro' || plan === 'unlimited' ? plan : 'free';
}

async function upsertSubscription(supabase: ReturnType<typeof adminClient>, subscription: Stripe.Subscription) {
  const userId = subscription.metadata.user_id;
  if (!userId) return;

  const item = subscription.items.data[0];
  const planType = planFromMetadata(subscription.metadata);
  await supabase.from('subscriptions').upsert({
    user_id: userId,
    stripe_subscription_id: subscription.id,
    stripe_customer_id: String(subscription.customer),
    stripe_price_id: item?.price.id,
    plan_type: planType,
    status: subscription.status,
    current_period_start: unixToIso(subscription.current_period_start),
    current_period_end: unixToIso(subscription.current_period_end),
    cancel_at_period_end: subscription.cancel_at_period_end,
    updated_at: new Date().toISOString(),
  }, { onConflict: 'stripe_subscription_id' });

  const activeStatuses = ['active', 'trialing'];
  await supabase.from('profiles').update({
    plan_type: activeStatuses.includes(subscription.status) ? planType : 'free',
    stripe_customer_id: String(subscription.customer),
    updated_at: new Date().toISOString(),
  }).eq('id', userId);
}

async function handleCheckoutCompleted(supabase: ReturnType<typeof adminClient>, session: Stripe.Checkout.Session) {
  const userId = session.client_reference_id || session.metadata?.user_id;
  if (!userId) return;

  if (session.mode === 'subscription' && session.subscription) {
    const stripe = new Stripe(requireEnv('STRIPE_SECRET_KEY'), {
      apiVersion: '2025-05-28.basil',
      httpClient: Stripe.createFetchHttpClient(),
    });
    const subscription = await stripe.subscriptions.retrieve(String(session.subscription));
    await upsertSubscription(supabase, subscription);
  }

  if (session.mode === 'payment' && session.metadata?.course_id) {
    await supabase.from('course_purchases').upsert({
      user_id: userId,
      course_product_id: session.metadata.course_id,
      stripe_payment_intent_id: session.payment_intent ? String(session.payment_intent) : null,
      stripe_checkout_session_id: session.id,
      status: 'active',
      purchased_at: new Date().toISOString(),
    }, { onConflict: 'stripe_checkout_session_id' });
  }
}

Deno.serve(async (request) => {
  if (request.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders(request) });

  try {
    if (request.method !== 'POST') return jsonResponse(request, { error: 'Method not allowed' }, 405);

    const stripe = new Stripe(requireEnv('STRIPE_SECRET_KEY'), {
      apiVersion: '2025-05-28.basil',
      httpClient: Stripe.createFetchHttpClient(),
    });
    const signature = request.headers.get('stripe-signature');
    if (!signature) throw new Error('Missing Stripe signature.');

    const body = await request.text();
    const event = await stripe.webhooks.constructEventAsync(body, signature, requireEnv('STRIPE_WEBHOOK_SECRET'));
    const supabase = adminClient();

    const { data: existing } = await supabase
      .from('stripe_events')
      .select('id, processed')
      .eq('stripe_event_id', event.id)
      .maybeSingle();

    if (existing?.processed) return jsonResponse(request, { received: true, duplicate: true });
    if (!existing) {
      await supabase.from('stripe_events').insert({
        stripe_event_id: event.id,
        type: event.type,
        payload: event,
      });
    }

    if (event.type === 'checkout.session.completed') {
      await handleCheckoutCompleted(supabase, event.data.object as Stripe.Checkout.Session);
    }

    if (
      event.type === 'customer.subscription.created' ||
      event.type === 'customer.subscription.updated' ||
      event.type === 'customer.subscription.deleted'
    ) {
      await upsertSubscription(supabase, event.data.object as Stripe.Subscription);
    }

    await supabase
      .from('stripe_events')
      .update({ processed: true })
      .eq('stripe_event_id', event.id);

    return jsonResponse(request, { received: true });
  } catch (error) {
    console.error(error);
    const message = error instanceof Error ? error.message : 'Webhook failed.';
    return jsonResponse(request, { error: message }, 400);
  }
});
