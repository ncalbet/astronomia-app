/**
 * areaRegistry.js — definició de les àrees de coneixement
 *
 * Cada mòdul declara la seva `area` i el seu `topic` dins del seu propi JSON.
 * Aquí només es defineixen les àrees (identitat visual) i l'ordre dels topics.
 * Un topic nou apareix automàticament quan un mòdul el declara.
 */
import catalog from './catalog.json'

export const AREAS = [
  {
    id: 'ciencies',
    label: 'Ciències',
    emoji: '🔭',
    description: 'Física, química, biologia, astronomia i el mètode científic',
    accentColor: '#4A9EFF',
    topicOrder: ['Astronomia', 'Química', 'Física', 'Biologia i Natura', 'Ciència i Tecnologia'],
  },
  {
    id: 'historia',
    label: 'Història',
    emoji: '🏺',
    description: 'Les civilitzacions i els esdeveniments que han definit el món',
    accentColor: '#C97D4E',
    topicOrder: [
      'El Món Antic: Grècia i Roma',
      "La República i l'Imperi Romà",
      'Egipte',
      'Mitologia Grega',
      'Edat Moderna',
    ],
  },
  {
    id: 'pensament',
    label: 'Pensament',
    emoji: '💡',
    description: 'Filosofia, lògica i les eines per raonar millor',
    accentColor: '#9B6DD6',
    topicOrder: ['Eines del Pensament', 'Filosofia', 'Ment i Comportament'],
  },
  {
    id: 'societat',
    label: 'Societat',
    emoji: '🌍',
    description: "Economia, política i com s'organitza la vida col·lectiva",
    accentColor: '#4CAF82',
    topicOrder: ['Política i Institucions', 'Bases Econòmiques', 'Macroeconomia i Desigualtat', 'Teoria Econòmica'],
  },
  {
    id: 'relacions',
    label: 'Relacions Internacionals',
    emoji: '🕊️',
    description: "Pau, conflictes, diplomàcia i l'ordre mundial",
    accentColor: '#5B9BD5',
    topicOrder: ['Pau i Conflicte', 'Teoria de les RRII', 'Drets Humans', 'Diplomàcia'],
  },
  {
    id: 'arts',
    label: 'Arts i Cultura',
    emoji: '🎨',
    description: 'Música, art, cinema, arquitectura i les expressions de la creativitat humana',
    accentColor: '#E8855A',
    topicOrder: ['Música i Òpera', 'Arts Visuals', 'Cinema', 'Arquitectura', 'Literatura'],
  },
  {
    id: 'biografies',
    label: 'Biografies',
    emoji: '👤',
    description: 'Les vides dels personatges que van canviar el curs de la història',
    accentColor: '#E8A44A',
    topicOrder: ['Poder i Política', 'Pensament i Ciència', 'Resistència i Drets'],
  },
]

const byOrder = (a, b) => a.order - b.order

/** Tots els mòduls (meta del catàleg) d'una àrea, ordenats. */
export function getAreaCatalog(areaId) {
  return catalog.filter(m => m.area === areaId).sort(byOrder)
}

/** Topics d'una àrea amb els seus mòduls: [{ label, modules: [meta] }] */
export function getAreaTopics(areaId) {
  const area = AREAS.find(a => a.id === areaId)
  const modules = getAreaCatalog(areaId)
  const labels = [...(area?.topicOrder || [])]
  for (const m of modules)
    if (m.topic && !labels.includes(m.topic)) labels.push(m.topic)
  return labels
    .map(label => ({ label, modules: modules.filter(m => m.topic === label) }))
    .filter(t => t.modules.length > 0)
}

/** Ids dels mòduls d'una àrea (accepta objecte àrea o id, per compatibilitat). */
export function getAreaModules(areaOrId) {
  const areaId = typeof areaOrId === 'string' ? areaOrId : areaOrId?.id
  return getAreaCatalog(areaId).map(m => m.id)
}

export const getAreaById = (id) => AREAS.find(a => a.id === id)
export const getAreaForModule = (moduleId) => {
  const meta = catalog.find(m => m.id === moduleId)
  return meta ? AREAS.find(a => a.id === meta.area) : undefined
}
