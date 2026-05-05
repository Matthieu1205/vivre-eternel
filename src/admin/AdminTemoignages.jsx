import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export default function AdminTemoignages() {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('tous')

  useEffect(() => { fetchData() }, [])

  async function fetchData() {
    setLoading(true)
    const { data } = await supabase.from('temoignages').select('*').order('created_at', { ascending: false })
    setRows(data || [])
    setLoading(false)
  }

  async function updateStatus(id, statut) {
    await supabase.from('temoignages').update({ statut }).eq('id', id)
    setRows(r => r.map(x => x.id === id ? { ...x, statut } : x))
  }

  async function deleteRow(id) {
    await supabase.from('temoignages').delete().eq('id', id)
    setRows(r => r.filter(x => x.id !== id))
  }

  const filtered = filter === 'tous' ? rows : rows.filter(r => r.statut === filter)

  const statusColor = { approuve: '#059669', en_attente: '#D97706', refuse: '#DC2626' }
  const statusMeta  = {
    approuve:   { icon: 'fas fa-check-circle',  label: 'Approuvé'   },
    en_attente: { icon: 'fas fa-clock',          label: 'En attente' },
    refuse:     { icon: 'fas fa-times-circle',   label: 'Refusé'     },
  }

  return (
    <div style={{ padding: '2rem', minHeight: '100vh', background: '#f1f5f9' }}>

      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg,#0c1f3f,#0369a1)',
        borderRadius: 20, padding: '1.75rem 2rem', marginBottom: '1.5rem',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        flexWrap: 'wrap', gap: '1rem',
        boxShadow: '0 6px 28px rgba(2,132,199,.22)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: 52, height: 52, borderRadius: 14, background: 'rgba(255,255,255,.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <i className="fas fa-comments" style={{ fontSize: '1.25rem', color: '#fff' }} />
          </div>
          <div>
            <h1 style={{ margin: 0, fontSize: '1.45rem', fontWeight: 800, color: '#fff' }}>Témoignages</h1>
            <p style={{ margin: '.15rem 0 0', color: 'rgba(255,255,255,.7)', fontSize: '.82rem' }}>{rows.length} témoignage{rows.length !== 1 ? 's' : ''}</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '.5rem', flexWrap: 'wrap' }}>
          {[
            { v: 'tous',       label: 'Tous',        icon: 'fas fa-list' },
            { v: 'en_attente', label: 'En attente',  icon: 'fas fa-clock' },
            { v: 'approuve',   label: 'Approuvés',   icon: 'fas fa-check-circle' },
            { v: 'refuse',     label: 'Refusés',     icon: 'fas fa-times-circle' },
          ].map(s => (
            <button key={s.v} onClick={() => setFilter(s.v)} style={{
              padding: '.5rem .9rem', borderRadius: 8, border: 'none', cursor: 'pointer',
              fontSize: '.78rem', fontWeight: 600,
              background: filter === s.v ? '#fff' : 'rgba(255,255,255,.12)',
              color: filter === s.v ? '#0369a1' : 'rgba(255,255,255,.85)',
              display: 'flex', alignItems: 'center', gap: '.4rem',
            }}>
              <i className={s.icon} />{s.label}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '5rem', color: '#94a3b8' }}>
          <i className="fas fa-spinner fa-spin" style={{ fontSize: '2rem', display: 'block', marginBottom: '.75rem' }} />
          <p style={{ margin: 0, fontSize: '.9rem' }}>Chargement…</p>
        </div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem', background: '#fff', borderRadius: 16, color: '#94a3b8' }}>
          <i className="fas fa-inbox" style={{ fontSize: '2.5rem', display: 'block', marginBottom: '1rem', color: '#cbd5e1' }} />
          <p style={{ margin: 0, fontWeight: 600 }}>Aucun témoignage pour ce filtre.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {filtered.map(row => {
            const meta = statusMeta[row.statut] || { icon: 'fas fa-question', label: row.statut }
            return (
              <div key={row.id} style={{ background: '#fff', borderRadius: 16, padding: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,.05)', borderLeft: `4px solid ${statusColor[row.statut] || '#e2e8f0'}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', flexWrap: 'wrap' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '.75rem', marginBottom: '.5rem', flexWrap: 'wrap' }}>
                      <strong style={{ color: '#0c1a2e' }}>{row.nom || 'Anonyme'}</strong>
                      <span style={{ fontSize: '.75rem', color: '#94a3b8' }}>{row.created_at ? new Date(row.created_at).toLocaleDateString('fr-FR') : ''}</span>
                      <span style={{ padding: '.18rem .65rem', borderRadius: 20, fontSize: '.72rem', fontWeight: 700, background: '#f0fdf4', color: statusColor[row.statut] || '#374151', display: 'inline-flex', alignItems: 'center', gap: '.3rem' }}>
                        <i className={meta.icon} />{meta.label}
                      </span>
                    </div>
                    <p style={{ margin: 0, color: '#374151', fontSize: '.9rem', lineHeight: 1.65 }}>{row.contenu}</p>
                  </div>
                  <div style={{ display: 'flex', gap: '.5rem', flexShrink: 0, flexWrap: 'wrap' }}>
                    {row.statut !== 'approuve' && (
                      <button onClick={() => updateStatus(row.id, 'approuve')} style={{ padding: '.42rem .85rem', background: '#f0fdf4', color: '#059669', border: '1px solid #a7f3d0', borderRadius: 8, cursor: 'pointer', fontSize: '.78rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '.35rem' }}>
                        <i className="fas fa-check" /> Approuver
                      </button>
                    )}
                    {row.statut !== 'refuse' && (
                      <button onClick={() => updateStatus(row.id, 'refuse')} style={{ padding: '.42rem .85rem', background: '#fef2f2', color: '#dc2626', border: '1px solid #fecaca', borderRadius: 8, cursor: 'pointer', fontSize: '.78rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '.35rem' }}>
                        <i className="fas fa-times" /> Refuser
                      </button>
                    )}
                    <button onClick={() => deleteRow(row.id)} style={{ padding: '.42rem .85rem', background: '#fef2f2', color: '#dc2626', border: '1px solid #fecaca', borderRadius: 8, cursor: 'pointer', fontSize: '.78rem', fontWeight: 600 }}>
                      <i className="fas fa-trash-alt" />
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
