const membres = [
  {
    initials: 'CG', name: 'Christian J.P. Gballou', role: 'Fondateur & Responsable',
    desc: "Homme de prière, de vision et de terrain. Appelé par Dieu à servir les âmes avec passion, intégrité et humilité. Porteur d'une vision prophétique pour les nations.",
    socials: [
      { icon: 'fab fa-facebook-f', url: '#' },
      { icon: 'fab fa-youtube', url: '#' },
      { icon: 'fas fa-envelope', url: '#contact' },
    ]
  },
  {
    initials: 'EA', name: "Équipe d'Intercession", role: 'Les Intercesseurs',
    desc: "Un groupe de croyants dédiés à la prière quotidienne pour les besoins soumis au ministère. Ils forment le mur de prière qui soutient toutes nos actions.",
    socials: []
  },
  {
    initials: 'EL', name: 'Équipe de Louange', role: 'Musiciens & Adorateurs',
    desc: "Des musiciens et chanteurs consacrés qui créent un espace d'adoration authentique lors de chaque rassemblement, invitant la présence du Saint-Esprit.",
    socials: []
  },
  {
    initials: 'EM', name: 'Équipe Missionnaire', role: 'Évangélistes de Terrain',
    desc: "Ces serviteurs portent l'Évangile dans les rues, marchés, hôpitaux et prisons. Ils incarnent la mission de Christ : Allez par tout le monde.",
    socials: []
  },
]

export default function Equipe() {
  return (
    <section id="equipe" className="section">
      <div className="container">
        <span className="section-label reveal">Serviteurs de l&apos;Éternel</span>
        <h2 className="section-title reveal">Notre <span>Équipe</span></h2>
        <p className="section-sub reveal">Des hommes et des femmes appelés, consacrés et déployés pour la gloire de Dieu.</p>

        <div className="team-grid">
          {membres.map((m, i) => (
            <div key={i} className={`team-card reveal delay-${Math.min(i, 3)}`}>
              <div className="team-avatar">{m.initials}</div>
              <div className="team-info">
                <h3>{m.name}</h3>
                <p className="team-role">{m.role}</p>
                <p className="team-desc">{m.desc}</p>
                {m.socials.length > 0 && (
                  <div className="team-socials">
                    {m.socials.map((s, j) => (
                      <a key={j} href={s.url} className="team-social-link" aria-label={s.icon}>
                        <i className={s.icon} />
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="reveal" style={{ textAlign: 'center', marginTop: '3rem' }}>
          <div className="verse-block" style={{ maxWidth: 600, margin: '0 auto 2rem' }}>
            <p>Il a donné les uns comme apôtres, les autres comme prophètes, les autres comme évangélistes, les autres comme pasteurs et docteurs.</p>
            <cite>Éphésiens 4:11</cite>
          </div>
          <a href="#contact" className="btn btn-gold" onClick={e => {
            e.preventDefault()
            const el = document.getElementById('contact')
            if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' })
          }}>
            <i className="fas fa-heart" /> Rejoindre l&apos;équipe
          </a>
        </div>
      </div>
    </section>
  )
}
