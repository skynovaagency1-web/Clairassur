import { ArrowLeft } from 'lucide-react'
import { useEffect, type ReactNode } from 'react'
import { site } from '../config'
import { legalPages, type LegalPage } from '../legal'
import { Logo } from './Logo'


const c = site.company

export function Legal({ page }: { page: LegalPage }) {
  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = `${legalPages[page]} · Clairassur`
    return () => {
      document.title = 'Clairassur · L’annuaire de l’assurance en France'
    }
  }, [page])

  return (
    <div className="min-h-screen bg-ivory">
      <header className="border-b border-espresso/10 px-4 py-5">
        <div className="mx-auto flex max-w-3xl items-center justify-between">
          <Logo />
          <a href="#top" className="flex items-center gap-1.5 text-sm font-semibold text-terra">
            <ArrowLeft className="size-4" /> Retour au site
          </a>
        </div>
      </header>
      <main className="mx-auto max-w-3xl px-4 py-16">
        <h1 className="font-serif text-5xl tracking-tight">{legalPages[page]}</h1>
        <p className="mt-3 text-sm text-espresso/50">Dernière mise à jour : 1er novembre 2026</p>
        <div className="mt-10 space-y-8 leading-relaxed text-espresso/80 [&_a]:text-terra [&_a]:underline [&_h2]:mb-3 [&_h2]:font-serif [&_h2]:text-2xl [&_h2]:text-espresso [&_li]:ml-5 [&_li]:list-disc [&_p+p]:mt-3">
          {page === 'mentions-legales' && <Mentions />}
          {page === 'confidentialite' && <Privacy />}
          {page === 'partenaires' && <Partners />}
        </div>
        <nav className="mt-16 flex flex-wrap gap-4 border-t border-espresso/10 pt-6 text-sm">
          {Object.entries(legalPages).map(([k, v]) => (
            <a key={k} href={`#/${k}`} className={k === page ? 'font-semibold' : 'text-espresso/60 hover:text-espresso'}>
              {v}
            </a>
          ))}
        </nav>
      </main>
    </div>
  )
}

const S = ({ title, children }: { title: string; children: ReactNode }) => (
  <section>
    <h2>{title}</h2>
    {children}
  </section>
)

function Mentions() {
  return (
    <>
      <S title="Éditeur du site">
        <p>
          Le site {site.url} est édité par {c.legalName}, {c.legalForm}
          {c.capital && `, au capital de ${c.capital}`}, dont le siège est situé {c.address}.
        </p>
        <ul className="mt-3 space-y-1">
          <li>SIRET : {c.siret}</li>
          <li>RCS : {c.rcs}</li>
          <li>TVA : {c.vat}</li>
          <li>Directeur de la publication : {c.director}</li>
          <li>
            Contact : <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>
          </li>
          {c.orias && (
            <li>
              Immatriculation ORIAS n° {c.orias} (vérifiable sur <a href="https://www.orias.fr">orias.fr</a>)
            </li>
          )}
        </ul>
      </S>
      <S title="Hébergement">
        <p>
          Le site est hébergé par {site.host.name}, {site.host.address} (<a href={site.host.website}>{site.host.website}</a>).
        </p>
      </S>
      <S title="Activité">
        <p>
          Clairassur est un annuaire d’information sur l’assurance en France. Clairassur n’est pas un assureur et ne
          conclut aucun contrat. Les informations publiées sont indicatives : seuls les documents contractuels de
          l’assureur font foi.
        </p>
        {c.orias ? (
          <p>
            Clairassur est immatriculé à l’ORIAS sous le n° {c.orias}. Autorité de contrôle : ACPR, 4 place de Budapest,
            CS 92459, 75436 Paris Cedex 09.
          </p>
        ) : null}
      </S>
      <S title="Propriété intellectuelle">
        <p>
          Les contenus de ce site (textes, graphismes, logo) sont la propriété de l’éditeur, sauf mention contraire. Les
          noms et marques des assureurs cités appartiennent à leurs propriétaires respectifs et ne sont utilisés qu’à des
          fins d’identification.
        </p>
      </S>
      <S title="Réclamations et médiation">
        <p>
          Pour toute réclamation, écrivez à <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>. Nous
          répondons sous 10 jours ouvrés.
        </p>
      </S>
    </>
  )
}

function Privacy() {
  return (
    <>
      <S title="Responsable du traitement">
        <p>
          {c.legalName}, {c.address}. Contact : <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>.
        </p>
      </S>
      <S title="Données collectées et finalités">
        <ul className="space-y-2">
          <li>
            <b>Demande de devis</b> : type d’assurance, prénom, nom, e-mail, téléphone, code postal et message. Finalité :
            transmettre votre demande à des conseillers partenaires pour qu’ils vous recontactent. Base légale : votre
            consentement.
          </li>
          <li>
            <b>Newsletter</b> : adresse e-mail. Finalité : vous envoyer notre lettre d’information. Base légale : votre
            consentement, retirable via le lien de désinscription présent dans chaque e-mail.
          </li>
          <li>
            <b>Épingles</b> : les assureurs que vous épinglez sont enregistrés uniquement dans votre navigateur et ne nous
            sont pas transmis.
          </li>
        </ul>
      </S>
      <S title="Destinataires">
        <p>
          Vos données sont accessibles à l’éditeur et, pour les demandes de devis, aux conseillers partenaires à qui votre
          demande est transmise. Nos sous-traitants techniques sont Cloudflare (hébergement) et Brevo (envoi d’e-mails,
          France). Vos données ne sont pas vendues à des tiers sans votre consentement.
        </p>
      </S>
      <S title="Durée de conservation">
        <p>
          Demandes de devis : 3 ans à compter du dernier contact. Newsletter : jusqu’à votre désinscription.
        </p>
      </S>
      <S title="Cookies et mesure d’audience">
        <p>
          Ce site ne dépose pas de cookie publicitaire. La mesure d’audience, si elle est activée, utilise Cloudflare Web
          Analytics, qui ne dépose pas de cookie et ne suit pas les visiteurs d’un site à l’autre.
        </p>
      </S>
      <S title="Vos droits">
        <p>
          Vous disposez d’un droit d’accès, de rectification, d’effacement, d’opposition, de limitation et de portabilité
          de vos données. Écrivez-nous à <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>. Vous pouvez
          aussi introduire une réclamation auprès de la <a href="https://www.cnil.fr">CNIL</a>.
        </p>
      </S>
    </>
  )
}

function Partners() {
  return (
    <>
      <S title="Comment Clairassur est financé">
        <p>
          Clairassur est gratuit pour vous. Pour financer le site, nous pouvons être rémunérés par certains partenaires :
        </p>
        <ul className="mt-3 space-y-2">
          <li>
            <b>Fiches sponsorisées</b> : certains acteurs paient pour être mis en avant. Ces fiches portent toujours la
            mention « Sponsorisé ».
          </li>
          <li>
            <b>Liens partenaires</b> : lorsque vous cliquez vers le site d’un partenaire et demandez un devis ou souscrivez,
            nous pouvons percevoir une rémunération. Cela ne change pas le prix que vous payez.
          </li>
          <li>
            <b>Demandes de devis</b> : votre demande, avec votre accord, est transmise à des conseillers partenaires qui
            peuvent nous rémunérer pour ce service.
          </li>
        </ul>
      </S>
      <S title="Notre engagement">
        <p>
          Les contenus éditoriaux (descriptions, guides) ne sont pas rédigés par les partenaires. L’ordre d’affichage hors
          fiches sponsorisées ne constitue ni un classement ni une recommandation. Clairassur ne présente pas une analyse
          exhaustive du marché.
        </p>
      </S>
    </>
  )
}
