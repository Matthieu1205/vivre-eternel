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
      <div style={{ maxWidth: 1000 }}>
        <h3 style={{ fontFamily: 'var(--fs)', fontSize: '1.8rem', marginBottom: '1.5rem', color: 'var(--blue-dark)' }}>Vocation</h3>
        <img
          src="/vocation.jpeg"
          alt="Vocation du Ministère"
          style={{ width: '100%', maxHeight: 560, objectFit: 'cover', borderRadius: 16, marginBottom: '2rem', boxShadow: '0 8px 32px rgba(0,0,0,.14)' }}
        />
        <div style={{ maxWidth: 800 }}>
          <div className="verse-block" style={{ marginBottom: '2rem' }}>
            <p>« Au commencement était la parole, et la parole était avec Dieu, et la parole était Dieu… Cette lumière est la véritable Lumière, qui, en venant dans le monde, éclaire tout homme. »</p>
            <cite>Jean 1:1, 9</cite>
          </div>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.9, color: 'var(--text2)', marginBottom: '1.5rem' }}>
            <strong style={{ color: 'var(--text)' }}>« Vivre pour l&apos;Éternel »</strong>, à l&apos;image de Jean Baptiste, vient pour servir de témoin, pour rendre témoignage à la lumière, afin que tous les hommes croient en Jésus-Christ pour que les ténèbres reçoivent la lumière.
          </p>
        </div>
        <div className="about-grid" style={{ marginTop: '2rem' }}>
          {[
            { icon: 'fas fa-lightbulb', t: 'Témoin de la Lumière', d: "À l'image de Jean Baptiste, nous rendons témoignage à Jésus-Christ, la vraie Lumière." },
            { icon: 'fas fa-cross', t: 'Foi en Jésus-Christ', d: "Notre vocation : conduire toute âme à croire en Jésus-Christ, seul Sauveur." },
            { icon: 'fas fa-moon', t: 'Les Ténèbres en Lumière', d: "Que tout ce qui est dans l'ombre reçoive la clarté de l'Évangile vivant." },
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
    id: 'vision', label: 'La Vision', icon: 'fas fa-globe',
    content: () => (
      <div style={{ maxWidth: 1000 }}>
        {/* Image hero */}
        <div style={{ position: 'relative', marginBottom: '2.5rem', borderRadius: 20, overflow: 'hidden', boxShadow: '0 12px 48px rgba(0,0,0,.18)' }}>
          <img
            src="/vision.jpeg"
            alt="La Vision du Ministère"
            style={{ width: '100%', maxHeight: 500, objectFit: 'cover', display: 'block' }}
          />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to top, rgba(7,30,60,.75) 0%, rgba(7,30,60,.1) 60%, transparent 100%)',
          }} />
          <div style={{ position: 'absolute', bottom: '2rem', left: '2rem', right: '2rem' }}>
            <span style={{ fontSize: '.72rem', fontWeight: 700, letterSpacing: '.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,.7)' }}>Notre Vision</span>
            <h3 style={{ margin: '.4rem 0 0', fontFamily: 'var(--fs)', fontSize: 'clamp(1.4rem,3vw,2rem)', color: '#fff', fontWeight: 800, lineHeight: 1.2 }}>
              Jésus-Christ,<br />seul repère en toutes circonstances
            </h3>
          </div>
        </div>

        <div style={{ maxWidth: 800 }}>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.9, color: 'var(--text2)', marginBottom: '1.75rem' }}>
            <strong style={{ color: 'var(--text)' }}>« Vivre pour l&apos;Éternel »</strong> vise à orienter toutes créatures de Dieu vers Jésus-Christ, pour qu&apos;il soit le seul repère en toutes circonstances. Car Jésus-Christ est le chemin, la vie et la vérité.
          </p>
          <div className="verse-block" style={{ marginBottom: '2.5rem' }}>
            <p>« Le Père aime le Fils, et il a remis toutes choses entre ses mains. Celui qui croit au Fils a la vie Éternelle ; Celui qui ne croit pas au Fils ne verra point la vie, mais la colère de Dieu demeure sur lui. »</p>
            <cite>Jean 3:35–36</cite>
          </div>
        </div>

        {/* Cards modernes */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
          {[
            { icon: 'fas fa-globe', color: '#0284C7', bg: '#e0f2fe', t: 'Jésus-Christ, seul repère', d: "Orienter chaque âme vers Jésus comme unique boussole en toutes circonstances." },
            { icon: 'fas fa-road', color: '#059669', bg: '#d1fae5', t: 'Le Chemin, la Vie, la Vérité', d: "Proclamer que Jésus-Christ est le seul chemin menant au Père." },
            { icon: 'fas fa-infinity', color: '#7c3aed', bg: '#ede9fe', t: 'La Vie Éternelle', d: "Que toute créature reçoive la vie éternelle par la foi en Jésus-Christ." },
          ].map(v => (
            <div key={v.t} className="reveal" style={{
              background: '#fff', borderRadius: 16, padding: '1.75rem',
              boxShadow: '0 2px 12px rgba(0,0,0,.06)', border: '1px solid #f1f5f9',
              transition: 'transform .2s, box-shadow .2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(0,0,0,.1)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,.06)' }}
            >
              <div style={{ width: 52, height: 52, borderRadius: 14, background: v.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                <i className={v.icon} style={{ fontSize: '1.6rem', color: v.color }} />
              </div>
              <h4 style={{ margin: '0 0 .5rem', color: v.color, fontSize: '1rem', fontWeight: 700 }}>{v.t}</h4>
              <p style={{ margin: 0, fontSize: '.88rem', color: 'var(--text2)', lineHeight: 1.7 }}>{v.d}</p>
            </div>
          ))}
        </div>
      </div>
    )
  },
  {
    id: 'mission', label: 'La Mission', icon: 'fas fa-bullseye',
    content: () => (
      <div style={{ maxWidth: 1000 }}>
        {/* Image hero */}
        <div style={{ position: 'relative', marginBottom: '2.5rem', borderRadius: 20, overflow: 'hidden', boxShadow: '0 12px 48px rgba(0,0,0,.18)' }}>
          <img
            src="/mission.jpeg"
            alt="La Mission du Ministère"
            style={{ width: '100%', maxHeight: 500, objectFit: 'cover', display: 'block' }}
          />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to top, rgba(7,30,60,.75) 0%, rgba(7,30,60,.1) 60%, transparent 100%)',
          }} />
          <div style={{ position: 'absolute', bottom: '2rem', left: '2rem', right: '2rem' }}>
            <span style={{ fontSize: '.72rem', fontWeight: 700, letterSpacing: '.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,.7)' }}>Notre Mission</span>
            <h3 style={{ margin: '.4rem 0 0', fontFamily: 'var(--fs)', fontSize: 'clamp(1.4rem,3vw,2rem)', color: '#fff', fontWeight: 800, lineHeight: 1.2 }}>
              Des ténèbres vers<br />la Lumière de l&apos;Évangile
            </h3>
          </div>
        </div>

        <div style={{ maxWidth: 800 }}>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.9, color: 'var(--text2)', marginBottom: '2rem' }}>
            Que les ténèbres dans ce monde deviennent Lumière par la Parole de Dieu, puis par les signes et les miracles accomplis par Jésus-Christ ; afin que toutes créatures de Dieu marchent dans la Lumière et deviennent enfants de Dieu en se laissant conduire par l&apos;Esprit de Dieu (Saint-Esprit) qui est Lumière et Vie Éternelle.
          </p>
          <div className="verse-block" style={{ marginBottom: '2.5rem' }}>
            <p>« Car tous ceux qui sont conduits par l&apos;Esprit de Dieu sont fils de Dieu… et si nous sommes enfants, nous sommes aussi héritiers. »</p>
            <cite>Romains 8:14, 17</cite>
          </div>
        </div>

        {/* Étapes modernes numérotées */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {[
            { num: '01', icon: 'fas fa-lightbulb', color: '#f59e0b', bg: '#fffbeb', t: 'Ténèbres en Lumière', d: "Transformer les ténèbres du monde en Lumière par la Parole de Dieu." },
            { num: '02', icon: 'fas fa-star', color: '#0284C7', bg: '#e0f2fe', t: 'Signes & Miracles', d: "Témoigner de la puissance de Jésus-Christ à travers les signes et les miracles." },
            { num: '03', icon: 'fas fa-walking', color: '#059669', bg: '#d1fae5', t: 'Marcher dans la Lumière', d: "Conduire toutes créatures à marcher dans la Lumière, enfants de Dieu." },
            { num: '04', icon: 'fas fa-dove', color: '#7c3aed', bg: '#ede9fe', t: 'Conduits par le Saint-Esprit', d: "Se laisser guider par le Saint-Esprit, source de Lumière et de Vie Éternelle." },
          ].map(v => (
            <div key={v.t} className="reveal" style={{
              display: 'flex', alignItems: 'flex-start', gap: '1.25rem',
              background: '#fff', borderRadius: 16, padding: '1.5rem',
              boxShadow: '0 2px 12px rgba(0,0,0,.05)', border: '1px solid #f1f5f9',
              transition: 'transform .2s, box-shadow .2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateX(6px)'; e.currentTarget.style.boxShadow = '0 6px 24px rgba(0,0,0,.09)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateX(0)'; e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,.05)' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexShrink: 0 }}>
                <span style={{ fontSize: '.7rem', fontWeight: 800, color: v.color, letterSpacing: '.05em', minWidth: 26 }}>{v.num}</span>
                <div style={{ width: 52, height: 52, borderRadius: 14, background: v.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <i className={v.icon} style={{ fontSize: '1.5rem', color: v.color }} />
                </div>
              </div>
              <div>
                <h4 style={{ margin: '0 0 .4rem', color: 'var(--text)', fontSize: '1rem', fontWeight: 700 }}>{v.t}</h4>
                <p style={{ margin: 0, fontSize: '.9rem', color: 'var(--text2)', lineHeight: 1.7 }}>{v.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  },
  {
    id: 'spiritualite', label: 'La Spiritualité', icon: 'fas fa-fire',
    content: () => (
      <div style={{ maxWidth: 1000 }}>
        {/* Image hero */}
        <div style={{ position: 'relative', marginBottom: '2.5rem', borderRadius: 20, overflow: 'hidden', boxShadow: '0 12px 48px rgba(0,0,0,.18)' }}>
          <img
            src="/spirituel.jpeg"
            alt="La Spiritualité du Ministère"
            style={{ width: '100%', maxHeight: 500, objectFit: 'cover', display: 'block' }}
          />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to top, rgba(7,30,60,.75) 0%, rgba(7,30,60,.1) 60%, transparent 100%)',
          }} />
          <div style={{ position: 'absolute', bottom: '2rem', left: '2rem', right: '2rem' }}>
            <span style={{ fontSize: '.72rem', fontWeight: 700, letterSpacing: '.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,.7)' }}>Notre Spiritualité</span>
            <h3 style={{ margin: '.4rem 0 0', fontFamily: 'var(--fs)', fontSize: 'clamp(1.4rem,3vw,2rem)', color: '#fff', fontWeight: 800, lineHeight: 1.2 }}>
              L&apos;intercession,<br />cœur de notre vie spirituelle
            </h3>
          </div>
        </div>

        <div style={{ maxWidth: 800 }}>
          {/* Intro */}
          <div style={{ background: 'linear-gradient(135deg,#eff6ff,#e0f2fe)', borderRadius: 16, padding: '1.5rem 1.75rem', marginBottom: '2rem', borderLeft: '4px solid var(--blue)' }}>
            <p style={{ margin: 0, fontSize: '1rem', lineHeight: 1.9, color: 'var(--text2)' }}>
              Vivre pour l&apos;Éternel est régi par les éléments de spiritualités du{' '}
              <strong style={{ color: 'var(--blue-dark)' }}>Sanctuaire Marial Regina Pacis</strong>, sis à Grand-Lahou.
            </p>
          </div>

          {/* Bloc verset + texte */}
          <div className="verse-block" style={{ marginBottom: '1.75rem' }}>
            <p>« Je vois qu&apos;il n&apos;y a pas un homme. Je m&apos;étonne que personne n&apos;intercède ; Alors mon bras lui vient en aide. Et ma justice lui sert d&apos;appui. »</p>
            <cite>Ésaïe 59:16</cite>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
            {[
              "Dieu nous exhorte à l'intercession pour que sa main agisse puissamment. Tel est notre rôle dans l'Église, les familles, les couples et la société.",
              "La Gloire de Dieu se manifeste toujours là où les hommes prient sincèrement et veulent que les promesses de Dieu se réalisent dans leurs vies.",
              "Tout chrétien est un intercesseur implicite et explicite.",
            ].map((t, i) => (
              <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <span style={{ flexShrink: 0, width: 8, height: 8, borderRadius: '50%', background: 'var(--blue)', marginTop: '.65rem' }} />
                <p style={{ margin: 0, fontSize: '1rem', lineHeight: 1.9, color: 'var(--text2)' }}>{t}</p>
              </div>
            ))}
          </div>

          <div className="verse-block" style={{ marginBottom: '1.75rem' }}>
            <p>« Non, la main de l&apos;Éternel n&apos;est pas courte pour sauver, ni son oreille trop dure pour entendre. Mais ce sont nos crimes qui mettent une séparation entre Dieu et les hommes. Ce sont nos péchés qui nous cachent la face de Dieu et l&apos;empêche de nous écouter. »</p>
            <cite>Ésaïe 59:1–2</cite>
          </div>

          <p style={{ fontSize: '1rem', lineHeight: 1.9, color: 'var(--text2)', marginBottom: '1.75rem', fontStyle: 'italic', paddingLeft: '1rem', borderLeft: '3px solid var(--gold2)' }}>
            Mon frère, ma sœur, Dieu veut que tu sois réellement un bon et vrai intercesseur.
          </p>

          <div className="verse-block" style={{ marginBottom: '1.75rem' }}>
            <p>« Vous me cherchez et vous me trouverez, si vous me cherchez de tout votre cœur. »</p>
            <cite>Jérémie 29:13</cite>
          </div>

          <div style={{ background: '#f8fafc', borderRadius: 12, padding: '1.25rem 1.5rem', border: '1px solid #e2e8f0' }}>
            <p style={{ margin: '0 0 .4rem', fontSize: '1rem', lineHeight: 1.8, color: 'var(--text2)' }}>
              Le travail de l&apos;intercesseur est vivement souhaité par l&apos;Éternel.
            </p>
            <p style={{ margin: 0, fontSize: '.85rem', color: 'var(--blue)', fontWeight: 700, letterSpacing: '.04em' }}>Ésaïe 42:18–23 · Ézéchiel 22:30</p>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'responsable', label: 'Le Responsable', icon: 'fas fa-user',
    content: () => (
      <div style={{ maxWidth: 1000 }}>
        {/* Photo + présentation */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '3rem', alignItems: 'start', marginBottom: '3rem' }}>
          <div>
            <img
              src="/responsable.jpg"
              alt="Le Responsable du Ministère"
              style={{ width: '100%', minHeight: 640, height: 'auto', borderRadius: 20, objectFit: 'cover', objectPosition: 'top center', boxShadow: '0 16px 56px rgba(0,0,0,.2)', display: 'block' }}
              onError={e => {
                e.target.outerHTML = '<div style="width:100%;height:640px;border-radius:20px;background:linear-gradient(135deg,#0284C7,#38BDF8);display:flex;flex-direction:column;align-items:center;justify-content:center;color:#fff;gap:.75rem;font-family:sans-serif"><i class="fas fa-user" style="font-size:5rem"></i><span style="font-size:.9rem;opacity:.9;font-weight:600">Le Responsable</span></div>'
              }}
            />
          </div>
          <div style={{ paddingTop: '1rem' }}>
            <span style={{ fontSize: '.72rem', fontWeight: 700, letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--blue)', display: 'block', marginBottom: '.6rem' }}>Fondateur</span>
            <h3 style={{ fontFamily: 'var(--fs)', fontSize: '1.7rem', color: 'var(--blue-dark)', marginBottom: '1rem', lineHeight: 1.2 }}>Le Responsable du Ministère</h3>
            <p style={{ fontSize: '.95rem', color: 'var(--text2)', lineHeight: 1.85, marginBottom: '1.5rem' }}>
              Homme de prière, de vision et de terrain. Il a répondu à l&apos;appel divin de servir les âmes avec passion, intégrité et humilité. Porteur d&apos;une vision prophétique pour les nations, il dirige ce ministère avec un cœur tourné vers Dieu et vers les plus démunis.
            </p>
            <div className="verse-block">
              <p>Il a donné les uns comme apôtres, les autres comme prophètes, les autres comme évangélistes, les autres comme pasteurs et docteurs.</p>
              <cite>Éphésiens 4:11</cite>
            </div>
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
