create extension if not exists "uuid-ossp";

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  email text,
  created_at timestamptz not null default now()
);

create table if not exists public.products (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text unique not null,
  description text not null default '',
  price integer not null check (price >= 0),
  compare_at_price integer,
  category text not null,
  image text not null,
  gallery text[] not null default '{}',
  colors text[] not null default '{}',
  sizes text[] not null default '{}',
  material text not null default '',
  badge text,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.carts (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.profiles(id) on delete cascade,
  session_id text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint carts_owner_check check (user_id is not null or session_id is not null)
);

create table if not exists public.cart_items (
  id uuid primary key default uuid_generate_v4(),
  cart_id uuid not null references public.carts(id) on delete cascade,
  product_id uuid not null references public.products(id),
  quantity integer not null check (quantity > 0),
  size text,
  color text
);

create table if not exists public.orders (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.profiles(id),
  email text not null,
  status text not null default 'pending',
  total integer not null check (total >= 0),
  shipping_address jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.order_items (
  id uuid primary key default uuid_generate_v4(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id uuid references public.products(id),
  product_name text not null,
  unit_price integer not null,
  quantity integer not null check (quantity > 0),
  size text,
  color text
);

alter table public.profiles enable row level security;
alter table public.products enable row level security;
alter table public.carts enable row level security;
alter table public.cart_items enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;

create policy "Products are publicly readable" on public.products for select using (is_active = true);
create policy "Users can read their profile" on public.profiles for select using (auth.uid() = id);
create policy "Users can update their profile" on public.profiles for update using (auth.uid() = id);
create policy "Users can manage their carts" on public.carts for all using (auth.uid() = user_id);
create policy "Users can manage cart items" on public.cart_items for all using (exists (select 1 from public.carts where carts.id = cart_items.cart_id and carts.user_id = auth.uid()));
create policy "Users can read their orders" on public.orders for select using (auth.uid() = user_id);
create policy "Users can read their order items" on public.order_items for select using (exists (select 1 from public.orders where orders.id = order_items.order_id and orders.user_id = auth.uid()));

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public
as $$ begin insert into public.profiles (id, email) values (new.id, new.email); return new; end; $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users for each row execute procedure public.handle_new_user();
