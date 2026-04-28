/**
 * ComparisonBlock.jsx
 *
 * Taula visual que compara dos o més conceptes, teories o casos.
 *
 * Format JSON:
 * {
 *   "type": "comparison",
 *   "title": "Model geocèntric vs. heliocèntric",
 *   "items": [
 *     {
 *       "label": "Centre de l'univers",
 *       "a": "La Terra",
 *       "b": "El Sol"
 *     },
 *     ...
 *   ],
 *   "labelA": "Ptolemeu",
 *   "labelB": "Copèrnic"
 * }
 */

import styles from './ComparisonBlock.module.css'

export default function ComparisonBlock({ block }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.label}>📊 Comparació</div>

      {block.title && <p className={styles.title}>{block.title}</p>}

      <div className={styles.table}>
        {/* Capçalera */}
        <div className={styles.headerRow}>
          <div className={styles.headerCell} />
          <div className={`${styles.headerCell} ${styles.headerA}`}>
            {block.labelA}
          </div>
          <div className={`${styles.headerCell} ${styles.headerB}`}>
            {block.labelB}
          </div>
        </div>

        {/* Files */}
        {block.items.map((item, i) => (
          <div key={i} className={`${styles.row} ${i % 2 === 0 ? styles.rowAlt : ''}`}>
            <div className={styles.rowLabel}>{item.label}</div>
            <div className={styles.cellA}>{item.a}</div>
            <div className={styles.cellB}>{item.b}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
