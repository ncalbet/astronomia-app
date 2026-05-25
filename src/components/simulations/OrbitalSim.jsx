/**
 * OrbitalSim.jsx
 *
 * Simulació de la 2a Llei de Kepler: els planetes escombren àrees iguals en temps iguals.
 *
 * Controls: play/pausa, preset d'òrbita (circular, el·líptica, cometa)
 * Cada 40 frames es dibuixa un sector des del Sol al planeta — tots han de ser igual d'àrea.
 */

import { useEffect, useRef, useState, useCallback } from 'react'
import styles from './OrbitalSim.module.css'

const SVG_W  = 300
const SVG_H  = 270
const SUN_X  = 190   // Sol al focus dret
const CY     = SVG_H / 2
const A      = 95    // semi-eix major (px)

const ORBITS = {
  'Quasi circular (e=0.15)': { e: 0.15 },
  'El·líptica (e=0.50)':     { e: 0.50 },
  'Cometa (e=0.85)':         { e: 0.85 },
}

const SECTOR_COLORS = ['rgba(255,180,50,0.30)', 'rgba(80,200,255,0.30)', 'rgba(160,100,255,0.30)', 'rgba(80,220,120,0.30)']
const SECTOR_STROKES = ['rgba(255,200,80,0.7)', 'rgba(100,210,255,0.7)', 'rgba(180,120,255,0.7)', 'rgba(100,240,140,0.7)']

// Posició del planeta a l'anomalia verdadera ν (radians)
function planetPos(nu, e) {
  const p = A * (1 - e * e)       // semi-latus rectum
  const r = p / (1 + e * Math.cos(nu))
  return {
    x: SUN_X + r * Math.cos(nu),
    y: CY    + r * Math.sin(nu),
    r
  }
}

// SVG path d'una el·lipse amb el Sol al focus
function ellipsePath(e) {
  const b = A * Math.sqrt(1 - e * e)
  const cx = SUN_X + A * e   // centre de l'el·lipse (Sol és focus DRET: centre = Sol + a*e cap a l'esquerra? no...)
  // Sol al focus dret → centre és a l'esquerra del Sol: cx = SUN_X - A*e? Comprovem:
  // Perihelion (ν=0): x = SUN_X + r*1 = SUN_X + a*(1-e) → centre + a = SUN_X - a*e + a = SUN_X + a*(1-e) ✓
  const centerX = SUN_X - A * e
  return `M ${centerX - A} ${CY}
    A ${A} ${b} 0 1 0 ${centerX + A} ${CY}
    A ${A} ${b} 0 1 0 ${centerX - A} ${CY}`
}

const FRAMES_PER_SECTOR = 38
const BASE_RATE = 0.018  // velocitat angular de base

export default function OrbitalSim() {
  const [orbitKey, setOrbitKey] = useState('El·líptica (e=0.50)')
  const [playing, setPlaying]   = useState(false)
  const [nu, setNu]             = useState(0)         // anomalia verdadera (rad)
  const [sectors, setSectors]   = useState([])        // llista de { x1,y1, x2,y2 }
  const [frameCount, setFrameCount] = useState(0)

  const rafRef     = useRef(null)
  const lastRef    = useRef(null)
  const stateRef   = useRef({ nu: 0, frame: 0 })
  const playRef    = useRef(false)

  const e = ORBITS[orbitKey].e

  const tick = useCallback((ts) => {
    if (!playRef.current) return
    const dt = Math.min(ts - (lastRef.current || ts), 50)
    lastRef.current = ts

    const st = stateRef.current
    const { x: x1, y: y1, r } = planetPos(st.nu, e)
    // Avançar anomalia: dν/dt ∝ 1/r² (2a llei de Kepler)
    const dnu = BASE_RATE * (A * (1 - e * e)) * (A * (1 - e * e)) / (r * r) * (dt / 16)
    const newNu = st.nu + dnu

    const { x: x2, y: y2 } = planetPos(newNu, e)
    const newFrame = st.frame + 1

    // Cada FRAMES_PER_SECTOR frames, afegim un sector
    let newSectors
    if (newFrame % FRAMES_PER_SECTOR === 0) {
      const colorIdx = Math.floor(newFrame / FRAMES_PER_SECTOR) % SECTOR_COLORS.length
      newSectors = prev => {
        const s = [...prev, { x1, y1, x2: x2, y2: y2, color: colorIdx }]
        return s.length > 4 ? s.slice(s.length - 4) : s
      }
    }

    stateRef.current = { nu: newNu % (2 * Math.PI), frame: newFrame }
    setNu(stateRef.current.nu)
    setFrameCount(newFrame)
    if (newSectors) setSectors(newSectors)

    rafRef.current = requestAnimationFrame(tick)
  }, [e])

  useEffect(() => {
    stateRef.current = { nu: 0, frame: 0 }
    setNu(0)
    setSectors([])
    setFrameCount(0)
    playRef.current = false
    cancelAnimationFrame(rafRef.current)
    setPlaying(false)
    lastRef.current = null
  }, [orbitKey])

  const togglePlay = useCallback(() => {
    if (playing) {
      playRef.current = false
      cancelAnimationFrame(rafRef.current)
      setPlaying(false)
    } else {
      playRef.current = true
      setPlaying(true)
      lastRef.current = null
      rafRef.current = requestAnimationFrame(tick)
    }
  }, [playing, tick])

  const reset = useCallback(() => {
    playRef.current = false
    cancelAnimationFrame(rafRef.current)
    setPlaying(false)
    stateRef.current = { nu: 0, frame: 0 }
    setNu(0)
    setSectors([])
    setFrameCount(0)
    lastRef.current = null
  }, [])

  const planet = planetPos(nu, e)
  const speed  = ((A * (1 - e * e)) ** 2) / (planet.r ** 2)
  const maxSpeed = e > 0 ? (1 / ((1 - e) ** 2)) : 1

  return (
    <div className={styles.sim}>
      <div className={styles.controls}>
        <button className={styles.playBtn} onClick={togglePlay}>
          {playing ? '⏸ Pausa' : '▶ Jugar'}
        </button>
        <button className={styles.resetBtn} onClick={reset} title="Reiniciar">↺</button>
      </div>

      <div className={styles.presets}>
        {Object.keys(ORBITS).map(k => (
          <button
            key={k}
            className={`${styles.presetBtn} ${orbitKey === k ? styles.presetActive : ''}`}
            onClick={() => setOrbitKey(k)}
          >
            {k}
          </button>
        ))}
      </div>

      <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} className={styles.svg}>
        {/* Fons estelat */}
        <rect width={SVG_W} height={SVG_H} fill="#080c1a" />
        {[...Array(30)].map((_, i) => (
          <circle key={i}
            cx={(i * 97 + 13) % SVG_W}
            cy={(i * 61 + 7) % SVG_H}
            r={0.7 + (i % 3) * 0.4}
            fill="white" opacity={0.3 + (i % 4) * 0.15}
          />
        ))}

        {/* Òrbita */}
        <path d={ellipsePath(e)} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth={1} />

        {/* Sectors (2a llei) */}
        {sectors.map((s, i) => (
          <g key={i}>
            <polygon
              points={`${SUN_X},${CY} ${s.x1},${s.y1} ${s.x2},${s.y2}`}
              fill={SECTOR_COLORS[s.color]}
              stroke={SECTOR_STROKES[s.color]}
              strokeWidth={0.8}
            />
          </g>
        ))}

        {/* Sol */}
        <circle cx={SUN_X} cy={CY} r={9} fill="#FFD060" />
        <circle cx={SUN_X} cy={CY} r={14} fill="rgba(255,200,50,0.15)" />
        <text x={SUN_X} y={CY + 24} textAnchor="middle" fontSize={8} fill="rgba(255,210,80,0.6)">Sol</text>

        {/* Planeta */}
        <circle cx={planet.x} cy={planet.y} r={5.5} fill="#60b0ff" />
        <circle cx={planet.x} cy={planet.y} r={9}   fill="rgba(80,150,255,0.15)" />

        {/* Radi vector (línia Sol → planeta) */}
        <line
          x1={SUN_X} y1={CY} x2={planet.x} y2={planet.y}
          stroke="rgba(255,255,255,0.2)" strokeWidth={0.8} strokeDasharray="3,3"
        />

        {/* Etiqueta perihelion / aphelion */}
        {e > 0.25 && (
          <>
            <text x={SUN_X + A * (1 - e) + 4} y={CY + 12} fontSize={8} fill="rgba(255,150,80,0.7)">perihelion</text>
            <text x={SUN_X - A * (1 + e) + 4} y={CY + 12} fontSize={8} fill="rgba(100,180,255,0.7)">afelion</text>
          </>
        )}
      </svg>

      <div className={styles.speedRow}>
        <span className={styles.speedLabel}>Velocitat actual</span>
        <div className={styles.speedBar}>
          <div
            className={styles.speedFill}
            style={{ width: `${Math.min(100, (speed / maxSpeed) * 100)}%` }}
          />
        </div>
        <span className={styles.speedVal}>{(speed / maxSpeed * 100).toFixed(0)}%</span>
      </div>

      {sectors.length >= 3 && (
        <div className={styles.insight}>
          <span>💡</span>
          <p>Cada sector de color cobreix el <strong>mateix interval de temps</strong>. Observa com prop del Sol (perihelion) el planeta avança molt — el sector és ample però curt. Lluny del Sol (afelion) avança poc — el sector és estret però llarg. L'àrea, però, és idèntica: la 2a llei de Kepler.</p>
        </div>
      )}
    </div>
  )
}
