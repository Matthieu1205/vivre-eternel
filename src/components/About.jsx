import { useState } from 'react'

const tabs = [
  {
    id: 'quisommes', label: 'Présentation',
    content: (
      <>
        <p>Vivre pour l&apos;Éternel est un ministère chrétien né d&apos;une conviction profonde : chaque vie humaine est précieuse aux yeux de Dieu, et chaque âme mérite d&apos;entendre la Bonne Nouvelle. Nous sommes une communauté de croyants rassemblés autour d&apos;un même appel.</p>
        <p>Ancré dans la foi biblique et porté par un amour sincère pour les âmes, notre ministère agit à la fois dans la sphère spirituelle — à travers la prière et l&apos;intercession — et dans la sphère sociale, à travers des actions concrètes sur le terrain.</p>
        <div className="verse-block">
          <p>Ce n&apos;est pas par une armée ni par la force, mais c&apos;est par mon Esprit, dit l&apos;Éternel des armées.</p>
          <cite>Zacharie 4:6</cite>
        </div>
      </>
    )
  },
  {
    id: 'vision', label: 'Vision',
    content: (
      <>
        <p>Nous rêvons d&apos;une génération profondément ancrée dans la Parole de Dieu, débordante de l&apos;onction du Saint-Esprit, et résolument tournée vers la mission. Notre vision : voir les nations se réconcilier avec leur Créateur, les familles restaurées, et l&apos;Église du Christ marcher dans sa pleine autorité.</p>
        <div className="verse-block">
          <p>Voici, je fais toutes choses nouvelles.</p>
          <cite>Apocalypse 21:5</cite>
        </div>
      </>
    )
  },
  {
    id: 'mission', label: 'Mission',
    content: (
      <>
        <p>Notre mission repose sur quatre piliers fondamentaux :</p>
        <div className="values-list">
          {[
            { icon: 'fas fa-bullhorn', title: 'Évangéliser', desc: "Porter la Parole vivante là où Jésus n'est pas encore connu." },
            { icon: 'fas fa-hands-praying', title: 'Intercéder', desc: 'Se tenir dans la brèche pour les individus, les familles et les nations.' },
            { icon: 'fas fa-book-open', title: 'Enseigner', desc: 'Fortifier les croyants dans la connaissance de la Parole de Dieu.' },
            { icon: 'fas fa-hands', title: 'Agir', desc: 'Servir concrètement les communautés dans le besoin.' },
          ].map(v => (
            <div className="value-row" key={v.title}>
              <div className="value-icon"><i className={v.icon} /></div>
              <div><h4>{v.title}</h4><p>{v.desc}</p></div>
            </div>
          ))}
        </div>
      </>
    )
  },
  {
    id: 'valeurs', label: 'Valeurs',
    content: (
      <div className="values-list">
        {[
          { icon: 'fas fa-fire', title: 'La Prière comme Fondation', desc: "Tout ce que nous faisons naît de la prière. Sans communion avec Dieu, aucune action ne produit de fruit éternel." },
          { icon: 'fas fa-book-open', title: 'La Parole comme Autorité', desc: "La Bible est notre boussole, notre nourriture, notre épée. Chaque décision est soumise à la lumière des Écritures." },
          { icon: 'fas fa-heart', title: "L'Amour comme Moteur", desc: "Nous servons par amour. L'amour de Christ nous contraint (2 Co 5:14) vers les âmes perdues." },
          { icon: 'fas fa-dove', title: 'La Sainteté comme Engagement', desc: "Nous marchons vers la ressemblance avec Christ, dans la grâce et la vérité." },
        ].map(v => (
          <div className="value-row" key={v.title}>
            <div className="value-icon">{v.icon}</div>
            <div><h4>{v.title}</h4><p>{v.desc}</p></div>
          </div>
        ))}
      </div>
    )
  },
]

export default function About() {
  const [active, setActive] = useState('quisommes')
  const tab = tabs.find(t => t.id === active)

  return (
    <section id="about" className="section">
      <div className="container">
        <div className="about-grid">
          <div className="about-image-wrap reveal-left">
            <div className="about-img-placeholder" style={{ position: 'relative' }}>
              <i className="fas fa-dove" />
              <div className="about-badge">
                <strong>10+</strong>
                <span>Ans de Grâce</span>
              </div>
            </div>
          </div>
          <div>
            <span className="section-label reveal">Notre Identité</span>
            <h2 className="section-title reveal">Qui sommes-<span>nous</span> ?</h2>
            <div className="tabs-nav reveal">
              {tabs.map(t => (
                <button key={t.id} className={`tab-btn${active === t.id ? ' active' : ''}`}
                        onClick={() => setActive(t.id)}>
                  {t.label}
                </button>
              ))}
            </div>
            <div className="tab-content">{tab.content}</div>
            <div className="value-row" style={{ marginTop: '2rem', borderColor: 'rgba(201,168,76,.2)' }}>
              <div className="value-icon" style={{ width: 60, height: 60, borderRadius: '50%', background: 'linear-gradient(135deg,var(--gold),var(--navy))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--white)', fontWeight: 700, fontSize: '1.4rem', fontFamily: 'var(--fs)' }}>C</div>
              <div>
                <h4 style={{ color: 'var(--gold)' }}>Christian J.P. Gballou</h4>
                <p style={{ fontSize: '.8rem', letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--text2)', marginBottom: '.5rem' }}>Fondateur &amp; Responsable</p>
                <p style={{ margin: 0, fontSize: '.9rem' }}>Homme de prière, de vision et de terrain. Il a répondu à l&apos;appel divin de servir les âmes avec passion, intégrité et humilité.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
