import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { GLOSSARY, searchGlossary } from '../data/glossary'
import { AREAS } from '../data/areaRegistry'
import styles from './Glossary.module.css'

const AREA_LABELS = Object.fromEntries(AREAS.map(a => [a.id, { label: a.label, emoji: a.emoji, color: a.accentColor }]))

export default function Glossary() {
  const navigate   = useNavigate()
  const [query, setQuery]       = useState('')
  const [areaFilter, setArea]   = useState(null)
  const [expanded, setExpanded] = useState(null)

  const results = useMemo(
    () => searchGlossary(GLOSSARY, query, areaFilter),
    [query, areaFilter]
  )

  const areaIds = [...new Set(GLOSSARY.map(t => t.areaId))]

  return (
    <div className={styles.screen}>
      <header className={styles.header}>
        <button className={styles.back} onClick={() => navigate('/')}>← Tornar</button>
        <h1 className={styles.title}>Glossari</h1>
        <p className={styles.subtitle}>{GLOSSARY.length} termes clau</p>
      </header>

      {/* Cerca */}
      <div className={styles.searchRow}>
        <div className={styles.searchWrapper}>
          <span className={styles.searchIcon}>🔍</span>
          <input
            type="search"
            className={styles.searchInput}
            placeholder="Cerca un terme..."
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          {query && (
            <button className={styles.searchClear} onClick={() => setQuery('')}>✕</button>
          )}
        </div>
      </div>

      {/* Filtres per àrea */}
      <div className={styles.filters}>
        <button
          className={`${styles.filterChip} ${!areaFilter ? styles.filterActive : ''}`}
          onClick={() => setArea(null)}
        >
          Tots
        </button>
        {areaIds.map(id => {
          const meta = AREA_LABELS[id]
          if (!meta) return null
          return (
            <button
              key={id}
              className={`${styles.filterChip} ${areaFilter === id ? styles.filterActive : ''}`}
              style={{ '--chip-color': meta.color }}
              onClick={() => setArea(areaFilter === id ? null : id)}
            >
              {meta.emoji} {meta.label}
            </button>
          )
        })}
      </div>

      {/* Resultats */}
      {results.length === 0 ? (
        <div className={styles.empty}>
          <div className={styles.emptyIcon}>🔭</div>
          <p className={styles.emptyText}>Cap terme coincideix amb la cerca</p>
        </div>
      ) : (
        <div className={styles.termList}>
          {results.map(term => {
            const meta = AREA_LABELS[term.areaId]
            const isOpen = expanded === term.id
            return (
              <button
                key={term.id}
                className={`${styles.termCard} ${isOpen ? styles.termOpen : ''}`}
                style={{ '--term-color': meta?.color }}
                onClick={() => setExpanded(isOpen ? null : term.id)}
              >
                <div className={styles.termTop}>
                  <span className={styles.termName}>{term.term}</span>
                  {meta && (
                    <span className={styles.termArea} style={{ color: meta.color }}>
                      {meta.emoji}
                    </span>
                  )}
                  <span className={styles.termCaret}>{isOpen ? '▲' : '▼'}</span>
                </div>
                {isOpen && (
                  <p className={styles.termDef}>{term.definition}</p>
                )}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
