import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { submitForm } from '../lib/data'
import FormError from '../components/FormError'
import { PageHero, Paragraphs, Verse, useSection } from '../lib/content'

function DonTab() {
  const c = useSection('soutenir.don')
  const [montant, setMontant] = useState('')
  const [custom, setCustom] = useState('')
  const [freq, setFreq] = useState('unique')
  const [methode, setMethode] = useState('')
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)

  const montants = c.montants || []
  const moyens = c.moyens || []

  // Aucun paiement en ligne : on affiche les instructions pour envoyer le don.
  const submit = e => {
    e.preventDefault(); setLoading(true)
    setTimeout(() => { setLoading(false); setStatus('ok') }, 400)
  }

  if (status === 'ok') return (
    <div className="form-success">
      <div style={{ marginBottom: '1rem' }}><i className="fas fa-hands-praying" style={{ fontSize: '3rem', color: 'var(--blue)' }} /></div>
      <h3>Merci pour votre générosité !</h3>
      <p>Votre don contribue à l&apos;avancement de l&apos;Évangile et au soutien des plus démunis. Que Dieu vous rende au centuple.</p>
      {c.instructions && (
        <div className="card" style={{ textAlign: 'left', marginTop: '1.25rem' }}>
          <p style={{ fontWeight: 700, color: 'var(--blue)', marginBottom: '.5rem' }}>
            Pour envoyer votre don{(custom || montant) ? ` de ${custom || montant} FCFA` : ''}{methode ? ` par ${methode}` : ''} :
          </p>
          <Paragraphs text={c.instructions} style={{ fontSize: '.92rem', color: 'var(--text)', margin: '0 0 .5rem' }} />
        </div>
      )}
      <button className="btn btn-outline" onClick={() => setStatus('')} style={{ marginTop: '1.5rem' }}>
        Faire un nouveau don
      </button>
    </div>
  )

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '3rem', alignItems: 'start' }}>
      <div>
        <h3 style={{ fontFamily: 'var(--fs)', fontSize: '1.6rem', marginBottom: '1rem' }}>{c.titre}</h3>
        <Paragraphs text={c.texte} style={{ color: 'var(--text2)', marginBottom: '1.5rem' }} />
        <Verse text={c.verse_text} cite={c.verse_ref} />
        {(c.avantages || []).length > 0 && (
          <div style={{ marginTop: '1.75rem' }}>
            {c.avantages_titre && <p style={{ fontWeight: 700, color: 'var(--text)', marginBottom: '.75rem' }}>{c.avantages_titre}</p>}
            {c.avantages.map(item => (
              <div key={item.texte} style={{ display: 'flex', gap: '.75rem', alignItems: 'center', marginBottom: '.6rem' }}>
                <i className={item.icon} style={{ fontSize: '1.1rem', color: 'var(--blue)', width: 20, textAlign: 'center' }} />
                <span style={{ fontSize: '.88rem', color: 'var(--text2)' }}>{item.texte}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      <form className="contact-form" onSubmit={submit}>
        <div style={{ marginBottom: '1.25rem' }}>
          <label style={{ fontSize: '.88rem', fontWeight: 600, color: 'var(--text2)', display: 'block', marginBottom: '.6rem' }}>Fréquence</label>
          <div style={{ display: 'flex', gap: '.75rem' }}>
            {[{ v: 'unique', l: 'Don unique' }, { v: 'mensuel', l: 'Mensuel' }].map(f => (
              <button key={f.v} type="button" onClick={() => setFreq(f.v)}
                style={{ flex: 1, padding: '.65rem', borderRadius: 8, border: `2px solid ${freq === f.v ? 'var(--blue)' : 'var(--border)'}`, background: freq === f.v ? 'var(--bg2)' : 'transparent', color: freq === f.v ? 'var(--blue)' : 'var(--text2)', fontWeight: 600, cursor: 'pointer', transition: 'all .2s' }}>
                {f.l}
              </button>
            ))}
          </div>
        </div>
        <div style={{ marginBottom: '1.25rem' }}>
          <label style={{ fontSize: '.88rem', fontWeight: 600, color: 'var(--text2)', display: 'block', marginBottom: '.6rem' }}>Montant (FCFA)</label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '.5rem', marginBottom: '.75rem' }}>
            {montants.map(m => (
              <button key={m} type="button" onClick={() => { setMontant(m); setCustom('') }}
                style={{ padding: '.65rem', borderRadius: 8, border: `2px solid ${montant === m ? 'var(--blue)' : 'var(--border)'}`, background: montant === m ? 'var(--blue)' : 'transparent', color: montant === m ? '#fff' : 'var(--text2)', fontWeight: 700, cursor: 'pointer', fontSize: '.9rem', transition: 'all .2s' }}>
                {m}
              </button>
            ))}
          </div>
          <input type="number" placeholder="Montant personnalisé" value={custom}
            onChange={e => { setCustom(e.target.value); setMontant('') }}
            style={{ width: '100%', padding: '.75rem 1rem', border: '2px solid var(--border)', borderRadius: 8, fontSize: '.9rem', outline: 'none', boxSizing: 'border-box' }} />
        </div>
        <div className="form-group">
          <label>Méthode de paiement</label>
          <select value={methode} onChange={e => setMethode(e.target.value)} required>
            <option value="">Choisir une méthode</option>
            {moyens.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading || (!montant && !custom)} style={{ width: '100%' }}>
          {loading ? <><i className="fas fa-spinner fa-spin" /> Traitement…</> : <><i className="fas fa-heart" /> Confirmer mon don</>}
        </button>
      </form>
    </div>
  )
}

function PartenariatTab() {
  const c = useSection('soutenir.partenariat')
  const niveaux = c.cartes || []
  const empty = { nom: '', org: '', email: '', tel: '', type: '', message: '' }
  const [form, setForm] = useState(empty)
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const up = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  const submit = async e => {
    e.preventDefault(); setLoading(true); setError('')
    const { error } = await submitForm('demandes_partenariat', {
      nom: form.nom.trim(), organisation: form.org.trim() || null, email: form.email.trim(),
      telephone: form.tel.trim() || null, type: form.type || null, message: form.message.trim() || null,
    })
    setLoading(false)
    if (error) { setError(error); return }
    setStatus('ok'); setForm(empty)
  }

  if (status === 'ok') return (
    <div className="form-success">
      <div style={{ marginBottom: '1rem' }}><i className="fas fa-cross" style={{ fontSize: '3rem', color: 'var(--blue)' }} /></div>
      <h3>Demande reçue !</h3>
      <p>{c.confirmation}</p>
      <button className="btn btn-outline" onClick={() => setStatus('')} style={{ marginTop: '1.5rem' }}>
        Retour
      </button>
    </div>
  )

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '3rem', alignItems: 'start' }}>
      <div>
        <h3 style={{ fontFamily: 'var(--fs)', fontSize: '1.6rem', marginBottom: '1rem' }}>{c.titre}</h3>
        <Paragraphs text={c.texte} style={{ color: 'var(--text2)', marginBottom: '1.5rem' }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {niveaux.map(item => (
            <div key={item.titre} className="card" style={{ padding: '1rem 1.25rem', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <i className={item.icon} style={{ fontSize: '1.5rem', flexShrink: 0, color: 'var(--blue)', marginTop: '.1rem' }} />
              <div>
                <strong style={{ color: 'var(--blue)', fontSize: '.9rem' }}>{item.titre}</strong>
                <p style={{ fontSize: '.82rem', color: 'var(--text2)', margin: '.2rem 0 0' }}>{item.texte}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <form className="contact-form" onSubmit={submit}>
        <div className="form-row">
          <div className="form-group">
            <label>Nom complet *</label>
            <input type="text" name="nom" value={form.nom} onChange={up} required />
          </div>
          <div className="form-group">
            <label>Organisation</label>
            <input type="text" name="org" value={form.org} onChange={up} placeholder="Optionnel" />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Email *</label>
            <input type="email" name="email" value={form.email} onChange={up} required />
          </div>
          <div className="form-group">
            <label>Téléphone</label>
            <input type="tel" name="tel" value={form.tel} onChange={up} />
          </div>
        </div>
        <div className="form-group">
          <label>Type de partenariat</label>
          <select name="type" value={form.type} onChange={up}>
            <option value="">Choisir</option>
            {niveaux.map(n => <option key={n.titre} value={n.titre.slice(0, 40)}>{n.titre}</option>)}
          </select>
        </div>
        <div className="form-group">
          <label>Message</label>
          <textarea name="message" value={form.message} onChange={up} rows={4}
            placeholder="Dites-nous comment vous souhaitez vous engager..." />
        </div>
        <FormError message={error} />
        <button type="submit" className="btn btn-primary" disabled={loading} style={{ width: '100%' }}>
          {loading ? <><i className="fas fa-spinner fa-spin" /> Envoi…</> : <><i className="fas fa-handshake" /> Envoyer ma demande</>}
        </button>
      </form>
    </div>
  )
}

function SpirituelTab() {
  const c = useSection('soutenir.spirituel')
  return (
    <div style={{ maxWidth: 760 }}>
      <h3 style={{ fontFamily: 'var(--fs)', fontSize: '1.8rem', marginBottom: '1.25rem' }}>{c.titre}</h3>
      <Paragraphs text={c.texte} style={{ color: 'var(--text2)', marginBottom: '1.75rem' }} />
      <div className="card-grid" style={{ marginBottom: '2rem' }}>
        {(c.cartes || []).map(v => (
          <div key={v.titre} className="card reveal" style={{ textAlign: 'center' }}>
            <div style={{ marginBottom: '.75rem' }}><i className={v.icon} style={{ fontSize: '2.5rem', color: 'var(--blue)' }} /></div>
            <h4 style={{ color: 'var(--blue)', marginBottom: '.5rem' }}>{v.titre}</h4>
            <p style={{ fontSize: '.88rem', color: 'var(--text2)', lineHeight: 1.7 }}>{v.texte}</p>
          </div>
        ))}
      </div>
      <Verse text={c.verse_text} cite={c.verse_ref} />
      <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <Link to="/priere/rejoindre" className="btn btn-primary">
          <i className="fas fa-hands-praying" /> Rejoindre les intercesseurs
        </Link>
        <Link to="/contact" className="btn btn-outline">
          <i className="fas fa-envelope" /> Nous contacter
        </Link>
      </div>
    </div>
  )
}

const TABS = [
  { id: 'don', label: 'Faire un don', icon: 'fas fa-gift', Component: DonTab },
  { id: 'partenariat', label: 'Devenir partenaire', icon: 'fas fa-handshake', Component: PartenariatTab },
  { id: 'spirituel', label: 'Soutien spirituel', icon: 'fas fa-hands-praying', Component: SpirituelTab },
]

export default function Soutenir() {
  const { tab: urlTab } = useParams()
  const active = (urlTab && ['don', 'partenariat', 'spirituel'].includes(urlTab)) ? urlTab : 'don'
  const navigate = useNavigate()
  const tab = TABS.find(t => t.id === active)
  const { Component } = tab

  return (
    <>
      <PageHero section="soutenir.hero" crumb="Soutenir l'Œuvre" icon="fas fa-gift" />
      <section className="section">
        <div className="container"><Component /></div>
      </section>
    </>
  )
}
