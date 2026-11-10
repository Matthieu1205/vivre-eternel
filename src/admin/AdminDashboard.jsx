import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'

const stats = [
  { label: 'Programmes',   icon: 'fas fa-clipboard-list', color: '#0284C7', to: '/admin/programmes',    key: 'programmes' },
  { label: 'Enseignements',icon: 'fas fa-headphones',     color: '#7C3AED', to: '/admin/enseignements', key: 'enseignements' },
  { label: 'Activités',    icon: 'fas fa-globe',          color: '#059669', to: '/admin/activites',     key: 'activites' },
  { label: 'Témoignages',  icon: 'fas fa-comments',       color: '#D97706', to: '/admin/temoignages',   key: 'temoignages' },
  { label: 'Partenaires',  icon: 'fas fa-handshake',      color: '#DC2626', to: '/admin/partenaires',   key: 'partenaires' },
]

// Ce qui attend une action de l'équipe.
const todo = [
  { label: 'Témoignages à modérer', icon: 'fas fa-comments',       color: '#D97706', to: '/admin/temoignages', table: 'temoignages',          filter: q => q.eq('statut', 'en_attente') },
  { label: 'Messages de contact',   icon: 'fas fa-envelope',       color: '#0284C7', to: '/admin/messages',    table: 'messages_contact',     filter: q => q.eq('traite', false) },
  { label: 'Demandes de prière',    icon: 'fas fa-hands-praying',  color: '#7C3AED', to: '/admin/messages',    table: 'demandes_priere',      filter: q => q.eq('traite', false) },
  { label: 'Demandes de partenariat', icon: 'fas fa-handshake',    color: '#059669', to: '/admin/messages',    table: 'demandes_partenariat', filter: q => q.eq('traite', false) },
  { label: 'Inscrits newsletter',   icon: 'fas fa-paper-plane',    color: '#475569', to: '/admin/messages',    table: 'newsletter',           filter: q => q },
]

function Card({ children, style }) {
  return <div style={{ background: '#fff', borderRadius: 16, padding: '1.5rem', boxShadow: '0 1px 4px rgba(0,0,0,.06)', ...style }}>{children}</div>
}

export default function AdminDashboard() {
  const [counts, setCounts] = useState({})
  const [todoCounts, setTodoCounts] = useState({})

  useEffect(() => {
    async function fetchCounts() {
      const count = q => q.then(({ count }) => count ?? '–')
      const [a, b] = await Promise.all([
        Promise.all(stats.map(s => count(supabase.from(s.key).select('*', { count: 'exact', head: true })))),
        Promise.all(todo.map(t => count(t.filter(supabase.from(t.table).select('*', { count: 'exact', head: true }))))),
      ])
      setCounts(Object.fromEntries(stats.map((s, i) => [s.key, a[i]])))
      setTodoCounts(Object.fromEntries(todo.map((t, i) => [t.label, b[i]])))
    }
    fetchCounts()
  }, [])

  return (
    <div style={{ padding: '2rem' }}>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ margin: 0, fontSize: '1.75rem', fontWeight: 800, color: '#0c1a2e' }}>Tableau de bord</h1>
        <p style={{ margin: '.35rem 0 0', color: '#64748b', fontSize: '.9rem' }}>
          Bienvenue dans le backoffice — Vivre pour l'Éternel
        </p>
      </div>

      {/* À traiter */}
      <h2 style={{ margin: '0 0 .75rem', fontSize: '1rem', fontWeight: 700, color: '#0c1a2e' }}>À traiter</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        {todo.map(t => (
          <Link key={t.label} to={t.to} style={{ textDecoration: 'none' }}>
            <Card style={{ display: 'flex', flexDirection: 'column', gap: '.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <i className={t.icon} style={{ fontSize: '1.3rem', color: t.color }} />
                <span style={{ fontSize: '1.75rem', fontWeight: 800, color: t.color }}>{todoCounts[t.label] ?? '…'}</span>
              </div>
              <p style={{ margin: 0, fontSize: '.85rem', fontWeight: 600, color: '#374151' }}>{t.label}</p>
            </Card>
          </Link>
        ))}
      </div>

      {/* Stats */}
      <h2 style={{ margin: '0 0 .75rem', fontSize: '1rem', fontWeight: 700, color: '#0c1a2e' }}>Contenu du site</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        {stats.map(s => (
          <Link key={s.key} to={s.to} style={{ textDecoration: 'none' }}>
            <Card style={{ display: 'flex', flexDirection: 'column', gap: '.5rem', cursor: 'pointer', transition: 'transform .15s', ':hover': { transform: 'translateY(-2px)' } }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <i className={s.icon} style={{ fontSize: '1.3rem', color: s.color }} />
                <span style={{ fontSize: '1.75rem', fontWeight: 800, color: s.color }}>
                  {counts[s.key] ?? '…'}
                </span>
              </div>
              <p style={{ margin: 0, fontSize: '.85rem', fontWeight: 600, color: '#374151' }}>{s.label}</p>
            </Card>
          </Link>
        ))}
      </div>

      {/* Accès rapide */}
      <Card>
        <h2 style={{ margin: '0 0 1.25rem', fontSize: '1.1rem', fontWeight: 700, color: '#0c1a2e' }}>Accès rapide</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '.75rem' }}>
          {[
            { to: '/admin/programmes',    icon: 'fas fa-plus',          label: 'Ajouter un programme',  color: '#0284C7' },
            { to: '/admin/enseignements', icon: 'fas fa-music',         label: 'Nouvel enseignement',   color: '#7C3AED' },
            { to: '/admin/activites',     icon: 'fas fa-calendar-alt',  label: 'Nouvelle activité',     color: '#059669' },
            { to: '/admin/temoignages',   icon: 'fas fa-check-circle',  label: 'Modérer témoignages',   color: '#D97706' },
            { to: '/admin/partenaires',   icon: 'fas fa-handshake',     label: 'Gérer partenaires',     color: '#DC2626' },
          ].map(a => (
            <Link key={a.to} to={a.to} style={{
              display: 'flex', alignItems: 'center', gap: '.75rem', padding: '.85rem 1rem',
              background: '#f8fafc', borderRadius: 10, textDecoration: 'none',
              border: `1px solid #e2e8f0`, transition: 'background .15s'
            }}>
              <i className={a.icon} style={{ fontSize: '1rem', color: a.color, width: 18, textAlign: 'center' }} />
              <span style={{ fontSize: '.85rem', fontWeight: 600, color: '#374151' }}>{a.label}</span>
            </Link>
          ))}
        </div>
      </Card>
    </div>
  )
}
