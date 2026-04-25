/**
 * Lesson.jsx — versió corregida
 * Fixes: loading state correcte, cleanup d'efectes, gestió d'errors,
 * nous tipus de blocs, suport complet d'itineraris.
 */

import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { useTheme } from '../context/ThemeContext'
import { loadModule } from '../data/moduleRegistry'
import { XP_VALUES } from '../engine/xpEngine'
import ExerciseBlock from '../components/exercises/ExerciseBlock'
import ScientificModeBlock from '../components/exercises/ScientificModeBlock'
import DeferredFeedbackPanel from '../components/exercises/DeferredFeedbackPanel'
import SimulationBlock from '../components/simulations/SimulationBlock'
import styles from './Lesson.module.css'

// ── Blocs de contingut ──────────────────────────────────────────────────────

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

function TimelineBlock({ block }) {
  return (
    <div className={styles.timeline}>
      <div className={styles.timelineLabel}>📅 Línia del temps</div>
      {block.events.map((ev, i) => (
        <div key={i} className={styles.timelineEvent}>
          <div className={styles.timelineYear}>{ev.year}</div>
          <div className={styles.timelineDot} />
          <div className={styles.timelineContent}>
            <div className={styles.timelineTitle}>{ev.title}</div>
            {ev.text && <div className={styles.timelineText}>{ev.text}</div>}
          </div>
        </div>
      ))}
    </div>
  )
}

function QuoteBlock({ block }) {
  return (
    <div className={styles.quote}>
      <blockquote className={styles.quoteText}>"{block.text}"</blockquote>
      {block.author && <cite className={styles.quoteAuthor}>— {block.author}</cite>}
    </div>
  )
}

function BlockRenderer({ block, onExpand, onAnswer, onDefer }) {
  switch (block.type) {
    case 'narrative':       return <NarrativeBlock block={block} />
    case 'key-idea':        return <KeyIdeaBlock block={block} />
    case 'expandable':      return <ExpandableBlock block={block} onExpand={onExpand} />
    case 'prediction':      return <PredictionBlock block={block} />
    case 'exercise':        return <ExerciseBlock block={block} onAnswer={onAnswer} />
    case 'scientific-mode': return <ScientificModeBlock block={block} onDefer={onDefer} />
    case 'simulation':      return <SimulationBlock block={block} />
    case 'timeline':        return <TimelineBlock block={block} />
    case 'quote':           return <QuoteBlock block={block} />
    default: return null
  }
}

// ── Pantalla principal ──────────────────────────────────────────────────────

export default function Lesson() {
  const navigate  = useNavigate()
  const { navigationState, setNavigationState, addXP, completeLesson,
          completeItinerary, completeModule, checkBadges } = useApp()
  const { theme } = useTheme()

  const [moduleData, setModuleData]      = useState(null)
  const [loading, setLoading]            = useState(true)
  const [error, setError]                = useState(null)
  const [deferredDecisions, setDeferred] = useState([])
  const mountedRef = useRef(true)  // evita setState en component desmuntat

  const { currentModuleId, currentItineraryId, currentLessonId } = navigationState

  useEffect(() => {
    mountedRef.current = true
    return () => { mountedRef.current = false }
  }, [])

  useEffect(() => {
    if (!currentModuleId) {
      navigate('/modules')
      return
    }

    setLoading(true)
    setError(null)

    loadModule(currentModuleId)
      .then(data => {
        if (!mountedRef.current) return
        setModuleData(data)

        const lessons = currentItineraryId
          ? data.itineraries?.find(it => it.id === currentItineraryId)?.lessons || []
          : data.lessons || []

        if (!currentLessonId && lessons.length > 0) {
          setNavigationState({ currentLessonId: lessons[0].id })
        }
        setLoading(false)
      })
      .catch(err => {
        if (!mountedRef.current) return
        console.error('Error carregant mòdul:', err)
        setError('No s\'ha pogut carregar la lliçó.')
        setLoading(false)
      })
  }, [currentModuleId, currentItineraryId]) // escolta canvis d'itinerari també

  // Reinicia decisions diferides quan canvia la lliçó
  useEffect(() => {
    setDeferred([])
  }, [currentLessonId])

  if (loading) {
    return (
      <div className={styles.loadingScreen}>
        <div className={styles.loadingSpinner}>⏳</div>
        <p>Carregant {theme.missionWord.toLowerCase()}...</p>
      </div>
    )
  }

  if (error || !moduleData) {
    return (
      <div className={styles.loadingScreen}>
        <p className={styles.errorMsg}>{error || 'Error inesperat'}</p>
        <button className={styles.errorBtn} onClick={() => navigate('/modules')}>
          Tornar al mapa
        </button>
      </div>
    )
  }

  const lessons = currentItineraryId
    ? moduleData.itineraries?.find(it => it.id === currentItineraryId)?.lessons || []
    : moduleData.lessons || []

  const currentLesson = lessons.find(l => l.id === currentLessonId) || lessons[0]
  if (!currentLesson) {
    navigate('/modules')
    return null
  }

  const currentIndex  = lessons.indexOf(currentLesson)
  const isLast        = currentIndex === lessons.length - 1

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
    completeLesson(currentModuleId, currentLesson.id, currentItineraryId)
    addXP(XP_VALUES.COMPLETE_LESSON)
    checkBadges({ type: 'lesson_complete' })

    if (isLast) {
      if (currentItineraryId) {
        completeItinerary(currentModuleId, currentItineraryId)
      } else {
        completeModule(currentModuleId)
        checkBadges({ type: 'module_complete', data: { moduleId: currentModuleId } })
      }
      navigate('/results')
    } else {
      const next = lessons[currentIndex + 1]
      setNavigationState({ currentLessonId: next.id, currentStep: 0 })
    }
  }

  const handleBack = () => {
    if (currentItineraryId) navigate('/itinerary')
    else navigate('/modules')
  }

  return (
    <div className={styles.screen}>
      <header className={styles.header}>
        <button className={styles.back} onClick={handleBack}>
          ← {currentItineraryId ? 'Itineraris' : `${theme.missionWord}s`}
        </button>
        <div className={styles.progress}>
          <div className={styles.progressFill}
            style={{ width: `${((currentIndex + 1) / lessons.length) * 100}%` }} />
        </div>
        <span className={styles.progressLabel}>{currentIndex + 1}/{lessons.length}</span>
      </header>

      <div className={styles.lessonTitle}>
        <h2>{currentLesson.title}</h2>
      </div>

      <div className={styles.blocks}>
        {currentLesson.blocks.map((block, i) => (
          <BlockRenderer
            key={`${currentLesson.id}-${i}`}
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
          {isLast
            ? `🎉 Completar ${currentItineraryId ? 'itinerari' : theme.missionWord.toLowerCase()}`
            : 'Següent lliçó →'}
        </button>
        {hasScientific && !allCommitted && (
          <p className={styles.footerHint}>Confirma la teva hipòtesi per continuar</p>
        )}
      </div>
    </div>
  )
}
