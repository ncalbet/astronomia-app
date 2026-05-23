import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { calculateLevel } from '../engine/xpEngine'
import { AREAS, getAreaModules } from '../data/areaRegistry'
import { MODULE_REGISTRY } from '../data/moduleRegistry'
import { MICROCAPSULES } from '../data/microcapsules'
import { LEARNING_PATHS } from '../data/learningPaths'
import styles from './Stats.module.css'

const TOTAL_MODULES = MODULE_REGISTRY.length
const TOTAL_CAPSULES = MICROCAPSULES.length

export default function Stats() {
  const navigate = useNavigate()
  const {
    xp, completedModules, completedCapsules, completedItineraries,
    badges, srStreak, srStreakMax,
    weekXP, weekModules, weekReviews, weekStart
  } = useApp()

  const { level, xpInLevel, xpForNext, progress } = calculateLevel(xp)

  const estimatedMinutes = completedModules.reduce((acc, id) => {
    // ~15 min per mòdul en mitja (aproximació)
    return acc + 15
  }, 0)
  const hours = Math.floor(estimatedMinutes / 60)
  const mins  = estimatedMinutes % 60

  const completedPaths = LEARNING_PATHS.filter(p =>
    p.modules.every(m => completedModules.includes(m.id))
  ).length

  const registryIds = new Set(MODULE_REGISTRY.map(m => m.id))

  const areaStats = AREAS.map(area => {
    const mods = getAreaModules(area).filter(id => registryIds.has(id))
    const done = mods.filter(id => completedModules.includes(id)).length
    return { area, done, total: mods.length, pct: mods.length > 0 ? Math.round((done / mods.length) * 100) : 0 }
  })

  const weekLabel = weekStart
    ? new Date(weekStart).toLocaleDateString('ca-ES', { day: 'numeric', month: 'short' })
    : '—'

  return (
    <div className={styles.screen}>
      <header className={styles.header}>
        <button className={styles.back} onClick={() => navigate('/')}>← Tornar</button>
        <h1 className={styles.title}>📊 Estadístiques</h1>
      </header>

      {/* Nivell i XP */}
      <div className={styles.card}>
        <div className={styles.cardRow}>
          <div className={styles.stat}>
            <div className={styles.statValue}>{level}</div>
            <div className={styles.statLabel}>Nivell</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statValue}>{xp.toLocaleString('ca-ES')}</div>
            <div className={styles.statLabel}>XP totals</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statValue}>{hours > 0 ? `${hours}h ${mins}m` : `${mins}m`}</div>
            <div className={styles.statLabel}>Estudi est.</div>
          </div>
        </div>
        <div className={styles.xpBar}>
          <div className={styles.xpFill} style={{ width: `${progress * 100}%` }} />
        </div>
        <div className={styles.xpHint}>{xpInLevel} / {xpForNext} XP fins al nivell {level + 1}</div>
      </div>

      {/* Mòduls i contingut */}
      <div className={styles.card}>
        <div className={styles.cardRow}>
          <div className={styles.stat}>
            <div className={styles.statValue}>{completedModules.length}<span className={styles.statOf}>/{TOTAL_MODULES}</span></div>
            <div className={styles.statLabel}>Mòduls</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statValue}>{(completedCapsules || []).length}<span className={styles.statOf}>/{TOTAL_CAPSULES}</span></div>
            <div className={styles.statLabel}>Càpsules</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statValue}>{completedPaths}<span className={styles.statOf}>/{LEARNING_PATHS.length}</span></div>
            <div className={styles.statLabel}>Itineraris</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statValue}>{badges.length}</div>
            <div className={styles.statLabel}>Insígnies</div>
          </div>
        </div>
      </div>

      {/* Streak */}
      <div className={styles.card}>
        <div className={styles.cardRow}>
          <div className={styles.stat}>
            <div className={`${styles.statValue} ${styles.fire}`}>🔥 {srStreak}</div>
            <div className={styles.statLabel}>Streak actual</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statValue}>{srStreakMax || 0}</div>
            <div className={styles.statLabel}>Millor streak</div>
          </div>
        </div>
      </div>

      {/* Setmana en curs */}
      <div className={styles.card}>
        <div className={styles.cardTitle}>Setmana des del {weekLabel}</div>
        <div className={styles.cardRow}>
          <div className={styles.stat}>
            <div className={styles.statValue}>{weekXP || 0}</div>
            <div className={styles.statLabel}>XP guanyats</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statValue}>{weekModules || 0}</div>
            <div className={styles.statLabel}>Mòduls</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statValue}>{weekReviews || 0}</div>
            <div className={styles.statLabel}>Repassos</div>
          </div>
        </div>
      </div>

      {/* Per àrea */}
      <div className={styles.card}>
        <div className={styles.cardTitle}>Progrés per àrea</div>
        {areaStats.map(({ area, done, total, pct }) => (
          <div key={area.id} className={styles.areaRow}>
            <div className={styles.areaLeft}>
              <span className={styles.areaEmoji}>{area.emoji}</span>
              <span className={styles.areaName}>{area.label}</span>
            </div>
            <div className={styles.areaRight}>
              <div className={styles.areaTrack}>
                <div
                  className={styles.areaFill}
                  style={{ width: `${pct}%`, '--area-color': area.accentColor }}
                />
              </div>
              <span className={styles.areaPct}>{done}/{total}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
