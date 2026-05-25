/**
 * NaturalSelectionSim.jsx
 *
 * Simulació de selecció natural.
 * 40 organismes de colors (verd = camuflat, vermell = visible) sobre un prat verd.
 * El "depredador" elimina els més visibles cada generació.
 * La població es desplaça progressivament cap al verd.
 */

import { useState, useRef, useCallback } from 'react'
import styles from './NaturalSelectionSim.module.css'

const SVG_W = 300
const SVG_H = 175
const N = 42
const EAT_FRAC = 0.40
const MUTATION = 14

function makeOrganisms() {
  let id = 0
  return Array.from({ length: N }, () => ({
    id: id++,
    x: 10 + Math.random() * (SVG_W - 20),
    y: 10 + Math.random() * (SVG_H - 20),
    cam: 25 + Math.random() * 55   // 25-80: rang inicial mixt
  }))
}

// cam: 0 = verd perfecte, 100 = vermell molt visible
function camToColor(cam) {
  const hue = 120 - cam * 1.2
  const sat = 75 + cam * 0.15
  const light = 36 + cam * 0.28
  return `hsl(${hue.toFixed(0)},${sat.toFixed(0)}%,${light.toFixed(0)}%)`
}

function nextGeneration(orgs) {
  const nEat = Math.round(orgs.length * EAT_FRAC)
  const sorted = [...orgs].sort((a, b) => b.cam - a.cam)
  const survived = []
  for (let i = 0; i < sorted.length; i++) {
    // Els més visibles son menjats, però amb 15% de sort de sobreviure
    if (i < nEat) {
      if (Math.random() < 0.15) survived.push({ ...sorted[i] })
    } else {
      survived.push({ ...sorted[i] })
    }
  }
  let nextId = Date.now()
  const offspring = [...survived]
  while (offspring.length < N) {
    const parent = survived[Math.floor(Math.random() * survived.length)]
    offspring.push({
      id: nextId++,
      x: 10 + Math.random() * (SVG_W - 20),
      y: 10 + Math.random() * (SVG_H - 20),
      cam: Math.max(0, Math.min(100, parent.cam + (Math.random() - 0.5) * MUTATION * 2))
    })
  }
  return offspring
}

export default function NaturalSelectionSim() {
  const [orgs, setOrgs]           = useState(makeOrganisms)
  const [gen, setGen]             = useState(0)
  const [playing, setPlaying]     = useState(false)
  const [showInsight, setShowInsight] = useState(false)
  const rafRef  = useRef(null)
  const lastRef = useRef(null)
  const playRef = useRef(false)

  const step = useCallback(() => {
    setOrgs(prev => nextGeneration(prev))
    setGen(prev => {
      const next = prev + 1
      if (next >= 5) setShowInsight(true)
      return next
    })
  }, [])

  const loopFn = useCallback((ts) => {
    if (!playRef.current) return
    if (!lastRef.current || ts - lastRef.current > 1100) {
      lastRef.current = ts
      step()
    }
    rafRef.current = requestAnimationFrame(loopFn)
  }, [step])

  const togglePlay = useCallback(() => {
    if (playing) {
      playRef.current = false
      cancelAnimationFrame(rafRef.current)
      setPlaying(false)
    } else {
      playRef.current = true
      setPlaying(true)
      lastRef.current = null
      rafRef.current = requestAnimationFrame(loopFn)
    }
  }, [playing, loopFn])

  const reset = useCallback(() => {
    playRef.current = false
    cancelAnimationFrame(rafRef.current)
    setPlaying(false)
    setOrgs(makeOrganisms())
    setGen(0)
    setShowInsight(false)
    lastRef.current = null
  }, [])

  const meanCam = orgs.reduce((s, o) => s + o.cam, 0) / orgs.length
  const pctCamuflat = Math.round(100 - meanCam)

  return (
    <div className={styles.sim}>
      <div className={styles.controls}>
        <button className={styles.playBtn} onClick={togglePlay}>
          {playing ? '⏸ Pausa' : '▶ Jugar'}
        </button>
        <button
          className={styles.stepBtn}
          onClick={step}
          disabled={playing}
        >
          +1 gen
        </button>
        <span className={styles.gen}>Generació {gen}</span>
        <button className={styles.resetBtn} onClick={reset} title="Reiniciar">↺</button>
      </div>

      <svg
        viewBox={`0 0 ${SVG_W} ${SVG_H}`}
        className={styles.svg}
      >
        {/* Fons prat */}
        <rect width={SVG_W} height={SVG_H} fill="#1e5c38" />
        {/* Textura suau */}
        {[4,8,12,16,20,24].map(i => (
          <ellipse key={i}
            cx={(i * 47) % SVG_W} cy={(i * 31) % SVG_H}
            rx={14 + i} ry={7 + i * 0.5}
            fill="rgba(0,90,30,0.18)"
          />
        ))}
        {/* Organismes */}
        {orgs.map(o => (
          <circle
            key={o.id}
            cx={o.x} cy={o.y} r={5.5}
            fill={camToColor(o.cam)}
            stroke="rgba(0,0,0,0.25)"
            strokeWidth={0.6}
          />
        ))}
        {/* Etiqueta */}
        <text x={5} y={SVG_H - 4} fontSize={8} fill="rgba(255,255,255,0.35)">
          🟢 Verd = camuflat · 🔴 Vermell = visible · el depredador menja el vermell
        </text>
      </svg>

      <div className={styles.statsRow}>
        <span className={styles.statsLabel}>Camuflatge de la població</span>
        <div className={styles.barOuter}>
          <div
            className={styles.barInner}
            style={{ width: `${pctCamuflat}%`, background: camToColor(100 - pctCamuflat) }}
          />
        </div>
        <span className={styles.statsVal}>{pctCamuflat}%</span>
      </div>

      {showInsight && (
        <div className={styles.insight}>
          <span>💡</span>
          <p>La selecció és cega: el depredador no «vol» que la població canviï. Simplement menja el que veu. El resultat —una població cada vegada més verda— emergeix sense cap intenció ni pla.</p>
        </div>
      )}
    </div>
  )
}
