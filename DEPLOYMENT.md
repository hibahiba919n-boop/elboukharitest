# Guide de Déploiement : Vercel & Supabase
## توابل البوخاري - Touabel El Boukhari

Ce guide détaille pas à pas comment déployer votre boutique en ligne avec **Supabase** (base de données cloud PostgreSQL & Auth) et **Vercel** (hébergement rapide & CDN mondial).

---

## 1. Configuration de Supabase

### A. Créer le projet Supabase
1. Rendez-vous sur [supabase.com](https://supabase.com) et connectez-vous (ou créez un compte gratuit).
2. Cliquez sur **"New Project"** et choisissez :
   - **Name** : `touabel-el-boukhari`
   - **Database Password** : Définissez un mot de passe sécurisé et notez-le.
   - **Region** : Choisissez une région proche de vos utilisateurs (ex: `eu-west-3 Paris` ou `eu-central-1 Frankfurt`).
3. Cliquez sur **"Create new project"** et patientez environ 1 à 2 minutes pendant la création.

### B. Créer les tables de la base de données
1. Dans le menu de gauche de votre projet Supabase, cliquez sur **SQL Editor** (icône `>_`).
2. Cliquez sur **"New query"**.
3. Ouvrez le fichier `supabase-schema.sql` fourni à la racine de ce projet.
4. Copiez l'intégralité du contenu, collez-le dans l'éditeur SQL de Supabase et cliquez sur **"Run"** (ou `Ctrl + Enter`).
5. Toutes les tables (`products`, `categories`, `recipes`, `recipe_categories`, `coupons`, `orders`, `shipping_rates`) ainsi que les règles de sécurité RLS sont créées instantanément.

### C. Récupérer vos clés API Supabase
1. Dans le menu de gauche, allez dans **Project Settings** (icône roue crantée) > **API**.
2. Notez les deux valeurs suivantes :
   - **Project URL** : `https://xyzcompany.supabase.co`
   - **Project API Keys** (`anon` / `public`) : `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

---

## 2. Déploiement sur Vercel

### A. Publier votre code sur GitHub
1. Si ce n'est pas déjà fait, créez un nouveau dépôt sur [github.com](https://github.com).
2. Poussez votre code local vers GitHub :
   ```bash
   git add .
   git commit -m "feat: setup vercel and supabase deployment"
   git branch -M main
   git push -u origin main
   ```

### B. Importer le projet dans Vercel
1. Rendez-vous sur [vercel.com](https://vercel.com) et connectez-vous avec votre compte GitHub.
2. Cliquez sur **"Add New..."** > **"Project"**.
3. Trouvez votre dépôt GitHub et cliquez sur **"Import"**.

### C. Configuration du projet sur Vercel
1. **Framework Preset** : Sélectionnez **Vite** (détecté automatiquement).
2. **Root Directory** : `./` (la racine).
3. **Build Command** : `npm run build`
4. **Output Directory** : `dist`
5. **Environment Variables** : Déroulez la section **Environment Variables** et ajoutez :
   - `VITE_SUPABASE_URL` = *(Votre URL Supabase de l'étape 1.C)*
   - `VITE_SUPABASE_ANON_KEY` = *(Votre clé anon publique de l'étape 1.C)*
   - `GEMINI_API_KEY` = *(Votre clé Google AI Studio si vous utilisez les fonctionnalités IA)*
6. Cliquez sur **"Deploy"**.

---

## 3. Configuration du routage SPA (`vercel.json`)

Le fichier `vercel.json` est déjà inclus à la racine de votre projet avec la configuration suivante :
```json
{
  "framework": "vite",
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```
Cette règle garantit qu'aucun rafraîchissement de page ni accès direct à une URL (ex: `/admin`, `/recettes`, `/catalogue`) ne provoque d'erreur 404 sur Vercel.

---

## 4. Test et Vérification

Une fois le déploiement terminé sur Vercel :
1. Cliquez sur le lien généré par Vercel (ex: `https://touabel-el-boukhari.vercel.app`).
2. Testez la navigation, l'ajout au panier, la validation de commande et l'accès au Panneau d'Administration.
3. Vous pouvez connecter votre propre nom de domaine personnalisé (ex: `www.touabel-el-boukhari.dz` ou `.com`) dans les paramètres **Settings > Domains** de Vercel.
