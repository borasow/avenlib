-- Table des leads partenaires
create table if not exists leads (
  id uuid default gen_random_uuid() primary key,
  created_at timestamptz default now(),
  prenom text not null,
  nom text not null,
  email text not null,
  telephone text not null,
  partenaire_nom text not null,
  partenaire_slug text not null,
  domaine text not null,
  statut text not null default 'nouveau', -- nouveau | contacté | converti | perdu
  scheduled_at timestamptz,
  user_id uuid references auth.users(id),
  notes text
);

-- Table des tokens partenaires pour le dashboard
create table if not exists partenaire_tokens (
  id uuid default gen_random_uuid() primary key,
  created_at timestamptz default now(),
  token text unique not null default gen_random_uuid()::text,
  partenaire_slug text not null,
  partenaire_nom text not null,
  email_partenaire text
);

-- RLS
alter table leads enable row level security;
alter table partenaire_tokens enable row level security;

-- Les leads sont créés via service_role uniquement (API route)
-- Le dashboard partenaire y accède via service_role avec token vérifié
create policy "service_role_all_leads" on leads
  for all to service_role using (true) with check (true);

create policy "service_role_all_tokens" on partenaire_tokens
  for all to service_role using (true) with check (true);
