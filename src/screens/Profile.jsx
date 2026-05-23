import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { useTheme } from '../context/ThemeContext'
import { calculateLevel, getLevelTitle } from '../engine/xpEngine'
import { BADGES } from '../engine/badgeEngine'
import { AREAS, getAreaModules } from '../data/areaRegistry'
import { MODULE_REGISTRY } from '../data/moduleRegistry'
import { MICROCAPSULES } from '../data/microcapsules'
import { LEARNING_PATHS } from '../data/learningPaths'
import styles from './Profile.module.css'

const TOTAL_MODULES = MODULE_REGISTRY.length
const TOTAL_CAPSULES = MICROCAPSULES.length

const RARITY_ORDER = { common: 0, uncommon: 1, rare: 2, epic: 3 }
const BADGE_LIST = Object.values(BADGES).sort((a, b) => RARITY_ORDER[a.rarity] - RARITY_ORDER[b.rarity])

const RARITY_LABEL = { common: 'Comú', uncommon: 'Poc comú', rare: 'Rar', epic: 'Èpic' }

const PROFILE_FIELDS = [
  {
    key: 'sessionTime',
    label: 'Temps per sessió',
    options: [
      { value: '5',  label: '5–10 min', sub: 'Poc a poc cada dia' },
      { value: '15', label: '15–20 min', sub: 'Un bon ritme' },
      { value: '30', label: '30+ min',   sub: 'Submersió profunda' },
    ],
  },
  {
    key: 'level',
    label: 'Punt de partida',
    options: [
      { value: 'new',         label: 'Sóc nou',            sub: 'Des de zero' },
      { value: 'some',        label: 'Tinc algunes bases',  sub: 'Conec els fonaments' },
      { value: 'experienced', label: 'Tinc molt de fons',   sub: 'Vull aprofundir' },
    ],
  },
  {
    key: 'interest',
    label: 'Àmbit preferit',
    options: [
      { value: 'ciencies',  label: 'Ciències i Univers',  sub: 'Física, astronomia, biologia' },
      { value: 'historia',  label: 'Història i Cultura',   sub: 'Civilitzacions, arts, passats' },
      { value: 'pensament', label: 'Filosofia i Ment',     sub: 'Raonament, psicologia, ètica' },
      { value: 'societat',  label: 'Societat i Món',       sub: 'Economia, política, relacions' },
    ],
  },
]

export default function Profile() {
  const navigate = useNavigate()
  const {
    xp, badges, completedModules, completedCapsules,
    srStreak, srStreakMax, weekXP, weekModules, weekReviews, weekStart,
    userProfile, setUserProfile,
  } = useApp()
  const { theme } = useTheme()

  const [saved, setSaved] = useState(false)
  const [copied, setCopied] = useState(false)
  const [selectedBadge, setSelectedBadge] = useState(null)

  const { level, xpInLevel, xpForNext, progress } = calculateLevel(xp)
  const levelTitle = getLevelTitle(level, theme.levelTitles)

  const estimatedMinutes = completedModules.length * 15
  const hours = Math.floor(estimatedMinutes / 60)
  const mins  = estimatedMinutes % 60

  const completedPaths = LEARNING_PATHS.filter(p =>
    p.modules.every(m => completedModules.includes(m.id))
  ).length

  const registryIds = new Set(MODULE_REGISTRY.map(m => m.id))
  const areaStats = AREAS.map(area => {
    const mods = getAreaModules(area).filter(id => registryIds.has(id))
    const done = mods.filter(id => completedModules.includes(id)).length
    return { area, done, total: mods.length, pct: mods.length > 0 ? Math.round((done / mods.length) * 100) : 0 }
  })

  const weekLabel = weekStart
    ? new Date(weekStart).toLocaleDateString('ca-ES', { day: 'numeric', month: 'short' })
    : '—'

  const handleChange = (key, value) => {
    const current = userProfile || {}
    setUserProfile({ ...current, [key]: value })
    setSaved(true)
    setTimeout(() => setSaved(false), 1800)
  }

  const handleShare = async () => {
    const lines = [
      '📊 El meu progrés a Acadèmia Còsmica',
      `Nivell ${level} · ${xp.toLocaleString('ca-ES')} XP`,
      `${completedModules.length}/${TOTAL_MODULES} mòduls · ${completedPaths}/${LEARNING_PATHS.length} itineraris`,
      `${(completedCapsules || []).length}/${TOTAL_CAPSULES} càpsules · ${badges.length} insígnies`,
      srStreak > 0 ? `🔥 Streak de ${srStreak} dies` : null,
      '—',
      'https://astronomia-app.vercel.app',
    ].filter(Boolean).join('\n')

    if (navigator.share) {
      try { await navigator.share({ text: lines, title: 'Acadèmia Còsmica' }) } catch {}
    } else {
      await navigator.clipboard.writeText(lines)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const current = userProfile || {}
  const selectedBadgeData = selectedBadge ? BADGES[selectedBadge] : null

  return (
    <div className={styles.screen}>

      {/* Modal detall insígnia */}
      {selectedBadgeData && (
        <div className={styles.badgeOverlay} onClick={() => setSelectedBadge(null)}>
          <div className={styles.badgePopup} onClick={e => e.stopPropagation()}>
            <div className={styles.badgePopupEmoji}>{selectedBadgeData.emoji}</div>
            <div className={styles.badgePopupName}>{selectedBadgeData.name}</div>
            <div className={styles.badgePopupDesc}>{selectedBadgeData.description}</div>
            <div className={`${styles.badgePopupRarity} ${styles[selectedBadgeData.rarity]}`}>
              {RARITY_LABEL[selectedBadgeData.rarity] || selectedBadgeData.rarity}
            </div>
            {!badges.includes(selectedBadge) && (
              <div className={styles.badgeHint}>
                <span className={styles.badgeHintLabel}>Com aconseguir-la</span>
                {selectedBadgeData.hint}
              </div>
            )}
            <button className={styles.badgePopupClose} onClick={() => setSelectedBadge(null)}>Tancar</button>
          </div>
        </div>
      )}

      <header className={styles.header}>
        <button className={styles.back} onClick={() => navigate('/')}>← Tornar</button>
        <div className={styles.titleRow}>
          <h1 className={styles.title}>El meu perfil</h1>
          <button className={styles.shareBtn} onClick={handleShare}>
            {copied ? '✓ Copiat' : '↑ Compartir'}
          </button>
        </div>
      </header>

      {/* Identitat */}
      <div className={styles.identityCard}>
        <div className={styles.identityEmoji}>🌌</div>
        <div className={styles.identityInfo}>
          <div className={styles.identityTitle}>{levelTitle}</div>
          <div className={styles.identitySub}>Nivell {level}</div>
        </div>
        <div className={styles.xpBadge}>
          <span className={styles.xpValue}>{xp.toLocaleString('ca-ES')}</span>
          <span className={styles.xpLabel}>XP</span>
        </div>
      </div>

      {/* Barra XP */}
      <div className={styles.xpSection}>
        <div className={styles.xpBarTrack}>
          <div className={styles.xpBarFill} style={{ width: `${progress * 100}%` }} />
        </div>
        <p className={styles.xpHint}>{xpInLevel} / {xpForNext} XP fins al nivell {level + 1}</p>
      </div>

      {/* Estadístiques globals */}
      <div className={styles.card}>
        <div className={styles.cardRow}>
          <div className={styles.stat}>
            <div className={styles.statValue}>
              {completedModules.length}<span className={styles.statOf}>/{TOTAL_MODULES}</span>
            </div>
            <div className={styles.statLabel}>Mòduls</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statValue}>
              {(completedCapsules || []).length}<span className={styles.statOf}>/{TOTAL_CAPSULES}</span>
            </div>
            <div className={styles.statLabel}>Càpsules</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statValue}>
              {completedPaths}<span className={styles.statOf}>/{LEARNING_PATHS.length}</span>
            </div>
            <div className={styles.statLabel}>Itineraris</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statValue}>
              {hours > 0 ? `${hours}h ${mins}m` : `${mins}m`}
            </div>
            <div className={styles.statLabel}>Estudi est.</div>
          </div>
        </div>
      </div>

      {/* Streak */}
      <div className={styles.card}>
        <div className={styles.cardRow}>
          <div className={styles.stat}>
            <div className={`${styles.statValue} ${styles.fire}`}>🔥 {srStreak || 0}</div>
            <div className={styles.statLabel}>Streak actual</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statValue}>{srStreakMax || 0}</div>
            <div className={styles.statLabel}>Millor streak</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statValue}>{badges.length}<span className={styles.statOf}>/{BADGE_LIST.length}</span></div>
            <div className={styles.statLabel}>Insígnies</div>
          </div>
        </div>
      </div>

      {/* Insígnies */}
      <div className={styles.card}>
        <div className={styles.cardTitle}>Insígnies</div>
        <div className={styles.badgeGrid}>
          {BADGE_LIST.map(badge => {
            const earned = badges.includes(badge.id)
            return (
              <button
                key={badge.id}
                className={`${styles.badgeItem} ${earned ? styles.badgeEarned : styles.badgeFaded}`}
                onClick={() => setSelectedBadge(badge.id)}
                title={badge.name}
              >
                <span className={styles.badgeEmoji}>{badge.emoji}</span>
                <span className={styles.badgeName}>{badge.name}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Setmana actual */}
      <div className={styles.card}>
        <div className={styles.cardTitle}>Setmana des del {weekLabel}</div>
        <div className={styles.cardRow}>
          <div className={styles.stat}>
            <div className={styles.statValue}>{weekXP || 0}</div>
            <div className={styles.statLabel}>XP guanyats</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statValue}>{weekModules || 0}</div>
            <div className={styles.statLabel}>Mòduls</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statValue}>{weekReviews || 0}</div>
            <div className={styles.statLabel}>Repassos</div>
          </div>
        </div>
      </div>

      {/* Progrés per àrea */}
      <div className={styles.card}>
        <div className={styles.cardTitle}>Progrés per àrea</div>
        {areaStats.map(({ area, done, total, pct }) => (
          <div key={area.id} className={styles.areaRow}>
            <div className={styles.areaLeft}>
              <span className={styles.areaEmoji}>{area.emoji}</span>
              <span className={styles.areaName}>{area.label}</span>
            </div>
            <div className={styles.areaRight}>
              <div className={styles.areaTrack}>
                <div
                  className={styles.areaFill}
                  style={{ width: `${pct}%`, '--area-color': area.accentColor }}
                />
              </div>
              <span className={styles.areaPct}>{done}/{total}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Preferències d'aprenentatge */}
      <div className={styles.card}>
        <div className={styles.cardTitle}>
          Preferències d'aprenentatge
          {saved && <span className={styles.savedBadge}>Desat ✓</span>}
        </div>
        {!userProfile && (
          <p className={styles.emptyNote}>
            No has completat el quiz de benvinguda. Selecciona les opcions que millor et descriuen.
          </p>
        )}
        <div className={styles.fields}>
          {PROFILE_FIELDS.map(field => (
            <div key={field.key} className={styles.field}>
              <div className={styles.fieldLabel}>{field.label}</div>
              <div className={styles.options}>
                {field.options.map(opt => {
                  const isSelected = current[field.key] === opt.value
                  return (
                    <button
                      key={opt.value}
                      className={`${styles.option} ${isSelected ? styles.optionSelected : ''}`}
                      onClick={() => handleChange(field.key, opt.value)}
                    >
                      <span className={styles.optionLabel}>{opt.label}</span>
                      <span className={styles.optionSub}>{opt.sub}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
