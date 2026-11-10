import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

const SUJETS = { priere: 'Demande de prière', info: 'Informations générales', partenariat: 'Partenariat', don: 'Don & Soutien', evenement: 'Événement', autre: 'Autre' }
const TYPES_PARTENARIAT = { priant: 'Partenaire Priant', financier: 'Partenaire Financier', strategique: 'Partenaire Stratégique' }

// Chaque onglet décrit sa table et comment afficher une ligne.
const TABS = [
  {
    id: 'contact', table: 'messages_contact', label: 'Contact', icon: 'fas fa-envelope',
    title: r => r.nom,
    meta: r => [r.email, SUJETS[r.sujet] || r.sujet],
    body: r => r.message,
    replyTo: r => r.email,
  },
  {
    id: 'priere', table: 'demandes_priere', label: 'Prières', icon: 'fas fa-hands-praying',
    title: r => r.nom || 'Anonyme',
    meta: r => [r.email, r.categorie, r.confidentiel && '🔒 Confidentielle'],
    body: r => r.priere,
    replyTo: r => r.email,
  },
  {
    id: 'partenariat', table: 'demandes_partenariat', label: 'Partenariats', icon: 'fas fa-handshake',
    title: r => r.organisation ? `${r.nom} — ${r.organisation}` : r.nom,
    meta: r => [r.email, r.telephone, TYPES_PARTENARIAT[r.type] || r.type],
    body: r => r.message,
    replyTo: r => r.email,
  },
  { id: 'newsletter', table: 'newsletter', label: 'Newsletter', icon: 'fas fa-paper-plane' },
]

const btn = (color, bg, border) => ({
  padding: '.42rem .85rem', background: bg, color, border: `1px solid ${border}`, borderRadius: 8,
  cursor: 'pointer', fontSize: '.78rem', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '.35rem', textDecoration: 'none',
})

function fmt(d) {
  return new Date(d).toLocaleString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}

function exportCsv(rows) {
  const csv = 'email,inscrit_le\n' + rows.map(r => `${r.email},${r.created_at}`).join('\n')
  const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }))
  const a = Object.assign(document.createElement('a'), { href: url, download: 'newsletter-vpe.csv' })
  a.click()
  URL.revokeObjectURL(url)
}

export default function AdminMessages() {
  const [tabId, setTabId] = useState('contact')
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('a_traiter')
  const [counts, setCounts] = useState({})
  const tab = TABS.find(t => t.id === tabId)
  const isNewsletter = tab.id === 'newsletter'

  async function loadCounts() {
    const entries = await Promise.all(TABS.filter(t => t.id !== 'newsletter').map(async t => {
      const { count } = await supabase.from(t.table).select('*', { count: 'exact', head: true }).eq('traite', false)
      return [t.id, count || 0]
    }))
    setCounts(Object.fromEntries(entries))
  }

  async function load() {
    setLoading(true)
    const { data, error } = await supabase.from(tab.table).select('*').order('created_at', { ascending: false })
    if (error) alert('Chargement impossible : ' + error.message)
    setRows(data || [])
    setLoading(false)
  }

  useEffect(() => { load() }, [tabId])
  useEffect(() => { loadCounts() }, [])

  async function toggleTraite(row) {
    const { error } = await supabase.from(tab.table).update({ traite: !row.traite }).eq('id', row.id)
    if (error) { alert('Mise à jour impossible : ' + error.message); return }
    setRows(r => r.map(x => x.id === row.id ? { ...x, traite: !row.traite } : x))
    loadCounts()
  }

  async function remove(row) {
    if (!confirm('Supprimer définitivement cet élément ? Cette action est irréversible.')) return
    const { error } = await supabase.from(tab.table).delete().eq('id', row.id)
    if (error) { alert('Suppression impossible : ' + error.message); return }
    setRows(r => r.filter(x => x.id !== row.id))
    loadCounts()
  }

  const shown = isNewsletter || filter === 'tous' ? rows : rows.filter(r => !r.traite)

  return (
    <div style={{ padding: '2rem', minHeight: '100vh', background: '#f1f5f9' }}>
      <div style={{
        background: 'linear-gradient(135deg, #0c1f3f 0%, #0369a1 100%)', borderRadius: 20, padding: '1.75rem 2rem',
        marginBottom: '1.5rem', color: '#fff', boxShadow: '0 6px 28px rgba(2,132,199,.22)',
      }}>
        <h1 style={{ margin: 0, fontSize: '1.45rem', fontWeight: 800 }}><i className="fas fa-inbox" /> Messages reçus</h1>
        <p style={{ margin: '.15rem 0 0', color: 'rgba(255,255,255,.65)', fontSize: '.82rem' }}>
          Tout ce que les visiteurs envoient depuis les formulaires du site.
        </p>
      </div>

      {/* Onglets */}
      <div style={{ display: 'flex', gap: '.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
        {TABS.map(t => (
          <button key={t.id} onClick={() => setTabId(t.id)} style={{
            padding: '.6rem 1.1rem', borderRadius: 10, cursor: 'pointer', fontWeight: 700, fontSize: '.85rem',
            border: `1.5px solid ${t.id === tabId ? '#0369a1' : '#e2e8f0'}`,
            background: t.id === tabId ? '#0369a1' : '#fff', color: t.id === tabId ? '#fff' : '#334155',
            display: 'inline-flex', alignItems: 'center', gap: '.45rem',
          }}>
            <i className={t.icon} /> {t.label}
            {counts[t.id] > 0 && (
              <span style={{ background: '#dc2626', color: '#fff', borderRadius: 20, padding: '0 .45rem', fontSize: '.72rem' }}>{counts[t.id]}</span>
            )}
          </button>
        ))}
      </div>

      {/* Filtre / export */}
      <div style={{ display: 'flex', gap: '.75rem', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
        {isNewsletter ? (
          <>
            <span style={{ color: '#475569', fontSize: '.88rem' }}>{rows.length} inscrit{rows.length > 1 ? 's' : ''}</span>
            <button onClick={() => exportCsv(rows)} disabled={!rows.length} style={btn('#0369a1', '#eff6ff', '#bae6fd')}>
              <i className="fas fa-file-csv" /> Exporter en CSV
            </button>
          </>
        ) : (
          [['a_traiter', 'À traiter'], ['tous', 'Tout afficher']].map(([v, l]) => (
            <button key={v} onClick={() => setFilter(v)} style={{
              ...btn(filter === v ? '#fff' : '#475569', filter === v ? '#475569' : '#fff', filter === v ? '#475569' : '#e2e8f0'),
            }}>{l}</button>
          ))
        )}
      </div>

      {loading ? (
        <div style={{ padding: '4rem', textAlign: 'center', color: '#94a3b8' }}><i className="fas fa-spinner fa-spin" style={{ fontSize: '1.6rem' }} /></div>
      ) : shown.length === 0 ? (
        <div style={{ padding: '4rem', textAlign: 'center', color: '#94a3b8', background: '#fff', borderRadius: 16 }}>
          <i className="fas fa-check-circle" style={{ fontSize: '2.2rem', color: '#cbd5e1', display: 'block', marginBottom: '.75rem' }} />
          {isNewsletter ? 'Aucun inscrit pour le moment.' : 'Rien à traiter. 🙏'}
        </div>
      ) : isNewsletter ? (
        <div style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,.06)' }}>
          {shown.map((r, i) => (
            <div key={r.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', padding: '.85rem 1.5rem', borderTop: i ? '1px solid #f1f5f9' : 'none' }}>
              <span style={{ color: '#0f172a', fontSize: '.9rem' }}>{r.email}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ color: '#94a3b8', fontSize: '.78rem' }}>{fmt(r.created_at)}</span>
                <button onClick={() => remove(r)} style={btn('#dc2626', '#fef2f2', '#fecaca')} aria-label="Désinscrire"><i className="fas fa-trash-alt" /></button>
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {shown.map(r => {
            const reply = tab.replyTo(r)
            return (
              <div key={r.id} style={{
                background: '#fff', borderRadius: 16, padding: '1.25rem 1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,.05)',
                borderLeft: `4px solid ${r.traite ? '#cbd5e1' : '#0284C7'}`, opacity: r.traite ? .75 : 1,
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap', marginBottom: '.5rem' }}>
                  <div>
                    <strong style={{ color: '#0c1a2e' }}>{tab.title(r)}</strong>
                    <div style={{ fontSize: '.78rem', color: '#64748b', marginTop: '.15rem' }}>
                      {tab.meta(r).filter(Boolean).join(' · ')}
                    </div>
                  </div>
                  <span style={{ fontSize: '.75rem', color: '#94a3b8' }}>{fmt(r.created_at)}</span>
                </div>
                {tab.body(r) && <p style={{ margin: '0 0 1rem', color: '#374151', fontSize: '.9rem', lineHeight: 1.65, whiteSpace: 'pre-wrap' }}>{tab.body(r)}</p>}
                <div style={{ display: 'flex', gap: '.5rem', flexWrap: 'wrap' }}>
                  <button onClick={() => toggleTraite(r)} style={r.traite ? btn('#475569', '#f1f5f9', '#e2e8f0') : btn('#059669', '#f0fdf4', '#a7f3d0')}>
                    {r.traite ? <><i className="fas fa-undo" /> Marquer à traiter</> : <><i className="fas fa-check" /> Marquer traité</>}
                  </button>
                  {reply && (
                    <a href={`mailto:${reply}`} style={btn('#0369a1', '#eff6ff', '#bae6fd')}><i className="fas fa-reply" /> Répondre</a>
                  )}
                  <button onClick={() => remove(r)} style={btn('#dc2626', '#fef2f2', '#fecaca')}><i className="fas fa-trash-alt" /> Supprimer</button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
