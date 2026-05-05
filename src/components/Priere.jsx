import { useState } from 'react'

const besoins = [
  { icon: 'fas fa-hospital', label: 'Guérison & Santé', desc: 'Pour les malades et leurs familles' },
  { icon: 'fas fa-users', label: 'Restauration Familiale', desc: 'Pour les mariages et foyers éprouvés' },
  { icon: 'fas fa-briefcase', label: 'Provision & Emploi', desc: 'Pour les besoins matériels et financiers' },
  { icon: 'fas fa-unlock', label: 'Délivrance', desc: 'Pour briser toute forme de liens' },
  { icon: 'fas fa-globe', label: 'Intercession pour les Nations', desc: 'Pour la paix et le réveil mondial' },
  { icon: 'fas fa-graduation-cap', label: 'Projets & Vocation', desc: 'Pour les études, carrières et appels divins' },
]

export default function Priere() {
  const [form, setForm] = useState({ nom: '', email: '', categorie: '', priere: '', confidentiel: false })
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)

  const update = e => {
    const { name, value, type, checked } = e.target
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
  }

  const submit = async e => {
    e.preventDefault()
    if (!form.priere.trim()) { setStatus('error'); return }
    setLoading(true)
    await new Promise(r => setTimeout(r, 1200))
    setLoading(false)
    setStatus('success')
    setForm({ nom: '', email: '', categorie: '', priere: '', confidentiel: false })
  }

  return (
    <section id="priere" className="section section-alt">
      <div className="container">
        <span className="section-label reveal">Mur d&apos;Intercession</span>
        <h2 className="section-title reveal">Soumettre une <span>Prière</span></h2>
        <p className="section-sub reveal">Votre besoin est confié à notre équipe d&apos;intercesseurs dévoués. Nous prions pour vous.</p>

        <div className="prayer-grid">
          <div>
            <h3 className="reveal" style={{ color: 'var(--gold)', marginBottom: '1.5rem', fontSize: '1.1rem', textTransform: 'uppercase', letterSpacing: '.08em' }}>
              Domaines de prière
            </h3>
            <div className="prayer-needs reveal">
              {besoins.map((b, i) => (
                <div key={i} className="prayer-need-item" onClick={() => setForm(f => ({ ...f, categorie: b.label }))}>
                  <i className={b.icon} style={{ fontSize: '1.5rem', color: 'var(--blue)' }} />
                  <div>
                    <strong>{b.label}</strong>
                    <p style={{ margin: 0, fontSize: '.8rem', color: 'var(--text2)' }}>{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="verse-block reveal" style={{ marginTop: '2rem' }}>
              <p>Confessez donc vos péchés les uns aux autres, et priez les uns pour les autres, afin que vous soyez guéris. La prière fervente du juste a une grande efficace.</p>
              <cite>Jacques 5:16</cite>
            </div>
          </div>

          <div className="reveal">
            {status === 'success' ? (
              <div className="form-success">
                <div style={{ marginBottom: '1rem' }}><i className="fas fa-hands-praying" style={{ fontSize: '3rem', color: 'var(--gold)' }} /></div>
                <h3 style={{ color: 'var(--gold)' }}>Prière reçue !</h3>
                <p>Notre équipe d&apos;intercesseurs a reçu votre demande. Nous nous engageons à prier pour vous avec foi et constance.</p>
                <p style={{ fontSize: '.85rem', color: 'var(--text2)' }}>Que la paix de Dieu qui surpasse toute intelligence garde votre coeur. — Phil. 4:7</p>
                <button className="btn btn-outline" onClick={() => setStatus('')} style={{ marginTop: '1.5rem' }}>
                  Soumettre une autre prière
                </button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={submit}>
                <div className="form-row">
                  <div className="form-group">
                    <label>Votre Nom</label>
                    <input type="text" name="nom" value={form.nom} onChange={update} placeholder="Nom (optionnel)" />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input type="email" name="email" value={form.email} onChange={update} placeholder="Pour recevoir une réponse" />
                  </div>
                </div>

                <div className="form-group">
                  <label>Catégorie de prière</label>
                  <select name="categorie" value={form.categorie} onChange={update}>
                    <option value="">Choisir une catégorie</option>
                    {besoins.map(b => <option key={b.label} value={b.label}>{b.label}</option>)}
                    <option value="Autre">Autre</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Votre demande de prière *</label>
                  <textarea name="priere" value={form.priere} onChange={update} rows={6}
                    placeholder="Partagez librement votre besoin. Dieu entend chaque prière sincère..."
                    required />
                  {status === 'error' && <span className="form-error">Veuillez décrire votre demande de prière.</span>}
                </div>

                <label className="form-check">
                  <input type="checkbox" name="confidentiel" checked={form.confidentiel} onChange={update} />
                  <span>Demande confidentielle (partagée uniquement avec les intercesseurs)</span>
                </label>

                <button type="submit" className="btn btn-gold" disabled={loading} style={{ width: '100%', marginTop: '1rem' }}>
                  {loading
                    ? <><i className="fas fa-spinner fa-spin" /> Envoi en cours…</>
                    : <><i className="fas fa-hands-praying" /> Soumettre ma prière</>
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
