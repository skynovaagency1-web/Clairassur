# Clairassur

L'annuaire de l'assurance en France : auto, habitation, santé, vie, moto et professionnelle, au même endroit.

## Stack

- Vite + React + TypeScript, react-router
- Tailwind CSS v4 : style « liquid glass » (tokens et classes `.glass`, `.pill`, `.mono`, `.field` dans `src/index.css`)
- Polices : Cormorant Garamond (titres), Jost (texte), Martian Mono (libellés)
- Motion (apparitions au scroll), lucide-react (icônes)

## Démarrer

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # build + pré-rendu de chaque page dans dist/
```

`npm run build` pré-rend chaque page en HTML statique (`scripts/prerender.mjs`) : titre, description, URL canonique et données structurées propres à chaque page, plus `sitemap.xml`, `robots.txt` et `404.html`.

## Pages

- `/` accueil · `/devis` · `/contact` · `/a-propos`
- 6 pages par type : `/assurance-auto`, `/assurance-habitation`, `/mutuelle-sante`, `/assurance-vie`, `/assurance-moto`, `/assurance-professionnelle`
- `/assureurs` (annuaire filtrable) et une fiche par assureur `/assureurs/<nom>`
- `/guides` et 6 guides `/guides/<slug>`
- `/mentions-legales`, `/confidentialite`, `/partenaires`

## Où modifier le contenu

- `src/data.ts` : assureurs, catégories, FAQ générale
- `src/content/categories.ts` : texte des pages par type, et prix « à partir de » (`offerMeta`)
- `src/content/guides.ts` : guides
- `src/content/photos.ts` : photos Unsplash (créditées sous chaque image)
- `src/config.ts` : coordonnées de la société, à compléter avant la mise en ligne
- `src/routes.tsx` : liste des pages, titres et descriptions SEO
- `functions/api/` : fonctions Cloudflare Pages (`/api/lead`, `/api/newsletter`, `/api/contact`) via Brevo

**Prix indicatifs** : les montants « à partir de » sont des exemples. Vérifiez-les avant la mise en ligne, ou retirez-les.

## Mise en ligne sur Cloudflare Pages

1. Cloudflare > Workers & Pages > Create > Pages > Connect to Git, repo Clairassur, branche `main`.
2. Build : preset **Vite**, commande `npm run build`, dossier `dist`. Le dossier `functions/` est détecté automatiquement.
3. Settings > Variables and secrets :

| Variable | Exemple | Rôle |
| --- | --- | --- |
| `BREVO_API_KEY` (secret) | `xkeysib-…` | Clé API Brevo (SMTP & API > Clés API) |
| `LEAD_TO_EMAIL` | `leads@clairassur.fr` | Adresse qui reçoit chaque demande de devis |
| `SENDER_EMAIL` | `no-reply@clairassur.fr` | Expéditeur vérifié dans Brevo |
| `BREVO_NEWSLETTER_LIST_ID` | `3` | Liste Brevo des abonnés newsletter |
| `BREVO_LEADS_LIST_ID` (optionnel) | `4` | Liste Brevo où copier les leads |
| `CONTACT_TO_EMAIL` (optionnel) | `contact@clairassur.fr` | Reçoit les messages du formulaire de contact (sinon `LEAD_TO_EMAIL`) |

4. Custom domains : ajoutez votre domaine.
5. Optionnel : activez Cloudflare Web Analytics (sans cookie, pas de bandeau nécessaire).

Pour tester les fonctions en local : `npm run build && npx wrangler pages dev dist`.

## Gagner de l'argent avec le site

Tout se règle dans `src/config.ts`, bloc `monetize`. Tant qu'une valeur est vide, rien ne s'affiche pour elle.

1. **Liens d'affiliation (comparateur)** : inscrivez-vous sur un réseau d'affiliation (Awin, Kwanko, Effiliation…), rejoignez le programme d'un comparateur d'assurance, puis collez vos liens de suivi dans `affiliate` (un par type, ou seulement `default`). Tous les boutons « Devis gratuit » envoient alors vers ce partenaire, avec la mention « lien partenaire ». Sans lien, le formulaire intégré est utilisé.
2. **Publicité Google AdSense** : renseignez `adsense.client` (`ca-pub-…`) et `adsense.slot` (un bloc d'annonces « display »). Des emplacements « Publicité » apparaissent sur les pages par type, les guides et les fiches assureurs. Le script AdSense et `ads.txt` sont ajoutés automatiquement au build. Dans AdSense, activez le message de consentement Google (Confidentialité et messages) : il est obligatoire pour les visiteurs européens.
3. **Fiche sponsorisée** : dans `src/data.ts`, `sponsored: true` et/ou `partnerUrl` sur un acteur sous contrat.

Avant de percevoir des commissions liées à l'assurance, vérifiez auprès de l'ORIAS si une immatriculation est nécessaire, puis renseignez `orias` dans `src/config.ts`.
