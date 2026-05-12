import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { useTheme } from '../context/ThemeContext'
import { AREAS } from '../data/areaRegistry'
import styles from './AreaSelector.module.css'

function AreaCard({ area, completedCount, onSelect }) {
  const total = area.modules.length
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

  const handleSelect = (areaId) => {
    setNavigationState({ currentAreaId: areaId })
    navigate('/modules')
  }

  return (
    <div className={styles.screen}>
      <header className={styles.header}>
        <button className={styles.back} onClick={() => navigate('/')}>← Tornar</button>
        <h1 className={styles.title}>Àrees de coneixement</h1>
        <p className={styles.subtitle}>
          {theme.missionWord ? `Tria on vols explorar avui` : 'Tria on vols explorar avui'}
        </p>
      </header>

      <div className={styles.areaList}>
        {AREAS.map(area => (
          <AreaCard
            key={area.id}
            area={area}
            completedCount={area.modules.filter(id => completedModules.includes(id)).length}
            onSelect={handleSelect}
          />
        ))}
      </div>
    </div>
  )
}
