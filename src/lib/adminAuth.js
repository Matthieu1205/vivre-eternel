// Authentification simple pour l'admin
// Mot de passe stocké ici — à remplacer par Supabase Auth plus tard
const ADMIN_PASSWORD = 'vpe-admin-2024'

export function login(password) {
  if (password === ADMIN_PASSWORD) {
    sessionStorage.setItem('vpe_admin', '1')
    return true
  }
  return false
}

export function logout() {
  sessionStorage.removeItem('vpe_admin')
}

export function isAuthenticated() {
  return sessionStorage.getItem('vpe_admin') === '1'
}
