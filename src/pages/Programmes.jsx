import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

const PROGS = [
  {
    id: 'couple', icon: 'fas fa-heart', label: "L'Esprit Saint dans le Couple",
    horaire: "Chaque vendredi · 19h30 – 21h",
    desc: "Séminaire d'évangélisation au sein du couple : enseignement de la Parole, prière commune et suivi spirituel.",
    detail: "Ce programme accompagne les couples dans la découverte du rôle du Saint-Esprit au cœur de leur union. À travers l'enseignement, la prière et un suivi spirituel personnalisé, chaque couple est équipé pour bâtir un foyer fondé sur Dieu.",
    verse: { text: "Ce que Dieu a uni, que l'homme ne le sépare pas.", ref: "Matthieu 19:6" },
    points: ["Enseignement de la Parole", "Prière en couple", "Suivi spirituel", "Séminaire d'évangélisation"] },
  {
    id: 'delivrance', icon: 'fas fa-link', label: "Autorité sur les Eaux Profondes",
    horaire: "Chaque Mardi et Jeudi · 08h30 – 17h",
    desc: "Écoute et prière de délivrance. Briser les liens invisibles par la puissance du Nom de Jésus-Christ.",
    detail: "Des séances d'écoute profonde et de prière de délivrance pour libérer ceux qui portent des fardeaux invisibles. Dans un cadre de confiance, de bienveillance et de puissance divine, les chaînes sont brisées.",
    verse: { text: "Si le Fils vous affranchit, vous serez réellement libres.", ref: "Jean 8:36" },
    points: ["Écoute bienveillante", "Prière de délivrance", "Séances individuelles", "Suivi post-délivrance"] },
  {
    id: 'rosee', icon: 'fas fa-leaf', label: "Rosée de Miséricorde",
    horaire: "Chaque Samedi · 8h30 – 12h30",
    desc: "Assemblée de prière d'intercession — louange, enseignement, adoration et effusion du Saint-Esprit.",
    detail: "Une rencontre hebdomadaire centrée sur l'intercession, la louange et l'adoration. Dans ce lieu de grâce, le Saint-Esprit se répand et transforme les cœurs. Un espace pour se ressourcer et intercéder pour les autres.",
    verse: { text: "Je ferai tomber une pluie de bénédictions en son temps.", ref: "Ézéchiel 34:26" },
    points: ["Prière d'intercession", "Louange et adoration", "Enseignement de la Parole", "Effusion du Saint-Esprit"] },
  {
    id: 'louange', icon: 'fas fa-music', label: "La Puissance de la Louange",
    horaire: "Chaque 3 mois",
    desc: "Spectacle de Louange — enseignement, effusion du Saint-Esprit, témoignages et présence manifeste de Dieu.",
    detail: "Un événement trimestriel exceptionnel où la louange devient une arme spirituelle. Des chants, des témoignages, des enseignements profonds et une atmosphère propice à l'effusion du Saint-Esprit. Une nuit inoubliable avec Dieu.",
    verse: { text: "L'Éternel est ma force et mon cantique, et il m'a sauvé.", ref: "Psaume 118:14" },
    points: ["Spectacle de louange", "Témoignages", "Enseignement", "Effusion du Saint-Esprit"] },
  {
    id: 'pastorale', icon: 'fas fa-home', label: "Pastorale",
    horaire: "Sur rendez-vous",
    desc: "Visite des familles, des couples et de la jeunesse — écoute, suivi spirituel et prière à domicile.",
    detail: "Le ministère va à la rencontre des familles, des couples et des jeunes là où ils sont. À travers des visites pastorales empreintes d'amour, nous offrons une écoute attentive, un accompagnement spirituel et la prière.",
    verse: { text: "J'irai devant vous, dit l'Éternel.", ref: "Ésaïe 52:12" },
    points: ["Visites à domicile", "Accompagnement des couples", "Suivi de la jeunesse", "Prière et écoute"] },
]

export default function Programmes() {
  const { tab: urlTab } = useParams()
  const active = (urlTab && ['couple', 'delivrance', 'rosee', 'louange', 'pastorale'].includes(urlTab)) ? urlTab : 'couple'
  const navigate = useNavigate()
  const prog = PROGS.find(p => p.id === active)

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <div className="breadcrumb"><a href="/">Accueil</a> › <span>Programmes</span></div>
          <div className="page-hero-eyebrow"><i className="fas fa-fire" style={{ marginRight: '.4rem' }} /> Nos Programmes</div>
          <h1>Programmes du Ministère</h1>
          <p>5 programmes de rencontre avec Dieu, conçus pour transformer, libérer et fortifier.</p>
        </div>
      </div>
      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'start' }}>
            <div>
              <div style={{ marginBottom: '1rem' }}><i className={prog.icon} style={{ fontSize: '3.5rem', color: 'var(--blue)' }} /></div>
              <h2 style={{ fontFamily: 'var(--fs)', fontSize: '2rem', color: 'var(--blue)', marginBottom: '.5rem' }}>{prog.label}</h2>
              {prog.horaire && (
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '.5rem', background: 'var(--blue)', color: '#fff', borderRadius: 100, padding: '.3rem .9rem', fontSize: '.78rem', fontWeight: 600, marginBottom: '1.25rem' }}>
                  <i className="fas fa-clock" /> {prog.horaire}
                </div>
              )}
              <p style={{ fontSize: '1.05rem', color: 'var(--text2)', lineHeight: 1.8, marginBottom: '1.5rem' }}>{prog.detail}</p>
              <div className="verse-block">
                <p>{prog.verse.text}</p>
                <cite>{prog.verse.ref}</cite>
              </div>
              <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <a href="/contact" className="btn btn-primary">
                  <i className="fas fa-calendar" /> S&apos;inscrire
                </a>
                <a href="/priere" className="btn btn-outline">
                  <i className="fas fa-hands-praying" /> Demande de prière
                </a>
              </div>
            </div>
            <div>
              <div className="card" style={{ marginBottom: '1.5rem' }}>
                <h4 style={{ color: 'var(--blue)', marginBottom: '1rem', fontSize: '.85rem', letterSpacing: '.1em', textTransform: 'uppercase' }}>Ce que vous recevrez</h4>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '.7rem' }}>
                  {prog.points.map(pt => (
                    <li key={pt} style={{ display: 'flex', gap: '.75rem', alignItems: 'center', fontSize: '.9rem', color: 'var(--text2)' }}>
                      <i className="fas fa-check-circle" style={{ color: 'var(--blue)', flexShrink: 0 }} />
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                {PROGS.filter(p => p.id !== active).slice(0, 4).map(p => (
                  <button key={p.id} onClick={() => navigate(`/programmes/${p.id}`)}
                    className="card" style={{ textAlign: 'left', cursor: 'pointer', padding: '1rem' }}>
                    <div style={{ marginBottom: '.4rem' }}><i className={p.icon} style={{ fontSize: '1.5rem', color: 'var(--blue)' }} /></div>
                    <p style={{ margin: 0, fontSize: '.8rem', fontWeight: 700, color: 'var(--text)' }}>{p.label}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
