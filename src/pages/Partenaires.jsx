import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

const partenaires = [
  {
    id: 'espoir',
    nom: "Centre Espoir",
    icon: "fas fa-home",
    categorie: "Centre Social",
    desc: "Un centre d'accueil et de réinsertion pour les personnes en situation de précarité. Centre Espoir offre un hébergement temporaire, des repas chauds et un accompagnement vers l'autonomie.",
    mission: "Restaurer la dignité des personnes vulnérables en leur offrant un espace de sécurité, de soin et de reconstruction.",
    services: ["Hébergement d'urgence", "Repas quotidiens", "Accompagnement psychosocial", "Formation professionnelle"],
    verse: { text: "Heureux celui qui pense au misérable ! L'Éternel le délivrera au jour du malheur.", ref: "Psaume 41:1" },
    collab: "VPE fournit un soutien spirituel et des équipes de prière bénévoles au Centre Espoir chaque mois.",
    gradient: "linear-gradient(135deg,#0284C7,#0EA5E9)"
  },
  {
    id: 'artisan',
    nom: "Galerie Artisan",
    icon: "fas fa-palette",
    categorie: "Art & Culture",
    desc: "Une galerie d'art chrétien qui promeut les artistes locaux dont le travail témoigne de la beauté de la création divine et des valeurs du Royaume.",
    mission: "Valoriser l'art comme expression prophétique et outil d'évangélisation culturelle.",
    services: ["Expositions d'art chrétien", "Ateliers créatifs", "Vente d'œuvres locales", "Événements culturels"],
    verse: { text: "Il a rempli Betsaleel de l'Esprit de Dieu, en sagesse, en intelligence, en science et en toute espèce d'ouvrage.", ref: "Exode 35:31" },
    collab: "Partenariat pour des expositions communes lors de nos événements évangéliques.",
    gradient: "linear-gradient(135deg,#B8860B,#DAA520)"
  },
  {
    id: 'grandmedias',
    nom: "Grand Médias",
    icon: "fas fa-tv",
    categorie: "Médias & Communication",
    desc: "Un groupe de communication chrétien spécialisé dans la production audiovisuelle, la radio et les médias numériques au service de l'Évangile.",
    mission: "Amplifier la voix de l'Église à travers tous les canaux de communication modernes.",
    services: ["Production radio & TV", "Podcasts chrétiens", "Streaming d'événements", "Réseaux sociaux"],
    verse: { text: "Publiez-le parmi les nations, annoncez-le ! Élevez un étendard, publiez-le !", ref: "Jérémie 50:2" },
    collab: "Grand Médias diffuse nos veillées de prière et conférences sur ses plateformes.",
    gradient: "linear-gradient(135deg,#7C3AED,#A78BFA)"
  },
  {
    id: 'afrikart',
    nom: "Afrik Art Dance",
    icon: "fas fa-music",
    categorie: "Danse & Louange",
    desc: "Une compagnie de danse chrétienne africaine qui exprime la louange et l'adoration à travers les arts chorégraphiques enracinés dans les traditions africaines.",
    mission: "Sanctifier les arts culturels africains pour la gloire de Dieu et l'édification du Corps de Christ.",
    services: ["Spectacles de danse prophétique", "Formation chorégraphique", "Ateliers culturels", "Représentations évangéliques"],
    verse: { text: "Qu'il loue le Nom de l'Éternel en dansant, qu'il chante ses louanges avec le tambour et la harpe.", ref: "Psaume 149:3" },
    collab: "Afrik Art Dance anime nos soirées de louange avec des chorégraphies prophétiques.",
    gradient: "linear-gradient(135deg,#DC2626,#F87171)"
  },
  {
    id: 'wely',
    nom: "Wely Transport",
    icon: "fas fa-bus",
    categorie: "Transport & Logistique",
    desc: "Une entreprise de transport chrétienne qui met ses véhicules et sa logistique au service des missions évangéliques sur le terrain.",
    mission: "Faciliter la mobilité des équipes missionnaires pour un impact plus large sur le territoire.",
    services: ["Transport d'équipes missions", "Location de véhicules", "Logistique d'événements", "Transferts aéroport"],
    verse: { text: "Allez par tout le monde et prêchez la bonne nouvelle à toute la création.", ref: "Marc 16:15" },
    collab: "Wely Transport assure la mobilité de nos équipes terrain lors des campagnes d'évangélisation.",
    gradient: "linear-gradient(135deg,#059669,#34D399)"
  },
  {
    id: 'panivore',
    nom: "Panivore",
    icon: "fas fa-bread-slice",
    categorie: "Alimentation & Social",
    desc: "Une boulangerie-pâtisserie chrétienne qui partage ses ressources avec les plus démunis. Chaque pain vendu contribue à nourrir une famille dans le besoin.",
    mission: "Incarner le partage du pain — au sens littéral et spirituel — dans la communauté.",
    services: ["Boulangerie artisanale", "Distributions gratuites", "Traiteur pour événements", "Formation boulangerie"],
    verse: { text: "Je suis le pain de vie. Celui qui vient à moi n'aura jamais faim.", ref: "Jean 6:35" },
    collab: "Panivore fournit les repas lors de nos actions sociales et événements communautaires.",
    gradient: "linear-gradient(135deg,#D97706,#FCD34D)"
  },
]

export default function Partenaires() {
  const { tab: urlTab } = useParams()
  const active = (urlTab && ['espoir', 'artisan', 'grandmedias', 'afrikart', 'wely', 'panivore'].includes(urlTab)) ? urlTab : 'espoir'
  const navigate = useNavigate()
  const p = partenaires.find(x => x.id === active)

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <div className="breadcrumb"><a href="/">Accueil</a> › <span>Partenaires &amp; Projets</span></div>
          <div className="page-hero-eyebrow"><i className="fas fa-handshake" style={{ marginRight: '.4rem' }} /> Ensemble pour le Royaume</div>
          <h1>Partenaires &amp; Projets</h1>
          <p>Seuls nous allons plus vite. Ensemble nous allons plus loin. Découvrez nos partenaires en mission.</p>
        </div>
      </div>
      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'start' }}>
            <div>
              <div style={{ width: 80, height: 80, borderRadius: 20, background: p.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                <i className={p.icon} style={{ fontSize: '2.5rem', color: '#fff' }} />
              </div>
              <div style={{ fontSize: '.75rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--blue)', marginBottom: '.4rem' }}>{p.categorie}</div>
              <h2 style={{ fontFamily: 'var(--fs)', fontSize: '2rem', color: 'var(--text)', marginBottom: '1rem' }}>{p.nom}</h2>
              <p style={{ fontSize: '1.05rem', color: 'var(--text2)', lineHeight: 1.8, marginBottom: '1.25rem' }}>{p.desc}</p>
              <div style={{ background: 'var(--bg2)', borderLeft: '4px solid var(--gold)', padding: '1rem 1.25rem', borderRadius: '0 8px 8px 0', marginBottom: '1.5rem' }}>
                <p style={{ fontSize: '.88rem', color: 'var(--text2)', fontWeight: 600, marginBottom: '.25rem' }}>Mission</p>
                <p style={{ fontSize: '.9rem', color: 'var(--text)', margin: 0 }}>{p.mission}</p>
              </div>
              <div className="verse-block">
                <p>{p.verse.text}</p>
                <cite>{p.verse.ref}</cite>
              </div>
              <div style={{ marginTop: '1.5rem', padding: '1rem 1.25rem', background: 'var(--bg2)', borderRadius: 10, border: '1px solid var(--border)' }}>
                <p style={{ fontSize: '.8rem', fontWeight: 700, color: 'var(--blue)', marginBottom: '.35rem', textTransform: 'uppercase', letterSpacing: '.06em' }}>Notre collaboration</p>
                <p style={{ fontSize: '.88rem', color: 'var(--text2)', margin: 0 }}>{p.collab}</p>
              </div>
            </div>
            <div>
              <div className="card" style={{ marginBottom: '1.5rem' }}>
                <h4 style={{ color: 'var(--blue)', marginBottom: '1rem', fontSize: '.85rem', letterSpacing: '.1em', textTransform: 'uppercase' }}>Services &amp; Activités</h4>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '.7rem' }}>
                  {p.services.map(s => (
                    <li key={s} style={{ display: 'flex', gap: '.75rem', alignItems: 'center', fontSize: '.9rem', color: 'var(--text2)' }}>
                      <i className="fas fa-check-circle" style={{ color: 'var(--blue)', flexShrink: 0 }} />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
              <h4 style={{ fontFamily: 'var(--fs)', marginBottom: '1rem', color: 'var(--text)' }}>Nos autres partenaires</h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                {partenaires.filter(x => x.id !== active).map(x => (
                  <button key={x.id} onClick={() => navigate(`/partenaires/${t.id}`)}
                    className="card" style={{ textAlign: 'left', cursor: 'pointer', padding: '1rem' }}>
                    <div style={{ marginBottom: '.4rem' }}><i className={x.icon} style={{ fontSize: '1.5rem', color: 'var(--blue)' }} /></div>
                    <p style={{ margin: 0, fontSize: '.8rem', fontWeight: 700, color: 'var(--text)' }}>{x.nom}</p>
                    <p style={{ margin: '.2rem 0 0', fontSize: '.72rem', color: 'var(--text2)' }}>{x.categorie}</p>
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
