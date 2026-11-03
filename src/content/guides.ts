import type { CategoryId } from '../data'

export type Guide = {
  slug: string
  title: string
  profile: string
  body: string
  metaDescription: string
  categories: CategoryId[]
  color: string
  ink: string
  size: 'sm' | 'md' | 'lg'
  readingTime: number
  sections: { h: string; p: string[] }[]
}

export const guides: Guide[] = [
  {
    slug: 'assurance-jeune-conducteur',
    profile: 'Jeune conducteur',
    title: 'Premier permis, première assurance',
    body: 'La conduite accompagnée et le bonus progressif font baisser la note. Regardez aussi les offres au kilomètre.',
    metaDescription:
      'Jeune conducteur : pourquoi l’assurance auto coûte plus cher, comment réduire la surprime et quelle formule choisir pour sa première voiture.',
    categories: ['auto'],
    color: '#c8643b',
    ink: '#fff6ee',
    size: 'lg',
    readingTime: 4,
    sections: [
      {
        h: 'Pourquoi c’est plus cher',
        p: [
          'Statistiquement, les conducteurs novices ont plus d’accidents. Les assureurs appliquent donc une surprime pendant les premières années de permis. Elle diminue chaque année sans sinistre responsable, puis disparaît.',
          'Elle est réduite pour les conducteurs qui ont suivi la conduite accompagnée (AAC), qui démarrent avec plus d’expérience.',
        ],
      },
      {
        h: 'Choisir la bonne formule',
        p: [
          'Pour une première voiture d’occasion de faible valeur, une formule au tiers ou intermédiaire (avec bris de glace et vol) est souvent le meilleur compromis.',
          'Si la voiture est récente ou financée par un crédit, une formule tous risques reste préférable. Dans tous les cas, vérifiez la garantie du conducteur.',
        ],
      },
      {
        h: 'Les leviers pour payer moins',
        p: [
          'Être déclaré conducteur secondaire sur le contrat d’un parent permet de commencer à constituer un historique d’assurance.',
          'Les offres « au kilomètre » ou « petit rouleur » conviennent si vous roulez peu. Une voiture peu puissante coûte aussi moins cher à assurer.',
          'Enfin, comparez les franchises : une prime basse avec une franchise élevée peut coûter cher au premier accrochage.',
        ],
      },
      {
        h: 'À retenir',
        p: [
          'Comparez plusieurs devis, vérifiez la garantie du conducteur et les franchises, et pensez à faire jouer la concurrence chaque année : après un an, la loi Hamon vous permet de changer d’assureur à tout moment.',
        ],
      },
    ],
  },
  {
    slug: 'assurance-habitation-locataire',
    profile: 'Premier appartement',
    title: 'Locataire : ce qui est obligatoire',
    body: 'Le bailleur peut exiger une attestation « risques locatifs ». Une multirisque habitation protège aussi vos affaires.',
    metaDescription:
      'Locataire : quelle assurance habitation est obligatoire, ce que couvrent les risques locatifs et pourquoi une multirisque est conseillée.',
    categories: ['habitation'],
    color: '#8a9a7b',
    ink: '#f6f8f1',
    size: 'md',
    readingTime: 3,
    sections: [
      {
        h: 'L’obligation du locataire',
        p: [
          'Pour une location vide, la loi oblige le locataire à s’assurer contre les risques locatifs : incendie, explosion et dégâts des eaux causés au logement. Le bailleur peut demander une attestation à la remise des clés, puis chaque année.',
          'Pour une location meublée, l’obligation dépend du bail, mais la plupart des propriétaires l’exigent aussi.',
        ],
      },
      {
        h: 'Pourquoi aller plus loin',
        p: [
          'L’assurance risques locatifs ne protège que le logement du propriétaire. Vos meubles, votre ordinateur ou vos vêtements ne sont pas couverts.',
          'Une multirisque habitation ajoute la protection de vos biens, le vol, et surtout la responsabilité civile vie privée, qui couvre les dommages que vous causez à autrui au quotidien.',
        ],
      },
      {
        h: 'Colocation et étudiants',
        p: [
          'En colocation, vérifiez que tous les colocataires sont bien assurés, ensemble ou chacun de son côté. Les étudiants trouvent souvent des offres dédiées à petit prix.',
        ],
      },
    ],
  },
  {
    slug: 'rc-pro-freelance',
    profile: 'Freelance',
    title: 'RC Pro : en avez-vous besoin ?',
    body: 'Obligatoire pour certaines professions réglementées, vivement conseillée pour toutes les autres.',
    metaDescription:
      'Freelance ou auto-entrepreneur : quand la RC Pro est obligatoire, ce qu’elle couvre et comment choisir son contrat.',
    categories: ['pro'],
    color: '#9bb4c4',
    ink: '#13232d',
    size: 'sm',
    readingTime: 3,
    sections: [
      {
        h: 'Quand elle est obligatoire',
        p: [
          'La responsabilité civile professionnelle est imposée par la loi pour de nombreuses professions réglementées : santé, droit, immobilier, expertise comptable, conseil en investissement… Les métiers du bâtiment doivent en plus souscrire une garantie décennale.',
        ],
      },
      {
        h: 'Pourquoi tous les freelances devraient l’envisager',
        p: [
          'Un bug qui bloque le site d’un client, un conseil erroné, un fichier perdu : une erreur professionnelle peut engager votre responsabilité, et les montants réclamés peuvent dépasser votre chiffre d’affaires annuel.',
          'Beaucoup de grands comptes demandent d’ailleurs une attestation RC Pro avant de signer un contrat.',
        ],
      },
      {
        h: 'Bien choisir',
        p: [
          'Vérifiez que l’activité décrite au contrat correspond exactement à ce que vous faites, que les plafonds sont cohérents avec vos contrats clients, et regardez les options utiles : protection juridique, cyber-risques.',
        ],
      },
    ],
  },
  {
    slug: 'mutuelle-famille',
    profile: 'Famille',
    title: 'Une mutuelle pour toute la tribu',
    body: 'Comparez l’optique, le dentaire et l’orthodontie : ce sont les postes qui comptent le plus avec des enfants.',
    metaDescription:
      'Choisir une mutuelle santé familiale : les postes à comparer (optique, dentaire, orthodontie), les tarifs enfants et les pièges à éviter.',
    categories: ['sante'],
    color: '#e7b7a3',
    ink: '#3a1d12',
    size: 'md',
    readingTime: 3,
    sections: [
      {
        h: 'Les postes qui comptent',
        p: [
          'Avec des enfants, trois postes pèsent lourd : l’optique (les verres changent souvent), le dentaire et surtout l’orthodontie, dont une partie importante n’est pas remboursée par l’Assurance Maladie après 16 ans.',
          'Pensez aussi aux consultations de spécialistes et aux médecines douces si vous y avez recours.',
        ],
      },
      {
        h: 'Le tarif famille',
        p: [
          'Beaucoup de mutuelles offrent la gratuité à partir du troisième enfant, ou un tarif famille forfaitaire. Comparez le prix total du foyer plutôt que le tarif par personne.',
        ],
      },
      {
        h: 'Mutuelle d’entreprise',
        p: [
          'Si l’un des parents bénéficie d’une mutuelle d’entreprise, vérifiez s’il peut y rattacher le reste de la famille : c’est souvent la solution la plus économique, car l’employeur en finance une partie.',
        ],
      },
    ],
  },
  {
    slug: 'equipement-motard',
    profile: 'Motard',
    title: 'Bien couvrir son équipement',
    body: 'Casque, blouson, gants : vérifiez le plafond de la garantie équipement et la garantie du pilote.',
    metaDescription:
      'Assurance moto : comment bien assurer son équipement (casque, blouson, gants) et pourquoi la garantie du pilote est indispensable.',
    categories: ['moto'],
    color: '#e2b65c',
    ink: '#2b1a10',
    size: 'sm',
    readingTime: 3,
    sections: [
      {
        h: 'L’équipement coûte cher',
        p: [
          'Casque, blouson, gants, bottes, pantalon, airbag : un équipement complet dépasse vite plusieurs centaines d’euros. En cas de chute, il est souvent à remplacer, notamment le casque.',
          'La garantie équipement est généralement une option. Vérifiez son plafond, la vétusté appliquée et les justificatifs demandés (gardez vos factures).',
        ],
      },
      {
        h: 'La garantie du pilote, indispensable',
        p: [
          'La responsabilité civile ne couvre jamais vos propres blessures. Si vous chutez seul ou êtes responsable, seule la garantie du pilote vous indemnise. À moto, c’est la garantie la plus importante.',
        ],
      },
      {
        h: 'Rappel des obligations',
        p: [
          'En France, le casque homologué et les gants certifiés sont obligatoires pour le conducteur et le passager.',
        ],
      },
    ],
  },
  {
    slug: 'assurance-vie-bons-reflexes',
    profile: 'Épargnant',
    title: 'Assurance vie : les bons réflexes',
    body: 'Regardez les frais sur versements et de gestion, et la part d’unités de compte selon votre horizon.',
    metaDescription:
      'Ouvrir une assurance vie : les frais à comparer, fonds euros ou unités de compte, et les règles à connaître avant de se lancer.',
    categories: ['vie'],
    color: '#6e4a5e',
    ink: '#fbf1f6',
    size: 'lg',
    readingTime: 4,
    sections: [
      {
        h: 'Les frais avant tout',
        p: [
          'Trois types de frais réduisent votre rendement : les frais sur versements, les frais de gestion annuels et les frais d’arbitrage. Sur une longue durée, un écart de 0,5 % par an fait une vraie différence.',
          'Les contrats distribués en ligne affichent souvent des frais plus bas que les contrats en agence.',
        ],
      },
      {
        h: 'Fonds en euros ou unités de compte ?',
        p: [
          'Le fonds en euros garantit votre capital (hors frais) mais son rendement est limité. Les unités de compte offrent plus de potentiel, avec un risque de perte.',
          'Plus votre horizon est long, plus vous pouvez accepter une part d’unités de compte. Pour un projet à court terme, privilégiez la sécurité.',
        ],
      },
      {
        h: 'Prendre date tôt',
        p: [
          'La fiscalité devient plus avantageuse après 8 ans de détention du contrat. Ouvrir un contrat tôt, même avec un petit versement, permet de prendre date.',
        ],
      },
      {
        h: 'Soigner la clause bénéficiaire',
        p: [
          'C’est elle qui désigne qui recevra le capital. La clause standard (« mon conjoint, à défaut mes enfants… ») ne convient pas à toutes les situations : relisez-la à chaque événement de vie.',
          'Les règles fiscales évoluent : vérifiez toujours les règles en vigueur avant une décision importante.',
        ],
      },
    ],
  },
]

export const guidePath = (g: Guide) => `/guides/${g.slug}`
