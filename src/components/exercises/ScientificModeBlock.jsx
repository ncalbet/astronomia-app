/**
 * ScientificModeBlock.jsx
 *
 * Exercici de reflexió sense resposta immediata.
 * El nom, icona i intro venen del tema actiu.
 */

import { useState } from 'react'
import { useTheme } from '../../context/ThemeContext'
import styles from './ScientificModeBlock.module.css'

export default function ScientificModeBlock({ block, onDefer }) {
  const [selected, setSelected]   = useState(null)
  const [committed, setCommitted] = useState(false)
  const { theme } = useTheme()

  const handleCommit = () => {
    if (selected === null || committed) return
    setCommitted(true)
    const correct = selected === block.correct
    onDefer?.({ blockId: block.id, selected, correct, block })
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.label}>
        <span className={styles.icon}>{theme.reflectionModeIcon}</span>
        {theme.reflectionModeName}
      </div>

      <p className={styles.intro}>{theme.reflectionModeIntro}</p>
      <p className={styles.question}>{block.question}</p>

      <div className={styles.options}>
        {block.options.map((opt, i) => (
          <button
            key={i}
            className={`${styles.option}
              ${selected === i ? styles.selected : ''}
              ${committed ? styles.committed : ''}`}
            onClick={() => { if (!committed) setSelected(i) }}
            disabled={committed}
            aria-label={`Hipòtesi ${i + 1}: ${opt}`}
            aria-pressed={selected === i}
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
          🔬 Decisió registrada. El veredicte arriba al final de la lliçó.
        </div>
      )}
    </div>
  )
}
