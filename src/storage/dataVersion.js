/**
 * dataVersion.js
 *
 * Control de versió de les dades guardades.
 *
 * POLÍTICA DE VERSIONS (a partir de v11):
 * ─────────────────────────────────────────
 * - Afegir mòduls nous        → NO cal incrementar. mergeWithDefaults ho gestiona.
 * - Afegir camps a l'estat    → NO cal incrementar. mergeWithDefaults ho gestiona.
 * - Canviar el FORMAT del storage (claus, estructura)  → SÍ, incrementar.
 *
 * El reset total és l'últim recurs, no la resposta per defecte.
 * A partir de v11 les migracions son additives: s'afegeix el que falta,
 * mai s'esborra el progrés de l'usuari per canvis de contingut.
 */

import storage from './storageProvider'

export const DATA_VERSION = 12  // v12: nous mòduls biologia, física i filosofia (33-38, 08-bio, 09-fp, 30-if)

const VERSION_KEY = 'data_version'

/**
 * Comprova la versió de les dades desades i migra si cal.
 * - Pre-v10: reset (el mergeWithDefaults antic no era prou robust)
 * - v10+:    no reset; mergeWithDefaults afegeix els camps nous sense esborrar res
 * Retorna true si s'ha fet reset, false en cas contrari.
 */
export function checkAndMigrateData() {
  const savedVersion = storage.get(VERSION_KEY, null)

  if (savedVersion === DATA_VERSION) return false  // res a fer

  const isVeryOld = savedVersion !== null && savedVersion < 10
  if (isVeryOld) {
    console.info(`[DataVersion] Dades molt antigues (v${savedVersion}). Reset necessari.`)
    storage.clearAll()
  }

  storage.set(VERSION_KEY, DATA_VERSION)
  return isVeryOld
}
