import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { useTheme } from '../context/ThemeContext'
import { MODULE_REGISTRY } from '../data/moduleRegistry'
import styles from './ModuleMap.module.css'

const MODULE_META = {
  'module-01-copernicus': {
    title: 'La Revolució de Copèrnic',
    emoji: '☀️',
    description: '3 lliçons · 6 exercicis · 1 simulació'
  },
  'module-02-history': {
    title: 'Història de l\'Astronomia',
    emoji: '🏛️',
    description: '2 itineraris · cronològic i temàtic'
  }
}

export default function ModuleMap() {
  const navigate = useNavigate()
  const { isModuleUnlocked, completedModules, isItineraryCompleted, setNavigationState } = useApp()
  const { theme } = useTheme()

  const handleSelectModule = async (moduleId) => {
    if (!isModuleUnlocked(moduleId)) return

    // Carrega el mòdul per saber si té itineraris
    const { loadModule } = await import('../data/moduleRegistry')
    const data = await loadModule(moduleId)

    setNavigationState({
      currentModuleId: moduleId,
      currentItineraryId: null,
      currentLessonId: null,
      currentStep: 0
    })

    // Si té itineraris → pantalla de selecció; si no → lliçó directament
    if (data.itineraries) {
      navigate('/itinerary')
    } else {
      navigate('/lesson')
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
          const meta    = MODULE_META[id] || { title: id, emoji: '🔒', description: '' }
          const unlocked  = isModuleUnlocked(id)
          const completed = completedModules.includes(id)

          return (
            <button
              key={id}
              className={`${styles.moduleCard} ${!unlocked ? styles.locked : ''} ${completed ? styles.completed : ''}`}
              onClick={() => handleSelectModule(id)}
              disabled={!unlocked}
            >
              <div className={styles.moduleEmoji}>{unlocked ? meta.emoji : '🔒'}</div>
              <div className={styles.moduleInfo}>
                <div className={styles.moduleName}>{meta.title}</div>
                <div className={styles.moduleMeta}>{unlocked ? meta.description : 'Bloquejat'}</div>
              </div>
              {completed && <div className={styles.completedBadge}>✓</div>}
            </button>
          )
        })}
      </div>
    </div>
  )
}
