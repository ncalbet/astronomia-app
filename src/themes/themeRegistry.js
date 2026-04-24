/**
 * themeRegistry.js
 *
 * Registre de tots els temes disponibles.
 * Afegir un tema nou = crear el JSON + afegir una entrada aquí.
 */

export const THEME_REGISTRY = [
  {
    id: 'astronomy',
    label: 'Astronomia',
    file: () => import('./astronomy.json')
  },
  {
    id: 'philosophy',
    label: 'Filosofia',
    file: () => import('./philosophy.json')
  }
  // Nous temes:
  // { id: 'finance', label: 'Finances', file: () => import('./finance.json') }
]

export const DEFAULT_THEME_ID = 'astronomy'

/**
 * Carrega un tema per ID
 */
export async function loadTheme(themeId) {
  const entry = THEME_REGISTRY.find(t => t.id === themeId)
  if (!entry) {
    console.warn(`Tema '${themeId}' no trobat. Usant per defecte.`)
    return loadTheme(DEFAULT_THEME_ID)
  }
  const data = await entry.file()
  return data.default || data
}
