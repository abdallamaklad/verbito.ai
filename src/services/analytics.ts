import type { AnalyticsEvent } from '@/types';

declare global {
  interface Window {
    gtag?: {
      (command: 'config' | 'event' | 'js', target: string | Date, params?: Record<string, unknown>): void;
      (command: 'get', target: string, field: string, callback: (value: string) => void): void;
    };
    dataLayer?: unknown[];
  }
}

const measurementId = 'G-GT702846JY';

function loadGoogleAnalytics() {
  if (document.querySelector(`script[src*="${measurementId}"]`)) return;
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);
}

class AnalyticsService {
  private events: AnalyticsEvent[] = [];
  private enabled = false;

  enable() {
    this.enabled = true;
    window.dataLayer ||= [];
    window.gtag ||= ((...args: unknown[]) => {
      window.dataLayer!.push(args);
    }) as NonNullable<Window['gtag']>;
    window.gtag('js', new Date());

    const scheduleLoad = () => {
      if ('requestIdleCallback' in window) {
        window.requestIdleCallback(loadGoogleAnalytics, { timeout: 3000 });
      } else {
        globalThis.setTimeout(loadGoogleAnalytics, 1500);
      }
    };

    if (document.readyState === 'complete') scheduleLoad();
    else window.addEventListener('load', scheduleLoad, { once: true });
  }

  track(event: string, properties?: Record<string, unknown>) {
    const e: AnalyticsEvent = {
      event,
      properties: { ...properties, page: window.location.pathname, referrer: document.referrer },
      timestamp: new Date().toISOString(),
      user_id: undefined,
      anonymous_id: localStorage.getItem('verbito_anon_id') || undefined,
    };
    this.events.push(e);
    if (this.enabled) {
      window.gtag?.('event', event, e.properties);
    }
  }

  async getAttributionContext(): Promise<{ clientId?: string; sessionId?: string }> {
    if (!this.enabled || !window.gtag) return {};

    const getField = (field: string) => new Promise<string | undefined>((resolve) => {
      let settled = false;
      const timeout = window.setTimeout(() => {
        if (!settled) resolve(undefined);
      }, 1500);

      window.gtag?.('get', measurementId, field, (value) => {
        settled = true;
        window.clearTimeout(timeout);
        resolve(value || undefined);
      });
    });

    const [clientId, sessionId] = await Promise.all([
      getField('client_id'),
      getField('session_id'),
    ]);
    return { clientId, sessionId };
  }

  pageView(page: string, properties?: Record<string, unknown>) {
    const e: AnalyticsEvent = {
      event: 'page_view',
      properties: { page, ...properties },
      timestamp: new Date().toISOString(),
      user_id: undefined,
      anonymous_id: localStorage.getItem('verbito_anon_id') || undefined,
    };

    this.events.push(e);

    if (this.enabled) {
      window.gtag?.('config', measurementId, { page_path: page, ...properties });
    }
  }
}

export const analytics = new AnalyticsService();
