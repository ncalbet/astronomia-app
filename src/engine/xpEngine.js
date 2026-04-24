/**
 * xpEngine.js
 * 
 * Lògica pura de càlcul d'XP. Funcions sense React ni efectes secundaris.
 * Es poden testejar de forma independent.
 */

export const XP_VALUES = {
  CORRECT_FIRST:    10,  // Resposta correcta al primer intent
  CORRECT_SECOND:   5,   // Resposta correcta al segon intent
  HIGH_CONFIDENCE_CORRECT: 5,   // Bonus: alta confiança + correcte
  HIGH_CONFIDENCE_WRONG:  -3,   // Penalització: alta confiança + error
  EXPAND_BOX:       3,   // Obrir el box d'aprofundir
  COMPLETE_LESSON:  20,  // Completar una lliçó
  COMPLETE_MODULE:  100  // Completar un mòdul
}

/**
 * Calcula l'XP guanyat en una resposta
 * @param {boolean} correct - Si la resposta és correcta
 * @param {number} attempt - Número d'intent (1, 2, ...)
 * @param {number} confidence - Confiança de l'usuari (1-3: baixa/mitjana/alta)
 */
export function calculateAnswerXP(correct, attempt = 1, confidence = 2) {
  let xp = 0

  if (correct) {
    xp += attempt === 1 ? XP_VALUES.CORRECT_FIRST : XP_VALUES.CORRECT_SECOND
    if (confidence === 3) xp += XP_VALUES.HIGH_CONFIDENCE_CORRECT
  } else {
    if (confidence === 3) xp += XP_VALUES.HIGH_CONFIDENCE_WRONG
  }

  return xp
}

/**
 * Calcula el nivell a partir de l'XP total
 * Progressió: cada nivell requereix 100 XP més que l'anterior
 * Nivell 1: 0-99, Nivell 2: 100-299, Nivell 3: 300-599...
 */
export function calculateLevel(totalXP) {
  let level = 1
  let required = 100
  let accumulated = 0

  while (totalXP >= accumulated + required) {
    accumulated += required
    required += 50
    level++
  }

  return {
    level,
    xpInLevel: totalXP - accumulated,
    xpForNext: required,
    progress: (totalXP - accumulated) / required // 0 a 1
  }
}

/**
 * Títol del nivell per mostrar a la UI
 */
export function getLevelTitle(level) {
  const titles = {
    1:  'Recluta',
    2:  'Observador',
    3:  'Analista',
    4:  'Explorador',
    5:  'Científic',
    6:  'Investigador',
    7:  'Astrofísic',
    8:  'Cosmòleg',
    9:  'Teòric',
    10: 'Mestre de l\'Univers'
  }
  return titles[Math.min(level, 10)] || 'Llegenda Còsmica'
}
