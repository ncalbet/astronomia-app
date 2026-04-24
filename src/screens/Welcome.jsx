import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import storage from '../storage/storageProvider'
import styles from './Welcome.module.css'

export default function Welcome() {
  const navigate  = useNavigate()
  const { theme } = useTheme()
  const [slide, setSlide]   = useState(0)
  const [exiting, setExiting] = useState(false)

  const slides = theme.welcome.slides
  const isLast = slide === slides.length - 1
  const current = slides[slide]

  const handleNext = () => {
    if (!isLast) {
      setSlide(s => s + 1)
    } else {
      setExiting(true)
      storage.set('firstTime', false)
      setTimeout(() => navigate('/'), 400)
    }
  }

  return (
    <div className={`${styles.screen} ${exiting ? styles.exiting : ''}`}>
      <div className={styles.dots}>
        {slides.map((_, i) => (
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
          {isLast ? `🚀 Iniciar ${theme.missionWord.toLowerCase()}` : 'Continua →'}
        </button>
        {!isLast && (
          <button
            className={styles.skipBtn}
            onClick={() => { storage.set('firstTime', false); navigate('/') }}
          >
            Saltar
          </button>
        )}
      </div>
    </div>
  )
}
