# Loam & Linen

A polished Vite + React + TypeScript storefront for considered home objects. The app is fully usable in demo mode without credentials and switches to Supabase data access when `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are present.

## Run locally

```bash
npm install
npm run dev
```

Other scripts: `npm run build`, `npm run typecheck`, `npm run lint`, and `npm run preview`.

## Supabase

1. Copy `.env.example` to `.env.local` and fill in the project URL and anon key.
2. Run `supabase/migrations/001_store.sql` in the Supabase SQL editor.
3. The migration creates categories, products, profiles, orders and order items, enables RLS, and includes starter seed data. Auth profile creation is handled by a database trigger.

Demo mode uses stable Unsplash URLs and local state for the cart and account flow only when Supabase environment variables are absent. When configured, products and categories are loaded from Supabase; connection errors are shown with a retry action rather than silently masking a production problem. No payment is processed by the demo checkout.
