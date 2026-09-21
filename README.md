# Loam & Linen

A polished Vite + React + TypeScript storefront for considered home objects. The app is fully usable in demo mode without credentials and switches to Supabase data access when `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are present.

## Run locally

```bash
npm install
npm run dev
```

Other scripts: `npm run build`, `npm run typecheck`, `npm run lint`, and `npm run preview`.

## Connect an existing Supabase project

This app connects to your existing Supabase project; it does not clone, create, or replace your database.

1. Copy `.env.example` to `.env.local`.
2. Set `VITE_SUPABASE_URL` to your existing project URL.
3. Set `VITE_SUPABASE_ANON_KEY` to your existing project's public anon key.
4. Start the app with `npm run dev`.

The project must expose the `products` and `categories` tables used by the catalog query. The included `supabase/migrations/001_store.sql` is reference/setup SQL only; run it only if your existing database still needs those tables, policies, seed records, or the auth profile trigger. Never put the service-role key in `.env.local` or client-side code.

Demo mode uses stable Unsplash URLs and local state for the cart and account flow only when Supabase environment variables are absent. When configured, products and categories are loaded from Supabase; connection errors are shown with a retry action rather than silently masking a production problem. No payment is processed by the demo checkout.
