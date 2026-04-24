/**
 * useProgress.js
 *
 * Hook central que gestiona tot l'estat de l'usuari.
 * Actualitzat per suportar itineraris: el progrés de cada itinerari
 * es guarda de forma independent sota la clau moduleId + itineraryId.
 */

import { useState, useCallback } from 'react'
import storage from '../storage/storageProvider'

const DEFAULT_STATE = {
  xp: 0,
  level: 1,
  completedLessons: [],
  completedModules: [],
  completedItineraries: [], // ['module-02-history__chronological', ...]
  unlockedModules: ['module-01-copernicus'],
  badges: [],
  navigationState: {
    currentModuleId: null,
    currentItineraryId: null, // NOU
    currentLessonId: null,
    currentStep: 0
  }
}

export function useProgress() {
  const [state, setState] = useState(() =>
    storage.get('progress', DEFAULT_STATE)
  )

  const update = useCallback((updater) => {
    setState(prev => {
      const next = typeof updater === 'function' ? updater(prev) : { ...prev, ...updater }
      storage.set('progress', next)
      return next
    })
  }, [])

  const addXP = useCallback((amount) => {
    update(prev => {
      const newXP = prev.xp + amount
      const newLevel = Math.floor(newXP / 100) + 1
      return { ...prev, xp: newXP, level: newLevel }
    })
  }, [update])

  // Clau única per lliçó dins d'un itinerari
  const lessonKey = (moduleId, itineraryId, lessonId) =>
    itineraryId
      ? `${moduleId}__${itineraryId}__${lessonId}`
      : `${moduleId}__${lessonId}`

  const completeLesson = useCallback((moduleId, lessonId, itineraryId = null) => {
    const key = lessonKey(moduleId, itineraryId, lessonId)
    update(prev => {
      if (prev.completedLessons.includes(key)) return prev
      return { ...prev, completedLessons: [...prev.completedLessons, key] }
    })
  }, [update])

  const completeModule = useCallback((moduleId) => {
    update(prev => {
      if (prev.completedModules.includes(moduleId)) return prev
      return { ...prev, completedModules: [...prev.completedModules, moduleId] }
    })
  }, [update])

  const completeItinerary = useCallback((moduleId, itineraryId) => {
    const key = `${moduleId}__${itineraryId}`
    update(prev => {
      if ((prev.completedItineraries || []).includes(key)) return prev
      return { ...prev, completedItineraries: [...(prev.completedItineraries || []), key] }
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

  const isLessonCompleted = useCallback((moduleId, lessonId, itineraryId = null) => {
    const key = lessonKey(moduleId, itineraryId, lessonId)
    return state.completedLessons.includes(key)
  }, [state.completedLessons])

  const isItineraryCompleted = useCallback((moduleId, itineraryId) => {
    return (state.completedItineraries || []).includes(`${moduleId}__${itineraryId}`)
  }, [state.completedItineraries])

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
    completeItinerary,
    unlockModule,
    earnBadge,
    setNavigationState,
    isLessonCompleted,
    isItineraryCompleted,
    isModuleUnlocked,
    resetAll
  }
}
