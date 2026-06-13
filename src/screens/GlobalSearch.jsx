import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { MODULE_REGISTRY } from '../data/moduleRegistry'
import { LEARNING_PATHS } from '../data/learningPaths'
import { MICROCAPSULES } from '../data/microcapsules'
import { getAreaForModule } from '../data/areaRegistry'
import styles from './GlobalSearch.module.css'

function highlight(text, query) {
  if (!query) return text
  const idx = text.toLowerCase().indexOf(query.toLowerCase())
  if (idx === -1) return text
  return (
    <>
      {text.slice(0, idx)}
      <mark className={styles.mark}>{text.slice(idx, idx + query.length)}</mark>
      {text.slice(idx + query.length)}
    </>
  )
}

export default function GlobalSearch() {
  const navigate = useNavigate()
  const { setNavigationState, completedModules } = useApp()
  const [query, setQuery] = useState('')

  const q = query.trim().toLowerCase()

  const results = useMemo(() => {
    if (!q) return { modules: [], paths: [], capsules: [] }

    const modules = MODULE_REGISTRY
      .filter(m => m.title.toLowerCase().includes(q))
      .slice(0, 8)
      .map(m => ({ ...m, minutes: Math.round((m.xp || 200) / 20), type: 'module' }))

    const paths = LEARNING_PATHS
      .filter(p => p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q))
      .slice(0, 4)
      .map(p => ({ ...p, type: 'path' }))

    const capsules = MICROCAPSULES
      .filter(c => c.title.toLowerCase().includes(q))
      .slice(0, 6)
      .map(c => ({ ...c, type: 'capsule' }))

    return { modules, paths, capsules }
  }, [q])

  const total = results.modules.length + results.paths.length + results.capsules.length

  const handleModule = (moduleId) => {
    // trobar la ruta que conté el mòdul
    const path = LEARNING_PATHS.find(p => p.modules.some(m => m.id === moduleId))
    if (path) {
      setNavigationState({ currentPathId: path.id })
      navigate('/path')
    } else {
      const area = getAreaForModule(moduleId)
      if (area) {
        setNavigationState({ currentAreaId: area.id })
        navigate('/modules')
      }
    }
  }

  const handlePath = (pathId) => {
    setNavigationState({ currentPathId: pathId })
    navigate('/path')
  }

  const handleCapsule = (capsuleId) => {
    setNavigationState({ currentCapsuleId: capsuleId })
    navigate('/capsule')
  }

  return (
    <div className={styles.screen}>
      <header className={styles.header}>
        <button className={styles.back} onClick={() => navigate('/')}>← Tornar</button>
        <div className={styles.searchWrapper}>
          <span className={styles.icon}>🔍</span>
          <input
            className={styles.input}
            type="search"
            placeholder="Cerca mòduls, itineraris, càpsules..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            autoFocus
            autoComplete="off"
          />
          {query && (
            <button className={styles.clear} onClick={() => setQuery('')}>✕</button>
          )}
        </div>
      </header>

      {!q && (
        <div className={styles.empty}>
          <div className={styles.emptyEmoji}>🔍</div>
          <p className={styles.emptyText}>Escriu per cercar entre {MODULE_REGISTRY.length} mòduls, {LEARNING_PATHS.length} itineraris i {MICROCAPSULES.length} càpsules.</p>
        </div>
      )}

      {q && total === 0 && (
        <div className={styles.empty}>
          <div className={styles.emptyEmoji}>😶</div>
          <p className={styles.emptyText}>Cap resultat per "{query}"</p>
        </div>
      )}

      {results.modules.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Mòduls</h2>
          {results.modules.map(m => {
            const done = completedModules.includes(m.id)
            return (
              <button key={m.id} className={styles.result} onClick={() => handleModule(m.id)}>
                <span className={styles.rEmoji}>{m.emoji}</span>
                <div className={styles.rInfo}>
                  <div className={styles.rTitle}>{highlight(m.title, query)}</div>
                  <div className={styles.rSub}>{m.minutes} min{done ? ' · ✓ Completat' : ''}</div>
                </div>
                <span className={styles.rArrow}>›</span>
              </button>
            )
          })}
        </section>
      )}

      {results.paths.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Itineraris</h2>
          {results.paths.map(p => (
            <button key={p.id} className={styles.result} onClick={() => handlePath(p.id)}>
              <span className={styles.rEmoji}>{p.emoji}</span>
              <div className={styles.rInfo}>
                <div className={styles.rTitle}>{highlight(p.title, query)}</div>
                <div className={styles.rSub}>{p.modules.length} mòduls · {p.durationEstimate}</div>
              </div>
              <span className={styles.rArrow}>›</span>
            </button>
          ))}
        </section>
      )}

      {results.capsules.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Micro-càpsules</h2>
          {results.capsules.map(c => (
            <button key={c.id} className={styles.result} onClick={() => handleCapsule(c.id)}>
              <span className={styles.rEmoji}>{c.emoji}</span>
              <div className={styles.rInfo}>
                <div className={styles.rTitle}>{highlight(c.title, query)}</div>
                <div className={styles.rSub}>{c.duration} min · +15 XP</div>
              </div>
              <span className={styles.rArrow}>›</span>
            </button>
          ))}
        </section>
      )}
    </div>
  )
}
