import { useState } from 'react'
import { submitForm } from '../lib/data'
import { useSection } from '../lib/content'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const pied = useSection('site.pied')

  const submit = async e => {
    e.preventDefault()
    if (!email) return
    setLoading(true); setError('')
    const { error } = await submitForm('newsletter', { email: email.trim().toLowerCase() })
    setLoading(false)
    if (error) { setError(error); return }
    setDone(true)
    setEmail('')
  }

  return (
    <div className="newsletter-bar">
      <div className="container">
        <div className="newsletter-inner">
          <div className="newsletter-text">
            <h3><i className="fas fa-envelope" /> {pied.newsletter_titre}</h3>
            <p>{pied.newsletter_texte}</p>
          </div>
          {done ? (
            <div style={{ color: 'var(--gold)', fontFamily: 'var(--fs)', fontSize: '1.1rem' }}>
              <i className="fas fa-check-circle" /> Merci ! Vous êtes inscrit(e).
            </div>
          ) : (
            <form className="newsletter-form" onSubmit={submit}>
              <input
                type="email"
                placeholder="Votre adresse email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="btn btn-gold" disabled={loading}>
                {loading ? <i className="fas fa-spinner fa-spin" /> : <><i className="fas fa-paper-plane" /> S&apos;inscrire</>}
              </button>
            </form>
          )}
          {error && <p role="alert" style={{ color: '#fecaca', fontSize: '.85rem', margin: '.5rem 0 0', flexBasis: '100%' }}>{error}</p>}
        </div>
      </div>
    </div>
  )
}
