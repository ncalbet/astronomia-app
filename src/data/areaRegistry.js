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
          'module-09-bigbang',
          'module-10-estrelles',
          'module-08-origen-desti-univers',
          'module-09-materia-energia-fosques',
          'module-10-forats-negres',
          'module-11-mons-alla',
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
          'module-34-mecanica-classica',
          'module-36-termodinamica',
          'module-37-electromagnetisme',
          'module-38-relativitat',
          'module-08-relativitat',
          'module-10-caos',
          'module-12-temps-espai-limits',
        ],
      },
      {
        label: 'Biologia i Natura',
        modules: [
          'module-05-birding',
          'module-08-biologia',
          'module-10-neurociencia',
          'module-08-neurociencia',
          'module-33-evolucio',
          'module-35-genetica',
          'module-09-cos-huma',
          'module-11-ecologia',
          'module-13-trauma-resiliencia',
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
      {
        label: 'Filosofia',
        modules: [
          'module-30-introduccio-filosofia',
          'module-XX-intro-filosofia',
          'module-09-filosofia-politica',
          'module-31-etica',
          'module-XX-etica-practica',
          'module-32-logica-argumentacio',
          'module-33-epistemologia',
          'module-XX-filosofia-llenguatge',
        ],
      },
      {
        label: 'Ment i Comportament',
        modules: [
          'module-12-ment-enganya',
          'module-14-obediencia',
        ],
      },
    ],
  },
  {
    id: 'societat',
    label: 'Societat',
    emoji: '🌍',
    description: "Economia, política i com s'organitza la vida col·lectiva",
    accentColor: '#4CAF82',
    topics: [
      {
        label: 'Política i Institucions',
        modules: [
          'module-34-democracia-sistemes-politics',
          'module-XX-sociologia',
        ],
      },
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
        label: 'Teoria de les RRII',
        modules: [
          'module-XX-teoria-ri',
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
          'module-XX-ddhh-ordre-internacional',
        ],
      },
      {
        label: 'Diplomàcia',
        modules: [
          'module-XX-diplomacia-negociacio',
          'module-XX-historia-diplomacia',
          'module-XX-organismes-internacionals',
        ],
      },
    ],
  },
  {
    id: 'arts',
    label: 'Arts i Cultura',
    emoji: '🎨',
    description: 'Música, art, cinema, arquitectura i les expressions de la creativitat humana',
    accentColor: '#E8855A',
    topics: [
      {
        label: 'Música i Òpera',
        modules: [
          'module-08-musica-classica',
          'module-09-historia-rock',
          'module-30-opera',
        ],
      },
      {
        label: 'Arts Visuals',
        modules: [
          'module-11-pintura',
        ],
      },
      {
        label: 'Cinema',
        modules: [
          'module-XX-cinema',
        ],
      },
      {
        label: 'Arquitectura',
        modules: [
          'module-XX-arquitectura-01',
          'module-XX-arquitectura-02',
          'module-XX-arquitectura-03',
          'module-XX-arquitectura-04',
        ],
      },
      {
        label: 'Literatura',
        modules: [
          'module-01-antiguitat-origens',
          'module-02-edat-mitjana-renaixement',
          'module-05-avantguardes',
          'module-06-novella-segle-xx',
          'module-08-postmodernisme',
        ],
      },
    ],
  },
  {
    id: 'biografies',
    label: 'Biografies',
    emoji: '👤',
    description: 'Les vides dels personatges que van canviar el curs de la història',
    accentColor: '#E8A44A',
    topics: [
      {
        label: 'Poder i Política',
        modules: [
          'module-bio-cesar',
          'module-bio-alexandre',
          'module-bio-bismarck',
          'module-bio-churchill',
          'module-bio-rasputin',
          'module-bio-lincoln',
          'module-bio-bolivar',
          'module-bio-lenin',
          'module-bio-napoleon',
          'module-bio-napoleon3',
          'module-bio-genguis',
          'module-bio-cleopatra',
          'module-bio-maquiavel',
          'module-bio-gandhi',
          'module-bio-frederic','module-bio-voltaire',
          'module-bio-catalina','module-bio-robespierre','module-bio-trotsky',
          'module-bio-mandela','module-bio-eleanor','module-bio-olympe',
          'module-bio-marcaureli','module-bio-cicero',
          'module-bio-ataturk','module-bio-marx',
        ],
      },
      {
        label: 'Pensament i Ciència',
        modules: [
          'module-bio-nietzsche',
          'module-bio-freud',
          'module-bio-darwin',
          'module-bio-leonardo',
          'module-bio-einstein',
          'module-bio-newton',
          'module-bio-curie',
          'module-bio-kant',
          'module-bio-arendt',
          'module-bio-beauvoir',
          'module-bio-planck',
        ],
      },
      {
        label: 'Resistència i Drets',
        modules: [
          'module-bio-mlk',
          'module-bio-luxemburg',
          'module-bio-tubman',
          'module-bio-gramsci',
          'module-bio-jfk',
          'module-bio-binladen',
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
