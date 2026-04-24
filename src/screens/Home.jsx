import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { calculateLevel, getLevelTitle } from '../engine/xpEngine'
import styles from './Home.module.css'

export default function Home() {
  const navigate = useNavigate()
  const { xp, badges, navigationState } = useApp()

  const { level, xpInLevel, xpForNext, progress } = calculateLevel(xp)
  const title = getLevelTitle(level)
  const hasActiveSession = navigationState.currentModuleId !== null

  return (
    <div className={styles.screen}>
      <header className={styles.header}>
        <div className={styles.logo}>🌌</div>
        <h1 className={styles.appName}>Acadèmia Còsmica</h1>
        <p className={styles.subtitle}>Aprèn a pensar com un científic</p>
      </header>

      {/* Targeta de perfil */}
      <div className={styles.profileCard}>
        <div className={styles.profileTop}>
          <div>
            <div className={styles.levelLabel}>Nivell {level}</div>
            <div className={styles.levelTitle}>{title}</div>
          </div>
          <div className={styles.xpBadge}>
            <span className={styles.xpValue}>{xp}</span>
            <span className={styles.xpLabel}>XP</span>
          </div>
        </div>

        {/* Barra de progrés XP */}
        <div className={styles.xpBarTrack}>
          <div
            className={styles.xpBarFill}
            style={{ width: `${progress * 100}%` }}
          />
        </div>
        <div className={styles.xpHint}>{xpInLevel} / {xpForNext} XP per al proper nivell</div>
      </div>

      {/* Accions principals */}
      <div className={styles.actions}>
        {hasActiveSession ? (
          <button
            className={`${styles.btn} ${styles.btnPrimary}`}
            onClick={() => navigate('/lesson')}
          >
            🚀 Continua la missió
          </button>
        ) : null}

        <button
          className={`${styles.btn} ${hasActiveSession ? styles.btnGhost : styles.btnPrimary}`}
          onClick={() => navigate('/modules')}
        >
          🗺️ Mapa de missions
        </button>
      </div>

      {/* Insígnies recents */}
      {badges.length > 0 && (
        <div className={styles.badgesSection}>
          <h3 className={styles.sectionTitle}>Insígnies</h3>
          <div className={styles.badgeList}>
            {badges.slice(-3).map(id => (
              <div key={id} className={styles.badge}>🏆</div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
