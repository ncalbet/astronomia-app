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
  unlockedModules: [
    'module-01-copernicus','module-02-history','module-03-peace','module-04-philosophy',
    'module-05-birding','module-06-chemistry','module-07-particles',
    // Bloc: Historia Antiga
    'module-08-grecia','module-09-roma',
    'module-10-republic-crisis','module-11-augustus','module-12-pax-romana','module-13-fall',
    'module-14-egipte',
    'module-15-egipte-origins','module-16-egipte-imperi','module-17-egipte-religio','module-18-egipte-fi',
    // Bloc: Música
    'module-08-musica-classica','module-09-historia-rock',
    // Bloc: Ciències i Arts
    'module-10-neurociencia','module-12-historia-ciencia','module-13-historia-tecnologia','module-11-pintura',
    // Bloc: Política Moderna i Drets Humans
    'module-14-revolucio-francesa',
    'module-15-fonaments-drets-humans','module-16-sistema-internacional-drets-humans',
    'module-17-justicia-internacional','module-18-casos-drets-humans',
    'module-19-actors-no-estatals','module-20-fronteres-drets-humans',
    // Bloc: Economia
    'module-19-economia-mon','module-22-economia-historia','module-25-economia-micro',
    'module-20-economia-macro','module-21-economia-desigualtat',
    'module-23-economia-escoles','module-24-economia-globalitzacio','module-28-piketty',
    'module-26-economia-comportament','module-27-economia-jocs',
    // Bloc: Química
    'module-29-quimica','module-30-quimica-atoms','module-31-quimica-reaccions','module-32-quimica-vida',
    // Bloc: Biologia
    'module-08-biologia','module-33-evolucio','module-35-genetica',
    // Bloc: Física
    'module-34-mecanica-classica','module-36-termodinamica','module-37-electromagnetisme','module-38-relativitat',
    // Bloc: Filosofia
    'module-30-introduccio-filosofia','module-09-filosofia-politica',
    'module-31-etica','module-32-logica-argumentacio','module-33-epistemologia',
    // Bloc: Astronomia (nous)
    'module-09-bigbang','module-10-estrelles',
    // Bloc: Biologia i Física (nous)
    'module-08-neurociencia','module-08-relativitat',
    // Bloc: Literatura
    'module-01-antiguitat-origens','module-02-edat-mitjana-renaixement',
    'module-05-avantguardes','module-06-novella-segle-xx','module-08-postmodernisme',
    // Bloc: Arquitectura
    'module-XX-arquitectura-01','module-XX-arquitectura-02',
    'module-XX-arquitectura-03','module-XX-arquitectura-04',
    // Bloc: Arts i Cultura
    'module-XX-cinema','module-30-opera',
    // Bloc: Relacions Internacionals (nous)
    'module-XX-ddhh-ordre-internacional','module-XX-teoria-ri',
    // Bloc: Societat i Política
    'module-34-democracia-sistemes-politics','module-XX-sociologia',
    // Bloc: Filosofia (nous)
    'module-XX-intro-filosofia','module-XX-etica-practica','module-XX-filosofia-llenguatge',
    // Bloc: Astronomia (nous 2)
    'module-08-origen-desti-univers','module-09-materia-energia-fosques',
    'module-10-forats-negres','module-11-mons-alla',
    // Bloc: Física (nous)
    'module-10-caos','module-12-temps-espai-limits',
    // Bloc: Biologia (nous)
    'module-09-cos-huma','module-11-ecologia','module-13-trauma-resiliencia',
    // Bloc: Ment i Comportament
    'module-12-ment-enganya','module-14-obediencia',
    // Bloc: Diplomàcia
    'module-XX-diplomacia-negociacio','module-XX-historia-diplomacia','module-XX-organismes-internacionals',
    // Bloc: Biografies
    'module-bio-cesar','module-bio-alexandre','module-bio-bismarck','module-bio-churchill','module-bio-rasputin',
    'module-bio-lincoln','module-bio-bolivar','module-bio-lenin',
    'module-bio-napoleon','module-bio-napoleon3','module-bio-genguis',
    'module-bio-cleopatra','module-bio-maquiavel','module-bio-gandhi',
    'module-bio-frederic',
  ],
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
    unlockedModules:      [...new Set([...DEFAULT_STATE.unlockedModules, ...(saved.unlockedModules || [])])],
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
    unlockModule, earnBadge, setNavigationState,
    isLessonCompleted, isItineraryCompleted, isModuleUnlocked, resetAll, repeatModule,
    updateSrData, updateSrStreak, setUserProfile, setFontSize,
    toggleFavorite, completeCapsule, initWeekIfNeeded, markWeekSummaryShown
  }
}
