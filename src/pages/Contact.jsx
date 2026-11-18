import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { submitForm } from '../lib/data'
import FormError from '../components/FormError'
import { PageHero, Paragraphs, useCoordonnees, useSection } from '../lib/content'

function FormulaireSection() {
  const empty = { nom: '', email: '', sujet: '', message: '' }
  const [form, setForm] = useState(empty)
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const up = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  const submit = async e => {
    e.preventDefault(); setLoading(true); setError('')
    const { error } = await submitForm('messages_contact', {
      nom: form.nom.trim(), email: form.email.trim(), sujet: form.sujet || null, message: form.message.trim(),
    })
    setLoading(false)
    if (error) { setError(error); return }
    setStatus('ok'); setForm(empty)
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
      <FormError message={error} />
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
  const t = useSection('contact.textes')
  const coord = useCoordonnees()
  const { reseaux = [] } = useSection('site.reseaux')
  const adresse = (coord.adresse || '').split('\n')

  return (
    <>
      <PageHero section="contact.hero" crumb="Contact" icon="fas fa-envelope" />
      <section className="section">
        <div className="container">

          {active === 'formulaire' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '3rem', alignItems: 'start' }}>
              <div>
                <h3 style={{ fontFamily: 'var(--fs)', fontSize: '1.6rem', marginBottom: '1rem' }}>{t.formulaire_titre}</h3>
                <Paragraphs text={t.formulaire_texte} style={{ color: 'var(--text2)', marginBottom: '1.75rem' }} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {[
                    { icon: 'fa-envelope', titre: "Email", val: coord.email },
                    { icon: 'fa-phone', titre: "Téléphone 1", val: coord.tel1 },
                    { icon: 'fa-phone', titre: "Téléphone 2", val: coord.tel2 },
                    { icon: 'fa-clock', titre: "Disponibilité", val: coord.disponibilite },
                  ].filter(item => item.val).map(item => (
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
              <h3 style={{ fontFamily: 'var(--fs)', fontSize: '1.8rem', marginBottom: '1rem' }}>{t.whatsapp_titre}</h3>
              <Paragraphs text={t.whatsapp_texte} style={{ color: 'var(--text2)', marginBottom: '2rem', lineHeight: 1.8 }} />
              <div className="card" style={{ marginBottom: '1.5rem', textAlign: 'left' }}>
                <p style={{ fontWeight: 700, color: 'var(--blue)', marginBottom: '.5rem' }}>Numéro WhatsApp</p>
                <p style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text)' }}>{coord.tel1}</p>
                {coord.disponibilite && <p style={{ fontSize: '.82rem', color: 'var(--text2)', margin: 0 }}>Disponible {coord.disponibilite}</p>}
              </div>
              <a href={coord.waLink()}
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
                <h3 style={{ fontFamily: 'var(--fs)', fontSize: '1.6rem', marginBottom: '1rem' }}>{t.localisation_titre}</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {[
                    { icon: 'fas fa-map-marker-alt', titre: "Siège du Ministère", val: coord.adresse },
                    { icon: 'fas fa-clock', titre: "Horaires d'ouverture", val: coord.horaires },
                    { icon: 'fas fa-church', titre: "Culte & Réunions", val: coord.cultes },
                  ].filter(item => item.val).map(item => (
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
                  {adresse[0]}<br />
                  <span style={{ fontSize: '.82rem' }}>{adresse.slice(1).join(', ')}</span>
                </p>
                {coord.maps_url && <a href={coord.maps_url} target="_blank" rel="noopener noreferrer"
                  className="btn btn-outline" style={{ fontSize: '.82rem' }}>
                  <i className="fas fa-directions" /> Obtenir l&apos;itinéraire
                </a>}
              </div>
            </div>
          )}

          {active === 'reseaux' && (
            <div style={{ maxWidth: 700, margin: '0 auto' }}>
              <h3 style={{ fontFamily: 'var(--fs)', fontSize: '1.6rem', marginBottom: '1rem', textAlign: 'center' }}>{t.reseaux_titre}</h3>
              <Paragraphs text={t.reseaux_texte} style={{ color: 'var(--text2)', textAlign: 'center', marginBottom: '2rem' }} />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                {reseaux.map(s => ({ ...s, bg: `${s.color || '#0284C7'}1f` })).map(s => (
                  <a key={s.nom} href={s.url || '#'} target={s.url ? '_blank' : undefined} rel="noopener noreferrer" className="card reveal"
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
