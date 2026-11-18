-- ════════════════════════════════════════════════════════════════════
--  Vivre pour l'Éternel — schéma de la base MySQL / MariaDB (o2switch)
--  À importer une fois dans phpMyAdmin (onglet « Importer ») ou avec :
--    mysql -u UTILISATEUR -p NOM_DE_LA_BASE < schema.sql
--  Le script peut être relancé sans risque : il ne recrée que ce qui manque.
--  Compatible MySQL 5.7+ et MariaDB 10.3+.
-- ════════════════════════════════════════════════════════════════════

SET NAMES utf8mb4;

-- ─────────────────────────────────────────────────────────────
-- 1. Administrateurs et sécurité
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS admins (
  id            INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  email         VARCHAR(190) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at    TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Jetons de connexion du backoffice (seule l'empreinte SHA-256 est stockée).
CREATE TABLE IF NOT EXISTS admin_sessions (
  token_hash  CHAR(64) PRIMARY KEY,
  admin_id    INT UNSIGNED NOT NULL,
  expires_at  TIMESTAMP NOT NULL,
  created_at  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX (admin_id),
  FOREIGN KEY (admin_id) REFERENCES admins(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Limitation des tentatives (connexion, formulaires) par adresse IP.
CREATE TABLE IF NOT EXISTS rate_limits (
  id          BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  action      VARCHAR(60) NOT NULL,
  ip_hash     CHAR(64) NOT NULL,
  created_at  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX (action, ip_hash, created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ─────────────────────────────────────────────────────────────
-- 2. Contenu géré depuis le backoffice (lecture publique)
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS programmes (
  id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  slug        VARCHAR(80) NULL UNIQUE,        -- /programmes/<slug>
  icon        VARCHAR(80) NULL,               -- classe Font Awesome, ex. "fas fa-heart"
  label       VARCHAR(200) NOT NULL,
  horaire     VARCHAR(200) NULL,
  description TEXT NULL,                      -- description courte
  detail      TEXT NULL,                      -- description complète
  points      TEXT NULL,                      -- un point par ligne
  verse_text  TEXT NULL,
  verse_ref   VARCHAR(120) NULL,
  banner_url  VARCHAR(500) NULL,
  logo_url    VARCHAR(500) NULL,
  ordre       INT NOT NULL DEFAULT 0,
  created_at  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS enseignements (
  id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  type        ENUM('audio', 'video', 'article', 'verset') NOT NULL,
  titre       VARCHAR(255) NOT NULL,          -- pour un verset : la référence (Jean 3:16)
  auteur      VARCHAR(160) NULL,
  categorie   VARCHAR(120) NULL,              -- série, catégorie ou thème
  description TEXT NULL,                      -- extrait d'article ou texte du verset
  url         VARCHAR(500) NULL,
  `date`      DATE NULL,
  duree       VARCHAR(60) NULL,
  lieu        VARCHAR(160) NULL,
  created_at  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX (type)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS activites (
  id            INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  categorie     ENUM('terrain', 'social', 'evenement', 'galerie') NOT NULL,
  titre         VARCHAR(255) NOT NULL,
  description   TEXT NULL,
  `date`        VARCHAR(120) NULL,            -- texte libre : « 15 Jan 2025 », « Chaque dernier vendredi »
  heure         VARCHAR(120) NULL,
  lieu          VARCHAR(200) NULL,
  type          VARCHAR(120) NULL,            -- événements : Prière, Famille… ; galerie : catégorie
  icon          VARCHAR(80) NULL,
  participants  INT NULL,
  ames          INT NULL,
  beneficiaires INT NULL,
  nb_photos     INT NULL,
  image_url     VARCHAR(500) NULL,
  created_at    TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX (categorie)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS partenaires (
  id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  slug        VARCHAR(80) NULL UNIQUE,        -- /partenaires/<slug>
  nom         VARCHAR(200) NOT NULL,
  icon        VARCHAR(80) NULL,
  secteur     VARCHAR(160) NULL,
  description TEXT NULL,
  mission     TEXT NULL,
  services    TEXT NULL,                      -- un service par ligne
  verse_text  TEXT NULL,
  verse_ref   VARCHAR(120) NULL,
  collab      TEXT NULL,
  couleur     VARCHAR(20) NULL,               -- ex. #0284C7
  site_url    VARCHAR(500) NULL,
  logo_url    VARCHAR(500) NULL,
  contact     VARCHAR(200) NULL,
  ordre       INT NOT NULL DEFAULT 0,
  created_at  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS annonces (
  id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  titre       VARCHAR(255) NOT NULL,
  message     TEXT NULL,
  date_debut  DATE NOT NULL,
  date_fin    DATE NOT NULL,
  image_url   VARCHAR(500) NULL,
  created_at  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ─────────────────────────────────────────────────────────────
-- 3. Données envoyées par les visiteurs
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS temoignages (
  id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  nom         VARCHAR(120) NULL,
  email       VARCHAR(200) NULL,              -- jamais renvoyé par l'API publique
  lieu        VARCHAR(120) NULL,
  categorie   VARCHAR(60) NULL,
  contenu     TEXT NOT NULL,
  publier     TINYINT(1) NOT NULL DEFAULT 1,  -- consentement à la publication
  statut      ENUM('en_attente', 'approuve', 'refuse') NOT NULL DEFAULT 'en_attente',
  created_at  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX (statut)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS messages_contact (
  id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  nom         VARCHAR(120) NOT NULL,
  email       VARCHAR(200) NOT NULL,
  sujet       VARCHAR(60) NULL,
  message     TEXT NOT NULL,
  traite      TINYINT(1) NOT NULL DEFAULT 0,
  created_at  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS demandes_priere (
  id           INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  nom          VARCHAR(120) NULL,
  email        VARCHAR(200) NULL,
  categorie    VARCHAR(60) NULL,
  priere       TEXT NOT NULL,
  confidentiel TINYINT(1) NOT NULL DEFAULT 0,
  traite       TINYINT(1) NOT NULL DEFAULT 0,
  created_at   TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS demandes_partenariat (
  id           INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  nom          VARCHAR(120) NOT NULL,
  organisation VARCHAR(160) NULL,
  email        VARCHAR(200) NOT NULL,
  telephone    VARCHAR(40) NULL,
  type         VARCHAR(40) NULL,
  message      TEXT NULL,
  traite       TINYINT(1) NOT NULL DEFAULT 0,
  created_at   TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS newsletter (
  id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  email       VARCHAR(190) NOT NULL UNIQUE,   -- stocké en minuscules par l'API
  created_at  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ─────────────────────────────────────────────────────────────
-- 4. Textes des pages et coordonnées (modifiables dans « Pages du site »)
--    Créées automatiquement par l'API si elles manquent (voir ensure_schema()).
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS contenus (
  cle         VARCHAR(100) PRIMARY KEY,       -- ex. « apropos.vision », « site.coordonnees »
  valeur      MEDIUMTEXT NOT NULL,            -- JSON : uniquement les champs modifiés
  updated_at  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS temoignages_video (
  id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  nom         VARCHAR(160) NOT NULL,
  categorie   VARCHAR(60) NULL,
  description TEXT NULL,
  url         VARCHAR(500) NULL,              -- lien YouTube / Facebook ou fichier vidéo
  duree       VARCHAR(60) NULL,
  ordre       INT NOT NULL DEFAULT 0,
  created_at  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
