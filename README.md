# Tenue Rayons — déploiement

Application de suivi des rayons pour les responsables de magasin Nord/Sud,
avec rapport pour la direction. Aucun compte Claude requis : une fois
déployée, c'est une page web classique.

## 1. Base de données (Upstash Redis)

Tu as déjà une base Upstash utilisée par `holdris-depenses` et `memo-board`
(instance `holdris-kv`). Le plus simple est de **réutiliser la même base** :

1. Va sur https://console.upstash.com
2. Ouvre la base `holdris-kv` (ou celle utilisée par tes autres apps)
3. Récupère `UPSTASH_REDIS_REST_URL` et `UPSTASH_REDIS_REST_TOKEN` dans l'onglet "REST API"

Cette appli utilise un préfixe de clé dédié (`tenue-rayons:`), donc elle ne
rentrera pas en collision avec les données des deux autres apps même en
partageant la même base.

Si tu préfères une base séparée, crée-en une nouvelle gratuitement sur
Upstash et utilise ses identifiants à la place.

## 2. Déploiement sur Vercel

**Option la plus simple — CLI, depuis ce dossier :**

```bash
npm install -g vercel   # si pas déjà installé
cd tenue-rayons-next
vercel login
vercel
```

Vercel te demande de créer/choisir un projet. Une fois créé, ajoute les
variables d'environnement :

```bash
vercel env add UPSTASH_REDIS_REST_URL
vercel env add UPSTASH_REDIS_REST_TOKEN
```

Puis déploie en production :

```bash
vercel --prod
```

Tu obtiens une URL du type `https://tenue-rayons.vercel.app` — c'est ce
lien-là que tu envoies à ton équipe. Aucun compte Claude, aucun compte
Vercel n'est nécessaire pour eux, juste un navigateur.

**Alternative — via GitHub + tableau de bord Vercel :**
1. Crée un nouveau dépôt GitHub et pousse ce dossier dedans
2. Sur vercel.com → "Add New Project" → importe ce dépôt
3. Dans les paramètres du projet → Environment Variables → ajoute
   `UPSTASH_REDIS_REST_URL` et `UPSTASH_REDIS_REST_TOKEN`
4. Déploie

## 3. Mises à jour

Pour toute modification future de l'appli, il suffit de relancer
`vercel --prod` (ou de pousser sur GitHub si tu es passé par cette
méthode) — le lien reste le même, seul le contenu change.
