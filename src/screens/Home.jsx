import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { useTheme } from '../context/ThemeContext'
import { calculateLevel } from '../engine/xpEngine'
import { BADGES } from '../engine/badgeEngine'
import { countDueToday } from '../engine/spacedRepetitionEngine'
import { AREAS, getAreaModules } from '../data/areaRegistry'
import { LEARNING_PATHS } from '../data/learningPaths'
import { getDailyCapsule, getCapsuleById } from '../data/microcapsules'
import { getWeekChallenges, getChallengeProgress } from '../engine/weeklyChallenge'
import WeeklySummary from '../components/ui/WeeklySummary'
import styles from './Home.module.css'

function getDailyArea(unlockedModules, completedModules) {
  const available = AREAS.filter(area =>
    getAreaModules(area).some(id => unlockedModules.includes(id) && !completedModules.includes(id))
  )
  if (available.length === 0) return null
  const today = new Date().toISOString().split('T')[0]
  const seed = today.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0)
  return available[seed % available.length]
}

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
  const { xp, badges, navigationState, srData, srStreak, srLastReviewDate,
          completedModules, unlockedModules, setNavigationState,
          fontSize, setFontSize, favorites, weekStart,
          weekXP, weekModules, weekReviews, completedCapsules } = useApp()
  const { theme } = useTheme()
  const [selectedBadge, setSelectedBadge] = useState(null)
  const dueCount = countDueToday(srData)

  const today = new Date().toISOString().split('T')[0]
  const reviewedToday = srLastReviewDate === today

  const discoveryArea = getDailyArea(unlockedModules, completedModules)
  const discoveryCount = discoveryArea
    ? getAreaModules(discoveryArea).filter(id => unlockedModules.includes(id) && !completedModules.includes(id)).length
    : 0

  const { level, xpInLevel, xpForNext, progress } = calculateLevel(xp)
  const levelTitle = theme.levelTitles[String(level)]
    || theme.levelTitles[String(Math.min(level, 10))]
    || theme.userRole

  const hasActiveSession = navigationState.currentModuleId !== null

  const pathsWithProgress = LEARNING_PATHS.map(path => {
    const done = path.modules.filter(m => completedModules.includes(m.id)).length
    return { path, done, total: path.modules.length }
  })

  const dailyCapsule = getDailyCapsule()

  const weekChallenges = getWeekChallenges(weekStart)
  const challengeState = { weekXP, weekModules, weekReviews, completedModules, completedCapsules }

  const favoriteCapsules = (favorites || [])
    .map(id => getCapsuleById(id))
    .filter(Boolean)

  const favoritePaths = (favorites || [])
    .map(id => LEARNING_PATHS.find(p => p.id === id))
    .filter(Boolean)

  return (
    <div className={styles.screen}>
      <WeeklySummary />

      {selectedBadge && (
        <BadgeDetail badgeId={selectedBadge} onClose={() => setSelectedBadge(null)} />
      )}

      <header className={styles.header}>
        <div className={styles.headerTop}>
          <div className={styles.logo}>🌌</div>
          <div className={styles.headerActions}>
            <button className={styles.searchBtn} onClick={() => navigate('/search')} title="Cerca">🔍</button>
            <button className={styles.statsBtn} onClick={() => navigate('/stats')} title="Estadístiques">📊</button>
            <div className={styles.fontToggle}>
            {['small','medium','large'].map(size => (
              <button
                key={size}
                className={`${styles.fontBtn} ${fontSize === size ? styles.fontActive : ''}`}
                onClick={() => setFontSize(size)}
                title={size === 'small' ? 'Text petit' : size === 'large' ? 'Text gran' : 'Text normal'}
              >
                {size === 'small' ? 'A' : size === 'medium' ? 'A' : 'A'}
              </button>
            ))}
            </div>
          </div>
        </div>
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

      <div className={`${styles.streakStrip} ${srStreak > 0 ? (reviewedToday ? styles.streakDone : styles.streakPending) : styles.streakEmpty}`}>
        {srStreak > 0 ? (
          <>
            <span className={styles.streakFire}>🔥</span>
            <span className={styles.streakCount}>{srStreak}</span>
            <span className={styles.streakLabel}>
              {reviewedToday
                ? 'dies · Repàs completat avui'
                : 'dies · Fes el repàs per mantenir-ho'}
            </span>
          </>
        ) : (
          <span className={styles.streakLabel}>Comença el teu repàs diari</span>
        )}
      </div>

      {discoveryArea && (
        <div className={styles.discoveryCard}>
          <div className={styles.discoveryLabel}>Descoberta del dia</div>
          <div className={styles.discoveryBody}>
            <span className={styles.discoveryEmoji}>{discoveryArea.emoji}</span>
            <div className={styles.discoveryInfo}>
              <div className={styles.discoveryTitle}>{discoveryArea.label}</div>
              <div className={styles.discoveryDesc}>{discoveryArea.description}</div>
              <div className={styles.discoveryCount}>
                {discoveryCount} mòdul{discoveryCount !== 1 ? 's' : ''} per explorar
              </div>
            </div>
          </div>
          <button
            className={styles.discoveryBtn}
            onClick={() => {
              setNavigationState({ currentAreaId: discoveryArea.id })
              navigate('/modules')
            }}
          >
            Explorar →
          </button>
        </div>
      )}

      {/* Càpsula del dia */}
      {dailyCapsule && (
        <div className={styles.capsuleCard}>
          <div className={styles.capsuleLabel}>⚡ Càpsula del dia · {dailyCapsule.duration} min</div>
          <div className={styles.capsuleBody}>
            <span className={styles.capsuleEmoji}>{dailyCapsule.emoji}</span>
            <div className={styles.capsuleInfo}>
              <div className={styles.capsuleTitle}>{dailyCapsule.title}</div>
            </div>
          </div>
          <div className={styles.capsuleActions}>
            <button
              className={styles.capsuleBtn}
              onClick={() => {
                setNavigationState({ currentCapsuleId: dailyCapsule.id })
                navigate('/capsule')
              }}
            >
              Comença →
            </button>
            <button
              className={styles.capsuleAll}
              onClick={() => navigate('/capsules')}
            >
              Totes les càpsules
            </button>
          </div>
        </div>
      )}

      {/* Itineraris d'aprenentatge */}
      <div className={styles.pathsSection}>
        <div className={styles.pathsHeader}>
          <h3 className={styles.sectionTitle}>Itineraris</h3>
        </div>
        <div className={styles.pathsScroll}>
          {pathsWithProgress.map(({ path, done, total }) => {
            const pct = total > 0 ? Math.round((done / total) * 100) : 0
            return (
              <button
                key={path.id}
                className={styles.pathCard}
                style={{ '--path-accent': path.accentColor }}
                onClick={() => {
                  setNavigationState({ currentPathId: path.id })
                  navigate('/path')
                }}
              >
                <span className={styles.pathEmoji}>{path.emoji}</span>
                <div className={styles.pathTitle}>{path.title}</div>
                <div className={styles.pathProgress}>
                  <div className={styles.pathTrack}>
                    <div className={styles.pathFill} style={{ width: `${pct}%` }} />
                  </div>
                  <span className={styles.pathCount}>{done}/{total}</span>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Reptes setmanals */}
      <div className={styles.challengesSection}>
        <div className={styles.challengesHeader}>
          <h3 className={styles.sectionTitle}>Reptes de la setmana</h3>
        </div>
        <div className={styles.challengesList}>
          {weekChallenges.map(ch => {
            const prog = getChallengeProgress(ch, challengeState)
            const done = prog >= ch.target
            const pct  = Math.min(100, Math.round((prog / ch.target) * 100))
            return (
              <div key={ch.id} className={`${styles.challenge} ${done ? styles.challengeDone : ''}`}>
                <span className={styles.challengeEmoji}>{ch.emoji}</span>
                <div className={styles.challengeInfo}>
                  <div className={styles.challengeTitle}>{ch.title}</div>
                  <div className={styles.challengeBar}>
                    <div className={styles.challengeFill} style={{ width: `${pct}%` }} />
                  </div>
                </div>
                <span className={styles.challengeCount}>{prog}/{ch.target}</span>
                {done && <span className={styles.challengeCheck}>✓</span>}
              </div>
            )
          })}
        </div>
      </div>

      {/* Favorits */}
      {(favoritePaths.length > 0 || favoriteCapsules.length > 0) && (
        <div className={styles.favoritesSection}>
          <h3 className={styles.sectionTitle}>⭐ Favorits</h3>
          <div className={styles.favoritesList}>
            {favoritePaths.map(p => (
              <button
                key={p.id}
                className={styles.favItem}
                onClick={() => { setNavigationState({ currentPathId: p.id }); navigate('/path') }}
              >
                <span className={styles.favEmoji}>{p.emoji}</span>
                <span className={styles.favTitle}>{p.title}</span>
              </button>
            ))}
            {favoriteCapsules.map(c => (
              <button
                key={c.id}
                className={styles.favItem}
                onClick={() => { setNavigationState({ currentCapsuleId: c.id }); navigate('/capsule') }}
              >
                <span className={styles.favEmoji}>{c.emoji}</span>
                <span className={styles.favTitle}>{c.title}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className={styles.actions}>
        {dueCount > 5 && (
          <button
            className={`${styles.btn} ${styles.btnQuick}`}
            onClick={() => navigate('/review?quick=1')}
          >
            ⚡ Sessió ràpida · ~5 min
          </button>
        )}
        {dueCount > 0 && (
          <button
            className={`${styles.btn} ${styles.btnReview}`}
            onClick={() => navigate('/review')}
          >
            🔁 Repàs diari
            <span className={styles.reviewBadge}>{dueCount}</span>
          </button>
        )}
        {hasActiveSession && (
          <button className={`${styles.btn} ${styles.btnPrimary}`} onClick={() => navigate('/lesson')}>
            🚀 Continua la {theme.missionWord.toLowerCase()}
          </button>
        )}
        <button
          className={`${styles.btn} ${hasActiveSession ? styles.btnGhost : styles.btnPrimary}`}
          onClick={() => navigate('/areas')}
        >
          🗺️ Mapa de {theme.missionWord.toLowerCase()}s
        </button>
        <button
          className={`${styles.btn} ${styles.btnGhost}`}
          onClick={() => navigate('/glossary')}
        >
          📖 Glossari de termes
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
