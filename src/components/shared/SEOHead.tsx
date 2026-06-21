import { useEffect } from 'react';

interface SchemaOrg {
  '@context': string;
  '@type'?: string;
  '@graph'?: Record<string, unknown>[];
  [key: string]: unknown;
}

interface SEOHeadProps {
  title: string;
  description?: string;
  ogType?: string;
  ogImage?: string;
  ogUrl?: string;
  canonicalUrl?: string;
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player';
  noIndex?: boolean;
  schema?: SchemaOrg;
  additionalMeta?: { name?: string; property?: string; content: string }[];
}

/**
 * Comprehensive SEO Head component
 * Injects all meta tags, Open Graph, Twitter Cards, and JSON-LD schema
 */
export default function SEOHead({
  title,
  description = 'Verbito.ai helps you create expert-level prompts for ChatGPT, Claude, Gemini, Midjourney, and more. Turn any idea into a powerful AI prompt.',
  ogType = 'website',
  ogImage = '/og-default.jpg',
  ogUrl,
  canonicalUrl,
  twitterCard = 'summary_large_image',
  noIndex = false,
  schema,
  additionalMeta = [],
}: SEOHeadProps) {
  useEffect(() => {
    document.title = title;
    const currentUrl = `${window.location.origin}${window.location.pathname}`;
    const resolvedCanonical = canonicalUrl || currentUrl;
    const resolvedImage = new URL(ogImage, window.location.origin).href;

    /* ---- Helpers ---- */
    const setMeta = (name: string, content: string) => {
      let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute('name', name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    const setProperty = (property: string, content: string) => {
      let el = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute('property', property);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    /* ---- Standard Meta ---- */
    setMeta('description', description);
    if (noIndex) {
      setMeta('robots', 'noindex, nofollow');
    } else {
      setMeta('robots', 'index, follow');
    }

    /* ---- Open Graph ---- */
    setProperty('og:title', title);
    setProperty('og:description', description);
    setProperty('og:type', ogType);
    setProperty('og:image', resolvedImage);
    setProperty('og:url', ogUrl || resolvedCanonical);

    /* ---- Twitter Cards ---- */
    setMeta('twitter:card', twitterCard);
    setMeta('twitter:title', title);
    setMeta('twitter:description', description);
    setMeta('twitter:image', resolvedImage);

    /* ---- Canonical URL ---- */
    let canonicalEl = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonicalEl) {
      canonicalEl = document.createElement('link');
      canonicalEl.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalEl);
    }
    canonicalEl.setAttribute('href', resolvedCanonical);

    /* ---- Additional Meta Tags ---- */
    additionalMeta.forEach((meta) => {
      if (meta.property) setProperty(meta.property, meta.content);
      if (meta.name) setMeta(meta.name, meta.content);
    });

    /* ---- JSON-LD Schema ---- */
    const existingSchema = document.querySelectorAll('script[type="application/ld+json"]');
    existingSchema.forEach((s) => s.remove());

    if (schema) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    }

    /* ---- Cleanup ---- */
    return () => {
      const schemaScripts = document.querySelectorAll('script[type="application/ld+json"]');
      schemaScripts.forEach((s) => s.remove());
    };
  }, [title, description, ogType, ogImage, ogUrl, canonicalUrl, twitterCard, noIndex, schema, additionalMeta]);

  return null;
}
