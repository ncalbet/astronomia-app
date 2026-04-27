/**
 * ConfidenceSelector.jsx
 *
 * Apareix just després de respondre un exercici.
 * L'usuari indica quant segur estava → modifica l'XP guanyat.
 * Nivells: 1 = poc, 2 = força, 3 = molt
 */

import styles from './ConfidenceSelector.module.css'

const LEVELS = [
  { value: 1, label: 'Poc segur',  emoji: '🤔' },
  { value: 2, label: 'Força segur', emoji: '🙂' },
  { value: 3, label: 'Molt segur', emoji: '💪' }
]

export default function ConfidenceSelector({ onSelect }) {
  return (
    <div className={styles.wrapper}>
      <p className={styles.question}>Quant segur estaves?</p>
      <div className={styles.options}>
        {LEVELS.map(({ value, label, emoji }) => (
          <button
            key={value}
            className={styles.option}
            onClick={() => onSelect(value)}
            aria-label={`Confiança: ${label}`}
          >
            <span className={styles.emoji}>{emoji}</span>
            <span className={styles.label}>{label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
