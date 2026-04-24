/**
 * PageTransition.jsx
 *
 * Wrapper que aplica una animació d'entrada suau a cada pantalla.
 * S'utilitza envoltant el contingut de cada screen.
 * Funciona amb el key del Router per detectar canvis de ruta.
 */

import { useLocation } from 'react-router-dom'
import styles from './PageTransition.module.css'

export default function PageTransition({ children }) {
  const { pathname } = useLocation()

  return (
    <div className={styles.wrapper} key={pathname}>
      {children}
    </div>
  )
}
