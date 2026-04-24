/**
 * RetrogradeSim.jsx
 *
 * Simulació interactiva del moviment retrògrad de Mart.
 *
 * Mecànica:
 *   - Terra orbita el Sol en 365 dies (velocitat angular major)
 *   - Mart orbita el Sol en 687 dies (velocitat angular menor)
 *   - Quan la Terra "adelanta" Mart, des de la Terra sembla que Mart va enrere
 *
 * Vistes:
 *   - ESPAI: òrbites des de dalt, es veu clarament la geometria
 *   - TERRA: posició aparent de Mart al cel nocturn (línia horitzontal)
 *
 * Controls: play/pausa, velocitat (x1, x3, x6)
 */

import { useEffect, useRef, useState, useCallback } from 'react'
import styles from './RetrogradeSim.module.css'

// Constants orbitals (proporcionals, no a escala real)
const SUN_R      = 10    // radi visual del Sol
const EARTH_R    = 6     // radi visual de la Terra
const MARS_R     = 8     // radi visual de Mart
const EARTH_ORBIT = 90  // radi de l'òrbita de la Terra (px)
const MARS_ORBIT  = 140  // radi de l'òrbita de Mart (px)

const EARTH_PERIOD = 365  // dies per volta
const MARS_PERIOD  = 687  // dies per volta

const SVG_SIZE = 300      // mida del SVG (quadrat)
const CX = SVG_SIZE / 2   // centre X
const CY = SVG_SIZE / 2   // centre Y

// Posició d'un planeta donats angle i radi d'òrbita
function planetPos(angle, orbitR) {
  return {
    x: CX + orbitR * Math.cos(angle),
    y: CY + orbitR * Math.sin(angle)
  }
}

// Angle aparent de Mart des de la Terra (en graus, 0-360)
function apparentAngle(earthAngle, marsAngle) {
  const e = planetPos(earthAngle, EARTH_ORBIT)
  const m = planetPos(marsAngle, MARS_ORBIT)
  const dx = m.x - e.x
  const dy = m.y - e.y
  let deg = Math.atan2(dy, dx) * (180 / Math.PI)
  if (deg < 0) deg += 360
  return deg
}

// Genera el path SVG d'una el·lipse (cercle aquí)
function orbitPath(r) {
  return `M ${CX - r},${CY} A ${r},${r} 0 1,1 ${CX + r - 0.01},${CY}`
}

// Historial de posicions aparents per dibuixar la traça
const MAX_TRACE = 120

export default function RetrogradeSim() {
  const [playing, setPlaying]   = useState(false)
  const [speed, setSpeed]       = useState(3)       // multiplicador
  const [view, setView]         = useState('space') // 'space' | 'earth'
  const [day, setDay]           = useState(0)
  const [trace, setTrace]       = useState([])      // posicions aparents de Mart
  const [insightShown, setInsightShown] = useState(false)

  const rafRef  = useRef(null)
  const lastRef = useRef(null)

  // Angles actuals
  const earthAngle = (day / EARTH_PERIOD) * 2 * Math.PI
  const marsAngle  = (day / MARS_PERIOD)  * 2 * Math.PI - 0.3  // offset inicial

  const earthPos = planetPos(earthAngle, EARTH_ORBIT)
  const marsPos  = planetPos(marsAngle,  MARS_ORBIT)
  const appAngle = apparentAngle(earthAngle, marsAngle)

  // Detecta si Mart va en retrògrad (angle aparent decreixent)
  const isRetrograde = trace.length > 5 && (() => {
    const last = trace[trace.length - 1]
    const prev = trace[trace.length - 5]
    const diff = ((last - prev + 540) % 360) - 180
    return diff < -0.5
  })()

  // Loop d'animació
  const tick = useCallback((timestamp) => {
    if (!lastRef.current) lastRef.current = timestamp
    const elapsed = timestamp - lastRef.current
    lastRef.current = timestamp

    const daysPerMs = speed / 16.67  // a 60fps, 1 frame = 16.67ms
    const deltaDays = elapsed * daysPerMs

    setDay(prev => {
      const next = prev + deltaDays
      const angle = apparentAngle(
        (next / EARTH_PERIOD) * 2 * Math.PI,
        (next / MARS_PERIOD)  * 2 * Math.PI - 0.3
      )
      setTrace(t => {
        const newTrace = [...t, angle]
        return newTrace.slice(-MAX_TRACE)
      })
      return next
    })

    rafRef.current = requestAnimationFrame(tick)
  }, [speed])

  useEffect(() => {
    if (playing) {
      lastRef.current = null
      rafRef.current = requestAnimationFrame(tick)
    } else {
      cancelAnimationFrame(rafRef.current)
    }
    return () => cancelAnimationFrame(rafRef.current)
  }, [playing, tick])

  // Mostra l'insight quan hi ha prou dades per veure el retrògrad
  useEffect(() => {
    if (day > 400 && !insightShown) setInsightShown(true)
  }, [day, insightShown])

  const handleReset = () => {
    setPlaying(false)
    setDay(0)
    setTrace([])
    setInsightShown(false)
  }

  // Posició X de Mart a la vista "Terra" (mapeig d'angle a píxels)
  // Rango 60° a 300° → píxels 10 a (amplada-10)
  const earthViewWidth = 280
  const marsEarthX = 10 + ((appAngle / 360) * earthViewWidth)

  return (
    <div className={styles.sim}>

      {/* Controls */}
      <div className={styles.controls}>
        <button className={styles.playBtn} onClick={() => setPlaying(p => !p)}>
          {playing ? '⏸ Pausa' : '▶ Play'}
        </button>

        <div className={styles.speedGroup}>
          {[1, 3, 6].map(s => (
            <button
              key={s}
              className={`${styles.speedBtn} ${speed === s ? styles.active : ''}`}
              onClick={() => setSpeed(s)}
            >
              ×{s}
            </button>
          ))}
        </div>

        <button className={styles.resetBtn} onClick={handleReset}>↺</button>
      </div>

      {/* Toggle de vista */}
      <div className={styles.viewToggle}>
        <button
          className={`${styles.viewBtn} ${view === 'space' ? styles.viewActive : ''}`}
          onClick={() => setView('space')}
        >
          🌌 Vista espai
        </button>
        <button
          className={`${styles.viewBtn} ${view === 'earth' ? styles.viewActive : ''}`}
          onClick={() => setView('earth')}
        >
          🌍 Vista Terra
        </button>
      </div>

      {/* Dia simulat */}
      <div className={styles.dayCounter}>
        Dia {Math.round(day)} · {isRetrograde
          ? <span className={styles.retroLabel}>⬅ Retrògrad</span>
          : <span className={styles.proLabel}>➡ Directe</span>}
      </div>

      {/* Vista de l'espai */}
      {view === 'space' && (
        <svg
          viewBox={`0 0 ${SVG_SIZE} ${SVG_SIZE}`}
          className={styles.svg}
          aria-label="Simulació orbital"
        >
          {/* Fons estrellat */}
          {[...Array(30)].map((_, i) => (
            <circle
              key={i}
              cx={(i * 37 + 15) % SVG_SIZE}
              cy={(i * 53 + 20) % SVG_SIZE}
              r={0.8}
              fill="rgba(255,255,255,0.4)"
            />
          ))}

          {/* Òrbites */}
          <path d={orbitPath(EARTH_ORBIT)} fill="none" stroke="rgba(76,125,255,0.2)" strokeWidth="1" />
          <path d={orbitPath(MARS_ORBIT)}  fill="none" stroke="rgba(255,107,107,0.2)" strokeWidth="1" />

          {/* Línia Terra → Mart (direcció aparent) */}
          <line
            x1={earthPos.x} y1={earthPos.y}
            x2={marsPos.x}  y2={marsPos.y}
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="1"
            strokeDasharray="4 3"
          />

          {/* Sol */}
          <circle cx={CX} cy={CY} r={SUN_R} fill="#ffd166" />
          <circle cx={CX} cy={CY} r={SUN_R + 4} fill="rgba(255,209,102,0.15)" />
          <text x={CX} y={CY + SUN_R + 14} textAnchor="middle" fill="rgba(255,209,102,0.7)" fontSize="9">Sol</text>

          {/* Terra */}
          <circle cx={earthPos.x} cy={earthPos.y} r={EARTH_R} fill="#4c7dff" />
          <text x={earthPos.x} y={earthPos.y + EARTH_R + 10} textAnchor="middle" fill="rgba(76,125,255,0.8)" fontSize="9">Terra</text>

          {/* Mart */}
          <circle cx={marsPos.x} cy={marsPos.y} r={MARS_R} fill={isRetrograde ? '#ff6b6b' : '#ff9955'} />
          <text x={marsPos.x} y={marsPos.y + MARS_R + 10} textAnchor="middle" fill="rgba(255,107,107,0.8)" fontSize="9">Mart</text>
        </svg>
      )}

      {/* Vista des de la Terra */}
      {view === 'earth' && (
        <div className={styles.earthView}>
          <div className={styles.earthSky}>
            {/* Estrelles de fons */}
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className={styles.star}
                style={{
                  left:  `${(i * 17 + 5) % 95}%`,
                  top:   `${(i * 23 + 10) % 80}%`,
                  opacity: 0.3 + (i % 4) * 0.15
                }}
              />
            ))}

            {/* Traça de Mart */}
            {trace.length > 1 && trace.map((ang, i) => {
              if (i === 0) return null
              const x = 10 + ((ang / 360) * earthViewWidth)
              const y = 50 + Math.sin(i * 0.15) * 8  // lleuger moviment vertical
              return (
                <div
                  key={i}
                  className={styles.tracePoint}
                  style={{
                    left: `${(x / earthViewWidth) * 100}%`,
                    top:  `${(y / 120) * 100}%`,
                    opacity: i / trace.length * 0.7
                  }}
                />
              )
            })}

            {/* Mart actual */}
            <div
              className={`${styles.marsDot} ${isRetrograde ? styles.marsDotRetro : ''}`}
              style={{
                left: `${(marsEarthX / earthViewWidth) * 100}%`,
                top:  '42%'
              }}
            />

            <div className={styles.skyLabel}>Cel nocturn (est → oest)</div>
          </div>

          <p className={styles.earthHint}>
            {isRetrograde
              ? '← Mart sembla moure\'s cap a l\'est (retrògrad)'
              : '→ Mart sembla moure\'s cap a l\'oest (directe)'}
          </p>
        </div>
      )}

      {/* Insight pedagògic */}
      {insightShown && (
        <div className={styles.insight}>
          <span className={styles.insightIcon}>💡</span>
          <p>{`Quan la Terra (interior) adelanta Mart (exterior), des de la nostra perspectiva Mart sembla retrocedir. No és real — és una il·lusió geomètrica. Ptolemeu necessitava epicicles per explicar-ho; Copèrnic ho va resoldre amb la geometria del sistema heliocèntric.`}</p>
        </div>
      )}
    </div>
  )
}
