/**
 * moduleRegistry.js
 * 
 * Registre central de tots els mòduls disponibles.
 * Afegir un nou mòdul = afegir una entrada aquí + crear el JSON.
 * Cap altre fitxer s'ha de modificar.
 */

export const MODULE_REGISTRY = [
  {
    id: 'module-01-copernicus',
    phase: 1,
    order: 1,
    file: () => import('./modules/module-01-copernicus.json')
  }
  // Nous mòduls s'afegeixen aquí:
  // { id: 'module-02-gravity', phase: 1, order: 2, file: () => import('./modules/module-02-gravity.json') }
]

/**
 * Carrega les dades d'un mòdul per ID
 */
export async function loadModule(moduleId) {
  const entry = MODULE_REGISTRY.find(m => m.id === moduleId)
  if (!entry) throw new Error(`Mòdul no trobat: ${moduleId}`)
  const data = await entry.file()
  return data.default || data
}

/**
 * Retorna la llista bàsica de mòduls (sense carregar el JSON complet)
 */
export function getModuleList() {
  return MODULE_REGISTRY.map(({ id, phase, order }) => ({ id, phase, order }))
}
