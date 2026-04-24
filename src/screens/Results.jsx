import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { calculateLevel, getLevelTitle } from '../engine/xpEngine'
import { getUnlocksForModule } from '../engine/unlockEngine'
import styles from './Results.module.css'

export default function Results() {
  const navigate = useNavigate()
  const {
    xp, navigationState, completeModule,
    unlockModule, setNavigationState
  } = useApp()

  const [shown, setShown] = useState(false)
  const { currentModuleId } = navigationState
  const { level, progress } = calculateLevel(xp)

  useEffect(() => {
    if (!currentModuleId) { navigate('/'); return }

    // Completa el mòdul i desbloqueja els següents
    completeModule(currentModuleId)
    const unlocks = getUnlocksForModule(currentModuleId)
    unlocks.forEach(id => unlockModule(id))

    // Animació d'entrada
    const t = setTimeout(() => setShown(true), 100)
    return () => clearTimeout(t)
  }, [])

  const handleContinue = () => {
    setNavigationState({ currentModuleId: null, currentLessonId: null, currentStep: 0 })
    navigate('/modules')
  }

  return (
    <div className={`${styles.screen} ${shown ? styles.visible : ''}`}>
      <div className={styles.celebration}>🎉</div>

      <h1 className={styles.title}>Missió completada</h1>
      <p className={styles.subtitle}>Has reconstruït un nou fragment del coneixement</p>

      {/* Stats */}
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
          <div className={styles.statValue}>{getLevelTitle(level)}</div>
          <div className={styles.statLabel}>Rang</div>
        </div>
      </div>

      {/* Barra XP */}
      <div className={styles.xpSection}>
        <div className={styles.xpBarTrack}>
          <div className={styles.xpBarFill} style={{ width: `${progress * 100}%` }} />
        </div>
        <p className={styles.xpHint}>Progrés cap al proper nivell</p>
      </div>

      <button className={styles.continueBtn} onClick={handleContinue}>
        Continua explorant →
      </button>
    </div>
  )
}
