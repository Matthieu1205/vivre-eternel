import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSection } from '../lib/content'

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

/** Compte à rebours jusqu'à la date saisie dans le backoffice (00 si aucune date). */
function useCountdown(date) {
  const target = date ? new Date(date).getTime() : NaN
  const [now, setNow] = useState(() => Date.now())
  useEffect(() => {
    if (Number.isNaN(target)) return
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [target])
  const left = Number.isNaN(target) ? 0 : Math.max(0, Math.floor((target - now) / 1000))
  const pad = n => String(n).padStart(2, '0')
  return [
    { v: pad(Math.floor(left / 86400)), u: 'Jours' },
    { v: pad(Math.floor(left / 3600) % 24), u: 'Heures' },
    { v: pad(Math.floor(left / 60) % 60), u: 'Minutes' },
    { v: pad(left % 60), u: 'Secondes' },
  ]
}

export default function Accueil() {
  const hero = useSection('accueil.hero')
  const { chiffres = [] } = useSection('accueil.chiffres')
  const act = useSection('accueil.activites')
  const verset = useSection('accueil.verset')
  const veillee = useSection('accueil.veillee')
  const countdown = useCountdown(veillee.date)

  return (
    <>
      {/* HERO */}
      <section className="home-hero">
        <HeroCanvas />
        <div className="home-hero-overlay" />
        <div className="home-hero-content">
          <span className="home-hero-eyebrow">
            <i className="fas fa-cross" /> {hero.eyebrow}
          </span>
          <h1 className="home-hero-title">
            {hero.titre1}<br /><span>{hero.titre2}</span>
          </h1>
          {hero.sous_titre && <p className="home-hero-sub">{hero.sous_titre}</p>}
          {hero.verset && <p className="home-hero-verse">{hero.verset}</p>}
          <div className="home-hero-btns">
            <Link to="/a-propos" className="btn btn-white">
              <i className="fas fa-compass" /> Formulaire d'adhésion
            </Link>
            <Link to="/priere" className="btn btn-outline-white">
              <i className="fas fa-hands-praying" /> Demande de prière
            </Link>
          </div>
          <div className="home-hero-badges">
            {(hero.badges || []).map((b, i) => (
              <span key={b}><i className={['fas fa-globe', 'fas fa-users', 'fas fa-church'][i % 3]} /> {b}</span>
            ))}
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
            {chiffres.map((s, i) => (
              <div key={i} className="stat-item">
                <span className="stat-num">{s.nombre}</span>
                <span className="stat-label">{s.libelle}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* OVERVIEW */}
      <section className="section">
        <div className="container" style={{ textAlign: 'center' }}>
          {act.label && <span className="section-label reveal">{act.label}</span>}
          <h2 className="section-title reveal">
            {String(act.titre || '').split(/\*\*([^*]+)\*\*/).map((part, i) => i % 2 ? <span key={i}>{part}</span> : part)}
          </h2>
          {act.sous_titre && <p className="section-sub reveal">{act.sous_titre}</p>}
          <div className="overview-grid">
            {(act.cartes || []).map((o, i) => (
              <div key={i} className={`overview-card reveal delay-${(i % 3) + 1}`}>
                <div className="overview-card-icon"><i className={o.icon} /></div>
                <h3>{o.titre}</h3>
                <p>{o.texte}</p>
                {o.lien && (
                  <Link to={o.lien} className="btn btn-outline" style={{ fontSize: '.78rem', padding: '.55rem 1.1rem' }}>
                    <i className="fas fa-arrow-right" /> En savoir plus
                  </Link>
                )}
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
            {verset.verse_text}
          </h2>
          <p className="reveal" style={{ color: 'rgba(255,255,255,.7)', letterSpacing: '.12em', textTransform: 'uppercase', fontSize: '.82rem' }}>
            {verset.verse_ref}
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
          <span className="countdown-label">{veillee.label}</span>
          <h2 className="section-title light reveal" style={{ textAlign: 'center' }}>
            {veillee.titre}
          </h2>
          <div className="countdown-grid">
            {countdown.map(c => (
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
