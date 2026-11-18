import { Link } from 'react-router-dom'
import { Inline, PageHero, Paragraphs, useCoordonnees, useSection } from '../lib/content'

export default function Membre() {
  const c = useSection('membre.page')
  const coord = useCoordonnees()
  const raisons = (c.raisons || []).map((r, i) => ({ ...r, num: String(i + 1).padStart(2, '0') }))
  return (
    <>
      <PageHero section="membre.page" crumb="Devenir Membre" icon="fas fa-fire" />

      {/* Intro */}
      <section className="section" style={{ paddingBottom: 0 }}>
        <div className="container" style={{ maxWidth: 800, textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'var(--fs)', fontSize: '1.6rem', marginBottom: '1rem', color: 'var(--blue-dark)' }}>
            {c.intro_titre}
          </h2>
          {c.intro_sous_titre && (
            <p style={{ fontSize: '.95rem', color: 'var(--text2)', lineHeight: 1.85, marginBottom: '.75rem' }}>
              <Inline text={c.intro_sous_titre} strongStyle={{ color: 'var(--text)' }} />
            </p>
          )}
          <Paragraphs text={c.intro_texte} style={{ fontSize: '1rem', color: 'var(--text2)', lineHeight: 1.9 }} />
        </div>
      </section>

      {/* Les 7 raisons */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: 860, margin: '0 auto' }}>
            {raisons.map((r) => (
              <div key={r.num + r.titre} className="card reveal" style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                {/* Icône + numéro */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '.3rem', flexShrink: 0 }}>
                  <div style={{
                    width: 56, height: 56, borderRadius: '50%',
                    background: 'linear-gradient(135deg, var(--blue), var(--blue2))',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '1.5rem'
                  }}>
                    <i className={r.icon} style={{ fontSize: '1.5rem', color: '#fff' }} />
                  </div>
                  <span style={{ fontSize: '.7rem', fontWeight: 700, color: 'var(--blue)', letterSpacing: '.05em' }}>{r.num}</span>
                </div>
                {/* Texte */}
                <div>
                  <h3 style={{ fontFamily: 'var(--fs)', fontSize: '1.1rem', color: 'var(--text)', marginBottom: '.5rem' }}>{r.titre}</h3>
                  <p style={{ fontSize: '.92rem', color: 'var(--text2)', lineHeight: 1.8, margin: 0 }}>{r.texte}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Citation finale */}
          {c.citation && (
            <div style={{ maxWidth: 700, margin: '3rem auto 0', textAlign: 'center' }}>
              <div className="verse-block">
                <p style={{ fontSize: '1.05rem', fontStyle: 'italic', fontWeight: 500 }}><Inline text={c.citation} /></p>
              </div>
            </div>
          )}

          {/* CTA */}
          <div style={{ textAlign: 'center', marginTop: '2.5rem', display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href={coord.waLink("Bonjour, je souhaite devenir membre du ministère Vivre pour l'Éternel.")}
              className="btn btn-primary"
              target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '.6rem' }}
            >
              <i className="fab fa-whatsapp" /> {c.bouton}
            </a>
            <Link to="/contact/formulaire" className="btn btn-outline"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '.6rem' }}>
              <i className="fas fa-envelope" /> Nous contacter
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
