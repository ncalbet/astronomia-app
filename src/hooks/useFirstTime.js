/**
 * useFirstTime.js
 *
 * Detecta si és la primera vegada que l'usuari obre l'app.
 * Llegeix i escriu directament al storageProvider.
 */

import storage from '../storage/storageProvider'

export function isFirstTime() {
  return storage.get('firstTime', true)
}

export function markVisited() {
  storage.set('firstTime', false)
}
