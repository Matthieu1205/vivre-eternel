import { useEffect, useState } from 'react'
import { supabase, isSupabaseConfigured } from './supabase'

/**
 * Enregistre une ligne envoyée depuis un formulaire public.
 * Renvoie { error } avec un message lisible en cas d'échec.
 */
export async function submitForm(table, row) {
  if (!isSupabaseConfigured) return { error: 'Le site n’est pas encore relié à sa base de données.' }
  const { error } = await supabase.from(table).insert([row])
  if (!error) return {}
  if (error.code === '23505') return {} // déjà enregistré (ex. email déjà inscrit à la newsletter)
  console.error(`[VPE] insertion ${table} :`, error)
  return { error: 'L’envoi a échoué. Réessayez dans un instant ou écrivez-nous sur WhatsApp.' }
}

/**
 * Charge une liste depuis Supabase et la convertit au format d'affichage.
 * Tant que la base n'est pas configurée, ou si la table est vide ou
 * inaccessible, la page affiche son contenu par défaut (`fallback`).
 *
 * @param {(q: any) => any} query  ex. q => q.from('programmes').select('*').order('ordre')
 * @param {(row: any) => any} map  conversion d'une ligne vers le format attendu par la page
 */
export function useContent(key, query, map, fallback) {
  const [items, setItems] = useState(fallback)
  const [loading, setLoading] = useState(isSupabaseConfigured)

  useEffect(() => {
    if (!isSupabaseConfigured) return
    let active = true
    query(supabase).then(({ data, error }) => {
      if (!active) return
      if (error) console.error(`[VPE] lecture ${key} :`, error)
      else if (data?.length) setItems(data.map(map))
      setLoading(false)
    })
    return () => { active = false }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])

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
