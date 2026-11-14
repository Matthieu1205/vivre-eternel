# Mise en place du backend sur o2switch

Le backend du site est une petite API en PHP, avec une base MySQL, installée sur votre
hébergement o2switch. Le site (sur Vercel ou sur o2switch) l'appelle pour :
- afficher le contenu (programmes, enseignements, activités, partenaires, témoignages, annonce urgente) ;
- enregistrer les formulaires (contact, prière, témoignage, partenariat, newsletter) ;
- faire fonctionner le backoffice `/admin` (connexion, modifications, Médiathèque).

Tant que l'API n'est pas branchée, le site public affiche son contenu par défaut,
mais les formulaires affichent une erreur et le backoffice est inaccessible.

**Prérequis :** PHP 8.1 ou plus récent, et MySQL ou MariaDB (fournis par o2switch).

---

## 1. Choisir l'adresse de l'API

Le plus simple est un sous-domaine, par exemple `api.votre-domaine.fr`.

Dans cPanel, section **Domaines** → **Sous-domaines** : saisissez `api`, choisissez votre domaine,
puis validez. cPanel propose un dossier pour lui (par exemple `api.votre-domaine.fr`). Notez-le.

Vérifiez aussi le certificat HTTPS : cPanel → **SSL/TLS Status** → lancez **AutoSSL** si le
sous-domaine n'est pas encore couvert. L'API doit être en `https://`.

## 2. Choisir la version de PHP

cPanel → **Sélectionner une version de PHP** : choisissez **8.1 ou plus récent** (8.3 conseillé).
Vérifiez que les extensions `pdo_mysql`, `mbstring` et `fileinfo` sont cochées.

## 3. Créer la base de données

Le plus simple : cPanel, section **Bases de données** → **Assistant de base de données MySQL®**,
qui enchaîne les trois étapes :
1. **Créer une base** : par exemple `vpe` (cPanel ajoute votre identifiant devant : `identifiant_vpe`).
2. **Créer un utilisateur** avec un mot de passe solide (bouton « Générateur de mot de passe »). Notez-le.
3. **Donner les droits** : cochez **TOUS LES PRIVILÈGES**, puis validez.

Ensuite :
4. cPanel → **phpMyAdmin** → sélectionnez la base à gauche → onglet **Importer** :
   - importez `database/schema.sql` ;
   - puis importez `database/seed.sql` (**une seule fois** : il ajoute le contenu actuel du site).

## 4. Envoyer les fichiers de l'API

Envoyez **le contenu** du dossier `api/` du projet dans le dossier du sous-domaine
(avec le **Gestionnaire de fichiers** de cPanel, ou un logiciel FTP comme FileZilla) :

```
api.votre-domaine.fr/
├── .htaccess            ← indispensable (fichier caché : activez « Afficher les fichiers cachés »)
├── index.php
├── config.example.php
├── src/
├── tools/
├── database/
└── uploads/
    └── .htaccess        ← indispensable aussi
```

## 5. Configurer l'API

Dans le Gestionnaire de fichiers, copiez `config.example.php` en **`config.php`**, puis modifiez-le :

| Réglage | Valeur |
|---|---|
| `db` | le nom de la base, l'utilisateur et le mot de passe de l'étape 3 (`host` reste `localhost`) |
| `public_url` | `https://api.votre-domaine.fr` |
| `allowed_origins` | l'adresse exacte du site : `https://votre-domaine.fr`, `https://www.votre-domaine.fr`, et l'adresse Vercel si vous l'utilisez (ex. `https://vivre-eternel.vercel.app`) |
| `secret` | une longue chaîne aléatoire (le générateur de mot de passe de cPanel convient) |
| `setup_token` | un code de votre choix, utilisé une seule fois à l'étape 7 |

**Vérification :** ouvrez `https://api.votre-domaine.fr/health` dans votre navigateur.
Vous devez voir `{"ok":true,"database":"ok"}`.

- *« API non configurée »* → `config.php` manque ou est mal nommé.
- *« Erreur de base de données »* → vérifiez le nom de la base, l'utilisateur et le mot de passe.
- *Page 404 d'o2switch* → le fichier `.htaccess` n'a pas été envoyé.

Vérifiez aussi que `https://api.votre-domaine.fr/config.php` affiche bien une erreur **403 (accès interdit)**.

## 6. Relier le site à l'API

**Site sur Vercel :** Project → **Settings** → **Environment Variables** → ajoutez
`VITE_API_URL` = `https://api.votre-domaine.fr`, puis redéployez (**Deployments** → **Redeploy**).

**En développement sur votre ordinateur :** copiez `.env.example` en `.env` à la racine du projet,
mettez la même adresse, puis relancez `npm run dev`. Ajoutez `http://localhost:5173` dans
`allowed_origins` (c'est déjà le cas dans l'exemple).

**Site hébergé sur o2switch au lieu de Vercel** (facultatif) : créez le fichier `.env` comme ci-dessus,
lancez `npm run build`, puis envoyez **le contenu** du dossier `dist/` (y compris le fichier caché `.htaccess`)
dans le dossier du domaine principal (souvent `public_html`).

## 7. Créer le premier compte administrateur

Ouvrez `https://votre-domaine.fr/admin` : la page propose **« Première installation »**.
Saisissez le code `setup_token` de l'étape 5, votre email et un mot de passe (10 caractères minimum).

Ensuite, **videz le code** dans `config.php` (`'setup_token' => ''`) : la création de compte par la page
est de toute façon fermée dès qu'un admin existe.

**Ajouter d'autres admins ou changer un mot de passe :** cPanel → **Terminal**, puis :

```bash
cd ~/api.votre-domaine.fr
php tools/create-admin.php prenom@exemple.com
```

Le mot de passe est demandé ensuite. Pour retirer un accès : phpMyAdmin → table `admins` → supprimez la ligne.

## 8. Taille des fichiers de la Médiathèque

Par défaut, PHP refuse souvent les fichiers de plus de quelques Mo. Pour envoyer des fichiers audio :
cPanel → **Sélectionner une version de PHP** → onglet **Options** → réglez `upload_max_filesize`
et `post_max_size` (par exemple `100M`).

Limites appliquées par l'API : images 8 Mo, logos 4 Mo, audio 100 Mo, documents 20 Mo.
Formats acceptés : JPG, PNG, WEBP, GIF ; MP3, M4A, OGG, WAV ; PDF, DOC, DOCX.

## Sauvegardes

o2switch sauvegarde automatiquement les comptes (cPanel → **JetBackup**). Pensez aussi à exporter
la base de temps en temps : phpMyAdmin → **Exporter**. Les fichiers envoyés sont dans `uploads/`.

---

## Ce que contient la base

| Table | Rempli par | Visible publiquement |
|---|---|---|
| `programmes`, `enseignements`, `activites`, `partenaires`, `annonces` | Backoffice | Oui (l'annonce seulement pendant ses dates) |
| `temoignages` | Formulaire « Partager mon témoignage » | Seulement approuvés **et** autorisés par l'auteur, sans l'email |
| `messages_contact`, `demandes_priere`, `demandes_partenariat`, `newsletter` | Formulaires du site | Non, admins seulement (backoffice → « Messages reçus ») |
| `admins`, `admin_sessions`, `rate_limits` | API | Jamais |

## Sécurité en place

- Toutes les requêtes SQL sont préparées ; seuls les champs déclarés dans `src/resources.php` sont acceptés.
- Mots de passe chiffrés (`password_hash`), jetons de connexion aléatoires valables 7 jours, dont seule l'empreinte est stockée.
- Limitation par adresse IP : 8 essais de connexion par quart d'heure, 5 envois de formulaire par 10 minutes (par heure pour les témoignages et la newsletter).
- Seuls les sites listés dans `allowed_origins` peuvent appeler l'API depuis un navigateur.
- Fichiers envoyés : extension **et** contenu vérifiés, noms aléatoires, aucun script exécutable dans `uploads/`.
- `config.php`, `src/`, `tools/` et `database/` ne sont jamais servis au navigateur.

## Faire évoluer la base

Écrivez chaque changement dans un nouveau fichier, par exemple `database/2027-01-ajout-xxx.sql`,
importez-le dans phpMyAdmin, et ajoutez le champ correspondant dans `src/resources.php`.
