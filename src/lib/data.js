import { useEffect, useState } from 'react'
import { api, isApiConfigured } from './api'

/**
 * Enregistre un formulaire public (contact, prière, témoignage…).
 * `table` est le nom de la table côté API, ex. 'messages_contact'.
 * Renvoie { error } avec un message lisible en cas d'échec.
 */
export async function submitForm(table, row) {
  const { error, status } = await api(`/forms/${table}`, { method: 'POST', body: row })
  if (!error) return {}
  if (status === 429 || status === 422) return { error }
  console.error(`[VPE] envoi ${table} :`, error)
  return { error: 'L’envoi a échoué. Réessayez dans un instant ou écrivez-nous sur WhatsApp.' }
}

/**
 * Charge une liste publique depuis l'API et la convertit au format d'affichage.
 * Tant que l'API n'est pas configurée, ou si la liste est vide ou
 * inaccessible, la page affiche son contenu par défaut (`fallback`).
 *
 * @param {string} path            ex. '/public/programmes' ou '/public/activites?categorie=terrain'
 * @param {(row: any) => any} map  conversion d'une ligne vers le format attendu par la page
 */
// Une même liste demandée par plusieurs composants (ex. menu + page) n'est chargée qu'une fois.
const listCache = new Map()
function loadList(path) {
  if (!listCache.has(path)) {
    const promise = api(path)
    listCache.set(path, promise)
    promise.then(({ error }) => { if (error) listCache.delete(path) })
  }
  return listCache.get(path)
}

export function useContent(path, map, fallback) {
  const [items, setItems] = useState(fallback)
  const [loading, setLoading] = useState(isApiConfigured)

  useEffect(() => {
    if (!isApiConfigured) return
    let active = true
    loadList(path).then(({ data, error }) => {
      if (!active) return
      if (error) console.error(`[VPE] lecture ${path} :`, error)
      else if (Array.isArray(data) && data.length) setItems(data.map(map))
      setLoading(false)
    })
    return () => { active = false }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path])

  return { items, loading }
}

/** « 2025-01-12 » → « 12 janv. 2025 » ; tout autre texte est renvoyé tel quel. */
export function formatDate(value) {
  if (!value) return ''
  if (!/^\d{4}-\d{2}-\d{2}/.test(value)) return value
  return new Date(value + (value.length === 10 ? 'T00:00:00' : '')).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })
}

/** Texte multi-lignes → tableau (une entrée par ligne non vide). */
export function lines(text) {
  return (text || '').split('\n').map(s => s.trim()).filter(Boolean)
}
