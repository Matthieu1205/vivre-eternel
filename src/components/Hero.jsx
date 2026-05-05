import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Hero() {
  const navigate = useNavigate()
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let W, H, particles = [], mouse = { x: -9999, y: -9999 }, animId, running = true

    function resize() {
      W = canvas.width = canvas.offsetWidth || window.innerWidth
      H = canvas.height = canvas.offsetHeight || window.innerHeight
    }
    resize()

    const onResize = () => resize()
    const onMouseMove = e => { mouse.x = e.clientX; mouse.y = e.clientY }
    const onMouseLeave = () => { mouse.x = -9999; mouse.y = -9999 }
    window.addEventListener('resize', onResize)
    canvas.addEventListener('mousemove', onMouseMove)
    canvas.addEventListener('mouseleave', onMouseLeave)

    class Particle {
      constructor() {
        this.reset()
      }
      reset() {
        this.x = Math.random() * W
        this.y = Math.random() * H
        this.vx = (Math.random() - .5) * .4
        this.vy = (Math.random() - .5) * .4
        this.r = Math.random() * 1.5 + .4
        this.a = Math.random() * .6 + .15
      }
      update() {
        this.x += this.vx; this.y += this.vy
        if (this.x < 0 || this.x > W) this.vx *= -1
        if (this.y < 0 || this.y > H) this.vy *= -1
        const dx = mouse.x - this.x, dy = mouse.y - this.y
        const d = Math.sqrt(dx * dx + dy * dy)
        if (d < 120) { this.x -= dx * .012; this.y -= dy * .012 }
      }
    }

    for (let i = 0; i < 100; i++) particles.push(new Particle())

    function draw() {
      if (!running) return
      ctx.clearRect(0, 0, W, H)
      particles.forEach(p => {
        p.update()
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(201,168,76,${p.a})`
        ctx.fill()
      })
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < 140) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(201,168,76,${.15 * (1 - d / 140)})`
            ctx.lineWidth = .7
            ctx.stroke()
          }
        }
      }
      animId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      running = false
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', onResize)
      canvas.removeEventListener('mousemove', onMouseMove)
      canvas.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [])

  const scrollTo = (id) => {
    const el = document.querySelector(id)
    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' })
  }

  return (
    <section id="hero" className="hero">
      <canvas ref={canvasRef} className="hero-canvas" />
      <div className="hero-glow" />
      <div className="hero-content">
        <span className="hero-eyebrow">Ministère de Feu et de Résurrection · Fraternité des Disciples de Jésus-Christ</span>
        <h1 className="hero-title">
          Vivre pour<br />
          <span className="hero-title-accent">l&apos;Éternel</span>
        </h1>
        <p className="hero-subtitle">Parce que ta vie a un sens éternel.</p>
        <p className="hero-verse">« Je suis le chemin, la vérité et la vie. » — Jean 14:6</p>
        <div className="hero-btns">
          <button className="btn btn-gold" onClick={() => navigate('/membre')}>
            <i className="fas fa-user-plus" /> Formulaire d'adhésion
          </button>
          <button className="btn btn-outline" onClick={() => scrollTo('#priere')}>
            <i className="fas fa-hands-praying" /> Demande de prière
          </button>
        </div>
        <div className="hero-badges">
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
  )
}
