-- Avenlib — Supabase Schema
-- Exécuter dans l'éditeur SQL de Supabase

-- Table profiles (stocke les réponses du diagnostic)
create table if not exists profiles (
  id uuid default gen_random_uuid() primary key,
  email text unique not null,
  prenom text,
  statut text,
  secteur text,
  anciennete text,
  revenus text,
  situation_familiale text,
  age text,
  existant text[],
  prevoyance_niveau text,
  objectifs text[],
  connaissance text,
  newsletter boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Table clicks (tracking des clics partenaires)
create table if not exists clicks (
  id uuid default gen_random_uuid() primary key,
  email text,
  domaine text not null,
  partenaire text not null,
  created_at timestamptz default now()
);

-- Index pour les requêtes par email
create index if not exists profiles_email_idx on profiles (email);
create index if not exists clicks_email_idx on clicks (email);
create index if not exists clicks_domaine_idx on clicks (domaine);

-- RLS (Row Level Security) — à activer selon vos besoins
-- alter table profiles enable row level security;
-- alter table clicks enable row level security;

-- Politique service role (backend uniquement)
-- Les routes API utilisent la service_role key qui bypasse RLS
