/**
 * spacedRepetitionEngine.js
 *
 * Algorisme SM-2 adaptat per a blocs d'exercici individuals.
 * Sense backend — tot a localStorage via useProgress.
 *
 * Mapatge qualitat → resposta de l'usuari:
 *   Correcte + alta confiança (3)  → qualitat 5
 *   Correcte + confiança mitjana (2) → qualitat 4
 *   Correcte + poca confiança (1)  → qualitat 3
 *   Incorrecte + alta confiança (3) → qualitat 1
 *   Incorrecte + altra confiança   → qualitat 2
 */

export function computeQuality(correct, confidence) {
  if (correct) {
    if (confidence === 3) return 5
    if (confidence === 2) return 4
    return 3
  } else {
    if (confidence === 3) return 1
    return 2
  }
}

export function calculateNextReview(quality, currentState = {}) {
  const {
    interval     = 1,
    easeFactor   = 2.5,
    repetitions  = 0
  } = currentState

  let newEaseFactor = easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))
  newEaseFactor = Math.max(1.3, newEaseFactor)

  let newInterval, newRepetitions

  if (quality < 3) {
    // Resposta incorrecta o molt insegura: reiniciar
    newInterval    = 1
    newRepetitions = 0
  } else {
    newRepetitions = repetitions + 1
    if (newRepetitions === 1)      newInterval = 1
    else if (newRepetitions === 2) newInterval = 6
    else newInterval = Math.round(interval * newEaseFactor)
  }

  return {
    interval:    newInterval,
    easeFactor:  newEaseFactor,
    repetitions: newRepetitions,
    nextReview:  Date.now() + newInterval * 24 * 60 * 60 * 1000,
    lastQuality: quality
  }
}

export function isDue(reviewState) {
  if (!reviewState?.nextReview) return true
  return Date.now() >= reviewState.nextReview
}

export function getDueItems(srData) {
  return Object.entries(srData || {})
    .filter(([, state]) => isDue(state))
    .map(([id]) => id)
}

export function countDueToday(srData) {
  return getDueItems(srData).length
}
