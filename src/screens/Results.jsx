import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { useTheme } from '../context/ThemeContext'
import { calculateLevel, getLevelTitle } from '../engine/xpEngine'
import { getUnlocksForModule } from '../engine/unlockEngine'
import { countDueToday } from '../engine/spacedRepetitionEngine'
import { loadModule } from '../data/moduleRegistry'
import { downloadCertificate } from '../engine/certificateEngine'
import { playSuccessSound } from '../engine/soundEngine'
import styles from './Results.module.css'

const CONFETTI_COLORS = ['#4C7DFF', '#6a95ff', '#3DDB84', '#FFB443', '#FF6B6B', '#C084FC', '#F59E0B']
const CONFETTI = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
  left: `${3 + (i * 3.5) % 94}%`,
  duration: `${0.8 + (i * 0.05) % 0.7}s`,
  delay: `${(i * 0.03) % 0.5}s`,
  size: `${6 + (i * 1.4) % 8}px`,
  radius: i % 3 === 0 ? '50%' : '2px',
}))

export default function Results() {
  const navigate = useNavigate()
  const { xp, navigationState, completeModule, unlockModule, setNavigationState, srData } = useApp()
  const { theme } = useTheme()
  const dueCount = countDueToday(srData)

  const [shown, setShown] = useState(false)
  const [moduleTitle, setModuleTitle] = useState('')
  const { currentModuleId, currentItineraryId } = navigationState
  const { level, progress } = calculateLevel(xp)
  const levelTitle = getLevelTitle(level, theme.levelTitles)

  useEffect(() => {
    if (!currentModuleId) { navigate('/'); return }

    if (!currentItineraryId) {
      completeModule(currentModuleId)
      const unlocks = getUnlocksForModule(currentModuleId)
      unlocks.forEach(id => unlockModule(id))
      loadModule(currentModuleId).then(data => setModuleTitle(data.title || '')).catch(() => {})
    }

    const t = setTimeout(() => {
      setShown(true)
      playSuccessSound()
    }, 100)
    return () => clearTimeout(t)
  }, [])

  const handleGoToMap = () => {
    setNavigationState({ currentModuleId: null, currentLessonId: null, currentItineraryId: null, currentStep: 0 })
    navigate('/modules')
  }

  const handleGoHome = () => {
    setNavigationState({ currentModuleId: null, currentLessonId: null, currentItineraryId: null, currentStep: 0 })
    navigate('/')
  }

  const isItinerary = !!currentItineraryId

  return (
    <div className={`${styles.screen} ${shown ? styles.visible : ''}`}>
      {shown && (
        <div className={styles.confettiLayer}>
          {CONFETTI.map(c => (
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
        </div>
      )}

      <div className={styles.celebration}>{isItinerary ? '🎯' : '🎉'}</div>

      <h1 className={styles.title}>
        {isItinerary ? 'Itinerari completat' : `${theme.missionWord} completada`}
      </h1>
      <p className={styles.subtitle}>
        {isItinerary
          ? 'Has completat un dels camins d\'aquest tema'
          : 'Has reconstruït un nou fragment del coneixement'}
      </p>

      <div className={styles.statsCard}>
        <div className={styles.stat}>
          <div className={styles.statValue}>{xp}</div>
          <div className={styles.statLabel}>XP Total</div>
        </div>
        <div className={styles.divider} />
        <div className={styles.stat}>
          <div className={styles.statValue}>{level}</div>
          <div className={styles.statLabel}>Nivell</div>
        </div>
        <div className={styles.divider} />
        <div className={styles.stat}>
          <div className={styles.statValue}>{levelTitle}</div>
          <div className={styles.statLabel}>Rang</div>
        </div>
      </div>

      <div className={styles.xpSection}>
        <div className={styles.xpBarTrack}>
          <div className={styles.xpBarFill} style={{ width: `${progress * 100}%` }} />
        </div>
        <p className={styles.xpHint}>Progrés cap al proper nivell</p>
      </div>

      {dueCount > 0 && (
        <div className={styles.reviewBanner}>
          <span className={styles.reviewBannerIcon}>🔁</span>
          <div className={styles.reviewBannerText}>
            <div className={styles.reviewBannerTitle}>
              {dueCount} exercici{dueCount > 1 ? 's' : ''} per repassar avui
            </div>
            <div className={styles.reviewBannerSub}>Consolida mentre la lliçó és fresca</div>
          </div>
          <button className={styles.reviewBannerBtn} onClick={() => navigate('/review')}>
            Repassar
          </button>
        </div>
      )}

      <div className={styles.actions}>
        <button className={styles.primaryBtn} onClick={handleGoToMap}>
          🗺️ Mapa de {theme.missionWord.toLowerCase()}s
        </button>
        {!isItinerary && moduleTitle && (
          <button
            className={styles.certBtn}
            onClick={() => downloadCertificate(moduleTitle)}
          >
            🎓 Descarrega el certificat
          </button>
        )}
        <button className={styles.secondaryBtn} onClick={handleGoHome}>
          🏠 Tornar a l'inici
        </button>
      </div>
    </div>
  )
}
