/**
 * ReviewSession.jsx
 *
 * Sessió de repàs amb Spaced Repetition.
 * Carrega els exercicis amb isDue() === true,
 * els presenta descontextualitzats (sense dir de quin mòdul vénen)
 * per forçar recuperació activa de memòria.
 */

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { useTheme } from '../context/ThemeContext'
import { MODULE_REGISTRY, loadModule } from '../data/moduleRegistry'
import { getDueItems } from '../engine/spacedRepetitionEngine'
import ExerciseBlock from '../components/exercises/ExerciseBlock'
import { calculateNextReview, computeQuality } from '../engine/spacedRepetitionEngine'
import styles from './ReviewSession.module.css'

export default function ReviewSession() {
  const navigate  = useNavigate()
  const { srData, updateSrData, updateSrStreak, addXP, checkBadges } = useApp()
  const { theme } = useTheme()

  const [dueBlocks, setDueBlocks]   = useState([])  // { block, moduleTitle }
  const [current, setCurrent]       = useState(0)
  const [loading, setLoading]       = useState(true)
  const [done, setDone]             = useState(false)
  const [reviewed, setReviewed]     = useState(0)

  useEffect(() => {
    const dueIds = getDueItems(srData)
    if (dueIds.length === 0) { setLoading(false); return }

    // Carrega tots els mòduls i extreu els blocs pendents
    Promise.all(MODULE_REGISTRY.map(m => loadModule(m.id).catch(() => null)))
      .then(modules => {
        const found = []
        modules.forEach((mod, mi) => {
          if (!mod) return
          const lessons = mod.itineraries
            ? mod.itineraries.flatMap(it => it.lessons)
            : mod.lessons || []
          lessons.forEach(lesson => {
            lesson.blocks.forEach(block => {
              if (block.id && dueIds.includes(block.id) && block.type === 'exercise') {
                found.push({ block, moduleTitle: mod.title, moduleEmoji: mod.emoji || '📚' })
              }
            })
          })
        })
        // Barreja aleatòria
        found.sort(() => Math.random() - 0.5)
        setDueBlocks(found)
        setLoading(false)
      })
  }, [])

  const handleAnswer = (correct, xp, confidence) => {
    if (xp) addXP(xp)
  }

  const handleSrUpdate = (blockId, quality) => {
    const next = calculateNextReview(quality, srData?.[blockId])
    updateSrData(blockId, next)
  }

  const handleNext = () => {
    setReviewed(r => r + 1)
    if (current + 1 >= dueBlocks.length) {
      updateSrStreak()
      checkBadges({ type: 'sr_review_done' })
      setDone(true)
    } else {
      setCurrent(c => c + 1)
    }
  }

  // --- Estats ---

  if (loading) return (
    <div className={styles.center}>
      <span>⏳</span><p>Preparant el repàs...</p>
    </div>
  )

  if (dueBlocks.length === 0) return (
    <div className={styles.center}>
      <div className={styles.emptyIcon}>✅</div>
      <h2 className={styles.emptyTitle}>Res per repassar avui</h2>
      <p className={styles.emptyText}>
        Torna demà — el sistema programarà nous exercicis a mesura que avancis.
      </p>
      <button className={styles.backBtn} onClick={() => navigate('/')}>
        Tornar a l'inici
      </button>
    </div>
  )

  if (done) return (
    <div className={`${styles.center} ${styles.doneScreen}`}>
      <div className={styles.doneIcon}>🎯</div>
      <h2 className={styles.doneTitle}>Sessió completada</h2>
      <p className={styles.doneSub}>{reviewed} exercici{reviewed !== 1 ? 's' : ''} repasats</p>
      <p className={styles.doneText}>
        El sistema ha programat les properes revisions. Torna demà per continuar.
      </p>
      <button className={styles.backBtn} onClick={() => navigate('/')}>
        Tornar a l'inici
      </button>
    </div>
  )

  const { block, moduleTitle, moduleEmoji } = dueBlocks[current]

  return (
    <div className={styles.screen}>
      <header className={styles.header}>
        <button className={styles.back} onClick={() => navigate('/')}>← Sortir</button>
        <div className={styles.progress}>
          <div
            className={styles.progressFill}
            style={{ width: `${(current / dueBlocks.length) * 100}%` }}
          />
        </div>
        <span className={styles.counter}>{current + 1}/{dueBlocks.length}</span>
      </header>

      <div className={styles.context}>
        <span className={styles.contextEmoji}>{moduleEmoji}</span>
        <span className={styles.contextName}>{moduleTitle}</span>
        <span className={styles.contextLabel}>· Repàs</span>
      </div>

      <div className={styles.blockWrapper}>
        <ExerciseBlock
          key={block.id}
          block={block}
          onAnswer={handleAnswer}
          onSrUpdate={handleSrUpdate}
        />
      </div>

      <div className={styles.footer}>
        <button className={styles.nextBtn} onClick={handleNext}>
          {current + 1 >= dueBlocks.length ? '✅ Acabar repàs' : 'Següent →'}
        </button>
      </div>
    </div>
  )
}
