// Tots els mòduls estan oberts des del principi.
// El mapa UNLOCK_MAP queda per si en el futur es volen afegir prerequisits.
const UNLOCK_MAP = {}

export function getUnlocksForModule(completedModuleId) {
  return UNLOCK_MAP[completedModuleId] || []
}

export function canUnlockModule(moduleId, completedModules) {
  return true // sempre accessible
}
