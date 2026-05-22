import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import { useApp } from '../context/AppContext'
import { AREAS } from '../data/areaRegistry'
import storage from '../storage/storageProvider'
import styles from './Welcome.module.css'

const QUIZ_QUESTIONS = [
  {
    key: 'sessionTime',
    question: 'Quant temps tens per sessió?',
    options: [
      { value: '5',  label: '5–10 min', sub: 'Poc a poc cada dia' },
      { value: '15', label: '15–20 min', sub: 'Un bon ritme' },
      { value: '30', label: '30+ min', sub: 'Submersió profunda' },
    ],
  },
  {
    key: 'level',
    question: 'Quin és el teu punt de partida?',
    options: [
      { value: 'new',         label: 'Sóc nou',               sub: 'Comencem des de zero' },
      { value: 'some',        label: 'Ja en sé alguna cosa',   sub: 'Tinc bases' },
      { value: 'experienced', label: 'Tinc molt de fons',      sub: 'Vull aprofundir' },
    ],
  },
]

function finish(storage) {
  storage.set('firstTime', false)
}

export default function Welcome() {
  const navigate  = useNavigate()
  const { theme } = useTheme()
  const { setNavigationState, setUserProfile } = useApp()
  const [slide, setSlide]           = useState(0)
  const [showQuiz, setShowQuiz]     = useState(false)
  const [showPicker, setShowPicker] = useState(false)
  const [quizStep, setQuizStep]     = useState(0)
  const [quizAnswers, setQuizAnswers] = useState({})
  const [exiting, setExiting]       = useState(false)

  const slides = theme.welcome.slides
  const isLast = slide === slides.length - 1
  const current = slides[slide]
  const totalDots = slides.length + 2  // slides + quiz + area picker

  const handleNext = () => {
    if (!isLast) {
      setSlide(s => s + 1)
    } else {
      setShowQuiz(true)
    }
  }

  const handleSkip = () => {
    finish(storage)
    navigate('/home')
  }

  const handleQuizAnswer = (key, value) => {
    const newAnswers = { ...quizAnswers, [key]: value }
    setQuizAnswers(newAnswers)
    if (quizStep < QUIZ_QUESTIONS.length - 1) {
      setQuizStep(s => s + 1)
    } else {
      setUserProfile(newAnswers)
      setShowQuiz(false)
      setShowPicker(true)
    }
  }

  const handlePickArea = (areaId) => {
    finish(storage)
    setNavigationState({ currentAreaId: areaId })
    setExiting(true)
    setTimeout(() => navigate('/modules'), 400)
  }

  if (showQuiz) {
    const q = QUIZ_QUESTIONS[quizStep]
    return (
      <div className={styles.screen}>
        <div className={styles.dots}>
          {Array.from({ length: totalDots }).map((_, i) => (
            <div key={i} className={`${styles.dot} ${i === slides.length ? styles.dotActive : ''}`} />
          ))}
        </div>
        <div className={styles.quizContent}>
          <div className={styles.quizStep}>{quizStep + 1} / {QUIZ_QUESTIONS.length}</div>
          <h1 className={styles.quizQuestion}>{q.question}</h1>
          <div className={styles.quizOptions}>
            {q.options.map(opt => (
              <button
                key={opt.value}
                className={`${styles.quizOption} ${quizAnswers[q.key] === opt.value ? styles.quizOptionSelected : ''}`}
                onClick={() => handleQuizAnswer(q.key, opt.value)}
              >
                <span className={styles.quizOptionLabel}>{opt.label}</span>
                <span className={styles.quizOptionSub}>{opt.sub}</span>
              </button>
            ))}
          </div>
        </div>
        <div className={styles.footer}>
          <button className={styles.skipBtn} onClick={handleSkip}>Saltar</button>
        </div>
      </div>
    )
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
