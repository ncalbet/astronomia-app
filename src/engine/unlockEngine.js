/**
 * unlockEngine.js
 * 
 * Gestiona quin mòdul es desbloqueja quan es completa un altre.
 * Permet definir prerequisits i branques.
 */

// Mapa de desbloquejos: completar X desbloqueja Y
const UNLOCK_MAP = {
  'module-01-copernicus': ['module-02-gravity'],
  'module-02-gravity':    ['module-03-light', 'module-03-orbits'],
  'module-03-light':      ['module-04-stellar'],
  'module-03-orbits':     ['module-04-stellar']
}

/**
 * Retorna els mòduls que es desbloquegen en completar un mòdul
 * @param {string} completedModuleId
 * @returns {string[]}
 */
export function getUnlocksForModule(completedModuleId) {
  return UNLOCK_MAP[completedModuleId] || []
}

/**
 * Comprova si un mòdul es pot desbloquejar donats els mòduls completats
 */
export function canUnlockModule(moduleId, completedModules) {
  // Troba si algú al mapa el desbloqueja
  const unlockedBy = Object.entries(UNLOCK_MAP)
    .filter(([, unlocks]) => unlocks.includes(moduleId))
    .map(([source]) => source)

  if (unlockedBy.length === 0) return true // Mòdul inicial, sempre obert
  return unlockedBy.some(m => completedModules.includes(m))
}
