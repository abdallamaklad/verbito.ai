import type { AnalyticsEvent } from '@/types';

declare global {
  interface Window {
    gtag?: (command: 'config' | 'event' | 'js', target: string | Date, params?: Record<string, unknown>) => void;
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
    window.gtag ||= (...args: Parameters<NonNullable<Window['gtag']>>) => {
      window.dataLayer!.push(args);
    };
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
