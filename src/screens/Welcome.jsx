/**
 * Welcome.jsx
 *
 * Pantalla de primer cop. Apareix una sola vegada.
 * Presenta la narrativa i el concepte de l'Acadèmia.
 * Marca firstTime = false al storage i redirigeix a Home.
 */

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import storage from '../storage/storageProvider'
import styles from './Welcome.module.css'

const SLIDES = [
  {
    emoji: '🌌',
    title: 'Benvingut a l\'Acadèmia Còsmica',
    text: 'El coneixement de l\'univers s\'ha fragmentat. La teva missió és reconstruir-lo peça a peça.'
  },
  {
    emoji: '🧑‍🚀',
    title: 'Pensa com un científic',
    text: 'No memoritzaràs dades. Aprendràs a observar, predir i entendre. Cada lliçó és una missió.'
  },
  {
    emoji: '⭐',
    title: 'Guanya XP i insígnies',
    text: 'La teva confiança importa. Encertar amb seguretat et dona bonus. Equivocar-te amb seguretat, penalitza. Pensa bé abans de respondre.'
  }
]

export default function Welcome() {
  const navigate  = useNavigate()
  const [slide, setSlide] = useState(0)
  const [exiting, setExiting] = useState(false)

  const isLast = slide === SLIDES.length - 1

  const handleNext = () => {
    if (!isLast) {
      setSlide(s => s + 1)
    } else {
      setExiting(true)
      storage.set('firstTime', false)
      setTimeout(() => navigate('/'), 400)
    }
  }

  const current = SLIDES[slide]

  return (
    <div className={`${styles.screen} ${exiting ? styles.exiting : ''}`}>
      {/* Indicadors de pàgina */}
      <div className={styles.dots}>
        {SLIDES.map((_, i) => (
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
          {isLast ? '🚀 Iniciar missió' : 'Continua →'}
        </button>
        {!isLast && (
          <button
            className={styles.skipBtn}
            onClick={() => {
              storage.set('firstTime', false)
              navigate('/')
            }}
          >
            Saltar
          </button>
        )}
      </div>
    </div>
  )
}
