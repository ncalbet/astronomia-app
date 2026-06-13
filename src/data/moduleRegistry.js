/**
 * moduleRegistry.js — catàleg autodescobert
 *
 * Les metadades viuen DINS de cada src/data/modules/*.json
 * (title, emoji, area, topic, level, xp, order, glossaryTerms).
 * catalog.json es genera automàticament amb `npm run catalog`
 * (i abans de cada dev/build via predev/prebuild).
 *
 * ➜ Afegir un mòdul nou = crear el JSON a src/data/modules/. Cap altre pas.
 */
import catalog from './catalog.json'

// Loaders lazy: cada mòdul es carrega només quan es demana
const loaders = import.meta.glob('./modules/*.json')

export const MODULE_REGISTRY = catalog

const cache = new Map()

export async function loadModule(moduleId) {
  if (cache.has(moduleId)) return cache.get(moduleId)
  const entry = catalog.find(m => m.id === moduleId)
  if (!entry) throw new Error(`Mòdul no trobat: ${moduleId}`)
  const loader = loaders[`./modules/${entry.file}`]
  if (!loader) throw new Error(`Fitxer de mòdul no trobat: ${entry.file}`)
  const data = await loader()
  const moduleData = data.default || data
  cache.set(moduleId, moduleData)
  return moduleData
}

export function getModuleMeta(moduleId) {
  return catalog.find(m => m.id === moduleId) || null
}

export function getModuleList() {
  return catalog.map(({ id, phase, order }) => ({ id, phase, order }))
}

/** Retorna l'entrada del catàleg que cobreix el terme de glossari, o null. */
export function getModuleForTerm(termId) {
  return catalog.find(m => (m.glossaryTerms || []).includes(termId)) || null
}
