// Textes des pages : version d'origine (src/content/sections.js) complétée
// par les modifications faites dans le backoffice (« Pages du site »).
import { createContext, Fragment, useContext, useEffect, useState } from 'react'
import { api, isApiConfigured } from './api'
import { SECTIONS } from '../content/sections'

const ContentContext = createContext({})

let overridesPromise = null
/** Charge une seule fois les textes modifiés (partagé par toutes les pages). */
function loadOverrides() {
  if (!isApiConfigured) return Promise.resolve({})
  if (!overridesPromise) {
    overridesPromise = api('/public/contenus').then(({ data, error }) => {
      if (error) console.error('[VPE] lecture des textes :', error)
      return data && typeof data === 'object' ? data : {}
    })
  }
  return overridesPromise
}

/** Oublie les textes chargés (après une modification dans le backoffice). */
export function refreshContent() {
  overridesPromise = null
  window.dispatchEvent(new Event('vpe-content-updated'))
}

export function ContentProvider({ children }) {
  const [overrides, setOverrides] = useState({})
  useEffect(() => {
    let active = true
    const load = () => loadOverrides().then(o => { if (active) setOverrides(o) })
    load()
    window.addEventListener('vpe-content-updated', load)
    return () => { active = false; window.removeEventListener('vpe-content-updated', load) }
  }, [])
  return <ContentContext.Provider value={overrides}>{children}</ContentContext.Provider>
}

/** Fusionne le texte d'origine et les champs modifiés (un champ vidé reprend le texte d'origine). */
export function mergeSection(key, stored) {
  const defaults = SECTIONS[key]?.defaults || {}
  const out = { ...defaults }
  for (const [name, value] of Object.entries(stored || {})) {
    const empty = value === null || value === undefined || value === '' || (Array.isArray(value) && value.length === 0)
    if (!empty || !(name in defaults)) out[name] = value
  }
  return out
}

/** Textes d'une section, ex. useSection('apropos.vision'). */
export function useSection(key) {
  const overrides = useContext(ContentContext)
  return mergeSection(key, overrides[key])
}

/** Coordonnées du ministère, avec les liens téléphone / WhatsApp prêts à l'emploi. */
export function useCoordonnees() {
  const c = useSection('site.coordonnees')
  const digits = s => String(s || '').replace(/[^\d+]/g, '')
  const wa = String(c.whatsapp || '').replace(/\D/g, '')
  return {
    ...c,
    telHref1: `tel:${digits(c.tel1)}`,
    telHref2: `tel:${digits(c.tel2)}`,
    waNumber: wa,
    waLink: (message = 'Bonjour, je contacte le ministère Vivre pour l\'Éternel.') =>
      `https://wa.me/${wa}${message ? `?text=${encodeURIComponent(message)}` : ''}`,
  }
}

/** « **gras** » → <strong>, sauts de ligne conservés. */
export function Inline({ text, strongStyle }) {
  const parts = String(text || '').split(/(\*\*[^*]+\*\*)/g)
  return parts.map((part, i) => {
    if (/^\*\*[^*]+\*\*$/.test(part)) return <strong key={i} style={strongStyle}>{part.slice(2, -2)}</strong>
    const lines = part.split('\n')
    return <Fragment key={i}>{lines.map((l, j) => <Fragment key={j}>{j > 0 && <br />}{l}</Fragment>)}</Fragment>
  })
}

/** Texte en plusieurs paragraphes (séparés par une ligne vide). */
export function Paragraphs({ text, style, strongStyle }) {
  return String(text || '').split(/\n\s*\n/).map(s => s.trim()).filter(Boolean).map((p, i) => (
    <p key={i} style={style}><Inline text={p} strongStyle={strongStyle} /></p>
  ))
}

/** En-tête des pages intérieures (fil d'Ariane, petit titre, titre, introduction). */
export function PageHero({ section, crumb, icon }) {
  const h = useSection(section)
  return (
    <div className="page-hero">
      <div className="container">
        <div className="breadcrumb"><a href="/">Accueil</a> › <span>{crumb || h.titre}</span></div>
        {h.eyebrow && <div className="page-hero-eyebrow"><i className={icon} style={{ marginRight: '.4rem' }} /> {h.eyebrow}</div>}
        <h1>{h.titre}</h1>
        {h.texte && <p>{h.texte}</p>}
      </div>
    </div>
  )
}

/** Bloc verset, masqué s'il n'y a pas de texte. */
export function Verse({ text, cite, style }) {
  if (!text) return null
  return (
    <div className="verse-block" style={style}>
      <p>{text}</p>
      {cite && <cite>{cite}</cite>}
    </div>
  )
}
