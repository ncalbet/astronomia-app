/**
 * BeforeAfterBlock.jsx
 *
 * Contrast visual entre l'estat d'una situació abans i després
 * d'un personatge, event o idea. Ideal per mostrar canvis estructurals
 * de forma ràpida i memorable.
 *
 * Format JSON:
 * {
 *   "type": "before-after",
 *   "title": "Europa abans i després de Bismarck",
 *   "before": {
 *     "label": "Abans (1860)",
 *     "points": ["39 estats alemanys fragmentats", "Prússia i Àustria rivals"]
 *   },
 *   "after": {
 *     "label": "Després (1871)",
 *     "points": ["II Reich unificat", "Alemanya potència dominant d'Europa"]
 *   },
 *   "insight": "El canvi no va ser gradual sinó el resultat de tres guerres planificades."
 * }
 */

import styles from './BeforeAfterBlock.module.css'

export default function BeforeAfterBlock({ block }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.label}>
        <span>⟳</span> Abans i després
      </div>

      {block.title && <p className={styles.title}>{block.title}</p>}

      <div className={styles.columns}>
        <div className={`${styles.column} ${styles.columnBefore}`}>
          <div className={styles.columnHeader}>
            <span className={styles.columnIcon}>◀</span>
            <span className={styles.columnLabel}>{block.before.label}</span>
          </div>
          <ul className={styles.points}>
            {block.before.points.map((pt, i) => (
              <li key={i} className={styles.point}>{pt}</li>
            ))}
          </ul>
        </div>

        <div className={styles.arrow}>→</div>

        <div className={`${styles.column} ${styles.columnAfter}`}>
          <div className={styles.columnHeader}>
            <span className={styles.columnIcon}>▶</span>
            <span className={styles.columnLabel}>{block.after.label}</span>
          </div>
          <ul className={styles.points}>
            {block.after.points.map((pt, i) => (
              <li key={i} className={styles.point}>{pt}</li>
            ))}
          </ul>
        </div>
      </div>

      {block.insight && (
        <div className={styles.insight}>
          <span className={styles.insightIcon}>💡</span>
          <p className={styles.insightText}>{block.insight}</p>
        </div>
      )}
    </div>
  )
}
