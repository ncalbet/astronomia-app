/**
 * storageProvider.js
 * 
 * Capa d'abstracció entre l'app i el sistema d'emmagatzematge.
 * Ara usa localStorage, però es pot substituir per IndexedDB
 * o un backend futur sense tocar cap altra part del codi.
 * 
 * Ús:
 *   import storage from '../storage/storageProvider'
 *   storage.set('xp', 100)
 *   storage.get('xp') → 100
 */

const PREFIX = 'cosmica_' // Evita col·lisions amb altres apps

const storage = {
  /**
   * Guarda un valor (qualsevol tipus, es serialitza a JSON)
   */
  set(key, value) {
    try {
      localStorage.setItem(PREFIX + key, JSON.stringify(value))
    } catch (err) {
      console.warn('[Storage] Error guardant:', key, err)
    }
  },

  /**
   * Recupera un valor. Retorna `defaultValue` si no existeix.
   */
  get(key, defaultValue = null) {
    try {
      const raw = localStorage.getItem(PREFIX + key)
      if (raw === null) return defaultValue
      return JSON.parse(raw)
    } catch (err) {
      console.warn('[Storage] Error llegint:', key, err)
      return defaultValue
    }
  },

  /**
   * Elimina una clau
   */
  remove(key) {
    try {
      localStorage.removeItem(PREFIX + key)
    } catch (err) {
      console.warn('[Storage] Error eliminant:', key, err)
    }
  },

  /**
   * Esborra tot el progrés de l'usuari (útil per debug o reset)
   */
  clearAll() {
    try {
      Object.keys(localStorage)
        .filter(k => k.startsWith(PREFIX))
        .forEach(k => localStorage.removeItem(k))
    } catch (err) {
      console.warn('[Storage] Error esborrant tot:', err)
    }
  }
}

export default storage
