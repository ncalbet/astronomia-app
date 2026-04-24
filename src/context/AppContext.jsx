/**
 * AppContext.jsx
 *
 * Context global de l'app. Exposa:
 *   - Tot l'estat de progrés (useProgress)
 *   - Cua de notificacions d'insígnies (pendingBadge)
 *   - Flag de primera vegada (isFirstTime)
 */

import { createContext, useContext, useState, useCallback } from 'react'
import { useProgress } from '../hooks/useProgress'
import { checkNewBadges } from '../engine/badgeEngine'
import storage from '../storage/storageProvider'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const progress = useProgress()
  const [pendingBadge, setPendingBadge] = useState(null)

  // Primera vegada: si no hi ha valor al storage, és true
  const isFirstTime = storage.get('firstTime', true)

  // earnBadge millorat: comprova nous desbloquejos i notifica
  const earnBadgeWithNotification = useCallback((badgeId) => {
    // Capturem l'estat ABANS de cridar earnBadge (que és asíncron).
    // Si ja la té, no mostrem toast ni tornem a desar.
    const alreadyEarned = progress.badges.includes(badgeId)
    if (alreadyEarned) return
    progress.earnBadge(badgeId)
    setPendingBadge(badgeId)
  }, [progress])

  // Comprova insígnies basant-se en un event
  const checkBadges = useCallback((event) => {
    const newBadges = checkNewBadges(
      { badges: progress.badges, completedLessons: progress.completedLessons },
      event
    )
    if (newBadges.length > 0) {
      earnBadgeWithNotification(newBadges[0])
    }
  }, [progress.badges, progress.completedLessons, earnBadgeWithNotification])

  const clearPendingBadge = useCallback(() => setPendingBadge(null), [])

  return (
    <AppContext.Provider value={{
      ...progress,
      earnBadge: earnBadgeWithNotification,
      checkBadges,
      pendingBadge,
      clearPendingBadge,
      isFirstTime
    }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
