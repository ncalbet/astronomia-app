/**
 * learningPaths.js
 *
 * Rutes d'aprenentatge curades: seqüències de mòduls
 * pensades per guiar l'usuari pas a pas per un tema.
 *
 * Cada ruta agrupa mòduls en ordre recomanat d'estudi.
 */

export const LEARNING_PATHS = [
  {
    id: 'cosmos',
    title: 'Viatge al Cosmos',
    emoji: '🚀',
    description: 'Del sistema solar al Big Bang, de les estrelles a la relativitat',
    accentColor: '#4A9EFF',
    moduleIds: [
      'module-01-copernicus',
      'module-02-history',
      'module-09-bigbang',
      'module-10-estrelles',
      'module-07-particles',
      'module-38-relativitat',
      'module-08-relativitat',
    ],
    areaId: 'ciencies',
  },
  {
    id: 'civilitzacions',
    title: 'Arrels de la Civilització',
    emoji: '🏺',
    description: 'Egipte, Grècia, Roma: les civilitzacions que ho van fundar tot',
    accentColor: '#C97D4E',
    moduleIds: [
      'module-14-egipte',
      'module-15-egipte-origins',
      'module-16-egipte-imperi',
      'module-08-grecia',
      'module-09-roma',
      'module-10-republic-crisis',
      'module-13-fall',
    ],
    areaId: 'historia',
  },
  {
    id: 'pensament-critic',
    title: 'Pensament Crític',
    emoji: '💡',
    description: 'Eines per raonar millor: lògica, epistemologia i filosofia pràctica',
    accentColor: '#9B6DD6',
    moduleIds: [
      'module-30-introduccio-filosofia',
      'module-32-logica-argumentacio',
      'module-33-epistemologia',
      'module-31-etica',
      'module-XX-etica-practica',
      'module-XX-filosofia-llenguatge',
    ],
    areaId: 'pensament',
  },
  {
    id: 'economia-essencial',
    title: 'Economia Essencial',
    emoji: '📊',
    description: 'Com funcionen els mercats, la macro i les desigualtats del món',
    accentColor: '#4CAF82',
    moduleIds: [
      'module-19-economia-mon',
      'module-22-economia-historia',
      'module-25-economia-micro',
      'module-20-economia-macro',
      'module-21-economia-desigualtat',
      'module-28-piketty',
    ],
    areaId: 'societat',
  },
  {
    id: 'drets-humans',
    title: 'Drets Humans i Pau',
    emoji: '🕊️',
    description: 'Els fonaments del dret internacional i la lluita per la justícia global',
    accentColor: '#5B9BD5',
    moduleIds: [
      'module-03-peace',
      'module-15-fonaments-drets-humans',
      'module-16-sistema-internacional-drets-humans',
      'module-17-justicia-internacional',
      'module-18-casos-drets-humans',
      'module-20-fronteres-drets-humans',
    ],
    areaId: 'relacions',
  },
]
