import { getLevel, levelOrder, levelRangeLabel, lowestLevel, highestLevel } from '../../data/levels'
import styles from './LevelBadge.module.css'

/**
 * Indicador de profunditat: tres traços, els omplerts marquen el nivell.
 * - `level`: un sol nivell ("intermedi")
 * - `levels`: abast d'un mòdul (["inicial","avancat"]) → "Inicial → Avançat"
 *
 * Mai comunica bloqueig: informa de què demana el text al lector.
 */
export default function LevelBadge({ level, levels, showLabel = true, className = '' }) {
  const range = Array.isArray(levels) && levels.length > 0
  const single = range ? null : getLevel(level)
  const filled = range ? levelOrder(highestLevel(levels)) : levelOrder(level)
  const from   = range ? levelOrder(lowestLevel(levels)) : filled

  const label = range ? levelRangeLabel(levels) : single.label
  const title = range
    ? `Cobreix de ${label.toLowerCase()}`
    : `${single.label} — ${single.demands}`

  return (
    <span className={`${styles.badge} ${className}`} title={title}>
      <span className={styles.meter} aria-hidden="true">
        {[1, 2, 3].map(i => (
          <span
            key={i}
            className={`${styles.tick} ${i <= filled ? styles.on : ''} ${i < from ? styles.dim : ''}`}
          />
        ))}
      </span>
      {showLabel && <span className={styles.label}>{label}</span>}
    </span>
  )
}
