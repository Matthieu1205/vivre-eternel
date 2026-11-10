# Mise en place de la base de données (Supabase)

Le site utilise [Supabase](https://supabase.com) : une base Postgres, l'authentification
du backoffice et le stockage des fichiers. Il n'y a pas de serveur à héberger :
le site (sur Vercel) parle directement à Supabase, et la sécurité est assurée par
les règles RLS définies dans `schema.sql`.

Tant que Supabase n'est pas configuré, le site public fonctionne avec son contenu
par défaut, mais les formulaires affichent une erreur et le backoffice est inaccessible.

## 1. Créer le projet

1. Créez un compte sur https://supabase.com, puis **New project**.
   - Nom : `vivre-pour-leternel`
   - Région : la plus proche du public (ex. *West EU (Paris)* ou *Frankfurt*).
   - Notez le mot de passe de la base dans un endroit sûr.
2. Attendez que le projet soit prêt (1 à 2 minutes).

## 2. Créer les tables

Dans le projet : **SQL Editor → New query**.

1. Collez tout le contenu de [`schema.sql`](schema.sql), puis cliquez sur **Run**.
   Ce script peut être relancé sans risque.
2. Nouvelle requête : collez [`seed.sql`](seed.sql), puis **Run**.
   Il importe le contenu actuel du site (programmes, enseignements, activités,
   partenaires, témoignages). **À ne lancer qu'une seule fois**, sinon tout est en double.

## 3. Relier le site

Dans **Project Settings → API**, copiez :
- **Project URL**
- la clé **anon public** (jamais la clé `service_role` : elle donne tous les droits).

À la racine du projet, copiez `.env.example` en `.env` et collez-y ces deux valeurs.
Relancez ensuite `npm run dev`.

Pour la mise en ligne, ajoutez les mêmes variables dans Vercel :
**Project → Settings → Environment Variables** (`VITE_SUPABASE_URL` et `VITE_SUPABASE_ANON_KEY`),
puis redéployez.

## 4. Créer un compte administrateur

1. **Authentication → Users → Add user → Create new user** : email + mot de passe,
   cochez **Auto Confirm User**.
2. Dans le **SQL Editor**, donnez-lui l'accès admin (remplacez l'email) :

   ```sql
   insert into public.admins (user_id)
   select id from auth.users where email = 'admin@exemple.com';
   ```

3. Connectez-vous sur `/admin` avec cet email et ce mot de passe.

Répétez l'opération pour chaque membre de l'équipe. Pour retirer un accès :

```sql
delete from public.admins
where user_id = (select id from auth.users where email = 'admin@exemple.com');
```

## 5. Sécurité recommandée

- **Authentication → Sign In / Providers → Email** : désactivez **Allow new users to sign up**.
  Un inscrit n'aurait de toute façon aucun droit, mais autant fermer la porte.
- **Authentication → URL Configuration** : mettez l'adresse du site en ligne dans **Site URL**
  (nécessaire pour les emails de réinitialisation de mot de passe).

## Ce que contient la base

| Table | Rempli par | Visible publiquement |
|---|---|---|
| `programmes`, `enseignements`, `activites`, `partenaires`, `annonces` | Backoffice | Oui |
| `temoignages` | Formulaire « Partager mon témoignage » | Seulement s'ils sont approuvés **et** que l'auteur a autorisé la publication (sans l'email) |
| `messages_contact`, `demandes_priere`, `demandes_partenariat`, `newsletter` | Formulaires du site | Non, admins seulement (backoffice → « Messages reçus ») |
| `admins` | SQL (voir étape 4) | Non |

Les fichiers de la Médiathèque sont rangés dans 4 espaces de stockage publics :
`images`, `logos`, `audio`, `documents`. Seuls les admins peuvent y ajouter ou supprimer des fichiers.

## Modifier le schéma plus tard

Ajoutez les changements dans un nouveau fichier SQL (ex. `supabase/2026-12-ajout-xxx.sql`)
et exécutez-le dans le SQL Editor, pour garder la trace de chaque évolution.
