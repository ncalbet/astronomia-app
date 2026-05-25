/**
 * microcapsules.js
 *
 * Mini-lliçons de 2-5 minuts. Contingut autònom, sense prerequisits.
 * Cada càpsula: 2 blocs narratius + 1 idea clau + 1 exercici (4 pàgines).
 */

export const MICROCAPSULES = [
  {
    id: 'mc-gravetat',
    title: 'Per què cau sempre la poma?',
    emoji: '🍎',
    duration: 3,
    areaId: 'ciencies',
    blocks: [
      {
        type: 'narrative',
        text: 'Quan Newton va veure caure una poma el 1666, no va descobrir la gravetat — tothom ja sabia que les coses cauen. El que va fer va ser diferent: va entendre que la força que fa caure la poma és exactament la mateixa que manté la Lluna en òrbita al voltant de la Terra. La gravetat no és un fenomen terrestre. És universal.',
      },
      {
        type: 'narrative',
        text: 'Einstein va anar encara més lluny el 1915: la gravetat no és una força invisible que actua a distància, sinó que és la curvatura de l\'espai-temps causada per la massa. La Terra no "estira" la Lluna: la Lluna segueix la corba de l\'espai que la massa terrestre crea al seu voltant, com una pilota que rodarà per un drap tensat. Aquesta correcció explica fenòmens que Newton no podia: el desvío de la llum per la gravetat, els GPS, i l\'existència dels forats negres.',
      },
      {
        type: 'key-idea',
        text: 'Cada objecte amb massa atreu cada altre objecte amb massa. La força creix amb les masses i disminueix amb el quadrat de la distància: F = Gm₁m₂/r². Si doblem la distància, la força es redueix a una quarta part. Newton ho va formular; Einstein va explicar per qué: la massa corba l\'espai-temps i els cossos segueixen aquella corba.',
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
    duration: 3,
    areaId: 'historia',
    blocks: [
      {
        type: 'narrative',
        text: 'La democràcia grega no era com la nostra. Atenes al segle V aC tenia uns 30.000 ciutadans amb dret a vot d\'una població total de 250.000 persones. Les dones, els esclaus i els estrangers quedaven fora. I tot i així, van inventar quelcom radical: la idea que els ciutadans podien governar-se ells mateixos, sense rei ni aristocràcia hereditària.',
      },
      {
        type: 'narrative',
        text: 'Per protegir la democràcia dels tirans, els atenesos van inventar l\'ostracisme: una vegada l\'any, els ciutadans podien votar per exiliar qualsevol persona durant deu anys. S\'escrivia el nom en un tros de ceràmica trencada (ostrakon). Qui rebia més de 6.000 vots, havia de marxar d\'Atenes en deu dies sense perdre els béns ni la ciutadania. Va ser usat contra generals famosos i policies. Era democràcia preventiva: treure de la circulació qui acumulava massa poder.',
      },
      {
        type: 'key-idea',
        text: 'Clístenes (~508 aC) va crear la democràcia atenesa reorganitzant la ciutadania per districtes geogràfics en lloc de per clans familiars, trencant el poder de l\'aristocràcia. Demos (poble) + kratos (poder) = democràcia. La democràcia grega no era representativa sinó directa: els ciutadans votaven personalment les lleis i els magistrats per sorteig, no per elecció.',
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
    title: 'Inflació: per què puja tot de preu?',
    emoji: '💸',
    duration: 3,
    areaId: 'societat',
    blocks: [
      {
        type: 'narrative',
        text: 'El 1923 a Alemanya, un diari costava 1 marc al matí i 2 marcs al vespre. La gent anava al mercat amb carretons plens de bitllets. Les empreses pagaven els treballadors dues vegades al dia perquè el diner perdés menys valor. La hiperinflació de Weimar és l\'exemple extrem, però la inflació no sempre és catastròfica: normalment és un augment gradual dels preus que erosiona silenciosament el poder adquisitiu.',
      },
      {
        type: 'narrative',
        text: 'Zimbabwe el 2008 va superar Weimar: la inflació va arribar a 89,7 sextillions per cent mensual. Els bitllets s\'imprimien amb denominacions de 100 bilions de dòlars zimbabuesos que no compraven gairebé res. El govern va retirar la moneda el 2009 i va adoptar el dòlar americà. La lliçó: la inflació desbocada no és un error tècnic sinó sempre una decisió política. Quan els governs financen despesa imprimint diners sense riquesa real al darrere, destrueixen la moneda.',
      },
      {
        type: 'key-idea',
        text: 'La inflació és l\'augment generalitzat i sostingut del nivell de preus. Els bancs centrals (el BCE a Europa) intenten mantenir-la al voltant del 2%, que es considera sana. Per sobre, el poder adquisitiu es deteriora. Per sota (deflació), la gent deixa de consumir esperant preus més baixos, paralitzant l\'economia. La deflació pot ser tan destructiva com la hiperinflació.',
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
        explanation: 'El BCE té com a mandat principal mantenir l\'estabilitat de preus a la zona euro, amb un objectiu d\'inflació del 2%. Puja els tipus d\'interès per frenar la inflació i els baixa per estimular l\'economia.',
      },
    ],
  },
  {
    id: 'mc-tramvia',
    title: 'El dilema del tramvia',
    emoji: '🚋',
    duration: 4,
    areaId: 'pensament',
    blocks: [
      {
        type: 'narrative',
        text: 'Un tramvia fora de control avança cap a cinc persones lligades a la via. Tu ets prop d\'una palanca: si l\'acciones, el tramvia es desvia a una altra via on hi ha una sola persona. Fas el canvi? La majoria diu que sí. Ara imagina que ets en un pont sobre la via, i pots aturar el tramvia empenyent una persona gran des del pont. Mates una per salvar cinc? La majoria diu que no. El resultat aritmètic és idèntic. Per què la diferència moral?',
      },
      {
        type: 'narrative',
        text: 'La filòsofa Judith Jarvis Thomson, que va popularitzar el dilema del tramvia als anys 70, va notar que la clau és la distinció entre fer servir algú com a mitjà i redirigir un perill ja existent. Quan accionem la palanca, no usem la persona de la via lateral: és un efecte secundari. Quan empenyem la persona del pont, la convertim en instrument de salvació. El cervell humà, estudiat per neurocientífics com Joshua Greene, registra diferent emocionalment "empènyer" que "accionar": el contacte físic activa circuits d\'empatia que la palanca no activa.',
      },
      {
        type: 'key-idea',
        text: 'El dilema del tramvia exposa la tensió entre dos enfocaments ètics. L\'utilitarisme diu: fes el que maximitza el bé total (salva cinc, sempre). La deontologia kantiana diu: algunes accions (usar una persona com a mitjà) estan prohibides independentment de les conseqüències. La majoria de persones apliquen els dos principis alhora però de manera inconsistent, cosa que suggereix que la moral humana no és un sistema lògic, sinó un conjunt d\'intuïcions evolutives sovint contradictòries.',
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
    title: 'Per què el Sol porta 5.000 milions d\'anys brillant?',
    emoji: '☀️',
    duration: 3,
    areaId: 'ciencies',
    blocks: [
      {
        type: 'narrative',
        text: 'Si el Sol cremés carbó com una central tèrmica, s\'hauria esgotat en menys de 10.000 anys. Porta brillant 4.600 milions d\'anys. La clau és que el Sol no crema res: fusiona. Al nucli, a 15 milions de graus, quatre àtoms d\'hidrogen es fonen en un àtom d\'heli, alliberant una energia descomunal. Un gram d\'hidrogen fusionat equival a 60 tones de gasoil.',
      },
      {
        type: 'narrative',
        text: 'D\'aquí 5.000 milions d\'anys, el Sol s\'exhaurirà l\'hidrogen del nucli. Llavors s\'expandirà fins a convertir-se en una gegant roja, engolint Mercuri, Venus i probablement la Terra. El seu radi creixerà 200 vegades. Finalment, expulsarà les capes externes formant una nebulosa planetària, i el que quedarà serà un nan blanc —un nucli fred del tamany de la Terra que s\'anirà apagant durant bilions d\'anys. El nostre Sol acabarà com una brasa lleugera en un cosmos buit.',
      },
      {
        type: 'key-idea',
        text: 'La fusió nuclear transforma massa en energia (E = mc²). El Sol converteix 600 milions de tones d\'hidrogen en heli cada segon, perdent 4 milions de tones de massa pura que es converteixen en llum i calor. Li queden uns 5.000 milions d\'anys de combustible. L\'edat de la Terra és de 4.600 milions d\'anys: som a la meitat de la vida del Sol.',
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
    duration: 3,
    areaId: 'historia',
    blocks: [
      {
        type: 'narrative',
        text: 'Cleopatra VII, l\'última faraona d\'Egipte, era grega. Pertanyia a la dinastia ptolemaica, fundada per un general d\'Alexandre el Gran el 305 aC. De fet, era la primera de la seva família que aprenia a parlar egipci. Va governar de 51 al 30 aC, i es va aliar primer amb Juli Cèsar i després amb Marc Antoni per mantenir Egipte independent.',
      },
      {
        type: 'narrative',
        text: 'La imatge de Cleopatra com a seductora és una invenció romana i posterior. Les fonts antigues la descriuen sobretot com una política brillant i una intel·lectual excepcional. Parlava nou idiomes —egipci, grec, etíop, hebreu, àrab, arameu, parts, mede i llatí— en una època en que cap rei ptolemaic anterior havia après l\'egipci. Era doctora en filosofia, matemàtiques i astronomia. Va ser la primera líder del seu territori en generacions que podia negociar directament amb els sacerdots egipcis sense intèrpret.',
      },
      {
        type: 'key-idea',
        text: 'La caiguda d\'Egipte no va ser una conquesta sobtada sinó el resultat de dècades de dependència de Roma. Octavi August va annexionar Egipte com a província romana el 30 aC, quan Cleopatra i Antoni van morir. Aquesta data marca el final del món hel·lenístic i l\'inici de l\'hegemonia romana total al Mediterrani. Tres mil anys de civilització faraònica van acabar en deu dies.',
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
        explanation: 'La dinastia ptolemaica va ser fundada per Ptolemeu I, un dels generals macedonis d\'Alexandre el Gran. Van governar Egipte durant 275 anys mantenint la cultura egípcia, però amb una cort essencialment grega. Cleopatra VII va ser la primera de la família a aprendre egipci.',
      },
    ],
  },
  {
    id: 'mc-fallacies',
    title: 'Fal·làcies: errors disfressats de raó',
    emoji: '🧩',
    duration: 4,
    areaId: 'pensament',
    blocks: [
      {
        type: 'narrative',
        text: '"Ets un hipòcrita, tu tampoc recicles" — atac a la persona, no a l\'argument (ad hominem). "Si permetem X, aviat permetrem Z" — salt injustificat a un extrem (pendent lliscant). "Tothom ho fa, per tant és correcte" — l\'aprovació popular no implica veritat moral (ad populum). Les fal·làcies lògiques són errors de raonament que semblen vàlids però que no resisteixen l\'anàlisi.',
      },
      {
        type: 'narrative',
        text: 'Algunes fal·làcies són especialment comunes en política i xarxes socials. El "whataboutisme" (tu quoque) és quan, en comptes de respondre una acusació, es pregunta "i vosaltres?": "ens critiqueu per X, però vosaltres feu Y". L\'home de palla consisteix a deformar l\'argument contrari per fer-lo semblar absurd i fàcil de refutar. L\'apel·lació a l\'autoritat usa el prestigi d\'una persona per avalar una afirmació sense proves. Reconèixer-les no et fa immune, però sí que fa els debats més honestos.',
      },
      {
        type: 'key-idea',
        text: 'Una fal·làcia és un argument amb aparença de validesa però amb un error lògic o retòric. Reconèixer-les és una habilitat fonamental: et protegeix de ser manipulat en debats polítics, publicitat i xarxes socials, i millora la qualitat dels teus propis arguments. Les fal·làcies no sempre són intencionals: moltes vegades reflecteixen errors de pensament genuïns.',
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
        explanation: 'El fals dilema presenta dues opcions com si fossin les úniques possibles, eliminant totes les posicions intermèdies. En realitat, es pot no estar "amb" algú sense estar-hi "contra": hi ha neutralitat, matisos, desacord parcial...',
      },
    ],
  },
  {
    id: 'mc-desigualtat',
    title: 'Qui té la riquesa del món?',
    emoji: '⚖️',
    duration: 3,
    areaId: 'societat',
    blocks: [
      {
        type: 'narrative',
        text: 'Segons Oxfam (2024), el 1% de les persones més riques del món posseeix més riquesa que el 99% restant. Les 26 persones més riques del món acumulen tanta riquesa com els 3.800 milions de persones més pobres. Però la desigualtat no és una foto estàtica: és un procés dinàmic que s\'accelera.',
      },
      {
        type: 'narrative',
        text: 'El coeficient de Gini mesura la desigualtat d\'un país en una escala de 0 (igualtat perfecta: tothom té el mateix) a 1 (desigualtat absoluta: una sola persona ho té tot). Els països escandinaus ronden el 0,25. Els EUA estan al 0,39. Brasil i Sud-àfrica superen el 0,55. La Xina ha passat de 0,20 el 1980 a 0,47 avui: la creixement econòmic xinès ha reduït la pobresa però ha disparat la desigualtat interna.',
      },
      {
        type: 'key-idea',
        text: 'La fórmula de Piketty: r > g. "r" és la taxa de rendiment del capital (dividends, rendes, interessos). "g" és la taxa de creixement econòmic. Quan r > g — que és la norma històrica — els qui ja tenen capital s\'enriqueixen més ràpid que els qui viuen del seu treball. Les guerres i la Gran Depressió van ser les úniques interrupcions importants d\'aquesta tendència al segle XX.',
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
        type: 'narrative',
        text: 'Un dels exemples més sorprenents és l\'evolució convergent: la mateixa solució inventada de manera independent moltes vegades. Els ulls amb lent han aparegut almenys 40 vegades en línies evolutives completament separades: vertebrats, pop, meduses... L\'ala com a estructura de vol ha aparegut quatre vegades (insectes, pterosaures, aus, ratpenats). Això no vol dir que hi hagi un pla: vol dir que, en determinats ambients, certes solucions funcionen tan bé que l\'evolució les "redescobre" una i altra vegada per selecció natural independent.',
      },
      {
        type: 'key-idea',
        text: 'La selecció natural conserva els trets que incrementen la supervivència i la reproducció en un ambient concret. Si l\'ambient canvia, el que era avantatjós pot convertir-se en un desavantatge. Els ulls de les espècies de coves han degenerat perquè veure no aporta res en la foscor. Això no és regredir: és adaptar-se. L\'evolució és un filtre estadístic sense direcció, no una escala de progrés.',
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
    duration: 3,
    areaId: 'relacions',
    blocks: [
      {
        type: 'narrative',
        text: 'El 10 de desembre de 1948, a París, l\'Assemblea General de la ONU va adoptar la Declaració Universal dels Drets Humans a les 3 de la matinada. Quaranta-vuit estats van votar a favor, cap en contra. Vuit es van abstenir: l\'URSS, l\'Àfrica del Sud de l\'apartheid i sis estats del bloc soviètic. La Declaració no és un tractat vinculant — però ha inspirat centenars de lleis i tractats que sí ho són.',
      },
      {
        type: 'narrative',
        text: 'La principal arquitecta de la Declaració va ser Eleanor Roosevelt, vídua del president americà Franklin D. Roosevelt. Tenia 63 anys, no tenia càrrec oficial i no representava cap govern: era delegada privada. Truman la va nomenar perquè creia que seria un paper decoratiu. En canvi, va presidir el comitè de redacció durant tres anys, va navegar les disputes entre el bloc occidental (drets civils i polítics) i el bloc soviètic (drets econòmics i socials) i va aconseguir un text de consens que cap diplomat professional havia pogut cosir.',
      },
      {
        type: 'key-idea',
        text: 'Els drets humans es defineixen com universals (per a tothom, a tot arreu), inalienables (no es poden cedir ni treure) i indivisibles (els drets civils i els econòmics i socials estan interconnectats). Separar-los — acceptar els civils però no els socials — és una posició política, no una necessitat lògica. La Declaració de 1948 no és jurídicament vinculant per si sola, però ha servit de fonament per a centenars de tractats que sí ho són.',
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
        explanation: 'La DUDH és una declaració (no un tractat), de manera que no és jurídicament vinculant per si sola. Però ha servit com a fonament de centenars de tractats vinculants (Pacte de Drets Civils i Polítics, Convenció contra la Tortura, etc.) i és considerada dret internacional consuetudinari.',
      },
    ],
  },
  {
    id: 'mc-big-bang-escala',
    title: 'L\'univers en perspectiva',
    emoji: '🌌',
    duration: 3,
    areaId: 'ciencies',
    blocks: [
      {
        type: 'narrative',
        text: 'Si la Terra fos una moneda d\'un euro, el Sol seria una bola de bàsquet a 250 metres. Plutó estaria a 10 km. L\'estrella més propera (Proxima Centauri) estaria a 65.000 km — una volta i mitja al voltant de la Terra. La Via Làctia, amb 200.000 milions d\'estrelles, tindria el diàmetre de la superfície de la Terra. I la Via Làctia és una galàxia típica d\'un univers que en conté com a mínim 2 bilions.',
      },
      {
        type: 'narrative',
        text: 'Carl Sagan va proposar el Calendari Còsmic: comprimir tota la història de l\'univers (13.800 milions d\'anys) en un any. En aquesta escala, el Big Bang és l\'1 de gener a mitjanit. La Terra no apareix fins al 2 de setembre. Els dinosaures arriben el 26 de desembre. Tots els humans moderns apareixem el 31 de desembre a les 23:52. Tota la història escrita — Egipte, Grècia, Roma, el Renaixement, la Revolució Industrial — succeeix en els últims 10 segons del 31 de desembre.',
      },
      {
        type: 'key-idea',
        text: 'L\'univers observable té un radi de ~46.000 milions d\'anys llum. La llum, a 300.000 km/s, tarda 8 minuts a arribar del Sol; 4,2 anys de Proxima Centauri; 2,5 milions d\'anys de la galàxia d\'Andròmeda. Quan mirem el cel nocturn, estem mirant el passat. L\'estrella que veiem podria haver mort ja fa milions d\'anys.',
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
    title: 'Per què la Revolució Francesa ho va canviar tot',
    emoji: '🗽',
    duration: 3,
    areaId: 'historia',
    blocks: [
      {
        type: 'narrative',
        text: 'El 14 de juliol de 1789, la multitud de París va assaltar la Bastilla, una presó que simbolitzava l\'absolutisme reial. No hi havia gairebé presos: només set. Però el gest ho va canviar tot. En menys de quatre anys, França va abolir la monarquia, executar el rei i la reina, proclamar la República i redactar la Declaració dels Drets de l\'Home i del Ciutadà — el text que va inspirar totes les constitucions liberals modernes.',
      },
      {
        type: 'narrative',
        text: 'El capítol més fosc de la Revolució va ser el Terror (1793-1794): en deu mesos, el Comitè de Salvació Pública dirigit per Robespierre va enviar 17.000 persones a la guillotina i va executar 25.000 més sense judici. El lema de la Revolució — Llibertat, Igualtat, Fraternitat — coexistia amb l\'extermini dels dissidents. Al final, el Terror es va menjar els seus pares: Robespierre mateix va ser guillotinat. La Revolució demostra que les ideologies emancipadores poden derivar en terror quan es creuen en possessió de la veritat absoluta.',
      },
      {
        type: 'key-idea',
        text: 'La Revolució Francesa (1789-1799) va introduir tres conceptes que van redefinir la política moderna: la sobirania popular (el poder emana del poble, no de Déu ni del rei), la separació de poders (executiu, legislatiu, judicial) i els drets individuals com a límit al poder de l\'estat. El seu llegat contradictori — llibertat i terror alhora — és la tensió que estructura la política occidental fins avui.',
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
    duration: 3,
    areaId: 'ciencies',
    blocks: [
      {
        type: 'narrative',
        text: 'Un forat negre no és un forat: és una regió de l\'espai on la gravetat és tan intensa que res — ni la llum — pot escapar. L\'horitzó d\'esdeveniments és el límit invisible: si hi entres, desapareixes del nostre univers per sempre. El forat negre supermasiu al centre de la nostra galàxia, Sgr A*, pesa 4 milions de vegades el Sol. El 2019 vam fer la primera fotografia d\'un forat negre, a la galàxia M87.',
      },
      {
        type: 'narrative',
        text: 'Stephen Hawking va demostrar el 1974 que els forats negres no són eterns: emeten lentament radiació (la radiació de Hawking) i s\'evaporen amb el temps. La raó és quàntica: al voltant de l\'horitzó, parells de partícules i antipartícules apareixen i desapareixen constantment del buit quàntic. Quan un parell apareix just a l\'horitzó, una partícula cau dins i l\'altra escapa. El forat negre perd energia netament. Un forat negre de la massa del Sol tardaria 10⁶⁷ anys a evaporar-se. Un de petit ho faria molt més ràpid — i acabaria en una explosió.',
      },
      {
        type: 'key-idea',
        text: 'L\'horitzó d\'esdeveniments és la frontera sense retorn. Radi de Schwarzschild: r = 2GM/c². Si la Terra es comprimís fins a tenir un radi de 9 mil·límetres, es convertiria en un forat negre. Per a un observador extern, el temps s\'alenteix infinitament a mesura que algú s\'hi acosta; per a qui cau dins, res no sembla anormal fins que és massa tard per tornar.',
      },
      {
        type: 'exercise',
        id: 'mc-forats-q1',
        exerciseType: 'multiple-choice',
        question: 'Què passa amb la llum quan arriba a l\'horitzó d\'esdeveniments d\'un forat negre?',
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
        type: 'narrative',
        text: 'Milgram va explorar les variacions i va descobrir que el context ho canviava tot. Quan l\'autoritat donava les ordres per telèfon en lloc de ser a la mateixa sala, l\'obediència queia al 20%. Quan la víctima estava a la mateixa sala visible, queia al 40%. Quan dos investigadors donaven ordres contradictòries, l\'obediència s\'ensorrà: ningú no va arribar al voltatge màxim. La conclusió era clara: la presència física de l\'autoritat i l\'absència d\'alternative creïbles eren els factors decisius, no la crueltad personal dels participants.',
      },
      {
        type: 'key-idea',
        text: 'L\'experiment de Milgram demostra el poder de l\'autoritat legítima sobre el comportament humà. No era que els participants fossin cruels: la majoria estaven visiblement angoixats. Però la pressió de l\'autoritat ("l\'experiment ha de continuar") era suficient per anular la consciència moral en el 65% dels casos. Milgram va relacionar els resultats amb el problema filosòfic de com gent normal va poder participar en l\'Holocaust.',
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
    duration: 3,
    areaId: 'ciencies',
    blocks: [
      {
        type: 'narrative',
        text: 'Tot el que podem veure — estrelles, galàxies, gas, planetes — representa el 5% de l\'univers. El 27% és matèria fosca: matèria que no emet ni absorbeix llum, però que sabem que existeix perquè la seva gravetat fa girar les galàxies més ràpid del que haurien. I el 68% restant és energia fosca: una força misteriosa que accelera l\'expansió de l\'univers. No sabem què és cap de les dues.',
      },
      {
        type: 'narrative',
        text: 'Per detectar la matèria fosca, els físics han construït detectors en mines a milers de metres de profunditat, allunyats de la radiació còsmica superficial. El detector LUX-ZEPLIN (LZ), a 1.500 metres sota terra a Dakota del Sud, espera que partícules hipotètiques de matèria fosca (WIMPs) xoquin rarament amb àtoms de xenon i emetin un llampec de llum. Fins ara, cap detecció confirmada. O la matèria fosca no interacciona amb la matèria normal d\'aquesta manera, o no existeix tal com la imaginem i caldrà revisar tota la física gravitacional.',
      },
      {
        type: 'key-idea',
        text: 'La matèria fosca és necessària per explicar la rotació de les galàxies: els estels del marge exterior giren tan ràpid que, sense massa extra invisible, haurien de sortir volant. L\'energia fosca s\'infereix de les observacions de supernoves distants: l\'univers no sols s\'expandeix, sinó que s\'accelera. El 95% de l\'univers és desconegut: és la frontera més gran de la física actual.',
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
        explanation: 'Només el 5% de l\'univers és matèria bariònica ordinària (àtoms, molècules, tot el que veiem). El 27% és matèria fosca i el 68% energia fosca. Coneixem les fraccions gràcies al fons còsmic de microones i a observacions de supernoves, però no sabem què és físicament cap de les dues.',
      },
    ],
  },
  {
    id: 'mc-papallona',
    title: 'La papallona que causa l\'huracà',
    emoji: '🦋',
    duration: 3,
    areaId: 'ciencies',
    blocks: [
      {
        type: 'narrative',
        text: 'El 1972, el meteoròleg Edward Lorenz va formular una pregunta provocadora: "El batre d\'ales d\'una papallona al Brasil provoca un tornado a Texas?" No era un argument sobre causes directes, sinó sobre sensibilitat inicial: en sistemes caòtics, diferències ínfimes en les condicions inicials produeixen resultats radicalment diferents. Lorenz ho va descobrir per accident el 1961 quan va arrodonir un número de 0.506127 a 0.506 i el model meteorològic va donar un temps completament diferent.',
      },
      {
        type: 'narrative',
        text: 'El caos no és desordre: té una estructura preciosa. L\'atractor de Lorenz — la representació gràfica de com evoluciona un sistema caòtic en l\'espai — té la forma d\'una papallona de dues ales. Les trajectòries del sistema mai no es repeteixen exactament, però sempre ronden les mateixes regions: el sistema és impredictible a llarg termini però no és aleatori. Aquesta geometria fractal és una de les imatges més icòniques de la física del segle XX, i apareix en meteorologia, biologia, economia i fins en el comportament de la borsa.',
      },
      {
        type: 'key-idea',
        text: 'El caos no vol dir aleatòrietat. Sistemes caòtics segueixen lleis deterministes perfectament definides — però són tan sensibles a les condicions inicials que qualsevol error de mesura (per petit que sigui) fa que les prediccions divergeixin exponencialment. Per això el temps meteorològic és impredictible més de dues setmanes: no per falta de coneixement, sinó per principi matemàtic.',
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
        explanation: 'El caos és determinista: si poguessis conèixer les condicions inicials amb precisió perfecta, podries predir el futur perfectament. El problema és que qualsevol imprecisió de mesura s\'amplifica exponencialment. Això fa les prediccions a llarg termini pràcticament impossibles, no per falta de lleis, sinó per la naturalesa de les equacions.',
      },
    ],
  },
  {
    id: 'mc-relativitat-temps',
    title: 'Per què el temps passa més lent a l\'espai?',
    emoji: '⏳',
    duration: 3,
    areaId: 'ciencies',
    blocks: [
      {
        type: 'narrative',
        text: 'Els rellotges dels satèl·lits GPS van ~38 microsegons més ràpid cada dia que els de la Terra. Sembla insignificant, però sense corregir-ho, el GPS acumularia un error de 10 km al dia. La raó és doble: la relativitat especial (velocitat fa alentir el temps) i la relativitat general (la gravetat més feble a l\'òrbita fa anar el rellotge més ràpid). Tots dos efectes s\'han de compensar de forma constant.',
      },
      {
        type: 'narrative',
        text: 'La paradoxa dels bessons il·lustra l\'efecte de manera extrema. Si un bessó viatja en una nau a prop de la velocitat de la llum durant el que per ell semblen 10 anys, i torna a la Terra, pot descobrir que el seu germà ha envellit 40, 100 o 1.000 anys, depenent de la velocitat. No és una il·lusió ni un efecte psicològic: el bessó viatger ha viscut realment menys temps. Rellotges biològics, físics i atòmics, tots registren la mateixa diferència. El temps no és absolut: cada cos té el seu propi temps.',
      },
      {
        type: 'key-idea',
        text: 'Dilatació temporal: com més ràpid es mou un objecte (relativitat especial) o com més fort és el camp gravitacional (relativitat general), més lentament transcorre el temps per a ell respecte a un observador extern. No és una il·lusió: és física real amb conseqüències tecnològiques mesurables. El GPS és la prova quotidiana que Einstein tenia raó.',
      },
      {
        type: 'exercise',
        id: 'mc-rel-temps-q1',
        exerciseType: 'multiple-choice',
        question: 'Per què els satèl·lits GPS necessiten correcció de relativitat?',
        options: [
          'Perquè a l\'espai no hi ha atmosfera i els senyals van més ràpid',
          'Perquè la velocitat i la gravetat feble fan que els seus rellotges no sincronitzin amb els de terra',
          'Perquè la temperatura a l\'òrbita afecta els circuits electrònics',
          'Perquè la curvatura de la Terra distorsiona els senyals de ràdio',
        ],
        correctIndex: 1,
        explanation: 'La relativitat especial alenteix els rellotges del satèl·lit (van ràpid: ~-7 µs/dia) i la relativitat general els accelera (gravetat feble: ~+45 µs/dia). El resultat net és +38 µs/dia, que s\'ha de compensar algorítmicament per mantenir la precisió del GPS.',
      },
    ],
  },
  {
    id: 'mc-darwinisme-social',
    title: 'Darwin no va dir el que creus',
    emoji: '🦎',
    duration: 3,
    areaId: 'ciencies',
    blocks: [
      {
        type: 'narrative',
        text: '"Supervivència del més fort" — Darwin mai no va escriure aquesta frase. Va ser Herbert Spencer el 1864. Darwin parlava de "supervivència del més adaptat" (fittest), que significa adaptat a l\'entorn específic, no el més gran ni el més violent. Un bacteri que sobreviu a l\'antibiòtic és "el més adaptat" en aquell context. La força física és irrellevant per a la selecció natural en la majoria de casos.',
      },
      {
        type: 'narrative',
        text: 'El "darwinisme social" —aplicar la selecció natural a les societats humanes— va ser usat al segle XIX i XX per justificar el colonialisme (les races "inferiors" estan destinades a ser dominades), l\'eugenèsia (esterilitzar les persones "no aptes") i el laissez-faire econòmic extrem (ajudar els pobres "va contra la naturalesa"). Darwin mateix va criticar aquestes aplicacions: la cooperació i l\'empatia, va escriure, també són trets seleccionats en la nostra espècie, i les societats humanes han sobreviscut gràcies a la solidaritat tant com a la competència.',
      },
      {
        type: 'key-idea',
        text: '"Fittest" en anglès victorià significava "millor ajustat". L\'adaptació pot ser qualsevol tret que incrementa la supervivència i reproducció en un ambient concret: camuflatge, velocitat, cooperació social, resistència a malalties. Extrapolar la selecció natural a l\'organització social humana és una fal·làcia naturalista: que alguna cosa "passi a la natura" no implica que sigui desitjable per als humans.',
      },
      {
        type: 'exercise',
        id: 'mc-darwin-q1',
        exerciseType: 'multiple-choice',
        question: 'Què significa realment "supervivència del més adaptat" en termes evolutius?',
        options: [
          'Que els individus més forts físicament sempre sobreviuen',
          'Que els individus millor ajustats al seu ambient deixaran més descendència',
          'Que les espècies més intel·ligents substitueixen les menys intel·ligents',
          'Que la competència és el motor principal de l\'evolució',
        ],
        correctIndex: 1,
        explanation: '"Adaptat" vol dir ajustat a l\'ambient concret. La cooperació, el camuflatge o la resistència a malalties poden ser tan "adaptatius" com la força. L\'evolució no maximitza cap atribut concret: selecciona el que funciona en el context actual.',
      },
    ],
  },
  {
    id: 'mc-drets-humans-generacions',
    title: 'Hi ha tres tipus de drets humans',
    emoji: '🌍',
    duration: 3,
    areaId: 'relacions',
    blocks: [
      {
        type: 'narrative',
        text: 'Els drets humans s\'han classificat en tres "generacions". La primera: drets civils i polítics (llibertat d\'expressió, dret al vot, prohibició de tortura). La segona: drets econòmics i socials (educació, salut, treball). La tercera: drets col·lectius i de solidaritat (dret al desenvolupament, al medi ambient sa, a la pau). Les dues primeres estan consagrades a pactes internacionals de 1966. La tercera segueix en debat.',
      },
      {
        type: 'narrative',
        text: 'Alguns drets són tan fonamentals que no poden ser suspesos ni en estat de guerra o emergència: s\'anomenen normes de ius cogens o drets no derogables. La prohibició de la tortura, del genocidi, de l\'esclavitud i de les execucions sumàries no admeten excepcions. Els governs no poden dir "és una emergència nacional" per justificar-los. Altres drets sí que admeten restriccions temporals en emergència: el dret de reunió o el dret a la lliure circulació, per exemple, es van restringir legítimament durant la pandèmia de COVID.',
      },
      {
        type: 'key-idea',
        text: 'La divisió en generacions és analítica, no jeràrquica. La Declaració de Viena (1993) va confirmar que tots els drets humans són universals, indivisibles, interdependents i interrelacionats. Un estat no pot dir que respecta la llibertat d\'expressió però ignorar el dret a l\'educació. I els drets no derogables no admeten cap excepció, mai, ni en guerra ni en emergència.',
      },
      {
        type: 'exercise',
        id: 'mc-ddhh-gen-q1',
        exerciseType: 'multiple-choice',
        question: 'Quin d\'aquests és un dret de "primera generació"?',
        options: [
          'El dret a l\'educació',
          'El dret a un medi ambient sa',
          'La prohibició de tortura',
          'El dret al desenvolupament econòmic',
        ],
        correctIndex: 2,
        explanation: 'La prohibició de tortura és un dret civil i polític (1a generació), inclosa a la Declaració Universal i al Pacte Internacional de Drets Civils i Polítics. L\'educació és 2a generació (drets econòmics i socials). El medi ambient i el desenvolupament són 3a generació.',
      },
    ],
  },
  {
    id: 'mc-filosofia-platon',
    title: 'La cova de Plató: per què els humans vivim en l\'engany',
    emoji: '🦉',
    duration: 3,
    areaId: 'pensament',
    blocks: [
      {
        type: 'narrative',
        text: 'Imagina presoners encadenats en una cova des de l\'infància, que només veuen ombres projectades a la paret per fogueres que no poden veure. Per a ells, les ombres són la realitat. Un presoner escapa, veu el sol per primer cop i retorna a la cova per alliberar els altres. Però els presoners, acostumats a les ombres, el consideren boig i es neguen a moure\'s. Plató diu que això és el que li va passar a Sòcrates: va intentar alliberar els atenesos de les seves il·lusions i el van condemnar a mort.',
      },
      {
        type: 'narrative',
        text: 'De la cova, Plató va derivar la seua teoria política més radical: el filòsof-rei. Si els filòsofs han vist la llum — la veritat — i la resta de la gent viu en l\'engany de les ombres, és lògic que siguin els filòsofs els qui governin, no la majoria ignorant. Plató era explícitament antidemocràtic: la democràcia, deia, és el govern dels que no saben. Quan Atenes va condemnar Sòcrates per vot popular, Plató va veure-ho com la prova definitiva que la majoria no pot governar bé.',
      },
      {
        type: 'key-idea',
        text: 'Plató usava la cova per il·lustrar la teoria de les Idees: el món sensible (el que percebem) és com les ombres — una còpia imperfecta de la realitat autèntica (el món de les Idees pures). La filosofia és el procés d\'escapar de la cova: trencar les cadenes de les opinions per arribar al coneixement verdader. El Sol de la cova representa la Idea del Bé: el principi suprem de la realitat.',
      },
      {
        type: 'exercise',
        id: 'mc-platon-q1',
        exerciseType: 'multiple-choice',
        question: 'Què representen els presoners de la cova en l\'al·legoria de Plató?',
        options: [
          'Els filòsofs que busquen la veritat',
          'Les persones que es guien per les opinions i les percepcions sensorials',
          'Els tirans que controlen la societat',
          'Els científics que estudien el món físic',
        ],
        correctIndex: 1,
        explanation: 'Els presoners representen les persones ordinàries que prenen les aparences (opinions, percepcions) per la realitat. La sortida de la cova simbolitza el procés filosòfic d\'ascens cap al coneixement verdader (episteme), que culmina en la visió del Sol: la Idea del Bé.',
      },
    ],
  },
  {
    id: 'mc-keynnes',
    title: 'Per què l\'estat gasta en crisi (i per què funciona)',
    emoji: '🏦',
    duration: 3,
    areaId: 'societat',
    blocks: [
      {
        type: 'narrative',
        text: 'El 1936, en plena Gran Depressió, John Maynard Keynes va publicar la "Teoria General". La seva idea central era radical per a l\'època: quan l\'economia privada col·lapsa i la gent deixa de gastar, l\'estat ha de substituir la demanda privada amb despesa pública, encara que s\'endeugi. Construir carreteres, pagar sous, fins i tot contractar gent per excavar forats i tornar-los a tapiar: el que importa és mantenir l\'activitat econòmica.',
      },
      {
        type: 'narrative',
        text: 'La crisi de 2008 va ser el gran test modern entre keynesianisme i austeritat. Obama va aprovar un estímul de 787.000 milions de dòlars als EUA: la recessió va ser severa però breu. El Regne Unit va fer el mateix inicialment. En canvi, Grècia i Espanya van ser forçades per la UE a aplicar austeritat severa: retallades en sanitat, pensions i salaris públics. El resultat va ser una recessió que es va duplicar i una dècada perduda. El FMI va admetre posteriorment que va subestimar el multiplicador keynesià i que l\'austeritat havia fet més mal del previst.',
      },
      {
        type: 'key-idea',
        text: 'L\'efecte multiplicador keynesià: cada euro gastat per l\'estat genera més d\'un euro d\'activitat econòmica, perquè el treballador que el rep el gasta, i aquell comerciant el reinverteix, etc. El multiplicador pot ser >1 en recessions profundes, quan els recursos estan ociosos. Per contra, retallar la despesa pública en crisi (austeritat) pot aprofundir la recessió: és la fallida de l\'analogia entre l\'economia familiar i l\'economia nacional.',
      },
      {
        type: 'exercise',
        id: 'mc-keynes-q1',
        exerciseType: 'multiple-choice',
        question: 'Què proposa Keynes durant una recessió econòmica greu?',
        options: [
          'Reduir la despesa pública per equilibrar el pressupost',
          'Augmentar els impostos per finançar el deute',
          'Que l\'estat augmenti la despesa per compensar la caiguda de la demanda privada',
          'Deixar que el mercat es corregeixi per si sol sense intervenció',
        ],
        correctIndex: 2,
        explanation: 'Keynes argumentava que en una recessió, l\'economia pot quedar atrapada en un equilibri de baixa activitat si l\'estat no intervé. La despesa pública funciona com a "estabilitzador automàtic" que manté l\'activitat fins que la confiança privada es recupera.',
      },
    ],
  },
  {
    id: 'mc-music-beethoven',
    title: 'Beethoven va compondre sord',
    emoji: '🎼',
    duration: 3,
    areaId: 'arts',
    blocks: [
      {
        type: 'narrative',
        text: 'Als 26 anys, Ludwig van Beethoven va notar els primers símptomes de sordesa. Als 44, era completament sord. Tot i això, va compondre algunes de les seves obres més revolucionàries en aquest estat: la 5a Simfonia, la 9a (l\'Oda a l\'Alegria) i els seus últims quartets de corda. Als assajos, posava el cap al piano per sentir les vibracions. Era capaç d\'imaginar el so sense sentir-lo.',
      },
      {
        type: 'narrative',
        text: 'El 1802, quan Beethoven tenia 32 anys i acabava de comprendre que la sordesa seria irreversible, va escriure una carta al seus dos germans que mai no va enviar: el Testament de Heiligenstadt. Hi escrivia que havia pensat en el suïcidi, però que havia decidit continuar vivint per a la música. "Sols la virtut i l\'art em van retenir", escrivia. Va guardar la carta fins a la mort: la van trobar al calaix. La 9a Simfonia, estrenada el 1824, és en part la resposta musical a aquell moment de crisi.',
      },
      {
        type: 'key-idea',
        text: 'La 9a Simfonia, estrenada el 1824, va ser la primera simfonia de la història a incorporar cors i solistes vocals en el seu moviment final. El dia de l\'estrena, Beethoven estava completament sord i va estar d\'esquena al públic dirigint els moviments (un director de veritat dirigia darrera seu). Un solista va haver de girar-lo per veure l\'ovació. Ningú no se l\'havia dit: no podia sentir els aplaudiments.',
      },
      {
        type: 'exercise',
        id: 'mc-beethoven-q1',
        exerciseType: 'multiple-choice',
        question: 'Quina va ser la primera simfonia de la història a incloure cors i solistes en el moviment final?',
        options: [
          'La 5a Simfonia de Beethoven',
          'La 9a Simfonia de Beethoven',
          'La 40a Simfonia de Mozart',
          'La Simfonia dels Adéus de Haydn',
        ],
        correctIndex: 1,
        explanation: 'La 9a Simfonia de Beethoven (1824), amb l\'Oda a l\'Alegria al 4t moviment, va ser la primera a integrar veus humanes en una estructura simfònica. Va obrir una nova era en la composició orquestral i va influir directament en Wagner, Brahms i tots els compositors posteriors.',
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
