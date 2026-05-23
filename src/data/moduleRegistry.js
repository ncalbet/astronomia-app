export const MODULE_REGISTRY = [
  { id: 'module-01-copernicus',       phase: 1, order:  1, glossaryTerms: ['g-heliocentrisme'], file: () => import('./modules/module-01-copernicus.json') },
  { id: 'module-02-history',          phase: 1, order:  2, glossaryTerms: ['g-supernova', 'g-exoplaneta'], file: () => import('./modules/module-02-history.json') },
  { id: 'module-03-peace',            phase: 1, order:  3, glossaryTerms: ['g-r2p'], file: () => import('./modules/module-03-peace.json') },
  { id: 'module-04-philosophy',       phase: 1, order:  4, glossaryTerms: ['g-socratic'], file: () => import('./modules/module-04-philosophy.json') },
  { id: 'module-05-birding',          phase: 1, order:  5, file: () => import('./modules/module-05-birding.json') },
  { id: 'module-06-chemistry',        phase: 1, order:  6, glossaryTerms: ['g-atom', 'g-entropia'], file: () => import('./modules/module-06-chemistry.json') },
  { id: 'module-07-particles',        phase: 1, order:  7, glossaryTerms: ['g-quantica', 'g-em'], file: () => import('./modules/module-07-particles.json') },
  // — Bloc: Historia Antiga —
  { id: 'module-08-grecia',           phase: 1, order:  8, glossaryTerms: ['g-democracia-atenes', 'g-helenisme'], file: () => import('./modules/module-08-grecia.json') },
  { id: 'module-09-roma',             phase: 1, order:  9, glossaryTerms: ['g-republica-romana', 'g-senat-roma'], file: () => import('./modules/module-09-roma.json') },
  { id: 'module-10-republic-crisis',  phase: 2, order: 10, file: () => import('./modules/module-10-republic-crisis.json') },
  { id: 'module-11-augustus',         phase: 2, order: 11, file: () => import('./modules/module-11-augustus.json') },
  { id: 'module-12-pax-romana',       phase: 2, order: 12, glossaryTerms: ['g-pax-romana'], file: () => import('./modules/module-12-pax-romana.json') },
  { id: 'module-13-fall',             phase: 2, order: 13, file: () => import('./modules/module-13-fall.json') },
  { id: 'module-14-egipte',           phase: 1, order: 14, glossaryTerms: ['g-farao'], file: () => import('./modules/module-14-egipte.json') },
  { id: 'module-15-egipte-origins',   phase: 2, order: 15, file: () => import('./modules/module-15-egipte-origins.json') },
  { id: 'module-16-egipte-imperi',    phase: 2, order: 16, file: () => import('./modules/module-16-egipte-imperi.json') },
  { id: 'module-17-egipte-religio',   phase: 2, order: 17, glossaryTerms: ['g-maat'], file: () => import('./modules/module-17-egipte-religio.json') },
  { id: 'module-18-egipte-fi',        phase: 2, order: 18, file: () => import('./modules/module-18-egipte-fi.json') },
  // — Bloc: Música —
  { id: 'module-08-musica-classica',  phase: 1, order: 19, file: () => import('./modules/module-08-musica-classica.json') },
  { id: 'module-09-historia-rock',    phase: 1, order: 20, file: () => import('./modules/module-09-historia-rock.json') },
  // — Bloc: Ciències i Arts —
  { id: 'module-10-neurociencia',        phase: 1, order: 21, glossaryTerms: ['g-neurones'], file: () => import('./modules/module-10-neurociencia.json') },
  { id: 'module-12-historia-ciencia',    phase: 1, order: 22, file: () => import('./modules/module-12-historia-ciencia.json') },
  { id: 'module-13-historia-tecnologia', phase: 1, order: 23, file: () => import('./modules/module-13-historia-tecnologia.json') },
  { id: 'module-11-pintura',             phase: 1, order: 24, file: () => import('./modules/module-11-pintura.json') },
  // — Bloc: Política Moderna i Drets Humans —
  { id: 'module-14-revolucio-francesa',               phase: 1, order: 25, glossaryTerms: ['g-revolucio-francesa'], file: () => import('./modules/module-14-revolucio-francesa.json') },
  { id: 'module-15-fonaments-drets-humans',           phase: 1, order: 26, glossaryTerms: ['g-ddhh'], file: () => import('./modules/module-15-fonaments-drets-humans.json') },
  { id: 'module-16-sistema-internacional-drets-humans', phase: 2, order: 27, glossaryTerms: ['g-onu'], file: () => import('./modules/module-16-sistema-internacional-drets-humans.json') },
  { id: 'module-17-justicia-internacional',           phase: 2, order: 28, glossaryTerms: ['g-tpi'], file: () => import('./modules/module-17-justicia-internacional.json') },
  { id: 'module-18-casos-drets-humans',               phase: 2, order: 29, file: () => import('./modules/module-18-casos-drets-humans.json') },
  { id: 'module-19-actors-no-estatals',               phase: 2, order: 30, file: () => import('./modules/module-19-actors-no-estatals.json') },
  { id: 'module-20-fronteres-drets-humans',           phase: 2, order: 31, file: () => import('./modules/module-20-fronteres-drets-humans.json') },
  // — Bloc: Economia —
  { id: 'module-19-economia-mon',         phase: 1, order: 32, glossaryTerms: ['g-pib'], file: () => import('./modules/module-19-economia-mon.json') },
  { id: 'module-22-economia-historia',    phase: 1, order: 33, file: () => import('./modules/module-22-economia-historia.json') },
  { id: 'module-25-economia-micro',       phase: 1, order: 34, glossaryTerms: ['g-elasticitat', 'g-mercat'], file: () => import('./modules/module-25-economia-micro.json') },
  { id: 'module-20-economia-macro',       phase: 2, order: 35, glossaryTerms: ['g-inflacio'], file: () => import('./modules/module-20-economia-macro.json') },
  { id: 'module-21-economia-desigualtat', phase: 2, order: 36, glossaryTerms: ['g-desigualtat'], file: () => import('./modules/module-21-economia-desigualtat.json') },
  { id: 'module-23-economia-escoles',     phase: 2, order: 37, glossaryTerms: ['g-keynes', 'g-marxisme'], file: () => import('./modules/module-23-economia-escoles.json') },
  { id: 'module-24-economia-globalitzacio', phase: 2, order: 38, file: () => import('./modules/module-24-economia-globalitzacio.json') },
  { id: 'module-28-piketty',              phase: 2, order: 39, file: () => import('./modules/module-28-piketty.json') },
  { id: 'module-26-economia-comportament', phase: 2, order: 40, file: () => import('./modules/module-26-economia-comportament.json') },
  { id: 'module-27-economia-jocs',        phase: 2, order: 41, file: () => import('./modules/module-27-economia-jocs.json') },
  // — Bloc: Química —
  { id: 'module-29-quimica',            phase: 1, order: 42, file: () => import('./modules/module-29-quimica.json') },
  { id: 'module-30-quimica-atoms',      phase: 2, order: 43, glossaryTerms: ['g-atom'], file: () => import('./modules/module-30-quimica-atoms.json') },
  { id: 'module-31-quimica-reaccions',  phase: 2, order: 44, file: () => import('./modules/module-31-quimica-reaccions.json') },
  { id: 'module-32-quimica-vida',       phase: 2, order: 45, file: () => import('./modules/module-32-quimica-vida.json') },
  // — Bloc: Biologia —
  { id: 'module-08-biologia',           phase: 1, order: 46, file: () => import('./modules/module-08-biologia.json') },
  { id: 'module-33-evolucio',           phase: 1, order: 47, glossaryTerms: ['g-evolucio'], file: () => import('./modules/module-33-evolucio.json') },
  { id: 'module-35-genetica',           phase: 1, order: 48, glossaryTerms: ['g-adn'], file: () => import('./modules/module-35-genetica.json') },
  // — Bloc: Física —
  { id: 'module-34-mecanica-classica',  phase: 1, order: 49, file: () => import('./modules/module-34-mecanica-classica.json') },
  { id: 'module-36-termodinamica',      phase: 1, order: 50, glossaryTerms: ['g-entropia'], file: () => import('./modules/module-36-termodinamica.json') },
  { id: 'module-37-electromagnetisme',  phase: 1, order: 51, glossaryTerms: ['g-em'], file: () => import('./modules/module-37-electromagnetisme.json') },
  { id: 'module-38-relativitat',        phase: 1, order: 52, glossaryTerms: ['g-relativitat'], file: () => import('./modules/module-38-relativitat.json') },
  // — Bloc: Filosofia —
  { id: 'module-30-introduccio-filosofia', phase: 1, order: 53, glossaryTerms: ['g-fenomenologia'], file: () => import('./modules/module-intro-filosofia.json') },
  { id: 'module-09-filosofia-politica',   phase: 1, order: 54, file: () => import('./modules/module-09-filosofia-politica.json') },
  { id: 'module-31-etica',                phase: 1, order: 55, glossaryTerms: ['g-etica', 'g-kantiana', 'g-utilitarisme'], file: () => import('./modules/module-31-etica.json') },
  { id: 'module-32-logica-argumentacio',  phase: 1, order: 56, glossaryTerms: ['g-logica', 'g-sofisma'], file: () => import('./modules/module-32-logica-argumentacio.json') },
  { id: 'module-33-epistemologia',        phase: 1, order: 57, glossaryTerms: ['g-epistemologia'], file: () => import('./modules/module-33-epistemologia.json') },
  // — Bloc: Astronomia (nous) —
  { id: 'module-09-bigbang',               phase: 1, order: 58, glossaryTerms: ['g-bigbang'], file: () => import('./modules/module-09-bigbang.json') },
  { id: 'module-10-estrelles',             phase: 1, order: 59, glossaryTerms: ['g-supernova'], file: () => import('./modules/module-10-estrelles.json') },
  // — Bloc: Biologia i Física (nous) —
  { id: 'module-08-neurociencia',          phase: 1, order: 60, file: () => import('./modules/module-08-neurociencia.json') },
  { id: 'module-08-relativitat',           phase: 1, order: 61, file: () => import('./modules/module-08-relativitat.json') },
  // — Bloc: Literatura —
  { id: 'module-01-antiguitat-origens',        phase: 1, order: 62, file: () => import('./modules/module-01-antiguitat-origens.json') },
  { id: 'module-02-edat-mitjana-renaixement',  phase: 1, order: 63, file: () => import('./modules/module-02-edat-mitjana-renaixement.json') },
  { id: 'module-05-avantguardes',              phase: 1, order: 64, file: () => import('./modules/module-05-avantguardes.json') },
  { id: 'module-06-novella-segle-xx',          phase: 1, order: 65, file: () => import('./modules/module-06-novella-segle-xx.json') },
  { id: 'module-08-postmodernisme',            phase: 1, order: 66, file: () => import('./modules/module-08-postmodernisme.json') },
  // — Bloc: Arquitectura —
  { id: 'module-XX-arquitectura-01',  phase: 1, order: 67, file: () => import('./modules/module-arquitectura-01.json') },
  { id: 'module-XX-arquitectura-02',  phase: 1, order: 68, file: () => import('./modules/module-arquitectura-02.json') },
  { id: 'module-XX-arquitectura-03',  phase: 1, order: 69, file: () => import('./modules/module-arquitectura-03.json') },
  { id: 'module-XX-arquitectura-04',  phase: 1, order: 70, file: () => import('./modules/module-arquitectura-04.json') },
  // — Bloc: Arts i Cultura —
  { id: 'module-XX-cinema',           phase: 1, order: 71, file: () => import('./modules/module-cinema.json') },
  { id: 'module-30-opera',            phase: 1, order: 72, file: () => import('./modules/module-opera.json') },
  // — Bloc: Relacions Internacionals (nous) —
  { id: 'module-XX-ddhh-ordre-internacional', phase: 1, order: 73, file: () => import('./modules/module-XX-ddhh-ordre-internacional.json') },
  { id: 'module-XX-teoria-ri',                phase: 1, order: 74, glossaryTerms: ['g-sobirania', 'g-realpolitik'], file: () => import('./modules/module-XX-teoria-ri.json') },
  // — Bloc: Societat i Política —
  { id: 'module-34-democracia-sistemes-politics', phase: 1, order: 75, file: () => import('./modules/module-democracia-sistemes-politics.json') },
  { id: 'module-XX-sociologia',                   phase: 1, order: 76, file: () => import('./modules/module-sociologia.json') },
  // — Bloc: Filosofia (nous) —
  { id: 'module-XX-intro-filosofia',      phase: 1, order: 77, file: () => import('./modules/module-XX-intro-filosofia.json') },
  { id: 'module-XX-etica-practica',       phase: 1, order: 78, file: () => import('./modules/module-etica-practica.json') },
  { id: 'module-XX-filosofia-llenguatge', phase: 1, order: 79, file: () => import('./modules/module-filosofia-llenguatge.json') },
  // — Bloc: Astronomia (nous 2) —
  { id: 'module-08-origen-desti-univers',    phase: 1, order: 80, glossaryTerms: ['g-bigbang'], file: () => import('./modules/module-08-origen-desti-univers.json') },
  { id: 'module-09-materia-energia-fosques', phase: 1, order: 81, file: () => import('./modules/module-09-materia-energia-fosques.json') },
  { id: 'module-10-forats-negres',           phase: 1, order: 82, file: () => import('./modules/module-10-forats-negres.json') },
  { id: 'module-11-mons-alla',               phase: 1, order: 83, glossaryTerms: ['g-exoplaneta'], file: () => import('./modules/module-11-mons-alla.json') },
  // — Bloc: Física (nous) —
  { id: 'module-10-caos',                phase: 1, order: 84, file: () => import('./modules/module-10-caos.json') },
  { id: 'module-12-temps-espai-limits',  phase: 1, order: 85, file: () => import('./modules/module-12-temps-espai-limits.json') },
  // — Bloc: Biologia (nous) —
  { id: 'module-09-cos-huma',            phase: 1, order: 86, file: () => import('./modules/module-09-cos-huma.json') },
  { id: 'module-11-ecologia',            phase: 1, order: 87, file: () => import('./modules/module-11-ecologia.json') },
  { id: 'module-13-trauma-resiliencia',  phase: 1, order: 88, file: () => import('./modules/module-13-trauma-resiliencia.json') },
  // — Bloc: Ment i Comportament —
  { id: 'module-12-ment-enganya',        phase: 1, order: 89, file: () => import('./modules/module-12-ment-enganya.json') },
  { id: 'module-14-obediencia',          phase: 1, order: 90, file: () => import('./modules/module-14-obediencia.json') },
  // — Bloc: Diplomàcia —
  { id: 'module-XX-diplomacia-negociacio',    phase: 1, order: 91, file: () => import('./modules/module-XX-diplomacia-negociacio.json') },
  { id: 'module-XX-historia-diplomacia',      phase: 1, order: 92, file: () => import('./modules/module-XX-historia-diplomacia.json') },
  { id: 'module-XX-organismes-internacionals', phase: 1, order: 93, file: () => import('./modules/module-XX-organismes-internacionals.json') },
]

export async function loadModule(moduleId) {
  const entry = MODULE_REGISTRY.find(m => m.id === moduleId)
  if (!entry) throw new Error(`Mòdul no trobat: ${moduleId}`)
  const data = await entry.file()
  return data.default || data
}

export function getModuleList() {
  return MODULE_REGISTRY.map(({ id, phase, order }) => ({ id, phase, order }))
}

/** Retorna l'entrada del registry que cobreix el terme de glossari, o null. */
export function getModuleForTerm(termId) {
  return MODULE_REGISTRY.find(m => (m.glossaryTerms || []).includes(termId)) || null
}
