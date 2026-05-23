/**
 * Genera un acord arpegiat ascendent (Do-Mi-Sol-Do) amb la Web Audio API.
 * Cap fitxer d'àudio extern — el so es sintetitza en temps real.
 */
export function playSuccessSound() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)()
    // Do4, Mi4, Sol4, Do5 (Hz)
    const notes = [523.25, 659.25, 783.99, 1046.50]

    notes.forEach((freq, i) => {
      const osc  = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.type = 'sine'
      osc.frequency.value = freq

      const start = ctx.currentTime + i * 0.11
      gain.gain.setValueAtTime(0, start)
      gain.gain.linearRampToValueAtTime(0.25, start + 0.02)
      gain.gain.exponentialRampToValueAtTime(0.001, start + 0.28)

      osc.start(start)
      osc.stop(start + 0.3)
    })
  } catch {
    // Silencia errors de navegadors sense Web Audio API
  }
}
