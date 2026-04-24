/**
 * BadgeToast.jsx
 *
 * Popup global que apareix quan l'usuari guanya una insígnia nova.
 * S'invoca des de l'AppContext quan s'executa earnBadge().
 * Desapareix automàticament als 3.5 segons.
 */

import { useEffect, useState } from 'react'
import { BADGES } from '../../engine/badgeEngine'
import styles from './BadgeToast.module.css'

export default function BadgeToast({ badgeId, onDone }) {
  const [visible, setVisible] = useState(false)
  const badge = BADGES[badgeId]

  useEffect(() => {
    if (!badgeId) return
    const t1 = setTimeout(() => setVisible(true), 50)
    const t2 = setTimeout(() => {
      setVisible(false)
      setTimeout(onDone, 400)
    }, 3500)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [badgeId])

  if (!badge) return null

  return (
    <div className={`${styles.toast} ${visible ? styles.visible : ''}`}>
      <div className={styles.inner}>
        <div className={styles.emoji}>{badge.emoji}</div>
        <div className={styles.info}>
          <div className={styles.label}>🏆 Nova insígnia!</div>
          <div className={styles.name}>{badge.name}</div>
          <div className={styles.desc}>{badge.description}</div>
        </div>
      </div>
    </div>
  )
}
