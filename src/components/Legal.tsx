import type { ReactNode } from 'react'
import { Link } from 'react-router'
import { site } from '../config'
import { PageIntro } from './PageIntro'
import { Section } from './ui'

export type LegalPage = 'mentions-legales' | 'cgu' | 'confidentialite' | 'partenaires'

export const legalPages: Record<LegalPage, string> = {
  'mentions-legales': 'Mentions légales',
  cgu: 'Conditions générales d’utilisation',
  confidentialite: 'Politique de confidentialité',
  partenaires: 'Partenaires et rémunération',
}

const c = site.company

export function Legal({ page }: { page: LegalPage }) {
  return (
    <>
      <PageIntro crumbs={[{ label: legalPages[page] }]} label="Dernière mise à jour · 2 novembre 2026" title={legalPages[page]} />
      <Section className="pt-0!">
        <div className="glass max-w-3xl space-y-10 p-6 leading-relaxed text-ink/90 sm:p-10 [&_a]:text-taupe-deep [&_a]:underline [&_h2]:mb-3 [&_h2]:font-serif [&_h2]:text-[1.9rem] [&_h2]:font-medium [&_h2]:text-ink [&_li]:ml-5 [&_li]:list-disc [&_p+p]:mt-3">
          {page === 'mentions-legales' && <Mentions />}
          {page === 'cgu' && <Terms />}
          {page === 'confidentialite' && <Privacy />}
          {page === 'partenaires' && <Partners />}
        </div>
        <nav aria-label="Pages légales" className="mt-8 flex flex-wrap gap-2">
          {(Object.keys(legalPages) as LegalPage[]).map((k) => (
            <Link key={k} to={`/${k}`} aria-current={k === page ? 'page' : undefined} className={`pill ${k === page ? 'pill-sand' : 'pill-clear'}`}>
              {legalPages[k]}
            </Link>
          ))}
        </nav>
      </Section>
    </>
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
          Lumassur est un annuaire d’information sur l’assurance en France. Lumassur n’est pas un assureur et ne
          conclut aucun contrat. Les informations publiées sont indicatives : seuls les documents contractuels de
          l’assureur font foi.
        </p>
        {c.orias ? (
          <p>
            Lumassur est immatriculé à l’ORIAS sous le n° {c.orias}. Autorité de contrôle : ACPR, 4 place de Budapest,
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
          demande est transmise. Nos sous-traitants techniques sont Cloudflare (hébergement du site et stockage des demandes,
          base de données située en Europe de l’Ouest) et Brevo (envoi d’e-mails, France). Cloudflare est une société
          américaine : les éventuels transferts hors de l’Union européenne sont encadrés par les clauses contractuelles
          types de la Commission européenne et le Data Privacy Framework. Vos données ne sont pas vendues à des tiers sans votre consentement.
        </p>
      </S>
      <S title="Durée de conservation">
        <p>
          Demandes de devis et messages : 3 ans, puis suppression automatique. Newsletter : jusqu’à votre
          désinscription.
        </p>
      </S>
      <S title="Cookies et mesure d’audience">
        <p>
          {site.monetize.adsense.client
            ? 'Ce site affiche des publicités Google AdSense. Google et ses partenaires peuvent utiliser des cookies pour diffuser et mesurer ces annonces, uniquement avec votre consentement recueilli via le bandeau prévu à cet effet. Vous pouvez modifier votre choix à tout moment depuis ce bandeau.'
            : 'Ce site ne dépose pas de cookie publicitaire.'}{' '}
          La mesure d’audience, si elle est activée, utilise Cloudflare Web Analytics, qui ne dépose pas de cookie et ne
          suit pas les visiteurs d’un site à l’autre. Les liens partenaires peuvent mener à des sites tiers qui appliquent
          leur propre politique de cookies.
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

function Terms() {
  return (
    <>
      <S title="Objet">
        <p>
          Les présentes conditions encadrent l’utilisation du site {site.url}, édité par {c.legalName}. En utilisant le
          site, vous les acceptez. Elles peuvent être modifiées à tout moment ; la version en ligne fait foi.
        </p>
      </S>
      <S title="Le service">
        <p>
          Lumassur est un annuaire d’information gratuit sur les assureurs et les assurances en France. Lumassur
          n’est pas un assureur, ne vend aucun contrat et ne donne pas de conseil personnalisé au sens du Code des
          assurances. Les demandes de devis sont transmises, avec votre accord, à des conseillers partenaires qui vous
          recontactent directement.
        </p>
      </S>
      <S title="Informations publiées">
        <p>
          Nous faisons notre possible pour tenir les informations à jour, mais elles sont fournies à titre indicatif :
          garanties, tarifs et conditions évoluent. Avant de souscrire, vérifiez toujours les documents contractuels de
          l’assureur (conditions générales, document d’information normalisé). Les prix « à partir de » sont des
          exemples et ne constituent pas une offre.
        </p>
      </S>
      <S title="Utilisation du site">
        <ul className="space-y-2">
          <li>Vous vous engagez à fournir des informations exactes dans les formulaires.</li>
          <li>
            Il est interdit d’envoyer des demandes pour le compte d’un tiers sans son accord, de perturber le site ou
            d’en extraire le contenu de manière automatisée.
          </li>
          <li>Nous pouvons suspendre l’accès au site pour maintenance ou en cas d’usage abusif.</li>
        </ul>
      </S>
      <S title="Liens et partenaires">
        <p>
          Le site contient des liens vers des sites tiers, dont certains sont des liens partenaires (voir{' '}
          <Link to="/partenaires">Partenaires et rémunération</Link>). Nous ne sommes pas responsables du contenu de ces
          sites ni des contrats que vous y concluez.
        </p>
      </S>
      <S title="Responsabilité">
        <p>
          Lumassur ne peut être tenu responsable d’un choix d’assurance fait sur la base des informations du site, ni
          d’une indisponibilité temporaire du service. Le contrat que vous signez vous lie uniquement à l’assureur ou
          à l’intermédiaire concerné.
        </p>
      </S>
      <S title="Données personnelles">
        <p>
          Le traitement de vos données est décrit dans notre <Link to="/confidentialite">politique de confidentialité</Link>.
        </p>
      </S>
      <S title="Droit applicable">
        <p>
          Ces conditions sont soumises au droit français. En cas de litige, une solution amiable sera recherchée en
          priorité ; à défaut, les tribunaux français sont compétents. Contact :{' '}
          <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>.
        </p>
      </S>
    </>
  )
}

function Partners() {
  return (
    <>
      <S title="Comment Lumassur est financé">
        <p>
          Lumassur est gratuit pour vous. Pour financer le site, nous pouvons être rémunérés par certains partenaires :
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
            <b>Publicité</b> : des annonces, signalées par la mention « Publicité », peuvent être affichées sur certaines
            pages. Elles sont choisies par la régie publicitaire, pas par Lumassur.
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
          fiches sponsorisées ne constitue ni un classement ni une recommandation. Lumassur ne présente pas une analyse
          exhaustive du marché.
        </p>
      </S>
    </>
  )
}
