import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

const terrain = [
  { lieu: "Marché de Cocody", date: "15 Jan 2025", participants: 12, ames: 8, desc: "Distribution de l'Évangile de Jean et prière pour les malades au marché." },
  { lieu: "Hôpital Général d'Abidjan", date: "08 Jan 2025", participants: 8, ames: 4, desc: "Visite aux patients. Prière, encouragement et partage de la Parole de vie." },
  { lieu: "Prison d'Abidjan", date: "20 Déc 2024", participants: 6, ames: 15, desc: "Culte de Noël en prison. La grâce de Dieu touchée par plusieurs détenus." },
  { lieu: "Quartier Abobo", date: "12 Déc 2024", participants: 20, ames: 22, desc: "Campagne de rue intensive. Témoignages de guérison et de conversions." },
]

const actions_sociales = [
  { titre: "Distribution Alimentaire", icon: "fas fa-bread-slice", date: "10 Jan 2025", beneficiaires: 120, desc: "Repas chauds et denrées distribuées aux familles en difficulté du quartier." },
  { titre: "Soutien Scolaire", icon: "fas fa-book", date: "Toute l'année", beneficiaires: 35, desc: "Cours de soutien gratuits pour enfants défavorisés, tous les samedis." },
  { titre: "Visite des Orphelinats", icon: "fas fa-child", date: "25 Déc 2024", beneficiaires: 80, desc: "Cadeaux de Noël, repas spéciaux et animations pour les enfants orphelins." },
  { titre: "Assistance aux Veuves", icon: "fas fa-hands", date: "Nov 2024", beneficiaires: 18, desc: "Accompagnement pastoral et matériel pour les veuves de la communauté." },
]

const evenements = [
  { titre: "Veillée de Prière Mensuelle", date: "Chaque dernier vendredi", heure: "21h – 3h", lieu: "Siège du ministère", type: "Prière", inscrit: true },
  { titre: "Retraite Spirituelle Couples 2025", date: "14 – 16 Mars 2025", heure: "Toute la journée", lieu: "Hôtel Palm Club", type: "Famille", inscrit: false },
  { titre: "Conférence Intercession Nationale", date: "5 Avril 2025", heure: "09h – 18h", lieu: "Palais de la Culture", type: "Conférence", inscrit: false },
  { titre: "Campagne d'Évangélisation Estivale", date: "Juillet 2025", heure: "À confirmer", lieu: "Grand Abidjan", type: "Évangélisation", inscrit: false },
  { titre: "Séminaire : Guerre Spirituelle", date: "22 Fév 2025", heure: "10h – 17h", lieu: "En ligne & Présentiel", type: "Formation", inscrit: true },
]

const galerie = [
  { titre: "Veillée de Prière – Janvier 2025", cat: "Prière", count: 24 },
  { titre: "Évangélisation au Marché de Cocody", cat: "Évangélisation", count: 18 },
  { titre: "Distribution Alimentaire – Abobo", cat: "Social", count: 32 },
  { titre: "Retraite Spirituelle Couples 2024", cat: "Famille", count: 45 },
  { titre: "Mission en Prison – Décembre", cat: "Mission", count: 12 },
  { titre: "Conférence Intercession 2024", cat: "Conférence", count: 60 },
]

const palette = ['#0284C7', '#0EA5E9', '#B8860B', '#DAA520', '#075985', '#38BDF8']

function TerrainTab() {
  return (
    <div>
      <h3 style={{ fontFamily: 'var(--fs)', fontSize: '1.5rem', marginBottom: '.5rem' }}>Évangélisation Terrain</h3>
      <p style={{ color: 'var(--text2)', marginBottom: '1.75rem' }}>Nous allons là où les gens sont : rues, marchés, hôpitaux et prisons. La Bonne Nouvelle appartient à tous.</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {terrain.map((t, i) => (
          <div key={i} className="card reveal" style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
            <div style={{ width: 56, flexShrink: 0, textAlign: 'center' }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: palette[i % palette.length], display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '1.3rem', margin: '0 auto .4rem' }}>
                <i className="fas fa-map-marker-alt" />
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '.5rem', marginBottom: '.4rem' }}>
                <h4 style={{ color: 'var(--text)', fontSize: '1rem' }}>{t.lieu}</h4>
                <span style={{ fontSize: '.78rem', color: 'var(--text2)' }}>{t.date}</span>
              </div>
              <p style={{ fontSize: '.88rem', color: 'var(--text2)', marginBottom: '.6rem' }}>{t.desc}</p>
              <div style={{ display: 'flex', gap: '1.5rem' }}>
                <span style={{ fontSize: '.8rem', color: 'var(--blue)', fontWeight: 600 }}>
                  <i className="fas fa-users" style={{ marginRight: '.3rem' }} />{t.participants} participants
                </span>
                <span style={{ fontSize: '.8rem', color: 'var(--gold)', fontWeight: 600 }}>
                  <i className="fas fa-heart" style={{ marginRight: '.3rem' }} />{t.ames} âmes touchées
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'var(--bg2)', borderRadius: 12, border: '1px solid var(--border)' }}>
        <p style={{ fontWeight: 700, color: 'var(--blue)', marginBottom: '.5rem' }}>Vous voulez rejoindre une équipe terrain ?</p>
        <p style={{ fontSize: '.88rem', color: 'var(--text2)', marginBottom: '1rem' }}>Pas besoin d&apos;expérience — juste un cœur disponible. Nous vous formons et vous accompagnons.</p>
        <a href="/contact" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '.5rem' }}>
          <i className="fas fa-hands-helping" /> Je veux participer
        </a>
      </div>
    </div>
  )
}

function SocialTab() {
  return (
    <div>
      <h3 style={{ fontFamily: 'var(--fs)', fontSize: '1.5rem', marginBottom: '.5rem' }}>Actions Sociales</h3>
      <p style={{ color: 'var(--text2)', marginBottom: '1.75rem' }}>La foi sans les œuvres est morte. Nous incarnons l&apos;amour de Christ au travers d&apos;actes concrets de service.</p>
      <div className="card-grid">
        {actions_sociales.map((a, i) => (
          <div key={i} className="card reveal" style={{ textAlign: 'center' }}>
            <div style={{ marginBottom: '.75rem' }}><i className={a.icon} style={{ fontSize: '2.5rem', color: 'var(--blue)' }} /></div>
            <h4 style={{ color: 'var(--blue)', fontSize: '1.05rem', marginBottom: '.25rem' }}>{a.titre}</h4>
            <p style={{ fontSize: '.8rem', color: 'var(--text2)', marginBottom: '.75rem' }}>{a.date} · {a.beneficiaires} bénéficiaires</p>
            <p style={{ fontSize: '.88rem', color: 'var(--text2)', lineHeight: 1.7 }}>{a.desc}</p>
          </div>
        ))}
      </div>
      <div className="verse-block" style={{ marginTop: '2rem' }}>
        <p>Car j&apos;ai eu faim, et vous m&apos;avez donné à manger ; j&apos;ai eu soif, et vous m&apos;avez donné à boire.</p>
        <cite>Matthieu 25:35</cite>
      </div>
    </div>
  )
}

function EvenementsTab() {
  const typeColors = { Prière: '#0284C7', Famille: '#B8860B', Conférence: '#7C3AED', Évangélisation: '#DC2626', Formation: '#059669' }
  return (
    <div>
      <h3 style={{ fontFamily: 'var(--fs)', fontSize: '1.5rem', marginBottom: '.5rem' }}>Événements à Venir</h3>
      <p style={{ color: 'var(--text2)', marginBottom: '1.75rem' }}>Rejoignez-nous lors de nos prochains événements. Des moments de grâce vous attendent.</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {evenements.map((e, i) => (
          <div key={i} className="card reveal" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
            <div style={{ width: 64, height: 64, borderRadius: 12, background: typeColors[e.type] || 'var(--blue)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#fff', flexShrink: 0 }}>
              <span style={{ fontSize: '.7rem', textTransform: 'uppercase', letterSpacing: '.05em' }}>{e.type}</span>
            </div>
            <div style={{ flex: 1 }}>
              <h4 style={{ fontSize: '1rem', color: 'var(--text)', marginBottom: '.3rem' }}>{e.titre}</h4>
              <p style={{ fontSize: '.82rem', color: 'var(--text2)', margin: 0 }}>
                <i className="fas fa-calendar" style={{ marginRight: '.3rem' }} />{e.date}
                <span style={{ margin: '0 .75rem' }}>·</span>
                <i className="fas fa-clock" style={{ marginRight: '.3rem' }} />{e.heure}
                <span style={{ margin: '0 .75rem' }}>·</span>
                <i className="fas fa-map-marker-alt" style={{ marginRight: '.3rem' }} />{e.lieu}
              </p>
            </div>
            <button className={`btn ${e.inscrit ? 'btn-outline' : 'btn-primary'}`} style={{ flexShrink: 0, fontSize: '.8rem' }}>
              {e.inscrit ? <><i className="fas fa-check" /> Inscrit</> : <><i className="fas fa-calendar-plus" /> S&apos;inscrire</>}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

function GalerieTab() {
  const [filtre, setFiltre] = useState('Tous')
  const cats = ['Tous', ...new Set(galerie.map(g => g.cat))]
  const affiche = filtre === 'Tous' ? galerie : galerie.filter(g => g.cat === filtre)
  const bg = ['linear-gradient(135deg,#0284C7,#38BDF8)', 'linear-gradient(135deg,#075985,#0EA5E9)', 'linear-gradient(135deg,#B8860B,#DAA520)', 'linear-gradient(135deg,#0C1929,#1E3A5F)', 'linear-gradient(135deg,#7C3AED,#A78BFA)', 'linear-gradient(135deg,#059669,#34D399)']
  return (
    <div>
      <h3 style={{ fontFamily: 'var(--fs)', fontSize: '1.5rem', marginBottom: '1rem' }}>Galerie Photos &amp; Vidéos</h3>
      <div style={{ display: 'flex', gap: '.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
        {cats.map(c => (
          <button key={c} onClick={() => setFiltre(c)}
            style={{ padding: '.4rem 1rem', borderRadius: 20, border: `2px solid ${c === filtre ? 'var(--blue)' : 'var(--border)'}`, background: c === filtre ? 'var(--blue)' : 'transparent', color: c === filtre ? '#fff' : 'var(--text2)', fontSize: '.8rem', cursor: 'pointer', transition: 'all .2s' }}>
            {c}
          </button>
        ))}
      </div>
      <div className="card-grid">
        {affiche.map((g, i) => (
          <div key={i} className="card reveal" style={{ padding: 0, overflow: 'hidden', cursor: 'pointer' }}>
            <div style={{ height: 160, background: bg[galerie.indexOf(g) % bg.length], display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#fff', gap: '.5rem' }}>
              <i className="fas fa-images" style={{ fontSize: '2.5rem', opacity: .7 }} />
              <span style={{ fontSize: '.8rem', opacity: .85 }}>{g.count} photos</span>
            </div>
            <div style={{ padding: '1rem 1.25rem' }}>
              <span style={{ fontSize: '.7rem', fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--blue)' }}>{g.cat}</span>
              <h4 style={{ fontSize: '.9rem', color: 'var(--text)', marginTop: '.3rem' }}>{g.titre}</h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const TABS = [
  { id: 'terrain', label: 'Évangélisation terrain', icon: 'fas fa-bullhorn', Component: TerrainTab },
  { id: 'social', label: 'Actions sociales', icon: 'fas fa-hands', Component: SocialTab },
  { id: 'evenements', label: 'Événements', icon: 'fas fa-calendar-alt', Component: EvenementsTab },
  { id: 'galerie', label: 'Galerie photos/vidéos', icon: 'fas fa-camera', Component: GalerieTab },
]

export default function Activites() {
  const { tab: urlTab } = useParams()
  const active = (urlTab && ['terrain', 'social', 'evenements', 'galerie'].includes(urlTab)) ? urlTab : 'terrain'
  const navigate = useNavigate()
  const tab = TABS.find(t => t.id === active)
  const { Component } = tab

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <div className="breadcrumb"><a href="/">Accueil</a> › <span>Activités &amp; Actions</span></div>
          <div className="page-hero-eyebrow"><i className="fas fa-globe" style={{ marginRight: '.4rem' }} /> Sur le Terrain</div>
          <h1>Activités &amp; Actions</h1>
          <p>De l&apos;Évangile prêché dans les rues au pain partagé dans les quartiers — la foi en action.</p>
        </div>
      </div>
      <section className="section">
        <div className="container"><Component /></div>
      </section>
    </>
  )
}
