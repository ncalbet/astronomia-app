/**
 * levels.js — l'escala de profunditat de l'Acadèmia
 *
 * La profunditat viu a l'ITINERARI, no al mòdul: un mòdul pot oferir una
 * entrada inicial i una capa avançada del mateix tema. El mòdul hereta el
 * nivell d'entrada (el més baix dels seus itineraris).
 *
 * Gating suau: el nivell mai bloqueja. Informa i recomana l'ordre.
 */

export const LEVELS = [
  {
    id: 'inicial',
    label: 'Inicial',
    order: 1,
    /** Què demana al lector */
    demands: 'Sense requisits previs',
    /** Què hi trobarà */
    promise: 'Els conceptes i per què importen',
    color: 'var(--color-text-dim)',
  },
  {
    id: 'intermedi',
    label: 'Intermedi',
    order: 2,
    demands: 'Convé conèixer els conceptes bàsics del tema',
    promise: 'El mecanisme: com funciona i per què és així',
    color: 'var(--color-accent)',
  },
  {
    id: 'avancat',
    label: 'Avançat',
    order: 3,
    demands: 'Assumeix el mecanisme conegut',
    promise: 'El formalisme, els casos límit i el debat obert',
    color: 'var(--color-xp)',
  },
]

const BY_ID = Object.fromEntries(LEVELS.map(l => [l.id, l]))

export const DEFAULT_LEVEL = 'inicial'

/** Definició d'un nivell. Torna el nivell inicial si l'id no existeix. */
export const getLevel = (id) => BY_ID[id] || BY_ID[DEFAULT_LEVEL]

/** Ordre numèric d'un nivell (1..3), per comparar i ordenar. */
export const levelOrder = (id) => getLevel(id).order

/** true si `id` és un nivell reconegut. */
export const isLevel = (id) => Boolean(BY_ID[id])

/** El nivell d'entrada (més baix) d'una llista d'ids. */
export function lowestLevel(ids = []) {
  const known = ids.filter(isLevel)
  if (!known.length) return DEFAULT_LEVEL
  return known.reduce((a, b) => (levelOrder(a) <= levelOrder(b) ? a : b))
}

/** El nivell més alt d'una llista d'ids. */
export function highestLevel(ids = []) {
  const known = ids.filter(isLevel)
  if (!known.length) return DEFAULT_LEVEL
  return known.reduce((a, b) => (levelOrder(a) >= levelOrder(b) ? a : b))
}

/**
 * Etiqueta d'abast per a un mòdul: "Inicial" si només té un nivell,
 * "Inicial → Avançat" si en cobreix diversos.
 */
export function levelRangeLabel(ids = []) {
  const low = lowestLevel(ids)
  const high = highestLevel(ids)
  return low === high
    ? getLevel(low).label
    : `${getLevel(low).label} → ${getLevel(high).label}`
}
