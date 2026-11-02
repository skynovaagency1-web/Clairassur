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

- **Fiche sponsorisée** : dans `src/data.ts`, ajoutez `sponsored: true` à un acteur sous contrat. Il passe en tête avec le badge « Sponsorisé ».
- **Lien d'affiliation** : ajoutez `partnerUrl: 'https://…'` (lien fourni par Awin, Kwanko, Effiliation…). Le bouton « Site officiel » l'utilise, avec `rel="sponsored"`.
- **Leads** : chaque demande du formulaire arrive par e-mail à `LEAD_TO_EMAIL`, avec le consentement de la personne.
- Avant de percevoir des commissions d'assurance, vérifiez auprès de l'ORIAS si une immatriculation est nécessaire, puis renseignez `orias` dans `src/config.ts`.
