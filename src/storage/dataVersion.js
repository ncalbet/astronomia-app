/**
 * dataVersion.js
 *
 * Control de versió de les dades guardades.
 * Incrementa DATA_VERSION cada vegada que canviïs el DEFAULT_STATE:
 *   - Nous mòduls afegits
 *   - Nous camps a l'estat
 *   - Canvis en unlockedModules per defecte
 *
 * Quan l'usuari obre l'app amb dades d'una versió antiga,
 * es fa un reset automàtic del progrés.
 */

import storage from './storageProvider'

export const DATA_VERSION = 5  // v5: afegit srData, srStreak, srLastReviewDate  // ← incrementa aquí quan canviïs DEFAULT_STATE

const VERSION_KEY = 'data_version'

/**
 * Comprova si les dades guardades són de la versió actual.
 * Si no ho són, esborra tot i desa la versió nova.
 * Retorna true si s'ha fet reset, false si tot estava bé.
 */
export function checkAndMigrateData() {
  const savedVersion = storage.get(VERSION_KEY, null)

  if (savedVersion === DATA_VERSION) return false  // tot correcte

  // Versió diferent o primera vegada → reset
  if (savedVersion !== null) {
    console.info(`[DataVersion] Versió antiga (${savedVersion}) → nova (${DATA_VERSION}). Reiniciant dades.`)
    storage.clearAll()
  }

  storage.set(VERSION_KEY, DATA_VERSION)
  return true
}
