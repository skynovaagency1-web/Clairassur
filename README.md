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

Les épingles sont gardées dans le `localStorage` du navigateur. Le formulaire newsletter n'est pas encore relié à un service d'e-mailing.
