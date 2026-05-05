import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

const temoignages_ecrits = [
  { nom: "Grace A.", lieu: "Abidjan", date: "Jan 2025", cat: "Guérison", texte: "J'étais diagnostiquée avec une maladie grave que les médecins jugeaient incurable. Après des mois de prière avec l'équipe d'intercession de VPE, j'ai été examinée à nouveau — les médecins étaient stupéfaits. Dieu est réel et il guérit encore aujourd'hui.", emoji: "fas fa-hospital" },
  { nom: "Konan F.", lieu: "Bouaké", date: "Déc 2024", cat: "Famille", texte: "Mon mariage était au bord du gouffre après 7 ans de conflits non résolus. Suite au programme 'Saint-Esprit dans le Couple', ma femme et moi avons trouvé une nouvelle dynamique. Aujourd'hui nous sommes plus forts qu'au premier jour.", emoji: "fas fa-users" },
  { nom: "Mariama T.", lieu: "Dakar, Sénégal", date: "Nov 2024", cat: "Délivrance", texte: "Pendant 3 ans j'ai vécu sous un joug invisible que je ne comprenais pas. La session de délivrance a été un tournant radical. J'ai ressenti quelque chose partir de moi. La liberté que je vis aujourd'hui est inexplicable autrement que par la puissance du Nom de Jésus.", emoji: "fas fa-unlock" },
  { nom: "Emmanuel K.", lieu: "Abidjan", date: "Oct 2024", cat: "Provision", texte: "Chômeur depuis 18 mois, j'avais perdu espoir. Une prière soumise au mur d'intercession en août... deux semaines plus tard j'avais une offre d'emploi que je n'avais même pas cherchée. Dieu pourvoit selon ses richesses.", emoji: "fas fa-briefcase" },
  { nom: "Christelle B.", lieu: "France", date: "Sep 2024", cat: "Restauration", texte: "Depuis l'étranger, j'ai suivi les enseignements en ligne et soumis une demande de prière. Ma dépression sévère qui durait depuis 2 ans a commencé à se lever progressivement. La Parole de Dieu est vraiment une lampe pour mes pieds.", emoji: "fas fa-leaf" },
]

const temoignages_video = [
  { nom: "Frère Paul M.", duree: "8 min", cat: "Guérison", desc: "Comment Dieu m'a sauvé d'une mort certaine après un accident grave." },
  { nom: "Sœur Rachel O.", duree: "12 min", cat: "Famille", desc: "Restauration miraculeuse d'une famille au bord du divorce." },
  { nom: "Frère Josué T.", duree: "6 min", cat: "Conversion", desc: "Du fétichisme à la foi : mon chemin vers Jésus-Christ." },
  { nom: "Sœur Adèle K.", duree: "10 min", cat: "Délivrance", desc: "15 ans sous l'emprise de liens occultes — comment j'ai été libérée." },
]

const cats = ['Tous', 'Guérison', 'Famille', 'Délivrance', 'Provision', 'Restauration']

function EcritsTab() {
  const [filtre, setFiltre] = useState('Tous')
  const affiche = filtre === 'Tous' ? temoignages_ecrits : temoignages_ecrits.filter(t => t.cat === filtre)
  const catColor = { Guérison: '#0284C7', Famille: '#B8860B', Délivrance: '#7C3AED', Provision: '#059669', Restauration: '#0EA5E9' }
  return (
    <div>
      <h3 style={{ fontFamily: 'var(--fs)', fontSize: '1.5rem', marginBottom: '1rem' }}>Témoignages Écrits</h3>
      <div style={{ display: 'flex', gap: '.5rem', flexWrap: 'wrap', marginBottom: '1.75rem' }}>
        {cats.map(c => (
          <button key={c} onClick={() => setFiltre(c)}
            style={{ padding: '.4rem 1rem', borderRadius: 20, border: `2px solid ${c === filtre ? 'var(--blue)' : 'var(--border)'}`, background: c === filtre ? 'var(--blue)' : 'transparent', color: c === filtre ? '#fff' : 'var(--text2)', fontSize: '.8rem', cursor: 'pointer', transition: 'all .2s' }}>
            {c}
          </button>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        {affiche.map((t, i) => (
          <div key={i} className="card reveal">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <div>
                <strong style={{ color: 'var(--text)', fontSize: '.95rem' }}>{t.nom}</strong>
                <p style={{ fontSize: '.78rem', color: 'var(--text2)', margin: '.1rem 0 0' }}>{t.lieu} · {t.date}</p>
              </div>
              <span style={{ fontSize: '.72rem', fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', color: catColor[t.cat] || 'var(--blue)', background: `${catColor[t.cat]}18`, padding: '.2rem .6rem', borderRadius: 20, flexShrink: 0 }}>{t.cat}</span>
            </div>
            <p style={{ fontSize: '.88rem', color: 'var(--text2)', lineHeight: 1.75, fontStyle: 'italic' }}>&ldquo;{t.texte}&rdquo;</p>
            <div style={{ marginTop: '1rem', textAlign: 'right' }}><i className={t.emoji} style={{ fontSize: '1.5rem', color: 'var(--blue)' }} /></div>
          </div>
        ))}
      </div>
    </div>
  )
}

function VideoTestimTab() {
  return (
    <div>
      <h3 style={{ fontFamily: 'var(--fs)', fontSize: '1.5rem', marginBottom: '.5rem' }}>Témoignages Vidéo</h3>
      <p style={{ color: 'var(--text2)', marginBottom: '1.75rem' }}>Regardez et soyez encouragés — ce que Dieu a fait pour eux, il peut le faire pour vous.</p>
      <div className="card-grid">
        {temoignages_video.map((v, i) => (
          <div key={i} className="card reveal" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ background: `linear-gradient(135deg, hsl(${i * 60 + 200}, 70%, 35%), hsl(${i * 60 + 220}, 70%, 55%))`, height: 180, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#fff', position: 'relative' }}>
              <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(255,255,255,.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', backdropFilter: 'blur(4px)' }}>
                <i className="fas fa-play" style={{ marginLeft: 4 }} />
              </div>
              <span style={{ position: 'absolute', bottom: 10, right: 12, background: 'rgba(0,0,0,.5)', fontSize: '.72rem', padding: '.15rem .5rem', borderRadius: 4 }}>{v.duree}</span>
              <span style={{ position: 'absolute', top: 10, left: 12, background: 'rgba(255,255,255,.15)', fontSize: '.7rem', padding: '.15rem .5rem', borderRadius: 4 }}>{v.cat}</span>
            </div>
            <div style={{ padding: '1.1rem 1.25rem' }}>
              <h4 style={{ color: 'var(--text)', fontSize: '.95rem', marginBottom: '.35rem' }}>{v.nom}</h4>
              <p style={{ fontSize: '.82rem', color: 'var(--text2)', margin: 0 }}>{v.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function PartagerTab() {
  const [form, setForm] = useState({ nom: '', email: '', categorie: '', temoignage: '', publier: true })
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)
  const up = e => { const { name, value, type, checked } = e.target; setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value })) }
  const submit = async e => {
    e.preventDefault(); setLoading(true)
    await new Promise(r => setTimeout(r, 1200))
    setLoading(false); setStatus('ok')
  }

  if (status === 'ok') return (
    <div className="form-success">
      <div style={{ marginBottom: '1rem' }}><i className="fas fa-star" style={{ fontSize: '3rem', color: 'var(--blue)' }} /></div>
      <h3>Merci pour votre témoignage !</h3>
      <p>Votre témoignage a été reçu. Après révision, il sera publié pour encourager la communauté.</p>
      <button className="btn btn-outline" onClick={() => setStatus('')} style={{ marginTop: '1.5rem' }}>
        Partager un autre témoignage
      </button>
    </div>
  )

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: '3rem', alignItems: 'start' }}>
      <div>
        <h3 style={{ fontFamily: 'var(--fs)', marginBottom: '1rem' }}>Votre Témoignage Compte</h3>
        <p style={{ color: 'var(--text2)', marginBottom: '1.5rem' }}>Ce que Dieu a accompli dans votre vie peut donner de l&apos;espérance à quelqu&apos;un d&apos;autre. Ne gardez pas ce trésor pour vous.</p>
        <div className="verse-block">
          <p>Ils l&apos;ont vaincu à cause du sang de l&apos;Agneau et à cause de la parole de leur témoignage.</p>
          <cite>Apocalypse 12:11</cite>
        </div>
        <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '.75rem' }}>
          {['Guérison miraculeuse', 'Restauration familiale', 'Délivrance', 'Provision divine', 'Conversion', 'Autre grâce'].map(c => (
            <div key={c} style={{ display: 'flex', alignItems: 'center', gap: '.75rem', cursor: 'pointer' }}
              onClick={() => setForm(f => ({ ...f, categorie: c }))}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: form.categorie === c ? 'var(--blue)' : 'var(--border)', transition: 'background .2s', flexShrink: 0 }} />
              <span style={{ fontSize: '.88rem', color: form.categorie === c ? 'var(--blue)' : 'var(--text2)' }}>{c}</span>
            </div>
          ))}
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
            <input type="email" name="email" value={form.email} onChange={up} placeholder="Optionnel" />
          </div>
        </div>
        <div className="form-group">
          <label>Catégorie</label>
          <select name="categorie" value={form.categorie} onChange={up}>
            <option value="">Choisir une catégorie</option>
            {['Guérison', 'Famille', 'Délivrance', 'Provision', 'Conversion', 'Autre'].map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div className="form-group">
          <label>Votre témoignage *</label>
          <textarea name="temoignage" value={form.temoignage} onChange={up} rows={7}
            placeholder="Racontez ce que Dieu a accompli dans votre vie..." required />
        </div>
        <label className="form-check">
          <input type="checkbox" name="publier" checked={form.publier} onChange={up} />
          <span>J&apos;autorise la publication de mon témoignage sur le site</span>
        </label>
        <button type="submit" className="btn btn-primary" disabled={loading} style={{ width: '100%' }}>
          {loading ? <><i className="fas fa-spinner fa-spin" /> Envoi…</> : <><i className="fas fa-share-alt" /> Partager mon témoignage</>}
        </button>
      </form>
    </div>
  )
}

const TABS = [
  { id: 'ecrits', label: 'Témoignages écrits', icon: 'fas fa-pen', Component: EcritsTab },
  { id: 'video', label: 'Témoignages vidéo', icon: 'fas fa-video', Component: VideoTestimTab },
  { id: 'partager', label: 'Partager mon témoignage', icon: 'fas fa-share-alt', Component: PartagerTab },
]

export default function Temoignages() {
  const { tab: urlTab } = useParams()
  const active = (urlTab && ['ecrits', 'video', 'partager'].includes(urlTab)) ? urlTab : 'ecrits'
  const navigate = useNavigate()
  const tab = TABS.find(t => t.id === active)
  const { Component } = tab

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <div className="breadcrumb"><a href="/">Accueil</a> › <span>Témoignages</span></div>
          <div className="page-hero-eyebrow"><i className="fas fa-star" style={{ marginRight: '.4rem' }} /> Grâces Reçues</div>
          <h1>Témoignages</h1>
          <p>Des vies transformées par la puissance de Dieu. Chaque témoignage est une déclaration de sa gloire.</p>
        </div>
      </div>
      <section className="section">
        <div className="container"><Component /></div>
      </section>
    </>
  )
}
