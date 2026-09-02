import styles from './PrerequisiteNote.module.css'

/**
 * Avís de base pendent. Recomana, no bloqueja: l'usuari adult decideix.
 * `missing` són metadades del catàleg; `onOpen` és opcional.
 */
export default function PrerequisiteNote({ missing = [], onOpen, compact = false }) {
  if (!missing.length) return null

  if (compact) return (
    <span className={styles.compact} title={`Recomanat abans: ${missing.map(m => m.title).join(', ')}`}>
      Et falta la base
    </span>
  )

  return (
    <aside className={styles.note}>
      <p className={styles.text}>
        Aquest itinerari dona per sabut el que s'explica a{' '}
        {missing.map((m, i) => (
          <span key={m.id}>
            {i > 0 && (i === missing.length - 1 ? ' i ' : ', ')}
            {onOpen
              ? <button className={styles.link} onClick={() => onOpen(m.id)}>{m.title}</button>
              : <strong className={styles.strong}>{m.title}</strong>}
          </span>
        ))}
        . Pots continuar igualment — però si et perds, ja saps on tornar.
      </p>
    </aside>
  )
}
