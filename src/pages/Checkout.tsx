import { EmbeddedCheckout,EmbeddedCheckoutProvider } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { ArrowLeft,LockKeyhole,ShieldCheck } from 'lucide-react';
import { useEffect,useRef,useState } from 'react';
import { Link,useSearchParams } from 'react-router-dom';
import SEOHead from '../components/shared/SEOHead';
import { createCheckoutSession,createCourseCheckoutSession,getPlanById } from '../services/stripe';
import { supabase } from '../services/supabase';

const publishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY as string | undefined;
const stripePromise = publishableKey ? loadStripe(publishableKey) : Promise.resolve(null);

export default function Checkout() {
  const [searchParams] = useSearchParams();
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const requestRef = useRef<Promise<string> | null>(null);

  const isCourse = searchParams.get('product') === 'course';
  const courseSlug = searchParams.get('course') || 'master-prompt-engineering';
  const planId = searchParams.get('plan') || '';
  const billingPeriod = searchParams.get('period') === 'monthly' ? 'monthly' : 'yearly';
  const plan = getPlanById(planId);
  const backUrl = isCourse ? `/course/${courseSlug}` : '/pricing';
  const productName = isCourse ? 'Master Prompt Engineering' : `${plan?.name || 'Verbito'} ${billingPeriod} plan`;
  const configurationError = !publishableKey
    ? 'Checkout is temporarily unavailable because Stripe is not configured.'
    : !isCourse && (!plan || plan.id === 'free')
      ? 'That paid plan is not available. Please return to pricing and choose a plan.'
      : null;
  const displayError = configurationError || error;
  const needsAuthentication = displayError?.startsWith('Please log in') ?? false;

  useEffect(() => {
    if (configurationError) return;

    if (!requestRef.current) {
      requestRef.current = (async () => {
        const { data } = supabase ? await supabase.auth.getSession() : { data: { session: null } };
        if (!data.session) throw new Error('Please log in or create an account before continuing to payment.');

        const response = isCourse
          ? await createCourseCheckoutSession(courseSlug)
          : await createCheckoutSession(planId, billingPeriod);
        return response.clientSecret;
      })();
    }

    requestRef.current.then(setClientSecret).catch((requestError: unknown) => {
      setError(requestError instanceof Error ? requestError.message : 'Unable to load checkout.');
    });
  }, [billingPeriod, configurationError, courseSlug, isCourse, planId]);

  return (
    <>
      <SEOHead
        title="Secure checkout | Verbito.ai"
        description="Complete your Verbito purchase securely."
        canonicalUrl="https://verbito.ai/checkout"
      />
      <section className="bg-gray-50 px-4 py-10 dark:bg-gray-950 sm:py-14">
        <div className="mx-auto max-w-6xl">
          <Link to={backUrl} className="mb-7 inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-violet-700 dark:text-gray-300">
            <ArrowLeft className="h-4 w-4" /> Back
          </Link>

          <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,0.72fr)_minmax(500px,1.28fr)]">
            <aside className="lg:sticky lg:top-28">
              <p className="mb-2 text-sm font-semibold text-violet-700 dark:text-violet-300">Secure checkout</p>
              <h1 className="text-3xl font-bold text-gray-950 dark:text-white">Complete your purchase</h1>
              <p className="mt-3 text-lg text-gray-600 dark:text-gray-300">{productName}</p>

              <div className="mt-8 space-y-5 border-t border-gray-200 pt-6 dark:border-gray-800">
                <div className="flex gap-3">
                  <ShieldCheck className="mt-0.5 h-5 w-5 text-emerald-600" />
                  <div><p className="font-semibold text-gray-900 dark:text-white">Protected payment</p><p className="mt-1 text-sm text-gray-600 dark:text-gray-400">Payment details are encrypted and handled securely by Stripe.</p></div>
                </div>
                <div className="flex gap-3">
                  <LockKeyhole className="mt-0.5 h-5 w-5 text-violet-600" />
                  <div><p className="font-semibold text-gray-900 dark:text-white">Your details stay private</p><p className="mt-1 text-sm text-gray-600 dark:text-gray-400">Verbito never receives or stores your full card number.</p></div>
                </div>
              </div>
            </aside>

            <div className="min-h-[520px] overflow-hidden rounded-lg border border-gray-200 bg-white p-2 shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:p-4">
              {displayError ? (
                <div role="alert" className="flex min-h-[480px] flex-col items-center justify-center px-6 text-center">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">Checkout could not be loaded</h2>
                  <p className="mt-3 max-w-md text-gray-600 dark:text-gray-300">{displayError}</p>
                  <Link to={needsAuthentication ? '/login' : backUrl} className="mt-6 inline-flex min-h-11 items-center rounded-lg bg-violet-600 px-5 font-semibold text-white hover:bg-violet-700">
                    {needsAuthentication ? 'Log in' : 'Return to selection'}
                  </Link>
                </div>
              ) : clientSecret ? (
                <EmbeddedCheckoutProvider stripe={stripePromise} options={{ clientSecret }}>
                  <EmbeddedCheckout />
                </EmbeddedCheckoutProvider>
              ) : (
                <div className="flex min-h-[480px] items-center justify-center" aria-live="polite">
                  <div className="text-center"><div className="mx-auto h-9 w-9 animate-spin rounded-full border-4 border-violet-200 border-t-violet-600" /><p className="mt-4 text-sm font-medium text-gray-600 dark:text-gray-300">Preparing secure checkout...</p></div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
