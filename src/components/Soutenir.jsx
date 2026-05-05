const options = [
  {
    icon: 'fas fa-hand-holding-dollar', title: 'Don Financier',
    desc: "Votre don soutient directement nos programmes d'évangélisation, nos missions de terrain et l'ensemble des activités du ministère.",
    actions: [
      { label: '20€ / mois', type: 'outline' },
      { label: '50€ / mois', type: 'outline' },
      { label: 'Montant libre', type: 'gold' },
    ],
    note: 'Reçu fiscal disponible sur demande'
  },
  {
    icon: 'fas fa-hands-praying', title: 'Soutien par la Prière',
    desc: "Devenez un intercesseur pour le ministère. Priez quotidiennement pour notre vision, nos serviteurs et les âmes que nous touchons.",
    actions: [
      { label: 'Rejoindre le mur de prière', type: 'gold' },
    ],
    note: 'Vous recevrez des sujets de prière hebdomadaires'
  },
  {
    icon: 'fas fa-handshake', title: 'Bénévolat & Service',
    desc: "Offrez votre temps et vos compétences. Musique, logistique, communication, accueil — chaque talent est un don de Dieu à déposer sur l'autel.",
    actions: [
      { label: 'Proposer mon aide', type: 'gold' },
    ],
    note: 'Formation et accompagnement fournis'
  },
]

const scrollToContact = () => {
  const el = document.getElementById('contact')
  if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' })
}

export default function Soutenir() {
  return (
    <section id="soutenir" className="section">
      <div className="container">
        <span className="section-label reveal">Devenir Partenaire</span>
        <h2 className="section-title reveal">Soutenir la <span>Vision</span></h2>
        <p className="section-sub reveal">Investir dans l&apos;éternité. Chaque soutien contribue à transformer des vies pour la gloire de Dieu.</p>

        <div className="support-grid">
          {options.map((o, i) => (
            <div key={i} className={`support-card reveal delay-${i}`}>
              <div className="support-icon"><i className={o.icon} /></div>
              <h3>{o.title}</h3>
              <p>{o.desc}</p>
              <div className="support-actions">
                {o.actions.map((a, j) => (
                  <button key={j} className={`btn btn-${a.type}`} onClick={scrollToContact}>
                    {a.label}
                  </button>
                ))}
              </div>
              <p className="support-note">
                <i className="fas fa-info-circle" style={{ color: 'var(--gold)', marginRight: '.4rem' }} />
                {o.note}
              </p>
            </div>
          ))}
        </div>

        <div className="reveal" style={{ marginTop: '4rem' }}>
          <div className="verse-block" style={{ maxWidth: 650, margin: '0 auto 2rem' }}>
            <p>Donnez, et il vous sera donné : on versera dans votre sein une bonne mesure, serrée, secouée et débordante.</p>
            <cite>Luc 6:38</cite>
          </div>

          <div className="support-impact">
            <h3 className="reveal" style={{ color: 'var(--gold)', textAlign: 'center', marginBottom: '2rem' }}>
              L&apos;Impact de Votre Soutien
            </h3>
            <div className="impact-grid">
              {[
                { amount: '20€', impact: "finance une session d'évangélisation de rue" },
                { amount: '50€', impact: "couvre les frais d'une mission à l'hôpital" },
                { amount: '100€', impact: 'soutient une famille en situation de besoin' },
                { amount: '500€', impact: 'finance une veillée de prière complète' },
              ].map((item, i) => (
                <div key={i} className={`impact-item reveal delay-${i}`}>
                  <strong style={{ color: 'var(--gold)', fontSize: '1.5rem', display: 'block' }}>{item.amount}</strong>
                  <p style={{ margin: 0, fontSize: '.9rem', color: 'var(--text2)' }}>{item.impact}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
