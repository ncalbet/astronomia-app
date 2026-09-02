import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { useTheme } from '../context/ThemeContext'
import { loadModule, getModuleMeta, getMissingPrerequisites } from '../data/moduleRegistry'
import { getAreaById, getAreaTopics } from '../data/areaRegistry'
import { useModuleProgress } from '../hooks/useModuleProgress'
import { LEVELS, levelOrder } from '../data/levels'
import LevelBadge from '../components/ui/LevelBadge'
import PrerequisiteNote from '../components/ui/PrerequisiteNote'
import styles from './ModuleMap.module.css'

function ModuleCard({ meta, onSelect, onRepeat, loadingId, completedModules,
                      completedLessons, isModuleUnlocked, isItineraryCompleted }) {
  const id        = meta.id
  const unlocked  = isModuleUnlocked(id)
  const completed = completedModules.includes(id)
  const isLoading = loadingId === id
  const [confirmRepeat, setConfirmRepeat] = useState(false)
  const minutes   = Math.round((meta.xp || 200) / 20)

  const progress = useModuleProgress(id, completedLessons, isItineraryCompleted)
  const missingPrereqs = getMissingPrerequisites(id, completedModules)
  const levels = meta.levels || [meta.level]
  // Només val la pena mostrar el nivell quan aporta informació: si el mòdul
  // va més enllà de l'inicial o si té base recomanada.
  const showLevel = levels.length > 1 || levels[0] !== 'inicial'

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
            <span>
              {isLoading ? 'Carregant...'
                : !unlocked ? 'Mòdul bloquejat'
                : progress ? progress.label
                : ''}
            </span>
            {unlocked && !isLoading && (
              <span className={styles.readTime}>~{minutes}min</span>
            )}
            {showLevel && <LevelBadge levels={levels} className={styles.cardLevel} />}
            {missingPrereqs.length > 0 && (
              <PrerequisiteNote missing={missingPrereqs} compact />
            )}
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
          isItineraryCompleted, setNavigationState, repeatModule,
          navigationState } = useApp()
  const { theme }  = useTheme()
  const [loadingId, setLoadingId] = useState(null)
  const [query, setQuery]         = useState('')
  const [filter, setFilter]       = useState('all')  // 'all' | 'pending' | 'done'
  const [sort, setSort]           = useState('default') // 'default' | 'asc' | 'desc'
  const [levelFilter, setLevelFilter] = useState('all')  // 'all' | id de nivell

  const area = getAreaById(navigationState.currentAreaId)

  // Si no hi ha àrea seleccionada, torna al selector
  useEffect(() => {
    if (!navigationState.currentAreaId) navigate('/areas', { replace: true })
  }, [])

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
    const xp = getModuleMeta(moduleId)?.xp || 0
    repeatModule(moduleId, xp)
  }

  if (!area) return null  // redirect en curs

  const normalizedQuery = query.trim().toLowerCase()

  const areaTopics = getAreaTopics(area.id)

  // Els nivells realment presents a l'àrea: el filtre no apareix si tot és inicial.
  const areaLevels = [...new Set(
    areaTopics.flatMap(t => t.modules.flatMap(m => m.levels || [m.level]))
  )].sort((a, b) => levelOrder(a) - levelOrder(b))

  const filteredTopics = areaTopics.map(topic => {
    let modules = topic.modules.filter(m => {
      if (normalizedQuery && !m.title.toLowerCase().includes(normalizedQuery)) return false
      if (levelFilter !== 'all' && !(m.levels || [m.level]).includes(levelFilter)) return false
      if (filter === 'pending') return isModuleUnlocked(m.id) && !completedModules.includes(m.id)
      if (filter === 'done')    return completedModules.includes(m.id)
      return true
    })
    if (sort !== 'default') {
      modules = [...modules].sort((a, b) =>
        sort === 'asc' ? (a.xp || 200) - (b.xp || 200) : (b.xp || 200) - (a.xp || 200)
      )
    }
    return { ...topic, modules }
  }).filter(topic => topic.modules.length > 0)

  const totalVisible = filteredTopics.reduce((acc, t) => acc + t.modules.length, 0)

  return (
    <div className={styles.screen}>
      <header className={styles.header}>
        <button className={styles.back} onClick={() => navigate('/areas')}>← Àrees</button>
        <h1 className={styles.title}>{area.emoji} {area.label}</h1>
        <p className={styles.subtitle}>{area.description}</p>
      </header>

      <div className={styles.filterBar}>
        <div className={styles.filterChips}>
          {[['all','Tots'],['pending','Pendents'],['done','Completats']].map(([v,l]) => (
            <button
              key={v}
              className={`${styles.chip} ${filter === v ? styles.chipActive : ''}`}
              onClick={() => setFilter(v)}
            >{l}</button>
          ))}
        </div>
        <div className={styles.sortChips}>
          {[['default','•••'],['asc','↑min'],['desc','↓min']].map(([v,l]) => (
            <button
              key={v}
              className={`${styles.chip} ${sort === v ? styles.chipActive : ''}`}
              onClick={() => setSort(v)}
              title={v === 'asc' ? 'Més curts primer' : v === 'desc' ? 'Més llargs primer' : 'Ordre per defecte'}
            >{l}</button>
          ))}
        </div>
      </div>

      {areaLevels.length > 1 && (
        <div className={styles.levelBar}>
          <span className={styles.levelBarLabel}>Profunditat</span>
          <div className={styles.filterChips}>
            <button
              className={`${styles.chip} ${levelFilter === 'all' ? styles.chipActive : ''}`}
              onClick={() => setLevelFilter('all')}
            >Tota</button>
            {LEVELS.filter(l => areaLevels.includes(l.id)).map(l => (
              <button
                key={l.id}
                className={`${styles.chip} ${levelFilter === l.id ? styles.chipActive : ''}`}
                onClick={() => setLevelFilter(l.id)}
                title={l.demands}
              >{l.label}</button>
            ))}
          </div>
        </div>
      )}

      <div className={styles.searchRow}>
        <div className={styles.searchWrapper}>
          <span className={styles.searchIcon}>🔍</span>
          <input
            className={styles.searchInput}
            type="search"
            placeholder="Cerca un mòdul..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            autoComplete="off"
          />
          {query && (
            <button className={styles.searchClear} onClick={() => setQuery('')}>✕</button>
          )}
        </div>
      </div>

      <div className={styles.moduleList}>
        {totalVisible === 0 && (
          <p className={styles.noResults}>
            {query
              ? `Cap mòdul coincideix amb "${query}"`
              : 'Cap mòdul en aquest nivell encara.'}
          </p>
        )}
        {filteredTopics.map(topic => (
          <div key={topic.label} className={styles.topicSection}>
            <h2 className={styles.topicHeader}>{topic.label}</h2>
            {topic.modules.map(meta => (
              <ModuleCard
                key={meta.id}
                meta={meta}
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
        ))}
      </div>
    </div>
  )
}
