import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { useTheme } from '../context/ThemeContext'
import { AREAS, getAreaModules } from '../data/areaRegistry'
import styles from './AreaSelector.module.css'

function MapCard({ area, completedCount, onSelect }) {
  const total = getAreaModules(area).length
  const pct   = total > 0 ? Math.round((completedCount / total) * 100) : 0

  return (
    <button
      className={styles.mapCard}
      style={{ '--area-accent': area.accentColor, '--pct': pct }}
      onClick={() => onSelect(area.id)}
    >
      <div className={styles.mapRing}>
        <span className={styles.mapEmoji}>{area.emoji}</span>
      </div>
      <div className={styles.mapLabel}>{area.label}</div>
      <div className={styles.mapCount}>{completedCount}/{total}</div>
    </button>
  )
}

function AreaCard({ area, completedCount, onSelect }) {
  const total = getAreaModules(area).length
  const pct   = total > 0 ? Math.round((completedCount / total) * 100) : 0
  const done  = completedCount === total && total > 0

  return (
    <button
      className={`${styles.areaCard} ${done ? styles.done : ''}`}
      style={{ '--area-accent': area.accentColor }}
      onClick={() => onSelect(area.id)}
    >
      <div className={styles.cardTop}>
        <span className={styles.emoji}>{area.emoji}</span>
        <div className={styles.info}>
          <div className={styles.label}>{area.label}</div>
          <div className={styles.desc}>{area.description}</div>
        </div>
        {done && <div className={styles.doneBadge}>✓</div>}
      </div>

      <div className={styles.footer}>
        <div className={styles.progressTrack}>
          <div className={styles.progressFill} style={{ width: `${pct}%` }} />
        </div>
        <span className={styles.count}>{completedCount} / {total}</span>
      </div>
    </button>
  )
}

export default function AreaSelector() {
  const navigate = useNavigate()
  const { completedModules, setNavigationState } = useApp()
  const { theme } = useTheme()
  const [viewMode, setViewMode] = useState('list')

  const handleSelect = (areaId) => {
    setNavigationState({ currentAreaId: areaId })
    navigate('/modules')
  }

  const areaProps = AREAS.map(area => ({
    area,
    completedCount: getAreaModules(area).filter(id => completedModules.includes(id)).length,
  }))

  return (
    <div className={styles.screen}>
      <header className={styles.header}>
        <button className={styles.back} onClick={() => navigate('/')}>← Tornar</button>
        <div className={styles.titleRow}>
          <div>
            <h1 className={styles.title}>Àrees de coneixement</h1>
            <p className={styles.subtitle}>Tria on vols explorar avui</p>
          </div>
          <div className={styles.viewToggle}>
            <button
              className={`${styles.viewBtn} ${viewMode === 'list' ? styles.viewActive : ''}`}
              onClick={() => setViewMode('list')}
              title="Vista llista"
            >☰</button>
            <button
              className={`${styles.viewBtn} ${viewMode === 'map' ? styles.viewActive : ''}`}
              onClick={() => setViewMode('map')}
              title="Vista mapa"
            >◉</button>
          </div>
        </div>
      </header>

      {viewMode === 'list' ? (
        <div className={styles.areaList}>
          {areaProps.map(({ area, completedCount }) => (
            <AreaCard
              key={area.id}
              area={area}
              completedCount={completedCount}
              onSelect={handleSelect}
            />
          ))}
        </div>
      ) : (
        <div className={styles.mapGrid}>
          {areaProps.map(({ area, completedCount }) => (
            <MapCard
              key={area.id}
              area={area}
              completedCount={completedCount}
              onSelect={handleSelect}
            />
          ))}
        </div>
      )}
    </div>
  )
}
