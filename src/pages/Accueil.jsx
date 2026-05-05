import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

function HeroCanvas() {
  const ref = useRef(null)
  useEffect(() => {
    const canvas = ref.current; if (!canvas) return
    const ctx = canvas.getContext('2d')
    let W, H, pts = [], running = true, animId
    const resize = () => { W = canvas.width = canvas.offsetWidth; H = canvas.height = canvas.offsetHeight }
    resize()
    window.addEventListener('resize', resize)
    for (let i = 0; i < 80; i++) pts.push({
      x: Math.random() * 1400, y: Math.random() * 900,
      vx: (Math.random()-.5)*.4, vy: (Math.random()-.5)*.4,
      r: Math.random()*1.5+.5, a: Math.random()*.5+.1
    })
    const draw = () => {
      if (!running) return
      ctx.clearRect(0,0,W,H)
      pts.forEach(p => {
        p.x+=p.vx; p.y+=p.vy
        if(p.x<0||p.x>W)p.vx*=-1
        if(p.y<0||p.y>H)p.vy*=-1
        ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2)
        ctx.fillStyle=`rgba(255,255,255,${p.a})`; ctx.fill()
      })
      for(let i=0;i<pts.length;i++) for(let j=i+1;j<pts.length;j++){
        const dx=pts[i].x-pts[j].x, dy=pts[i].y-pts[j].y, d=Math.sqrt(dx*dx+dy*dy)
        if(d<130){ctx.beginPath();ctx.moveTo(pts[i].x,pts[i].y);ctx.lineTo(pts[j].x,pts[j].y);ctx.strokeStyle=`rgba(255,255,255,${.12*(1-d/130)})`;ctx.lineWidth=.6;ctx.stroke()}
      }
      animId=requestAnimationFrame(draw)
    }
    draw()
    return () => { running=false; cancelAnimationFrame(animId); window.removeEventListener('resize',resize) }
  }, [])
  return <canvas ref={ref} className="home-hero-canvas" style={{ position:'absolute',inset:0,width:'100%',height:'100%' }} />
}

const overviews = [
  { icon: 'fas fa-hands-praying', title: 'Prière & Intercession', desc: "Un mur de prière permanent pour les familles, malades et nations. Des percées surviennent chaque semaine.", link: '/priere' },
  { icon: 'fas fa-fire', title: 'Nos Programmes', desc: "6 programmes spirituels puissants : intercession, délivrance, évangélisation, louange, restauration et famille.", link: '/programmes' },
  { icon: 'fas fa-comment', title: 'Témoignages', desc: "Des vies transformées par la puissance de Dieu. Découvrez les témoignages de grâce de notre communauté.", link: '/temoignages' },
]

export default function Accueil() {
  return (
    <>
      {/* HERO */}
      <section className="home-hero">
        <HeroCanvas />
        <div className="home-hero-overlay" />
        <div className="home-hero-content">
          <span className="home-hero-eyebrow">
            <i className="fas fa-cross" /> Ministère de Feu et de Résurrection · Fraternité des Disciples de Jésus-Christ
          </span>
          <h1 className="home-hero-title">
            Vivre pour<br /><span>l&apos;Éternel</span>
          </h1>
          <p className="home-hero-sub">Parce que ta vie a un sens éternel.</p>
          <p className="home-hero-verse">« Je suis le chemin, la vérité et la vie. » — Jean 14:6</p>
          <div className="home-hero-btns">
            <Link to="/a-propos" className="btn btn-white">
              <i className="fas fa-compass" /> Formulaire d'adhésion
            </Link>
            <Link to="/priere" className="btn btn-outline-white">
              <i className="fas fa-hands-praying" /> Demande de prière
            </Link>
          </div>
          <div className="home-hero-badges">
            <span><i className="fas fa-globe" /> Familles touchées</span>
            <span><i className="fas fa-users" /> 500+ Vies transformées</span>
            <span><i className="fas fa-church" /> 10+ Ans de ministère</span>
          </div>
        </div>
        <div className="hero-scroll">
          <span>Défiler</span>
          <div className="hero-scroll-line" />
        </div>
      </section>

      {/* STATS */}
      <div className="stats-band">
        <div className="container">
          <div className="stats-grid">
            {[
              { n: '500+', l: 'Vies Touchées' },
              { n: '10+', l: 'Années de Ministère' },
              { n: '6', l: 'Programmes Actifs' },
              { n: '3+', l: 'Nations Touchées' },
            ].map((s, i) => (
              <div key={i} className="stat-item">
                <span className="stat-num">{s.n}</span>
                <span className="stat-label">{s.l}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* OVERVIEW */}
      <section className="section">
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="section-label reveal">Ce que nous faisons</span>
          <h2 className="section-title reveal">Un Ministère au <span>Cœur Battant</span></h2>
          <p className="section-sub reveal">Des espaces de rencontre avec Dieu, soi-même et les autres.</p>
          <div className="overview-grid">
            {overviews.map((o, i) => (
              <div key={i} className={`overview-card reveal delay-${i+1}`}>
                <div className="overview-card-icon"><i className={o.icon} /></div>
                <h3>{o.title}</h3>
                <p>{o.desc}</p>
                <Link to={o.link} className="btn btn-outline" style={{ fontSize: '.78rem', padding: '.55rem 1.1rem' }}>
                  <i className="fas fa-arrow-right" /> En savoir plus
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VERSE BANNER */}
      <section className="section-blue" style={{ padding: '5rem 0', textAlign: 'center' }}>
        <div className="container">
          <div className="reveal" style={{ fontSize: '2rem', color: 'rgba(255,255,255,.3)', marginBottom: '.75rem' }}><i className="fas fa-cross" /></div>
          <h2 className="section-title light reveal" style={{ fontStyle: 'italic', maxWidth: 720, margin: '0 auto 1rem' }}>
            « Ce n&apos;est pas par une armée ni par la force, mais c&apos;est par mon Esprit »
          </h2>
          <p className="reveal" style={{ color: 'rgba(255,255,255,.7)', letterSpacing: '.12em', textTransform: 'uppercase', fontSize: '.82rem' }}>
            Zacharie 4:6
          </p>
          <div className="reveal" style={{ marginTop: '2.5rem', display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/a-propos" className="btn btn-white">
              <i className="fas fa-book-open" /> Découvrir notre mission
            </Link>
            <Link to="/soutenir" className="btn btn-outline-white">
              <i className="fas fa-heart" /> Soutenir l&apos;œuvre
            </Link>
          </div>
        </div>
      </section>

      {/* COUNTDOWN MINI */}
      <section className="countdown-section">
        <div className="container">
          <span className="countdown-label">Prochaine Veillée de Prière</span>
          <h2 className="section-title light reveal" style={{ textAlign: 'center' }}>
            Rejoignez-nous pour une nuit de gloire
          </h2>
          <div className="countdown-grid">
            {[{ v: '00', u: 'Jours' }, { v: '00', u: 'Heures' }, { v: '00', u: 'Minutes' }, { v: '00', u: 'Secondes' }].map(c => (
              <div key={c.u} className="cd-box">
                <span className="cd-num">{c.v}</span>
                <span className="cd-unit">{c.u}</span>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center' }}>
            <Link to="/contact" className="btn btn-white">
              <i className="fas fa-calendar-plus" /> Je m&apos;inscris
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
