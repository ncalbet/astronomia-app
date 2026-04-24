/**
 * ItinerarySelector.jsx
 *
 * Pantalla de selecció d'itinerari quan un mòdul en té més d'un.
 * Mostra cada itinerari amb la seva descripció i estat de progrés.
 * L'usuari tria i es carrega el flux de lliçons corresponent.
 */

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { useTheme } from '../context/ThemeContext'
import { loadModule } from '../data/moduleRegistry'
import styles from './ItinerarySelector.module.css'

export default function ItinerarySelector() {
  const navigate = useNavigate()
  const { navigationState, setNavigationState, isItineraryCompleted } = useApp()
  const { theme } = useTheme()

  const [moduleData, setModuleData] = useState(null)
  const [loading, setLoading]       = useState(true)

  const { currentModuleId } = navigationState

  useEffect(() => {
    if (!currentModuleId) { navigate('/modules'); return }
    loadModule(currentModuleId)
      .then(data => { setModuleData(data); setLoading(false) })
      .catch(() => navigate('/modules'))
  }, [currentModuleId])

  if (loading || !moduleData) {
    return <div className={styles.loading}>Carregant...</div>
  }

  const handleSelect = (itineraryId) => {
    setNavigationState({
      currentItineraryId: itineraryId,
      currentLessonId: null,
      currentStep: 0
    })
    navigate('/lesson')
  }

  return (
    <div className={styles.screen}>
      <header className={styles.header}>
        <button className={styles.back} onClick={() => navigate('/modules')}>
          ← {theme.missionWord}s
        </button>
      </header>

      <div className={styles.intro}>
        <div className={styles.moduleEmoji}>{moduleData.emoji || '🔭'}</div>
        <h1 className={styles.title}>{moduleData.title}</h1>
        <p className={styles.subtitle}>Escull com vols explorar aquest tema</p>
      </div>

      <div className={styles.itineraries}>
        {moduleData.itineraries.map((itin) => {
          const completed = isItineraryCompleted(currentModuleId, itin.id)
          return (
            <button
              key={itin.id}
              className={`${styles.card} ${completed ? styles.completed : ''}`}
              onClick={() => handleSelect(itin.id)}
            >
              <div className={styles.cardTop}>
                <span className={styles.cardIcon}>{itin.icon}</span>
                {completed && <span className={styles.completedBadge}>✓ Completat</span>}
              </div>
              <h2 className={styles.cardTitle}>{itin.title}</h2>
              <p className={styles.cardDesc}>{itin.description}</p>
              <div className={styles.cardMeta}>
                {itin.lessons.length} lliçons · {itin.style}
              </div>
              <div className={styles.cardCta}>
                {completed ? 'Repetir itinerari →' : 'Començar →'}
              </div>
            </button>
          )
        })}
      </div>

      <p className={styles.hint}>
        Pots completar els dos itineraris — el progrés es guarda per separat
      </p>
    </div>
  )
}
