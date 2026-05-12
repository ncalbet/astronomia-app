/**
 * areaRegistry.js
 *
 * Font de veritat de les àrees de coneixement.
 * Cada àrea agrupa mòduls en subtemes (topics).
 *
 * Per afegir un mòdul nou:
 *   1. Crear el JSON a src/data/modules/
 *   2. Afegir entrada a moduleRegistry.js
 *   3. Afegir meta (títol, emoji, XP) a ModuleMap.jsx
 *   4. Afegir l'id de mòdul al topic corresponent aquí
 *   5. Afegir l'id a unlockedModules a useProgress.js
 *   → NO cal incrementar DATA_VERSION
 */

export const AREAS = [
  {
    id: 'ciencies',
    label: 'Ciències',
    emoji: '🔭',
    description: 'Física, química, biologia, astronomia i el mètode científic',
    accentColor: '#4A9EFF',
    topics: [
      {
        label: 'Astronomia',
        modules: [
          'module-01-copernicus',
          'module-02-history',
        ],
      },
      {
        label: 'Química',
        modules: [
          'module-06-chemistry',
          'module-29-quimica',
          'module-30-quimica-atoms',
          'module-31-quimica-reaccions',
          'module-32-quimica-vida',
        ],
      },
      {
        label: 'Física',
        modules: [
          'module-07-particles',
        ],
      },
      {
        label: 'Biologia i Natura',
        modules: [
          'module-05-birding',
          'module-10-neurociencia',
        ],
      },
      {
        label: 'Ciència i Tecnologia',
        modules: [
          'module-12-historia-ciencia',
          'module-13-historia-tecnologia',
        ],
      },
    ],
  },
  {
    id: 'historia',
    label: 'Història',
    emoji: '🏺',
    description: 'Les civilitzacions i els esdeveniments que han definit el món',
    accentColor: '#C97D4E',
    topics: [
      {
        label: 'El Món Antic: Grècia i Roma',
        modules: [
          'module-08-grecia',
          'module-09-roma',
        ],
      },
      {
        label: 'La República i l\'Imperi Romà',
        modules: [
          'module-10-republic-crisis',
          'module-11-augustus',
          'module-12-pax-romana',
          'module-13-fall',
        ],
      },
      {
        label: 'Egipte',
        modules: [
          'module-14-egipte',
          'module-15-egipte-origins',
          'module-16-egipte-imperi',
          'module-17-egipte-religio',
          'module-18-egipte-fi',
        ],
      },
      {
        label: 'Edat Moderna',
        modules: [
          'module-14-revolucio-francesa',
        ],
      },
    ],
  },
  {
    id: 'pensament',
    label: 'Pensament',
    emoji: '💡',
    description: 'Filosofia, lògica i les eines per raonar millor',
    accentColor: '#9B6DD6',
    topics: [
      {
        label: 'Eines del Pensament',
        modules: [
          'module-04-philosophy',
          'module-27-economia-jocs',
        ],
      },
    ],
  },
  {
    id: 'societat',
    label: 'Societat',
    emoji: '🌍',
    description: "Economia, medi ambient i com s'organitza la vida col·lectiva",
    accentColor: '#4CAF82',
    topics: [
      {
        label: 'Bases Econòmiques',
        modules: [
          'module-19-economia-mon',
          'module-22-economia-historia',
          'module-25-economia-micro',
        ],
      },
      {
        label: 'Macroeconomia i Desigualtat',
        modules: [
          'module-20-economia-macro',
          'module-21-economia-desigualtat',
          'module-28-piketty',
        ],
      },
      {
        label: 'Teoria Econòmica',
        modules: [
          'module-23-economia-escoles',
          'module-26-economia-comportament',
          'module-24-economia-globalitzacio',
        ],
      },
    ],
  },
  {
    id: 'relacions',
    label: 'Relacions Internacionals',
    emoji: '🕊️',
    description: "Pau, conflictes, diplomàcia i l'ordre mundial",
    accentColor: '#5B9BD5',
    topics: [
      {
        label: 'Pau i Conflicte',
        modules: [
          'module-03-peace',
        ],
      },
      {
        label: 'Drets Humans',
        modules: [
          'module-15-fonaments-drets-humans',
          'module-16-sistema-internacional-drets-humans',
          'module-17-justicia-internacional',
          'module-18-casos-drets-humans',
          'module-19-actors-no-estatals',
          'module-20-fronteres-drets-humans',
        ],
      },
    ],
  },
  {
    id: 'arts',
    label: 'Arts i Cultura',
    emoji: '🎨',
    description: 'Música, art, cinema i les expressions de la creativitat humana',
    accentColor: '#E8855A',
    topics: [
      {
        label: 'Música',
        modules: [
          'module-08-musica-classica',
          'module-09-historia-rock',
        ],
      },
      {
        label: 'Arts Visuals',
        modules: [
          'module-11-pintura',
        ],
      },
    ],
  },
]

export function getAreaModules(area) {
  return area.topics.flatMap(t => t.modules)
}

export const getAreaById     = (id)       => AREAS.find(a => a.id === id)
export const getAreaForModule = (moduleId) => AREAS.find(a => getAreaModules(a).includes(moduleId))
