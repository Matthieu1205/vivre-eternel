import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { isAdmin, login } from '../lib/adminAuth'

const labelStyle = { fontSize: '.82rem', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '.4rem' }

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [pwd, setPwd] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  // Déjà connecté en tant qu'admin → directement au tableau de bord.
  useEffect(() => {
    isAdmin().then(ok => { if (ok) navigate('/admin/dashboard', { replace: true }) })
  }, [navigate])

  const submit = async e => {
    e.preventDefault()
    setLoading(true)
    const { error } = await login(email.trim(), pwd)
    setLoading(false)
    if (error) setError(error)
    else navigate('/admin/dashboard')
  }

  const inputStyle = {
    width: '100%', padding: '.85rem 1rem', border: `2px solid ${error ? '#ef4444' : '#e2e8f0'}`,
    borderRadius: 10, fontSize: '1rem', outline: 'none', boxSizing: 'border-box',
    transition: 'border-color .2s'
  }

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'linear-gradient(135deg, #0c1a2e 0%, #1e3a5f 100%)',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <div style={{
        background: '#fff', borderRadius: 20, padding: '3rem 2.5rem',
        width: '100%', maxWidth: 420, boxShadow: '0 24px 80px rgba(0,0,0,.3)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <img src="/logo.png" alt="VPE" style={{ width: 72, height: 72, borderRadius: '50%', objectFit: 'cover', marginBottom: '1rem' }}
            onError={e => { e.target.style.display = 'none' }} />
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0c1a2e', margin: 0 }}>Backoffice</h1>
          <p style={{ color: '#64748b', fontSize: '.9rem', marginTop: '.35rem' }}>Vivre pour l'Éternel</p>
        </div>
        <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={labelStyle}>EMAIL</label>
            <input
              type="email"
              autoComplete="username"
              value={email}
              onChange={e => { setEmail(e.target.value); setError('') }}
              placeholder="admin@exemple.com"
              required
              style={inputStyle}
            />
          </div>
          <div>
            <label style={labelStyle}>MOT DE PASSE</label>
            <input
              type="password"
              autoComplete="current-password"
              value={pwd}
              onChange={e => { setPwd(e.target.value); setError('') }}
              placeholder="••••••••••"
              required
              style={inputStyle}
            />
            {error && <p style={{ color: '#ef4444', fontSize: '.82rem', marginTop: '.35rem' }}>{error}</p>}
          </div>
          <button
            type="submit"
            disabled={loading}
            style={{
              padding: '.9rem', background: '#0284C7', color: '#fff', border: 'none',
              borderRadius: 10, fontWeight: 700, fontSize: '1rem', cursor: 'pointer',
              opacity: loading ? .7 : 1, transition: 'opacity .2s'
            }}
          >
            {loading ? 'Connexion…' : 'Se connecter'}
          </button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '.78rem', color: '#94a3b8' }}>
          Accès réservé aux administrateurs du ministère
        </p>
      </div>
    </div>
  )
}
