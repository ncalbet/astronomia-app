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
    hint: 'Completa qualsevol mòdul per primera vegada.',
    emoji: '🚀',
    rarity: 'common'
  },
  'dogma-challenger': {
    id: 'dogma-challenger',
    name: 'Desafiador del Dogma',
    description: 'Has descobert per què la Terra no és el centre',
    hint: 'Completa el mòdul La Revolució Copernicana.',
    emoji: '🔭',
    rarity: 'uncommon'
  },
  'orbit-master': {
    id: 'orbit-master',
    name: 'Mestre de les Òrbites',
    description: 'Has completat el mòdul d\'òrbites sense errors',
    hint: 'Completa el mòdul de les lleis de Kepler responent totes les preguntes correctament.',
    emoji: '🪐',
    rarity: 'rare'
  },
  'deep-thinker': {
    id: 'deep-thinker',
    name: 'Pensament Profund',
    description: 'Has obert el box d\'aprofundir 10 vegades',
    hint: 'Obre el panell "Vull aprofundir" durant les lliçons. Acumula 10 obertures en total.',
    emoji: '🧠',
    rarity: 'uncommon'
  },
  'confident-scientist': {
    id: 'confident-scientist',
    name: 'Científic Segur',
    description: '5 respostes amb alta confiança correctes seguides',
    hint: 'Selecciona el nivell de confiança màxim i encerta 5 preguntes consecutives.',
    emoji: '⭐',
    rarity: 'rare'
  },
  'copernicus-complete': {
    id: 'copernicus-complete',
    name: 'Revolució Copernicana',
    description: 'Has completat el mòdul de Copèrnic',
    hint: 'Completa íntegrament el mòdul La Revolució Copernicana.',
    emoji: '☀️',
    rarity: 'epic'
  },
  'constancia': {
    id: 'constancia',
    name: 'Constància',
    description: 'Has fet sessió de repàs 7 dies seguits',
    hint: 'Fes una sessió de repàs cada dia durant 7 dies consecutius. Troba els repassos pendents a la pantalla d\'inici.',
    emoji: '🔥',
    rarity: 'rare'
  },
  'first-capsule': {
    id: 'first-capsule',
    name: 'Primera Càpsula',
    description: 'Has completat la teva primera micro-càpsula',
    hint: 'Completa qualsevol micro-càpsula del catàleg (2-5 minuts cadascuna).',
    emoji: '⚡',
    rarity: 'common'
  },
  'capsule-collector': {
    id: 'capsule-collector',
    name: 'Col·leccionista',
    description: 'Has completat 5 micro-càpsules',
    hint: 'Completa 5 micro-càpsules en total. Trobaràs el catàleg sencer a la pantalla d\'inici.',
    emoji: '🧪',
    rarity: 'uncommon'
  },
  'capsule-master': {
    id: 'capsule-master',
    name: 'Mestre de les Càpsules',
    description: 'Has completat 10 micro-càpsules',
    hint: 'Completa 10 micro-càpsules en total.',
    emoji: '🔬',
    rarity: 'rare'
  },
  'path-complete': {
    id: 'path-complete',
    name: 'Itinerari Completat',
    description: 'Has completat el teu primer itinerari d\'aprenentatge sencer',
    hint: 'Completa tots els mòduls d\'un itinerari. Troba els itineraris a la pantalla d\'inici.',
    emoji: '🎓',
    rarity: 'epic'
  },
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

  if (event.type === 'capsule_done') {
    // count is the number BEFORE this completion; check exact thresholds
    const count = (progress.completedCapsules || []).length
    check('first-capsule',     count === 0)
    check('capsule-collector', count + 1 === 5)
    check('capsule-master',    count + 1 === 10)
  }

  if (event.type === 'path_complete') {
    check('path-complete', true)
  }

  return newBadges
}
