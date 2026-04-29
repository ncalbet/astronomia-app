/**
 * badgeEngine.js
 * 
 * Definició de totes les insígnies i lògica per comprovar
 * si s'han de desbloquejar. Funcions pures.
 */

export const BADGES = {
  'first-lesson': {
    id: 'first-lesson',
    name: 'Primera Missió',
    description: 'Has completat la teva primera lliçó',
    emoji: '🚀',
    rarity: 'common'
  },
  'dogma-challenger': {
    id: 'dogma-challenger',
    name: 'Desafiador del Dogma',
    description: 'Has descobert per què la Terra no és el centre',
    emoji: '🔭',
    rarity: 'uncommon'
  },
  'orbit-master': {
    id: 'orbit-master',
    name: 'Mestre de les Òrbites',
    description: 'Has completat el mòdul d\'òrbites sense errors',
    emoji: '🪐',
    rarity: 'rare'
  },
  'deep-thinker': {
    id: 'deep-thinker',
    name: 'Pensament Profund',
    description: 'Has obert el box d\'aprofundir 10 vegades',
    emoji: '🧠',
    rarity: 'uncommon'
  },
  'confident-scientist': {
    id: 'confident-scientist',
    name: 'Científic Segur',
    description: '5 respostes amb alta confiança correctes seguides',
    emoji: '⭐',
    rarity: 'rare'
  },
  'copernicus-complete': {
    id: 'copernicus-complete',
    name: 'Revolució Copernicana',
    description: 'Has completat el mòdul de Copèrnic',
    emoji: '☀️',
    rarity: 'epic'
  },
  'constancia': {
    id: 'constancia',
    name: 'Constància',
    description: 'Has fet sessió de repàs 7 dies seguits',
    emoji: '🔥',
    rarity: 'rare'
  }
}

/**
 * Comprova quines insígnies noves s'han de donar
 * @param {Object} progress - Estat actual del progrés
 * @param {Object} event - L'event que acaba de passar { type, data }
 * @returns {string[]} - Array d'IDs d'insígnies noves
 */
export function checkNewBadges(progress, event) {
  const newBadges = []
  const earned = progress.badges || []

  const check = (badgeId, condition) => {
    if (!earned.includes(badgeId) && condition) {
      newBadges.push(badgeId)
    }
  }

  if (event.type === 'lesson_complete') {
    check('first-lesson', progress.completedLessons.length === 1)
  }

  if (event.type === 'module_complete') {
    check('copernicus-complete', event.data.moduleId === 'module-01-copernicus')
  }

  if (event.type === 'sr_review_done') {
    check('constancia', (progress.srStreak || 0) >= 7)
  }

  if (event.type === 'expand_box') {
    const expandCount = (progress.expandCount || 0) + 1
    check('deep-thinker', expandCount >= 10)
  }

  return newBadges
}
