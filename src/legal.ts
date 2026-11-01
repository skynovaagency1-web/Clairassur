export type LegalPage = 'mentions-legales' | 'confidentialite' | 'partenaires'

export const legalPages: Record<LegalPage, string> = {
  'mentions-legales': 'Mentions légales',
  confidentialite: 'Politique de confidentialité',
  partenaires: 'Partenaires et rémunération',
}

export const isLegalPage = (s: string): s is LegalPage => s in legalPages
