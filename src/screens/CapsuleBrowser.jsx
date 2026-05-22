import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { MICROCAPSULES } from '../data/microcapsules'
import { AREAS } from '../data/areaRegistry'
import styles from './CapsuleBrowser.module.css'

const AREA_META = Object.fromEntries(AREAS.map(a => [a.id, { label: a.label, color: a.accentColor, emoji: a.emoji }]))

const DURATION_COLOR = { 2: 'var(--color-success)', 3: 'var(--color-accent)', 5: 'var(--color-warning)' }

export default function CapsuleBrowser() {
  const navigate = useNavigate()
  const { setNavigationState } = useApp()

  const handleOpen = (capsule) => {
    setNavigationState({ currentCapsuleId: capsule.id })
    navigate('/capsule')
  }

  return (
    <div className={styles.screen}>
      <header className={styles.header}>
        <button className={styles.back} onClick={() => navigate('/')}>← Tornar</button>
        <h1 className={styles.title}>Micro-càpsules</h1>
        <p className={styles.subtitle}>{MICROCAPSULES.length} lliçons de 2-5 minuts</p>
      </header>

      <div className={styles.grid}>
        {MICROCAPSULES.map(cap => {
          const area = AREA_META[cap.areaId]
          return (
            <button
              key={cap.id}
              className={styles.card}
              style={{ '--cap-color': area?.color }}
              onClick={() => handleOpen(cap)}
            >
              <div className={styles.cardTop}>
                <span className={styles.cardEmoji}>{cap.emoji}</span>
                <span
                  className={styles.durationTag}
                  style={{ color: DURATION_COLOR[cap.duration] || 'var(--color-text-faint)' }}
                >
                  {cap.duration} min
                </span>
              </div>
              <div className={styles.cardTitle}>{cap.title}</div>
              {area && (
                <div className={styles.cardArea} style={{ color: area.color }}>
                  {area.emoji} {area.label}
                </div>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
