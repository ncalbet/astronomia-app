/**
 * generate-catalog.mjs
 * Escaneja src/data/modules/*.json i genera src/data/catalog.json amb les
 * metadades lleugeres de cada mòdul. S'executa automàticament abans de
 * `npm run dev` i `npm run build` (predev/prebuild).
 *
 * Afegir un mòdul nou = deixar el JSON a src/data/modules/. Res més.
 */
import { readFileSync, writeFileSync, readdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const MODULES_DIR = join(ROOT, 'src', 'data', 'modules')
const OUT = join(ROOT, 'src', 'data', 'catalog.json')

const REQUIRED = ['id', 'title', 'emoji', 'area', 'topic', 'level', 'xp', 'order']
const VALID_LEVELS = ['inicial', 'intermedi', 'avancat']

/** Ordre numèric d'un nivell; els desconeguts cauen a 'inicial'. */
const levelOrder = (id) => Math.max(0, VALID_LEVELS.indexOf(id)) + 1

const files = readdirSync(MODULES_DIR).filter(f => f.endsWith('.json')).sort()
const catalog = []
const errors = []
const seenIds = new Set()

for (const file of files) {
  let json
  try {
    json = JSON.parse(readFileSync(join(MODULES_DIR, file), 'utf8').replace(/^﻿/, ''))
  } catch (e) {
    errors.push(`${file}: JSON invàlid — ${e.message}`)
    continue
  }

  for (const field of REQUIRED)
    if (json[field] === undefined) errors.push(`${file}: falta el camp "${field}"`)

  if (seenIds.has(json.id)) errors.push(`${file}: id duplicat "${json.id}"`)
  seenIds.add(json.id)

  const lessons = json.itineraries
    ? json.itineraries.flatMap(it => it.lessons || [])
    : (json.lessons || [])

  // La profunditat viu a l'itinerari; el mòdul hereta el nivell d'entrada.
  if (json.level !== undefined && !VALID_LEVELS.includes(json.level))
    errors.push(`${file}: level "${json.level}" no vàlid (${VALID_LEVELS.join(' | ')})`)

  for (const it of json.itineraries || [])
    if (it.level !== undefined && !VALID_LEVELS.includes(it.level))
      errors.push(`${file}: itinerari "${it.id}" té level "${it.level}" no vàlid`)

  const itineraryLevels = (json.itineraries || [])
    .map(it => it.level || json.level || 'inicial')
  const levels = [...new Set(itineraryLevels.length ? itineraryLevels : [json.level || 'inicial'])]
    .sort((a, b) => levelOrder(a) - levelOrder(b))

  catalog.push({
    id: json.id,
    file,
    title: json.title,
    emoji: json.emoji,
    area: json.area,
    topic: json.topic,
    level: levels[0],
    levels,
    prerequisites: json.prerequisites || [],
    xp: json.xp ?? 240,
    order: json.order ?? 999,
    phase: json.phase ?? 1,
    glossaryTerms: json.glossaryTerms || [],
    lessonCount: lessons.length,
    hasItineraries: Boolean(json.itineraries),
  })
}

// Els prerequisits han d'apuntar a mòduls que existeixen (gating suau, però honest)
for (const m of catalog)
  for (const pre of m.prerequisites)
    if (!seenIds.has(pre))
      errors.push(`${m.file}: prerequisit "${pre}" no correspon a cap mòdul`)

if (errors.length) {
  console.error(`✗ Catàleg NO generat — ${errors.length} error(s):`)
  errors.forEach(e => console.error('  ' + e))
  process.exit(1)
}

catalog.sort((a, b) => a.order - b.order)
writeFileSync(OUT, JSON.stringify(catalog, null, 2) + '\n', 'utf8')
console.log(`✓ catalog.json generat: ${catalog.length} mòduls`)
