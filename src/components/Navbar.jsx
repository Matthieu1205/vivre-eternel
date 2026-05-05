import { useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const pages = [
  { to: '/', label: 'Accueil' },
  {
    base: '/a-propos', label: 'À Propos',
    sub: [
      { tab: 'presentation', label: 'Présentation' },
      { tab: 'vocation', label: 'La Vocation' },
      { tab: 'vision', label: 'La Vision' },
      { tab: 'mission', label: 'La Mission' },
      { tab: 'spiritualite', label: 'La Spiritualité' },
      { tab: 'responsable', label: 'Le Responsable' },
    ]
  },
  {
    base: '/priere', label: 'Prière & Intercession',
    sub: [
      { tab: 'formulaire', label: 'Demande de prière' },
      { tab: 'programme', label: 'Programme de prière' },
      { tab: 'intercession', label: 'Intercession' },
      { tab: 'rejoindre', label: 'Rejoindre les intercesseurs' },
    ]
  },
  {
    base: '/programmes', label: 'Programmes',
    sub: [
      { tab: 'couple', label: "L'Esprit Saint dans le Couple" },
      { tab: 'delivrance', label: 'Autorité sur les Eaux Profondes' },
      { tab: 'rosee', label: 'Rosée de Miséricorde' },
      { tab: 'louange', label: 'La Puissance de la Louange' },
      { tab: 'pastorale', label: 'Pastorale' },
    ]
  },
  {
    base: '/enseignements', label: 'Enseignements',
    sub: [
      { tab: 'audio', label: 'Messages audio' },
      { tab: 'video', label: 'Messages vidéo' },
      { tab: 'articles', label: 'Articles & Méditations' },
      { tab: 'versets', label: 'Versets du jour' },
    ]
  },
  {
    base: '/activites', label: 'Activités & Actions',
    sub: [
      { tab: 'terrain', label: 'Évangélisation terrain' },
      { tab: 'social', label: 'Actions sociales' },
      { tab: 'evenements', label: 'Événements' },
      { tab: 'galerie', label: 'Galerie photos/vidéos' },
    ]
  },
  {
    base: '/temoignages', label: 'Témoignages',
    sub: [
      { tab: 'ecrits', label: 'Témoignages écrits' },
      { tab: 'video', label: 'Témoignages vidéo' },
      { tab: 'partager', label: 'Partager mon témoignage' },
    ]
  },
  {
    base: '/partenaires', label: 'Partenaires',
    sub: [
      { tab: 'espoir', label: 'Centre Espoir' },
      { tab: 'artisan', label: 'Galerie Artisan' },
      { tab: 'grandmedias', label: 'Grand Médias' },
      { tab: 'afrikart', label: 'Afrik Art Dance' },
      { tab: 'wely', label: 'Wely Transport' },
      { tab: 'panivore', label: 'Panivore' },
    ]
  },
  {
    base: '/soutenir', label: "Soutenir l'Œuvre",
    sub: [
      { tab: 'don', label: 'Faire un don' },
      { tab: 'partenariat', label: 'Devenir partenaire' },
      { tab: 'spirituel', label: 'Soutien spirituel' },
    ]
  },
  { to: '/membre', label: 'Membre' },
]

function NavItem({ page, active }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const navigate = useNavigate()
  const timer = useRef(null)

  const handleEnter = () => { clearTimeout(timer.current); setOpen(true) }
  const handleLeave = () => { timer.current = setTimeout(() => setOpen(false), 160) }
  useEffect(() => () => clearTimeout(timer.current), [])

  /* Simple link (Accueil) */
  if (!page.sub) {
    return (
      <Link to={page.to} className={`nav-link${active ? ' active' : ''}`}>
        {page.label}
      </Link>
    )
  }

  return (
    <div ref={ref} className="nav-item-wrap" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      <Link
        to={`${page.base}/${page.sub[0].tab}`}
        className={`nav-link nav-link-drop${active ? ' active' : ''}`}
        onClick={() => setOpen(false)}
      >
        {page.label}
        <i className="fas fa-chevron-down nav-caret" style={{ transform: open ? 'rotate(180deg)' : 'rotate(0)' }} />
      </Link>

      {open && (
        <div className="nav-dropdown">
          {page.sub.map(s => (
            <button
              key={s.tab}
              className="nav-dropdown-item"
              onClick={() => { setOpen(false); navigate(`${page.base}/${s.tab}`) }}
            >
              {s.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileExpanded, setMobileExpanded] = useState(null)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => { setMobileOpen(false); setMobileExpanded(null) }, [location])

  const isActive = (page) =>
    page.to ? location.pathname === page.to : location.pathname.startsWith(page.base)

  return (
    <header className={`navbar${scrolled ? ' scrolled' : ''}`}>
      <nav className="nav-inner">
        {/* Logo */}
        <Link to="/" className="nav-logo">
          <img src="/logo.png" alt="Vivre pour l'Éternel" className="nav-logo-img" />
        </Link>

        {/* Desktop links */}
        <div className="nav-links">
          {pages.map(p => (
            <NavItem key={p.to || p.base} page={p} active={isActive(p)} />
          ))}
          <Link to="/contact/formulaire" className="nav-cta">
            Nous contacter
          </Link>
        </div>

        {/* Hamburger */}
        <button
          className={`hamburger${mobileOpen ? ' open' : ''}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* Mobile menu */}
      <div className={`mobile-menu${mobileOpen ? ' open' : ''}`}>
        {[...pages, { base: '/contact', label: 'Contact', sub: [{ tab: 'formulaire', label: 'Formulaire' }] }].map(p => (
          <div key={p.to || p.base} className="mobile-nav-item">
            <div className="mobile-nav-row">
              <Link
                to={p.to || `${p.base}/${p.sub?.[0]?.tab}`}
                className="mobile-nav-link"
                style={{ fontWeight: isActive(p) ? 700 : 500, color: isActive(p) ? 'var(--blue)' : 'var(--text)' }}
              >
                {p.label}
              </Link>
              {p.sub && p.sub.length > 1 && (
                <button
                  className="mobile-expand-btn"
                  onClick={() => setMobileExpanded(mobileExpanded === (p.to || p.base) ? null : (p.to || p.base))}
                >
                  <i className={`fas fa-chevron-${mobileExpanded === (p.to || p.base) ? 'up' : 'down'}`} />
                </button>
              )}
            </div>
            {p.sub && mobileExpanded === (p.to || p.base) && (
              <div className="mobile-sub-list">
                {p.sub.map(s => (
                  <button
                    key={s.tab}
                    onClick={() => { setMobileOpen(false); navigate(`${p.base}/${s.tab}`) }}
                    className="mobile-sub-item"
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </header>
  )
}
