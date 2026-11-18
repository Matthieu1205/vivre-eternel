import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Inline, PageHero, Paragraphs, Verse, useSection } from '../lib/content'

const textStyle = { fontSize: '1rem', color: 'var(--text2)', lineHeight: 1.85, marginBottom: '1.5rem' }
const strong = { color: 'var(--text)' }

function Points({ items }) {
  if (!items?.length) return null
  return (
    <ul style={{ display: 'flex', flexDirection: 'column', gap: '.7rem' }}>
      {items.map(pt => (
        <li key={pt} style={{ display: 'flex', gap: '.75rem', alignItems: 'center', fontSize: '.9rem', color: 'var(--text2)' }}>
          <i className="fas fa-check-circle" style={{ color: 'var(--blue)', flexShrink: 0 }} />{pt}
        </li>
      ))}
    </ul>
  )
}

function Photo({ src, alt, style }) {
  if (!src) return <div />
  return (
    <div style={{ borderRadius: 16, overflow: 'hidden', boxShadow: '0 12px 48px rgba(0,0,0,.18)', lineHeight: 0 }}>
      <img src={src} alt={alt} style={{ width: '100%', display: 'block', ...style }} onError={e => { e.target.parentElement.style.display = 'none' }} />
    </div>
  )
}

function Presentation() {
  const c = useSection('apropos.presentation')
  return (
    <div style={{ maxWidth: 800 }}>
      <h3 style={{ fontFamily: 'var(--fs)', fontSize: '1.8rem', marginBottom: '1.5rem', color: 'var(--blue-dark)' }}>{c.titre}</h3>
      <Paragraphs text={c.texte} style={{ fontSize: '1.05rem', lineHeight: 1.9, color: 'var(--text2)', marginBottom: '1.5rem' }} strongStyle={strong} />
      <Verse text={c.verse_text} cite={c.verse_ref} style={{ marginBottom: '2rem' }} />
      <div className="about-grid" style={{ marginTop: '2rem' }}>
        {(c.cartes || []).map(v => (
          <div key={v.titre} className="card reveal" style={{ textAlign: 'center' }}>
            <div style={{ marginBottom: '.75rem' }}><i className={v.icon} style={{ fontSize: '2rem', color: 'var(--blue)' }} /></div>
            <h4 style={{ color: 'var(--blue)', marginBottom: '.5rem' }}>{v.titre}</h4>
            <p style={{ fontSize: '.88rem', color: 'var(--text2)' }}>{v.texte}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

/** Vocation, Vision, Mission, Spiritualité : même mise en page. */
function Pilier({ section }) {
  const c = useSection(section)
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '3rem', alignItems: 'start' }}>
      <Photo src={c.image} alt={c.titre} />
      <div>
        <h2 style={{ fontFamily: 'var(--fs)', fontSize: '1.75rem', color: 'var(--blue)', marginBottom: '.75rem', lineHeight: 1.25 }}>{c.titre}</h2>
        <Paragraphs text={c.texte} style={textStyle} strongStyle={{ color: 'var(--blue-dark)' }} />
        <Verse text={c.verse_text} cite={c.verse_ref} style={{ marginBottom: '1.5rem' }} />
        <Points items={c.points} />
      </div>
    </div>
  )
}

function Responsable() {
  const c = useSection('apropos.responsable')
  const editorial = c.editorial || []
  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '3rem', alignItems: 'start', marginBottom: '3rem' }}>
        <Photo src={c.image} alt="Le Responsable du Ministère" style={{ objectFit: 'cover', objectPosition: 'top center' }} />
        <div>
          <h2 style={{ fontFamily: 'var(--fs)', fontSize: '1.75rem', color: 'var(--blue)', marginBottom: '.5rem', lineHeight: 1.3 }}>{c.titre}</h2>
          {c.role && <p style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text)', marginBottom: '.25rem' }}>{c.role}</p>}
          {c.nom && <p style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--blue-dark)', marginBottom: '1.25rem' }}>{c.nom}</p>}
          <Paragraphs text={c.texte} style={textStyle} strongStyle={strong} />
          <Verse text={c.verse_text} cite={c.verse_ref} style={{ marginBottom: '1.5rem' }} />
          <Points items={c.points} />
        </div>
      </div>

      {(editorial.length > 0 || c.conclusion || c.devise) && (
        <div style={{ borderTop: '2px solid var(--border)', paddingTop: '2.5rem' }}>
          <h3 style={{ fontFamily: 'var(--fs)', fontSize: '1.5rem', color: 'var(--blue-dark)', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '.75rem' }}>
            <i className="fas fa-pen-nib" style={{ color: 'var(--blue)' }} /> Éditorial
          </h3>
          <div style={{ maxWidth: 760, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {editorial.map((p, i) => (
              <div key={i} style={{ background: '#f8fafc', borderRadius: 14, padding: '1.5rem 1.75rem', borderLeft: `4px solid ${i % 2 ? 'var(--gold2)' : 'var(--blue)'}` }}>
                <Paragraphs text={p.texte} style={{ margin: '0 0 .75rem', fontSize: '1rem', lineHeight: 2, color: 'var(--text2)' }} strongStyle={strong} />
                {p.ref && <span style={{ fontSize: '.82rem', fontWeight: 700, color: 'var(--blue)', letterSpacing: '.06em' }}>{p.ref}</span>}
              </div>
            ))}
            {(c.conclusion || c.devise) && (
              <div style={{ background: '#f8fafc', borderRadius: 14, padding: '1.5rem 1.75rem', borderLeft: `4px solid ${editorial.length % 2 ? 'var(--gold2)' : 'var(--blue)'}` }}>
                {c.conclusion && (
                  <p style={{ margin: c.devise ? '0 0 1.25rem' : 0, fontSize: '1rem', lineHeight: 2, color: 'var(--text2)', fontStyle: 'italic' }}><Inline text={c.conclusion} /></p>
                )}
                {c.devise && (
                  <p style={{
                    margin: 0, fontSize: '1.2rem', fontWeight: 800, color: 'var(--blue)',
                    fontFamily: 'var(--fs)', textAlign: 'center', padding: '1rem 1.5rem', background: '#fff',
                    borderRadius: 10, border: '2px solid var(--border)', letterSpacing: '.01em',
                  }}>{c.devise}</p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

const TABS = [
  { id: 'presentation', content: Presentation },
  { id: 'vocation', content: () => <Pilier section="apropos.vocation" /> },
  { id: 'vision', content: () => <Pilier section="apropos.vision" /> },
  { id: 'mission', content: () => <Pilier section="apropos.mission" /> },
  { id: 'spiritualite', content: () => <Pilier section="apropos.spiritualite" /> },
  { id: 'responsable', content: Responsable },
]

export default function APropos() {
  const { tab: urlTab } = useParams()
  const active = (urlTab && ['presentation', 'vocation', 'vision', 'mission', 'spiritualite', 'responsable'].includes(urlTab)) ? urlTab : 'presentation'
  const navigate = useNavigate()
  const tab = TABS.find(t => t.id === active)
  const Content = tab.content

  return (
    <>
      <PageHero section="apropos.hero" crumb="À Propos" icon="fas fa-cross" />
      <section className="section">
        <div className="container">
          <Content />
        </div>
      </section>
    </>
  )
}
