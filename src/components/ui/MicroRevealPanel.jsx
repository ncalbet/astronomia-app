/**
 * MicroRevealPanel.jsx
 *
 * Apareix quan l'usuari arriba al bloc indicat per revealAfterBlockId.
 * Recorda la hipòtesi triada i pregunta si la mantindria.
 * És metacognitiu pur — no canvia l'XP ni la hipòtesi original.
 */

import { useState } from 'react'
import styles from './MicroRevealPanel.module.css'

export default function MicroRevealPanel({ sciBlock, selectedOption, onRespond }) {
  const [response, setResponse] = useState(null)

  if (response) return (
    <div className={styles.responded}>
      🔬 {response === 'keep'
        ? 'Mantens la teva hipòtesi. El veredicte final arribarà aviat.'
        : 'Has reconsiderat. Interessant — ho veurem al veredicte final.'}
    </div>
  )

  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <span className={styles.icon}>🔬</span>
        <div className={styles.headerText}>
          <div className={styles.title}>Recorda: vas triar</div>
          <div className={styles.chosen}>"{sciBlock.options[selectedOption]}"</div>
        </div>
      </div>

      <p className={styles.question}>
        Ara que has vist aquesta informació... seguiries igual?
      </p>

      <div className={styles.btns}>
        <button
          className={`${styles.btn} ${styles.btnKeep}`}
          onClick={() => { setResponse('keep'); onRespond?.('keep') }}
        >
          Sí, mantinc la hipòtesi
        </button>
        <button
          className={`${styles.btn} ${styles.btnChange}`}
          onClick={() => { setResponse('change'); onRespond?.('change') }}
        >
          No, ara ho veig diferent
        </button>
      </div>
    </div>
  )
}
