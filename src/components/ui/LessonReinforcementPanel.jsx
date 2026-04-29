/**
 * LessonReinforcementPanel.jsx
 *
 * Apareix al final d'una lliçó quan l'usuari ha fallat
 * amb baixa confiança >= 2 vegades.
 * Mostra tots els key-idea de la lliçó de forma condensada.
 * Títol: "Repassem els punts clau abans de continuar"
 */

import styles from './LessonReinforcementPanel.module.css'

export default function LessonReinforcementPanel({ blocks }) {
  const keyIdeas = blocks.filter(b => b.type === 'key-idea')
  if (keyIdeas.length === 0) return null

  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <span className={styles.icon}>📌</span>
        <div>
          <div className={styles.title}>Repassem els punts clau</div>
          <div className={styles.subtitle}>Abans de continuar — consolida el que hem vist</div>
        </div>
      </div>

      <div className={styles.ideas}>
        {keyIdeas.map((block, i) => (
          <div key={i} className={styles.idea}>
            <div className={styles.bullet} />
            <p className={styles.ideaText}>{block.text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
