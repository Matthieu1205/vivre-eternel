import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { submitForm } from '../lib/data'
import FormError from '../components/FormError'
import { useProgrammes } from './Programmes'
import { PageHero, Paragraphs, Verse, useCoordonnees, useSection } from '../lib/content'


function FormulaireTab() {
  const c = useSection('priere.formulaire')
  const coord = useCoordonnees()
  const besoins = c.domaines || []
  const [form, setForm] = useState({ nom: '', email: '', categorie: '', priere: '', confidentiel: false })
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)
  const up = e => { const { name, value, type, checked } = e.target; setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value })) }
  const [error, setError] = useState('')
  const submit = async e => {
    e.preventDefault(); setLoading(true); setError('')
    const { error } = await submitForm('demandes_priere', {
      nom: form.nom.trim() || null, email: form.email.trim() || null,
      categorie: form.categorie || null, priere: form.priere.trim(), confidentiel: form.confidentiel,
    })
    setLoading(false)
    if (error) { setError(error); return }
    setStatus('ok')
    setForm({ nom: '', email: '', categorie: '', priere: '', confidentiel: false })
  }
  if (status === 'ok') return (
    <div className="form-success">
      <div style={{ marginBottom: '1rem' }}><i className="fas fa-hands-praying" style={{ fontSize: '3rem', color: 'var(--blue)' }} /></div>
      <h3>Prière reçue !</h3>
      <p>{c.confirmation}</p>
      <button className="btn btn-outline" onClick={() => setStatus('')} style={{ marginTop: '1.5rem' }}>
        Soumettre une autre prière
      </button>
    </div>
  )
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: '3rem', alignItems: 'start' }}>
      <div>
        <h3 style={{ fontFamily: 'var(--fs)', marginBottom: '1.25rem' }}>{c.titre}</h3>
        <div className="prayer-needs">
          {besoins.map(b => (
            <div key={b.label} className="prayer-need-item" onClick={() => setForm(f => ({ ...f, categorie: b.label }))}>
              <i className={b.icon} style={{ fontSize: '1.4rem' }} />
              <strong style={{ fontSize: '.9rem' }}>{b.label}</strong>
            </div>
          ))}
        </div>
        <Verse text={c.verse_text} cite={c.verse_ref} style={{ marginTop: '1.5rem' }} />
      </div>
      <form className="contact-form" onSubmit={submit}>
        <div className="form-row">
          <div className="form-group">
            <label>Votre Nom</label>
            <input type="text" name="nom" value={form.nom} onChange={up} placeholder="Optionnel" />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" value={form.email} onChange={up} placeholder="Pour recevoir une réponse" />
          </div>
        </div>
        <div className="form-group">
          <label>Catégorie</label>
          <select name="categorie" value={form.categorie} onChange={up}>
            <option value="">Choisir une catégorie</option>
            {besoins.map(b => <option key={b.label} value={b.label}>{b.label}</option>)}
            <option value="Autre">Autre</option>
          </select>
        </div>
        <div className="form-group">
          <label>Votre demande de prière *</label>
          <textarea name="priere" value={form.priere} onChange={up} rows={6}
            placeholder="Partagez librement votre besoin. Dieu entend chaque prière sincère..." required />
        </div>
        <label className="form-check">
          <input type="checkbox" name="confidentiel" checked={form.confidentiel} onChange={up} />
          <span>Demande confidentielle (partagée uniquement avec les intercesseurs)</span>
        </label>
        <FormError message={error} />
        <button type="submit" className="btn btn-primary" disabled={loading} style={{ width: '100%' }}>
          {loading ? <><i className="fas fa-spinner fa-spin" /> Envoi…</> : <><i className="fas fa-hands-praying" /> Soumettre ma prière</>}
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', margin: '1rem 0' }}>
          <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
          <span style={{ fontSize: '.8rem', color: 'var(--text2)', whiteSpace: 'nowrap' }}>ou contactez-nous directement</span>
          <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
        </div>
        <a
          href={coord.waLink("Bonjour, j'ai une demande de prière : ")}
          target="_blank" rel="noopener noreferrer"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '.65rem', width: '100%', padding: '.85rem', borderRadius: 100, background: '#25D366', color: '#fff', fontWeight: 700, fontSize: '.95rem', textDecoration: 'none', transition: 'opacity .2s' }}
          onMouseOver={e => e.currentTarget.style.opacity = '.88'}
          onMouseOut={e => e.currentTarget.style.opacity = '1'}
        >
          <i className="fab fa-whatsapp" style={{ fontSize: '1.2rem' }} />
          Envoyer via WhatsApp · {coord.tel1}
        </a>
      </form>
    </div>
  )
}

function ProgrammeTab() {
  const c = useSection('priere.programme')
  const colors = ['#0284C7', '#7C3AED', '#059669', '#D97706', '#DC2626']
  const programmes = useProgrammes().map((p, i) => ({
    icon: p.icon, titre: p.label, desc: p.desc, horaire: p.horaire, color: colors[i % colors.length],
  }))

  return (
    <div style={{ maxWidth: 820 }}>
      <h3 style={{ fontFamily: 'var(--fs)', fontSize: '1.6rem', marginBottom: '.5rem', color: 'var(--blue-dark)' }}>
        {c.titre}
      </h3>
      {c.texte && <p style={{ color: 'var(--text2)', marginBottom: '2rem', fontSize: '.95rem' }}>{c.texte}</p>}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {programmes.map(p => (
          <div key={p.titre} className="card" style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start', padding: '1.5rem', borderLeft: `4px solid ${p.color}` }}>
            <div style={{ flexShrink: 0, marginTop: '.1rem' }}><i className={p.icon} style={{ fontSize: '2.2rem', color: p.color }} /></div>
            <div style={{ flex: 1 }}>
              <h4 style={{ color: 'var(--text)', fontSize: '1.05rem', marginBottom: '.4rem' }}>{p.titre}</h4>
              <p style={{ fontSize: '.9rem', color: 'var(--text2)', lineHeight: 1.6, marginBottom: '.6rem' }}>{p.desc}</p>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '.4rem', background: p.color, color: '#fff', borderRadius: 100, padding: '.25rem .85rem', fontSize: '.78rem', fontWeight: 700 }}>
                <i className="fas fa-clock" /> {p.horaire}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function IntercessionTab() {
  const c = useSection('priere.intercession')
  return (
    <div style={{ maxWidth: 760 }}>
      <h3 style={{ fontFamily: 'var(--fs)', fontSize: '1.8rem', marginBottom: '1.25rem' }}>{c.titre}</h3>
      <Paragraphs text={c.texte} style={{ marginBottom: '1rem' }} />
      <div className="values-list" style={{ marginTop: '1.5rem' }}>
        {(c.cartes || []).map(v => (
          <div key={v.titre} className="value-row reveal">
            <div className="value-icon"><i className={v.icon} /></div>
            <div><h4>{v.titre}</h4><p>{v.texte}</p></div>
          </div>
        ))}
      </div>
    </div>
  )
}

function RejoindreTab() {
  const c = useSection('priere.rejoindre')
  return (
    <div style={{ maxWidth: 760 }}>
      <h3 style={{ fontFamily: 'var(--fs)', fontSize: '1.8rem', marginBottom: '1rem' }}>{c.titre}</h3>
      <Paragraphs text={c.texte} style={{ marginBottom: '1.5rem' }} />
      <div className="card-grid" style={{ marginBottom: '2rem' }}>
        {(c.cartes || []).map(v => (
          <div key={v.titre} className="card reveal">
            <div className="card-icon"><i className={v.icon} /></div>
            <h3>{v.titre}</h3>
            <p>{v.texte}</p>
          </div>
        ))}
      </div>
      {c.bouton && (
        <Link to="/contact" className="btn btn-primary">
          <i className="fas fa-heart" /> {c.bouton}
        </Link>
      )}
    </div>
  )
}

const TABS = [
  { id: 'formulaire', label: 'Demande de prière', icon: 'fas fa-pen', Component: FormulaireTab },
  { id: 'programme', label: 'Programme de prière', icon: 'fas fa-calendar-alt', Component: ProgrammeTab },
  { id: 'intercession', label: 'Intercession', icon: 'fas fa-hands-praying', Component: IntercessionTab },
  { id: 'rejoindre', label: 'Rejoindre les intercesseurs', icon: 'fas fa-handshake', Component: RejoindreTab },
]

export default function Priere() {
  const { tab: urlTab } = useParams()
  const active = (urlTab && ['formulaire', 'programme', 'intercession', 'rejoindre'].includes(urlTab)) ? urlTab : 'formulaire'
  const navigate = useNavigate()
  const tab = TABS.find(t => t.id === active)
  const { Component } = tab

  return (
    <>
      <PageHero section="priere.hero" crumb="Prière & Intercession" icon="fas fa-hands-praying" />
      <section className="section">
        <div className="container"><Component /></div>
      </section>
    </>
  )
}
