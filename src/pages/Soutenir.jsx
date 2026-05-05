import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

function DonTab() {
  const [montant, setMontant] = useState('')
  const [custom, setCustom] = useState('')
  const [freq, setFreq] = useState('unique')
  const [methode, setMethode] = useState('')
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)

  const montants = ['5 000', '10 000', '25 000', '50 000', '100 000']

  const submit = async e => {
    e.preventDefault(); setLoading(true)
    await new Promise(r => setTimeout(r, 1200))
    setLoading(false); setStatus('ok')
  }

  if (status === 'ok') return (
    <div className="form-success">
      <div style={{ marginBottom: '1rem' }}><i className="fas fa-hands-praying" style={{ fontSize: '3rem', color: 'var(--blue)' }} /></div>
      <h3>Merci pour votre générosité !</h3>
      <p>Votre don contribue à l&apos;avancement de l&apos;Évangile et au soutien des plus démunis. Que Dieu vous rende au centuple.</p>
      <button className="btn btn-outline" onClick={() => setStatus('')} style={{ marginTop: '1.5rem' }}>
        Faire un nouveau don
      </button>
    </div>
  )

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '3rem', alignItems: 'start' }}>
      <div>
        <h3 style={{ fontFamily: 'var(--fs)', fontSize: '1.6rem', marginBottom: '1rem' }}>Faire un Don</h3>
        <p style={{ color: 'var(--text2)', marginBottom: '1.5rem' }}>Chaque offrande, grande ou petite, participe à l&apos;avancement du Royaume de Dieu. Vos dons financent nos programmes, nos missions et notre aide sociale.</p>
        <div className="verse-block">
          <p>Donnez, et il vous sera donné : on versera dans votre sein une bonne mesure, serrée, secouée et qui déborde.</p>
          <cite>Luc 6:38</cite>
        </div>
        <div style={{ marginTop: '1.75rem' }}>
          <p style={{ fontWeight: 700, color: 'var(--text)', marginBottom: '.75rem' }}>Vos dons permettent :</p>
          {[
            { icon: 'fas fa-bullhorn', t: "Financer les missions évangéliques" },
            { icon: 'fas fa-bread-slice', t: "Nourrir les familles dans le besoin" },
            { icon: 'fas fa-book-open', t: "Produire des enseignements gratuits" },
            { icon: 'fas fa-globe', t: "Soutenir les projets partenaires" },
          ].map(item => (
            <div key={item.t} style={{ display: 'flex', gap: '.75rem', alignItems: 'center', marginBottom: '.6rem' }}>
              <i className={item.icon} style={{ fontSize: '1.1rem', color: 'var(--blue)', width: 20, textAlign: 'center' }} />
              <span style={{ fontSize: '.88rem', color: 'var(--text2)' }}>{item.t}</span>
            </div>
          ))}
        </div>
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
            <option value="mtn">MTN Mobile Money</option>
            <option value="orange">Orange Money</option>
            <option value="wave">Wave</option>
            <option value="virement">Virement bancaire</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading || (!montant && !custom)} style={{ width: '100%' }}>
          {loading ? <><i className="fas fa-spinner fa-spin" /> Traitement…</> : <><i className="fas fa-heart" /> Confirmer mon don</>}
        </button>
        <p style={{ fontSize: '.75rem', color: 'var(--text2)', textAlign: 'center', marginTop: '1rem' }}>
          <i className="fas fa-lock" style={{ marginRight: '.3rem' }} />Transaction sécurisée · Reçu envoyé par email
        </p>
      </form>
    </div>
  )
}

function PartenariatTab() {
  const [form, setForm] = useState({ nom: '', org: '', email: '', tel: '', type: '', message: '' })
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)
  const up = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  const submit = async e => {
    e.preventDefault(); setLoading(true)
    await new Promise(r => setTimeout(r, 1200))
    setLoading(false); setStatus('ok')
  }

  if (status === 'ok') return (
    <div className="form-success">
      <div style={{ marginBottom: '1rem' }}><i className="fas fa-cross" style={{ fontSize: '3rem', color: 'var(--blue)' }} /></div>
      <h3>Demande reçue !</h3>
      <p>Merci pour votre intérêt à soutenir l&apos;œuvre. Notre responsable vous contactera dans les 48h.</p>
      <button className="btn btn-outline" onClick={() => setStatus('')} style={{ marginTop: '1.5rem' }}>
        Retour
      </button>
    </div>
  )

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '3rem', alignItems: 'start' }}>
      <div>
        <h3 style={{ fontFamily: 'var(--fs)', fontSize: '1.6rem', marginBottom: '1rem' }}>Devenir Partenaire</h3>
        <p style={{ color: 'var(--text2)', marginBottom: '1.5rem' }}>Vous souhaitez vous associer de manière durable à cette œuvre ? Plusieurs niveaux de partenariat sont disponibles pour les individus, les entreprises et les organisations.</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {[
            { tier: "Partenaire Priant", icon: "fas fa-hands-praying", desc: "Soutien en prière régulier pour le ministère et ses équipes." },
            { tier: "Partenaire Financier", icon: "fas fa-gem", desc: "Contribution mensuelle pour soutenir les programmes actifs." },
            { tier: "Partenaire Stratégique", icon: "fas fa-handshake", desc: "Collaboration active — ressources, compétences, réseau." },
          ].map(item => (
            <div key={item.tier} className="card" style={{ padding: '1rem 1.25rem', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <i className={item.icon} style={{ fontSize: '1.5rem', flexShrink: 0, color: 'var(--blue)', marginTop: '.1rem' }} />
              <div>
                <strong style={{ color: 'var(--blue)', fontSize: '.9rem' }}>{item.tier}</strong>
                <p style={{ fontSize: '.82rem', color: 'var(--text2)', margin: '.2rem 0 0' }}>{item.desc}</p>
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
            <option value="priant">Partenaire Priant</option>
            <option value="financier">Partenaire Financier</option>
            <option value="strategique">Partenaire Stratégique</option>
          </select>
        </div>
        <div className="form-group">
          <label>Message</label>
          <textarea name="message" value={form.message} onChange={up} rows={4}
            placeholder="Dites-nous comment vous souhaitez vous engager..." />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading} style={{ width: '100%' }}>
          {loading ? <><i className="fas fa-spinner fa-spin" /> Envoi…</> : <><i className="fas fa-handshake" /> Envoyer ma demande</>}
        </button>
      </form>
    </div>
  )
}

function SpirituelTab() {
  return (
    <div style={{ maxWidth: 760 }}>
      <h3 style={{ fontFamily: 'var(--fs)', fontSize: '1.8rem', marginBottom: '1.25rem' }}>Soutien Spirituel</h3>
      <p style={{ color: 'var(--text2)', marginBottom: '1.75rem' }}>Au-delà des ressources financières, nous avons besoin de votre soutien le plus précieux : la prière. Rejoignez notre réseau d&apos;intercesseurs ou soutenez-nous par vos dons spirituels.</p>
      <div className="card-grid" style={{ marginBottom: '2rem' }}>
        {[
          { icon: 'fas fa-hands-praying', titre: "Prière Quotidienne", desc: "Intercédez chaque jour pour le ministère, ses responsables et ses membres." },
          { icon: 'fas fa-shield-alt', titre: "Couverture Spirituelle", desc: "Rejoignez notre réseau d'intercesseurs pour couvrir nos missions en prière." },
          { icon: 'fas fa-book-open', titre: "Partage de la Parole", desc: "Diffusez nos enseignements autour de vous — chaque partage est une semence." },
          { icon: 'fas fa-comment', titre: "Témoignage", desc: "Parlez de VPE à votre entourage. Un témoignage personnel est la meilleure publicité." },
        ].map(c => (
          <div key={c.titre} className="card reveal" style={{ textAlign: 'center' }}>
            <div style={{ marginBottom: '.75rem' }}><i className={c.icon} style={{ fontSize: '2.5rem', color: 'var(--blue)' }} /></div>
            <h4 style={{ color: 'var(--blue)', marginBottom: '.5rem' }}>{c.titre}</h4>
            <p style={{ fontSize: '.88rem', color: 'var(--text2)', lineHeight: 1.7 }}>{c.desc}</p>
          </div>
        ))}
      </div>
      <div className="verse-block">
        <p>Or celui qui plante et celui qui arrose sont égaux, mais chacun recevra son salaire selon son propre travail.</p>
        <cite>1 Corinthiens 3:8</cite>
      </div>
      <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <Link to="/priere" className="btn btn-primary">
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
      <div className="page-hero">
        <div className="container">
          <div className="breadcrumb"><a href="/">Accueil</a> › <span>Soutenir l&apos;Œuvre</span></div>
          <div className="page-hero-eyebrow"><i className="fas fa-gift" style={{ marginRight: '.4rem' }} /> Donnez &amp; Recevez</div>
          <h1>Soutenir l&apos;Œuvre</h1>
          <p>Chaque geste de générosité avance l&apos;Évangile et touche des vies. Merci de nous rejoindre dans cette mission.</p>
        </div>
      </div>
      <section className="section">
        <div className="container"><Component /></div>
      </section>
    </>
  )
}
