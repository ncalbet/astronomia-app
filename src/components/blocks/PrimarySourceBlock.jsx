/**
 * PrimarySourceBlock.jsx
 *
 * Fragment d'una font primària real (carta, discurs, text filosòfic, llei)
 * amb preguntes guiades. Força la lectura directa del document original
 * en lloc de la paràfrasi — l'eina bàsica de l'historiador i el filòsof.
 *
 * Format JSON:
 * {
 *   "type": "primary-source",
 *   "label": "Carta de Churchill al Gabinet de Guerra, 1940",
 *   "source": "Winston Churchill, memorandum intern, 28 de maig de 1940",
 *   "text": "\"No tinc res a oferir sinó sang, esforç, llàgrimes i suor...\"",
 *   "questions": [
 *     "Quina emoció intenta despertar Churchill amb aquestes paraules?",
 *     "Per a qui escriu Churchill realment — el gabinet o la nació?"
 *   ]
 * }
 */

import { useState } from 'react'
import styles from './PrimarySourceBlock.module.css'

export default function PrimarySourceBlock({ block }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className={styles.wrapper}>
      <div className={styles.label}>
        <span>📜</span> Font primària
      </div>

      {block.label && <p className={styles.docTitle}>{block.label}</p>}

      <div className={styles.document}>
        <div className={styles.documentLines}>
          <div className={styles.line} />
          <div className={styles.line} />
          <div className={styles.line} />
        </div>
        <blockquote className={styles.quote}>
          {block.text}
        </blockquote>
      </div>

      {block.source && (
        <p className={styles.source}>— {block.source}</p>
      )}

      {block.questions && block.questions.length > 0 && (
        <div className={styles.questionsSection}>
          <button
            className={styles.toggleBtn}
            onClick={() => setExpanded(e => !e)}
            aria-expanded={expanded}
          >
            {expanded ? '▲ Amagar preguntes' : '▼ Preguntes per reflexionar'}
          </button>

          {expanded && (
            <ol className={styles.questions}>
              {block.questions.map((q, i) => (
                <li key={i} className={styles.question}>{q}</li>
              ))}
            </ol>
          )}
        </div>
      )}
    </div>
  )
}
