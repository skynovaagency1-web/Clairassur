import {
  Bike,
  Briefcase,
  Car,
  HeartPulse,
  Home,
  Sprout,
  type LucideIcon,
} from 'lucide-react'

export type CategoryId = 'auto' | 'habitation' | 'sante' | 'vie' | 'moto' | 'pro'

export type Category = {
  id: CategoryId
  label: string
  short: string
  tagline: string
  description: string
  icon: LucideIcon
  color: string
  ink: string
  essentials: string[]
}

export const categories: Category[] = [
  {
    id: 'auto',
    label: 'Assurance auto',
    short: 'Auto',
    tagline: 'Au tiers, intermédiaire ou tous risques',
    description:
      "Obligatoire pour tout véhicule qui circule. Comparez les formules, de la responsabilité civile au tous risques, et les services d'assistance.",
    icon: Car,
    color: '#c8643b',
    ink: '#fff6ee',
    essentials: ['Responsabilité civile obligatoire', 'Bris de glace', 'Vol et incendie', 'Assistance 0 km'],
  },
  {
    id: 'habitation',
    label: 'Assurance habitation',
    short: 'Habitation',
    tagline: 'Locataire, propriétaire ou colocation',
    description:
      'Protège votre logement et vos biens contre les dégâts des eaux, incendies et vols. Obligatoire pour les locataires.',
    icon: Home,
    color: '#8a9a7b',
    ink: '#f6f8f1',
    essentials: ['Dégâts des eaux', 'Incendie', 'Vol et vandalisme', 'Responsabilité civile vie privée'],
  },
  {
    id: 'sante',
    label: 'Mutuelle santé',
    short: 'Santé',
    tagline: 'Complémentaire individuelle ou familiale',
    description:
      "Complète les remboursements de l'Assurance Maladie : optique, dentaire, hospitalisation, médecines douces.",
    icon: HeartPulse,
    color: '#e7b7a3',
    ink: '#3a1d12',
    essentials: ['Hospitalisation', 'Optique', 'Dentaire', 'Tiers payant'],
  },
  {
    id: 'vie',
    label: 'Assurance vie',
    short: 'Vie',
    tagline: 'Épargne, transmission et prévoyance',
    description:
      'Un placement pour épargner, préparer un projet ou transmettre un capital, avec fonds en euros et unités de compte.',
    icon: Sprout,
    color: '#6e4a5e',
    ink: '#fbf1f6',
    essentials: ['Fonds en euros', 'Unités de compte', 'Clause bénéficiaire', 'Rachats partiels'],
  },
  {
    id: 'moto',
    label: 'Assurance moto',
    short: 'Moto',
    tagline: 'Moto, scooter et deux-roues',
    description:
      "Des contrats pensés pour les deux-roues : équipement du motard, garantie du pilote, assistance et formules à l'usage.",
    icon: Bike,
    color: '#e2b65c',
    ink: '#2b1a10',
    essentials: ['Garantie du pilote', 'Équipement et casque', 'Vol', 'Assistance panne'],
  },
  {
    id: 'pro',
    label: 'Assurance professionnelle',
    short: 'Pro',
    tagline: 'Indépendants, TPE et PME',
    description:
      "RC Pro, multirisque, prévoyance : sécurisez votre activité, vos locaux et vos clients, que vous soyez freelance ou chef d'entreprise.",
    icon: Briefcase,
    color: '#9bb4c4',
    ink: '#13232d',
    essentials: ['RC professionnelle', 'Multirisque pro', 'Protection juridique', 'Prévoyance'],
  },
]

export const categoryById = Object.fromEntries(categories.map((c) => [c.id, c])) as Record<
  CategoryId,
  Category
>

export type ProviderKind = 'Assureur' | 'Mutuelle' | 'Néo-assureur' | 'Bancassureur' | 'Spécialiste'

export type Provider = {
  name: string
  kind: ProviderKind
  categories: CategoryId[]
  pitch: string
  highlights: string[]
  website: string
  tone: string
  /** Paid placement: shown first with a "Sponsorisé" badge. Only set for real, signed partners. */
  sponsored?: boolean
  /** Affiliate / tracking link from a partner programme. Used instead of `website` when set. */
  partnerUrl?: string
}

export const providers: Provider[] = [
  {
    name: 'AXA',
    kind: 'Assureur',
    categories: ['auto', 'habitation', 'sante', 'vie', 'moto', 'pro'],
    pitch: "Un des plus grands assureurs généralistes, présent partout en France via son réseau d'agents.",
    highlights: ['Réseau d’agences', 'Gamme complète', 'Particuliers et pros'],
    website: 'https://www.axa.fr',
    tone: '#1f3a6d',
  },
  {
    name: 'Allianz',
    kind: 'Assureur',
    categories: ['auto', 'habitation', 'sante', 'vie', 'pro'],
    pitch: 'Assureur international avec une offre large, des particuliers aux entreprises.',
    highlights: ['Agents et courtiers', 'Épargne et retraite', 'Entreprises'],
    website: 'https://www.allianz.fr',
    tone: '#1b4f8a',
  },
  {
    name: 'MAIF',
    kind: 'Mutuelle',
    categories: ['auto', 'habitation', 'vie', 'moto'],
    pitch: 'Mutuelle sans intermédiaire, connue pour sa démarche d’entreprise à mission.',
    highlights: ['Sociétaires', 'Entreprise à mission', 'Sans intermédiaire'],
    website: 'https://www.maif.fr',
    tone: '#8a1c2b',
  },
  {
    name: 'MACIF',
    kind: 'Mutuelle',
    categories: ['auto', 'habitation', 'sante', 'vie', 'moto'],
    pitch: 'Mutuelle généraliste qui couvre la mobilité, le logement, la santé et l’épargne.',
    highlights: ['Sociétaires', 'Agences en France', 'Offres jeunes'],
    website: 'https://www.macif.fr',
    tone: '#0f5c8c',
  },
  {
    name: 'MAAF',
    kind: 'Mutuelle',
    categories: ['auto', 'habitation', 'sante', 'moto', 'pro'],
    pitch: 'Assureur mutualiste pour les particuliers, les artisans et les commerçants.',
    highlights: ['Artisans et commerçants', 'Agences', 'Multi-équipement'],
    website: 'https://www.maaf.fr',
    tone: '#c03a2b',
  },
  {
    name: 'Matmut',
    kind: 'Mutuelle',
    categories: ['auto', 'habitation', 'sante', 'moto'],
    pitch: 'Mutuelle normande qui assure la mobilité, l’habitation et la santé des familles.',
    highlights: ['Sociétaires', 'Mobilité', 'Famille'],
    website: 'https://www.matmut.fr',
    tone: '#00704a',
  },
  {
    name: 'GMF',
    kind: 'Mutuelle',
    categories: ['auto', 'habitation', 'sante', 'vie'],
    pitch: 'Historiquement l’assureur des agents du service public, ouvert aujourd’hui à tous.',
    highlights: ['Service public', 'Agences', 'Épargne'],
    website: 'https://www.gmf.fr',
    tone: '#14366b',
  },
  {
    name: 'Groupama',
    kind: 'Mutuelle',
    categories: ['auto', 'habitation', 'sante', 'vie', 'moto', 'pro'],
    pitch: 'Mutuelle d’origine agricole, avec des caisses régionales proches du terrain.',
    highlights: ['Caisses régionales', 'Agriculteurs', 'Gamme complète'],
    website: 'https://www.groupama.fr',
    tone: '#00785a',
  },
  {
    name: 'MMA',
    kind: 'Assureur',
    categories: ['auto', 'habitation', 'moto', 'pro'],
    pitch: 'Assureur du Mans au réseau d’agents dense, très présent auprès des professionnels.',
    highlights: ['Agents généraux', 'Professionnels', 'Proximité'],
    website: 'https://www.mma.fr',
    tone: '#e2001a',
  },
  {
    name: 'Generali',
    kind: 'Assureur',
    categories: ['vie', 'sante', 'habitation', 'pro'],
    pitch: 'Acteur européen reconnu en assurance vie, épargne et protection.',
    highlights: ['Assurance vie', 'Courtiers', 'Prévoyance'],
    website: 'https://www.generali.fr',
    tone: '#a6192e',
  },
  {
    name: 'Direct Assurance',
    kind: 'Néo-assureur',
    categories: ['auto', 'moto', 'habitation'],
    pitch: 'Assurance 100 % en ligne et par téléphone, pensée pour les petits budgets.',
    highlights: ['100 % en ligne', 'Devis rapide', 'Auto et moto'],
    website: 'https://www.direct-assurance.fr',
    tone: '#e5007d',
  },
  {
    name: 'Alan',
    kind: 'Néo-assureur',
    categories: ['sante', 'pro'],
    pitch: 'Complémentaire santé digitale pour les particuliers, indépendants et entreprises.',
    highlights: ['Appli mobile', 'Remboursements rapides', 'Entreprises'],
    website: 'https://alan.com',
    tone: '#2b44e7',
  },
  {
    name: 'Harmonie Mutuelle',
    kind: 'Mutuelle',
    categories: ['sante'],
    pitch: 'Grande mutuelle santé française, pour les individus comme pour les entreprises.',
    highlights: ['Santé', 'Prévention', 'Entreprises'],
    website: 'https://www.harmonie-mutuelle.fr',
    tone: '#00a19a',
  },
  {
    name: 'MGEN',
    kind: 'Mutuelle',
    categories: ['sante'],
    pitch: 'Mutuelle historique de l’Éducation nationale, aujourd’hui ouverte au-delà.',
    highlights: ['Santé', 'Prévoyance', 'Fonction publique'],
    website: 'https://www.mgen.fr',
    tone: '#00539f',
  },
  {
    name: 'Malakoff Humanis',
    kind: 'Mutuelle',
    categories: ['sante', 'pro', 'vie'],
    pitch: 'Groupe de protection sociale : santé, prévoyance et retraite complémentaire.',
    highlights: ['Prévoyance', 'Entreprises', 'Retraite'],
    website: 'https://www.malakoffhumanis.com',
    tone: '#0b2d71',
  },
  {
    name: 'Swiss Life',
    kind: 'Assureur',
    categories: ['vie', 'sante'],
    pitch: 'Spécialiste de l’épargne, de la retraite et de la gestion de patrimoine.',
    highlights: ['Assurance vie', 'Patrimoine', 'Retraite'],
    website: 'https://www.swisslife.fr',
    tone: '#d82034',
  },
  {
    name: 'CNP Assurances',
    kind: 'Bancassureur',
    categories: ['vie'],
    pitch: 'Grand assureur de personnes, distribué notamment via les réseaux bancaires.',
    highlights: ['Assurance vie', 'Emprunteur', 'Réseaux bancaires'],
    website: 'https://www.cnp.fr',
    tone: '#1d3f6e',
  },
  {
    name: 'April',
    kind: 'Spécialiste',
    categories: ['sante', 'pro', 'moto', 'vie'],
    pitch: 'Courtier grossiste spécialisé : santé, prévoyance, emprunteur et deux-roues.',
    highlights: ['Courtage', 'Emprunteur', 'Indépendants'],
    website: 'https://www.april.fr',
    tone: '#00a3a6',
  },
  {
    name: 'Mutuelle des Motards',
    kind: 'Spécialiste',
    categories: ['moto'],
    pitch: 'Créée par et pour les motards, avec des garanties pensées pour le pilote.',
    highlights: ['100 % deux-roues', 'Équipement', 'Communauté'],
    website: 'https://www.mutuelledesmotards.fr',
    tone: '#e30613',
  },
  {
    name: 'AMV',
    kind: 'Spécialiste',
    categories: ['moto', 'auto'],
    pitch: 'Spécialiste des deux-roues, des voitures de collection et des véhicules de loisirs.',
    highlights: ['Moto et scooter', 'Collection', 'Loisirs'],
    website: 'https://www.amv.fr',
    tone: '#ee7203',
  },
  {
    name: 'Hiscox',
    kind: 'Spécialiste',
    categories: ['pro', 'habitation'],
    pitch: 'Spécialiste des risques professionnels et des biens de valeur.',
    highlights: ['RC Pro', 'Cyber', 'Habitations de prestige'],
    website: 'https://www.hiscox.fr',
    tone: '#1a1a1a',
  },
  {
    name: 'Stello',
    kind: 'Néo-assureur',
    categories: ['pro'],
    pitch: 'RC Pro et multirisque en ligne pour les indépendants et les petites entreprises.',
    highlights: ['Freelances', 'Souscription en ligne', 'RC Pro'],
    website: 'https://www.stello.eu',
    tone: '#5b3df5',
  },
  {
    name: 'Leocare',
    kind: 'Néo-assureur',
    categories: ['auto', 'moto', 'habitation'],
    pitch: 'Néo-assurance gérée depuis une appli : habitation, auto, moto et smartphone.',
    highlights: ['Appli mobile', 'Sans engagement', 'Multi-contrats'],
    website: 'https://leocare.eu',
    tone: '#ff5a5f',
  },
  {
    name: 'Ornikar Assurance',
    kind: 'Néo-assureur',
    categories: ['auto'],
    pitch: 'Assurance auto en ligne, avec une attention particulière aux jeunes conducteurs.',
    highlights: ['Jeunes conducteurs', '100 % en ligne', 'Auto'],
    website: 'https://www.ornikar.com/assurance-auto',
    tone: '#1d1d6b',
  },
]

export const slugify = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

export const providerPath = (p: Provider) => `/assureurs/${slugify(p.name)}`

export const faqs = [
  {
    q: 'Clairesoassur est-il un assureur ou un courtier ?',
    a: "Non. Clairesoassur est un annuaire indépendant : nous vous aidons à découvrir les acteurs de l'assurance en France. Nous ne vendons pas de contrats. Le site est gratuit pour vous et financé par certains partenaires (fiches sponsorisées, liens partenaires, mise en relation), toujours signalés. Détails sur la page « Partenaires et rémunération ».",
  },
  {
    q: 'Comment sont choisis les assureurs présentés ?',
    a: "Nous référençons des assureurs, mutuelles, néo-assureurs et spécialistes actifs en France, classés par type d'assurance. Les fiches sponsorisées sont signalées comme telles ; en dehors d'elles, l'ordre d'affichage ne constitue pas un classement ni une recommandation.",
  },
  {
    q: 'Les informations sont-elles à jour ?',
    a: "Les descriptions sont indicatives. Les garanties, tarifs et conditions évoluent : vérifiez toujours les documents officiels sur le site de l'assureur avant de souscrire.",
  },
  {
    q: 'Puis-je changer d’assurance facilement ?',
    a: "Pour l'auto, la moto et l'habitation, la loi Hamon permet de résilier à tout moment après un an. Pour la complémentaire santé, la résiliation infra-annuelle est possible après un an également.",
  },
  {
    q: 'Je suis assureur, comment apparaître sur Clairesoassur ?',
    a: 'Écrivez-nous via le formulaire de contact : nous étudions chaque demande de référencement.',
  },
]
