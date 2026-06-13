import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { useTheme } from '../context/ThemeContext'
import { calculateLevel } from '../engine/xpEngine'
import { BADGES } from '../engine/badgeEngine'
import { countDueToday } from '../engine/spacedRepetitionEngine'
import { AREAS, getAreaModules } from '../data/areaRegistry'
import { getModuleMeta } from '../data/moduleRegistry'
import { LEARNING_PATHS } from '../data/learningPaths'
import { getDailyCapsule, getCapsuleById } from '../data/microcapsules'
import { getWeekChallenges, getChallengeProgress } from '../engine/weeklyChallenge'
import WeeklySummary from '../components/ui/WeeklySummary'
import styles from './Home.module.css'

function getDailyArea(completedModules) {
  const available = AREAS.filter(area =>
    getAreaModules(area).some(id => !completedModules.includes(id))
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
          completedModules, setNavigationState,
          fontSize, setFontSize, favorites, weekStart,
          weekXP, weekModules, weekReviews, completedCapsules } = useApp()
  const { theme, colorScheme, toggleColorScheme } = useTheme()
  const [selectedBadge, setSelectedBadge] = useState(null)
  const dueCount = countDueToday(srData)

  const today = new Date().toISOString().split('T')[0]
  const reviewedToday = srLastReviewDate === today

  const discoveryArea = getDailyArea(completedModules)
  const discoveryCount = discoveryArea
    ? getAreaModules(discoveryArea).filter(id => !completedModules.includes(id)).length
    : 0

  const { level, xpInLevel, xpForNext, progress } = calculateLevel(xp)
  const levelTitle = theme.levelTitles[String(level)]
    || theme.levelTitles[String(Math.min(level, 10))]
    || theme.userRole

  const activeModuleMeta = navigationState.currentModuleId
    ? getModuleMeta(navigationState.currentModuleId)
    : null

  const areasProgress = AREAS.map(area => {
    const ids = getAreaModules(area)
    const done = ids.filter(id => completedModules.includes(id)).length
    return { area, done, total: ids.length }
  }).filter(a => a.total > 0)

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

  const goToArea = (areaId) => {
    setNavigationState({ currentAreaId: areaId })
    navigate('/modules')
  }

  return (
    <div className={styles.screen}>
      <WeeklySummary />

      {selectedBadge && (
        <BadgeDetail badgeId={selectedBadge} onClose={() => setSelectedBadge(null)} />
      )}

      <header className={styles.header}>
        <div className={styles.headerTop}>
          <h1 className={styles.appName}>{theme.appName}</h1>
          <div className={styles.headerActions}>
            <button className={styles.iconBtn} onClick={() => navigate('/search')} title="Cerca">🔍</button>
            <button className={styles.iconBtn} onClick={toggleColorScheme} title={colorScheme === 'dark' ? 'Mode diürn' : 'Mode nocturn'}>
              {colorScheme === 'dark' ? '☀️' : '🌙'}
            </button>
            <button className={styles.iconBtn} onClick={() => navigate('/profile')} title="El meu perfil">👤</button>
            <div className={styles.fontToggle}>
              {['small','medium','large'].map(size => (
                <button
                  key={size}
                  className={`${styles.fontBtn} ${fontSize === size ? styles.fontActive : ''}`}
                  onClick={() => setFontSize(size)}
                  title={size === 'small' ? 'Text petit' : size === 'large' ? 'Text gran' : 'Text normal'}
                >
                  A
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className={styles.headerMeta}>
          <span className={styles.levelInline}>Nivell {level} · {levelTitle}</span>
          <span className={styles.xpInline}>{xp} XP</span>
        </div>
        <div className={styles.xpBarTrack}>
          <div className={styles.xpBarFill} style={{ width: `${progress * 100}%` }} />
        </div>
      </header>

      {/* Continua on eres */}
      {activeModuleMeta && (
        <button className={styles.continueCard} onClick={() => navigate('/lesson')}>
          <div className={styles.cardKicker}>Continua on eres</div>
          <div className={styles.continueBody}>
            <span className={styles.continueEmoji}>{activeModuleMeta.emoji}</span>
            <span className={styles.continueTitle}>{activeModuleMeta.title}</span>
            <span className={styles.continueArrow}>→</span>
          </div>
        </button>
      )}

      {/* Repàs d'avui */}
      <div className={styles.reviewCard}>
        <div className={styles.cardKicker}>Repàs d'avui</div>
        {dueCount > 0 ? (
          <>
            <p className={styles.reviewText}>
              Tens <strong>{dueCount}</strong> {dueCount === 1 ? 'concepte' : 'conceptes'} a punt per repassar.
              {srStreak > 0 && !reviewedToday && ` Mantén la ratxa de ${srStreak} dies.`}
            </p>
            <div className={styles.reviewActions}>
              <button className={styles.reviewBtn} onClick={() => navigate('/review')}>
                Comença el repàs
              </button>
              {dueCount > 5 && (
                <button className={styles.reviewQuick} onClick={() => navigate('/review?quick=1')}>
                  Sessió ràpida · 5 min
                </button>
              )}
            </div>
          </>
        ) : (
          <p className={styles.reviewText}>
            {reviewedToday
              ? `Repàs completat. ${srStreak > 0 ? `Ratxa: ${srStreak} ${srStreak === 1 ? 'dia' : 'dies'}.` : ''}`
              : 'Res pendent per avui. Aprèn alguna cosa nova.'}
          </p>
        )}
      </div>

      {/* Progrés per àrea */}
      <section className={styles.areasSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>El teu mapa</h2>
          <button className={styles.sectionLink} onClick={() => navigate('/areas')}>
            Veure-ho tot →
          </button>
        </div>
        <div className={styles.areaList}>
          {areasProgress.map(({ area, done, total }) => (
            <button
              key={area.id}
              className={styles.areaRow}
              style={{ '--area-accent': area.accentColor }}
              onClick={() => goToArea(area.id)}
            >
              <span className={styles.areaEmoji}>{area.emoji}</span>
              <div className={styles.areaInfo}>
                <div className={styles.areaName}>{area.label}</div>
                <div className={styles.areaBar}>
                  <div
                    className={styles.areaFill}
                    style={{ width: total > 0 ? `${(done / total) * 100}%` : 0 }}
                  />
                </div>
              </div>
              <span className={styles.areaCount}>{done}/{total}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Descoberta del dia */}
      {discoveryArea && (
        <button className={styles.discoveryCard} onClick={() => goToArea(discoveryArea.id)}>
          <div className={styles.cardKicker}>Descoberta del dia</div>
          <div className={styles.discoveryBody}>
            <span className={styles.discoveryEmoji}>{discoveryArea.emoji}</span>
            <div className={styles.discoveryInfo}>
              <div className={styles.discoveryTitle}>{discoveryArea.label}</div>
              <div className={styles.discoveryDesc}>{discoveryArea.description}</div>
              <div className={styles.discoveryCount}>
                {discoveryCount} mòdul{discoveryCount !== 1 ? 's' : ''} per explorar
              </div>
            </div>
            <span className={styles.continueArrow}>→</span>
          </div>
        </button>
      )}

      {/* Càpsula del dia */}
      {dailyCapsule && (
        <div className={styles.capsuleCard}>
          <div className={styles.cardKicker}>Càpsula del dia · {dailyCapsule.duration} min</div>
          <div className={styles.capsuleBody}>
            <span className={styles.capsuleEmoji}>{dailyCapsule.emoji}</span>
            <div className={styles.capsuleTitle}>{dailyCapsule.title}</div>
          </div>
          <div className={styles.capsuleActions}>
            <button
              className={styles.capsuleBtn}
              onClick={() => {
                setNavigationState({ currentCapsuleId: dailyCapsule.id })
                navigate('/capsule')
              }}
            >
              Comença
            </button>
            <button className={styles.capsuleAll} onClick={() => navigate('/capsules')}>
              Totes les càpsules
            </button>
          </div>
        </div>
      )}

      {/* Itineraris d'aprenentatge */}
      <section className={styles.pathsSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Itineraris</h2>
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
      </section>

      {/* Reptes setmanals */}
      <section className={styles.challengesSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Reptes de la setmana</h2>
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
      </section>

      {/* Favorits */}
      {(favoritePaths.length > 0 || favoriteCapsules.length > 0) && (
        <section className={styles.favoritesSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Favorits</h2>
          </div>
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
        </section>
      )}

      {/* Insígnies */}
      {badges.length > 0 && (
        <section className={styles.badgesSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Insígnies</h2>
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
        </section>
      )}

      <div className={styles.actions}>
        <button className={styles.actionGhost} onClick={() => navigate('/glossary')}>
          Glossari de termes
        </button>
      </div>
    </div>
  )
}
