import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { getPathById } from '../data/learningPaths'
import { loadModule } from '../data/moduleRegistry'
import styles from './LearningPathDetail.module.css'

const DIFFICULTY_LABEL = { introductori: 'Introductori', intermedi: 'Intermedi', avançat: 'Avançat' }
const DEPTH_LABEL      = { lleuger: 'Lleuger', intermedi: 'Intermedi', profund: 'Profund' }

const CONFETTI_COLORS = ['#4C7DFF', '#6a95ff', '#3DDB84', '#FFB443', '#FF6B6B', '#C084FC', '#F59E0B']

function PathCertificate({ path, onClose }) {
  const [confetti] = useState(() =>
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
      left: `${5 + (i * 4.7) % 90}%`,
      duration: `${0.7 + (i * 0.04) % 0.6}s`,
      delay: `${(i * 0.025) % 0.45}s`,
      size: `${6 + (i * 1.3) % 7}px`,
      radius: i % 3 === 0 ? '50%' : '2px',
    }))
  )

  return (
    <div className={styles.certOverlay} onClick={onClose}>
      <div className={styles.certModal} onClick={e => e.stopPropagation()}>
        {confetti.map(c => (
          <div
            key={c.id}
            className={styles.confetti}
            style={{
              '--conf-color': c.color,
              '--conf-duration': c.duration,
              '--conf-delay': c.delay,
              '--conf-size': c.size,
              '--conf-radius': c.radius,
              left: c.left,
            }}
          />
        ))}
        <div className={styles.certGlow} style={{ '--path-accent': path.accentColor }} />
        <div className={styles.certPathEmoji}>{path.emoji}</div>
        <div className={styles.certIcon}>🎓</div>
        <h2 className={styles.certTitle}>Itinerari completat!</h2>
        <p className={styles.certName}>{path.title}</p>
        <div className={styles.certStats}>
          <span>{path.modules.length} mòduls</span>
          <span className={styles.certDot}>·</span>
          <span>{path.durationEstimate}</span>
        </div>
        <button
          className={styles.certBtn}
          style={{ background: path.accentColor }}
          onClick={onClose}
        >
          Continua aprenent →
        </button>
      </div>
    </div>
  )
}

export default function LearningPathDetail() {
  const navigate = useNavigate()
  const { navigationState, setNavigationState, completedModules, favorites, toggleFavorite, checkBadges } = useApp()
  const [loading, setLoading] = useState(null)
  const [showCert, setShowCert] = useState(false)

  const path = getPathById(navigationState.currentPathId)

  const completedCount = path ? path.modules.filter(m => completedModules.includes(m.id)).length : 0
  const pct = path?.modules.length > 0 ? Math.round((completedCount / path.modules.length) * 100) : 0
  const nextModule = path?.modules.find(m => !completedModules.includes(m.id))

  useEffect(() => {
    if (path && pct === 100) {
      setShowCert(true)
      checkBadges({ type: 'path_complete', data: { pathId: path.id } })
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  if (!path) {
    return (
      <div className={styles.center}>
        <p>Itinerari no trobat.</p>
        <button onClick={() => navigate('/')}>Tornar a l'inici</button>
      </div>
    )
  }

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
      {showCert && <PathCertificate path={path} onClose={() => setShowCert(false)} />}

      <header className={styles.header}>
        <button className={styles.back} onClick={() => navigate('/')}>← Tornar</button>
        <button
          className={styles.favBtn}
          onClick={() => toggleFavorite(path.id)}
          title={(favorites || []).includes(path.id) ? 'Treu de favorits' : 'Afegeix a favorits'}
        >
          {(favorites || []).includes(path.id) ? '⭐' : '☆'}
        </button>
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
