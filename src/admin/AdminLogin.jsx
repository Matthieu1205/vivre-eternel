import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../lib/adminAuth'

export default function AdminLogin() {
  const [pwd, setPwd] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const submit = async e => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 600))
    if (login(pwd)) {
      navigate('/admin/dashboard')
    } else {
      setError('Mot de passe incorrect.')
    }
    setLoading(false)
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
            <label style={{ fontSize: '.82rem', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '.4rem' }}>
              MOT DE PASSE ADMIN
            </label>
            <input
              type="password"
              value={pwd}
              onChange={e => { setPwd(e.target.value); setError('') }}
              placeholder="••••••••••"
              required
              style={{
                width: '100%', padding: '.85rem 1rem', border: `2px solid ${error ? '#ef4444' : '#e2e8f0'}`,
                borderRadius: 10, fontSize: '1rem', outline: 'none', boxSizing: 'border-box',
                transition: 'border-color .2s'
              }}
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
