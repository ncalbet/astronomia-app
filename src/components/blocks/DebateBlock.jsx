/**
 * DebateBlock.jsx
 *
 * Presenta dues postures enfrontades sobre una mateixa qüestió.
 * L'usuari llegeix els dos arguments i tria quin troba més sòlid
 * — o pot indicar que cap el convenç del tot.
 * No hi ha resposta "correcta": és sobre argumentació i reflexió.
 *
 * Format JSON:
 * {
 *   "type": "debate",
 *   "question": "És ètic...",
 *   "positionA": { "label": "A favor", "argument": "..." },
 *   "positionB": { "label": "En contra", "argument": "..." },
 *   "reflection": "Qué has tingut en compte per decidir?",
 *   "context": "Text opcional que apareix després de decidir"
 * }
 */

import { useState } from 'react'
import styles from './DebateBlock.module.css'

export default function DebateBlock({ block }) {
  const [selected, setSelected]   = useState(null)
  const [committed, setCommitted] = useState(false)

  const handleCommit = () => {
    if (!selected) return
    setCommitted(true)
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.label}>
        <span>🗣️</span> Debat
      </div>

      <p className={styles.question}>{block.question}</p>

      {/* Les dues postures sempre visibles */}
      <div className={styles.positions}>
        <div className={`${styles.position} ${styles.posA}`}>
          <div className={styles.posLabel}>{block.positionA.label}</div>
          <p className={styles.posArgument}>{block.positionA.argument}</p>
        </div>
        <div className={styles.versus}>vs</div>
        <div className={`${styles.position} ${styles.posB}`}>
          <div className={styles.posLabel}>{block.positionB.label}</div>
          <p className={styles.posArgument}>{block.positionB.argument}</p>
        </div>
      </div>

      {/* Tria */}
      {!committed && (
        <div className={styles.choiceSection}>
          <p className={styles.choicePrompt}>Quin argument trobes més sòlid?</p>
          <div className={styles.choices}>
            {[
              { id: 'A',    text: block.positionA.label },
              { id: 'B',    text: block.positionB.label },
              { id: 'none', text: 'Cap dels dos em convenç del tot' }
            ].map(({ id, text }) => (
              <button
                key={id}
                className={`${styles.choiceBtn} ${selected === id ? styles.selected : ''}`}
                onClick={() => setSelected(id)}
                aria-pressed={selected === id}
              >
                {text}
              </button>
            ))}
          </div>
          {selected && (
            <button className={styles.commitBtn} onClick={handleCommit}>
              Confirmar postura →
            </button>
          )}
        </div>
      )}

      {/* Feedback */}
      {committed && (
        <div className={styles.feedback}>
          <div className={styles.feedbackHeader}>
            {selected === 'A' && <span>Has triat: <strong>{block.positionA.label}</strong></span>}
            {selected === 'B' && <span>Has triat: <strong>{block.positionB.label}</strong></span>}
            {selected === 'none' && <span>Has decidit que <strong>cap argument et convenç del tot</strong></span>}
          </div>

          {block.reflection && (
            <p className={styles.reflectionText}>💭 {block.reflection}</p>
          )}

          {block.context && (
            <div className={styles.contextBox}>
              <div className={styles.contextLabel}>Per tenir en compte</div>
              <p>{block.context}</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
