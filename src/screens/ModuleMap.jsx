import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { useTheme } from '../context/ThemeContext'
import { MODULE_REGISTRY, loadModule } from '../data/moduleRegistry'
import { useModuleProgress } from '../hooks/useModuleProgress'
import styles from './ModuleMap.module.css'

const MODULE_META = {
  'module-01-copernicus': { title: 'La Revolució de Copèrnic',     emoji: '☀️' },
  'module-02-history':    { title: 'Història de l\'Astronomia',    emoji: '🏛️' },
  'module-03-peace':      { title: 'Pau, Conflicte i Guerra',      emoji: '🕊️' },
  'module-04-philosophy': { title: 'Filosofia de la Ciència',      emoji: '🔬' },
  'module-05-birding':    { title: 'Introducció a l\'Ornitologia', emoji: '🐦' }
}

// XP estimat per mòdul (per restar en repetir)
const MODULE_XP = {
  'module-01-copernicus': 117,
  'module-02-history':    384,
  'module-03-peace':      244,
  'module-04-philosophy': 268,
  'module-05-birding':    238
}

function ModuleCard({ id, onSelect, onRepeat, loadingId, completedModules,
                      completedLessons, isModuleUnlocked, isItineraryCompleted }) {
  const meta      = MODULE_META[id] || { title: id, emoji: '🔒' }
  const unlocked  = isModuleUnlocked(id)
  const completed = completedModules.includes(id)
  const isLoading = loadingId === id
  const [confirmRepeat, setConfirmRepeat] = useState(false)

  const progress = useModuleProgress(id, completedLessons, isItineraryCompleted)

  const showProgress = unlocked && progress && progress.total > 0
    && progress.completed > 0 && !completed

  const handleRepeatClick = (e) => {
    e.stopPropagation()
    setConfirmRepeat(true)
  }

  const handleConfirmRepeat = (e) => {
    e.stopPropagation()
    setConfirmRepeat(false)
    onRepeat(id)
  }

  const handleCancelRepeat = (e) => {
    e.stopPropagation()
    setConfirmRepeat(false)
  }

  return (
    <div className={`${styles.moduleCard} ${!unlocked ? styles.locked : ''} ${completed ? styles.completed : ''}`}>

      {/* Contingut principal — clicable per entrar */}
      <button
        className={styles.cardMain}
        onClick={() => onSelect(id)}
        disabled={!unlocked || !!loadingId}
      >
        <div className={styles.moduleEmoji}>
          {isLoading ? '⏳' : unlocked ? meta.emoji : '🔒'}
        </div>
        <div className={styles.moduleInfo}>
          <div className={styles.moduleName}>{meta.title}</div>
          <div className={styles.moduleMeta}>
            {isLoading ? 'Carregant...'
              : !unlocked ? 'Mòdul bloquejat'
              : progress ? progress.label
              : '...'}
          </div>
        </div>
        {completed && !isLoading && <div className={styles.completedBadge}>✓</div>}
        {showProgress && <div className={styles.percentBadge}>{progress.percent}%</div>}
      </button>

      {/* Barra de progrés */}
      {(showProgress || completed) && (
        <div className={styles.progressTrack}>
          <div
            className={`${styles.progressFill} ${completed ? styles.progressComplete : ''}`}
            style={{ width: completed ? '100%' : `${progress?.percent || 0}%` }}
          />
        </div>
      )}

      {/* Botó repetir — només si completat */}
      {completed && !confirmRepeat && (
        <button className={styles.repeatBtn} onClick={handleRepeatClick}>
          🔄 Repetir mòdul
        </button>
      )}

      {/* Confirmació */}
      {confirmRepeat && (
        <div className={styles.confirmBox}>
          <p className={styles.confirmText}>
            Es reiniciarà el progrés i l'XP d'aquest mòdul. La resta es manté.
          </p>
          <div className={styles.confirmBtns}>
            <button className={styles.confirmYes} onClick={handleConfirmRepeat}>
              Sí, repetir
            </button>
            <button className={styles.confirmNo} onClick={handleCancelRepeat}>
              Cancel·lar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default function ModuleMap() {
  const navigate  = useNavigate()
  const { isModuleUnlocked, completedModules, completedLessons,
          isItineraryCompleted, setNavigationState, repeatModule } = useApp()
  const { theme }  = useTheme()
  const [loadingId, setLoadingId] = useState(null)

  const handleSelectModule = async (moduleId) => {
    if (!isModuleUnlocked(moduleId) || loadingId) return
    setLoadingId(moduleId)
    try {
      const data = await loadModule(moduleId)
      setNavigationState({
        currentModuleId: moduleId,
        currentItineraryId: null,
        currentLessonId: null,
        currentStep: 0
      })
      navigate(data.itineraries ? '/itinerary' : '/lesson')
    } catch (err) {
      console.error('Error carregant el mòdul:', err)
    } finally {
      setLoadingId(null)
    }
  }

  const handleRepeat = (moduleId) => {
    const xp = MODULE_XP[moduleId] || 0
    repeatModule(moduleId, xp)
  }

  return (
    <div className={styles.screen}>
      <header className={styles.header}>
        <button className={styles.back} onClick={() => navigate('/')}>← Tornar</button>
        <h1 className={styles.title}>Mapa de {theme.missionWord}s</h1>
        <p className={styles.subtitle}>Cada missió reconstrueix un fragment del coneixement</p>
      </header>

      <div className={styles.moduleList}>
        {MODULE_REGISTRY.map(({ id }) => (
          <ModuleCard
            key={id}
            id={id}
            onSelect={handleSelectModule}
            onRepeat={handleRepeat}
            loadingId={loadingId}
            completedModules={completedModules}
            completedLessons={completedLessons}
            isModuleUnlocked={isModuleUnlocked}
            isItineraryCompleted={isItineraryCompleted}
          />
        ))}
      </div>
    </div>
  )
}
