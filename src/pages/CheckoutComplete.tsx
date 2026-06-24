import { CheckCircle2,Clock3,XCircle } from 'lucide-react';
import { useEffect,useState } from 'react';
import { Link,useSearchParams } from 'react-router-dom';
import SEOHead from '../components/shared/SEOHead';
import { getCheckoutSessionStatus } from '../services/stripe';
import type { CheckoutSessionStatusResponse } from '../types';

export default function CheckoutComplete() {
  const [searchParams] = useSearchParams();
  const [session, setSession] = useState<CheckoutSessionStatusResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    if (!sessionId) return;
    getCheckoutSessionStatus(sessionId)
      .then(setSession)
      .catch((statusError: unknown) => setError(statusError instanceof Error ? statusError.message : 'Unable to verify payment.'));
  }, [sessionId]);

  const displayError = !sessionId ? 'The checkout session ID is missing.' : error;
  const complete = session?.status === 'complete' && (session.paymentStatus === 'paid' || session.paymentStatus === 'no_payment_required');
  const destination = session?.productType === 'course' ? '/course/dashboard' : '/billing';

  return (
    <>
      <SEOHead title="Checkout confirmation | Verbito.ai" description="Your Verbito checkout confirmation." canonicalUrl="https://verbito.ai/checkout/complete" />
      <section className="flex min-h-[65dvh] items-center bg-gray-50 px-4 py-16 dark:bg-gray-950">
        <div className="mx-auto w-full max-w-xl rounded-lg border border-gray-200 bg-white px-6 py-10 text-center shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:px-10">
          {displayError ? <XCircle className="mx-auto h-14 w-14 text-red-500" /> : complete ? <CheckCircle2 className="mx-auto h-14 w-14 text-emerald-600" /> : <Clock3 className="mx-auto h-14 w-14 text-violet-600" />}
          <h1 className="mt-5 text-3xl font-bold text-gray-950 dark:text-white">
            {displayError ? 'We could not verify this checkout' : complete ? 'Payment confirmed' : 'Confirming your payment'}
          </h1>
          <p className="mx-auto mt-3 max-w-md text-gray-600 dark:text-gray-300">
            {displayError || (complete
              ? `Your purchase of ${session?.productName} is complete. A receipt will be sent by email.`
              : 'Stripe is still processing this payment. Please wait a moment before checking your account.')}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {complete && <Link to={destination} className="inline-flex min-h-11 items-center rounded-lg bg-violet-600 px-5 font-semibold text-white hover:bg-violet-700">Continue</Link>}
            <Link to="/contact" className="inline-flex min-h-11 items-center rounded-lg border border-gray-300 px-5 font-semibold text-gray-800 hover:bg-gray-50 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800">Contact support</Link>
          </div>
        </div>
      </section>
    </>
  );
}
