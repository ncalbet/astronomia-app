/**
 * migrate-meta.mjs — migració ÚNICA (Fase 0)
 * Injecta dins de cada src/data/modules/*.json les metadades que fins ara
 * vivien escampades pel codi: title/emoji (MODULE_META de ModuleMap.jsx),
 * xp (MODULE_XP), area/topic (areaRegistry.js), order/phase/glossaryTerms
 * (moduleRegistry.js). Assigna àrea/topic als mòduls orfes.
 *
 * Ús: node scripts/migrate-meta.mjs
 */
import { readFileSync, writeFileSync, readdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const MODULES_DIR = join(ROOT, 'src', 'data', 'modules')

// ── Helpers ─────────────────────────────────────────────────────────────────

/** Extreu un literal d'objecte/array balancejat que comença a `startMarker`. */
function extractLiteral(source, startMarker, openChar, closeChar) {
  const start = source.indexOf(startMarker)
  if (start === -1) throw new Error(`No trobat: ${startMarker}`)
  const openIdx = source.indexOf(openChar, start)
  let depth = 0
  for (let i = openIdx; i < source.length; i++) {
    const c = source[i]
    if (c === openChar) depth++
    else if (c === closeChar) {
      depth--
      if (depth === 0) return source.slice(openIdx, i + 1)
    }
  }
  throw new Error(`Literal no balancejat per: ${startMarker}`)
}

// ── 1. MODULE_META i MODULE_XP de ModuleMap.jsx ────────────────────────────

const moduleMapSrc = readFileSync(join(ROOT, 'src', 'screens', 'ModuleMap.jsx'), 'utf8')
const META = eval('(' + extractLiteral(moduleMapSrc, 'const MODULE_META = {', '{', '}') + ')')
const XP   = eval('(' + extractLiteral(moduleMapSrc, 'const MODULE_XP = {', '{', '}') + ')')

// ── 2. AREAS d'areaRegistry.js → id → { area, topic } ──────────────────────

const areaSrc = readFileSync(join(ROOT, 'src', 'data', 'areaRegistry.js'), 'utf8')
const AREAS = eval(extractLiteral(areaSrc, 'export const AREAS = [', '[', ']'))
const areaOf = {}
for (const area of AREAS)
  for (const topic of area.topics)
    for (const id of topic.modules)
      if (!areaOf[id]) areaOf[id] = { area: area.id, topic: topic.label }

// ── 3. moduleRegistry.js → id → { file, order, phase, glossaryTerms } ──────

const regSrc = readFileSync(join(ROOT, 'src', 'data', 'moduleRegistry.js'), 'utf8')
const entryRe = /\{\s*id:\s*'([^']+)',\s*phase:\s*(\d+),\s*order:\s*(\d+),(?:\s*glossaryTerms:\s*(\[[^\]]*\]),)?\s*file:\s*\(\)\s*=>\s*import\('\.\/modules\/([^']+)'\)/g
const registry = {}
let m
while ((m = entryRe.exec(regSrc)) !== null) {
  registry[m[1]] = {
    file: m[5],
    phase: Number(m[2]),
    order: Number(m[3]),
    glossaryTerms: m[4] ? eval(m[4]) : undefined,
  }
}
console.log(`Registry entrades: ${Object.keys(registry).length}`)

// ── 4. Orfes: assignació manual d'àrea/topic/ordre ──────────────────────────

const MITO = 'Mitologia Grega'
const ORPHANS = {
  'module-XX-prometeu.json':           { area: 'historia',  topic: MITO, order: 200, emoji: '🔥' },
  'module-mit-02-icar-dedal.json':     { area: 'historia',  topic: MITO, order: 201, emoji: '🪽' },
  'module-03-edip.json':               { area: 'historia',  topic: MITO, order: 202, emoji: '👁️' },
  'module-mit-04-sisifo.json':         { area: 'historia',  topic: MITO, order: 203, emoji: '🪨' },
  'module-05-orfeu.json':              { area: 'historia',  topic: MITO, order: 204, emoji: '🎵' },
  'module-mit-06-narcis-eco.json':     { area: 'historia',  topic: MITO, order: 205, emoji: '🪞' },
  'module-07-teseu.json':              { area: 'historia',  topic: MITO, order: 206, emoji: '🧶' },
  'module-mit-07-teseu-minotaure.json':{ area: 'historia',  topic: MITO, order: 207, emoji: '🐂' },
  'module-mit-08-pandora.json':        { area: 'historia',  topic: MITO, order: 208, emoji: '🏺' },
  'module-09-aquilles.json':           { area: 'historia',  topic: MITO, order: 209, emoji: '🛡️' },
  'module-mit-10-odisseu.json':        { area: 'historia',  topic: MITO, order: 210, emoji: '⛵' },
  'module-11-perseu.json':             { area: 'historia',  topic: MITO, order: 211, emoji: '🗡️' },
  'module-mit-12-heracles.json':       { area: 'historia',  topic: MITO, order: 212, emoji: '🦁' },
  'module-13-antigona.json':           { area: 'historia',  topic: MITO, order: 213, emoji: '⚖️' },
  'module-mit-14-jaso-argonautes.json':{ area: 'historia',  topic: MITO, order: 214, emoji: '🐏' },
  'module-17-estoicisme.json':         { area: 'pensament', topic: 'Filosofia', order: 220, emoji: '🏛️' },
  'module-18-existencialisme.json':    { area: 'pensament', topic: 'Filosofia', order: 221, emoji: '🌑' },
  'module-descartes.json':             { area: 'pensament', topic: 'Filosofia', order: 222, emoji: '💭' },
  'module-sartre.json':                { area: 'pensament', topic: 'Filosofia', order: 223, emoji: '🚪' },
  'module-15-negociacio.json':         { area: 'relacions', topic: 'Diplomàcia', order: 230, emoji: '🤝' },
  'module-16-tecniques-negociacio.json':{ area: 'relacions', topic: 'Diplomàcia', order: 231, emoji: '🗣️' },
}

// ── 5. Migració ─────────────────────────────────────────────────────────────

const fileToRegistryId = {}
for (const [id, e] of Object.entries(registry)) fileToRegistryId[e.file] = id

const files = readdirSync(MODULES_DIR).filter(f => f.endsWith('.json'))
let migrated = 0, orphansDone = 0
const warnings = []

for (const file of files) {
  const path = join(MODULES_DIR, file)
  const json = JSON.parse(readFileSync(path, 'utf8').replace(/^﻿/, ''))
  const regId = fileToRegistryId[file]

  if (regId) {
    const reg = registry[regId]
    const meta = META[regId] || {}
    json.id = regId
    if (meta.title) json.title = meta.title
    json.emoji = meta.emoji || json.emoji || '📘'
    json.xp = XP[regId] ?? 240
    json.order = reg.order
    json.phase = reg.phase ?? json.phase ?? 1
    if (reg.glossaryTerms) json.glossaryTerms = reg.glossaryTerms
    const at = areaOf[regId]
    if (at) { json.area = at.area; json.topic = at.topic }
    else warnings.push(`Sense àrea: ${regId} (${file})`)
    json.level = json.level || 'inicial'
    migrated++
  } else if (ORPHANS[file]) {
    const o = ORPHANS[file]
    json.id = json.id || file.replace(/\.json$/, '')
    json.emoji = json.emoji || o.emoji
    json.xp = json.xp ?? 240
    json.order = o.order
    json.phase = json.phase ?? 1
    json.area = o.area
    json.topic = o.topic
    json.level = json.level || 'inicial'
    orphansDone++
  } else {
    warnings.push(`Fitxer desconegut (ni registry ni orfe): ${file}`)
    continue
  }

  writeFileSync(path, JSON.stringify(json, null, 2) + '\n', 'utf8')
}

console.log(`Migrats (registry): ${migrated}`)
console.log(`Migrats (orfes):    ${orphansDone}`)
if (warnings.length) {
  console.log('\nAVISOS:')
  warnings.forEach(w => console.log('  ⚠ ' + w))
}
