/**
 * DeferredFeedbackPanel.jsx
 *
 * Apareix al final de la lliçó si hi havia exercicis de Mode Científic.
 * Revela les respostes diferides amb explicació completa.
 *
 * Props:
 *   decisions → array de { blockId, selected, correct, block }
 */

import styles from './DeferredFeedbackPanel.module.css'

export default function DeferredFeedbackPanel({ decisions }) {
  if (!decisions || decisions.length === 0) return null

  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <span className={styles.icon}>🔬</span>
        <div>
          <div className={styles.title}>Resolució científica</div>
          <div className={styles.subtitle}>El veredicte de les teves hipòtesis</div>
        </div>
      </div>

      <div className={styles.decisions}>
        {decisions.map(({ blockId, selected, correct, block }) => (
          <div key={blockId} className={`${styles.decision} ${correct ? styles.correct : styles.wrong}`}>
            <div className={styles.decisionHeader}>
              <span>{correct ? '✓ Hipòtesi confirmada' : '✗ Hipòtesi refutada'}</span>
              <span className={styles.xpTag}>{correct ? '+15 XP' : '+5 XP'}</span>
            </div>
            <p className={styles.questionText}>{block.question}</p>
            <div className={styles.chosen}>
              <span className={styles.chosenLabel}>La teva resposta:</span>
              <span>{block.options[selected]}</span>
            </div>
            {!correct && (
              <div className={styles.correctAnswer}>
                <span className={styles.chosenLabel}>Resposta correcta:</span>
                <span>{block.options[block.correct]}</span>
              </div>
            )}
            <p className={styles.explanation}>{block.explanation}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
