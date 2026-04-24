import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { useTheme } from '../context/ThemeContext'
import { calculateLevel } from '../engine/xpEngine'
import styles from './Home.module.css'

export default function Home() {
  const navigate = useNavigate()
  const { xp, badges, navigationState } = useApp()
  const { theme } = useTheme()

  const { level, xpInLevel, xpForNext, progress } = calculateLevel(xp)

  // Títol de nivell del tema (fallback si no existeix el nivell)
  const levelTitle = theme.levelTitles[String(level)]
    || theme.levelTitles[String(Math.min(level, 10))]
    || theme.userRole

  const hasActiveSession = navigationState.currentModuleId !== null

  return (
    <div className={styles.screen}>
      <header className={styles.header}>
        <div className={styles.logo}>🌌</div>
        <h1 className={styles.appName}>{theme.appName}</h1>
        <p className={styles.subtitle}>{theme.description}</p>
      </header>

      <div className={styles.profileCard}>
        <div className={styles.profileTop}>
          <div>
            <div className={styles.levelLabel}>Nivell {level}</div>
            <div className={styles.levelTitle}>{levelTitle}</div>
          </div>
          <div className={styles.xpBadge}>
            <span className={styles.xpValue}>{xp}</span>
            <span className={styles.xpLabel}>XP</span>
          </div>
        </div>

        <div className={styles.xpBarTrack}>
          <div className={styles.xpBarFill} style={{ width: `${progress * 100}%` }} />
        </div>
        <div className={styles.xpHint}>{xpInLevel} / {xpForNext} XP per al proper nivell</div>
      </div>

      <div className={styles.actions}>
        {hasActiveSession && (
          <button
            className={`${styles.btn} ${styles.btnPrimary}`}
            onClick={() => navigate('/lesson')}
          >
            🚀 Continua la {theme.missionWord.toLowerCase()}
          </button>
        )}
        <button
          className={`${styles.btn} ${hasActiveSession ? styles.btnGhost : styles.btnPrimary}`}
          onClick={() => navigate('/modules')}
        >
          🗺️ Mapa de {theme.missionWord.toLowerCase()}s
        </button>
      </div>

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
