-- Im Supabase SQL Editor ausführen.
create table if not exists public.players (
  id uuid primary key default gen_random_uuid(),
  username text not null unique,
  password_hash text not null,
  starter_pet text check (starter_pet in ('momo', 'fluff', 'ember')),
  created_at timestamptz not null default now()
);
create index if not exists players_username_idx on public.players (username);
-- Keine öffentliche Nutzung; Zugriff ausschließlich über serverseitige API mit secret key.
alter table public.players enable row level security;
revoke all on public.players from anon, authenticated;
