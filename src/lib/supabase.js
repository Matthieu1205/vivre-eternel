import { createClient } from '@supabase/supabase-js'

// Les clés viennent du fichier .env (voir .env.example et supabase/README.md).
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://TON-PROJET.supabase.co'
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'TA-CLE-PUBLIQUE'

export const isSupabaseConfigured = !SUPABASE_URL.includes('TON-PROJET')

if (!isSupabaseConfigured && import.meta.env.DEV) {
  console.warn('[VPE] Supabase n’est pas configuré : créez un fichier .env (voir supabase/README.md). Le site affiche son contenu par défaut.')
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
