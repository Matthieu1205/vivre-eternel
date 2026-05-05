const partenaires = [
  {
    initials: 'CE', name: 'Centre Espoir',
    desc: "Centre d'aide humanitaire et sociale. Ensemble, nous portons l'espoir aux plus vulnérables.",
    icon: 'fas fa-hospital', color: '#3B82F6', categorie: 'Social'
  },
  {
    initials: 'GA', name: 'Galerie Artisan',
    desc: "Valorisation des arts et de l'artisanat local. La beauté de la création au service de la communauté.",
    icon: 'fas fa-palette', color: '#8B5CF6', categorie: 'Culture'
  },
  {
    initials: 'GM', name: 'Grand Médias',
    desc: "Plateforme médiatique chrétienne diffusant la Bonne Nouvelle à travers les ondes et le digital.",
    icon: 'fas fa-tv', color: '#EC4899', categorie: 'Médias'
  },
  {
    initials: 'AA', name: 'Afrik Art Dance',
    desc: "Compagnie de danse africaine exprimant la louange et la culture à travers le mouvement.",
    icon: 'fas fa-music', color: '#F59E0B', categorie: 'Culture'
  },
  {
    initials: 'WT', name: 'Wely Transport',
    desc: "Service de transport engagé à soutenir les missions de terrain et les activités du ministère.",
    icon: 'fas fa-bus', color: '#10B981', categorie: 'Logistique'
  },
  {
    initials: 'PV', name: 'Panivore',
    desc: "Entreprise agroalimentaire locale. Nourrir les corps comme nous nourrissons les âmes.",
    icon: 'fas fa-wheat-alt', color: '#EF4444', categorie: 'Alimentation'
  },
]

export default function Partenaires() {
  return (
    <section id="partenaires" className="section section-alt">
      <div className="container">
        <span className="section-label reveal">Ensemble pour la Mission</span>
        <h2 className="section-title reveal">Nos <span>Partenaires</span></h2>
        <p className="section-sub reveal">
          Des organisations et entreprises qui partagent nos valeurs et soutiennent activement la vision de Vivre pour l&apos;Éternel.
        </p>

        <div className="partners-grid">
          {partenaires.map((p, i) => (
            <div key={i} className={`partner-card reveal delay-${Math.min(i, 5)}`}>
              <div className="partner-avatar" style={{ background: `${p.color}20`, border: `2px solid ${p.color}40` }}>
                <i className={p.icon} style={{ fontSize: '2rem', color: p.color }} />
              </div>
              <div className="partner-info">
                <div style={{ display: 'flex', alignItems: 'center', gap: '.75rem', marginBottom: '.5rem' }}>
                  <h3 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--white)' }}>{p.name}</h3>
                  <span className="partner-cat" style={{ background: `${p.color}20`, color: p.color, border: `1px solid ${p.color}40` }}>
                    {p.categorie}
                  </span>
                </div>
                <p style={{ margin: 0, fontSize: '.88rem', color: 'var(--text2)', lineHeight: 1.6 }}>{p.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="reveal" style={{ marginTop: '4rem' }}>
          <div className="partner-cta-box">
            <div className="partner-cta-icon"><i className="fas fa-handshake" /></div>
            <div>
              <h3 style={{ color: 'var(--gold)', marginBottom: '.5rem' }}>Devenir partenaire</h3>
              <p style={{ color: 'var(--text2)', margin: '0 0 1.25rem', fontSize: '.95rem' }}>
                Vous dirigez une organisation ou une entreprise alignée avec nos valeurs ? Rejoignez notre réseau de partenaires et construisons ensemble.
              </p>
              <a href="#contact" className="btn btn-gold" onClick={e => {
                e.preventDefault()
                const el = document.getElementById('contact')
                if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' })
              }}>
                <i className="fas fa-handshake" /> Nous contacter
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
