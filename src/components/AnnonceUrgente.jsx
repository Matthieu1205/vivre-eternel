import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

const SESSION_KEY = 'vpe_annonce_dismissed'

export default function AnnonceUrgente() {
  const [annonce, setAnnonce] = useState(null)
  const [visible, setVisible] = useState(false)
  const [closing, setClosing] = useState(false)

  useEffect(() => {
    async function check() {
      if (sessionStorage.getItem(SESSION_KEY)) return
      const today = new Date().toISOString().slice(0, 10)
      const { data } = await supabase
        .from('annonces')
        .select('*')
        .lte('date_debut', today)
        .gte('date_fin', today)
        .order('created_at', { ascending: false })
        .limit(1)
      if (data?.length > 0) {
        setAnnonce(data[0])
        setTimeout(() => setVisible(true), 400)
      }
    }
    check()
  }, [])

  function dismiss() {
    setClosing(true)
    setTimeout(() => {
      sessionStorage.setItem(SESSION_KEY, '1')
      setVisible(false); setAnnonce(null); setClosing(false)
    }, 300)
  }

  if (!annonce || !visible) return null

  const hasImage = Boolean(annonce.image_url)
  const hasText  = Boolean(annonce.message)

  function fmt(d) {
    return new Date(d).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
  }

  return (
    <>
      <style>{`
        @keyframes fadeIn  { from{opacity:0} to{opacity:1} }
        @keyframes fadeOut { from{opacity:1} to{opacity:0} }
        @keyframes slideUp { from{opacity:0;transform:translateY(28px) scale(.97)} to{opacity:1;transform:translateY(0) scale(1)} }
        @keyframes pulse   { 0%,100%{box-shadow:0 0 0 0 rgba(220,38,38,.4)} 50%{box-shadow:0 0 0 10px rgba(220,38,38,0)} }
      `}</style>

      {/* Overlay */}
      <div
        onClick={e => { if (e.target === e.currentTarget) dismiss() }}
        style={{
          position: 'fixed', inset: 0, zIndex: 9999,
          background: 'rgba(15,23,42,.7)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '1.5rem',
          backdropFilter: 'blur(6px)',
          animation: closing ? 'fadeOut .3s forwards' : 'fadeIn .35s ease both',
        }}
      >
        {/* Carte */}
        <div style={{
          background: '#fff',
          borderRadius: 24,
          width: '100%',
          maxWidth: hasImage ? 560 : 480,
          overflow: 'hidden',
          boxShadow: '0 32px 80px rgba(0,0,0,.35)',
          animation: closing ? 'fadeOut .3s forwards' : 'slideUp .4s .1s both',
          maxHeight: '92vh',
          display: 'flex',
          flexDirection: 'column',
        }}>

          {/* ── Affiche image pleine largeur ── */}
          {hasImage && (
            <div style={{ position: 'relative', flexShrink: 0 }}>
              <img
                src={annonce.image_url}
                alt={annonce.titre}
                style={{ width: '100%', maxHeight: 380, objectFit: 'cover', display: 'block' }}
              />
              {/* Badge urgent sur l'image */}
              <div style={{ position: 'absolute', top: '1rem', left: '1rem' }}>
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: '.4rem',
                  background: 'rgba(220,38,38,.92)', color: '#fff',
                  fontSize: '.72rem', fontWeight: 800, letterSpacing: '.12em',
                  textTransform: 'uppercase', padding: '.35rem .85rem',
                  borderRadius: 20, backdropFilter: 'blur(4px)',
                  animation: 'pulse 2s infinite',
                }}>
                  <i className="fas fa-exclamation-circle" /> Information urgente
                </span>
              </div>
              {/* Bouton fermer sur l'image */}
              <button
                onClick={dismiss}
                aria-label="Fermer"
                style={{
                  position: 'absolute', top: '1rem', right: '1rem',
                  background: 'rgba(15,23,42,.6)', border: 'none',
                  color: '#fff', width: 34, height: 34, borderRadius: '50%',
                  cursor: 'pointer', fontSize: '1rem', backdropFilter: 'blur(4px)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >✕</button>
            </div>
          )}

          {/* ── Corps texte (scrollable si long) ── */}
          <div style={{ flex: 1, overflowY: 'auto' }}>

            {/* Header si pas d'image */}
            {!hasImage && (
              <div style={{ background: 'linear-gradient(135deg,#7f1d1d,#dc2626)', padding: '1.5rem 1.75rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '.9rem' }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(255,255,255,.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, animation: 'pulse 2s infinite' }}><i className="fas fa-exclamation-circle" style={{ fontSize: '1.3rem', color: '#fff' }} /></div>
                  <div>
                    <span style={{ fontSize: '.68rem', fontWeight: 800, letterSpacing: '.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,.75)', display: 'block', marginBottom: '.15rem' }}>Information urgente</span>
                    <h2 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800, color: '#fff', lineHeight: 1.3 }}>{annonce.titre}</h2>
                  </div>
                </div>
                <button onClick={dismiss} aria-label="Fermer" style={{ background: 'rgba(255,255,255,.2)', border: 'none', cursor: 'pointer', color: '#fff', width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', flexShrink: 0 }}>✕</button>
              </div>
            )}

            <div style={{ padding: hasImage ? '1.5rem 1.75rem' : '1.5rem 1.75rem' }}>

              {/* Titre sous l'image */}
              {hasImage && (
                <h2 style={{ margin: '0 0 .75rem', fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', lineHeight: 1.3 }}>
                  {annonce.titre}
                </h2>
              )}

              {/* Message */}
              {hasText && (
                <p style={{ margin: '0 0 1.25rem', fontSize: '.97rem', lineHeight: 1.8, color: '#334155', whiteSpace: 'pre-line' }}>
                  {annonce.message}
                </p>
              )}

              {/* Dates */}
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', background: '#f8fafc', borderRadius: 12, padding: '.9rem 1.1rem', border: '1px solid #e2e8f0', marginBottom: '1.25rem' }}>
                <div>
                  <p style={{ margin: '0 0 .2rem', fontSize: '.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.1em', color: '#94a3b8' }}>Début</p>
                  <p style={{ margin: 0, fontSize: '.88rem', fontWeight: 700, color: '#0f172a' }}><i className="fas fa-calendar-alt" style={{ marginRight: '.4rem', color: '#0284C7' }} />{fmt(annonce.date_debut)}</p>
                </div>
                <div style={{ width: 1, background: '#e2e8f0', alignSelf: 'stretch' }} />
                <div>
                  <p style={{ margin: '0 0 .2rem', fontSize: '.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.1em', color: '#94a3b8' }}>Fin</p>
                  <p style={{ margin: 0, fontSize: '.88rem', fontWeight: 700, color: '#0f172a' }}><i className="fas fa-calendar-alt" style={{ marginRight: '.4rem', color: '#0284C7' }} />{fmt(annonce.date_fin)}</p>
                </div>
              </div>

              {/* CTA */}
              <button
                onClick={dismiss}
                style={{
                  width: '100%', padding: '.95rem',
                  background: 'linear-gradient(135deg,#7f1d1d,#dc2626)',
                  color: '#fff', border: 'none', borderRadius: 12,
                  cursor: 'pointer', fontWeight: 700, fontSize: '1rem',
                  boxShadow: '0 4px 14px rgba(220,38,38,.35)',
                  transition: 'opacity .15s',
                }}
                onMouseEnter={e => e.currentTarget.style.opacity = '.9'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
              >
                J&apos;ai compris
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
