import { useState } from 'react'

const videos = [
  { id: 'dQw4w9WgXcQ', title: 'La Puissance de la Prière d\'Intercession', speaker: 'Christian J.P. Gballou', date: '15 Octobre 2024', duration: '52 min', tag: 'Prière' },
  { id: 'dQw4w9WgXcQ', title: 'Marcher dans l\'Autorité de Christ', speaker: 'Christian J.P. Gballou', date: '08 Octobre 2024', duration: '47 min', tag: 'Foi' },
  { id: 'dQw4w9WgXcQ', title: 'Le Saint-Esprit : Votre Meilleur Allié', speaker: 'Christian J.P. Gballou', date: '01 Octobre 2024', duration: '61 min', tag: 'Saint-Esprit' },
  { id: 'dQw4w9WgXcQ', title: 'Briser les Liens Générationnels', speaker: 'Christian J.P. Gballou', date: '24 Sept. 2024', duration: '55 min', tag: 'Délivrance' },
  { id: 'dQw4w9WgXcQ', title: 'Bâtir un Couple sur le Roc', speaker: 'Christian J.P. Gballou', date: '17 Sept. 2024', duration: '43 min', tag: 'Famille' },
  { id: 'dQw4w9WgXcQ', title: 'La Louange : Arme Spirituelle', speaker: 'Christian J.P. Gballou', date: '10 Sept. 2024', duration: '38 min', tag: 'Louange' },
]

const tags = ['Tous', 'Prière', 'Foi', 'Saint-Esprit', 'Délivrance', 'Famille', 'Louange']

export default function Enseignements() {
  const [activeVideo, setActiveVideo] = useState(videos[0])
  const [activeTag, setActiveTag] = useState('Tous')
  const [playing, setPlaying] = useState(false)

  const filtered = activeTag === 'Tous' ? videos : videos.filter(v => v.tag === activeTag)

  const handleSelect = (v) => {
    setActiveVideo(v)
    setPlaying(false)
    window.scrollTo({ top: document.getElementById('enseignements').offsetTop - 80, behavior: 'smooth' })
  }

  return (
    <section id="enseignements" className="section section-alt">
      <div className="container">
        <span className="section-label reveal">Grandir dans la Parole</span>
        <h2 className="section-title reveal">Nos <span>Enseignements</span></h2>
        <p className="section-sub reveal">Des messages qui transforment, édifient et équipent chaque croyant.</p>

        {/* Featured Player */}
        <div className="video-player reveal" style={{ marginBottom: '3rem' }}>
          <div className="video-wrap">
            {playing ? (
              <iframe
                src={`https://www.youtube.com/embed/${activeVideo.id}?autoplay=1`}
                title={activeVideo.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}
              />
            ) : (
              <div className="video-thumb" onClick={() => setPlaying(true)}>
                <img
                  src={`https://img.youtube.com/vi/${activeVideo.id}/maxresdefault.jpg`}
                  alt={activeVideo.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={e => { e.target.style.display='none' }}
                />
                <div className="video-overlay">
                  <div className="play-btn">
                    <i className="fas fa-play" />
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="video-info">
            <span className="prog-arrow" style={{ display: 'inline-flex', marginBottom: '.75rem' }}>
              <i className="fas fa-tag" /> {activeVideo.tag}
            </span>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '.5rem', color: 'var(--white)' }}>{activeVideo.title}</h3>
            <p style={{ color: 'var(--text2)', fontSize: '.9rem' }}>
              <i className="fas fa-user" style={{ marginRight: '.4rem', color: 'var(--gold)' }} />{activeVideo.speaker}
              <span style={{ margin: '0 1rem', opacity: .4 }}>|</span>
              <i className="fas fa-calendar" style={{ marginRight: '.4rem', color: 'var(--gold)' }} />{activeVideo.date}
              <span style={{ margin: '0 1rem', opacity: .4 }}>|</span>
              <i className="fas fa-clock" style={{ marginRight: '.4rem', color: 'var(--gold)' }} />{activeVideo.duration}
            </p>
          </div>
        </div>

        {/* Filter Tags */}
        <div className="tabs-nav reveal" style={{ marginBottom: '2rem' }}>
          {tags.map(tag => (
            <button key={tag} className={`tab-btn${activeTag === tag ? ' active' : ''}`}
              onClick={() => setActiveTag(tag)}>{tag}</button>
          ))}
        </div>

        {/* Video List */}
        <div className="video-list reveal">
          {filtered.map((v, i) => (
            <div
              key={i}
              className={`video-item${activeVideo === v ? ' active' : ''}`}
              onClick={() => handleSelect(v)}
            >
              <div className="video-thumb-sm">
                <img src={`https://img.youtube.com/vi/${v.id}/mqdefault.jpg`} alt={v.title}
                  onError={e => { e.target.style.display='none' }} />
                <div className="play-sm"><i className="fas fa-play" /></div>
              </div>
              <div className="video-item-info">
                <span className="video-tag">{v.tag}</span>
                <h4>{v.title}</h4>
                <p><i className="fas fa-calendar" /> {v.date} &nbsp;·&nbsp; <i className="fas fa-clock" /> {v.duration}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="reveal" style={{ textAlign: 'center', marginTop: '3rem' }}>
          <a href="https://www.youtube.com/@vivre-pour-leternel" target="_blank" rel="noopener noreferrer"
            className="btn btn-outline">
            <i className="fab fa-youtube" /> Voir tous les enseignements
          </a>
        </div>
      </div>
    </section>
  )
}
