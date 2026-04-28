import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { useTheme } from '../context/ThemeContext'
import { loadModule } from '../data/moduleRegistry'
import { useModuleProgress } from '../hooks/useModuleProgress'
import styles from './ItinerarySelector.module.css'

/**
 * Indicador de progrés per a un itinerari concret
 */
function ItineraryProgress({ moduleId, itineraryId, lessons, completedLessons }) {
  const completed = lessons.filter(l =>
    completedLessons.includes(`${moduleId}__${itineraryId}__${l.id}`)
  ).length
  const total   = lessons.length
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0
  const isDone  = completed === total

  if (completed === 0) return (
    <div className={styles.progressMeta}>{total} lliçons</div>
  )

  return (
    <div className={styles.progressWrapper}>
      <div className={styles.progressMeta}>
        {isDone ? 'Completat' : `${completed}/${total} lliçons`}
        {!isDone && <span className={styles.percentTag}>{percent}%</span>}
      </div>
      <div className={styles.progressTrack}>
        <div
          className={`${styles.progressFill} ${isDone ? styles.progressDone : ''}`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  )
}

export default function ItinerarySelector() {
  const navigate = useNavigate()
  const { navigationState, setNavigationState, isItineraryCompleted, completedLessons } = useApp()
  const { theme } = useTheme()

  const [moduleData, setModuleData] = useState(null)
  const [loading, setLoading]       = useState(true)
  const [error, setError]           = useState(null)

  const { currentModuleId } = navigationState

  useEffect(() => {
    if (!currentModuleId) { navigate('/modules'); return }
    setLoading(true)
    loadModule(currentModuleId)
      .then(data => { setModuleData(data); setLoading(false) })
      .catch(() => { setError('No s\'ha pogut carregar el mòdul.'); setLoading(false) })
  }, [currentModuleId])

  if (loading) return (
    <div className={styles.loading}><span>⏳</span><p>Carregant...</p></div>
  )

  if (error || !moduleData) return (
    <div className={styles.loading}>
      <p style={{ color: 'var(--color-danger)' }}>{error}</p>
      <button onClick={() => navigate('/modules')}>Tornar</button>
    </div>
  )

  const handleSelect = (itineraryId) => {
    setNavigationState({ currentItineraryId: itineraryId, currentLessonId: null, currentStep: 0 })
    navigate('/lesson')
  }

  // Progrés global del mòdul (per mostrar a la capçalera)
  const allLessons = moduleData.itineraries.flatMap(it =>
    it.lessons.map(l => `${currentModuleId}__${it.id}__${l.id}`)
  )
  const totalCompleted = allLessons.filter(k => completedLessons.includes(k)).length
  const totalLessons   = allLessons.length
  const globalPercent  = totalLessons > 0 ? Math.round((totalCompleted / totalLessons) * 100) : 0

  return (
    <div className={styles.screen}>
      <header className={styles.header}>
        <button className={styles.back} onClick={() => navigate('/modules')}>
          ← {theme.missionWord}s
        </button>
      </header>

      <div className={styles.intro}>
        <div className={styles.moduleEmoji}>{moduleData.emoji || '🔭'}</div>
        <h1 className={styles.title}>{moduleData.title}</h1>
        <p className={styles.subtitle}>Escull com vols explorar aquest tema</p>

        {/* Progrés global del mòdul */}
        {totalCompleted > 0 && (
          <div className={styles.globalProgress}>
            <div className={styles.globalProgressBar}>
              <div
                className={styles.globalProgressFill}
                style={{ width: `${globalPercent}%` }}
              />
            </div>
            <span className={styles.globalProgressLabel}>
              {totalCompleted}/{totalLessons} lliçons completades
            </span>
          </div>
        )}
      </div>

      <div className={styles.itineraries}>
        {moduleData.itineraries.map((itin) => {
          const completed = isItineraryCompleted(currentModuleId, itin.id)
          return (
            <button
              key={itin.id}
              className={`${styles.card} ${completed ? styles.completed : ''}`}
              onClick={() => handleSelect(itin.id)}
            >
              <div className={styles.cardTop}>
                <span className={styles.cardIcon}>{itin.icon}</span>
                {completed && <span className={styles.completedBadge}>✓ Completat</span>}
              </div>
              <h2 className={styles.cardTitle}>{itin.title}</h2>
              <p className={styles.cardDesc}>{itin.description}</p>
              <div className={styles.cardMeta}>{itin.style}</div>

              {/* Indicador de progrés per itinerari */}
              <ItineraryProgress
                moduleId={currentModuleId}
                itineraryId={itin.id}
                lessons={itin.lessons}
                completedLessons={completedLessons}
              />

              <div className={styles.cardCta}>
                {completed ? 'Repetir itinerari →' : 'Començar →'}
              </div>
            </button>
          )
        })}
      </div>

      <p className={styles.hint}>
        Pots completar els dos itineraris — el progrés es guarda per separat
      </p>
    </div>
  )
}
