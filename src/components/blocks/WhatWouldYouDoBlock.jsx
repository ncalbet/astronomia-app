/**
 * WhatWouldYouDoBlock.jsx
 *
 * L'usuari es posa a la pell del personatge ABANS de saber el que va passar.
 * Tria una opció, la confirma, i llavors es revela el que va succeir realment
 * i per què — amb l'anàlisi de les conseqüències.
 *
 * Format JSON:
 * {
 *   "type": "what-would-you-do",
 *   "character": "Winston Churchill",
 *   "emoji": "🎩",
 *   "year": "1940",
 *   "setup": "És el 26 de maig de 1940. Ets el Primer Ministre...",
 *   "dilemma": "Els teus generals et proposen negociar amb Hitler...",
 *   "options": [
 *     { "id": "A", "text": "Negocio la pau: salvo vides i evito la derrota total" },
 *     { "id": "B", "text": "Continue la guerra malgrat tot" }
 *   ],
 *   "reveal": "Churchill va continuar la guerra. El 13 de maig de 1940...",
 *   "analysis": "La decisió no era òbvia llavors: Bèlgica havia caigut..."
 * }
 */

import { useState } from 'react'
import styles from './WhatWouldYouDoBlock.module.css'

export default function WhatWouldYouDoBlock({ block }) {
  const [selected, setSelected]   = useState(null)
  const [revealed, setRevealed]   = useState(false)

  return (
    <div className={styles.wrapper}>
      <div className={styles.label}>
        <span>🎭</span> Què hauries fet tu?
      </div>

      <div className={styles.character}>
        <span className={styles.characterEmoji}>{block.emoji}</span>
        <div className={styles.characterInfo}>
          <div className={styles.characterName}>{block.character}</div>
          {block.year && <div className={styles.characterYear}>{block.year}</div>}
        </div>
      </div>

      <p className={styles.setup}>{block.setup}</p>

      <div className={styles.dilemmaBox}>
        <div className={styles.dilemmaLabel}>El dilema</div>
        <p className={styles.dilemma}>{block.dilemma}</p>
      </div>

      {!revealed && (
        <div className={styles.choiceSection}>
          <p className={styles.choicePrompt}>Posa't a la seva pell. Què fas?</p>
          <div className={styles.options}>
            {block.options.map(opt => (
              <button
                key={opt.id}
                className={`${styles.option} ${selected === opt.id ? styles.optionSelected : ''}`}
                onClick={() => setSelected(opt.id)}
              >
                <span className={styles.optionId}>{opt.id}</span>
                <span className={styles.optionText}>{opt.text}</span>
              </button>
            ))}
          </div>
          {selected && (
            <button className={styles.revealBtn} onClick={() => setRevealed(true)}>
              Veure el que va passar →
            </button>
          )}
        </div>
      )}

      {revealed && (
        <div className={styles.revealSection}>
          <div className={styles.yourChoice}>
            <span className={styles.yourChoiceLabel}>La teva elecció:</span>
            <span className={styles.yourChoiceText}>
              {block.options.find(o => o.id === selected)?.text}
            </span>
          </div>

          <div className={styles.revealBox}>
            <div className={styles.revealLabel}>El que va passar realment</div>
            <p className={styles.revealText}>{block.reveal}</p>
          </div>

          {block.analysis && (
            <div className={styles.analysis}>
              <div className={styles.analysisLabel}>Per tenir en compte</div>
              <p className={styles.analysisText}>{block.analysis}</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
