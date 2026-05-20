import styles from './ImageBlock.module.css'

export default function ImageBlock({ block }) {
  return (
    <figure className={styles.wrapper}>
      <img
        src={block.src}
        alt={block.alt || ''}
        className={styles.image}
        loading="lazy"
      />
      {(block.caption || block.credit) && (
        <figcaption className={styles.caption}>
          {block.caption && <span className={styles.captionText}>{block.caption}</span>}
          {block.credit && <span className={styles.credit}>{block.credit}</span>}
        </figcaption>
      )}
    </figure>
  )
}
