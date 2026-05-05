import { Link } from 'react-router-dom'

const TEL1 = '+2250546457742'
const TEL2 = '+2250709045707'

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
    { href: `https://wa.me/${TEL1}`, label: 'WhatsApp', icon: 'fab fa-whatsapp' },
  ],
  'Contact': [
    { to: '/contact', label: 'Formulaire de contact' },
    { href: `tel:${TEL1}`, label: '05 46 45 77 42', icon: 'fas fa-phone' },
    { href: `tel:${TEL2}`, label: '07 09 04 57 07', icon: 'fas fa-phone' },
  ],
}

const socials = [
  { icon: 'fab fa-facebook-f', url: '#', label: 'Facebook' },
  { icon: 'fab fa-youtube', url: '#', label: 'YouTube' },
  { icon: 'fab fa-instagram', url: '#', label: 'Instagram' },
  { icon: 'fab fa-whatsapp', url: `https://wa.me/${TEL1}`, label: 'WhatsApp' },
]

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div style={{ marginBottom: '1rem' }}>
              <img src="/logo.png" alt="Vivre pour l'Éternel" style={{ width: 80, height: 80, borderRadius: '50%', objectFit: 'cover', border: '2px solid rgba(255,255,255,.25)' }} />
            </div>
            <p className="footer-tagline" style={{ fontSize: '.8rem', lineHeight: 1.5, color: 'rgba(255,255,255,.7)', marginBottom: '.75rem' }}>
              Ministère de Feu et de Résurrection<br />
              Fraternité des Disciples de Jésus-Christ
            </p>
            <p style={{ fontSize: '.75rem', color: 'rgba(255,255,255,.5)', lineHeight: 1.6 }}>
              <i className="fas fa-map-marker-alt" style={{ marginRight: '.4rem' }} />Modeste Nouveau Goudron<br />
              Ancienne Route de Bassam, Abidjan
            </p>
            <div className="verse-block" style={{ marginTop: '1.25rem', background: 'rgba(255,255,255,.06)', borderLeftColor: 'var(--gold2)' }}>
              <p style={{ color: 'rgba(255,255,255,.8)', fontSize: '.88rem', margin: '0 0 .35rem' }}>
                « Je suis le chemin, la vérité et la vie. »
              </p>
              <cite style={{ color: 'var(--gold2)' }}>Jean 14:6</cite>
            </div>
            <div style={{ display: 'flex', gap: '.65rem', marginTop: '1.25rem' }}>
              {socials.map(s => (
                <a key={s.label} href={s.url} aria-label={s.label} className="social-link"
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
          <p>© {year} Vivre pour l&apos;Éternel — Ministère de Feu et de Résurrection. Tous droits réservés.</p>
          <p>Fait avec <i className="fas fa-heart" style={{ color: '#e74c3c' }} /> pour la gloire de Dieu</p>
        </div>
      </div>
    </footer>
  )
}
