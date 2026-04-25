import { createContext, useContext, useEffect, useState } from 'react'
import { loadTheme, DEFAULT_THEME_ID } from '../themes/themeRegistry'
import storage from '../storage/storageProvider'

const ThemeContext = createContext(null)

function applyThemeCSS(colors) {
  const root = document.documentElement
  root.style.setProperty('--color-accent',      colors.accent)
  root.style.setProperty('--color-accent-dim',  colors.accentDim)
  root.style.setProperty('--color-accent-glow', colors.accentGlow)
  root.style.setProperty('--color-bg',          colors.bg)
  root.style.setProperty('--color-surface',     colors.surface)
  root.style.setProperty('--color-surface-2',   colors.surface2)
  root.style.setProperty('--color-border',      colors.border)
}

export function ThemeProvider({ children }) {
  const [theme, setTheme]     = useState(null)
  const [loading, setLoading] = useState(true)

  const activeThemeId = storage.get('activeTheme', DEFAULT_THEME_ID)

  useEffect(() => {
    loadTheme(activeThemeId).then(data => {
      setTheme(data)
      applyThemeCSS(data.colors)
      setLoading(false)
    }).catch(() => {
      // Fallback: carrega el tema per defecte si falla
      loadTheme(DEFAULT_THEME_ID).then(data => {
        setTheme(data)
        applyThemeCSS(data.colors)
        setLoading(false)
      })
    })
  }, [activeThemeId])

  const switchTheme = async (themeId) => {
    setLoading(true)
    try {
      const data = await loadTheme(themeId)
      storage.set('activeTheme', themeId)
      setTheme(data)
      applyThemeCSS(data.colors)
    } catch (err) {
      console.error('Error canviant tema:', err)
    } finally {
      setLoading(false)
    }
  }

  // Mostra una pantalla de càrrega mínima en lloc de null
  if (loading || !theme) {
    return (
      <div style={{
        minHeight: '100dvh',
        background: '#0b0f1e',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#4c7dff',
        fontFamily: 'sans-serif',
        fontSize: '1.5rem'
      }}>
        🌌
      </div>
    )
  }

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
