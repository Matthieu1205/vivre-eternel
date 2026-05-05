import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function FormulaireSection() {
  const [form, setForm] = useState({ nom: '', email: '', sujet: '', message: '' })
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
      <div style={{ marginBottom: '1rem' }}><i className="fas fa-check-circle" style={{ fontSize: '3rem', color: 'var(--blue)' }} /></div>
      <h3>Message envoyé !</h3>
      <p>Nous avons bien reçu votre message. Notre équipe vous répondra dans les meilleurs délais.</p>
      <button className="btn btn-outline" onClick={() => setStatus('')} style={{ marginTop: '1.5rem' }}>
        Envoyer un autre message
      </button>
    </div>
  )

  return (
    <form className="contact-form" onSubmit={submit}>
      <div className="form-row">
        <div className="form-group">
          <label>Nom complet *</label>
          <input type="text" name="nom" value={form.nom} onChange={up} required />
        </div>
        <div className="form-group">
          <label>Email *</label>
          <input type="email" name="email" value={form.email} onChange={up} required />
        </div>
      </div>
      <div className="form-group">
        <label>Sujet</label>
        <select name="sujet" value={form.sujet} onChange={up}>
          <option value="">Choisir un sujet</option>
          <option value="priere">Demande de prière</option>
          <option value="info">Informations générales</option>
          <option value="partenariat">Partenariat</option>
          <option value="don">Don & Soutien</option>
          <option value="evenement">Événement</option>
          <option value="autre">Autre</option>
        </select>
      </div>
      <div className="form-group">
        <label>Votre message *</label>
        <textarea name="message" value={form.message} onChange={up} rows={6}
          placeholder="Comment pouvons-nous vous aider ?" required />
      </div>
      <button type="submit" className="btn btn-primary" disabled={loading} style={{ width: '100%' }}>
        {loading ? <><i className="fas fa-spinner fa-spin" /> Envoi…</> : <><i className="fas fa-paper-plane" /> Envoyer le message</>}
      </button>
    </form>
  )
}

const CONTACT_TABS = [
  { id: 'formulaire', icon: 'fas fa-envelope', label: 'Formulaire' },
  { id: 'whatsapp', icon: 'fab fa-whatsapp', label: 'WhatsApp' },
  { id: 'localisation', icon: 'fas fa-map-marker-alt', label: 'Localisation' },
  { id: 'reseaux', icon: 'fas fa-globe', label: 'Réseaux sociaux' },
]

export default function Contact() {
  const { tab: urlTab } = useParams()
  const active = (urlTab && ['formulaire', 'whatsapp', 'localisation', 'reseaux'].includes(urlTab)) ? urlTab : 'formulaire'
  const navigate = useNavigate()

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <div className="breadcrumb"><a href="/">Accueil</a> › <span>Contact</span></div>
          <div className="page-hero-eyebrow"><i className="fas fa-envelope" style={{ marginRight: '.4rem' }} /> Parlons-nous</div>
          <h1>Contactez-nous</h1>
          <p>Nous sommes là pour vous. Choisissez le canal qui vous convient le mieux.</p>
        </div>
      </div>
      <section className="section">
        <div className="container">

          {active === 'formulaire' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '3rem', alignItems: 'start' }}>
              <div>
                <h3 style={{ fontFamily: 'var(--fs)', fontSize: '1.6rem', marginBottom: '1rem' }}>Écrivez-nous</h3>
                <p style={{ color: 'var(--text2)', marginBottom: '1.75rem' }}>Pour toute question, demande de prière, information sur nos programmes ou souhait de partenariat — nous lisons chaque message avec attention.</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {[
                    { icon: 'fa-envelope', titre: "Email", val: "contact@vivrepourleternel.org" },
                    { icon: 'fa-phone', titre: "Téléphone 1", val: "+225 05 46 45 77 42" },
                    { icon: 'fa-phone', titre: "Téléphone 2", val: "+225 07 09 04 57 07" },
                    { icon: 'fa-clock', titre: "Disponibilité", val: "Lun – Sam · 8h – 20h" },
                  ].map(item => (
                    <div key={item.titre} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                      <div style={{ width: 40, height: 40, borderRadius: 10, background: 'var(--bg2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--blue)', flexShrink: 0 }}>
                        <i className={`fas ${item.icon}`} />
                      </div>
                      <div>
                        <p style={{ fontSize: '.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.06em', color: 'var(--text2)', margin: '0 0 .15rem' }}>{item.titre}</p>
                        <p style={{ fontSize: '.92rem', color: 'var(--text)', margin: 0 }}>{item.val}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <FormulaireSection />
            </div>
          )}

          {active === 'whatsapp' && (
            <div style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center' }}>
              <div style={{ marginBottom: '1.5rem' }}><i className="fab fa-whatsapp" style={{ fontSize: '5rem', color: '#25D366' }} /></div>
              <h3 style={{ fontFamily: 'var(--fs)', fontSize: '1.8rem', marginBottom: '1rem' }}>Chat WhatsApp</h3>
              <p style={{ color: 'var(--text2)', marginBottom: '2rem', lineHeight: 1.8 }}>
                Vous préférez une réponse rapide ? Notre équipe est disponible sur WhatsApp pour répondre à vos questions, prendre vos demandes de prière et vous orienter vers les bons programmes.
              </p>
              <div className="card" style={{ marginBottom: '1.5rem', textAlign: 'left' }}>
                <p style={{ fontWeight: 700, color: 'var(--blue)', marginBottom: '.5rem' }}>Numéro WhatsApp</p>
                <p style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text)' }}>+225 05 46 45 77 42</p>
                <p style={{ fontSize: '.82rem', color: 'var(--text2)', margin: 0 }}>Disponible Lun – Sam · 8h – 20h</p>
              </div>
              <a href="https://wa.me/2250546457742?text=Bonjour%2C%20je%20contacte%20le%20minist%C3%A8re%20Vivre%20pour%20l%27%C3%89ternel."
                className="btn btn-primary" target="_blank" rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '.75rem', fontSize: '1.05rem', padding: '1rem 2.5rem' }}>
                <i className="fab fa-whatsapp" style={{ fontSize: '1.3rem' }} /> Démarrer la conversation
              </a>
              <p style={{ fontSize: '.78rem', color: 'var(--text2)', marginTop: '1.25rem' }}>
                Vous serez redirigé vers WhatsApp
              </p>
            </div>
          )}

          {active === 'localisation' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '3rem', alignItems: 'start' }}>
              <div>
                <h3 style={{ fontFamily: 'var(--fs)', fontSize: '1.6rem', marginBottom: '1rem' }}>Nous Trouver</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {[
                    { icon: 'fas fa-map-marker-alt', titre: "Siège du Ministère", val: "Modeste Nouveau Goudron\nAncienne Route de Bassam, Abidjan" },
                    { icon: 'fas fa-clock', titre: "Horaires d'ouverture", val: "Lundi – Vendredi\n8h00 – 18h00" },
                    { icon: 'fas fa-church', titre: "Culte & Réunions", val: "Mercredi 19h\nDimanche 9h – 12h" },
                  ].map(item => (
                    <div key={item.titre} className="card" style={{ padding: '1rem 1.25rem', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                      <i className={item.icon} style={{ fontSize: '1.5rem', flexShrink: 0, color: 'var(--blue)', marginTop: '.15rem' }} />
                      <div>
                        <p style={{ fontSize: '.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.06em', color: 'var(--blue)', margin: '0 0 .25rem' }}>{item.titre}</p>
                        <p style={{ fontSize: '.9rem', color: 'var(--text)', margin: 0, whiteSpace: 'pre-line' }}>{item.val}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ background: 'var(--bg2)', borderRadius: 16, border: '1px solid var(--border)', height: 400, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
                <i className="fas fa-map" style={{ fontSize: '3rem', color: 'var(--text2)' }} />
                <p style={{ color: 'var(--text2)', textAlign: 'center', maxWidth: 280 }}>
                  Modeste Nouveau Goudron<br />
                  <span style={{ fontSize: '.82rem' }}>Ancienne Route de Bassam, Abidjan</span>
                </p>
                <a href="https://maps.google.com/?q=Modeste+Nouveau+Goudron+Ancienne+Route+de+Bassam+Abidjan" target="_blank" rel="noopener noreferrer"
                  className="btn btn-outline" style={{ fontSize: '.82rem' }}>
                  <i className="fas fa-directions" /> Obtenir l&apos;itinéraire
                </a>
              </div>
            </div>
          )}

          {active === 'reseaux' && (
            <div style={{ maxWidth: 700, margin: '0 auto' }}>
              <h3 style={{ fontFamily: 'var(--fs)', fontSize: '1.6rem', marginBottom: '1rem', textAlign: 'center' }}>Suivez-nous</h3>
              <p style={{ color: 'var(--text2)', textAlign: 'center', marginBottom: '2rem' }}>Rejoignez notre communauté en ligne pour recevoir les enseignements, témoignages et annonces en temps réel.</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                {[
                  { nom: "Facebook", icon: "fab fa-facebook-f", handle: "@VivrePourl'Éternel", color: "#1877F2", bg: "#E7F0FD", desc: "Publications quotidiennes, lives et témoignages" },
                  { nom: "YouTube", icon: "fab fa-youtube", handle: "@VPEMinistere", color: "#FF0000", bg: "#FEE2E2", desc: "Messages vidéo, veillées & conférences" },
                  { nom: "Instagram", icon: "fab fa-instagram", handle: "@vpe_ministere", color: "#E1306C", bg: "#FDE7F0", desc: "Moments forts, versets du jour & galerie" },
                  { nom: "TikTok", icon: "fab fa-tiktok", handle: "@vivrepourleternal", color: "#000000", bg: "#F1F1F1", desc: "Courts messages inspirants & témoignages" },
                  { nom: "WhatsApp", icon: "fab fa-whatsapp", handle: "Groupe VPE", color: "#25D366", bg: "#DCFCE7", desc: "Communauté d'entraide & partage de Parole" },
                  { nom: "Telegram", icon: "fab fa-telegram-plane", handle: "@VPEMinistere", color: "#0088CC", bg: "#E0F2FE", desc: "Annonces officielles & enseignements audio" },
                ].map(s => (
                  <a key={s.nom} href="#" className="card reveal"
                    style={{ display: 'flex', gap: '1rem', alignItems: 'center', textDecoration: 'none', color: 'inherit', transition: 'transform .2s' }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
                    <div style={{ width: 48, height: 48, borderRadius: 12, background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: s.color, fontSize: '1.3rem', flexShrink: 0 }}>
                      <i className={s.icon} />
                    </div>
                    <div>
                      <p style={{ margin: '0 0 .15rem', fontWeight: 700, color: 'var(--text)', fontSize: '.9rem' }}>{s.nom}</p>
                      <p style={{ margin: '0 0 .2rem', fontSize: '.78rem', color: s.color, fontWeight: 600 }}>{s.handle}</p>
                      <p style={{ margin: 0, fontSize: '.75rem', color: 'var(--text2)' }}>{s.desc}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}

        </div>
      </section>
    </>
  )
}
