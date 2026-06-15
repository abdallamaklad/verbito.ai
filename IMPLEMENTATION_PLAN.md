# Verbito.ai v2 — Implementation Plan

## 1. Current Site Issues

| Issue | Severity | Fix |
|-------|----------|-----|
| Static SPA — no real backend | Critical | Add mock services + API spec docs |
| No OpenAI integration | Critical | Build proxy service architecture + mock |
| No usage limit enforcement | Critical | Real client-side + spec for server-side |
| No Supabase auth | Critical | Full auth flow with Supabase mock service |
| No Stripe integration | Critical | Full checkout flow + webhook docs |
| Floating cards overlap mobile hero | Fixed | Hidden on md+ |
| Limited homepage sections | High | Add before/after, benefit cards, use-case grid |
| No SEO tool landing pages | High | Add 13 tool pages |
| No prompt scoring | Medium | Add scoring UI + mock logic |
| No prompt history/collections | Medium | Add tabs + localStorage persistence |
| No lead capture system | Medium | Add forms + Supabase leads integration |
| Course page is static | Medium | Add progress tracking, locked lessons |
| No analytics utility | Low | Add event tracking utility |
| Admin is placeholder | Low | Full admin with CRUD UI |

## 2. Product Architecture

```
Frontend (React 19 + Vite + Tailwind + shadcn/ui)
├── Auth Layer (Supabase client)
├── Prompt Generator (form → mock API service → result)
├── Usage Tracking (localStorage + Supabase sync)
├── Stripe Checkout (redirect to Stripe)
├── Course Platform (progress tracking)
├── Admin Dashboard (role-based access)
└── SEO Content (static + dynamic routes)

Services (Mock in frontend, spec for backend)
├── SupabaseService — auth, DB queries
├── OpenAIService — prompt generation (mock)
├── StripeService — checkout, portal (mock)
├── UsageService — daily/monthly limit tracking
├── AnalyticsService — event tracking
└── StorageService — localStorage + Supabase sync

Backend (documented for user implementation)
├── /api/generate-prompt → OpenAI + usage check + save
├── /api/stripe/webhook → subscription sync
├── /api/stripe/checkout → create session
├── /api/stripe/portal → create portal session
└── Supabase Edge Functions (spec)
```

## 3. Database Schema (SQL Migration)

Full schema in `/supabase/migrations/001_initial_schema.sql`
- 20+ tables with proper relations
- RLS policies for all tables
- Indexes for performance

## 4. Stripe Setup

Products/prices to create in Stripe Dashboard:
- Starter Monthly / Yearly
- Pro Monthly / Yearly  
- Unlimited Monthly / Yearly
- Course (one-time)
- Bundle: Pro Annual + Course

Webhooks to configure:
- checkout.session.completed
- customer.subscription.created/updated/deleted
- invoice.payment_succeeded/failed

## 5. OpenAI Generation Flow

Client → Supabase Auth check → Usage check → OpenAI API → Parse response → Save to DB → Return

Mock service simulates this flow with realistic delays and quality scoring.

## 6. SEO/Content Structure

- Homepage: SoftwareApplication schema
- Tool pages: SoftwareApplication + FAQ schema
- Articles: Article + Breadcrumb + FAQ schema
- Course: Course + FAQ schema
- Pricing: Product + FAQ schema
- Prompt Library: ItemList + Breadcrumb schema

## 7. Conversion Improvements

- Usage limit modal with email capture
- Save prompt → signup gate
- Premium template → upgrade gate
- Sticky CTA on scroll
- Lead magnets on every content page
- Course upsell after 3+ generations

## 8. Build Sequence

Phase A: Foundation (services, types, env)
Phase B: Homepage upgrade (new sections, before/after, benefits)
Phase C: Prompt Generator overhaul (scoring, variations, actions)
Phase D: SEO tool pages (13 category-specific generators)
Phase E: Auth system (Supabase integration)
Phase F: Usage limits + upgrade modal
Phase G: User dashboard (history, saved, collections, billing)
Phase H: Stripe integration (checkout, portal, webhooks)
Phase I: Course platform (progress, locked lessons)
Phase J: Prompt library (category pages, individual prompts)
Phase K: Knowledge hub (articles with real content)
Phase L: Admin dashboard (CRUD operations)
Phase M: Lead magnets + analytics
Phase N: Legal pages + SEO technical
Phase O: Final polish + deploy
