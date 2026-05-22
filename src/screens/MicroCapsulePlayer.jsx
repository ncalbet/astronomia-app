import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { getCapsuleById, MICROCAPSULES } from '../data/microcapsules'
import styles from './MicroCapsulePlayer.module.css'

const CAPSULE_XP = 15

function NarrativeBlock({ block }) {
  return (
    <div className={styles.narrative}>
      <p className={styles.narrativeText}>{block.text}</p>
    </div>
  )
}

function KeyIdeaBlock({ block }) {
  return (
    <div className={styles.keyIdea}>
      <div className={styles.keyIdeaLabel}>💡 Idea clau</div>
      <p className={styles.keyIdeaText}>{block.text}</p>
    </div>
  )
}

function ExerciseBlock({ block, onAnswer }) {
  const [selected, setSelected] = useState(null)
  const [answered, setAnswered] = useState(false)

  const handleSelect = (idx) => {
    if (answered) return
    setSelected(idx)
    setAnswered(true)
    onAnswer(idx === block.correctIndex)
  }

  return (
    <div className={styles.exercise}>
      <p className={styles.exerciseQ}>{block.question}</p>
      <div className={styles.exerciseOptions}>
        {block.options.map((opt, idx) => {
          let cls = styles.option
          if (answered) {
            if (idx === block.correctIndex) cls += ` ${styles.optionCorrect}`
            else if (idx === selected) cls += ` ${styles.optionWrong}`
          }
          return (
            <button key={idx} className={cls} onClick={() => handleSelect(idx)} disabled={answered}>
              <span className={styles.optionLetter}>{String.fromCharCode(65 + idx)}</span>
              <span>{opt}</span>
            </button>
          )
        })}
      </div>
      {answered && (
        <div className={`${styles.explanation} ${selected === block.correctIndex ? styles.explanationOk : styles.explanationKo}`}>
          {selected === block.correctIndex ? '✓ Correcte · ' : '✗ No del tot · '}
          {block.explanation}
        </div>
      )}
    </div>
  )
}

export default function MicroCapsulePlayer() {
  const navigate = useNavigate()
  const { navigationState, addXP, checkBadges } = useApp()

  const capsule = getCapsuleById(navigationState.currentCapsuleId)

  const [step, setStep]           = useState(0)
  const [correctAnswers, setCorrect] = useState(0)
  const [exerciseAnswered, setExerciseAnswered] = useState(false)
  const [done, setDone]           = useState(false)

  if (!capsule) {
    return (
      <div className={styles.center}>
        <p>Càpsula no trobada.</p>
        <button onClick={() => navigate('/')}>Tornar</button>
      </div>
    )
  }

  const blocks   = capsule.blocks
  const current  = blocks[step]
  const isLast   = step === blocks.length - 1
  const isExercise = current?.type === 'exercise'

  const handleAnswer = (correct) => {
    if (correct) setCorrect(c => c + 1)
    setExerciseAnswered(true)
  }

  const handleNext = () => {
    if (isLast) {
      addXP(CAPSULE_XP)
      checkBadges({ type: 'capsule_done' })
      setDone(true)
    } else {
      setStep(s => s + 1)
      setExerciseAnswered(false)
    }
  }

  if (done) return (
    <div className={styles.doneScreen}>
      <div className={styles.doneEmoji}>{capsule.emoji}</div>
      <h2 className={styles.doneTitle}>Càpsula completada</h2>
      <p className={styles.doneSub}>{capsule.title}</p>
      <div className={styles.doneXP}>+{CAPSULE_XP} XP</div>
      <button className={styles.doneBtn} onClick={() => navigate('/')}>
        Tornar a l'inici
      </button>
      <button className={styles.moreBtn} onClick={() => navigate('/capsules')}>
        Més càpsules →
      </button>
    </div>
  )

  const canNext = !isExercise || exerciseAnswered

  return (
    <div className={styles.screen}>
      {/* Header */}
      <header className={styles.header}>
        <button className={styles.close} onClick={() => navigate('/')}>✕</button>
        <div className={styles.dots}>
          {blocks.map((_, i) => (
            <div key={i} className={`${styles.dot} ${i <= step ? styles.dotActive : ''}`} />
          ))}
        </div>
        <span className={styles.duration}>{capsule.duration} min</span>
      </header>

      {/* Títol */}
      <div className={styles.titleRow}>
        <span className={styles.capsuleEmoji}>{capsule.emoji}</span>
        <h1 className={styles.capsuleTitle}>{capsule.title}</h1>
      </div>

      {/* Bloc actual */}
      <div className={styles.blockArea}>
        {current.type === 'narrative' && <NarrativeBlock block={current} />}
        {current.type === 'key-idea'  && <KeyIdeaBlock  block={current} />}
        {current.type === 'exercise'  && <ExerciseBlock block={current} onAnswer={handleAnswer} />}
      </div>

      {/* Footer */}
      <div className={styles.footer}>
        <button
          className={`${styles.nextBtn} ${!canNext ? styles.nextBtnDisabled : ''}`}
          onClick={handleNext}
          disabled={!canNext}
        >
          {isLast ? '✅ Acabar' : 'Següent →'}
        </button>
      </div>
    </div>
  )
}
