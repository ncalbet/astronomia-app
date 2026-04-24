/**
 * ThemeContext.jsx
 *
 * Gestiona el tema actiu de l'app.
 * En carregar, aplica les variables CSS del tema a :root.
 * Qualsevol component pot llegir el tema amb useTheme().
 *
 * Ús:
 *   const { theme } = useTheme()
 *   theme.appName            → "Acadèmia Còsmica"
 *   theme.reflectionModeName → "Mode Científic"
 *   theme.narrative.correctHigh → "Anàlisi excel·lent..."
 */

import { createContext, useContext, useEffect, useState } from 'react'
import { loadTheme, DEFAULT_THEME_ID } from '../themes/themeRegistry'
import storage from '../storage/storageProvider'

const ThemeContext = createContext(null)

// Aplica les variables CSS del tema a :root
function applyThemeCSS(colors) {
  const root = document.documentElement
  root.style.setProperty('--color-accent',     colors.accent)
  root.style.setProperty('--color-accent-dim',  colors.accentDim)
  root.style.setProperty('--color-accent-glow', colors.accentGlow)
  root.style.setProperty('--color-bg',          colors.bg)
  root.style.setProperty('--color-surface',     colors.surface)
  root.style.setProperty('--color-surface-2',   colors.surface2)
  root.style.setProperty('--color-border',      colors.border)
}

export function ThemeProvider({ children }) {
  const [theme, setTheme]   = useState(null)
  const [loading, setLoading] = useState(true)

  // Carrega el tema desat o el per defecte
  const activeThemeId = storage.get('activeTheme', DEFAULT_THEME_ID)

  useEffect(() => {
    loadTheme(activeThemeId).then(data => {
      setTheme(data)
      applyThemeCSS(data.colors)
      setLoading(false)
    })
  }, [activeThemeId])

  const switchTheme = async (themeId) => {
    setLoading(true)
    const data = await loadTheme(themeId)
    storage.set('activeTheme', themeId)
    setTheme(data)
    applyThemeCSS(data.colors)
    setLoading(false)
  }

  if (loading || !theme) return null

  return (
    <ThemeContext.Provider value={{ theme, switchTheme, activeThemeId }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
