import { Link } from 'react-router-dom'
import { Inline, useCoordonnees, useSection } from '../lib/content'

export default function Footer() {
  const year = new Date().getFullYear()
  const coord = useCoordonnees()
  const pied = useSection('site.pied')
  const { reseaux = [] } = useSection('site.reseaux')
  const shortTel = t => String(t || '').replace(/^\+225\s*/, '')

  const cols = {
    'Ministère': [
      { to: '/a-propos', label: 'À Propos' },
      { to: '/programmes', label: 'Programmes' },
      { to: '/enseignements', label: 'Enseignements' },
      { to: '/activites', label: 'Activités' },
      { to: '/partenaires', label: 'Partenaires' },
    ],
    "S'impliquer": [
      { to: '/priere', label: 'Prière & Intercession' },
      { to: '/temoignages', label: 'Témoignages' },
      { to: '/soutenir', label: "Soutenir l'Œuvre" },
      { href: coord.waLink(''), label: 'WhatsApp', icon: 'fab fa-whatsapp' },
    ],
    'Contact': [
      { to: '/contact', label: 'Formulaire de contact' },
      coord.tel1 && { href: coord.telHref1, label: shortTel(coord.tel1), icon: 'fas fa-phone' },
      coord.tel2 && { href: coord.telHref2, label: shortTel(coord.tel2), icon: 'fas fa-phone' },
    ].filter(Boolean),
  }
  // Réseaux avec un lien renseigné, puis WhatsApp.
  const socials = [
    ...reseaux.filter(r => r.url && !/whatsapp/i.test(r.nom)).map(r => ({ icon: r.icon, url: r.url, label: r.nom })),
    { icon: 'fab fa-whatsapp', url: coord.waLink(''), label: 'WhatsApp' },
  ]
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div style={{ marginBottom: '1rem' }}>
              <img src="/logo.png" alt="Vivre pour l'Éternel" style={{ width: 80, height: 80, borderRadius: '50%', objectFit: 'cover', border: '2px solid rgba(255,255,255,.25)' }} />
            </div>
            <p className="footer-tagline" style={{ fontSize: '.8rem', lineHeight: 1.5, color: 'rgba(255,255,255,.7)', marginBottom: '.75rem' }}>
              <Inline text={pied.tagline} />
            </p>
            <p style={{ fontSize: '.75rem', color: 'rgba(255,255,255,.5)', lineHeight: 1.6 }}>
              <i className="fas fa-map-marker-alt" style={{ marginRight: '.4rem' }} /><Inline text={coord.adresse} />
            </p>
            {pied.verse_text && (
              <div className="verse-block" style={{ marginTop: '1.25rem', background: 'rgba(255,255,255,.06)', borderLeftColor: 'var(--gold2)' }}>
                <p style={{ color: 'rgba(255,255,255,.8)', fontSize: '.88rem', margin: '0 0 .35rem' }}>{pied.verse_text}</p>
                <cite style={{ color: 'var(--gold2)' }}>{pied.verse_ref}</cite>
              </div>
            )}
            <div style={{ display: 'flex', gap: '.65rem', marginTop: '1.25rem' }}>
              {socials.map(s => (
                <a key={s.label} href={s.url} aria-label={s.label} target="_blank" rel="noopener noreferrer" className="social-link"
                   style={{ borderColor: 'rgba(255,255,255,.2)', color: 'rgba(255,255,255,.6)' }}>
                  <i className={s.icon} />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(cols).map(([col, items]) => (
            <div key={col} className="footer-col">
              <h4 className="footer-col-title">{col}</h4>
              <ul className="footer-links">
                {items.map(item => (
                  <li key={item.label}>
                    {item.to
                      ? <Link to={item.to}>{item.label}</Link>
                      : <a href={item.href} target="_blank" rel="noopener noreferrer">{item.icon && <i className={item.icon} style={{ marginRight: '.4rem' }} />}{item.label}</a>
                    }
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="footer-bottom">
          <p>© {year} {pied.copyright}</p>
          <p>Fait avec <i className="fas fa-heart" style={{ color: '#e74c3c' }} /> pour la gloire de Dieu</p>
        </div>
      </div>
    </footer>
  )
}
