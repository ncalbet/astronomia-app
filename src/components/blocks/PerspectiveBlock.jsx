/**
 * PerspectiveBlock.jsx
 *
 * El mateix fet o situació explicat des de punts de vista de diversos actors.
 * No hi ha resposta correcta: l'objectiu és el multiperspectivisme — entendre
 * que la "veritat" històrica canvia radicalment segons qui parla.
 *
 * Format JSON:
 * {
 *   "type": "perspective",
 *   "situation": "La caiguda de Cartago, 146 aC",
 *   "perspectives": [
 *     { "role": "Senador romà", "emoji": "⚔️", "text": "..." },
 *     { "role": "Ciutadà cartaginès", "emoji": "🔥", "text": "..." },
 *     { "role": "Mercader grec", "emoji": "⚓", "text": "..." }
 *   ],
 *   "reflection": "Quin punt de vista et costa més comprendre — i per què?"
 * }
 */

import { useState } from 'react'
import styles from './PerspectiveBlock.module.css'

export default function PerspectiveBlock({ block }) {
  const [active, setActive] = useState(0)

  const current = block.perspectives[active]

  return (
    <div className={styles.wrapper}>
      <div className={styles.label}>
        <span>👁️</span> Múltiples perspectives
      </div>

      <p className={styles.situation}>{block.situation}</p>

      <div className={styles.tabs}>
        {block.perspectives.map((p, i) => (
          <button
            key={i}
            className={`${styles.tab} ${active === i ? styles.tabActive : ''}`}
            onClick={() => setActive(i)}
          >
            <span className={styles.tabEmoji}>{p.emoji}</span>
            <span className={styles.tabRole}>{p.role}</span>
          </button>
        ))}
      </div>

      <div className={styles.content} key={active}>
        <div className={styles.roleHeader}>
          <span className={styles.roleEmoji}>{current.emoji}</span>
          <span className={styles.roleName}>{current.role}</span>
        </div>
        <p className={styles.text}>{current.text}</p>
      </div>

      {block.reflection && (
        <div className={styles.reflection}>
          <span className={styles.reflectionIcon}>💭</span>
          <p className={styles.reflectionText}>{block.reflection}</p>
        </div>
      )}
    </div>
  )
}
