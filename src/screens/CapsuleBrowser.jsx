import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { MICROCAPSULES } from '../data/microcapsules'
import { AREAS } from '../data/areaRegistry'
import styles from './CapsuleBrowser.module.css'

const AREA_META = Object.fromEntries(AREAS.map(a => [a.id, { label: a.label, color: a.accentColor, emoji: a.emoji }]))
const DURATION_COLOR = { 2: 'var(--color-success)', 3: 'var(--color-accent)', 5: 'var(--color-warning)' }

// Agrupa les càpsules per àrea, respectant l'ordre de AREAS
const capsulesByArea = AREAS.reduce((acc, area) => {
  const caps = MICROCAPSULES.filter(c => c.areaId === area.id)
  if (caps.length > 0) acc.push({ area, caps })
  return acc
}, [])

// Càpsules sense àrea coneguda al final
const knownAreaIds = new Set(AREAS.map(a => a.id))
const orphanCaps = MICROCAPSULES.filter(c => !knownAreaIds.has(c.areaId))

export default function CapsuleBrowser() {
  const navigate = useNavigate()
  const { setNavigationState } = useApp()

  const handleOpen = (capsule) => {
    setNavigationState({ currentCapsuleId: capsule.id })
    navigate('/capsule')
  }

  const renderCard = (cap) => {
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
      </button>
    )
  }

  return (
    <div className={styles.screen}>
      <header className={styles.header}>
        <button className={styles.back} onClick={() => navigate('/')}>← Tornar</button>
        <h1 className={styles.title}>Micro-càpsules</h1>
        <p className={styles.subtitle}>{MICROCAPSULES.length} lliçons de 2-5 minuts</p>
      </header>

      <div className={styles.sections}>
        {capsulesByArea.map(({ area, caps }) => (
          <section key={area.id} className={styles.section}>
            <div className={styles.sectionHeader} style={{ '--sec-color': area.accentColor }}>
              <span className={styles.sectionEmoji}>{area.emoji}</span>
              <span className={styles.sectionLabel}>{area.label}</span>
              <span className={styles.sectionCount}>{caps.length}</span>
            </div>
            <div className={styles.grid}>
              {caps.map(renderCard)}
            </div>
          </section>
        ))}
        {orphanCaps.length > 0 && (
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionLabel}>Altres</span>
              <span className={styles.sectionCount}>{orphanCaps.length}</span>
            </div>
            <div className={styles.grid}>{orphanCaps.map(renderCard)}</div>
          </section>
        )}
      </div>
    </div>
  )
}
