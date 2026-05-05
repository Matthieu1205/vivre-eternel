import { useState } from 'react'
import { NavLink, useNavigate, Outlet } from 'react-router-dom'
import { logout } from '../lib/adminAuth'

const nav = [
  { to: '/admin/dashboard',    icon: 'fas fa-chart-bar',       label: 'Tableau de bord' },
  { to: '/admin/annonce',      icon: 'fas fa-exclamation-circle', label: 'Annonce urgente' },
  { to: '/admin/programmes',   icon: 'fas fa-clipboard-list',  label: 'Programmes' },
  { to: '/admin/enseignements',icon: 'fas fa-headphones',      label: 'Enseignements' },
  { to: '/admin/activites',    icon: 'fas fa-globe',           label: 'Activités' },
  { to: '/admin/temoignages',  icon: 'fas fa-comments',        label: 'Témoignages' },
  { to: '/admin/partenaires',  icon: 'fas fa-handshake',       label: 'Partenaires' },
  { to: '/admin/mediatheque',  icon: 'fas fa-folder-open',     label: 'Médiathèque' },
]

export default function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false)
  const navigate = useNavigate()

  const handleLogout = () => { logout(); navigate('/admin') }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'system-ui, sans-serif', background: '#f1f5f9' }}>
      {/* Sidebar */}
      <aside style={{
        width: collapsed ? 64 : 240, background: '#0c1a2e', color: '#fff',
        display: 'flex', flexDirection: 'column', transition: 'width .25s', flexShrink: 0
      }}>
        {/* Logo */}
        <div style={{ padding: '1.25rem 1rem', display: 'flex', alignItems: 'center', gap: '.75rem', borderBottom: '1px solid rgba(255,255,255,.08)' }}>
          <img src="/logo.png" alt="" style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }}
            onError={e => { e.target.style.display = 'none' }} />
          {!collapsed && <div>
            <p style={{ margin: 0, fontWeight: 800, fontSize: '.85rem', lineHeight: 1.2 }}>VPE Admin</p>
            <p style={{ margin: 0, fontSize: '.7rem', color: '#94a3b8' }}>Backoffice</p>
          </div>}
          <button onClick={() => setCollapsed(!collapsed)}
            style={{ marginLeft: 'auto', background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '1rem', padding: '.25rem' }}>
            {collapsed ? '→' : '←'}
          </button>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '.75rem .5rem', display: 'flex', flexDirection: 'column', gap: '.25rem' }}>
          {nav.map(n => (
            <NavLink key={n.to} to={n.to}
              style={({ isActive }) => ({
                display: 'flex', alignItems: 'center', gap: '.75rem', padding: '.65rem .75rem',
                borderRadius: 10, textDecoration: 'none', fontSize: '.88rem', fontWeight: 500,
                color: isActive ? '#fff' : '#94a3b8',
                background: isActive ? 'rgba(2,132,199,.35)' : 'transparent',
                transition: 'all .15s', whiteSpace: 'nowrap', overflow: 'hidden'
              })}>
              <i className={n.icon} style={{ fontSize: '.95rem', width: 16, textAlign: 'center', flexShrink: 0 }} />
              {!collapsed && n.label}
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div style={{ padding: '.75rem .5rem', borderTop: '1px solid rgba(255,255,255,.08)' }}>
          <a href="/" target="_blank" rel="noreferrer"
            style={{ display: 'flex', alignItems: 'center', gap: '.75rem', padding: '.6rem .75rem', borderRadius: 10, color: '#94a3b8', textDecoration: 'none', fontSize: '.82rem', whiteSpace: 'nowrap', overflow: 'hidden' }}>
            <i className="fas fa-external-link-alt" style={{ fontSize: '.9rem', width: 16, textAlign: 'center', flexShrink: 0 }} />{!collapsed && 'Voir le site'}
          </a>
          <button onClick={handleLogout}
            style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '.75rem', padding: '.6rem .75rem', borderRadius: 10, background: 'none', border: 'none', color: '#f87171', cursor: 'pointer', fontSize: '.82rem', whiteSpace: 'nowrap', overflow: 'hidden' }}>
            <i className="fas fa-sign-out-alt" style={{ fontSize: '.9rem', width: 16, textAlign: 'center', flexShrink: 0 }} />{!collapsed && 'Déconnexion'}
          </button>
        </div>
      </aside>

      {/* Main */}
      <main style={{ flex: 1, overflow: 'auto' }}>
        <Outlet />
      </main>
    </div>
  )
}
