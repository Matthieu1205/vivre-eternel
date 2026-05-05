import { useState } from 'react'

const infos = [
  { icon: 'fas fa-envelope', label: 'Email', value: 'contact@vivrepourleternel.org', link: 'mailto:contact@vivrepourleternel.org' },
  { icon: 'fab fa-whatsapp', label: 'WhatsApp', value: '+225 07 00 00 00 00', link: 'https://wa.me/2250700000000', highlight: true },
  { icon: 'fas fa-map-marker-alt', label: 'Adresse', value: "Abidjan, Côte d'Ivoire", link: 'https://maps.google.com/?q=Abidjan' },
  { icon: 'fas fa-clock', label: 'Rassemblements', value: 'Dimanche 10h · Mercredi 19h', link: '#' },
]

const socials = [
  { icon: 'fab fa-facebook-f', label: 'Facebook', url: '#', color: '#1877F2' },
  { icon: 'fab fa-youtube', label: 'YouTube', url: '#', color: '#FF0000' },
  { icon: 'fab fa-instagram', label: 'Instagram', url: '#', color: '#E4405F' },
  { icon: 'fab fa-whatsapp', label: 'WhatsApp', url: '#', color: '#25D366' },
]

export default function Contact() {
  const [form, setForm] = useState({ nom: '', email: '', sujet: '', message: '' })
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)

  const update = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const submit = async e => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 1200))
    setLoading(false)
    setStatus('success')
    setForm({ nom: '', email: '', sujet: '', message: '' })
  }

  return (
    <section id="contact" className="section section-alt">
      <div className="container">
        <span className="section-label reveal">Nous Rejoindre</span>
        <h2 className="section-title reveal">Nous <span>Contacter</span></h2>
        <p className="section-sub reveal">Nous serions heureux d&apos;entendre de vous. Chaque message est lu avec attention et amour.</p>

        <div className="contact-grid">
          <div>
            <div className="contact-infos reveal">
              {infos.map((info, i) => (
                <a key={i} href={info.link} className="contact-info-item" target={info.link.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">
                  <div className="contact-info-icon" style={info.highlight ? { background: 'rgba(37,211,102,.15)', borderColor: 'rgba(37,211,102,.3)', color: '#25D366' } : {}}>
                    <i className={info.icon} style={info.highlight ? { color: '#25D366' } : {}} />
                  </div>
                  <div>
                    <p style={{ margin: 0, fontSize: '.75rem', textTransform: 'uppercase', letterSpacing: '.1em', color: 'var(--text2)' }}>{info.label}</p>
                    <strong style={{ color: 'var(--white)', fontSize: '.95rem' }}>{info.value}</strong>
                  </div>
                </a>
              ))}
            </div>

            <div className="reveal" style={{ marginTop: '2.5rem' }}>
              <p style={{ color: 'var(--text2)', fontSize: '.85rem', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '.1em' }}>
                Suivez-nous
              </p>
              <div style={{ display: 'flex', gap: '1rem' }}>
                {socials.map((s, i) => (
                  <a key={i} href={s.url} className="social-link" aria-label={s.label}>
                    <i className={s.icon} />
                  </a>
                ))}
              </div>
            </div>

            <div className="verse-block reveal" style={{ marginTop: '2.5rem' }}>
              <p>Approchez-vous de Dieu, et il s&apos;approchera de vous.</p>
              <cite>Jacques 4:8</cite>
            </div>
          </div>

          <div className="reveal">
            {status === 'success' ? (
              <div className="form-success">
                <div style={{ marginBottom: '1rem' }}><i className="fas fa-envelope" style={{ fontSize: '3rem', color: 'var(--gold)' }} /></div>
                <h3 style={{ color: 'var(--gold)' }}>Message envoyé !</h3>
                <p>Merci pour votre message. Nous vous répondrons dans les plus brefs délais.</p>
                <button className="btn btn-outline" onClick={() => setStatus('')} style={{ marginTop: '1.5rem' }}>
                  Envoyer un autre message
                </button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={submit}>
                <div className="form-row">
                  <div className="form-group">
                    <label>Votre Nom *</label>
                    <input type="text" name="nom" value={form.nom} onChange={update}
                      placeholder="Prénom Nom" required />
                  </div>
                  <div className="form-group">
                    <label>Email *</label>
                    <input type="email" name="email" value={form.email} onChange={update}
                      placeholder="votre@email.com" required />
                  </div>
                </div>

                <div className="form-group">
                  <label>Sujet</label>
                  <select name="sujet" value={form.sujet} onChange={update}>
                    <option value="">Choisir un sujet</option>
                    <option>Demande de prière</option>
                    <option>Informations sur les programmes</option>
                    <option>Rejoindre l&apos;équipe</option>
                    <option>Partenariat &amp; Soutien</option>
                    <option>Invitation / Conférence</option>
                    <option>Autre</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Message *</label>
                  <textarea name="message" value={form.message} onChange={update} rows={6}
                    placeholder="Comment pouvons-nous vous aider ?" required />
                </div>

                <button type="submit" className="btn btn-gold" disabled={loading} style={{ width: '100%' }}>
                  {loading
                    ? <><i className="fas fa-spinner fa-spin" /> Envoi en cours…</>
                    : <><i className="fas fa-paper-plane" /> Envoyer le message</>
                  }
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
