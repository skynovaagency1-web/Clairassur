import { CtaPill, Mono, Pill } from '../components/ui'

export function NotFound() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-32 text-center">
      <Mono>Erreur 404</Mono>
      <h1 className="serif-display mt-5 text-[clamp(3rem,8vw,6rem)]">
        Page <em className="text-taupe">introuvable.</em>
      </h1>
      <p className="mt-5 text-muted">Cette page n’existe pas ou a été déplacée.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <CtaPill to="/">Retour à l’accueil</CtaPill>
        <Pill to="/assureurs" tint="sand">
          Voir les assureurs
        </Pill>
      </div>
    </section>
  )
}
