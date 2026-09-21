# Loam & Linen

A polished Vite + React + TypeScript storefront for considered home objects. The app requires Supabase credentials and loads its catalog from your connected project.

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

The catalog seed contains these eight products: Mori stoneware mug, Oat linen throw, Arc serving board, Dune bud vase, Everyday linen napkins, Pebble beeswax candle, Still life print, and Cedar measuring scoop. If your existing `products` table already has the same `slug` values, the seed is safe to rerun because it uses `on conflict (slug) do nothing`.

To connect an existing Supabase project:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-public-anon-key
```

Then open the Supabase SQL Editor and run `supabase/migrations/001_store.sql` only when you need the included schema, RLS policies, auth profile trigger, or full eight-product catalog seed. If your database schema already exists, copy only the product `insert ... select` statement from that file instead of rerunning the table definitions.

If the products are missing from an existing database, run `supabase/seed.sql` in the SQL Editor instead. It creates only missing `public.categories` and `public.products` tables, updates matching slugs, inserts missing products, and finishes with a verification query. It does not delete or replace existing rows. If your existing tables use different column names or incompatible types, Supabase will identify the column that needs to be mapped or adjusted.

Products and categories are loaded from Supabase; connection errors are shown with a retry action rather than silently masking a production problem. The cart remains client-side until a payment/order backend is connected.
