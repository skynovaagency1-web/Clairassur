# Lumassur

> Anciennement « Clairassur ». Les ressources Cloudflare (Worker `clairassur`, base `clairassur-db`, bucket `clairassur-photos`) gardent leur nom technique : seul le nom affiché a changé.

L'annuaire de l'assurance en France : auto, habitation, santé, vie, moto et professionnelle, au même endroit.

Hébergé sur Cloudflare (Worker + D1 + R2), déployé automatiquement à chaque push sur `main` : voir « Hébergement » plus bas.

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
- `/mentions-legales`, `/cgu`, `/confidentialite`, `/partenaires`
- `/admin` : boîte de réception privée (demandes de devis, messages, abonnés newsletter), export CSV

## Où modifier le contenu

- `src/data.ts` : assureurs, catégories, FAQ générale
- `src/content/categories.ts` : texte des pages par type, et prix « à partir de » (`offerMeta`)
- `src/content/guides.ts` : guides
- `src/content/photos.ts` : photos Unsplash (créditées sous chaque image)
- `src/config.ts` : coordonnées de la société, à compléter avant la mise en ligne
- `src/routes.tsx` : liste des pages, titres et descriptions SEO
- `worker/` : le Worker Cloudflare (`/api/lead`, `/api/contact`, `/api/newsletter`, `/admin`, `/img/*`)
- `migrations/` : schéma de la base D1

**Prix indicatifs** : les montants « à partir de » sont des exemples. Vérifiez-les avant la mise en ligne, ou retirez-les.

## Hébergement : tout sur Cloudflare

Un seul Worker Cloudflare (`wrangler.jsonc`) sert tout le site :

- **Pages** : les fichiers pré-rendus de `dist/` sont servis directement par le CDN (gratuit, illimité).
- **D1** (`clairassur-db`, Europe de l’Ouest) : chaque demande de devis, message et inscription newsletter y est enregistré, même sans e-mail configuré. Consultez-les sur `/admin`. Les demandes de plus de 3 ans sont supprimées chaque nuit.
- **R2** (`clairassur-photos`) : copies des photos du site. La première visite d’une photo la copie depuis Unsplash ; ensuite elle est servie par Cloudflare.
- **Brevo** (optionnel) : recevoir aussi chaque demande par e-mail et alimenter des listes.

La base D1 et le bucket R2 existent déjà dans le compte Cloudflare, et les tables sont créées.

### Réglages (Workers & Pages > clairassur > Settings > Variables and secrets)

| Nom | Type | Rôle |
| --- | --- | --- |
| `ADMIN_PASSWORD` | Secret | Mot de passe de `/admin` (utilisateur : `admin`). **Obligatoire** pour voir les demandes. |
| `BREVO_API_KEY` | Secret | Optionnel. Clé API Brevo pour recevoir les demandes par e-mail. |
| `LEAD_TO_EMAIL` | Texte | Adresse qui reçoit chaque demande de devis |
| `SENDER_EMAIL` | Texte | Expéditeur vérifié dans Brevo, ex. `no-reply@lumassur.fr` |
| `CONTACT_TO_EMAIL` | Texte | Optionnel. Reçoit les messages de contact (sinon `LEAD_TO_EMAIL`) |
| `BREVO_NEWSLETTER_LIST_ID` | Texte | Optionnel. Liste Brevo des abonnés newsletter |
| `BREVO_LEADS_LIST_ID` | Texte | Optionnel. Liste Brevo où copier les leads |

### Commandes

```bash
npm run dev:worker   # build + Worker en local avec D1/R2 simulés (http://localhost:8787)
npm run db:migrate   # applique les nouvelles migrations à la base D1 en ligne
npm run deploy       # migrations + déploiement manuel (après `npx wrangler login`)
```

Le domaine du site se règle dans `src/config.ts` (`url`).

## Gagner de l'argent avec le site

Tout se règle dans `src/config.ts`, bloc `monetize`. Tant qu'une valeur est vide, rien ne s'affiche pour elle.

1. **Liens d'affiliation (comparateur)** : inscrivez-vous sur un réseau d'affiliation (Awin, Kwanko, Effiliation…), rejoignez le programme d'un comparateur d'assurance, puis collez vos liens de suivi dans `affiliate` (un par type, ou seulement `default`). Tous les boutons « Devis gratuit » envoient alors vers ce partenaire, avec la mention « lien partenaire ». Sans lien, le formulaire intégré est utilisé.
2. **Publicité Google AdSense** : renseignez `adsense.client` (`ca-pub-…`) et `adsense.slot` (un bloc d'annonces « display »). Des emplacements « Publicité » apparaissent sur les pages par type, les guides et les fiches assureurs. Le script AdSense et `ads.txt` sont ajoutés automatiquement au build. Dans AdSense, activez le message de consentement Google (Confidentialité et messages) : il est obligatoire pour les visiteurs européens.
3. **Fiche sponsorisée** : dans `src/data.ts`, `sponsored: true` et/ou `partnerUrl` sur un acteur sous contrat.

Avant de percevoir des commissions liées à l'assurance, vérifiez auprès de l'ORIAS si une immatriculation est nécessaire, puis renseignez `orias` dans `src/config.ts`.
