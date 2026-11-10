import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { isAdmin } from '../lib/adminAuth'

export default function PrivateRoute({ children }) {
  const [allowed, setAllowed] = useState(null) // null = vérification en cours

  useEffect(() => {
    let active = true
    isAdmin().then(ok => { if (active) setAllowed(ok) })
    const { data: { subscription } } = supabase.auth.onAuthStateChange(event => {
      if (event === 'SIGNED_OUT' && active) setAllowed(false)
    })
    return () => { active = false; subscription.unsubscribe() }
  }, [])

  if (allowed === null) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', fontFamily: 'system-ui, sans-serif' }}>
        <i className="fas fa-spinner fa-spin" style={{ fontSize: '1.6rem' }} />
      </div>
    )
  }
  return allowed ? children : <Navigate to="/admin" replace />
}
