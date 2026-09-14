create table public.dodo_subscriptions (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  customer_id text,
  dodo_subscription_id text unique,
  product_id text,
  status text not null default 'pending',
  current_period_end timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

grant select, insert, update, delete on public.dodo_subscriptions to authenticated;
grant all on public.dodo_subscriptions to service_role;

alter table public.dodo_subscriptions enable row level security;

create policy "Users can read their own subscription"
on public.dodo_subscriptions
for select
to authenticated
using (email = (select email from auth.users where id = auth.uid()));
