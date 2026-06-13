import { createContext, useContext, useEffect, useState } from 'react'
import { loadTheme, DEFAULT_THEME_ID } from '../themes/themeRegistry'
import storage from '../storage/storageProvider'

const ThemeContext = createContext(null)

const LIGHT_BG = {
  bg:       '#f7f6f2',
  surface:  '#fffefb',
  surface2: '#efede7',
  border:   '#ddd9d0',
}

function applyThemeCSS(colors, scheme) {
  const root = document.documentElement
  root.style.setProperty('--color-accent',      colors.accent)
  root.style.setProperty('--color-accent-dim',  colors.accentDim)
  root.style.setProperty('--color-accent-glow', scheme === 'light' ? 'rgba(76,125,255,0.15)' : colors.accentGlow)

  if (scheme === 'light') {
    root.style.setProperty('--color-bg',        LIGHT_BG.bg)
    root.style.setProperty('--color-surface',   LIGHT_BG.surface)
    root.style.setProperty('--color-surface-2', LIGHT_BG.surface2)
    root.style.setProperty('--color-border',    LIGHT_BG.border)
  } else {
    root.style.setProperty('--color-bg',        colors.bg)
    root.style.setProperty('--color-surface',   colors.surface)
    root.style.setProperty('--color-surface-2', colors.surface2)
    root.style.setProperty('--color-border',    colors.border)
  }

  root.dataset.colorScheme = scheme
}

export function ThemeProvider({ children }) {
  const [theme, setTheme]           = useState(null)
  const [loading, setLoading]       = useState(true)
  const [colorScheme, setColorScheme] = useState(() => storage.get('colorScheme', 'dark'))

  const activeThemeId = storage.get('activeTheme', DEFAULT_THEME_ID)

  useEffect(() => {
    loadTheme(activeThemeId).then(data => {
      setTheme(data)
      applyThemeCSS(data.colors, colorScheme)
      setLoading(false)
    }).catch(() => {
      loadTheme(DEFAULT_THEME_ID).then(data => {
        setTheme(data)
        applyThemeCSS(data.colors, colorScheme)
        setLoading(false)
      })
    })
  }, [activeThemeId])

  // Re-aplica colors quan canvia l'esquema
  useEffect(() => {
    if (!theme) return
    applyThemeCSS(theme.colors, colorScheme)
  }, [colorScheme])

  const switchTheme = async (themeId) => {
    setLoading(true)
    try {
      const data = await loadTheme(themeId)
      storage.set('activeTheme', themeId)
      setTheme(data)
      applyThemeCSS(data.colors, colorScheme)
    } catch (err) {
      console.error('Error canviant tema:', err)
    } finally {
      setLoading(false)
    }
  }

  const toggleColorScheme = () => {
    const next = colorScheme === 'dark' ? 'light' : 'dark'
    storage.set('colorScheme', next)
    setColorScheme(next)
  }

  if (loading || !theme) {
    return (
      <div style={{
        minHeight: '100dvh',
        background: colorScheme === 'light' ? '#f7f6f2' : '#13151c',
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
    <ThemeContext.Provider value={{ theme, switchTheme, activeThemeId, colorScheme, toggleColorScheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
