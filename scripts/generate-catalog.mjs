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

  catalog.push({
    id: json.id,
    file,
    title: json.title,
    emoji: json.emoji,
    area: json.area,
    topic: json.topic,
    level: json.level || 'inicial',
    xp: json.xp ?? 240,
    order: json.order ?? 999,
    phase: json.phase ?? 1,
    glossaryTerms: json.glossaryTerms || [],
    lessonCount: lessons.length,
    hasItineraries: Boolean(json.itineraries),
  })
}

if (errors.length) {
  console.error(`✗ Catàleg NO generat — ${errors.length} error(s):`)
  errors.forEach(e => console.error('  ' + e))
  process.exit(1)
}

catalog.sort((a, b) => a.order - b.order)
writeFileSync(OUT, JSON.stringify(catalog, null, 2) + '\n', 'utf8')
console.log(`✓ catalog.json generat: ${catalog.length} mòduls`)
