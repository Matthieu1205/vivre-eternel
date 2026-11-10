// Authentification du backoffice via Supabase Auth.
// Un compte n'a accès à l'admin que s'il figure dans la table public.admins
// (voir supabase/README.md). Les règles RLS de la base appliquent la même
// vérification côté serveur : ce contrôle côté client ne sert qu'à l'affichage.
import { supabase } from './supabase'

export async function login(email, password) {
  const { error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) return { error: 'Email ou mot de passe incorrect.' }
  if (!(await isAdmin())) {
    await supabase.auth.signOut()
    return { error: "Ce compte n'a pas accès au backoffice." }
  }
  return {}
}

export function logout() {
  return supabase.auth.signOut()
}

export async function isAdmin() {
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) return false
  const { data } = await supabase
    .from('admins')
    .select('user_id')
    .eq('user_id', session.user.id)
    .maybeSingle()
  return Boolean(data)
}
