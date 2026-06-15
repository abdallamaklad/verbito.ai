import Stripe from 'https://esm.sh/stripe@18.0.0?target=deno';
import { handleOptions,jsonResponse } from '../_shared/cors.ts';
import { getAuthenticatedUser,requireEnv } from '../_shared/supabase.ts';
import type { PortalSessionRequest } from '../_shared/types.ts';

Deno.serve(async (request) => {
  const options = handleOptions(request);
  if (options) return options;

  try {
    if (request.method !== 'POST') return jsonResponse(request, { error: 'Method not allowed' }, 405);

    const { supabase, user } = await getAuthenticatedUser(request);
    const body = await request.json().catch(() => ({})) as PortalSessionRequest;
    const siteUrl = requireEnv('SITE_URL').replace(/\/$/, '');
    const stripe = new Stripe(requireEnv('STRIPE_SECRET_KEY'), {
      apiVersion: '2025-05-28.basil',
      httpClient: Stripe.createFetchHttpClient(),
    });

    const { data: profile } = await supabase
      .from('profiles')
      .select('stripe_customer_id')
      .eq('id', user.id)
      .single();

    if (!profile?.stripe_customer_id) throw new Error('No Stripe customer found for this account.');

    const session = await stripe.billingPortal.sessions.create({
      customer: profile.stripe_customer_id,
      return_url: body.returnUrl || `${siteUrl}/billing`,
    });

    return jsonResponse(request, { url: session.url });
  } catch (error) {
    console.error(error);
    const message = error instanceof Error ? error.message : 'Unable to open billing portal.';
    return jsonResponse(request, { error: message }, 400);
  }
});
