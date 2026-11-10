-- ════════════════════════════════════════════════════════════════════
--  Vivre pour l'Éternel — schéma de la base Supabase
--  À exécuter une fois dans Supabase → SQL Editor → New query → Run.
--  Le script peut être relancé sans risque (idempotent).
-- ════════════════════════════════════════════════════════════════════

-- ─────────────────────────────────────────────────────────────
-- 1. Administrateurs
--    Un compte Supabase Auth n'a accès au backoffice que s'il figure
--    dans cette table. Voir supabase/README.md pour ajouter un admin.
-- ─────────────────────────────────────────────────────────────
create table if not exists public.admins (
  user_id    uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from public.admins where user_id = auth.uid());
$$;

-- ─────────────────────────────────────────────────────────────
-- 2. Contenu géré depuis le backoffice (lecture publique)
-- ─────────────────────────────────────────────────────────────
create table if not exists public.programmes (
  id          bigint generated always as identity primary key,
  slug        text unique,                 -- identifiant d'URL : /programmes/<slug>
  icon        text,                        -- classe Font Awesome, ex. "fas fa-heart"
  label       text not null,
  horaire     text,
  description text,                        -- description courte
  detail      text,                        -- description complète
  points      text,                        -- « Ce que vous recevrez », un point par ligne
  verse_text  text,
  verse_ref   text,
  banner_url  text,
  logo_url    text,
  ordre       int  not null default 0,
  created_at  timestamptz not null default now()
);

create table if not exists public.enseignements (
  id          bigint generated always as identity primary key,
  type        text not null check (type in ('audio', 'video', 'article', 'verset')),
  titre       text not null,               -- pour un verset : la référence (Jean 3:16)
  auteur      text,
  categorie   text,                        -- série, catégorie ou thème
  description text,                        -- extrait d'article ou texte du verset
  url         text,
  date        date,
  duree       text,
  lieu        text,
  created_at  timestamptz not null default now()
);

create table if not exists public.activites (
  id            bigint generated always as identity primary key,
  categorie     text not null check (categorie in ('terrain', 'social', 'evenement', 'galerie')),
  titre         text not null,
  description   text,
  date          text,                      -- texte libre : « 15 Jan 2025 », « Chaque dernier vendredi »
  heure         text,
  lieu          text,
  type          text,                      -- événements : Prière, Famille… ; galerie : catégorie
  icon          text,
  participants  int,
  ames          int,
  beneficiaires int,
  nb_photos     int,
  image_url     text,
  created_at    timestamptz not null default now()
);

create table if not exists public.partenaires (
  id          bigint generated always as identity primary key,
  slug        text unique,                 -- identifiant d'URL : /partenaires/<slug>
  nom         text not null,
  icon        text,
  secteur     text,
  description text,
  mission     text,
  services    text,                        -- un service par ligne
  verse_text  text,
  verse_ref   text,
  collab      text,
  couleur     text,                        -- couleur principale, ex. #0284C7
  site_url    text,
  logo_url    text,
  contact     text,
  ordre       int  not null default 0,
  created_at  timestamptz not null default now()
);

create table if not exists public.annonces (
  id          bigint generated always as identity primary key,
  titre       text not null,
  message     text,
  date_debut  date not null,
  date_fin    date not null,
  image_url   text,
  created_at  timestamptz not null default now(),
  check (date_fin >= date_debut)
);

-- ─────────────────────────────────────────────────────────────
-- 3. Données envoyées par les visiteurs (écriture publique,
--    lecture réservée aux admins)
-- ─────────────────────────────────────────────────────────────
create table if not exists public.temoignages (
  id          bigint generated always as identity primary key,
  nom         text check (char_length(nom) <= 120),
  email       text check (char_length(email) <= 200),
  lieu        text check (char_length(lieu) <= 120),
  categorie   text check (char_length(categorie) <= 60),
  contenu     text not null check (char_length(contenu) between 10 and 5000),
  publier     boolean not null default true,  -- consentement à la publication
  statut      text not null default 'en_attente' check (statut in ('en_attente', 'approuve', 'refuse')),
  created_at  timestamptz not null default now()
);

create table if not exists public.messages_contact (
  id          bigint generated always as identity primary key,
  nom         text not null check (char_length(nom) <= 120),
  email       text not null check (char_length(email) <= 200),
  sujet       text check (char_length(sujet) <= 60),
  message     text not null check (char_length(message) between 2 and 5000),
  traite      boolean not null default false,
  created_at  timestamptz not null default now()
);

create table if not exists public.demandes_priere (
  id           bigint generated always as identity primary key,
  nom          text check (char_length(nom) <= 120),
  email        text check (char_length(email) <= 200),
  categorie    text check (char_length(categorie) <= 60),
  priere       text not null check (char_length(priere) between 2 and 5000),
  confidentiel boolean not null default false,
  traite       boolean not null default false,
  created_at   timestamptz not null default now()
);

create table if not exists public.demandes_partenariat (
  id          bigint generated always as identity primary key,
  nom         text not null check (char_length(nom) <= 120),
  organisation text check (char_length(organisation) <= 160),
  email       text not null check (char_length(email) <= 200),
  telephone   text check (char_length(telephone) <= 40),
  type        text check (char_length(type) <= 40),
  message     text check (char_length(message) <= 5000),
  traite      boolean not null default false,
  created_at  timestamptz not null default now()
);

create table if not exists public.newsletter (
  id          bigint generated always as identity primary key,
  email       text not null check (char_length(email) <= 200),
  created_at  timestamptz not null default now()
);
create unique index if not exists newsletter_email_unique on public.newsletter (lower(email));

-- ─────────────────────────────────────────────────────────────
-- 4. Sécurité (Row Level Security)
-- ─────────────────────────────────────────────────────────────
alter table public.admins               enable row level security;
alter table public.programmes           enable row level security;
alter table public.enseignements        enable row level security;
alter table public.activites            enable row level security;
alter table public.partenaires          enable row level security;
alter table public.annonces             enable row level security;
alter table public.temoignages          enable row level security;
alter table public.messages_contact     enable row level security;
alter table public.demandes_priere      enable row level security;
alter table public.demandes_partenariat enable row level security;
alter table public.newsletter           enable row level security;

-- Un utilisateur connecté peut vérifier s'il est admin.
drop policy if exists "admins: lecture de sa ligne" on public.admins;
create policy "admins: lecture de sa ligne" on public.admins
  for select to authenticated using (user_id = auth.uid());

-- Contenu public : lecture pour tous, écriture pour les admins.
do $$
declare t text;
begin
  foreach t in array array['programmes', 'enseignements', 'activites', 'partenaires', 'annonces'] loop
    execute format('drop policy if exists "lecture publique" on public.%I', t);
    execute format('create policy "lecture publique" on public.%I for select using (true)', t);
    execute format('drop policy if exists "admin: tout" on public.%I', t);
    execute format('create policy "admin: tout" on public.%I for all to authenticated using (public.is_admin()) with check (public.is_admin())', t);
  end loop;
end $$;

-- Formulaires : les visiteurs peuvent seulement insérer ; les admins gèrent tout.
do $$
declare t text;
begin
  foreach t in array array['messages_contact', 'demandes_priere', 'demandes_partenariat', 'newsletter', 'temoignages'] loop
    execute format('drop policy if exists "admin: tout" on public.%I', t);
    execute format('create policy "admin: tout" on public.%I for all to authenticated using (public.is_admin()) with check (public.is_admin())', t);
  end loop;
end $$;

drop policy if exists "envoi public" on public.messages_contact;
create policy "envoi public" on public.messages_contact
  for insert to anon, authenticated with check (traite = false);

drop policy if exists "envoi public" on public.demandes_priere;
create policy "envoi public" on public.demandes_priere
  for insert to anon, authenticated with check (traite = false);

drop policy if exists "envoi public" on public.demandes_partenariat;
create policy "envoi public" on public.demandes_partenariat
  for insert to anon, authenticated with check (traite = false);

drop policy if exists "envoi public" on public.newsletter;
create policy "envoi public" on public.newsletter
  for insert to anon, authenticated with check (true);

-- Témoignages : un visiteur soumet en attente ; seuls les approuvés et
-- autorisés à la publication sont visibles publiquement.
drop policy if exists "envoi public" on public.temoignages;
create policy "envoi public" on public.temoignages
  for insert to anon, authenticated with check (statut = 'en_attente');

drop policy if exists "lecture publique des approuvés" on public.temoignages;
create policy "lecture publique des approuvés" on public.temoignages
  for select using (statut = 'approuve' and publier);

-- Les visiteurs ne doivent jamais lire l'email d'un témoignage publié.
revoke select on public.temoignages from anon;
grant select (id, nom, lieu, categorie, contenu, publier, statut, created_at) on public.temoignages to anon;

-- ─────────────────────────────────────────────────────────────
-- 5. Stockage des fichiers (Médiathèque)
-- ─────────────────────────────────────────────────────────────
insert into storage.buckets (id, name, public)
values ('images', 'images', true), ('logos', 'logos', true),
       ('audio', 'audio', true),   ('documents', 'documents', true)
on conflict (id) do nothing;

drop policy if exists "medias: lecture publique" on storage.objects;
create policy "medias: lecture publique" on storage.objects
  for select using (bucket_id in ('images', 'logos', 'audio', 'documents'));

drop policy if exists "medias: ajout admin" on storage.objects;
create policy "medias: ajout admin" on storage.objects
  for insert to authenticated
  with check (bucket_id in ('images', 'logos', 'audio', 'documents') and public.is_admin());

drop policy if exists "medias: modification admin" on storage.objects;
create policy "medias: modification admin" on storage.objects
  for update to authenticated
  using (bucket_id in ('images', 'logos', 'audio', 'documents') and public.is_admin());

drop policy if exists "medias: suppression admin" on storage.objects;
create policy "medias: suppression admin" on storage.objects
  for delete to authenticated
  using (bucket_id in ('images', 'logos', 'audio', 'documents') and public.is_admin());
