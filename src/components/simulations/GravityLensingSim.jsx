/**
 * GravityLensingSim.jsx
 *
 * Simulació de lents gravitacional.
 * Una massa central (forat negre) curva la llum dels estels del fons.
 * Cada estel apareix desdoblat i deformat al voltant de la massa.
 *
 * Equació de lent: θ± = ½(θ ± √(θ² + 4θ_E²))
 * θ_E = radi d'Einstein (depèn de la massa del forat negre).
 */

import { useState, useRef, useEffect, useCallback } from 'react'
import styles from './GravityLensingSim.module.css'

const W = 300
const H = 270
const CX = W / 2
const CY = H / 2

// Posicions aleatòries d'estels de fons (fixes per comoditat)
const BG_STARS = Array.from({ length: 180 }, (_, i) => ({
  x: (Math.sin(i * 2.3 + 0.7) * 0.5 + 0.5) * W,
  y: (Math.cos(i * 1.7 + 1.3) * 0.5 + 0.5) * H,
  size: 0.6 + (i % 5) * 0.25,
  brightness: 0.3 + (i % 7) * 0.1
}))

// Calcula les imatges lensades d'un estel a (sx, sy) relatius al centre
function lensedImages(sx, sy, eR) {
  const theta = Math.sqrt(sx * sx + sy * sy)
  if (theta < 1) return []

  const phi = Math.atan2(sy, sx)
  const disc = Math.sqrt(theta * theta + 4 * eR * eR)

  const tPlus  =  0.5 * (theta + disc)
  const tMinus =  0.5 * (theta - disc)  // negatiu → imatge a l'altra banda

  const magPlus  = Math.abs(0.5 * (theta / disc + 1))
  const magMinus = Math.abs(0.5 * (theta / disc - 1))

  return [
    { x: tPlus  * Math.cos(phi), y: tPlus  * Math.sin(phi), mag: magPlus,  primary: true },
    { x: tMinus * Math.cos(phi), y: tMinus * Math.sin(phi), mag: magMinus, primary: false }
  ]
}

// Dibuixa l'anell d'Einstein quan l'estel és exactament darrere la massa
function einsteingRingPath(eR) {
  return `M ${CX + eR},${CY} A ${eR},${eR} 0 1,1 ${CX + eR - 0.01},${CY}`
}

export default function GravityLensingSim() {
  const canvasRef = useRef(null)
  const [mass, setMass]     = useState(50)   // radi d'Einstein en px
  const [showRing, setShowRing] = useState(false)

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, W, H)

    // Fons negre
    ctx.fillStyle = '#060a18'
    ctx.fillRect(0, 0, W, H)

    const eR = mass

    BG_STARS.forEach(star => {
      const sx = star.x - CX
      const sy = star.y - CY
      const images = lensedImages(sx, sy, eR)

      images.forEach(img => {
        const screenX = CX + img.x
        const screenY = CY + img.y

        // Evitar imatges dins del forat negre (r < 8)
        const r = Math.sqrt(img.x * img.x + img.y * img.y)
        if (r < 9) return

        const alpha = Math.min(1, star.brightness * Math.sqrt(img.mag) * 0.8)
        const size  = star.size * (img.primary ? 1 : 0.7)

        ctx.save()
        ctx.globalAlpha = Math.min(1, alpha)
        ctx.fillStyle = 'white'
        ctx.beginPath()
        ctx.arc(screenX, screenY, size, 0, 2 * Math.PI)
        ctx.fill()
        ctx.restore()
      })
    })

    // Anell d'Einstein (estels directament darrere: simula com a arc prim)
    if (showRing) {
      ctx.save()
      ctx.strokeStyle = 'rgba(255, 255, 200, 0.5)'
      ctx.lineWidth = 1.5
      ctx.shadowColor = 'rgba(255, 255, 150, 0.8)'
      ctx.shadowBlur = 6
      ctx.beginPath()
      ctx.arc(CX, CY, eR, 0, 2 * Math.PI)
      ctx.stroke()
      ctx.restore()
    }

    // Zona d'ombra del forat negre
    const gradient = ctx.createRadialGradient(CX, CY, 0, CX, CY, 18)
    gradient.addColorStop(0, 'rgba(0,0,0,1)')
    gradient.addColorStop(0.6, 'rgba(0,0,0,0.95)')
    gradient.addColorStop(1, 'rgba(0,0,0,0)')
    ctx.fillStyle = gradient
    ctx.beginPath()
    ctx.arc(CX, CY, 18, 0, 2 * Math.PI)
    ctx.fill()

    // Disc d'acreció (brillantor anular)
    const glow = ctx.createRadialGradient(CX, CY, 8, CX, CY, 28)
    glow.addColorStop(0, 'rgba(0,0,0,0)')
    glow.addColorStop(0.5, 'rgba(255, 140, 40, 0.35)')
    glow.addColorStop(1, 'rgba(0,0,0,0)')
    ctx.fillStyle = glow
    ctx.beginPath()
    ctx.arc(CX, CY, 28, 0, 2 * Math.PI)
    ctx.fill()

    // Etiqueta radi d'Einstein
    ctx.fillStyle = 'rgba(255,255,255,0.25)'
    ctx.font = '9px sans-serif'
    ctx.fillText(`Radi d'Einstein: ${eR}px`, 6, H - 5)
  }, [mass, showRing])

  useEffect(() => { draw() }, [draw])

  return (
    <div className={styles.sim}>
      <div className={styles.controls}>
        <label className={styles.sliderLabel}>
          Massa del forat negre
          <input
            type="range"
            min={20}
            max={90}
            value={mass}
            onChange={e => setMass(+e.target.value)}
            className={styles.slider}
          />
          <span className={styles.massVal}>{mass < 40 ? 'petita' : mass < 65 ? 'gran' : 'gegant'}</span>
        </label>
        <button
          className={`${styles.ringBtn} ${showRing ? styles.ringActive : ''}`}
          onClick={() => setShowRing(v => !v)}
        >
          Anell d'Einstein
        </button>
      </div>

      <canvas
        ref={canvasRef}
        width={W}
        height={H}
        className={styles.canvas}
      />

      <div className={styles.hint}>
        Cada estel apareix <strong>desdoblat</strong>: una imatge primària (brillant) i una de secundària (dèbil, al costat contrari). Augmenta la massa per veure l'efecte amplificat.
      </div>

      {mass >= 70 && (
        <div className={styles.insight}>
          <span>💡</span>
          <p>Amb masses molt grans, les imatges secundàries s'aproximen a l'anell d'Einstein — el cercle lluminós que veiem al voltant de M87* en la fotografia del 2019. La llum que l'Event Horizon Telescope va capturar havia donat la volta completa al forat negre.</p>
        </div>
      )}
    </div>
  )
}
