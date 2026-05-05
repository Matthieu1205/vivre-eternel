import { useState, useEffect, useRef, useCallback } from 'react'

const temoignages = [
  {
    initials: 'MK', name: 'Marie K.', lieu: "Abidjan, Côte d'Ivoire",
    tag: 'Guérison', stars: 5,
    text: "Après des années de stérilité, j'ai soumis ma prière au ministère Vivre pour l'Éternel. Ils ont prié avec foi et constance. Aujourd'hui, je tiens dans mes bras mon fils miracle. À Dieu soit la gloire pour toujours !",
    verse: "« Tu es le Dieu qui fait des merveilles. » — Psaume 77:15"
  },
  {
    initials: 'JP', name: 'Jean-Pierre M.', lieu: 'Paris, France',
    tag: 'Délivrance', stars: 5,
    text: "J'étais enchaîné par des dépendances qui détruisaient ma famille. Lors d'une session de délivrance, le Seigneur a brisé chaque lien. Ma femme et mes enfants ont retrouvé un mari et un père libéré. Merci, Jésus !",
    verse: "« Si le Fils vous affranchit, vous serez réellement libres. » — Jean 8:36"
  },
  {
    initials: 'AF', name: 'Amina F.', lieu: 'Dakar, Sénégal',
    tag: 'Restauration', stars: 5,
    text: "Mon mariage était au bord du gouffre. Nous avions tout essayé. Le programme Saint-Esprit dans le Couple nous a reconstruit sur de nouvelles fondations. Nous célébrons aujourd'hui 5 ans de renaissance conjugale.",
    verse: "« L'amour de Dieu a été répandu dans nos coeurs. » — Romains 5:5"
  },
  {
    initials: 'ES', name: 'Emmanuel S.', lieu: 'Montréal, Canada',
    tag: 'Provision divine', stars: 5,
    text: "Sans emploi depuis 18 mois, désespéré, j'ai rejoint le mur de prière. En trois semaines, deux offres d'emploi. La main de Dieu est bien réelle. Ce ministère prie avec une foi extraordinaire.",
    verse: "« Mon Dieu pourvoira à tous vos besoins. » — Philippiens 4:19"
  },
  {
    initials: 'RC', name: 'Ruth C.', lieu: 'Bruxelles, Belgique',
    tag: 'Paix intérieure', stars: 5,
    text: "Le programme Rosée de Miséricorde m'a sortie d'une dépression profonde. La Parole de Dieu, la prière et l'accompagnement bienveillant de l'équipe ont été mes piliers de guérison intérieure.",
    verse: "« Ma paix, je vous la donne. » — Jean 14:27"
  },
]

export default function Temoignages() {
  const [cur, setCur] = useState(0)
  const [dir, setDir] = useState(1)
  const [animating, setAnimating] = useState(false)
  const startX = useRef(null)
  const autoRef = useRef(null)

  const goto = useCallback((idx, direction = 1) => {
    if (animating) return
    setAnimating(true)
    setDir(direction)
    setTimeout(() => {
      setCur(idx)
      setAnimating(false)
    }, 400)
  }, [animating])

  const next = useCallback(() => goto((cur + 1) % temoignages.length, 1), [cur, goto])
  const prev = useCallback(() => goto((cur - 1 + temoignages.length) % temoignages.length, -1), [cur, goto])

  useEffect(() => {
    autoRef.current = setInterval(next, 6000)
    return () => clearInterval(autoRef.current)
  }, [next])

  const touchStart = e => { startX.current = e.touches[0].clientX }
  const touchEnd = e => {
    if (startX.current === null) return
    const dx = e.changedTouches[0].clientX - startX.current
    if (Math.abs(dx) > 50) dx > 0 ? prev() : next()
    startX.current = null
  }

  const t = temoignages[cur]

  return (
    <section id="temoignages" className="section">
      <div className="container">
        <span className="section-label reveal">La Grâce en Action</span>
        <h2 className="section-title reveal">Ils ont <span>Témoigné</span></h2>
        <p className="section-sub reveal">Des vies transformées par la puissance de la prière et la fidélité de Dieu.</p>

        <div className="testi-wrap reveal"
          onTouchStart={touchStart}
          onTouchEnd={touchEnd}
          style={{ '--slide-dir': dir }}
        >
          <div className={`testi-card${animating ? ' slide-out' : ' slide-in'}`}>
            <div className="testi-quote-icon"><i className="fas fa-quote-left" /></div>

            <div style={{ display: 'flex', gap: '.2rem', marginBottom: '1.5rem', justifyContent: 'center' }}>
              {Array(t.stars).fill(0).map((_, i) => (
                <i key={i} className="fas fa-star" style={{ color: 'var(--gold)', fontSize: '1rem' }} />
              ))}
            </div>

            <p className="testi-text">« {t.text} »</p>

            <div className="verse-block" style={{ margin: '1.5rem auto', maxWidth: 500 }}>
              <p style={{ margin: 0, fontSize: '.9rem', fontStyle: 'italic' }}>{t.verse}</p>
            </div>

            <div className="testi-author">
              <div className="testi-avatar">{t.initials}</div>
              <div>
                <strong>{t.name}</strong>
                <p style={{ margin: 0, fontSize: '.8rem', color: 'var(--text2)' }}>
                  <i className="fas fa-map-marker-alt" style={{ marginRight: '.3rem', color: 'var(--gold)' }} />
                  {t.lieu}
                </p>
                <span className="video-tag" style={{ marginTop: '.3rem', display: 'inline-block' }}>{t.tag}</span>
              </div>
            </div>
          </div>

          <div className="testi-controls">
            <button className="testi-nav" onClick={prev} aria-label="Précédent">
              <i className="fas fa-chevron-left" />
            </button>
            <div className="testi-dots">
              {temoignages.map((_, i) => (
                <button key={i} className={`testi-dot${i === cur ? ' active' : ''}`}
                  onClick={() => goto(i, i > cur ? 1 : -1)} aria-label={`Témoignage ${i + 1}`} />
              ))}
            </div>
            <button className="testi-nav" onClick={next} aria-label="Suivant">
              <i className="fas fa-chevron-right" />
            </button>
          </div>
        </div>

        <div className="reveal" style={{ textAlign: 'center', marginTop: '3rem' }}>
          <a href="#contact" className="btn btn-gold" onClick={e => {
            e.preventDefault()
            const el = document.getElementById('contact')
            if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' })
          }}>
            <i className="fas fa-pen" /> Partager mon témoignage
          </a>
        </div>
      </div>
    </section>
  )
}
