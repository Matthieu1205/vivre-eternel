// Authentification du backoffice via l'API (jeton stocké dans le navigateur).
// Chaque route admin de l'API vérifie elle-même le jeton : ce contrôle côté
// client ne sert qu'à l'affichage.
import { api, getToken, setToken } from './api'

export async function login(email, password) {
  const { data, error } = await api('/auth/login', { method: 'POST', body: { email, password } })
  if (error) return { error }
  setToken(data.token)
  return {}
}

export async function logout() {
  await api('/auth/logout', { method: 'POST' })
  setToken(null)
  window.dispatchEvent(new Event('vpe-logout'))
}

export async function isAdmin() {
  if (!getToken()) return false
  const { error } = await api('/auth/me')
  if (error) setToken(null)
  return !error
}

/** true si aucun admin n'existe encore et que la création du premier compte est ouverte. */
export async function needsSetup() {
  const { data } = await api('/auth/status')
  return Boolean(data?.needs_setup)
}

export async function setupFirstAdmin(setupToken, email, password) {
  const { data, error } = await api('/auth/setup', { method: 'POST', body: { setup_token: setupToken, email, password } })
  if (error) return { error }
  setToken(data.token)
  return {}
}
