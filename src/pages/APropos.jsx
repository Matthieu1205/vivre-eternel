import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

const TABS = [
  {
    id: 'presentation', label: 'Présentation', icon: 'fas fa-book-open',
    content: () => (
      <div style={{ maxWidth: 800 }}>
        <h3 style={{ fontFamily: 'var(--fs)', fontSize: '1.8rem', marginBottom: '1.5rem', color: 'var(--blue-dark)' }}>Présentation du Ministère</h3>
        <p style={{ fontSize: '1.05rem', lineHeight: 1.9, color: 'var(--text2)', marginBottom: '1.5rem' }}>
          <strong style={{ color: 'var(--text)' }}>« Vivre pour l&apos;Éternel »</strong> est un ministère chrétien fondé sur la Parole de Dieu, porté par une communauté de foi engagée à servir le Seigneur avec ferveur, intégrité et amour fraternel.
        </p>
        <p style={{ fontSize: '1.05rem', lineHeight: 1.9, color: 'var(--text2)', marginBottom: '1.75rem' }}>
          Ancré dans la tradition du <strong style={{ color: 'var(--text)' }}>Ministère de Feu et de Résurrection</strong> et de la <strong style={{ color: 'var(--text)' }}>Fraternité des Disciples de Jésus-Christ</strong>, ce ministère rassemble des hommes et des femmes appelés à marcher dans la lumière de l&apos;Évangile, à intercéder pour les nations et à témoigner de la puissance transformatrice de Jésus-Christ.
        </p>
        <div className="verse-block" style={{ marginBottom: '2rem' }}>
          <p>« Vous êtes la lumière du monde. Une ville située sur une montagne ne peut être cachée. »</p>
          <cite>Matthieu 5:14</cite>
        </div>
        <div className="about-grid" style={{ marginTop: '2rem' }}>
          {[
            { icon: 'fas fa-cross', t: 'Fondé sur la Parole', d: "Toute notre démarche prend racine dans la Parole de Dieu, source de vie et de transformation." },
            { icon: 'fas fa-users', t: 'Communauté de Foi', d: "Un peuple uni dans l'amour fraternel, la prière et le service du Seigneur." },
            { icon: 'fas fa-globe', t: '10+ Ans de Ministère', d: "Depuis plus de dix ans, des vies touchées, des familles restaurées et des nations atteintes." },
          ].map(v => (
            <div key={v.t} className="card reveal" style={{ textAlign: 'center' }}>
              <div style={{ marginBottom: '.75rem' }}><i className={v.icon} style={{ fontSize: '2rem', color: 'var(--blue)' }} /></div>
              <h4 style={{ color: 'var(--blue)', marginBottom: '.5rem' }}>{v.t}</h4>
              <p style={{ fontSize: '.88rem', color: 'var(--text2)' }}>{v.d}</p>
            </div>
          ))}
        </div>
      </div>
    )
  },
  {
    id: 'vocation', label: 'La Vocation', icon: 'fas fa-candle-holder',
    content: () => (
      <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '3rem', alignItems: 'start' }}>
        <div style={{ borderRadius: 16, overflow: 'hidden', boxShadow: '0 12px 48px rgba(0,0,0,.18)', lineHeight: 0 }}>
          <img src="/vocation.jpeg" alt="Vocation du Ministère" style={{ width: '100%', display: 'block' }} onError={e => { e.target.parentElement.style.display = 'none' }} />
        </div>
        <div>
          <h2 style={{ fontFamily: 'var(--fs)', fontSize: '1.75rem', color: 'var(--blue)', marginBottom: '.75rem', lineHeight: 1.25 }}>La Vocation</h2>
          <p style={{ fontSize: '1rem', color: 'var(--text2)', lineHeight: 1.85, marginBottom: '1.5rem' }}>
            À l&apos;image de Jean Baptiste, nous venons pour servir de témoins, pour rendre témoignage à la lumière, afin que tous les hommes croient en Jésus-Christ et que les ténèbres reçoivent la lumière.
          </p>
          <div className="verse-block" style={{ marginBottom: '1.5rem' }}>
            <p>« Au commencement était la parole… Cette lumière est la véritable Lumière, qui, en venant dans le monde, éclaire tout homme. »</p>
            <cite>Jean 1:1, 9</cite>
          </div>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '.7rem' }}>
            {["Témoin de la Lumière de Jésus-Christ", "Conduire toute âme à croire en Jésus-Christ", "Que les ténèbres reçoivent la Lumière de l'Évangile"].map(pt => (
              <li key={pt} style={{ display: 'flex', gap: '.75rem', alignItems: 'center', fontSize: '.9rem', color: 'var(--text2)' }}>
                <i className="fas fa-check-circle" style={{ color: 'var(--blue)', flexShrink: 0 }} />{pt}
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  },
  {
    id: 'vision', label: 'La Vision', icon: 'fas fa-globe',
    content: () => (
      <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '3rem', alignItems: 'start' }}>
        <div style={{ borderRadius: 16, overflow: 'hidden', boxShadow: '0 12px 48px rgba(0,0,0,.18)', lineHeight: 0 }}>
          <img src="/vision.jpeg" alt="La Vision du Ministère" style={{ width: '100%', display: 'block' }} onError={e => { e.target.parentElement.style.display = 'none' }} />
        </div>
        <div>
          <h2 style={{ fontFamily: 'var(--fs)', fontSize: '1.75rem', color: 'var(--blue)', marginBottom: '.75rem', lineHeight: 1.25 }}>La Vision</h2>
          <p style={{ fontSize: '1rem', color: 'var(--text2)', lineHeight: 1.85, marginBottom: '1.5rem' }}>
            Orienter toutes créatures de Dieu vers Jésus-Christ, pour qu&apos;il soit le seul repère en toutes circonstances. Car Jésus-Christ est le chemin, la vie et la vérité.
          </p>
          <div className="verse-block" style={{ marginBottom: '1.5rem' }}>
            <p>« Celui qui croit au Fils a la vie Éternelle ; Celui qui ne croit pas au Fils ne verra point la vie. »</p>
            <cite>Jean 3:35–36</cite>
          </div>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '.7rem' }}>
            {["Jésus-Christ, seul repère en toutes circonstances", "Le Chemin, la Vie et la Vérité proclamés", "La Vie Éternelle pour toute créature croyante"].map(pt => (
              <li key={pt} style={{ display: 'flex', gap: '.75rem', alignItems: 'center', fontSize: '.9rem', color: 'var(--text2)' }}>
                <i className="fas fa-check-circle" style={{ color: 'var(--blue)', flexShrink: 0 }} />{pt}
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  },
  {
    id: 'mission', label: 'La Mission', icon: 'fas fa-bullseye',
    content: () => (
      <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '3rem', alignItems: 'start' }}>
        <div style={{ borderRadius: 16, overflow: 'hidden', boxShadow: '0 12px 48px rgba(0,0,0,.18)', lineHeight: 0 }}>
          <img src="/mission.jpeg" alt="La Mission du Ministère" style={{ width: '100%', display: 'block' }} onError={e => { e.target.parentElement.style.display = 'none' }} />
        </div>
        <div>
          <h2 style={{ fontFamily: 'var(--fs)', fontSize: '1.75rem', color: 'var(--blue)', marginBottom: '.75rem', lineHeight: 1.25 }}>La Mission</h2>
          <p style={{ fontSize: '1rem', color: 'var(--text2)', lineHeight: 1.85, marginBottom: '1.5rem' }}>
            Que les ténèbres dans ce monde deviennent Lumière par la Parole de Dieu et les miracles de Jésus-Christ, afin que toutes créatures marchent dans la Lumière et deviennent enfants de Dieu conduits par le Saint-Esprit.
          </p>
          <div className="verse-block" style={{ marginBottom: '1.5rem' }}>
            <p>« Car tous ceux qui sont conduits par l&apos;Esprit de Dieu sont fils de Dieu… et si nous sommes enfants, nous sommes aussi héritiers. »</p>
            <cite>Romains 8:14, 17</cite>
          </div>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '.7rem' }}>
            {["Transformer les ténèbres en Lumière par la Parole", "Témoigner des signes et miracles de Jésus-Christ", "Conduire toute créature à marcher dans la Lumière", "Se laisser guider par le Saint-Esprit, Lumière et Vie"].map(pt => (
              <li key={pt} style={{ display: 'flex', gap: '.75rem', alignItems: 'center', fontSize: '.9rem', color: 'var(--text2)' }}>
                <i className="fas fa-check-circle" style={{ color: 'var(--blue)', flexShrink: 0 }} />{pt}
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  },
  {
    id: 'spiritualite', label: 'La Spiritualité', icon: 'fas fa-fire',
    content: () => (
      <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '3rem', alignItems: 'start' }}>
        <div style={{ borderRadius: 16, overflow: 'hidden', boxShadow: '0 12px 48px rgba(0,0,0,.18)', lineHeight: 0 }}>
          <img src="/spirituel.jpeg" alt="La Spiritualité du Ministère" style={{ width: '100%', display: 'block' }} onError={e => { e.target.parentElement.style.display = 'none' }} />
        </div>
        <div>
          <h2 style={{ fontFamily: 'var(--fs)', fontSize: '1.75rem', color: 'var(--blue)', marginBottom: '.75rem', lineHeight: 1.25 }}>La Spiritualité</h2>
          <p style={{ fontSize: '1rem', color: 'var(--text2)', lineHeight: 1.85, marginBottom: '1.5rem' }}>
            Régie par les éléments de spiritualité du <strong style={{ color: 'var(--blue-dark)' }}>Sanctuaire Marial Regina Pacis</strong>, notre vie spirituelle est fondée sur l&apos;intercession — Dieu nous exhorte à prier pour que sa main agisse puissamment dans les familles, les couples et la société.
          </p>
          <div className="verse-block" style={{ marginBottom: '1.5rem' }}>
            <p>« Je m&apos;étonne que personne n&apos;intercède ; Alors mon bras lui vient en aide. Et ma justice lui sert d&apos;appui. »</p>
            <cite>Ésaïe 59:16</cite>
          </div>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '.7rem' }}>
            {["L'intercession, cœur de notre vie spirituelle", "La Gloire de Dieu se manifeste là où l'on prie", "Tout chrétien est un intercesseur de Dieu"].map(pt => (
              <li key={pt} style={{ display: 'flex', gap: '.75rem', alignItems: 'center', fontSize: '.9rem', color: 'var(--text2)' }}>
                <i className="fas fa-check-circle" style={{ color: 'var(--blue)', flexShrink: 0 }} />{pt}
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  },
  {
    id: 'responsable', label: 'Le Responsable', icon: 'fas fa-user',
    content: () => (
      <div>
        {/* Photo + présentation */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '3rem', alignItems: 'start', marginBottom: '3rem' }}>
          <div style={{ borderRadius: 16, overflow: 'hidden', boxShadow: '0 12px 48px rgba(0,0,0,.18)', lineHeight: 0 }}>
            <img
              src="/responsable.jpg"
              alt="Le Responsable du Ministère"
              style={{ width: '100%', display: 'block', objectFit: 'cover', objectPosition: 'top center' }}
              onError={e => { e.target.parentElement.style.display = 'none' }}
            />
          </div>
          <div>
            <h2 style={{ fontFamily: 'var(--fs)', fontSize: '1.75rem', color: 'var(--blue)', marginBottom: '.5rem', lineHeight: 1.3 }}>
              Président - Fondateur
            </h2>
            <p style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text)', marginBottom: '.25rem' }}>Berger Général / Porteur de Vision</p>
            <p style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--blue-dark)', marginBottom: '1.25rem' }}>Jean-Pierre Christian GBALLOU</p>
            <p style={{ fontSize: '1rem', color: 'var(--text2)', lineHeight: 1.85, marginBottom: '1.5rem' }}>
              Homme de prière, de vision et de terrain. Il a répondu à l&apos;appel divin de servir les âmes avec passion, intégrité et humilité. Porteur d&apos;une vision prophétique pour les nations, il dirige ce ministère avec un cœur tourné vers Dieu et vers les plus démunis.
            </p>
            <div className="verse-block" style={{ marginBottom: '1.5rem' }}>
              <p>Il a donné les uns comme apôtres, les autres comme prophètes, les autres comme évangélistes, les autres comme pasteurs et docteurs.</p>
              <cite>Éphésiens 4:11</cite>
            </div>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '.7rem' }}>
              {["Homme de prière et de vision prophétique", "Serviteur des familles, couples et jeunes", "Porteur de l'appel divin pour les nations"].map(pt => (
                <li key={pt} style={{ display: 'flex', gap: '.75rem', alignItems: 'center', fontSize: '.9rem', color: 'var(--text2)' }}>
                  <i className="fas fa-check-circle" style={{ color: 'var(--blue)', flexShrink: 0 }} />{pt}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Éditorial */}
        <div style={{ borderTop: '2px solid var(--border)', paddingTop: '2.5rem' }}>
          <h3 style={{ fontFamily: 'var(--fs)', fontSize: '1.5rem', color: 'var(--blue-dark)', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '.75rem' }}>
            <i className="fas fa-pen-nib" style={{ color: 'var(--blue)' }} /> Éditorial
          </h3>

          <div style={{ maxWidth: 760, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

            {/* Paragraphe 1 */}
            <div style={{ background: '#f8fafc', borderRadius: 14, padding: '1.5rem 1.75rem', borderLeft: '4px solid var(--blue)' }}>
              <p style={{ margin: '0 0 .75rem', fontSize: '1rem', lineHeight: 2, color: 'var(--text2)' }}>
                Bien aimé de l&apos;Éternel, dans ce monde, nous auront à souffrir sous le Poids des péchés de ce monde qui n&apos;est que ténèbres. Mais gardons Courage —{' '}
                <strong style={{ color: 'var(--text)' }}>JÉSUS-CHRIST a vaincu le monde.</strong>
              </p>
              <p style={{ margin: '0 0 .75rem', fontSize: '1rem', lineHeight: 2, color: 'var(--text2)' }}>
                Beaucoup se conduisent en ennemi de la croix du Christ, ils n&apos;apprécient que les choses de la terre. Qui s&apos;attache aux vices de ce Monde, vit dans les ténèbres et reste esclave.
              </p>
              <span style={{ fontSize: '.82rem', fontWeight: 700, color: 'var(--blue)', letterSpacing: '.06em' }}>Jn 8:34–35</span>
            </div>

            {/* Paragraphe 2 */}
            <div style={{ background: '#f8fafc', borderRadius: 14, padding: '1.5rem 1.75rem', borderLeft: '4px solid var(--gold2)' }}>
              <p style={{ margin: '0 0 .75rem', fontSize: '1rem', lineHeight: 2, color: 'var(--text2)' }}>
                Le monde et ses convoitises passent. Sachons que notre cité se trouve dans les Cieux.
              </p>
              <span style={{ fontSize: '.82rem', fontWeight: 700, color: 'var(--blue)', letterSpacing: '.06em' }}>Ph 3:18–20</span>
            </div>

            {/* Paragraphe 3 */}
            <div style={{ background: '#f8fafc', borderRadius: 14, padding: '1.5rem 1.75rem', borderLeft: '4px solid var(--blue)' }}>
              <p style={{ margin: '0 0 .75rem', fontSize: '1rem', lineHeight: 2, color: 'var(--text2)' }}>
                Nul ne peut comprendre les choses Célestes, si ce n&apos;est par l&apos;Esprit descendu du ciel. Tous ceux qui se laissent conduire par l&apos;Esprit de Dieu sont Enfants de Dieu.
              </p>
              <span style={{ fontSize: '.82rem', fontWeight: 700, color: 'var(--blue)', letterSpacing: '.06em' }}>Rm 8:14–17</span>
            </div>

            {/* Paragraphe 4 */}
            <div style={{ background: '#f8fafc', borderRadius: 14, padding: '1.5rem 1.75rem', borderLeft: '4px solid var(--gold2)' }}>
              <p style={{ margin: '0 0 .75rem', fontSize: '1rem', lineHeight: 2, color: 'var(--text2)' }}>
                Faisons donc la volonté de Dieu en marchant dans la Lumière afin que nous soyons des enfants de lumière. Celui qui fait la volonté de Dieu demeure Éternel.
              </p>
              <span style={{ fontSize: '.82rem', fontWeight: 700, color: 'var(--blue)', letterSpacing: '.06em' }}>1 Jn 2:17</span>
            </div>

            {/* Conclusion */}
            <div style={{ background: '#f8fafc', borderRadius: 14, padding: '1.5rem 1.75rem', borderLeft: '4px solid var(--blue)' }}>
              <p style={{ margin: '0 0 1.25rem', fontSize: '1rem', lineHeight: 2, color: 'var(--text2)', fontStyle: 'italic' }}>
                Ainsi, Prions ensemble pour que tous les Hommes se laissent conduire par l&apos;Amour du Christ et qu&apos;ils correspondent aux désirs de l&apos;Éternel afin qu&apos;ils puissent dire :
              </p>
              <p style={{
                margin: 0, fontSize: '1.2rem', fontWeight: 800, color: 'var(--blue)',
                fontFamily: 'var(--fs)', textAlign: 'center',
                padding: '1rem 1.5rem', background: '#fff',
                borderRadius: 10, border: '2px solid var(--border)',
                letterSpacing: '.01em',
              }}>
                « Pour moi, Vivre c&apos;est le Christ ! »
              </p>
            </div>

          </div>
        </div>
      </div>
    )
  },
]

export default function APropos() {
  const { tab: urlTab } = useParams()
  const active = (urlTab && ['presentation', 'vocation', 'vision', 'mission', 'spiritualite', 'responsable'].includes(urlTab)) ? urlTab : 'presentation'
  const navigate = useNavigate()
  const tab = TABS.find(t => t.id === active)
  const Content = tab.content

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <div className="breadcrumb"><a href="/">Accueil</a> › <span>À Propos</span></div>
          <div className="page-hero-eyebrow"><i className="fas fa-cross" style={{ marginRight: '.4rem' }} /> Notre Identité</div>
          <h1>À Propos du Ministère</h1>
          <p>Découvrez qui nous sommes, notre vision, notre mission et les valeurs qui nous animent.</p>
        </div>
      </div>
      <section className="section">
        <div className="container">
          <Content />
        </div>
      </section>
    </>
  )
}
