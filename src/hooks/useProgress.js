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
  badges: [],
  srData: {},            // Spaced Repetition: { blockId: { interval, easeFactor, repetitions, nextReview } }
  srStreak: 0,           // Dies consecutius de sessió de repàs
  srLastReviewDate: null, // Data de l'última sessió (YYYY-MM-DD)
  userProfile: null,     // { sessionTime: '5'|'15'|'30', level: 'new'|'some'|'experienced' }
  fontSize: 'medium',   // 'small' | 'medium' | 'large'
  favorites: [],
  completedCapsules: [],
  srStreakMax: 0,
  weekStart: null,
  weekXP: 0,
  weekModules: 0,
  weekReviews: 0,
  prevWeekSnapshot: null,
  weekSummaryShown: true,
  navigationState: {
    currentModuleId: null,
    currentItineraryId: null,
    currentLessonId: null,
    currentStep: 0,
    currentAreaId: null,
    currentPathId: null,
    currentCapsuleId: null,
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
    badges:               saved.badges                 || DEFAULT_STATE.badges,
    srData:               saved.srData                 || DEFAULT_STATE.srData,
    srStreak:             saved.srStreak               ?? DEFAULT_STATE.srStreak,
    srLastReviewDate:     saved.srLastReviewDate        || DEFAULT_STATE.srLastReviewDate,
    userProfile:          saved.userProfile             ?? DEFAULT_STATE.userProfile,
    fontSize:             saved.fontSize                ?? DEFAULT_STATE.fontSize,
    favorites:            saved.favorites               || DEFAULT_STATE.favorites,
    completedCapsules:    saved.completedCapsules        || DEFAULT_STATE.completedCapsules,
    srStreakMax:          saved.srStreakMax               ?? DEFAULT_STATE.srStreakMax,
    weekStart:            saved.weekStart                ?? DEFAULT_STATE.weekStart,
    weekXP:               saved.weekXP                   ?? DEFAULT_STATE.weekXP,
    weekModules:          saved.weekModules               ?? DEFAULT_STATE.weekModules,
    weekReviews:          saved.weekReviews               ?? DEFAULT_STATE.weekReviews,
    prevWeekSnapshot:     saved.prevWeekSnapshot          ?? DEFAULT_STATE.prevWeekSnapshot,
    weekSummaryShown:     saved.weekSummaryShown          ?? DEFAULT_STATE.weekSummaryShown,
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
      return { ...prev, xp: newXP, level: newLevel, weekXP: (prev.weekXP || 0) + amount }
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
      return {
        ...prev,
        completedModules: [...prev.completedModules, moduleId],
        weekModules: (prev.weekModules || 0) + 1
      }
    })
  }, [update])

  const completeItinerary = useCallback((moduleId, itineraryId) => {
    const key = `${moduleId}__${itineraryId}`
    update(prev => {
      if ((prev.completedItineraries || []).includes(key)) return prev
      return { ...prev, completedItineraries: [...(prev.completedItineraries || []), key] }
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

  // Gating suau: tot el catàleg és accessible; l'app recomana ordre, mai bloqueja
  const isModuleUnlocked = useCallback(() => true, [])


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

  const updateSrData = useCallback((blockId, newState) => {
    update(prev => ({
      ...prev,
      srData: { ...prev.srData, [blockId]: newState }
    }))
  }, [update])

  const setUserProfile = useCallback((profile) => {
    update(prev => ({ ...prev, userProfile: profile }))
  }, [update])

  const setFontSize = useCallback((size) => {
    update(prev => ({ ...prev, fontSize: size }))
  }, [update])

  const updateSrStreak = useCallback(() => {
    const today = new Date().toISOString().split('T')[0]
    update(prev => {
      if (prev.srLastReviewDate === today) return prev
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0]
      const newStreak = prev.srLastReviewDate === yesterday ? (prev.srStreak || 0) + 1 : 1
      return {
        ...prev,
        srStreak: newStreak,
        srLastReviewDate: today,
        srStreakMax: Math.max(prev.srStreakMax || 0, newStreak),
        weekReviews: (prev.weekReviews || 0) + 1
      }
    })
  }, [update])

  const toggleFavorite = useCallback((id) => {
    update(prev => ({
      ...prev,
      favorites: (prev.favorites || []).includes(id)
        ? (prev.favorites || []).filter(f => f !== id)
        : [...(prev.favorites || []), id]
    }))
  }, [update])

  const completeCapsule = useCallback((id) => {
    update(prev => {
      if ((prev.completedCapsules || []).includes(id)) return prev
      return { ...prev, completedCapsules: [...(prev.completedCapsules || []), id] }
    })
  }, [update])

  const initWeekIfNeeded = useCallback(() => {
    const d = new Date()
    const day = d.getDay()
    const diff = day === 0 ? -6 : 1 - day
    d.setDate(d.getDate() + diff)
    const monday = d.toISOString().split('T')[0]
    update(prev => {
      if (prev.weekStart === monday) return prev
      const snapshot = prev.weekStart ? {
        xp: prev.weekXP || 0, modules: prev.weekModules || 0,
        reviews: prev.weekReviews || 0, weekStart: prev.weekStart
      } : null
      return {
        ...prev, weekStart: monday, weekXP: 0, weekModules: 0, weekReviews: 0,
        prevWeekSnapshot: snapshot, weekSummaryShown: snapshot ? false : true
      }
    })
  }, [update])

  const markWeekSummaryShown = useCallback(() => {
    update(prev => ({ ...prev, weekSummaryShown: true }))
  }, [update])

  const resetAll = useCallback(() => {
    storage.clearAll()
    setState(DEFAULT_STATE)
  }, [])

  return {
    ...state,
    addXP, completeLesson, completeModule, completeItinerary,
    earnBadge, setNavigationState,
    isLessonCompleted, isItineraryCompleted, isModuleUnlocked, resetAll, repeatModule,
    updateSrData, updateSrStreak, setUserProfile, setFontSize,
    toggleFavorite, completeCapsule, initWeekIfNeeded, markWeekSummaryShown
  }
}
