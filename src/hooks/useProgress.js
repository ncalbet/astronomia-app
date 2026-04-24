/**
 * useProgress.js
 * 
 * Hook central que gestiona tot l'estat de l'usuari:
 * XP, mòduls completats, lliçons completades, insígnies.
 * 
 * Es sincronitza automàticament amb storage en cada canvi.
 */

import { useState, useCallback } from 'react'
import storage from '../storage/storageProvider'

// Estat inicial d'un usuari nou
const DEFAULT_STATE = {
  xp: 0,
  level: 1,
  completedLessons: [],    // ['module-01_lesson-01', ...]
  completedModules: [],    // ['module-01', ...]
  unlockedModules: ['module-01-copernicus'], // El primer sempre obert
  badges: [],              // ['badge-challenger', ...]
  navigationState: {
    currentModuleId: null,
    currentLessonId: null,
    currentStep: 0
  }
}

export function useProgress() {
  const [state, setState] = useState(() => {
    // Carrega l'estat desat o usa el de per defecte
    return storage.get('progress', DEFAULT_STATE)
  })

  // Funció interna per actualitzar i persistir
  const update = useCallback((updater) => {
    setState(prev => {
      const next = typeof updater === 'function' ? updater(prev) : { ...prev, ...updater }
      storage.set('progress', next)
      return next
    })
  }, [])

  // --- Accions públiques ---

  const addXP = useCallback((amount) => {
    update(prev => {
      const newXP = prev.xp + amount
      const newLevel = Math.floor(newXP / 100) + 1 // Cada 100 XP = 1 nivell
      return { ...prev, xp: newXP, level: newLevel }
    })
  }, [update])

  const completeLesson = useCallback((moduleId, lessonId) => {
    const key = `${moduleId}_${lessonId}`
    update(prev => {
      if (prev.completedLessons.includes(key)) return prev // Ja completada
      return { ...prev, completedLessons: [...prev.completedLessons, key] }
    })
  }, [update])

  const completeModule = useCallback((moduleId) => {
    update(prev => {
      if (prev.completedModules.includes(moduleId)) return prev
      return { ...prev, completedModules: [...prev.completedModules, moduleId] }
    })
  }, [update])

  const unlockModule = useCallback((moduleId) => {
    update(prev => {
      if (prev.unlockedModules.includes(moduleId)) return prev
      return { ...prev, unlockedModules: [...prev.unlockedModules, moduleId] }
    })
  }, [update])

  const earnBadge = useCallback((badgeId) => {
    update(prev => {
      if (prev.badges.includes(badgeId)) return prev
      return { ...prev, badges: [...prev.badges, badgeId] }
    })
  }, [update])

  const setNavigationState = useCallback((navState) => {
    update(prev => ({
      ...prev,
      navigationState: { ...prev.navigationState, ...navState }
    }))
  }, [update])

  const isLessonCompleted = useCallback((moduleId, lessonId) => {
    return state.completedLessons.includes(`${moduleId}_${lessonId}`)
  }, [state.completedLessons])

  const isModuleUnlocked = useCallback((moduleId) => {
    return state.unlockedModules.includes(moduleId)
  }, [state.unlockedModules])

  const resetAll = useCallback(() => {
    storage.clearAll()
    setState(DEFAULT_STATE)
  }, [])

  return {
    ...state,
    addXP,
    completeLesson,
    completeModule,
    unlockModule,
    earnBadge,
    setNavigationState,
    isLessonCompleted,
    isModuleUnlocked,
    resetAll
  }
}
