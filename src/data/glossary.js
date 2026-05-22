/**
 * glossary.js
 *
 * Termes clau organitzats per àrea.
 * Cada entrada: { id, term, definition, areaId }
 */

export const GLOSSARY = [
  // ── Ciències ──────────────────────────────────────
  { id: 'g-bigbang',         term: 'Big Bang',            areaId: 'ciencies',  definition: 'Model cosmològic que descriu l\'origen de l\'univers fa ~13.800 milions d\'anys, a partir d\'un estat extremadament dens i calent.' },
  { id: 'g-heliocentrisme',  term: 'Heliocentrisme',       areaId: 'ciencies',  definition: 'Model astronòmic que situa el Sol al centre del sistema solar, proposat per Copèrnic al s. XVI en substitució del geocentrisme ptolemaic.' },
  { id: 'g-relativitat',     term: 'Relativitat',          areaId: 'ciencies',  definition: 'Teoria d\'Einstein (especial 1905, general 1915) que mostra que el temps i l\'espai no són absoluts sinó relatius a l\'observador i la gravetat.' },
  { id: 'g-quantica',        term: 'Mecànica quàntica',    areaId: 'ciencies',  definition: 'Teoria física que descriu el comportament de les partícules subatòmiques, on la probabilitat substitueix la certesa clàssica.' },
  { id: 'g-adn',             term: 'ADN',                  areaId: 'ciencies',  definition: 'Àcid desoxiribonucleic: molècula que codifica la informació genètica de tots els organismes vius mitjançant seqüències de bases nitrogenades.' },
  { id: 'g-evolucio',        term: 'Evolució',             areaId: 'ciencies',  definition: 'Procés de canvi gradual en les poblacions d\'organismes al llarg del temps, impulsat principalment per la selecció natural (Darwin).' },
  { id: 'g-entropia',        term: 'Entropia',             areaId: 'ciencies',  definition: 'Mesura del desordre d\'un sistema. El 2n principi de la termodinàmica estableix que l\'entropia d\'un sistema aïllat mai disminueix.' },
  { id: 'g-neurones',        term: 'Neurona',              areaId: 'ciencies',  definition: 'Cèl·lula especialitzada del sistema nerviós que transmet informació elèctrica i química. El cervell humà en té ~86.000 milions.' },
  { id: 'g-atom',            term: 'Àtom',                 areaId: 'ciencies',  definition: 'Unitat bàsica de la matèria, formada per un nucli de protons i neutrons envoltat d\'electrons. El nom ve del grec "indivisible" (tot i que sí es pot dividir).' },
  { id: 'g-em',              term: 'Electromagentisme',    areaId: 'ciencies',  definition: 'Interacció física que unifica l\'electricitat i el magnetisme. Maxwell (1865) va demostrar que la llum és una ona electromagnètica.' },
  { id: 'g-exoplaneta',      term: 'Exoplaneta',           areaId: 'ciencies',  definition: 'Planeta que orbita una estrella diferent del Sol. Des de 1995 s\'han descobert més de 5.500 exoplanetes confirmats.' },
  { id: 'g-supernova',       term: 'Supernova',            areaId: 'ciencies',  definition: 'Explosió massiva al final de la vida d\'una estrella gran. Pot brillar tant com una galàxia sencera durant setmanes i és la font de la majoria d\'elements pesants.' },

  // ── Història ──────────────────────────────────────
  { id: 'g-democracia-atenes', term: 'Democràcia atenesa', areaId: 'historia', definition: 'Sistema polític instaurat a Atenes (~508 aC) per Clístenes, on els ciutadans (homes lliures) participaven directament en les decisions col·lectives.' },
  { id: 'g-republica-romana',  term: 'República Romana',   areaId: 'historia', definition: 'Forma de govern de Roma (509–27 aC) amb dos cònsols elegits anualment, Senat i assemblees. Va precedir l\'Imperi romà.' },
  { id: 'g-farao',             term: 'Faraó',              areaId: 'historia', definition: 'Títol dels monarques de l\'antic Egipte, considerats déus vivents. Governaven sobre la vida terrenal i divina dels egipcis.' },
  { id: 'g-pax-romana',        term: 'Pax Romana',         areaId: 'historia', definition: 'Període de relativa pau i estabilitat a l\'Imperi Romà (~27 aC – 180 dC) sota la dinastia Julío-Clàudia i els cinc bons emperadors.' },
  { id: 'g-maat',              term: 'Maat',               areaId: 'historia', definition: 'Concepte egipci de l\'ordre còsmic, la justícia i la veritat. La deessa Maat personificava l\'equilibri que el faraó havia de mantenir.' },
  { id: 'g-helenisme',         term: 'Hel·lenisme',        areaId: 'historia', definition: 'Període cultural (323–31 aC) posterior a Alexandre el Gran en el qual la cultura grega es va difondre per l\'Orient Mitjà i l\'Àsia Central.' },
  { id: 'g-senat-roma',        term: 'Senat romà',         areaId: 'historia', definition: 'Assemblea deliberativa de la República i l\'Imperi Romà, integrada per patricius i ex-magistrats. Va ser el principal òrgan legislatiu i d\'assessorament.' },
  { id: 'g-revolucio-francesa',term: 'Revolució Francesa', areaId: 'historia', definition: 'Transformació política radical de França (1789–1799) que va abolir la monarquia absoluta, va proclamar els drets de l\'home i va obrir l\'era contemporània.' },

  // ── Pensament ─────────────────────────────────────
  { id: 'g-epistemologia',  term: 'Epistemologia',     areaId: 'pensament', definition: 'Branca de la filosofia que estudia el coneixement: com el justifiquem, quins límits té i la diferència entre creença, opinió i saber veritable.' },
  { id: 'g-logica',         term: 'Lògica',            areaId: 'pensament', definition: 'Disciplina que estudia els principis del raonament vàlid. Distingeix arguments deductius (de premisses generals a particulars) i inductius.' },
  { id: 'g-etica',          term: 'Ètica',             areaId: 'pensament', definition: 'Branca de la filosofia que reflexiona sobre la moralitat: quines accions són bones o males, justes o injustes, i per quins motius.' },
  { id: 'g-socratic',       term: 'Mètode socràtic',   areaId: 'pensament', definition: 'Tècnica d\'interrogació filosòfica de Sòcrates consistent a fer preguntes progressives fins a exposar contradiccions i arribar a una comprensió més profunda.' },
  { id: 'g-kantiana',       term: 'Imperatiu categòric',areaId: 'pensament', definition: 'Principi moral de Kant: «Actua sols segons aquella màxima per la qual puguis voler alhora que es converteixi en llei universal».' },
  { id: 'g-utilitarisme',   term: 'Utilitarisme',      areaId: 'pensament', definition: 'Teoria ètica (Bentham, Mill) que avalua les accions per les seves conseqüències: és correcta l\'acció que maximitza la felicitat del major nombre.' },
  { id: 'g-fenomenologia',  term: 'Fenomenologia',     areaId: 'pensament', definition: 'Corrent filosòfica (Husserl, Heidegger) que estudia l\'estructura de l\'experiència conscient, tal com es presenta a la primera persona.' },
  { id: 'g-sofisma',        term: 'Fal·làcia',         areaId: 'pensament', definition: 'Argument que sembla vàlid però conté un error lògic o retòric. Exemples: l\'home de palla, la pendent lliscant, ad hominem.' },

  // ── Societat ──────────────────────────────────────
  { id: 'g-pib',            term: 'PIB',               areaId: 'societat', definition: 'Producte Interior Brut: valor total de béns i serveis produïts en un país en un període. Principal indicador de la mida d\'una economia, tot i les seves limitacions.' },
  { id: 'g-inflacio',       term: 'Inflació',          areaId: 'societat', definition: 'Augment generalitzat i sostingut del nivell de preus. Una inflació moderada (~2%) és considerada sana pels bancs centrals.' },
  { id: 'g-keynes',         term: 'Keynesianisme',     areaId: 'societat', definition: 'Corrent econòmica (Keynes, 1936) que defensa la intervenció de l\'Estat per estimular la demanda i combatre les recessions.' },
  { id: 'g-elasticitat',    term: 'Elasticitat',       areaId: 'societat', definition: 'Mesura de la sensibilitat d\'una variable (quantitat demandada/oferta) davant canvis en una altra (preu, renda). Clau per entendre mercats.' },
  { id: 'g-desigualtat',    term: 'Coeficient de Gini',areaId: 'societat', definition: 'Índex que mesura la desigualtat de la distribució de la renda o la riquesa en una societat: 0 = igualtat perfecta, 1 = desigualtat total.' },
  { id: 'g-mercat',         term: 'Mercat',            areaId: 'societat', definition: 'Mecanisme d\'interacció entre oferta i demanda que determina preus i quantitats. Pot ser perfectament competitiu, oligopolístic o monopolístic.' },
  { id: 'g-marxisme',       term: 'Marxisme',          areaId: 'societat', definition: 'Teoria socioeconòmica de Marx i Engels que analitza el capitalisme per les relacions de producció i la lluita de classes, proposant la supressió de la propietat privada.' },

  // ── Relacions Internacionals ───────────────────────
  { id: 'g-onu',            term: 'ONU',               areaId: 'relacions', definition: 'Organització de les Nacions Unides (1945): organisme intergovernamental amb 193 estats membres creat per mantenir la pau i la seguretat internacionals.' },
  { id: 'g-ddhh',           term: 'Drets Humans',      areaId: 'relacions', definition: 'Drets inherents a tota persona per la seva condició humana, reconeguts per la Declaració Universal de 1948. Universals, inalienables i indivisibles.' },
  { id: 'g-sobirania',      term: 'Sobirania',         areaId: 'relacions', definition: 'Principi del dret internacional pel qual un estat té autoritat suprema sobre el seu territori i és reconegut com a igual pels altres estats.' },
  { id: 'g-realpolitik',    term: 'Realpolitik',       areaId: 'relacions', definition: 'Enfocament pragmàtic de la política exterior centrat en interessos nacionals i equilibri de poder, per sobre de consideracions ideals o morals.' },
  { id: 'g-tpi',            term: 'Tribunal Penal Internacional', areaId: 'relacions', definition: 'Tribunal permanent (La Haia, 2002) que jutja individus per genocidi, crims contra la humanitat i crims de guerra quan els estats no ho fan.' },
  { id: 'g-r2p',            term: 'Responsabilitat de Protegir', areaId: 'relacions', definition: 'Principi de la ONU (2005) que reconeix que la sobirania estatal no és absoluta: la comunitat internacional pot intervenir si un estat no protegeix la seva població.' },
]

export function searchGlossary(terms, query, areaFilter) {
  const q = query.toLowerCase()
  return terms.filter(t => {
    const matchesQuery = !q || t.term.toLowerCase().includes(q) || t.definition.toLowerCase().includes(q)
    const matchesArea  = !areaFilter || t.areaId === areaFilter
    return matchesQuery && matchesArea
  }).sort((a, b) => a.term.localeCompare(b, 'ca'))
}
