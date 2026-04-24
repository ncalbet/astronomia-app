const UNLOCK_MAP = {
  'module-01-copernicus': ['module-02-history'],
  'module-02-history':    []
}

export function getUnlocksForModule(completedModuleId) {
  return UNLOCK_MAP[completedModuleId] || []
}

export function canUnlockModule(moduleId, completedModules) {
  const unlockedBy = Object.entries(UNLOCK_MAP)
    .filter(([, unlocks]) => unlocks.includes(moduleId))
    .map(([source]) => source)
  if (unlockedBy.length === 0) return true
  return unlockedBy.some(m => completedModules.includes(m))
}
