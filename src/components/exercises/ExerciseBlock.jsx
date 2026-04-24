/**
 * ExerciseBlock.jsx
 * Exercici interactiu amb confiança i feedback narratiu del tema.
 */

import { useState } from 'react'
import { useTheme } from '../../context/ThemeContext'
import ConfidenceSelector from './ConfidenceSelector'
import { calculateAnswerXP } from '../../engine/xpEngine'
import styles from './ExerciseBlock.module.css'

function buildNarrativeFeedback(correct, confidence, text, narrative) {
  const intro = correct
    ? confidence === 3 ? narrative.correctHigh : narrative.correctNormal
    : confidence === 3 ? narrative.wrongHigh   : narrative.wrongNormal
  return `${intro} ${text}`
}

function XPToast({ amount }) {
  if (!amount) return null
  const positive = amount > 0
  return (
    <div className={`${styles.xpToast} ${positive ? styles.xpPos : styles.xpNeg}`}>
      {positive ? `+${amount}` : amount} XP
    </div>
  )
}

export default function ExerciseBlock({ block, onAnswer }) {
  const [selected, setSelected]     = useState(null)
  const [answered, setAnswered]     = useState(false)
  const [confidence, setConfidence] = useState(null)
  const [xpEarned, setXpEarned]     = useState(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const { theme } = useTheme()

  const isCorrect = (sel) =>
    block.style === 'detect-error' ? sel === block.isCorrect : sel === block.correct

  const handleAnswer = (value) => {
    if (answered) return
    setSelected(value)
    setAnswered(true)
  }

  const handleConfidence = (level) => {
    setConfidence(level)
    const correct = isCorrect(selected)
    const xp = calculateAnswerXP(correct, 1, level)
    setXpEarned(xp)
    setShowFeedback(true)
    onAnswer?.(correct, xp)
  }

  const correctRef = block.style === 'detect-error' ? block.isCorrect : block.correct

  const boolOptions = block.style === 'true-false'
    ? [{ value: true, label: 'Cert' }, { value: false, label: 'Fals' }]
    : [{ value: true, label: '✓ Correcta' }, { value: false, label: '✗ Incorrecta' }]

  const options = block.style === 'multiple-choice'
    ? block.options.map((opt, i) => ({ value: i, label: opt }))
    : boolOptions

  return (
    <div className={styles.exercise}>
      <div className={styles.label}>🧪 Exercici</div>

      {block.style === 'detect-error'
        ? <>
            <p className={styles.question}>Aquesta afirmació és correcta o incorrecta?</p>
            <blockquote className={styles.statement}>"{block.statement}"</blockquote>
          </>
        : <p className={styles.question}>{block.question}</p>
      }

      <div className={styles.options}>
        {options.map(({ value, label }) => {
          const isRight    = value === correctRef
          const isSelected = selected === value
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

      {answered && !confidence && (
        <ConfidenceSelector onSelect={handleConfidence} />
      )}

      {showFeedback && (
        <div className={`${styles.feedback} ${isCorrect(selected) ? styles.feedbackOk : styles.feedbackKo}`}>
          <XPToast amount={xpEarned} />
          <p>
            {buildNarrativeFeedback(
              isCorrect(selected),
              confidence,
              isCorrect(selected) ? block.feedbackCorrect : (block.feedbackWrong || block.feedbackExplanation),
              theme.narrative
            )}
          </p>
        </div>
      )}
    </div>
  )
}
