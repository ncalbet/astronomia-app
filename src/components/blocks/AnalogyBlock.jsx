/**
 * AnalogyBlock.jsx
 *
 * Pont explícit entre un concepte difícil o aliè i alguna cosa
 * que l'usuari ja entén. Diferent del narrative: aquí la comparació
 * és el contingut principal, no un exemple dins d'una explicació.
 *
 * Format JSON:
 * {
 *   "type": "analogy",
 *   "concept": "La realpolitik de Bismarck",
 *   "emoji": "♟️",
 *   "analogy": "La realpolitik és com jugar al pòquer: no importa si tens les cartes millors...",
 *   "bridge": "Per això desconcerta tant: estem acostumats a pensar la política en termes de valors..."
 * }
 */

import styles from './AnalogyBlock.module.css'

export default function AnalogyBlock({ block }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.label}>
        <span>🔗</span> Analogia
      </div>

      <div className={styles.header}>
        {block.emoji && <span className={styles.emoji}>{block.emoji}</span>}
        <span className={styles.concept}>{block.concept}</span>
        <span className={styles.separator}>és com...</span>
      </div>

      <div className={styles.analogyBox}>
        <p className={styles.analogyText}>{block.analogy}</p>
      </div>

      {block.bridge && (
        <div className={styles.bridge}>
          <div className={styles.bridgeLabel}>Per què ajuda pensar-ho així</div>
          <p className={styles.bridgeText}>{block.bridge}</p>
        </div>
      )}
    </div>
  )
}
