export function downloadCertificate(moduleTitle) {
  const W = 1200, H = 800
  const canvas = document.createElement('canvas')
  canvas.width  = W
  canvas.height = H
  const ctx = canvas.getContext('2d')

  // Fons
  const bg = ctx.createLinearGradient(0, 0, 0, H)
  bg.addColorStop(0, '#0b0f1e')
  bg.addColorStop(1, '#111827')
  ctx.fillStyle = bg
  ctx.fillRect(0, 0, W, H)

  // Estrelles (posicions deterministes)
  ctx.fillStyle = 'rgba(255,255,255,0.35)'
  for (let i = 0; i < 120; i++) {
    const x = (i * 137.508) % W
    const y = (i * 97.361)  % H
    const r = i % 5 === 0 ? 1.5 : 0.7
    ctx.beginPath()
    ctx.arc(x, y, r, 0, Math.PI * 2)
    ctx.fill()
  }

  // Marc exterior
  ctx.strokeStyle = '#4c7dff'
  ctx.lineWidth = 2
  ctx.strokeRect(36, 36, W - 72, H - 72)

  // Marc interior subtil
  ctx.strokeStyle = 'rgba(76, 125, 255, 0.2)'
  ctx.lineWidth = 1
  ctx.strokeRect(48, 48, W - 96, H - 96)

  // Línia accent superior
  ctx.fillStyle = '#4c7dff'
  ctx.fillRect(36, 36, W - 72, 3)

  // Nom de l'app
  ctx.font = 'bold 18px system-ui, -apple-system, Arial, sans-serif'
  ctx.fillStyle = '#4c7dff'
  ctx.textAlign = 'center'
  ctx.fillText('ACADÈMIA CÒSMICA', W / 2, 130)

  // Línia separadora
  ctx.fillStyle = 'rgba(76, 125, 255, 0.25)'
  ctx.fillRect(W / 2 - 120, 145, 240, 1)

  // Subtítol
  ctx.font = '300 14px system-ui, -apple-system, Arial, sans-serif'
  ctx.fillStyle = '#8899bb'
  ctx.fillText('CERTIFICAT DE COMPLETACIÓ', W / 2, 172)

  // Títol del mòdul — amb word wrap
  ctx.font = 'bold 42px system-ui, -apple-system, Arial, sans-serif'
  ctx.fillStyle = '#e2e8f8'
  const maxWidth = 900
  const words = moduleTitle.split(' ')
  const lines = []
  let line = ''
  for (const word of words) {
    const test = line ? `${line} ${word}` : word
    if (ctx.measureText(test).width > maxWidth && line) {
      lines.push(line)
      line = word
    } else {
      line = test
    }
  }
  lines.push(line)
  const lineH = 54
  const titleY = 330 - ((lines.length - 1) * lineH) / 2
  lines.forEach((l, i) => ctx.fillText(l, W / 2, titleY + i * lineH))

  // Separador central
  ctx.fillStyle = 'rgba(76, 125, 255, 0.25)'
  ctx.fillRect(W / 2 - 200, 420, 400, 1)

  // Text "completat amb èxit"
  ctx.font = '300 17px system-ui, -apple-system, Arial, sans-serif'
  ctx.fillStyle = '#8899bb'
  ctx.fillText('completat amb èxit', W / 2, 476)

  // Data
  const date = new Date().toLocaleDateString('ca-ES', { year: 'numeric', month: 'long', day: 'numeric' })
  ctx.font = '400 15px system-ui, -apple-system, Arial, sans-serif'
  ctx.fillStyle = '#4a5a7a'
  ctx.fillText(date, W / 2, 590)

  // Línia accent inferior
  ctx.fillStyle = '#4c7dff'
  ctx.fillRect(36, H - 39, W - 72, 3)

  // Descàrrega
  const link = document.createElement('a')
  link.download = `certificat-${moduleTitle.toLowerCase().replace(/[^a-z0-9àáèéíïòóúüç ]/gi, '').replace(/\s+/g, '-').substring(0, 40)}.png`
  link.href = canvas.toDataURL('image/png')
  link.click()
}
