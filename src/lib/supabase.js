import { createClient } from '@supabase/supabase-js'

// 👉 Remplace ces valeurs par tes vraies clés Supabase
// Crée ton projet sur https://supabase.com puis copie les clés dans
// Settings → API
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://TON-PROJET.supabase.co'
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'TA-CLE-PUBLIQUE'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
