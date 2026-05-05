import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

const messages_audio = [
  { titre: "La Puissance de la Prière Fervente", predicateur: "Frère Christian Gballou", duree: "52 min", date: "12 Jan 2025", serie: "Fondements" },
  { titre: "Marcher dans l'Esprit au Quotidien", predicateur: "Sœur Marie-Claire", duree: "45 min", date: "05 Jan 2025", serie: "Vie Chrétienne" },
  { titre: "Comprendre la Grâce de Dieu", predicateur: "Frère Christian Gballou", duree: "61 min", date: "29 Déc 2024", serie: "Théologie" },
  { titre: "La Guerre Spirituelle & Nos Armes", predicateur: "Frère David Koné", duree: "48 min", date: "22 Déc 2024", serie: "Guerre Spirituelle" },
  { titre: "L'Intercession : Se Tenir dans la Brèche", predicateur: "Frère Christian Gballou", duree: "55 min", date: "15 Déc 2024", serie: "Intercession" },
  { titre: "Sanctification et Sainteté de Vie", predicateur: "Sœur Esther Traoré", duree: "40 min", date: "08 Déc 2024", serie: "Vie Chrétienne" },
]

const messages_video = [
  { titre: "Veillée de Prière – Nuit de Gloire", lieu: "Abidjan", date: "18 Jan 2025", thumb: "fas fa-video", duree: "3h 20 min" },
  { titre: "Retraite de Délivrance 2024", lieu: "Yamoussoukro", date: "12 Oct 2024", thumb: "fas fa-video", duree: "4h 15 min" },
  { titre: "Conférence : Le Saint-Esprit et Nous", lieu: "En ligne", date: "30 Nov 2024", thumb: "fas fa-video", duree: "1h 45 min" },
  { titre: "Campagne d'Évangélisation – Marché", lieu: "Cocody", date: "05 Déc 2024", thumb: "fas fa-video", duree: "2h 10 min" },
]

const articles = [
  { titre: "Pourquoi Dieu permet-il la souffrance ?", auteur: "Frère Christian Gballou", date: "20 Jan 2025", cat: "Théologie", extrait: "La souffrance est l'une des questions les plus profondes que l'être humain puisse poser. La Bible ne nous donne pas une réponse simple, mais une réponse profonde..." },
  { titre: "7 Clés pour une Vie de Prière Épanouie", auteur: "Sœur Marie-Claire", date: "10 Jan 2025", cat: "Vie Chrétienne", extrait: "La prière n'est pas une obligation pesante, mais une invitation à une communion profonde avec notre Créateur. Voici sept clés pratiques pour transformer votre vie de prière..." },
  { titre: "Le Jeûne : Comprendre son Rôle Spirituel", auteur: "Frère David Koné", date: "02 Jan 2025", cat: "Discipline", extrait: "Le jeûne est souvent mal compris dans l'Église contemporaine. Ce n'est pas une technique pour forcer la main de Dieu, mais une discipline qui nous positionne dans l'humilité..." },
  { titre: "La Restauration après la Chute", auteur: "Frère Christian Gballou", date: "24 Déc 2024", cat: "Grâce", extrait: "Chacun de nous a connu des moments de chute spirituelle. La bonne nouvelle de l'Évangile, c'est que Dieu est le Dieu du recommencement et de la restauration..." },
]

const versets = [
  { ref: "Jean 3:16", texte: "Car Dieu a tant aimé le monde qu'il a donné son Fils unique, afin que quiconque croit en lui ne périsse point, mais qu'il ait la vie éternelle.", theme: "Amour de Dieu" },
  { ref: "Philippiens 4:13", texte: "Je puis tout par celui qui me fortifie.", theme: "Force" },
  { ref: "Jérémie 29:11", texte: "Car je connais les projets que j'ai formés sur vous, dit l'Éternel, projets de paix et non de malheur, afin de vous donner un avenir et une espérance.", theme: "Espérance" },
  { ref: "Romains 8:28", texte: "Nous savons, du reste, que toutes choses concourent au bien de ceux qui aiment Dieu, de ceux qui sont appelés selon son dessein.", theme: "Providence" },
  { ref: "Psaume 23:1", texte: "L'Éternel est mon berger : je ne manquerai de rien.", theme: "Confiance" },
  { ref: "Matthieu 11:28", texte: "Venez à moi, vous tous qui êtes fatigués et chargés, et je vous donnerai du repos.", theme: "Repos" },
  { ref: "Ésaïe 40:31", texte: "Mais ceux qui se confient en l'Éternel renouvellent leur force. Ils prennent le vol comme les aigles.", theme: "Renouvellement" },
]

function AudioTab() {
  return (
    <div>
      <h3 style={{ fontFamily: 'var(--fs)', fontSize: '1.5rem', marginBottom: '1.5rem' }}>Messages Audio</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {messages_audio.map((m, i) => (
          <div key={i} className="card" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '1.25rem 1.5rem' }}>
            <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'var(--blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '1.3rem', flexShrink: 0 }}>
              <i className="fas fa-headphones" />
            </div>
            <div style={{ flex: 1 }}>
              <h4 style={{ fontSize: '1rem', color: 'var(--text)', marginBottom: '.2rem' }}>{m.titre}</h4>
              <p style={{ fontSize: '.82rem', color: 'var(--text2)', margin: 0 }}>
                <strong>{m.predicateur}</strong> · {m.serie} · {m.date}
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexShrink: 0 }}>
              <span style={{ fontSize: '.8rem', color: 'var(--text2)', background: 'var(--bg2)', padding: '.25rem .75rem', borderRadius: 20 }}>
                <i className="fas fa-clock" style={{ marginRight: '.3rem' }} />{m.duree}
              </span>
              <button className="btn btn-primary" style={{ fontSize: '.78rem', padding: '.45rem 1rem' }}>
                <i className="fas fa-play" /> Écouter
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function VideoTab() {
  return (
    <div>
      <h3 style={{ fontFamily: 'var(--fs)', fontSize: '1.5rem', marginBottom: '1.5rem' }}>Messages Vidéo</h3>
      <div className="card-grid">
        {messages_video.map((v, i) => (
          <div key={i} className="card reveal" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ background: 'linear-gradient(135deg, var(--blue-dark), var(--blue))', height: 160, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
              <i className={v.thumb} style={{ fontSize: '3rem', color: 'rgba(255,255,255,.8)' }} />
              <button style={{ position: 'absolute', bottom: 12, right: 12, background: 'rgba(255,255,255,.9)', border: 'none', borderRadius: '50%', width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--blue)', fontSize: '1rem' }}>
                <i className="fas fa-play" style={{ marginLeft: 3 }} />
              </button>
              <span style={{ position: 'absolute', bottom: 14, left: 12, background: 'rgba(0,0,0,.6)', color: '#fff', fontSize: '.72rem', padding: '.2rem .5rem', borderRadius: 4 }}>{v.duree}</span>
            </div>
            <div style={{ padding: '1rem 1.25rem' }}>
              <h4 style={{ fontSize: '.95rem', color: 'var(--text)', marginBottom: '.4rem' }}>{v.titre}</h4>
              <p style={{ fontSize: '.8rem', color: 'var(--text2)', margin: 0 }}>
                <i className="fas fa-map-marker-alt" style={{ marginRight: '.3rem' }} />{v.lieu} · {v.date}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ArticlesTab() {
  return (
    <div>
      <h3 style={{ fontFamily: 'var(--fs)', fontSize: '1.5rem', marginBottom: '1.5rem' }}>Articles & Méditations</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {articles.map((a, i) => (
          <div key={i} className="card reveal" style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--gold)', marginTop: '.4rem', flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', gap: '.75rem', alignItems: 'center', marginBottom: '.5rem', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '.72rem', fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--blue)', background: 'var(--bg2)', padding: '.2rem .6rem', borderRadius: 20 }}>{a.cat}</span>
                <span style={{ fontSize: '.78rem', color: 'var(--text2)' }}>{a.date} · {a.auteur}</span>
              </div>
              <h4 style={{ fontSize: '1.1rem', color: 'var(--text)', marginBottom: '.5rem' }}>{a.titre}</h4>
              <p style={{ fontSize: '.88rem', color: 'var(--text2)', lineHeight: 1.7, marginBottom: '.75rem' }}>{a.extrait}</p>
              <button className="btn btn-outline" style={{ fontSize: '.78rem', padding: '.4rem 1rem' }}>
                Lire l&apos;article <i className="fas fa-arrow-right" style={{ marginLeft: '.3rem' }} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function VersetsTab() {
  const [idx, setIdx] = useState(0)
  const v = versets[idx]
  return (
    <div style={{ maxWidth: 760 }}>
      <h3 style={{ fontFamily: 'var(--fs)', fontSize: '1.5rem', marginBottom: '1.5rem' }}>Versets du Jour</h3>
      <div className="verse-block" style={{ padding: '2.5rem', textAlign: 'center', marginBottom: '2rem', fontSize: '1.15rem', lineHeight: 1.9 }}>
        <p style={{ marginBottom: '1rem' }}>&ldquo;{v.texte}&rdquo;</p>
        <cite style={{ fontSize: '1rem' }}>{v.ref}</cite>
        <div style={{ marginTop: '.75rem' }}>
          <span style={{ fontSize: '.8rem', background: 'var(--blue)', color: '#fff', padding: '.25rem .75rem', borderRadius: 20 }}>{v.theme}</span>
        </div>
      </div>
      <div style={{ display: 'flex', gap: '.6rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
        {versets.map((v2, i) => (
          <button key={i} onClick={() => setIdx(i)}
            style={{ padding: '.4rem 1rem', borderRadius: 20, border: `2px solid ${i === idx ? 'var(--blue)' : 'var(--border)'}`, background: i === idx ? 'var(--blue)' : 'transparent', color: i === idx ? '#fff' : 'var(--text2)', fontSize: '.8rem', cursor: 'pointer', transition: 'all .2s' }}>
            {v2.ref}
          </button>
        ))}
      </div>
      <div className="card-grid">
        {versets.filter((_, i) => i !== idx).slice(0, 3).map((v2, i) => (
          <div key={i} className="card" style={{ cursor: 'pointer' }} onClick={() => setIdx(versets.indexOf(v2))}>
            <div style={{ fontSize: '.75rem', color: 'var(--blue)', fontWeight: 700, marginBottom: '.4rem' }}>{v2.ref}</div>
            <p style={{ fontSize: '.82rem', color: 'var(--text2)', lineHeight: 1.6, margin: 0 }}>{v2.texte.slice(0, 80)}…</p>
          </div>
        ))}
      </div>
    </div>
  )
}

const TABS = [
  { id: 'audio', label: 'Messages audio', icon: 'fas fa-headphones', Component: AudioTab },
  { id: 'video', label: 'Messages vidéo', icon: 'fas fa-video', Component: VideoTab },
  { id: 'articles', label: 'Articles & Méditations', icon: 'fas fa-pen-nib', Component: ArticlesTab },
  { id: 'versets', label: 'Versets du jour', icon: 'fas fa-book-open', Component: VersetsTab },
]

export default function Enseignements() {
  const { tab: urlTab } = useParams()
  const active = (urlTab && ['audio', 'video', 'articles', 'versets'].includes(urlTab)) ? urlTab : 'audio'
  const navigate = useNavigate()
  const tab = TABS.find(t => t.id === active)
  const { Component } = tab

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <div className="breadcrumb"><a href="/">Accueil</a> › <span>Enseignements</span></div>
          <div className="page-hero-eyebrow"><i className="fas fa-book-open" style={{ marginRight: '.4rem' }} /> La Parole Vivante</div>
          <h1>Enseignements</h1>
          <p>Nourrissez votre foi avec des messages puissants, des articles inspirants et les versets du jour.</p>
        </div>
      </div>
      <section className="section">
        <div className="container"><Component /></div>
      </section>
    </>
  )
}
