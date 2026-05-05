import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

const besoins = [
  { icon: 'fas fa-hospital', label: 'Guérison & Santé' },
  { icon: 'fas fa-users', label: 'Restauration Familiale' },
  { icon: 'fas fa-briefcase', label: 'Provision & Emploi' },
  { icon: 'fas fa-unlock', label: 'Délivrance' },
  { icon: 'fas fa-globe', label: 'Intercession Nations' },
  { icon: 'fas fa-graduation-cap', label: 'Projets & Vocation' },
]

function FormulaireTab() {
  const [form, setForm] = useState({ nom: '', email: '', categorie: '', priere: '', confidentiel: false })
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)
  const up = e => { const { name, value, type, checked } = e.target; setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value })) }
  const submit = async e => {
    e.preventDefault(); setLoading(true)
    await new Promise(r => setTimeout(r, 1200))
    setLoading(false); setStatus('ok')
    setForm({ nom: '', email: '', categorie: '', priere: '', confidentiel: false })
  }
  if (status === 'ok') return (
    <div className="form-success">
      <div style={{ marginBottom: '1rem' }}><i className="fas fa-hands-praying" style={{ fontSize: '3rem', color: 'var(--blue)' }} /></div>
      <h3>Prière reçue !</h3>
      <p>Notre équipe d&apos;intercesseurs a reçu votre demande. Nous prions pour vous avec foi et constance.</p>
      <button className="btn btn-outline" onClick={() => setStatus('')} style={{ marginTop: '1.5rem' }}>
        Soumettre une autre prière
      </button>
    </div>
  )
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: '3rem', alignItems: 'start' }}>
      <div>
        <h3 style={{ fontFamily: 'var(--fs)', marginBottom: '1.25rem' }}>Domaines de prière</h3>
        <div className="prayer-needs">
          {besoins.map(b => (
            <div key={b.label} className="prayer-need-item" onClick={() => setForm(f => ({ ...f, categorie: b.label }))}>
              <i className={b.icon} style={{ fontSize: '1.4rem' }} />
              <strong style={{ fontSize: '.9rem' }}>{b.label}</strong>
            </div>
          ))}
        </div>
        <div className="verse-block" style={{ marginTop: '1.5rem' }}>
          <p>Confessez vos péchés les uns aux autres, et priez les uns pour les autres, afin que vous soyez guéris.</p>
          <cite>Jacques 5:16</cite>
        </div>
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
        <button type="submit" className="btn btn-primary" disabled={loading} style={{ width: '100%' }}>
          {loading ? <><i className="fas fa-spinner fa-spin" /> Envoi…</> : <><i className="fas fa-hands-praying" /> Soumettre ma prière</>}
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', margin: '1rem 0' }}>
          <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
          <span style={{ fontSize: '.8rem', color: 'var(--text2)', whiteSpace: 'nowrap' }}>ou contactez-nous directement</span>
          <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
        </div>
        <a
          href="https://wa.me/2250546457742?text=Bonjour%2C%20j%27ai%20une%20demande%20de%20pri%C3%A8re%20%3A%20"
          target="_blank" rel="noopener noreferrer"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '.65rem', width: '100%', padding: '.85rem', borderRadius: 100, background: '#25D366', color: '#fff', fontWeight: 700, fontSize: '.95rem', textDecoration: 'none', transition: 'opacity .2s' }}
          onMouseOver={e => e.currentTarget.style.opacity = '.88'}
          onMouseOut={e => e.currentTarget.style.opacity = '1'}
        >
          <i className="fab fa-whatsapp" style={{ fontSize: '1.2rem' }} />
          Envoyer via WhatsApp · 05 46 45 77 42
        </a>
      </form>
    </div>
  )
}

function ProgrammeTab() {
  const programmes = [
    {
      icon: 'fas fa-heart',
      titre: "L'Esprit Saint dans le Couple",
      desc: "Séminaire d'évangélisation : enseignement, prière, suivi spirituel",
      horaire: "Chaque vendredi de 19h30 à 21h",
      color: '#0284C7',
    },
    {
      icon: 'fas fa-link',
      titre: "Autorité sur les Eaux Profondes",
      desc: "Écoute et Prière de délivrance",
      horaire: "Chaque Mardi et Jeudi · 08h30 – 17h",
      color: '#7C3AED',
    },
    {
      icon: 'fas fa-leaf',
      titre: "Rosée de Miséricorde",
      desc: "Assemblée de prière d'intercession — Louange, enseignement, adoration, effusion du Saint-Esprit",
      horaire: "Chaque samedi de 8h30 à 12h30",
      color: '#059669',
    },
    {
      icon: 'fas fa-music',
      titre: "La Puissance de la Louange",
      desc: "Spectacle de Louange, enseignement, effusion du Saint-Esprit, Témoignages",
      horaire: "Chaque 3 mois",
      color: '#D97706',
    },
    {
      icon: 'fas fa-home',
      titre: "Pastorale",
      desc: "Visite des Familles, des couples, et la jeunesse — Écoute, suivi spirituel, prière",
      horaire: "Chaque dimanche et lundi · 08h – 20h",
      color: '#DC2626',
    },
  ]

  return (
    <div style={{ maxWidth: 820 }}>
      <h3 style={{ fontFamily: 'var(--fs)', fontSize: '1.6rem', marginBottom: '.5rem', color: 'var(--blue-dark)' }}>
        Programme de Prière
      </h3>
      <p style={{ color: 'var(--text2)', marginBottom: '2rem', fontSize: '.95rem' }}>
        Liste des différents programmes du ministère :
      </p>
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
  return (
    <div style={{ maxWidth: 760 }}>
      <h3 style={{ fontFamily: 'var(--fs)', fontSize: '1.8rem', marginBottom: '1.25rem' }}>L&apos;Intercession : Un Appel Divin</h3>
      <p style={{ marginBottom: '1rem' }}>L&apos;intercession est le fait de se tenir entre Dieu et l&apos;homme pour plaider en faveur d&apos;un autre. C&apos;est l&apos;un des actes les plus nobles et les plus puissants du croyant.</p>
      <p style={{ marginBottom: '1.5rem' }}>Notre ministère forme et équipe des intercesseurs qui comprennent l&apos;autorité spirituelle qui leur est conférée en Christ pour briser les forteresses ennemies et établir le royaume de Dieu.</p>
      <div className="values-list">
        {[
          { icon: 'fas fa-book-open', t: "Fondement Biblique", d: "L'intercession est enracinée dans la Parole. Nous étudions les principes scripturaires de la prière." },
          { icon: 'fas fa-fire', t: "Le Fardeau Divin", d: "Recevoir le fardeau de Dieu pour des situations spécifiques est le début de toute intercession puissante." },
          { icon: 'fas fa-shield-alt', t: "Guerre Spirituelle", d: "Comprendre les principes de la guerre spirituelle pour prier avec autorité et efficacité." },
          { icon: 'fas fa-check-circle', t: "Prière avec Résultats", d: "Documenter les réponses de Dieu renforce la foi et encourage toute la communauté." },
        ].map(v => (
          <div key={v.t} className="value-row reveal">
            <div className="value-icon"><i className={v.icon} /></div>
            <div><h4>{v.t}</h4><p>{v.d}</p></div>
          </div>
        ))}
      </div>
    </div>
  )
}

function RejoindreTab() {
  return (
    <div style={{ maxWidth: 760 }}>
      <h3 style={{ fontFamily: 'var(--fs)', fontSize: '1.8rem', marginBottom: '1rem' }}>Rejoindre les Intercesseurs</h3>
      <p style={{ marginBottom: '1.5rem' }}>Vous sentez l&apos;appel à la prière ? Rejoignez notre équipe d&apos;intercesseurs dévoués. Pas besoin d&apos;être parfait — juste disponible et sincère.</p>
      <div className="card-grid" style={{ marginBottom: '2rem' }}>
        {[
          { icon: 'fas fa-clock', t: 'Flexible', d: "Priez selon votre disponibilité. Nous nous adaptons à votre emploi du temps." },
          { icon: 'fas fa-mobile-alt', t: 'À Distance', d: "Participez en ligne ou en présentiel, depuis n'importe où dans le monde." },
          { icon: 'fas fa-book', t: 'Formation', d: "Nous vous formons aux principes de l'intercession biblique." },
          { icon: 'fas fa-handshake', t: 'Communauté', d: "Rejoignez une famille soudée par la même passion pour Dieu." },
        ].map(c => (
          <div key={c.t} className="card reveal">
            <div className="card-icon"><i className={c.icon} /></div>
            <h3>{c.t}</h3>
            <p>{c.d}</p>
          </div>
        ))}
      </div>
      <Link to="/contact" className="btn btn-primary">
        <i className="fas fa-heart" /> Je veux rejoindre l&apos;équipe
      </Link>
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
      <div className="page-hero">
        <div className="container">
          <div className="breadcrumb"><a href="/">Accueil</a> › <span>Prière &amp; Intercession</span></div>
          <div className="page-hero-eyebrow"><i className="fas fa-hands-praying" style={{ marginRight: '.4rem' }} /> Mur d&apos;Intercession</div>
          <h1>Prière &amp; Intercession</h1>
          <p>Votre besoin est confié à notre équipe d&apos;intercesseurs dévoués. Nous prions pour vous.</p>
        </div>
      </div>
      <section className="section">
        <div className="container"><Component /></div>
      </section>
    </>
  )
}
