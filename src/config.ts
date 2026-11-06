// Company details used by the legal pages and footer.
// Replace every "[À compléter]" before going live.
export const site = {
  name: 'Lumassur',
  /** Your domain: used for canonical URLs, the sitemap and structured data. */
  url: 'https://lumassur.fr',
  contactEmail: 'contact@lumassur.fr',
  company: {
    legalName: '[À compléter : raison sociale]',
    legalForm: '[À compléter : micro-entreprise, SAS…]',
    capital: '[À compléter, si société]',
    address: '[À compléter : adresse du siège]',
    siret: '[À compléter : SIRET]',
    rcs: '[À compléter : RCS, si société]',
    vat: '[À compléter : TVA intracommunautaire, si applicable]',
    director: '[À compléter : directeur de la publication]',
    /** Fill in once registered with ORIAS (required to earn insurance commissions). */
    orias: '',
  },
  /**
   * Monetisation. Leave a value empty and nothing shows for it.
   * - affiliate: tracking links from your affiliate network (Awin, Kwanko, Effiliation…) to an insurance
   *   comparator. Each "Devis gratuit" button sends visitors there. `default` is used when a type has no link.
   *   While every link is empty, the built-in quote form is used instead.
   * - adsense: your AdSense publisher id (ca-pub-…) and one display ad unit id.
   */
  monetize: {
    affiliate: {
      default: '',
      auto: '',
      habitation: '',
      sante: '',
      vie: '',
      moto: '',
      pro: '',
    } as Record<string, string>,
    adsense: { client: '', slot: '' },
  },
  host: {
    name: 'Cloudflare, Inc.',
    address: '101 Townsend St, San Francisco, CA 94107, États-Unis',
    website: 'https://www.cloudflare.com',
  },
}
