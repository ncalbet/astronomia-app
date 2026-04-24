/**
 * ScientificModeBlock.jsx
 *
 * Exercici especial: l'usuari tria una teoria/hipòtesi
 * però NO rep resposta immediata.
 * El feedback es revela al final de la lliçó (DeferredFeedbackPanel).
 *
 * Props:
 *   block       → dades del bloc (question, options, correct, explanation)
 *   onDefer     → callback({ blockId, selected, correct }) per registrar la decisió
 */

import { useState } from 'react'
import styles from './ScientificModeBlock.module.css'

export default function ScientificModeBlock({ block, onDefer }) {
  const [selected, setSelected] = useState(null)
  const [committed, setCommitted] = useState(false)

  const handleSelect = (index) => {
    if (committed) return
    setSelected(index)
  }

  const handleCommit = () => {
    if (selected === null || committed) return
    setCommitted(true)
    const correct = selected === block.correct
    onDefer?.({ blockId: block.id, selected, correct, block })
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.label}>
        <span className={styles.icon}>🧠</span>
        Mode Científic
      </div>

      <p className={styles.intro}>
        Amb el que has après fins ara, pren una decisió com ho faria un científic.
        No rebràs resposta immediata.
      </p>

      <p className={styles.question}>{block.question}</p>

      <div className={styles.options}>
        {block.options.map((opt, i) => (
          <button
            key={i}
            className={`${styles.option}
              ${selected === i ? styles.selected : ''}
              ${committed ? styles.committed : ''}`}
            onClick={() => handleSelect(i)}
            disabled={committed}
          >
            {opt}
          </button>
        ))}
      </div>

      {!committed && selected !== null && (
        <button className={styles.commitBtn} onClick={handleCommit}>
          Confirmar hipòtesi →
        </button>
      )}

      {committed && (
        <div className={styles.pending}>
          🔬 Hipòtesi registrada. El veredicte arriba al final de la lliçó.
        </div>
      )}
    </div>
  )
}
