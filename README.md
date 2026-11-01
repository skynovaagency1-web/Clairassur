# Clairassur

L'annuaire de l'assurance en France : auto, habitation, santé, vie, moto et professionnelle, au même endroit.

## Stack

- Vite + React + TypeScript
- Tailwind CSS v4
- Motion (animations au scroll, parallaxe, transitions)
- lucide-react (icônes)

## Démarrer

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # build de production dans dist/
```

## Structure

- `src/data.ts` : catégories, assureurs, guides et FAQ (contenu à éditer ici)
- `src/components/Hero.tsx` : hero sombre avec collage d'« épingles » en parallaxe
- `src/components/Categories.tsx` : bento des 6 types d'assurance + bandeau défilant
- `src/components/Directory.tsx` : annuaire en grille masonry type Pinterest (recherche, filtres, épingles, fiche détaillée)
- `src/components/Sections.tsx` : « Comment ça marche », guides, FAQ, newsletter et pied de page

- `src/components/QuoteForm.tsx` : formulaire « Recevez des devis » (génération de leads)
- `src/components/Legal.tsx` : mentions légales, confidentialité, partenaires (`#/mentions-legales`, `#/confidentialite`, `#/partenaires`)
- `src/config.ts` : coordonnées de la société, à compléter avant la mise en ligne
- `functions/api/` : fonctions Cloudflare Pages (`/api/lead`, `/api/newsletter`) qui envoient les leads par e-mail et inscrivent à la newsletter via Brevo

Les épingles sont gardées dans le `localStorage` du navigateur.

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

4. Custom domains : ajoutez votre domaine.
5. Optionnel : activez Cloudflare Web Analytics (sans cookie, pas de bandeau nécessaire).

Pour tester les fonctions en local : `npm run build && npx wrangler pages dev dist`.

## Gagner de l'argent avec le site

- **Fiche sponsorisée** : dans `src/data.ts`, ajoutez `sponsored: true` à un acteur sous contrat. Il passe en tête avec le badge « Sponsorisé ».
- **Lien d'affiliation** : ajoutez `partnerUrl: 'https://…'` (lien fourni par Awin, Kwanko, Effiliation…). Le bouton « Site officiel » l'utilise, avec `rel="sponsored"`.
- **Leads** : chaque demande du formulaire arrive par e-mail à `LEAD_TO_EMAIL`, avec le consentement de la personne.
- Avant de percevoir des commissions d'assurance, vérifiez auprès de l'ORIAS si une immatriculation est nécessaire, puis renseignez `orias` dans `src/config.ts`.
