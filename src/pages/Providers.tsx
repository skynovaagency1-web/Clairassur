import { Directory } from '../components/Directory'
import { PageIntro } from '../components/PageIntro'
import { Section } from '../components/ui'
import { providers, type CategoryId } from '../data'
import { useQueryParams } from '../lib/search'

export function Providers() {
  const params = useQueryParams()
  const q = params.get('q') ?? ''
  const type = (params.get('type') ?? 'all') as CategoryId | 'all'
  return (
    <>
      <PageIntro crumbs={[{ label: 'Assureurs' }]} label={`Annuaire · ${providers.length} acteurs`} title="Tous les" em="assureurs.">
        <p>Assureurs historiques, mutuelles, néo-assureurs et spécialistes. Filtrez, épinglez, ouvrez une fiche.</p>
      </PageIntro>
      <Section className="pt-0!">
        {/* Remount when the URL search changes so the filters pick it up */}
        <Directory key={`${q}|${type}`} initialQuery={q} initialCategory={type} />
      </Section>
    </>
  )
}
