export const MODULE_REGISTRY = [
  { id: 'module-01-copernicus',  phase: 1, order: 1, file: () => import('./modules/module-01-copernicus.json') },
  { id: 'module-02-history',     phase: 1, order: 2, file: () => import('./modules/module-02-history.json') },
  { id: 'module-03-peace',       phase: 1, order: 3, file: () => import('./modules/module-03-peace.json') },
  { id: 'module-04-philosophy',  phase: 1, order: 4, file: () => import('./modules/module-04-philosophy.json') },
  { id: 'module-05-birding',     phase: 1, order: 5, file: () => import('./modules/module-05-birding.json') },
  { id: 'module-06-chemistry',   phase: 1, order: 6, file: () => import('./modules/module-06-chemistry.json') },
  { id: 'module-07-particles',   phase: 1, order: 7, file: () => import('./modules/module-07-particles.json') }
]

export async function loadModule(moduleId) {
  const entry = MODULE_REGISTRY.find(m => m.id === moduleId)
  if (!entry) throw new Error(`Mòdul no trobat: ${moduleId}`)
  const data = await entry.file()
  return data.default || data
}

export function getModuleList() {
  return MODULE_REGISTRY.map(({ id, phase, order }) => ({ id, phase, order }))
}
