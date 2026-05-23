import { useApp } from '../../context/AppContext'
import styles from './WeeklySummary.module.css'

export default function WeeklySummary() {
  const { prevWeekSnapshot, weekSummaryShown, markWeekSummaryShown } = useApp()

  if (weekSummaryShown || !prevWeekSnapshot) return null

  const { xp, modules, reviews } = prevWeekSnapshot
  const weekDate = prevWeekSnapshot.weekStart
    ? new Date(prevWeekSnapshot.weekStart).toLocaleDateString('ca-ES', { day: 'numeric', month: 'short' })
    : ''

  const getMessage = () => {
    if (modules >= 3) return '🚀 Setmana excepcional!'
    if (modules >= 1 && xp >= 100) return '⭐ Bona feina la setmana passada!'
    if (xp > 0) return '💪 Vas per bon camí. Segueix!'
    return '🌱 Una nova setmana per aprendre!'
  }

  return (
    <div className={styles.overlay} onClick={markWeekSummaryShown}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <div className={styles.weekLabel}>Setmana del {weekDate}</div>
        <div className={styles.message}>{getMessage()}</div>

        <div className={styles.stats}>
          <div className={styles.stat}>
            <div className={styles.statValue}>{xp}</div>
            <div className={styles.statLabel}>XP guanyats</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statValue}>{modules}</div>
            <div className={styles.statLabel}>Mòduls</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statValue}>{reviews}</div>
            <div className={styles.statLabel}>Repassos</div>
          </div>
        </div>

        <button className={styles.closeBtn} onClick={markWeekSummaryShown}>
          Comença la nova setmana →
        </button>
      </div>
    </div>
  )
}
