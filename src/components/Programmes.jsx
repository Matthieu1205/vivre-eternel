const programmes = [
  { num: '01', icon: 'fas fa-hands-praying', title: "Prière d'Intercession", desc: "Le coeur battant du ministère. Un mur de prière autour des familles, malades et nations. Des percées surviennent chaque semaine." },
  { num: '02', icon: 'fas fa-link', title: "Prière de Délivrance", desc: "Des liens invisibles brisés par le Nom de Jésus. Dans un espace de confiance, d'amour et de vérité divine." },
  { num: '03', icon: 'fas fa-bullhorn', title: "Évangélisation", desc: "Dans les rues, marchés, hôpitaux et prisons. L'Évangile est la meilleure nouvelle du monde et appartient à tous." },
  { num: '04', icon: 'fas fa-music', title: "Puissance de la Louange", desc: "La louange n'est pas un warm-up. C'est une arme. Quand nous levons nos voix, sa présence descend." },
  { num: '05', icon: 'fas fa-leaf', title: "Rosée de Miséricorde", desc: "Un programme de restauration spirituelle et émotionnelle. La grâce de Dieu arrose ce qui semblait mort." },
  { num: '06', icon: 'fas fa-heart', title: "Le Saint-Esprit dans le Couple", desc: "Bâtir son union sur le roc de la Parole. Communication, pardon, vision commune et prière conjugale." },
]

export default function Programmes() {
  return (
    <section id="programmes" className="section section-alt">
      <div className="container">
        <span className="section-label reveal">Ce que nous offrons</span>
        <h2 className="section-title reveal">Nos <span>Programmes</span></h2>
        <p className="section-sub reveal">Des espaces de rencontre avec Dieu, soi-même et les autres.</p>
        <div className="prog-grid">
          {programmes.map((p, i) => (
            <div className={`prog-card reveal delay-${Math.min(i, 5)}`} key={p.num}>
              <div className="prog-num">{p.num}</div>
              <div className="prog-icon"><i className={p.icon} /></div>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
              <span className="prog-arrow"><i className="fas fa-arrow-right" /> En savoir plus</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
