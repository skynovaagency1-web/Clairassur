import type { CategoryId } from '../data'
import type { photos } from './photos'
type PhotoKey = keyof typeof photos

export type CategoryPage = {
  slug: string
  title: string
  metaTitle: string
  metaDescription: string
  intro: string[]
  mandatory: string
  guarantees: { name: string; text: string }[]
  tips: string[]
  faq: { q: string; a: string }[]
}

export const categoryPages: Record<CategoryId, CategoryPage> = {
  auto: {
    slug: 'assurance-auto',
    title: 'Assurance auto',
    metaTitle: 'Assurance auto : formules, garanties et assureurs en France',
    metaDescription:
      'Tiers, intermédiaire ou tous risques : comprendre l’assurance auto, les garanties essentielles et découvrir les assureurs auto en France.',
    intro: [
      'En France, tout véhicule terrestre à moteur doit être assuré, même s’il ne roule pas. L’assurance auto couvre au minimum les dommages que vous causez aux autres : c’est la responsabilité civile.',
      'Au-delà de ce minimum, chaque formule ajoute des protections pour votre propre véhicule et pour vous. Le bon choix dépend de la valeur de votre voiture, de votre usage et de votre budget.',
    ],
    mandatory:
      'Obligatoire : la responsabilité civile (article L211-1 du Code des assurances). Rouler sans assurance est un délit.',
    guarantees: [
      { name: 'Responsabilité civile', text: 'Indemnise les dommages matériels et corporels causés à des tiers. C’est le socle de toutes les formules.' },
      { name: 'Formule au tiers', text: 'La responsabilité civile seule, souvent avec la défense pénale. Adaptée aux véhicules anciens ou de faible valeur.' },
      { name: 'Formule intermédiaire', text: 'Le tiers plus des garanties comme le bris de glace, le vol et l’incendie.' },
      { name: 'Tous risques', text: 'Couvre aussi les dommages à votre véhicule, même si vous êtes responsable ou sans tiers identifié.' },
      { name: 'Garantie du conducteur', text: 'Indemnise vos propres blessures si vous êtes responsable. Elle n’est pas toujours incluse : vérifiez-la.' },
      { name: 'Assistance', text: 'Dépannage, remorquage, véhicule de remplacement. Regardez la franchise kilométrique (0 km, 25 km, 50 km).' },
    ],
    tips: [
      'Comparez les franchises autant que les prix : une prime basse cache parfois une franchise élevée.',
      'Votre coefficient bonus-malus suit votre historique : il baisse de 5 % par an sans sinistre responsable, jusqu’à 0,50.',
      'Jeune conducteur : la conduite accompagnée réduit la surprime de la première année.',
      'Après un an de contrat, la loi Hamon vous permet de changer d’assureur à tout moment, et le nouvel assureur s’occupe de la résiliation.',
    ],
    faq: [
      { q: 'L’assurance auto est-elle obligatoire si je ne roule pas ?', a: 'Oui. Un véhicule en état de circuler doit être assuré au minimum en responsabilité civile, même s’il reste au garage, sauf s’il est déclaré hors d’usage.' },
      { q: 'Quelle formule choisir pour une voiture ancienne ?', a: 'Pour un véhicule de faible valeur, une formule au tiers ou intermédiaire suffit souvent : une indemnisation tous risques serait limitée à la valeur du véhicule.' },
      { q: 'Peut-on changer d’assurance auto en cours d’année ?', a: 'Oui, après un an de contrat grâce à la loi Hamon, sans frais ni justification. Avant un an, seuls certains motifs (vente du véhicule, déménagement…) le permettent.' },
    ],
  },
  habitation: {
    slug: 'assurance-habitation',
    title: 'Assurance habitation',
    metaTitle: 'Assurance habitation : locataire, propriétaire, garanties et assureurs',
    metaDescription:
      'Ce qui est obligatoire pour un locataire ou un copropriétaire, les garanties de la multirisque habitation et les assureurs habitation en France.',
    intro: [
      'L’assurance habitation protège votre logement, vos biens et votre responsabilité civile vie privée. La plupart des contrats sont des « multirisques habitation » qui regroupent ces garanties.',
      'Les obligations dépendent de votre situation : locataire, propriétaire occupant, copropriétaire ou propriétaire bailleur.',
    ],
    mandatory:
      'Obligatoire pour les locataires (risques locatifs) et pour les copropriétaires (responsabilité civile, loi ALUR). Fortement conseillée dans tous les autres cas.',
    guarantees: [
      { name: 'Risques locatifs', text: 'Couvre les dommages que le locataire cause au logement (incendie, dégâts des eaux, explosion). Le bailleur peut demander l’attestation chaque année.' },
      { name: 'Dégâts des eaux', text: 'Le sinistre le plus fréquent : fuite, infiltration, débordement. Vérifiez les exclusions (joints, défaut d’entretien).' },
      { name: 'Incendie et explosion', text: 'Indemnise la reconstruction ou la remise en état et le remplacement de vos biens.' },
      { name: 'Vol et vandalisme', text: 'Souvent soumis à des conditions de protection (serrure, volets) : lisez-les avant de signer.' },
      { name: 'Catastrophes naturelles', text: 'Incluse d’office dès lors qu’un arrêté de catastrophe naturelle est publié pour votre commune.' },
      { name: 'Responsabilité civile vie privée', text: 'Couvre les dommages que vous ou vos enfants causez à autrui dans la vie quotidienne.' },
    ],
    tips: [
      'Estimez la valeur de vos biens : un capital mobilier trop bas réduit l’indemnisation.',
      'Préférez une indemnisation en valeur à neuf si vos biens sont récents.',
      'Étudiants et colocataires : il existe des offres dédiées, souvent moins chères.',
      'Après un an, vous pouvez résilier à tout moment avec la loi Hamon.',
    ],
    faq: [
      { q: 'Un locataire doit-il obligatoirement s’assurer ?', a: 'Oui. La loi du 6 juillet 1989 impose au locataire d’un logement vide de s’assurer contre les risques locatifs. Sans attestation, le bailleur peut souscrire une assurance pour son compte et la refacturer.' },
      { q: 'Et pour un propriétaire ?', a: 'Un propriétaire qui occupe une maison individuelle n’a pas d’obligation légale, mais c’est fortement recommandé. En copropriété, la responsabilité civile est obligatoire depuis la loi ALUR.' },
      { q: 'Qu’est-ce qu’une multirisque habitation ?', a: 'C’est un contrat qui regroupe les garanties essentielles : dommages au logement et aux biens, vol, responsabilité civile vie privée et souvent assistance.' },
    ],
  },
  sante: {
    slug: 'mutuelle-sante',
    title: 'Mutuelle santé',
    metaTitle: 'Mutuelle santé : bien choisir sa complémentaire et les mutuelles en France',
    metaDescription:
      '100 % Santé, contrat responsable, mutuelle d’entreprise : tout comprendre de la complémentaire santé et découvrir les mutuelles en France.',
    intro: [
      'La complémentaire santé, souvent appelée « mutuelle », rembourse tout ou partie des frais de santé qui restent à votre charge après le remboursement de l’Assurance Maladie.',
      'Les besoins varient beaucoup selon l’âge et la situation familiale : optique et orthodontie pour les familles, hospitalisation et audiologie avec l’âge.',
    ],
    mandatory:
      'Pas obligatoire pour les particuliers. Les employeurs du privé doivent proposer une mutuelle d’entreprise et en financer au moins 50 %.',
    guarantees: [
      { name: 'Hospitalisation', text: 'Forfait journalier, chambre particulière, dépassements d’honoraires des chirurgiens.' },
      { name: 'Soins courants', text: 'Consultations, analyses, pharmacie. Les remboursements s’expriment souvent en % de la base de remboursement (BR).' },
      { name: 'Optique', text: 'Lunettes et lentilles. Le panier 100 % Santé permet un équipement sans reste à charge.' },
      { name: 'Dentaire', text: 'Couronnes, implants, orthodontie. Le poste où les écarts entre contrats sont les plus grands.' },
      { name: 'Aides auditives', text: 'Couvertes intégralement sur le panier 100 % Santé.' },
      { name: 'Médecines douces', text: 'Ostéopathie, psychologie, diététique : souvent un forfait annuel par séance.' },
    ],
    tips: [
      'Lisez les niveaux en % de la BR : 100 % BR ne rembourse que le tarif de la Sécurité sociale, pas les dépassements.',
      'Vérifiez les délais de carence avant de souscrire.',
      'Petits revenus : vérifiez votre éligibilité à la Complémentaire santé solidaire (C2S).',
      'Après un an, vous pouvez résilier votre complémentaire à tout moment.',
    ],
    faq: [
      { q: 'Qu’est-ce qu’un contrat responsable ?', a: 'Un contrat qui respecte des planchers et plafonds de remboursement fixés par la loi, en échange d’avantages fiscaux. La grande majorité des contrats le sont.' },
      { q: 'Que couvre le 100 % Santé ?', a: 'Un ensemble d’équipements en optique, dentaire et audiologie remboursés intégralement par l’Assurance Maladie et la complémentaire, sans reste à charge.' },
      { q: 'Puis-je refuser la mutuelle de mon entreprise ?', a: 'Seulement dans certains cas de dispense prévus par la loi (CDD courts, couverture par le contrat du conjoint, C2S…). Renseignez-vous auprès de votre employeur.' },
    ],
  },
  vie: {
    slug: 'assurance-vie',
    title: 'Assurance vie',
    metaTitle: 'Assurance vie : fonds euros, unités de compte et assureurs en France',
    metaDescription:
      'Épargner, préparer sa retraite ou transmettre : comprendre l’assurance vie, ses supports et sa fiscalité, et découvrir les assureurs vie en France.',
    intro: [
      'L’assurance vie est le placement préféré des Français. C’est un contrat d’épargne qui permet de faire fructifier un capital, de le récupérer à tout moment et de le transmettre dans un cadre fiscal avantageux.',
      'Votre argent est placé sur des fonds en euros (capital garanti) et/ou des unités de compte (plus de potentiel, mais un risque de perte).',
    ],
    mandatory: 'Facultative. C’est un placement : le capital investi en unités de compte n’est pas garanti.',
    guarantees: [
      { name: 'Fonds en euros', text: 'Capital garanti par l’assureur (hors frais), rendement annuel versé sur le contrat.' },
      { name: 'Unités de compte', text: 'Actions, obligations, immobilier, ETF. Rendement potentiel plus élevé, avec un risque de perte en capital.' },
      { name: 'Gestion libre ou pilotée', text: 'Vous choisissez vos supports, ou vous confiez la répartition à un gestionnaire selon votre profil.' },
      { name: 'Rachats', text: 'Votre épargne reste disponible : vous pouvez retirer tout ou partie à tout moment.' },
      { name: 'Clause bénéficiaire', text: 'Désigne qui recevra le capital à votre décès. Rédigez-la avec soin et mettez-la à jour.' },
    ],
    tips: [
      'Comparez les frais : sur versements, de gestion annuels et d’arbitrage. Sur 20 ans, ils pèsent lourd.',
      'Ouvrez un contrat tôt : l’antériorité fiscale démarre à l’ouverture, même avec un petit versement.',
      'Adaptez la part d’unités de compte à votre horizon de placement et à votre tolérance au risque.',
      'La fiscalité change parfois : vérifiez les règles en vigueur sur service-public.fr ou auprès de l’assureur.',
    ],
    faq: [
      { q: 'L’argent est-il bloqué ?', a: 'Non. Vous pouvez faire des retraits (rachats partiels) ou récupérer tout votre capital à tout moment. La fiscalité est simplement plus avantageuse après 8 ans.' },
      { q: 'Quel avantage après 8 ans ?', a: 'Lors d’un retrait, les gains bénéficient d’un abattement annuel (4 600 € pour une personne seule, 9 200 € pour un couple, selon les règles en vigueur).' },
      { q: 'Et pour la transmission ?', a: 'Les sommes versées avant 70 ans bénéficient d’un abattement de 152 500 € par bénéficiaire, selon les règles actuelles. Après 70 ans, un régime différent s’applique.' },
    ],
  },
  moto: {
    slug: 'assurance-moto',
    title: 'Assurance moto',
    metaTitle: 'Assurance moto et scooter : garanties, équipement et assureurs',
    metaDescription:
      'Garantie du pilote, équipement, vol : bien assurer sa moto ou son scooter et découvrir les assureurs deux-roues en France.',
    intro: [
      'Comme pour une voiture, toute moto, tout scooter et tout cyclomoteur doit être assuré, même à l’arrêt. Mais les deux-roues ont des besoins spécifiques : le pilote est plus exposé, et l’équipement coûte cher.',
      'Les assureurs spécialisés proposent des garanties pensées pour les motards, comme la couverture de l’équipement ou les formules hivernage.',
    ],
    mandatory: 'Obligatoire : la responsabilité civile, pour tout deux-roues motorisé, y compris les scooters 50 cm³.',
    guarantees: [
      { name: 'Responsabilité civile', text: 'Couvre les dommages causés aux autres. Elle ne couvre pas vos propres blessures.' },
      { name: 'Garantie du pilote', text: 'Essentielle à moto : elle indemnise vos blessures si vous êtes responsable ou seul en cause.' },
      { name: 'Équipement du motard', text: 'Casque, blouson, gants, bottes. Vérifiez le plafond et la vétusté appliquée.' },
      { name: 'Vol et incendie', text: 'Souvent conditionné à un antivol homologué SRA. Lisez les conditions.' },
      { name: 'Dommages tous accidents', text: 'Répare votre moto même si vous êtes responsable. Utile pour une moto récente.' },
      { name: 'Assistance', text: 'Dépannage en cas de panne ou d’accident, rapatriement.' },
    ],
    tips: [
      'Ne faites pas l’impasse sur la garantie du pilote : c’est la plus importante pour un motard.',
      'Rouler peu l’hiver ? Certains contrats proposent une suspension ou une formule hivernage.',
      'Le casque homologué et les gants certifiés sont obligatoires en France.',
      'Comme en auto, la loi Hamon permet de changer d’assureur après un an.',
    ],
    faq: [
      { q: 'Un scooter 50 cm³ doit-il être assuré ?', a: 'Oui. Tout véhicule à moteur, quelle que soit sa cylindrée, doit être assuré au minimum en responsabilité civile.' },
      { q: 'Mes blessures sont-elles couvertes si je chute seul ?', a: 'Seulement si vous avez une garantie du pilote (ou garantie corporelle du conducteur). La responsabilité civile ne couvre que les autres.' },
      { q: 'Mon équipement est-il couvert ?', a: 'Pas toujours. Beaucoup de contrats proposent une garantie équipement en option, avec un plafond : vérifiez qu’il correspond à la valeur de votre tenue.' },
    ],
  },
  pro: {
    slug: 'assurance-professionnelle',
    title: 'Assurance professionnelle',
    metaTitle: 'Assurance professionnelle : RC Pro, multirisque et assureurs pros',
    metaDescription:
      'RC Pro, décennale, multirisque, prévoyance : quelles assurances pour les indépendants, TPE et PME, et quels assureurs en France.',
    intro: [
      'Une erreur, un accident chez un client ou un sinistre dans vos locaux peut coûter très cher à une entreprise. Les assurances professionnelles protègent votre activité, vos biens et vos revenus.',
      'Certaines sont obligatoires selon votre métier. D’autres sont fortement conseillées, même pour un freelance qui travaille seul.',
    ],
    mandatory:
      'Obligatoire pour de nombreuses professions réglementées (santé, droit, immobilier, expertise comptable…) et la garantie décennale pour les métiers du bâtiment.',
    guarantees: [
      { name: 'Responsabilité civile professionnelle', text: 'Couvre les dommages causés à vos clients ou à des tiers dans le cadre de votre activité.' },
      { name: 'Garantie décennale', text: 'Obligatoire pour les constructeurs et artisans du bâtiment : couvre pendant 10 ans les dommages graves à l’ouvrage.' },
      { name: 'Multirisque professionnelle', text: 'Protège vos locaux, matériel et stocks (incendie, dégâts des eaux, vol) et peut inclure la perte d’exploitation.' },
      { name: 'Protection juridique', text: 'Prend en charge les frais de défense en cas de litige avec un client, un fournisseur ou un salarié.' },
      { name: 'Cyber-risques', text: 'Couvre les conséquences d’un piratage ou d’une fuite de données.' },
      { name: 'Prévoyance', text: 'Maintient vos revenus en cas d’arrêt de travail ou d’invalidité. Essentielle pour les indépendants.' },
    ],
    tips: [
      'Vérifiez si votre métier impose une assurance : votre ordre ou votre fédération professionnelle peut vous renseigner.',
      'Artisans : indiquez votre assurance obligatoire sur vos devis et factures.',
      'Freelance : beaucoup de clients exigent une attestation RC Pro avant de signer.',
      'Comparez les plafonds de garantie avec les montants de vos contrats clients.',
    ],
    faq: [
      { q: 'La RC Pro est-elle obligatoire pour un auto-entrepreneur ?', a: 'Pas pour toutes les activités. Elle l’est pour les professions réglementées et le bâtiment (décennale), mais reste vivement conseillée pour toutes les autres.' },
      { q: 'Quelle différence entre RC Pro et multirisque ?', a: 'La RC Pro couvre les dommages que vous causez aux autres. La multirisque couvre vos propres biens professionnels : locaux, matériel, stock.' },
      { q: 'Combien coûte une RC Pro ?', a: 'Cela dépend fortement du métier, du chiffre d’affaires et des plafonds choisis. Pour une activité de conseil, cela peut commencer à quelques centaines d’euros par an.' },
    ],
  },
}

export const categoryPath = (id: CategoryId) => `/${categoryPages[id].slug}`

/** Presentation for the offer cards. Prices are indicative starting points: check them before going live. */
export const offerMeta: Record<CategoryId, { tint: 'sand' | 'sage' | 'clay' | 'clear'; photo: PhotoKey; fromPrice?: string; label: string }> = {
  auto: { tint: 'clay', photo: 'car', fromPrice: '15 €', label: 'Mobilité' },
  habitation: { tint: 'sage', photo: 'living', fromPrice: '6 €', label: 'Chez soi' },
  sante: { tint: 'sand', photo: 'family', fromPrice: '20 €', label: 'Santé' },
  pro: { tint: 'clear', photo: 'desk', fromPrice: '12 €', label: 'Activité' },
  moto: { tint: 'clay', photo: 'moto', fromPrice: '10 €', label: 'Deux-roues' },
  vie: { tint: 'sage', photo: 'bedroom', label: 'Épargne' },
}
