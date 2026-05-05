import { Link } from 'react-router-dom'

const raisons = [
  {
    num: '01',
    titre: 'Grandir spirituellement chaque jour',
    texte: "Vous bénéficiez d'un encadrement spirituel solide à travers l'enseignement de la Parole, la prière et des moments de communion qui fortifient votre foi en Jésus-Christ.",
    icon: 'fas fa-book-open',
  },
  {
    num: '02',
    titre: 'Vivre une transformation réelle',
    texte: "Le ministère met l'accent sur la restauration, la délivrance et la résurrection spirituelle. C'est un cadre propice pour laisser Dieu agir puissamment dans votre vie.",
    icon: 'fas fa-fire',
  },
  {
    num: '03',
    titre: 'Appartenir à une famille spirituelle',
    texte: "Vous n'êtes plus seul. Vous intégrez une fraternité de disciples unis par l'amour, le soutien mutuel et la même vision : vivre pour l'éternité.",
    icon: 'fas fa-handshake',
  },
  {
    num: '04',
    titre: 'Découvrir et activer vos dons',
    texte: "Chaque membre est encouragé à identifier ses talents spirituels et à les mettre au service de Dieu (service, évangélisation, intercession, etc.).",
    icon: 'fas fa-star',
  },
  {
    num: '05',
    titre: 'Participer à une mission divine',
    texte: "Vous prenez part à l'œuvre de Dieu : annoncer l'Évangile, impacter des vies, transformer des communautés.",
    icon: 'fas fa-globe',
  },
  {
    num: '06',
    titre: 'Être équipé pour votre destinée',
    texte: "À travers des formations, des enseignements et un suivi, vous êtes préparé à marcher pleinement dans votre appel.",
    icon: 'fas fa-bullseye',
  },
  {
    num: '07',
    titre: 'Vivre la puissance du feu de Dieu',
    texte: "Dans un environnement de prière intense et de foi, vous expérimentez la présence vivante du Saint-Esprit.",
    icon: 'fas fa-dove',
  },
]

export default function Membre() {
  return (
    <>
      {/* Hero */}
      <div className="page-hero">
        <div className="container">
          <div className="breadcrumb"><a href="/">Accueil</a> › <span>Devenir Membre</span></div>
          <div className="page-hero-eyebrow"><i className="fas fa-fire" style={{ marginRight: '.4rem' }} /> Une vie de foi, de puissance et d&apos;impact</div>
          <h1>Devenir Membre</h1>
          <p>Entrez dans une dynamique spirituelle profonde, engagée et transformatrice.</p>
        </div>
      </div>

      {/* Intro */}
      <section className="section" style={{ paddingBottom: 0 }}>
        <div className="container" style={{ maxWidth: 800, textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'var(--fs)', fontSize: '1.6rem', marginBottom: '1rem', color: 'var(--blue-dark)' }}>
            Pourquoi devenir membre de Vivre pour l&apos;Éternel ?
          </h2>
          <p style={{ fontSize: '.95rem', color: 'var(--text2)', lineHeight: 1.85, marginBottom: '.75rem' }}>
            <strong style={{ color: 'var(--text)' }}>Ministère de Feu et de Résurrection</strong><br />
            Fraternité des Disciples de Jésus-Christ
          </p>
          <p style={{ fontSize: '1rem', color: 'var(--text2)', lineHeight: 1.9 }}>
            Devenir membre, ce n&apos;est pas juste adhérer à un groupe, c&apos;est entrer dans une dynamique spirituelle profonde, engagée et transformatrice.
          </p>
        </div>
      </section>

      {/* Les 7 raisons */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: 860, margin: '0 auto' }}>
            {raisons.map((r) => (
              <div key={r.num} className="card reveal" style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                {/* Icône + numéro */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '.3rem', flexShrink: 0 }}>
                  <div style={{
                    width: 56, height: 56, borderRadius: '50%',
                    background: 'linear-gradient(135deg, var(--blue), var(--blue2))',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '1.5rem'
                  }}>
                    <i className={r.icon} style={{ fontSize: '1.5rem', color: '#fff' }} />
                  </div>
                  <span style={{ fontSize: '.7rem', fontWeight: 700, color: 'var(--blue)', letterSpacing: '.05em' }}>{r.num}</span>
                </div>
                {/* Texte */}
                <div>
                  <h3 style={{ fontFamily: 'var(--fs)', fontSize: '1.1rem', color: 'var(--text)', marginBottom: '.5rem' }}>{r.titre}</h3>
                  <p style={{ fontSize: '.92rem', color: 'var(--text2)', lineHeight: 1.8, margin: 0 }}>{r.texte}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Citation finale */}
          <div style={{ maxWidth: 700, margin: '3rem auto 0', textAlign: 'center' }}>
            <div className="verse-block">
              <p style={{ fontSize: '1.05rem', fontStyle: 'italic', fontWeight: 500 }}>
                Rejoindre Vivre pour l&apos;Éternel, c&apos;est choisir une vie de foi, de puissance et d&apos;impact éternel.<br />
                C&apos;est répondre à l&apos;appel de Jésus-Christ à devenir un véritable disciple.
              </p>
            </div>
          </div>

          {/* CTA */}
          <div style={{ textAlign: 'center', marginTop: '2.5rem', display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href="https://wa.me/2250546457742?text=Bonjour%2C%20je%20souhaite%20devenir%20membre%20du%20minist%C3%A8re%20Vivre%20pour%20l%27%C3%89ternel."
              className="btn btn-primary"
              target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '.6rem' }}
            >
              <i className="fab fa-whatsapp" /> Je veux rejoindre le ministère
            </a>
            <Link to="/contact/formulaire" className="btn btn-outline"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '.6rem' }}>
              <i className="fas fa-envelope" /> Nous contacter
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
