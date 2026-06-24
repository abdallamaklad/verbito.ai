import Stripe from 'https://esm.sh/stripe@18.0.0?target=deno';
import { handleOptions,jsonResponse } from '../_shared/cors.ts';
import { getAuthenticatedUser,requireEnv } from '../_shared/supabase.ts';
import type { CheckoutSessionStatusRequest } from '../_shared/types.ts';

Deno.serve(async (request) => {
  const options = handleOptions(request);
  if (options) return options;

  try {
    if (request.method !== 'POST') return jsonResponse(request, { error: 'Method not allowed' }, 405);

    const { user } = await getAuthenticatedUser(request);
    const { sessionId } = await request.json() as CheckoutSessionStatusRequest;
    if (!sessionId || !/^cs_(?:test_|live_)?[A-Za-z0-9]+$/.test(sessionId)) throw new Error('Invalid checkout session.');

    const stripe = new Stripe(requireEnv('STRIPE_SECRET_KEY'), {
      apiVersion: '2025-05-28.basil',
      httpClient: Stripe.createFetchHttpClient(),
    });
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const sessionUserId = session.client_reference_id || session.metadata?.user_id;
    if (sessionUserId !== user.id) return jsonResponse(request, { error: 'Checkout session not found.' }, 404);

    const isCourse = session.metadata?.product_type === 'course';
    const productId = isCourse
      ? session.metadata?.course_slug || 'master-prompt-engineering'
      : `${session.metadata?.plan_type || 'subscription'}_${session.metadata?.billing_period || 'unknown'}`;

    return jsonResponse(request, {
      id: session.id,
      status: session.status,
      paymentStatus: session.payment_status,
      mode: session.mode,
      amountTotal: session.amount_total || 0,
      currency: (session.currency || 'usd').toUpperCase(),
      productType: isCourse ? 'course' : 'subscription',
      productId,
      productName: session.metadata?.product_name || (isCourse ? 'Master Prompt Engineering' : 'Verbito subscription'),
    });
  } catch (error) {
    console.error(error);
    const message = error instanceof Error ? error.message : 'Unable to verify checkout.';
    return jsonResponse(request, { error: message }, 400);
  }
});
