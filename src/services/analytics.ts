import type { AnalyticsEvent } from '@/types';

declare global {
  interface Window {
    gtag?: (command: 'config' | 'event' | 'js', target: string | Date, params?: Record<string, unknown>) => void;
  }
}

class AnalyticsService {
  private events: AnalyticsEvent[] = [];
  private enabled = false;

  enable() { this.enabled = true; }

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
      window.gtag?.('config', 'G-GT702846JY', { page_path: page, ...properties });
    }
  }
}

export const analytics = new AnalyticsService();
