import { useState, useEffect, useCallback } from 'react'

const photos = [
  { src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80', alt: 'Soirée de Prière', cat: 'Prière', date: 'Oct. 2024' },
  { src: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=600&q=80', alt: 'Évangélisation en Rue', cat: 'Évangélisation', date: 'Sept. 2024' },
  { src: 'https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=600&q=80', alt: 'Louange & Adoration', cat: 'Louange', date: 'Août 2024' },
  { src: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=600&q=80', alt: 'Formation des Intercesseurs', cat: 'Formation', date: 'Juil. 2024' },
  { src: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=600&q=80', alt: 'Veillée de Prière', cat: 'Prière', date: 'Juin 2024' },
  { src: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=600&q=80', alt: 'Activité Communautaire', cat: 'Social', date: 'Mai 2024' },
  { src: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=600&q=80', alt: 'Camp de Jeunes', cat: 'Jeunesse', date: 'Avr. 2024' },
  { src: 'https://images.unsplash.com/photo-1519891271460-e8e4ef8ed738?w=600&q=80', alt: 'Séance d\'Enseignement', cat: 'Formation', date: 'Mars 2024' },
  { src: 'https://images.unsplash.com/photo-1473682994984-b8d3f90466e5?w=600&q=80', alt: 'Mission à l\'Hôpital', cat: 'Social', date: 'Fév. 2024' },
]

const cats = ['Tous', 'Prière', 'Évangélisation', 'Louange', 'Formation', 'Social', 'Jeunesse']

export default function Galerie() {
  const [activeCat, setActiveCat] = useState('Tous')
  const [lightbox, setLightbox] = useState(null) // index

  const filtered = activeCat === 'Tous' ? photos : photos.filter(p => p.cat === activeCat)

  const closeLb = useCallback(() => setLightbox(null), [])
  const prevLb = useCallback(() => setLightbox(i => (i - 1 + filtered.length) % filtered.length), [filtered.length])
  const nextLb = useCallback(() => setLightbox(i => (i + 1) % filtered.length), [filtered.length])

  useEffect(() => {
    function onKey(e) {
      if (lightbox === null) return
      if (e.key === 'Escape') closeLb()
      if (e.key === 'ArrowLeft') prevLb()
      if (e.key === 'ArrowRight') nextLb()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightbox, closeLb, prevLb, nextLb])

  useEffect(() => {
    document.body.style.overflow = lightbox !== null ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [lightbox])

  return (
    <section id="galerie" className="section section-alt">
      <div className="container">
        <span className="section-label reveal">En Images</span>
        <h2 className="section-title reveal">Notre <span>Galerie</span></h2>
        <p className="section-sub reveal">Des instants de grâce capturés au fil du ministère.</p>

        <div className="tabs-nav reveal" style={{ marginBottom: '2.5rem' }}>
          {cats.map(c => (
            <button key={c} className={`tab-btn${activeCat === c ? ' active' : ''}`}
              onClick={() => setActiveCat(c)}>{c}</button>
          ))}
        </div>

        <div className="gallery-grid">
          {filtered.map((p, i) => (
            <div key={i} className={`gallery-item reveal delay-${Math.min(i % 3, 2)}`}
              onClick={() => setLightbox(i)} style={{ cursor: 'pointer' }}>
              <img src={p.src} alt={p.alt} loading="lazy" />
              <div className="gallery-overlay">
                <i className="fas fa-expand" style={{ fontSize: '1.5rem', color: 'var(--gold)', marginBottom: '.5rem' }} />
                <h4 style={{ margin: 0, fontSize: '.9rem' }}>{p.alt}</h4>
                <p style={{ margin: 0, fontSize: '.75rem', opacity: .7 }}>{p.date}</p>
              </div>
              <span className="gallery-cat">{p.cat}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div className="lightbox-overlay" onClick={closeLb}>
          <button className="lb-close" onClick={closeLb}><i className="fas fa-times" /></button>
          <button className="lb-nav lb-prev" onClick={e => { e.stopPropagation(); prevLb() }}>
            <i className="fas fa-chevron-left" />
          </button>
          <div className="lb-content" onClick={e => e.stopPropagation()}>
            <img src={filtered[lightbox].src.replace('w=600', 'w=1200')} alt={filtered[lightbox].alt} />
            <div className="lb-caption">
              <h4>{filtered[lightbox].alt}</h4>
              <span>{filtered[lightbox].cat} · {filtered[lightbox].date}</span>
            </div>
          </div>
          <button className="lb-nav lb-next" onClick={e => { e.stopPropagation(); nextLb() }}>
            <i className="fas fa-chevron-right" />
          </button>
          <div className="lb-counter">{lightbox + 1} / {filtered.length}</div>
        </div>
      )}
    </section>
  )
}
