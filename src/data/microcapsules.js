/**
 * microcapsules.js
 *
 * Mini-lliçons de 2-5 minuts. Contingut autònom, sense prerequisits.
 * Cada càpsula: 1-2 blocs narratius + 1 idea clau + 1 exercici.
 */

export const MICROCAPSULES = [
  {
    id: 'mc-gravetat',
    title: 'Per qué cau sempre la poma?',
    emoji: '🍎',
    duration: 2,
    areaId: 'ciencies',
    blocks: [
      {
        type: 'narrative',
        text: 'Quan Newton va veure caure una poma el 1666, no va descobrir la gravetat — tothom ja sabia que les coses cauen. El que va fer va ser diferent: va entendre que la força que fa caure la poma és exactament la mateixa que manté la Lluna en òrbita al voltant de la Terra. La gravetat no és un fenomen terrestre. És universal.',
      },
      {
        type: 'key-idea',
        text: 'Cada objecte amb massa atreu cada altre objecte amb massa. La força creix amb les masses i disminueix amb el quadrat de la distància: F = Gm₁m₂/r². Si doblem la distància, la força es redueix a una quarta part.',
      },
      {
        type: 'exercise',
        id: 'mc-gravetat-q1',
        exerciseType: 'multiple-choice',
        question: 'Si doblem la distància entre dos cossos, la força gravitatòria entre ells...',
        options: [
          'Es redueix a la meitat',
          'Es redueix a una quarta part',
          'Es dobla',
          'No canvia',
        ],
        correctIndex: 1,
        explanation: 'La gravetat segueix la llei de l\'invers del quadrat: F ∝ 1/r². Doblar la distància (r × 2) redueix la força a 1/4.',
      },
    ],
  },
  {
    id: 'mc-democracia',
    title: 'Qui va inventar la democràcia?',
    emoji: '🏛️',
    duration: 2,
    areaId: 'historia',
    blocks: [
      {
        type: 'narrative',
        text: 'La democràcia grega no era com la nostra. Atenes al segle V aC tenia uns 30.000 ciutadans amb dret a vot d\'una població total de 250.000 persones. Les dones, els esclaus i els estrangers quedaven fora. I tot i així, van inventar quelcom radical: la idea que els ciutadans podien governar-se ells mateixos, sense rei ni aristocràcia hereditària.',
      },
      {
        type: 'key-idea',
        text: 'Clístenes (~508 aC) va crear la democràcia atenesa reorganitzant la ciutadania per districtes geogràfics en lloc de per clans familiars, trencant el poder de l\'aristocràcia. Demos (poble) + kratos (poder) = democràcia.',
      },
      {
        type: 'exercise',
        id: 'mc-democracia-q1',
        exerciseType: 'multiple-choice',
        question: 'Quin percentatge aproximat de la població d\'Atenes tenia dret a vot?',
        options: [
          'El 100%',
          'El 50%',
          'El 20%',
          'El 5%',
        ],
        correctIndex: 2,
        explanation: 'Uns 30.000 ciutadans d\'una població de ~250.000. Les dones, esclaus i estrangers residents (metoics) quedaven exclosos del demos.',
      },
    ],
  },
  {
    id: 'mc-inflacio',
    title: 'Inflació: per qué puja tot de preu?',
    emoji: '💸',
    duration: 3,
    areaId: 'societat',
    blocks: [
      {
        type: 'narrative',
        text: 'El 1923 a Alemanya, un diari costava 1 marc al matí i 2 marcs al vespre. La gent anava al mercat amb carretons plens de bitllets. La hiperinflació de Weimar és l\'exemple extrem, però la inflació no sempre és catastròfica: normalment és un augment gradual dels preus que erosiona silenciosament el poder adquisitiu.',
      },
      {
        type: 'key-idea',
        text: 'La inflació és l\'augment generalitzat i sostingut del nivell de preus. Els bancs centrals (el BCE a Europa) intenten mantenir-la al voltant del 2%, que es considera sana. Per sobre, el poder adquisitiu es deteriora. Per sota (deflació), la gent deixa de consumir esperant preus més baixos, paralitzant l\'economia.',
      },
      {
        type: 'exercise',
        id: 'mc-inflacio-q1',
        exerciseType: 'multiple-choice',
        question: 'Quin organisme fixa els tipus d\'interès a Europa per controlar la inflació?',
        options: [
          'El Parlament Europeu',
          'El Banc Central Europeu (BCE)',
          'El Fons Monetari Internacional',
          'La Comissió Europea',
        ],
        correctIndex: 1,
        explanation: 'El BCE té com a mandato principal mantenir l\'estabilitat de preus a la zona euro, amb un objectiu d\'inflació del 2%. Puja els tipus d\'interès per frenar la inflació i els baixa per estimular l\'economia.',
      },
    ],
  },
  {
    id: 'mc-tramvia',
    title: 'El dilema del tramvia',
    emoji: '🚋',
    duration: 3,
    areaId: 'pensament',
    blocks: [
      {
        type: 'narrative',
        text: 'Un tramvia fora de control avança cap a cinc persones lligades a la via. Tu ets prop d\'una palanca: si l\'acciones, el tramvia es desvia a una altra via on hi ha una sola persona. Fas el canvi? La majoria diu que sí. Ara imagina que ets en un pont sobre la via, i pots aturar el tramvia empenyent una persona gran des del pont. Mates una per salvar cinc? La majoria diu que no. El resultat és idèntic. Per qué la diferència?',
      },
      {
        type: 'key-idea',
        text: 'El dilema exposa la tensió entre dos enfocaments ètics. L\'utilitarisme diu: fes el que maximitza el bé total (salva cinc, sempre). La deontologia kantiana diu: algunes accions (usar una persona com a mitjà) estan prohibides independentment de les conseqüències.',
      },
      {
        type: 'exercise',
        id: 'mc-tramvia-q1',
        exerciseType: 'multiple-choice',
        question: 'Quin enfocament ètic diu que el correcte és el que produeix les millors conseqüències globals?',
        options: [
          'Deontologia',
          'Utilitarisme',
          'Ètica de la virtut',
          'Contractualisme',
        ],
        correctIndex: 1,
        explanation: 'L\'utilitarisme (Bentham, Mill) avalua les accions per les seves conseqüències: és correcta l\'acció que maximitza el benestar del major nombre. La deontologia (Kant), en canvi, estableix deures absoluts independents de les conseqüències.',
      },
    ],
  },
  {
    id: 'mc-sol',
    title: 'Per qué el Sol porta 5.000 milions d\'anys brillant?',
    emoji: '☀️',
    duration: 2,
    areaId: 'ciencies',
    blocks: [
      {
        type: 'narrative',
        text: 'Si el Sol cremés carbó com una central tèrmica, s\'hauria esgotat en menys de 10.000 anys. Porta brillant 4.600 milions d\'anys. La clau és que el Sol no crema res: fusiona. Al nucli, a 15 milions de graus, quatre àtoms d\'hidrogen es fonen en un àtom d\'heli, alliberant una energia descomunal. Un gram d\'hidrogen fusionat equival a 60 tones de gasoil.',
      },
      {
        type: 'key-idea',
        text: 'La fusió nuclear transforma massa en energia (E = mc²). El Sol converteix 600 milions de tones d\'hidrogen en heli cada segon, perdent 4 milions de tones de massa pura que es converteixen en llum i calor. Li queden uns 5.000 milions d\'anys de combustible.',
      },
      {
        type: 'exercise',
        id: 'mc-sol-q1',
        exerciseType: 'multiple-choice',
        question: 'Quin procés manté el Sol brillant?',
        options: [
          'Combustió del carboni',
          'Fissió nuclear (trencar àtoms pesants)',
          'Fusió nuclear (unir àtoms lleugers)',
          'Reaccions químiques a alta temperatura',
        ],
        correctIndex: 2,
        explanation: 'La fusió nuclear uneix àtoms lleugers (hidrogen → heli), alliberant moltíssima energia. La fissió, al contrari, trenca àtoms pesants (com l\'urani) i és la que s\'usa a les centrals nuclears actuals.',
      },
    ],
  },
  {
    id: 'mc-cleopatra',
    title: 'Cleopatra no era egípcia',
    emoji: '👑',
    duration: 2,
    areaId: 'historia',
    blocks: [
      {
        type: 'narrative',
        text: 'Cleopatra VII, l\'última faraona d\'Egipte, era grega. Pertanyia a la dinastia ptolemaica, fundada per un general d\'Alexandre el Gran el 305 aC. De fet, era la primera de la seva família que aprenia a parlar egipci. Va governar de 51 al 30 aC, i es va aliar primer amb Juli Cèsar i després amb Marc Antoni per mantenir Egipte independent. Quan Antoni va perdre la guerra civil romana, Cleopatra va morir — i amb ella, 3.000 anys de civilització faraònica.',
      },
      {
        type: 'key-idea',
        text: 'La caiguda d\'Egipte no va ser una conquesta sobtada sinó el resultat de dècades de dependència de Roma. Octavi August va annexionar Egipte com a província romana el 30 aC. Aquesta data marca el final del món antic i l\'inici de l\'hegemonia romana total al Mediterrani.',
      },
      {
        type: 'exercise',
        id: 'mc-cleopatra-q1',
        exerciseType: 'multiple-choice',
        question: 'Quina era l\'origen ètnic de la dinastia que va governar Egipte en l\'època de Cleopatra?',
        options: [
          'Egipci natiu (descendents dels faraons antics)',
          'Romà',
          'Grec (dinastia ptolemaica)',
          'Persa',
        ],
        correctIndex: 2,
        explanation: 'La dinastia ptolemaica va ser fundada per Ptolemeu I, un dels generals macedonis d\'Alexandre el Gran. Van governar Egipte durant 275 anys, mantenint la cultura egípcia però amb una cort essencialment grega.',
      },
    ],
  },
  {
    id: 'mc-fallacies',
    title: 'Fal·làcies: errors disfressats de raó',
    emoji: '🧩',
    duration: 3,
    areaId: 'pensament',
    blocks: [
      {
        type: 'narrative',
        text: '"Ets un hipòcrita, tu tampoc recicles" — atac a la persona, no a l\'argument (ad hominem). "Si permetem X, aviat permetrem Z" — salt injustificat a un extrem (pendent lliscant). "Tothom ho fa, per tant és correcte" — l\'aprovació popular no implica veritat moral (ad populum). Les fal·làcies lògiques són errors de raonament que semblen vàlids però que no resisteixen l\'anàlisi.',
      },
      {
        type: 'key-idea',
        text: 'Una fal·làcia és un argument amb aparença de validesa però amb un error lògic o retòric. Reconèixer-les és una habilitat fonamental: et protegeix de ser manipulat en debaTs polítics, publicitat i xarxes socials, i millora la qualitat dels teus propis arguments.',
      },
      {
        type: 'exercise',
        id: 'mc-fallacies-q1',
        exerciseType: 'multiple-choice',
        question: '"Si no ets amb nosaltres, ets contra nosaltres." Quina fal·làcia conté aquesta afirmació?',
        options: [
          'Ad hominem (atac a la persona)',
          'Fals dilema (només dues opcions quan n\'hi ha més)',
          'Ad populum (apel·lació a la majoria)',
          'Pendent lliscant (salt a un extrem)',
        ],
        correctIndex: 1,
        explanation: 'El fals dilema presenta dues opcions com si fossin les úniques possibles, eliminant totes les posicions intermèdies o alternatives. En realitat, es pot no estar "amb" algú sense estar-hi "contra": hi ha neutralitat, matisos, desacord parcial...',
      },
    ],
  },
  {
    id: 'mc-desigualtat',
    title: 'Qui té la riquesa del món?',
    emoji: '⚖️',
    duration: 2,
    areaId: 'societat',
    blocks: [
      {
        type: 'narrative',
        text: 'Segons Oxfam (2024), el 1% de les persones més riques del món posseeix més riquesa que el 99% restant. Però la desigualtat no és una foto estàtica: és un procés dinàmic. L\'economista Thomas Piketty ho va mostrar amb dades de dos segles: quan la taxa de rendiment del capital supera el creixement econòmic, la riquesa es concentra inevitablement.',
      },
      {
        type: 'key-idea',
        text: 'La fórmula de Piketty: r > g. "r" és la taxa de rendiment del capital (dividends, rendes, interessos). "g" és la taxa de creixement econòmic. Quan r > g — que és la norma històrica — els qui ja tenen capital s\'enriqueixen més ràpid que els qui viuen del seu treball.',
      },
      {
        type: 'exercise',
        id: 'mc-desigualtat-q1',
        exerciseType: 'multiple-choice',
        question: 'Quan Piketty formula "r > g", vol dir que...',
        options: [
          'La inflació supera el creixement econòmic',
          'El rendiment del capital supera el creixement, concentrant la riquesa',
          'Els rics creixen proporcionalment més ràpid que els pobres',
          'El deute públic supera el PIB',
        ],
        correctIndex: 1,
        explanation: '"r" és la taxa de retorn del capital (propietats, borsa, herències) i "g" és el creixement econòmic general. Quan r > g, els patrimonis creixen més ràpid que els salaris, augmentant la desigualtat. Piketty proposa un impost global progressiu sobre el capital com a solució.',
      },
    ],
  },
  {
    id: 'mc-evolucio',
    title: 'L\'evolució no vol dir progrés',
    emoji: '🦎',
    duration: 3,
    areaId: 'ciencies',
    blocks: [
      {
        type: 'narrative',
        text: 'El malentès més comú sobre l\'evolució és creure que és una escala ascendent cap a la perfecció, amb els humans al capdamunt. Però una medusa que no ha canviat en 500 milions d\'anys és tan "evolucionada" com un humà: s\'ha adaptat perfectament al seu ambient. L\'evolució no té direcció ni objectiu. No busca la complexitat ni la intel·ligència.',
      },
      {
        type: 'key-idea',
        text: 'La selecció natural conserva els trets que incrementen la supervivència i la reproducció en un ambient concret. Si l\'ambient canvia, el que era avantatjós pot convertir-se en un desavantatge. Els ulls de les espècies de coves han degenerat perquè veure no aporta res en la foscor. Això no és regredir: és adaptar-se.',
      },
      {
        type: 'exercise',
        id: 'mc-evolucio-q1',
        exerciseType: 'multiple-choice',
        question: 'Quin és el principal motor de l\'evolució biològica?',
        options: [
          'La voluntat dels organismes d\'adaptar-se i millorar',
          'La selecció natural sobre variació hereditària aleatòria',
          'Un progrés cap a organismes cada vegada més complexos',
          'La necessitat de sobreviure que transforma els individus',
        ],
        correctIndex: 1,
        explanation: 'La selecció natural actua sobre variació genètica aleatòria (mutacions). Els individus amb variants que els ajuden a sobreviure i reproduir-se en el seu ambient actual deixen més descendents. No hi ha "voluntat" ni "progrés": és un filtre estadístic.',
      },
    ],
  },
  {
    id: 'mc-drets-humans',
    title: '1948: el dia dels drets',
    emoji: '🌍',
    duration: 2,
    areaId: 'relacions',
    blocks: [
      {
        type: 'narrative',
        text: 'El 10 de desembre de 1948, a París, l\'Assemblea General de la ONU va adoptar la Declaració Universal dels Drets Humans a les 3 de la matinada. Quaranta-vuit estats van votar a favor, cap en contra. Vuit es van abstenir: l\'URSS, l\'Àfrica del Sud de l\'apartheid i sis estats del bloc soviètic. La redactora principal va ser Eleanor Roosevelt. La Declaració no és un tractat vinculant — però ha inspirat centenars de lleis i tractats que sí ho són.',
      },
      {
        type: 'key-idea',
        text: 'Els drets humans es defineixen com universals (per a tothom, a tot arreu), inalienables (no es poden cedir ni treure) i indivisibles (els drets civils i els econòmics i socials estan interconnectats i es reforcen mútuament). Separar-los — acceptar els civils però no els socials — és una posició política, no una necessitat lògica.',
      },
      {
        type: 'exercise',
        id: 'mc-drets-q1',
        exerciseType: 'multiple-choice',
        question: 'La Declaració Universal dels Drets Humans de 1948 és...',
        options: [
          'Un tractat internacionalment vinculant per a tots els estats',
          'Una declaració de principis sense força jurídica directa, però fonamental com a base moral',
          'Un document exclusivament europeu',
          'Un text que va ser ratificat per tots els estats membres de l\'ONU',
        ],
        correctIndex: 1,
        explanation: 'La DUDH és una declaració (no un tractat), de manera que no és jurídicament vinculant per si sola. Però ha servit com a fonament de centenars de tractats vinculants (Pacte Internacional de Drets Civils i Polítics, Convenció contra la Tortura, etc.) i és considerada dret internacional consuetudinari.',
      },
    ],
  },
  {
    id: 'mc-big-bang-escala',
    title: 'L\'univers en perspectiva',
    emoji: '🌌',
    duration: 2,
    areaId: 'ciencies',
    blocks: [
      {
        type: 'narrative',
        text: 'Si la Terra fos una moneda d\'un euro, el Sol seria una bola de bàsquet a 250 metres. Plutó estaria a 10 km. L\'estrella més propera (Proxima Centauri) estaria a 65.000 km — una volta i mitja al voltant de la Terra. La Via Làctia, amb 200.000 milions d\'estrelles, tindria el diàmetre de la superfície de la Terra. I la Via Làctia és una galàxia típica d\'un univers que en conté com a mínim 2 bilions.',
      },
      {
        type: 'key-idea',
        text: 'L\'univers observable té un radi de ~46.000 milions d\'anys llum. La llum, a 300.000 km/s, tarda 8 minuts a arribar del Sol. Tarda 4,2 anys de Proxima Centauri. Tarda 2,5 milions d\'anys de la galàxia d\'Andròmeda. Quan mirem el cel nocturn, estem mirant el passat.',
      },
      {
        type: 'exercise',
        id: 'mc-escala-q1',
        exerciseType: 'multiple-choice',
        question: 'Quan veiem la llum d\'una estrella que es troba a 100 anys llum, estem veient...',
        options: [
          'Com és l\'estrella ara mateix',
          'Com era l\'estrella fa 100 anys',
          'Un reflex de la nostra pròpia galàxia',
          'La posició actual de l\'estrella amb un retard d\'uns segons',
        ],
        correctIndex: 1,
        explanation: 'La llum viatja a 300.000 km/s, però les distàncies còsmiques són tan immenses que tarda anys, milers d\'anys o milions d\'anys en arribar-nos. Quan mirem una estrella a 100 anys llum, veiem com era fa 100 anys. L\'estrella podria haver mort ja.',
      },
    ],
  },
  {
    id: 'mc-revolucio-francesa',
    title: 'Per qué la Revolució Francesa ho va canviar tot',
    emoji: '🗽',
    duration: 3,
    areaId: 'historia',
    blocks: [
      {
        type: 'narrative',
        text: 'El 14 de juliol de 1789, la multitud de París va assaltar la Bastilla, una presó que simbolitzava l\'absolutisme reial. No hi havia gairebé presos: només set. Però el gest ho va canviar tot. En menys de quatre anys, França va abolir la monarquia, executar el rei i la reina, proclamar la República i iniciar la Declaració dels Drets de l\'Home i del Ciutadà — el text que va inspirar totes les constitucions liberals modernes.',
      },
      {
        type: 'key-idea',
        text: 'La Revolució Francesa (1789-1799) va introduir tres conceptes que van redefinir la política moderna: la sobirania popular (el poder emana del poble, no de Déu ni del rei), la separació de poders (executiu, legislatiu, judicial) i els drets individuals com a límit al poder de l\'estat.',
      },
      {
        type: 'exercise',
        id: 'mc-rev-francesa-q1',
        exerciseType: 'multiple-choice',
        question: 'Quin dels següents principis NO forma part del llegat directe de la Revolució Francesa?',
        options: [
          'La sobirania popular',
          'La Declaració dels Drets Humans de 1948',
          'La separació de poders',
          'Els drets individuals com a límit al poder de l\'estat',
        ],
        correctIndex: 1,
        explanation: 'La Declaració de 1948 és un document de la ONU del segle XX, no de la Revolució Francesa. Els altres tres conceptes (sobirania popular, separació de poders i drets individuals) sí que van emergir directament de la Revolució i la Declaració dels Drets de l\'Home i del Ciutadà de 1789.',
      },
    ],
  },
  {
    id: 'mc-forats-negres',
    title: 'Forats negres: un punt de no retorn',
    emoji: '⚫',
    duration: 2,
    areaId: 'ciencies',
    blocks: [
      {
        type: 'narrative',
        text: 'Un forat negre no és un forat: és una regió de l\'espai on la gravetat és tan intensa que res — ni la llum — pot escapar. L\'horitzó d\'esdeveniments és el límit invisible: si hi entres, desapareixes del nostre univers per sempre. El forat negre supermasiu al centre de la nostra galàxia, Sgr A*, pesa 4 milions de vegades el Sol. El 2019 vam fer la primera fotografia d\'un forat negre, a la galàxia M87.',
      },
      {
        type: 'key-idea',
        text: 'L\'horitzó d\'esdeveniments és la frontera sense retorn. Radi de Schwarzschild: r = 2GM/c². Si la Terra es comprimís fins a tenir un radi de 9 mil·límetres, es convertiria en un forat negre. Per a un observador extern, el temps s\'alenteix infinitament a mesura que algú s\'hi acosta.',
      },
      {
        type: 'exercise',
        id: 'mc-forats-q1',
        exerciseType: 'multiple-choice',
        question: 'Qué passa amb la llum quan arriba a l\'horitzó d\'esdeveniments d\'un forat negre?',
        options: [
          'Es dobla i torna enrere',
          'No pot escapar: queda atrapada per sempre',
          'S\'accelera fins a superar la velocitat de la llum',
          'Es converteix en matèria',
        ],
        correctIndex: 1,
        explanation: 'L\'horitzó d\'esdeveniments és el punt de no retorn: la velocitat d\'escapament és exactament c (la velocitat de la llum). Res amb massa o sense (incloent la llum) pot sortir un cop ha travessat aquest límit.',
      },
    ],
  },
  {
    id: 'mc-milgram',
    title: 'L\'experiment que va canviar la psicologia',
    emoji: '⚡',
    duration: 3,
    areaId: 'pensament',
    blocks: [
      {
        type: 'narrative',
        text: 'El 1961, Stanley Milgram va reclutar voluntaris per a un "experiment d\'aprenentatge" a la Universitat de Yale. Un actor feia de "alumne" i rebia descàrregues elèctriques (falses) cada vegada que s\'equivocava. L\'investigador demanava als voluntaris que pujessen el voltatge fins a 450 volts, marcats com "PERILL". El resultat va ser pertorbador: el 65% dels participants va arribar al voltatge màxim, tot i sentir els crits (gravats) de l\'alumne.',
      },
      {
        type: 'key-idea',
        text: 'L\'experiment de Milgram demostra el poder de l\'autoritat legítima sobre el comportament humà. No era que els participants fossin cruels: la majoria estaven visiblement angoixats. Però la pressió de l\'autoritat ("l\'experiment ha de continuar") era suficient per anular la consciència moral en el 65% dels casos.',
      },
      {
        type: 'exercise',
        id: 'mc-milgram-q1',
        exerciseType: 'multiple-choice',
        question: 'Quin percentatge aproximat dels participants va aplicar el voltatge màxim en l\'experiment de Milgram?',
        options: [
          'El 10%',
          'El 35%',
          'El 65%',
          'El 95%',
        ],
        correctIndex: 2,
        explanation: 'El 65% dels participants va arribar als 450 volts (el màxim, marcat "PERILL"). Milgram esperava un 1-2%. El resultat va sacsejar la psicologia social i la teoria moral: la majoria de la gent normal, en un context d\'autoritat legítima, pot fer coses que en altres circumstàncies consideraria inacceptables.',
      },
    ],
  },
  {
    id: 'mc-materia-fosca',
    title: 'El 95% de l\'univers és invisible',
    emoji: '🕳️',
    duration: 2,
    areaId: 'ciencies',
    blocks: [
      {
        type: 'narrative',
        text: 'Tot el que podem veure — estrelles, galàxies, gas, planetes — representa el 5% de l\'univers. El 27% és matèria fosca: matèria que no emet ni absorbeix llum, però que sabem que existeix perquè la seva gravetat fa girar les galàxies més ràpid del que haurien. I el 68% restant és energia fosca: una força misteriosa que accelera l\'expansió de l\'univers. No sabem qué és cap de les dues.',
      },
      {
        type: 'key-idea',
        text: 'La matèria fosca és necessària per explicar la rotació de les galàxies: els estels del marge exterior giren tan ràpid que, sense massa extra invisible, haurien de sortir volant. L\'energia fosca s\'infereix de les observacions de supernoves distants: l\'univers no sols s\'expandeix, sinó que s\'accelera. Les dues podrien ser les descobertes més importants de la física del futur.',
      },
      {
        type: 'exercise',
        id: 'mc-fosca-q1',
        exerciseType: 'multiple-choice',
        question: 'Quin percentatge de l\'univers és matèria i energia "ordinàries" (visibles)?',
        options: [
          'El 95%',
          'El 68%',
          'El 27%',
          'El 5%',
        ],
        correctIndex: 3,
        explanation: 'Només el 5% de l\'univers és matèria bariònica ordinària (àtoms, molècules, tot el que veiem). El 27% és matèria fosca i el 68% energia fosca. Coneixem les fraccions gràcies al fons còsmic de microones i a observacions de supernoves, però no sabem qué és físicament cap de les dues.',
      },
    ],
  },
  {
    id: 'mc-papallona',
    title: 'La papallona que causa l\'huracà',
    emoji: '🦋',
    duration: 2,
    areaId: 'ciencies',
    blocks: [
      {
        type: 'narrative',
        text: 'El 1972, el meteoròleg Edward Lorenz va formular una pregunta provocadora: "El batre d\'ales d\'una papallona al Brasil provoca un tornado a Texas?" No era un argument sobre causes directes, sinó sobre sensibilitat inicial: en sistemes caòtics, diferències ínfimes en les condicions inicials produeixen resultats radicalment diferents. Lorenz ho va descobrir per accident el 1961 quan va arrodonir un número de 0.506127 a 0.506 i el model meteorològic va donar un temps completament diferent.',
      },
      {
        type: 'key-idea',
        text: 'El caos no vol dir aleatòrietat. Sistemes caòtics segueixen lleis deterministes perfectament definides — però són tan sensibles a les condicions inicials que qualsevol error de mesura (per petit que sigui) fa que les prediccions divergeixin exponencialment. Per això el temps meteorològic és impredictible més de dues setmanes: no per falta de coneixement, sinó per principi.',
      },
      {
        type: 'exercise',
        id: 'mc-papallona-q1',
        exerciseType: 'multiple-choice',
        question: 'Un sistema caòtic és...',
        options: [
          'Un sistema aleatori sense lleis',
          'Un sistema determinista molt sensible a les condicions inicials',
          'Un sistema que no pot ser modelat matemàticament',
          'Un sistema que sempre evoluciona cap al desordre',
        ],
        correctIndex: 1,
        explanation: 'El caos és determinista: si poguessis conèixer les condicions inicials amb precisió perfecta, podries predir el futur perfectament. El problema és que qualsevol imprecisió de mesura — per petita que sigui — s\'amplifica exponencialment. Això fa les prediccions a llarg termini pràcticament impossibles, no per falta de lleis, sinó per la naturalesa de les equacions.',
      },
    ],
  },
]

export function getDailyCapsule() {
  const today = new Date().toISOString().split('T')[0]
  const seed  = today.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0)
  return MICROCAPSULES[seed % MICROCAPSULES.length]
}

export function getCapsuleById(id) {
  return MICROCAPSULES.find(c => c.id === id) || null
}
