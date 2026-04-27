import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { useTheme } from '../context/ThemeContext'
import { calculateLevel } from '../engine/xpEngine'
import { BADGES } from '../engine/badgeEngine'
import styles from './Home.module.css'

function BadgeDetail({ badgeId, onClose }) {
  const badge = BADGES[badgeId]
  if (!badge) return null
  return (
    <div className={styles.badgeOverlay} onClick={onClose}>
      <div className={styles.badgePopup} onClick={e => e.stopPropagation()}>
        <div className={styles.badgePopupEmoji}>{badge.emoji}</div>
        <div className={styles.badgePopupName}>{badge.name}</div>
        <div className={styles.badgePopupDesc}>{badge.description}</div>
        <div className={`${styles.badgePopupRarity} ${styles[badge.rarity]}`}>
          {badge.rarity}
        </div>
        <button className={styles.badgePopupClose} onClick={onClose}>Tancar</button>
      </div>
    </div>
  )
}

export default function Home() {
  const navigate = useNavigate()
  const { xp, badges, navigationState } = useApp()
  const { theme } = useTheme()
  const [selectedBadge, setSelectedBadge] = useState(null)

  const { level, xpInLevel, xpForNext, progress } = calculateLevel(xp)
  const levelTitle = theme.levelTitles[String(level)]
    || theme.levelTitles[String(Math.min(level, 10))]
    || theme.userRole

  const hasActiveSession = navigationState.currentModuleId !== null

  return (
    <div className={styles.screen}>
      {selectedBadge && (
        <BadgeDetail badgeId={selectedBadge} onClose={() => setSelectedBadge(null)} />
      )}

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
          <button className={`${styles.btn} ${styles.btnPrimary}`} onClick={() => navigate('/lesson')}>
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
          <div className={styles.badgesHeader}>
            <h3 className={styles.sectionTitle}>Insígnies</h3>
            <span className={styles.badgeCount}>{badges.length}</span>
          </div>
          <div className={styles.badgeList}>
            {badges.map(id => {
              const badge = BADGES[id]
              if (!badge) return null
              return (
                <button
                  key={id}
                  className={`${styles.badge} ${styles[badge.rarity]}`}
                  onClick={() => setSelectedBadge(id)}
                  title={badge.name}
                >
                  <span className={styles.badgeEmoji}>{badge.emoji}</span>
                  <span className={styles.badgeName}>{badge.name}</span>
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
