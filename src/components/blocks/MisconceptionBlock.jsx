/**
 * MisconceptionBlock.jsx
 *
 * Ataca un error conceptual comú de forma expositiva.
 * Comença amb "Molta gent creu que..." i explica per qué és incorrecte.
 * Diferent del detect-error (interactiu) — aquest és expositiu i directe.
 *
 * Format JSON:
 * {
 *   "type": "misconception",
 *   "belief": "La gravetat a l'espai és zero",
 *   "reality": "La gravetat a l'estació espacial...",
 *   "why": "Per qué es confon? Perquè..."  (opcional)
 * }
 */

import styles from './MisconceptionBlock.module.css'

export default function MisconceptionBlock({ block }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.label}>⚠️ Error comú</div>

      <div className={styles.belief}>
        <div className={styles.beliefLabel}>Molta gent creu que...</div>
        <p className={styles.beliefText}>"{block.belief}"</p>
      </div>

      <div className={styles.arrow}>↓</div>

      <div className={styles.reality}>
        <div className={styles.realityLabel}>La realitat</div>
        <p className={styles.realityText}>{block.reality}</p>
      </div>

      {block.why && (
        <div className={styles.why}>
          <div className={styles.whyLabel}>Per qué es confon?</div>
          <p className={styles.whyText}>{block.why}</p>
        </div>
      )}
    </div>
  )
}
