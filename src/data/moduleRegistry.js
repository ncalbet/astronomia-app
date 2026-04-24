export const MODULE_REGISTRY = [
  {
    id: 'module-01-copernicus',
    phase: 1,
    order: 1,
    file: () => import('./modules/module-01-copernicus.json')
  },
  {
    id: 'module-02-history',
    phase: 1,
    order: 2,
    file: () => import('./modules/module-02-history.json')
  }
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
