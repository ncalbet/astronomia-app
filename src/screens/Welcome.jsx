import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import { useApp } from '../context/AppContext'
import { AREAS } from '../data/areaRegistry'
import storage from '../storage/storageProvider'
import styles from './Welcome.module.css'

function finish(storage) {
  storage.set('firstTime', false)
}

export default function Welcome() {
  const navigate  = useNavigate()
  const { theme } = useTheme()
  const { setNavigationState } = useApp()
  const [slide, setSlide]       = useState(0)
  const [showPicker, setShowPicker] = useState(false)
  const [exiting, setExiting]   = useState(false)

  const slides = theme.welcome.slides
  const isLast = slide === slides.length - 1
  const current = slides[slide]
  const totalDots = slides.length + 1  // +1 per al pas del selector

  const handleNext = () => {
    if (!isLast) {
      setSlide(s => s + 1)
    } else {
      setShowPicker(true)
    }
  }

  const handleSkip = () => {
    finish(storage)
    navigate('/home')
  }

  const handlePickArea = (areaId) => {
    finish(storage)
    setNavigationState({ currentAreaId: areaId })
    setExiting(true)
    setTimeout(() => navigate('/modules'), 400)
  }

  if (showPicker) {
    return (
      <div className={`${styles.screen} ${exiting ? styles.exiting : ''}`}>
        <div className={styles.dots}>
          {Array.from({ length: totalDots }).map((_, i) => (
            <div key={i} className={`${styles.dot} ${i === totalDots - 1 ? styles.dotActive : ''}`} />
          ))}
        </div>

        <div className={styles.pickerContent}>
          <h1 className={styles.pickerTitle}>Per on vols començar?</h1>
          <p className={styles.pickerSub}>Pots explorar totes les àrees quan vulguis.</p>
          <div className={styles.areaGrid}>
            {AREAS.map(area => (
              <button
                key={area.id}
                className={styles.areaBtn}
                onClick={() => handlePickArea(area.id)}
              >
                <span className={styles.areaEmoji}>{area.emoji}</span>
                <span className={styles.areaLabel}>{area.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className={styles.footer}>
          <button className={styles.skipBtn} onClick={handleSkip}>
            Explorar tot el catàleg
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={`${styles.screen} ${exiting ? styles.exiting : ''}`}>
      <div className={styles.dots}>
        {Array.from({ length: totalDots }).map((_, i) => (
          <div key={i} className={`${styles.dot} ${i === slide ? styles.dotActive : ''}`} />
        ))}
      </div>

      <div className={styles.content}>
        <div className={styles.emoji}>{current.emoji}</div>
        <h1 className={styles.title}>{current.title}</h1>
        <p className={styles.text}>{current.text}</p>
      </div>

      <div className={styles.footer}>
        <button className={styles.nextBtn} onClick={handleNext}>
          {isLast ? 'Continua →' : 'Continua →'}
        </button>
        {!isLast && (
          <button className={styles.skipBtn} onClick={handleSkip}>
            Saltar
          </button>
        )}
      </div>
    </div>
  )
}
