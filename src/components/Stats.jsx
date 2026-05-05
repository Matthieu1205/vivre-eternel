import { useEffect, useRef } from 'react'

const stats = [
  { target: 500, suffix: '+', label: 'Vies Touchées' },
  { target: 10, suffix: '+', label: 'Années de Ministère' },
  { target: 6, suffix: '', label: 'Programmes Actifs' },
  { target: 3, suffix: '+', label: 'Nations Touchées' },
]

function Counter({ target, suffix }) {
  const ref = useRef(null)
  const done = useRef(false)

  useEffect(() => {
    const el = ref.current
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || done.current) return
      done.current = true
      let cur = 0
      const dur = 2000, fps = 60, step = target / (dur / (1000 / fps))
      const t = setInterval(() => {
        cur += step
        if (cur >= target) { cur = target; clearInterval(t) }
        el.textContent = Math.round(cur) + suffix
      }, 1000 / fps)
    }, { threshold: 0.5 })
    io.observe(el)
    return () => io.disconnect()
  }, [target, suffix])

  return <span className="stat-num" ref={ref}>0{suffix}</span>
}

export default function Stats() {
  return (
    <div className="stats-section">
      <div className="container">
        <div className="stats-grid">
          {stats.map((s, i) => (
            <div className={`stat-item reveal delay-${i}`} key={s.label}>
              <Counter target={s.target} suffix={s.suffix} />
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
