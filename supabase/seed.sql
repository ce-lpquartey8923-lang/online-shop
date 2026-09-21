-- Loam & Linen catalog seed for an existing Supabase project.
-- Run this after confirming that public.categories and public.products exist.
-- It is safe to run more than once because products are keyed by slug.

insert into public.categories (name, slug)
values
  ('Ceramics', 'ceramics'),
  ('Textiles', 'textiles'),
  ('Woodwork', 'woodwork'),
  ('Objects', 'objects')
on conflict (slug) do update
set name = excluded.name;

with catalog(slug, name, category_slug, price, description, image_url, details, badge) as (
  values
    ('mori-mug', 'Mori stoneware mug', 'ceramics', 34.00::numeric, 'A quietly generous cup, hand-thrown and finished in a soft mineral glaze.', 'https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?auto=format&fit=crop&w=1000&q=85', '["Hand-thrown stoneware", "12 oz capacity", "Dishwasher safe"]'::jsonb, 'Bestseller'),
    ('oat-throw', 'Oat linen throw', 'textiles', 168.00::numeric, 'Washed linen with a little weight to it. Made for shoulders, sofas, and slow Sundays.', 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=1000&q=85', '["100% European linen", "55 x 75 in", "Machine washable"]'::jsonb, null),
    ('arc-board', 'Arc serving board', 'woodwork', 92.00::numeric, 'A sculptural serving board cut from a single piece of warm American walnut.', 'https://images.unsplash.com/photo-1603199506016-b9a594b593c0?auto=format&fit=crop&w=1000&q=85', '["Solid black walnut", "Food-safe finish", "18 x 8 in"]'::jsonb, 'New'),
    ('dune-vase', 'Dune bud vase', 'ceramics', 58.00::numeric, 'A small, tactile silhouette that makes even one stem feel like enough.', 'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&w=1000&q=85', '["Wheel-thrown porcelain", "Each one is unique", "3.5 in tall"]'::jsonb, null),
    ('linen-napkins', 'Everyday linen napkins', 'textiles', 48.00::numeric, 'Soft at the edges, durable at the table. A set of four in natural flax.', 'https://images.unsplash.com/photo-1583845112203-454c7ad4f2c3?auto=format&fit=crop&w=1000&q=85', '["Set of four", "100% linen", "18 x 18 in"]'::jsonb, null),
    ('pebble-candle', 'Pebble beeswax candle', 'objects', 28.00::numeric, 'A hand-poured, unscented candle with a shape borrowed from the shoreline.', 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=1000&q=85', '["Pure beeswax", "12 hour burn", "Unscented"]'::jsonb, null),
    ('still-life', 'Still life print', 'objects', 76.00::numeric, 'A quiet archival print for a corner that needs a little more attention.', 'https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&w=1000&q=85', '["Archival giclée print", "12 x 16 in", "Unframed"]'::jsonb, null),
    ('cedar-scoop', 'Cedar measuring scoop', 'woodwork', 24.00::numeric, 'Carved by hand from aromatic cedar, for flour, coffee, or whatever you keep close.', 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=1000&q=85', '["Hand-carved cedar", "1 tbsp capacity", "Made in small batches"]'::jsonb, null)
)
insert into public.products (slug, name, category_id, price, description, image_url, details, badge)
select
  catalog.slug,
  catalog.name,
  categories.id,
  catalog.price,
  catalog.description,
  catalog.image_url,
  catalog.details,
  catalog.badge
from catalog
join public.categories on categories.slug = catalog.category_slug
on conflict (slug) do update
set
  name = excluded.name,
  category_id = excluded.category_id,
  price = excluded.price,
  description = excluded.description,
  image_url = excluded.image_url,
  details = excluded.details,
  badge = excluded.badge;

select slug, name, price, image_url
from public.products
where slug in (
  'mori-mug',
  'oat-throw',
  'arc-board',
  'dune-vase',
  'linen-napkins',
  'pebble-candle',
  'still-life',
  'cedar-scoop'
)
order by name;
