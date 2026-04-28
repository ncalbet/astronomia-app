/**
 * useProgress.js — versió corregida
 * Ara fa merge segur entre l'estat del storage i el DEFAULT_STATE
 * per garantir que camps nous existeixin en usuaris antics.
 */

import { useState, useCallback } from 'react'
import storage from '../storage/storageProvider'

const DEFAULT_STATE = {
  xp: 0,
  level: 1,
  completedLessons: [],
  completedModules: [],
  completedItineraries: [],
  unlockedModules: ['module-01-copernicus','module-02-history','module-03-peace','module-04-philosophy','module-05-birding','module-06-chemistry','module-07-particles'],
  badges: [],
  navigationState: {
    currentModuleId: null,
    currentItineraryId: null,
    currentLessonId: null,
    currentStep: 0
  }
}

// Merge segur: garanteix que tots els camps del DEFAULT_STATE existeixin
function mergeWithDefaults(saved) {
  return {
    ...DEFAULT_STATE,
    ...saved,
    // Arrays: usa el valor desat si existeix, sinó el default
    completedLessons:     saved.completedLessons     || DEFAULT_STATE.completedLessons,
    completedModules:     saved.completedModules      || DEFAULT_STATE.completedModules,
    completedItineraries: saved.completedItineraries  || DEFAULT_STATE.completedItineraries,
    unlockedModules:      saved.unlockedModules        || DEFAULT_STATE.unlockedModules,
    badges:               saved.badges                 || DEFAULT_STATE.badges,
    navigationState: {
      ...DEFAULT_STATE.navigationState,
      ...(saved.navigationState || {})
    }
  }
}

export function useProgress() {
  const [state, setState] = useState(() => {
    const saved = storage.get('progress', null)
    return saved ? mergeWithDefaults(saved) : DEFAULT_STATE
  })

  const update = useCallback((updater) => {
    setState(prev => {
      const next = typeof updater === 'function' ? updater(prev) : { ...prev, ...updater }
      storage.set('progress', next)
      return next
    })
  }, [])

  const addXP = useCallback((amount) => {
    if (!amount || amount === 0) return
    update(prev => {
      const newXP = prev.xp + amount
      const newLevel = Math.floor(newXP / 100) + 1
      return { ...prev, xp: newXP, level: newLevel }
    })
  }, [update])

  const lessonKey = (moduleId, itineraryId, lessonId) =>
    itineraryId ? `${moduleId}__${itineraryId}__${lessonId}` : `${moduleId}__${lessonId}`

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

  const isLessonCompleted = useCallback((moduleId, lessonId, itineraryId = null) =>
    state.completedLessons.includes(lessonKey(moduleId, itineraryId, lessonId)),
  [state.completedLessons])

  const isItineraryCompleted = useCallback((moduleId, itineraryId) =>
    (state.completedItineraries || []).includes(`${moduleId}__${itineraryId}`),
  [state.completedItineraries])

  const isModuleUnlocked = useCallback((moduleId) =>
    state.unlockedModules.includes(moduleId),
  [state.unlockedModules])


  const repeatModule = useCallback((moduleId, xpToSubtract = 0) => {
    update(prev => {
      // Elimina lliçons completades d'aquest mòdul
      const completedLessons = prev.completedLessons.filter(
        key => !key.startsWith(moduleId + '__')
      )
      // Elimina itineraris completats d'aquest mòdul
      const completedItineraries = (prev.completedItineraries || []).filter(
        key => !key.startsWith(moduleId + '__')
      )
      // Elimina el mòdul de completats
      const completedModules = prev.completedModules.filter(id => id !== moduleId)
      // Resta l'XP del mòdul (mínim 0)
      const newXP = Math.max(0, prev.xp - xpToSubtract)
      const newLevel = Math.floor(newXP / 100) + 1

      return {
        ...prev,
        completedLessons,
        completedItineraries,
        completedModules,
        xp: newXP,
        level: newLevel
      }
    })
  }, [update])

  const resetAll = useCallback(() => {
    storage.clearAll()
    setState(DEFAULT_STATE)
  }, [])

  return {
    ...state,
    addXP, completeLesson, completeModule, completeItinerary,
    unlockModule, earnBadge, setNavigationState,
    isLessonCompleted, isItineraryCompleted, isModuleUnlocked, resetAll, repeatModule
  }
}
