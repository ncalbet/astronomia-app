/**
 * ExerciseBlock.jsx
 *
 * Exercici interactiu amb:
 * - Resposta (multiple-choice, true-false, detect-error)
 * - Selector de confiança posterior
 * - Feedback narratiu (veu de l'Acadèmia)
 * - XP animat
 */

import { useState } from 'react'
import ConfidenceSelector from './ConfidenceSelector'
import { calculateAnswerXP } from '../../engine/xpEngine'
import styles from './ExerciseBlock.module.css'

// Genera el missatge narratiu de feedback
function buildNarrativeFeedback(correct, confidence, text) {
  const intro = correct
    ? confidence === 3
      ? '⭐ Anàlisi excel·lent. L\'Acadèmia registra pensament científic sòlid.'
      : '✓ Anàlisi correcta. Continues reconstruint el coneixement.'
    : confidence === 3
      ? '⚠ Alerta. Alta seguretat amb hipòtesi incorrecta — el pitjor error d\'un científic.'
      : '✗ Hipòtesi incorrecta. Revisa les dades i ajusta el model.'

  return `${intro} ${text}`
}

function XPToast({ amount }) {
  if (amount === 0) return null
  const positive = amount > 0
  return (
    <div className={`${styles.xpToast} ${positive ? styles.xpPos : styles.xpNeg}`}>
      {positive ? `+${amount}` : amount} XP
    </div>
  )
}

export default function ExerciseBlock({ block, onAnswer }) {
  const [selected, setSelected]       = useState(null)
  const [answered, setAnswered]       = useState(false)
  const [confidence, setConfidence]   = useState(null)
  const [xpEarned, setXpEarned]       = useState(null)
  const [showFeedback, setShowFeedback] = useState(false)

  // Determina si la resposta seleccionada és correcta
  const isCorrect = (sel) => {
    if (block.style === 'detect-error') return sel === block.isCorrect
    return sel === block.correct
  }

  const handleAnswer = (value) => {
    if (answered) return
    setSelected(value)
    setAnswered(true)
    // No cridem onAnswer encara — esperem la confiança
  }

  const handleConfidence = (level) => {
    setConfidence(level)
    const correct = isCorrect(selected)
    const xp = calculateAnswerXP(correct, 1, level)
    setXpEarned(xp)
    setShowFeedback(true)
    onAnswer?.(correct, xp)
  }

  const correct = answered ? isCorrect(selected) : null

  // Opcions per a true-false i detect-error
  const boolOptions = block.style === 'true-false'
    ? [{ value: true, label: 'Cert' }, { value: false, label: 'Fals' }]
    : [{ value: true, label: '✓ Correcta' }, { value: false, label: '✗ Incorrecta' }]

  const correctRef = block.style === 'detect-error' ? block.isCorrect : block.correct

  return (
    <div className={styles.exercise}>
      <div className={styles.label}>🧪 Exercici</div>

      {/* Pregunta */}
      {block.style === 'detect-error'
        ? <>
            <p className={styles.question}>Aquesta afirmació és correcta o incorrecta?</p>
            <blockquote className={styles.statement}>"{block.statement}"</blockquote>
          </>
        : <p className={styles.question}>{block.question}</p>
      }

      {/* Opcions */}
      <div className={styles.options}>
        {(block.style === 'multiple-choice' ? block.options.map((opt, i) => ({ value: i, label: opt })) : boolOptions)
          .map(({ value, label }) => {
            const isSelected = selected === value
            const isRight = value === correctRef
            return (
              <button
                key={String(value)}
                className={`${styles.option}
                  ${answered && isRight ? styles.correct : ''}
                  ${answered && isSelected && !isRight ? styles.wrong : ''}`}
                onClick={() => handleAnswer(value)}
                disabled={answered}
              >
                {label}
              </button>
            )
          })}
      </div>

      {/* Selector de confiança (apareix just després de respondre) */}
      {answered && !confidence && (
        <ConfidenceSelector onSelect={handleConfidence} />
      )}

      {/* Feedback narratiu + XP */}
      {showFeedback && (
        <div className={`${styles.feedback} ${correct ? styles.feedbackOk : styles.feedbackKo}`}>
          <XPToast amount={xpEarned} />
          <p>
            {buildNarrativeFeedback(
              correct,
              confidence,
              correct ? block.feedbackCorrect : block.feedbackWrong
            )}
          </p>
        </div>
      )}
    </div>
  )
}
