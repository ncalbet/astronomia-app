import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { useTheme } from '../context/ThemeContext'
import { LEARNING_PATHS, getPathById } from '../data/learningPaths'
import { loadModule } from '../data/moduleRegistry'
import styles from './LearningPathDetail.module.css'

const DIFFICULTY_LABEL = { introductori: 'Introductori', intermedi: 'Intermedi', avançat: 'Avançat' }
const DEPTH_LABEL      = { lleuger: 'Lleuger', intermedi: 'Intermedi', profund: 'Profund' }

export default function LearningPathDetail() {
  const navigate = useNavigate()
  const { navigationState, setNavigationState, completedModules, addXP } = useApp()
  const { theme } = useTheme()
  const [loading, setLoading] = useState(null) // moduleId being loaded

  const path = getPathById(navigationState.currentPathId)

  if (!path) {
    return (
      <div className={styles.center}>
        <p>Itinerari no trobat.</p>
        <button onClick={() => navigate('/')}>Tornar a l'inici</button>
      </div>
    )
  }

  const completedCount = path.modules.filter(m => completedModules.includes(m.id)).length
  const pct = path.modules.length > 0 ? Math.round((completedCount / path.modules.length) * 100) : 0
  const nextModule = path.modules.find(m => !completedModules.includes(m.id))

  const handleModuleStart = async (moduleId) => {
    setLoading(moduleId)
    setNavigationState({
      currentModuleId: moduleId,
      currentAreaId: path.areaId,
      currentItineraryId: null,
      currentLessonId: null,
      currentStep: 0,
    })
    try {
      const mod = await loadModule(moduleId)
      if (mod.itineraries && mod.itineraries.length > 0) {
        navigate('/itinerary')
      } else {
        navigate('/lesson')
      }
    } catch {
      navigate('/modules')
    } finally {
      setLoading(null)
    }
  }

  const totalMinutes = path.modules.reduce((acc, m) => acc + (m.minutes || 0), 0)
  const hoursLabel   = totalMinutes >= 60
    ? `~${Math.round(totalMinutes / 60)} h`
    : `~${totalMinutes} min`

  return (
    <div className={styles.screen}>
      <header className={styles.header}>
        <button className={styles.back} onClick={() => navigate('/')}>← Tornar</button>
      </header>

      {/* Hero */}
      <div className={styles.hero} style={{ '--path-accent': path.accentColor }}>
        <div className={styles.heroEmoji}>{path.emoji}</div>
        <h1 className={styles.heroTitle}>{path.title}</h1>
        <div className={styles.heroBadges}>
          <span className={styles.badge}>{DIFFICULTY_LABEL[path.difficulty]}</span>
          <span className={styles.badge}>{DEPTH_LABEL[path.depth]}</span>
          <span className={styles.badge}>{hoursLabel}</span>
        </div>
        <p className={styles.heroDesc}>{path.description}</p>
      </div>

      {/* Progrés global */}
      <div className={styles.progressSection}>
        <div className={styles.progressHeader}>
          <span className={styles.progressLabel}>Progrés de l'itinerari</span>
          <span className={styles.progressCount}>{completedCount} / {path.modules.length} mòduls</span>
        </div>
        <div className={styles.progressTrack}>
          <div
            className={styles.progressFill}
            style={{ width: `${pct}%`, background: path.accentColor }}
          />
        </div>
      </div>

      {/* Llista de mòduls */}
      <div className={styles.moduleList}>
        {path.modules.map((mod, idx) => {
          const done = completedModules.includes(mod.id)
          const isCurrent = nextModule?.id === mod.id
          const isLoadingThis = loading === mod.id
          return (
            <div
              key={mod.id}
              className={`${styles.moduleRow} ${done ? styles.done : ''} ${isCurrent ? styles.current : ''}`}
              style={{ '--path-accent': path.accentColor }}
            >
              <div className={styles.stepBadge}>
                {done ? <span className={styles.stepCheck}>✓</span> : <span className={styles.stepNum}>{idx + 1}</span>}
              </div>
              <div className={styles.moduleInfo}>
                <div className={styles.moduleTop}>
                  <span className={styles.moduleEmoji}>{mod.emoji}</span>
                  <span className={styles.moduleTitle}>{mod.title}</span>
                  {mod.minutes && (
                    <span className={styles.moduleTime}>~{mod.minutes}min</span>
                  )}
                </div>
                <p className={styles.moduleNote}>{mod.note}</p>
              </div>
              <button
                className={`${styles.startBtn} ${done ? styles.startBtnDone : ''}`}
                onClick={() => handleModuleStart(mod.id)}
                disabled={isLoadingThis}
              >
                {isLoadingThis ? '...' : done ? '↺' : isCurrent ? 'Comença →' : '→'}
              </button>
            </div>
          )
        })}
      </div>

      {/* Botó principal */}
      {nextModule ? (
        <div className={styles.footer}>
          <button
            className={styles.ctaBtn}
            style={{ background: path.accentColor }}
            onClick={() => handleModuleStart(nextModule.id)}
            disabled={!!loading}
          >
            {completedCount === 0 ? `Comença l'itinerari →` : `Continua — ${nextModule.title}`}
          </button>
        </div>
      ) : (
        <div className={styles.footer}>
          <div className={styles.doneBox}>
            <span>🎓</span>
            <div>
              <div className={styles.doneTitle}>Itinerari completat!</div>
              <div className={styles.doneSub}>{path.modules.length} mòduls · {path.durationEstimate}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
