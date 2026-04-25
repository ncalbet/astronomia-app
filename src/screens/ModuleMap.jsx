import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { useTheme } from '../context/ThemeContext'
import { MODULE_REGISTRY, loadModule } from '../data/moduleRegistry'
import styles from './ModuleMap.module.css'

const MODULE_META = {
  'module-01-copernicus': { title: 'La Revolució de Copèrnic',    emoji: '☀️', description: '3 lliçons · 6 exercicis · 1 simulació' },
  'module-02-history':    { title: 'Història de l\'Astronomia',   emoji: '🏛️', description: '2 itineraris · cronològic i temàtic' },
  'module-03-peace':      { title: 'Pau, Conflicte i Guerra',     emoji: '🕊️', description: '1 itinerari conceptual · 6 lliçons' },
  'module-04-philosophy': { title: 'Filosofia de la Ciència',     emoji: '🔬', description: '1 itinerari conceptual · 6 lliçons' },
  'module-05-birding':    { title: 'Introducció a l\'Ornitologia', emoji: '🐦', description: '1 itinerari pràctic · 6 lliçons' }
}

export default function ModuleMap() {
  const navigate  = useNavigate()
  const { isModuleUnlocked, completedModules, setNavigationState } = useApp()
  const { theme }  = useTheme()
  const [loadingId, setLoadingId] = useState(null) // quin mòdul s'està carregant

  const handleSelectModule = async (moduleId) => {
    if (!isModuleUnlocked(moduleId) || loadingId) return

    setLoadingId(moduleId)
    try {
      const data = await loadModule(moduleId)
      setNavigationState({
        currentModuleId: moduleId,
        currentItineraryId: null,
        currentLessonId: null,
        currentStep: 0
      })
      navigate(data.itineraries ? '/itinerary' : '/lesson')
    } catch (err) {
      console.error('Error carregant el mòdul:', err)
    } finally {
      setLoadingId(null)
    }
  }

  return (
    <div className={styles.screen}>
      <header className={styles.header}>
        <button className={styles.back} onClick={() => navigate('/')}>← Tornar</button>
        <h1 className={styles.title}>Mapa de {theme.missionWord}s</h1>
        <p className={styles.subtitle}>Cada missió reconstrueix un fragment del coneixement</p>
      </header>

      <div className={styles.moduleList}>
        {MODULE_REGISTRY.map(({ id }) => {
          const meta      = MODULE_META[id] || { title: id, emoji: '🔒', description: '' }
          const unlocked  = isModuleUnlocked(id)
          const completed = completedModules.includes(id)
          const isLoading = loadingId === id

          return (
            <button
              key={id}
              className={`${styles.moduleCard} ${!unlocked ? styles.locked : ''} ${completed ? styles.completed : ''}`}
              onClick={() => handleSelectModule(id)}
              disabled={!unlocked || !!loadingId}
            >
              <div className={styles.moduleEmoji}>
                {isLoading ? '⏳' : unlocked ? meta.emoji : '🔒'}
              </div>
              <div className={styles.moduleInfo}>
                <div className={styles.moduleName}>{meta.title}</div>
                <div className={styles.moduleMeta}>
                  {isLoading ? 'Carregant...' : unlocked ? meta.description : 'Completa el primer mòdul per desbloquejar'}
                </div>
              </div>
              {completed && !isLoading && <div className={styles.completedBadge}>✓</div>}
            </button>
          )
        })}
      </div>
    </div>
  )
}
