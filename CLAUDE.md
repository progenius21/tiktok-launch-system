# TikTok Launch System

## Project Overview

A Next.js 16 (App Router) marketing site + SaaS dashboard for selling a $149 TikTok growth playbook to app founders. The product teaches founders how to get 0→10K users with zero ad spend using organic TikTok content.

**Live URL:** https://tiktok-launch-system.vercel.app
**Status:** v0.1 Alpha — Landing page & checkout are production-ready. Dashboard is early-stage.

## Tech Stack

- **Framework:** Next.js 16.2.1 (App Router) with React 19
- **Language:** TypeScript 5 (strict mode)
- **Styling:** Pure CSS with custom properties in `app/globals.css` — no Tailwind utility classes, no CSS modules
- **Fonts:** Bebas Neue (display), DM Mono (mono), Instrument Serif (serif) via `next/font/google`
- **Payments:** Stripe (one-time $149 checkout)
- **Email:** Resend (transactional delivery + lead nurture)
- **AI:** Anthropic Claude API (hook generator)
- **Database:** Supabase (PostgreSQL) — schema defined in `types/database.ts`
- **Analytics:** Vercel Analytics
- **Hosting:** Vercel

## Architecture

```
app/
├── page.tsx                    # Landing page (client component — all sections in one file)
├── layout.tsx                  # Root layout (fonts, metadata, analytics)
├── globals.css                 # ALL styles (single file, CSS custom properties)
├── icon.tsx                    # Dynamic favicon
├── opengraph-image.tsx         # Dynamic OG image (1200×630)
├── thank-you/page.tsx          # Post-purchase confirmation (server component)
├── privacy/page.tsx            # Privacy policy (server component)
├── api/
│   ├── checkout/route.ts       # POST → creates Stripe checkout session
│   ├── webhook/route.ts        # POST → Stripe webhook handler, sends delivery email
│   ├── lead/route.ts           # POST → captures email, sends warm-up checklist via Resend
│   └── generate-hooks/route.ts # POST → Claude AI generates TikTok hooks, optional Supabase insert
├── dashboard/
│   ├── layout.tsx              # Sidebar layout (client component)
│   ├── page.tsx                # Overview — stats + getting started
│   ├── accounts/page.tsx       # Account management (placeholder)
│   ├── hooks/page.tsx          # AI hook generator (client component)
│   └── content/page.tsx        # Content pipeline with kanban columns
lib/
├── stripe.ts                   # Stripe client init
├── email.ts                    # sendDeliveryEmail() via Resend
└── supabase.ts                 # Supabase client init (browser + server)
types/
└── database.ts                 # Supabase DB types (profiles, tiktok_accounts, hooks, content_pieces)
```

## Key Design Decisions

- **Single-file landing page:** `app/page.tsx` contains all sections (hero, proof, problem, modules, pricing, FAQ, lead capture, CTA). This is intentional for a sales page — no component splitting yet.
- **`"use client"` on landing page:** Needed for Intersection Observer scroll animations and interactive forms.
- **Pure CSS over Tailwind:** Despite Tailwind being in devDependencies, all styles are handwritten in `globals.css` using CSS custom properties for theming.
- **No auth on dashboard:** Dashboard pages are currently unprotected. Auth is a future milestone.

## Design System

- **Background:** `#0A0A0A` (near-black)
- **Text:** `#F2EDE4` (off-white)
- **Muted text:** `#A89F92` (warm grey)
- **Accent:** `#FF2D55` (TikTok pink-red)
- **Border:** `#1E1E1E`
- **Typography:** Display headings use Bebas Neue, body uses DM Mono, accents use Instrument Serif italic

## Environment Variables

```
STRIPE_SECRET_KEY
STRIPE_PUBLISHABLE_KEY         # (not currently used client-side)
STRIPE_WEBHOOK_SECRET
RESEND_API_KEY
RESEND_FROM_EMAIL
RESEND_AUDIENCE_ID             # optional — for adding leads to a Resend audience
ANTHROPIC_API_KEY
NEXT_PUBLIC_BASE_URL
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
```

## Development

```bash
npm run dev    # Start dev server
npm run build  # Production build
npm run lint   # ESLint
```

## Database Tables (Supabase)

- **profiles** — user accounts (email, stripe_customer_id, has_access)
- **tiktok_accounts** — tracked TikTok accounts (username, status, warm_up_day, views, followers)
- **hooks** — AI-generated hooks (niche, hook_text, is_used)
- **content_pieces** — content pipeline items (title, status: draft/ready/scheduled/posted, views)

## Important Notes

- The Next.js version (16.2.1) may have breaking changes from training data. Always check `node_modules/next/dist/docs/` before writing Next.js code.
- `searchParams` is a Promise in Next.js 16 — must be awaited in server components.
- Stripe webhook returns 200 even if email delivery fails to prevent retries.
- The Supabase insert in the hooks API is non-critical — failures are caught and logged silently.

@AGENTS.md
