// Client de l'API PHP hébergée sur o2switch (dossier api/ du projet).
// L'adresse vient du fichier .env : VITE_API_URL=https://api.votre-domaine.fr

const API_URL = (import.meta.env.VITE_API_URL || '').replace(/\/+$/, '')
const TOKEN_KEY = 'vpe_admin_token'

export const isApiConfigured = API_URL !== ''

if (!isApiConfigured && import.meta.env.DEV) {
  console.warn('[VPE] VITE_API_URL n’est pas défini : créez un fichier .env (voir api/README.md). Le site affiche son contenu par défaut.')
}

export function getToken() {
  try { return localStorage.getItem(TOKEN_KEY) } catch { return null }
}

export function setToken(token) {
  try {
    if (token) localStorage.setItem(TOKEN_KEY, token)
    else localStorage.removeItem(TOKEN_KEY)
  } catch { /* stockage indisponible (navigation privée) */ }
}

/**
 * Appelle l'API et renvoie { data, error }.
 * - body : objet envoyé en JSON, ou FormData pour un fichier
 * - une réponse 401 sur une route admin déconnecte l'utilisateur
 */
export async function api(path, { method = 'GET', body } = {}) {
  if (!isApiConfigured) return { data: null, error: 'Le site n’est pas encore relié à son serveur.' }

  const headers = {}
  const token = getToken()
  if (token) headers['X-Auth-Token'] = token
  if (body !== undefined && !(body instanceof FormData)) headers['Content-Type'] = 'application/json'

  let res
  try {
    res = await fetch(API_URL + path, {
      method,
      headers,
      body: body === undefined ? undefined : body instanceof FormData ? body : JSON.stringify(body),
    })
  } catch {
    return { data: null, error: 'Impossible de joindre le serveur. Vérifiez votre connexion internet.' }
  }

  let data = null
  try { data = await res.json() } catch { /* réponse vide ou non JSON */ }

  if (!res.ok) {
    if (res.status === 401 && path.startsWith('/admin')) {
      setToken(null)
      window.dispatchEvent(new Event('vpe-logout'))
    }
    return { data: null, error: data?.error || `Erreur du serveur (${res.status}).`, status: res.status }
  }
  return { data, error: null }
}
