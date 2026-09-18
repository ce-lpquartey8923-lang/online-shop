create extension if not exists "pgcrypto";

create table if not exists public.categories (id uuid primary key default gen_random_uuid(), name text unique not null, slug text unique not null);
create table if not exists public.products (id uuid primary key default gen_random_uuid(), slug text unique not null, name text not null, category_id uuid references public.categories(id), price numeric(10,2) not null check (price >= 0), description text not null, image_url text not null, details jsonb not null default '[]', badge text, created_at timestamptz default now());
create table if not exists public.profiles (id uuid primary key references auth.users(id) on delete cascade, full_name text, email text, created_at timestamptz default now());
create table if not exists public.orders (id uuid primary key default gen_random_uuid(), user_id uuid references auth.users(id) on delete set null, status text not null default 'processing', total numeric(10,2) not null, shipping_address jsonb, created_at timestamptz default now());
create table if not exists public.order_items (id uuid primary key default gen_random_uuid(), order_id uuid references public.orders(id) on delete cascade not null, product_id uuid references public.products(id) on delete set null, quantity integer not null check (quantity > 0), unit_price numeric(10,2) not null);

alter table public.categories enable row level security; alter table public.products enable row level security; alter table public.profiles enable row level security; alter table public.orders enable row level security; alter table public.order_items enable row level security;
drop policy if exists "Anyone can view categories" on public.categories;
drop policy if exists "Anyone can view products" on public.products;
drop policy if exists "Users view own profile" on public.profiles;
drop policy if exists "Users update own profile" on public.profiles;
drop policy if exists "Users view own orders" on public.orders;
drop policy if exists "Users create own orders" on public.orders;
drop policy if exists "Users view own order items" on public.order_items;
create policy "Anyone can view categories" on public.categories for select using (true);
create policy "Anyone can view products" on public.products for select using (true);
create policy "Users view own profile" on public.profiles for select using (auth.uid() = id);
create policy "Users update own profile" on public.profiles for update using (auth.uid() = id);
create policy "Users view own orders" on public.orders for select using (auth.uid() = user_id);
create policy "Users create own orders" on public.orders for insert with check (auth.uid() = user_id);
create policy "Users view own order items" on public.order_items for select using (exists (select 1 from public.orders where orders.id = order_items.order_id and orders.user_id = auth.uid()));

insert into public.categories (name, slug) values ('Ceramics','ceramics'),('Textiles','textiles'),('Woodwork','woodwork'),('Objects','objects') on conflict (slug) do nothing;
insert into public.products (slug,name,category_id,price,description,image_url,details,badge)
select v.slug,v.name,c.id,v.price,v.description,v.image_url,v.details::jsonb,v.badge from (values
('mori-mug','Mori stoneware mug','ceramics',34,'A quietly generous cup, hand-thrown and finished in a soft mineral glaze.','https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?auto=format&fit=crop&w=1000&q=85','["Hand-thrown stoneware","12 oz capacity","Dishwasher safe"]','Bestseller'),
('oat-throw','Oat linen throw','textiles',168,'Washed linen with a little weight to it. Made for shoulders, sofas, and slow Sundays.','https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=1000&q=85','["100% European linen","55 × 75 in","Machine washable"]',null),
('arc-board','Arc serving board','woodwork',92,'A sculptural serving board cut from a single piece of warm American walnut.','https://images.unsplash.com/photo-1603199506016-b9a594b593c0?auto=format&fit=crop&w=1000&q=85','["Solid black walnut","Food-safe finish","18 × 8 in"]','New')
) v(slug,name,category,price,description,image_url,details,badge) join public.categories c on c.slug=v.category on conflict (slug) do nothing;

create or replace function public.handle_new_user() returns trigger language plpgsql security definer set search_path = public as $$ begin insert into public.profiles (id, full_name, email) values (new.id, new.raw_user_meta_data->>'full_name', new.email); return new; end; $$;
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users for each row execute procedure public.handle_new_user();

-- Seed account-owned records when the project already has at least one auth user.
-- This remains safe for a fresh project while providing representative data in
-- local Supabase environments.
do $$
declare
  demo_user uuid;
  demo_order uuid;
  demo_product uuid;
begin
  select id into demo_user from auth.users order by created_at limit 1;
  select id into demo_product from public.products order by created_at limit 1;
  if demo_user is not null and demo_product is not null then
    insert into public.profiles (id, full_name, email)
      select demo_user, 'Demo Customer', email from auth.users where id = demo_user
      on conflict (id) do nothing;
    insert into public.orders (user_id, status, total, shipping_address)
      select demo_user, 'delivered', 34.00, '{"city":"Portland","state":"OR"}'::jsonb
      where not exists (select 1 from public.orders where user_id = demo_user);
    select id into demo_order from public.orders where user_id = demo_user order by created_at limit 1;
    if demo_order is not null then
      insert into public.order_items (order_id, product_id, quantity, unit_price)
        select demo_order, demo_product, 1, price from public.products where id = demo_product
        and not exists (select 1 from public.order_items where order_id = demo_order);
    end if;
  end if;
end $$;
