/**
 * ConnectionBlock.jsx
 *
 * Connecta el concepte actual amb un altre mòdul o lliçó.
 * Reforça que l'app és una xarxa de coneixement, no silos separats.
 *
 * Format JSON:
 * {
 *   "type": "connection",
 *   "moduleRef": "Filosofia de la Ciència",
 *   "moduleEmoji": "🔬",
 *   "concept": "El paradigma de Kuhn",
 *   "text": "Recorda el que vam veure sobre com canvien els paradigmes científics..."
 * }
 */

import styles from './ConnectionBlock.module.css'

export default function ConnectionBlock({ block }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <span className={styles.icon}>🔗</span>
        <div className={styles.ref}>
          <span className={styles.moduleEmoji}>{block.moduleEmoji}</span>
          <span className={styles.moduleName}>{block.moduleRef}</span>
          {block.concept && (
            <span className={styles.concept}>· {block.concept}</span>
          )}
        </div>
      </div>
      <p className={styles.text}>{block.text}</p>
    </div>
  )
}
