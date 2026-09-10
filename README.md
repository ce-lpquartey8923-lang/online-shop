# Luma Market

Luma is a polished starter storefront built with Next.js App Router, TypeScript, Tailwind CSS, and Supabase-ready data access. It includes a responsive catalog, search and category filtering, product detail pages, a persistent local cart, account UI, and a clearly labeled demo checkout flow.

## Quick start

```bash
npm install
copy .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The shop uses a small in-memory product catalog when Supabase variables are not present, so the UI is runnable immediately.

## Supabase setup

1. Create a Supabase project.
2. Copy the project URL and anon key into `.env.local`:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```

3. Run `supabase/migrations/20240910000000_initial_schema.sql` in the Supabase SQL editor or with the Supabase CLI.
4. Insert products into `public.products` using the shape in `lib/types.ts`. Product reads automatically use Supabase when configured and fall back to the local seed catalog if the table is empty or unavailable.

Authentication UI is scaffolded for Supabase Auth but does not claim to create a production session yet. The checkout is intentionally a demo: it does not collect payment details or create a real order. Connect a payment provider and server-side order endpoint before using it in production.

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the local development server |
| `npm run build` | Create a production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run Next.js lint checks |
