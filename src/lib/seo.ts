import type { SEOMetadata } from '@/types';
export const defaultSEO: SEOMetadata = {
  title: 'Verbito.ai — Turn Any Idea Into a Powerful AI Prompt',
  description: 'Generate expert-level prompts for ChatGPT, Claude, Gemini, Midjourney, and more. 2 free generations daily. No credit card required.',
  ogImage: '/og-default.jpg',
  ogType: 'website',
};
export function generateSchema(type: string) {
  const schemas: Record<string, Record<string, unknown>> = {
    organization: { '@context': 'https://schema.org', '@type': 'Organization', name: 'Verbito.ai', url: 'https://verbito.ai', logo: 'https://verbito.ai/logo.png', sameAs: [] },
    website: { '@context': 'https://schema.org', '@type': 'WebSite', name: 'Verbito.ai', url: 'https://verbito.ai' },
    softwareApplication: { '@context': 'https://schema.org', '@type': 'SoftwareApplication', name: 'Verbito', applicationCategory: 'ProductivityApplication', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } },
  };
  return schemas[type] || null;
}
