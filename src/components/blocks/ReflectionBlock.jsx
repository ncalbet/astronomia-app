/**
 * ReflectionBlock.jsx
 *
 * Pregunta oberta sense resposta correcta.
 * Espai per pensar — sense puntuació ni XP.
 * L'usuari pot escriure una nota personal o simplement reflexionar.
 *
 * Format JSON:
 * {
 *   "type": "reflection",
 *   "question": "Qué canviaries si...",
 *   "prompt": "Pren un moment abans de continuar." (opcional)
 * }
 */

import { useState } from 'react'
import styles from './ReflectionBlock.module.css'

export default function ReflectionBlock({ block }) {
  const [text, setText]       = useState('')
  const [saved, setSaved]     = useState(false)

  const handleSave = () => {
    if (!text.trim()) return
    setSaved(true)
  }

  const handleEdit = () => setSaved(false)

  return (
    <div className={styles.wrapper}>
      <div className={styles.label}>
        <span>💭</span> Reflexió
      </div>

      <p className={styles.question}>{block.question}</p>

      {block.prompt && (
        <p className={styles.prompt}>{block.prompt}</p>
      )}

      {!saved ? (
        <div className={styles.inputArea}>
          <textarea
            className={styles.textarea}
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Escriu el teu pensament aquí... (opcional)"
            rows={4}
          />
          <div className={styles.actions}>
            <span className={styles.hint}>
              Sense puntuació — és per a tu
            </span>
            <div className={styles.btns}>
              {text.trim() && (
                <button className={styles.saveBtn} onClick={handleSave}>
                  Desar →
                </button>
              )}
              <button
                className={styles.skipBtn}
                onClick={() => setSaved(true)}
              >
                Continuar sense escriure
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.savedArea}>
          {text.trim() ? (
            <>
              <div className={styles.savedLabel}>La teva reflexió</div>
              <p className={styles.savedText}>{text}</p>
              <button className={styles.editBtn} onClick={handleEdit}>
                Editar
              </button>
            </>
          ) : (
            <p className={styles.skippedText}>
              Has continuat sense escriure. Sempre pots tornar-hi.
            </p>
          )}
        </div>
      )}
    </div>
  )
}
