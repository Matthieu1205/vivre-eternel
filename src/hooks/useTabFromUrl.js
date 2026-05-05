import { useParams } from 'react-router-dom'

/**
 * Lit le paramètre `:tab` depuis l'URL (ex: /a-propos/vision → "vision").
 * Si absent ou invalide, retourne le defaultTab.
 */
export function useTabFromUrl(defaultTab, validTabs) {
  const { tab } = useParams()
  if (tab && validTabs.includes(tab)) return tab
  return defaultTab
}
