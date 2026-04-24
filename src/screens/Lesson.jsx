/**
 * Lesson.jsx (Bloc 2)
 *
 * Renderitzador dinàmic de lliçons per blocs.
 * Nou al Bloc 2:
 *   - ExerciseBlock amb confiança i feedback narratiu
 *   - ScientificModeBlock amb resposta diferida
 *   - DeferredFeedbackPanel al final de la lliçó
 */

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { loadModule } from '../data/moduleRegistry'
import { XP_VALUES } from '../engine/xpEngine'
import ExerciseBlock from '../components/exercises/ExerciseBlock'
import ScientificModeBlock from '../components/exercises/ScientificModeBlock'
import DeferredFeedbackPanel from '../components/exercises/DeferredFeedbackPanel'
import SimulationBlock from '../components/simulations/SimulationBlock'
import styles from './Lesson.module.css'

// ── Blocs de contingut ───────────────────────────────────────────────────────

function NarrativeBlock({ block }) {
  return (
    <div className={styles.narrative}>
      <span className={styles.narrativeIcon}>🧑‍🚀</span>
      <p>{block.text}</p>
    </div>
  )
}

function KeyIdeaBlock({ block }) {
  return (
    <div className={styles.keyIdea}>
      <div className={styles.keyIdeaLabel}>Idea clau</div>
      <p className={styles.keyIdeaText}>{block.text}</p>
    </div>
  )
}

function ExpandableBlock({ block, onExpand }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={styles.expandable}>
      <button
        className={styles.expandableToggle}
        onClick={() => { if (!open) onExpand?.(); setOpen(v => !v) }}
      >
        <span>📦 {block.label}</span>
        <span>{open ? '▲' : '▼'}</span>
      </button>
      {open && <div className={styles.expandableContent}>{block.content}</div>}
    </div>
  )
}

function PredictionBlock({ block }) {
  return (
    <div className={styles.prediction}>
      <div className={styles.predictionLabel}>🔮 Predicció</div>
      <p className={styles.predictionQ}>{block.question}</p>
      {block.hint && <p className={styles.predictionHint}>{block.hint}</p>}
    </div>
  )
}

// ── Renderitzador de blocs ────────────────────────────────────────────────────

function BlockRenderer({ block, onExpand, onAnswer, onDefer }) {
  switch (block.type) {
    case 'narrative':       return <NarrativeBlock block={block} />
    case 'key-idea':        return <KeyIdeaBlock block={block} />
    case 'expandable':      return <ExpandableBlock block={block} onExpand={onExpand} />
    case 'prediction':      return <PredictionBlock block={block} />
    case 'exercise':        return <ExerciseBlock block={block} onAnswer={onAnswer} />
    case 'scientific-mode': return <ScientificModeBlock block={block} onDefer={onDefer} />
    case 'simulation':      return <SimulationBlock block={block} />
    default: return null
  }
}

// ── Pantalla principal ────────────────────────────────────────────────────────

export default function Lesson() {
  const navigate = useNavigate()
  const {
    navigationState, setNavigationState,
    addXP, completeLesson, checkBadges
  } = useApp()

  const [moduleData, setModuleData]      = useState(null)
  const [loading, setLoading]            = useState(true)
  const [deferredDecisions, setDeferred] = useState([])

  const { currentModuleId, currentLessonId } = navigationState

  useEffect(() => {
    if (!currentModuleId) { navigate('/modules'); return }
    loadModule(currentModuleId)
      .then(data => {
        setModuleData(data)
        if (!navigationState.currentLessonId) {
          setNavigationState({ currentLessonId: data.lessons[0].id })
        }
        setLoading(false)
      })
      .catch(() => navigate('/modules'))
  }, [currentModuleId])

  if (loading || !moduleData) {
    return <div className={styles.loading}>Carregant missió...</div>
  }

  const currentLesson = moduleData.lessons.find(l => l.id === currentLessonId)
    || moduleData.lessons[0]
  const currentIndex  = moduleData.lessons.indexOf(currentLesson)
  const isLast        = currentIndex === moduleData.lessons.length - 1

  const scientificBlocks = currentLesson.blocks.filter(b => b.type === 'scientific-mode')
  const hasScientific    = scientificBlocks.length > 0
  const allCommitted     = !hasScientific || deferredDecisions.length >= scientificBlocks.length

  const handleAnswer = (_correct, xp) => { if (xp) addXP(xp) }

  const handleDefer = (decision) => {
    setDeferred(prev => {
      if (prev.find(d => d.blockId === decision.blockId)) return prev
      addXP(decision.correct ? 15 : 5)
      return [...prev, decision]
    })
  }

  const handleNext = () => {
    completeLesson(currentModuleId, currentLesson.id)
    addXP(XP_VALUES.COMPLETE_LESSON)
    checkBadges({ type: 'lesson_complete' })
    if (isLast) {
      checkBadges({ type: 'module_complete', data: { moduleId: currentModuleId } })
      navigate('/results')
    } else {
      const next = moduleData.lessons[currentIndex + 1]
      setDeferred([])
      setNavigationState({ currentLessonId: next.id, currentStep: 0 })
    }
  }

  return (
    <div className={styles.screen}>
      <header className={styles.header}>
        <button className={styles.back} onClick={() => navigate('/modules')}>← Missions</button>
        <div className={styles.progress}>
          <div className={styles.progressFill}
            style={{ width: `${((currentIndex + 1) / moduleData.lessons.length) * 100}%` }} />
        </div>
        <span className={styles.progressLabel}>{currentIndex + 1}/{moduleData.lessons.length}</span>
      </header>

      <div className={styles.lessonTitle}>
        <h2>{currentLesson.title}</h2>
      </div>

      <div className={styles.blocks}>
        {currentLesson.blocks.map((block, i) => (
          <BlockRenderer
            key={i}
            block={block}
            onExpand={() => addXP(XP_VALUES.EXPAND_BOX)}
            onAnswer={handleAnswer}
            onDefer={handleDefer}
          />
        ))}

        {hasScientific && allCommitted && deferredDecisions.length > 0 && (
          <DeferredFeedbackPanel decisions={deferredDecisions} />
        )}
      </div>

      <div className={styles.footer}>
        <button className={styles.nextBtn} onClick={handleNext} disabled={!allCommitted}>
          {isLast ? '🎉 Completar missió' : 'Següent lliçó →'}
        </button>
        {hasScientific && !allCommitted && (
          <p className={styles.footerHint}>Confirma la teva hipòtesi per continuar</p>
        )}
      </div>
    </div>
  )
}
