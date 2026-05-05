import { useState, useEffect } from 'react'

// 🔧 MODIFIEZ CETTE DATE pour votre prochain événement
const EVENT_DATE = new Date('2025-12-31T20:00:00')

function pad(n) { return String(n).padStart(2, '0') }

export default function Countdown() {
  const [time, setTime] = useState({ d: '00', h: '00', m: '00', s: '00' })
  const dateStr = EVENT_DATE.toLocaleDateString('fr-FR', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    hour: '2-digit', minute: '2-digit'
  })

  useEffect(() => {
    function tick() {
      const diff = EVENT_DATE - new Date()
      if (diff <= 0) { setTime({ d: '00', h: '00', m: '00', s: '00' }); return }
      setTime({
        d: pad(Math.floor(diff / 864e5)),
        h: pad(Math.floor((diff % 864e5) / 36e5)),
        m: pad(Math.floor((diff % 36e5) / 6e4)),
        s: pad(Math.floor((diff % 6e4) / 1e3)),
      })
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  const scrollToContact = () => {
    const el = document.getElementById('contact')
    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' })
  }

  return (
    <div id="countdown" className="countdown-section">
      <div className="container">
        <p className="countdown-label reveal">Prochaine Veillée de Prière</p>
        <h2 className="section-title reveal text-center">
          Rejoignez-nous pour une nuit de <span>gloire</span>
        </h2>
        <p className="reveal" style={{ textAlign: 'center', color: 'var(--text2)', fontStyle: 'italic', marginBottom: '3rem' }}>{dateStr}</p>
        <div className="countdown-grid reveal">
          {[
            { val: time.d, unit: 'Jours' },
            { val: time.h, unit: 'Heures' },
            { val: time.m, unit: 'Minutes' },
            { val: time.s, unit: 'Secondes' },
          ].map(({ val, unit }) => (
            <div className="cd-box" key={unit}>
              <span className="cd-num">{val}</span>
              <span className="cd-unit">{unit}</span>
            </div>
          ))}
        </div>
        <div className="reveal" style={{ textAlign: 'center' }}>
          <button className="btn btn-gold" onClick={scrollToContact}>
            <i className="fas fa-calendar-plus" /> Je m'inscris à l'événement
          </button>
        </div>
      </div>
    </div>
  )
}
