import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { MODULE_REGISTRY } from '../data/moduleRegistry'
import styles from './ModuleMap.module.css'

// Títols visuals dels mòduls (es podrien posar al JSON)
const MODULE_META = {
  'module-01-copernicus': {
    title: 'La Revolució de Copèrnic',
    emoji: '☀️',
    description: '3 lliçons · 6 exercicis · 1 simulació'
  }
  // Nous mòduls s'afegeixen aquí
}

export default function ModuleMap() {
  const navigate = useNavigate()
  const { isModuleUnlocked, completedModules, setNavigationState } = useApp()

  const handleSelectModule = (moduleId) => {
    if (!isModuleUnlocked(moduleId)) return
    setNavigationState({ currentModuleId: moduleId, currentLessonId: null, currentStep: 0 })
    navigate('/lesson')
  }

  return (
    <div className={styles.screen}>
      <header className={styles.header}>
        <button className={styles.back} onClick={() => navigate('/')}>← Tornar</button>
        <h1 className={styles.title}>Mapa de Missions</h1>
        <p className={styles.subtitle}>Cada missió reconstrueix un fragment del coneixement</p>
      </header>

      <div className={styles.moduleList}>
        {MODULE_REGISTRY.map(({ id }) => {
          const meta = MODULE_META[id] || { title: id, emoji: '🔒', description: '' }
          const unlocked = isModuleUnlocked(id)
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
