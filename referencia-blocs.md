# Referència de Blocs — Acadèmia Còsmica

> Document per generar contingut JSON per a l'app. Conté el format exacte de cada tipus de bloc disponible. No cal saber programació — només cal seguir els formats.

---

## Com s'estructura un mòdul

```json
{
  "id": "module-XX-nom",
  "title": "Títol del mòdul",
  "emoji": "🎯",
  "phase": 1,
  "unlockRequires": null,
  "itineraries": [
    {
      "id": "nom-itinerari",
      "title": "Títol de l'itinerari",
      "icon": "🔍",
      "description": "Descripció breu per al mapa de missions",
      "style": "Conceptual · del simple al profund",
      "lessons": [ ...lliçons... ]
    }
  ]
}
```

**Notes:**
- Un mòdul pot tenir 1 o 2 itineraris
- Cada itinerari té entre 5 i 7 lliçons (recomanat: 6)
- Si el mòdul no té itineraris, usa `"lessons": [...]` directament en lloc de `"itineraries"`

---

## Com s'estructura una lliçó

```json
{
  "id": "prefix-01",
  "title": "Títol de la lliçó",
  "blocks": [ ...blocs... ]
}
```

**Estructura típica d'una lliçó:**
`narrative` → `key-idea` → `expandable` → `prediction` → `exercise` → `scientific-mode`

No cal seguir aquest ordre — combina els blocs com tingui més sentit pedagògic.

---

## Els 19 tipus de blocs

---

### 1. `narrative`
Text narratiu d'introducció. Posa el context o la pregunta que motiva la lliçó.

```json
{
  "type": "narrative",
  "text": "Quan Paul Dirac va combinar la mecànica quàntica amb la relativitat el 1928, les seves equacions tenien dues solucions..."
}
```

---

### 2. `key-idea`
La idea central de la lliçó, destacada visualment.

```json
{
  "type": "key-idea",
  "text": "El camp de Higgs és un camp que permea tot l'univers. Les partícules que hi interaccionen adquireixen massa."
}
```

---

### 3. `expandable`
Caixa plegable per aprofundir. L'usuari l'obre si vol. Dona XP en obrir-la.

```json
{
  "type": "expandable",
  "label": "Per qué el gel flota si gairebé tots els sòlids s'enfonsen?",
  "content": "Quan l'aigua es congela, les molècules s'organitzen en una xarxa hexagonal que ocupa més espai..."
}
```

---

### 4. `prediction`
Pregunta reflexiva que l'usuari ha de pensar ABANS de rebre l'explicació. Activa la curiositat.

```json
{
  "type": "prediction",
  "question": "Si les òrbites dels planetes fossin perfectament circulars, qué passaria amb les estacions de l'any?",
  "hint": "Pensa en com canvia la distància Terra-Sol al llarg de l'any."
}
```

- `hint` és opcional

---

### 5. `exercise` — múltiple opció
Exercici amb una resposta correcta entre quatre opcions. Sempre segueix el sistema de confiança.

```json
{
  "type": "exercise",
  "id": "ex-XX-01",
  "style": "multiple-choice",
  "question": "Quin va ser el principal avantatge del model heliocèntric de Copèrnic?",
  "options": [
    "Era més precís per predir posicions planetàries",
    "Explicava el moviment retrògrad de forma natural i simple",
    "L'Església el va aprovar immediatament",
    "Usava millors telescopis"
  ],
  "correct": 1,
  "feedbackCorrect": "Exacte. El moviment retrògrad sorgeix naturalment quan la Terra adelanta Mart...",
  "feedbackWrong": "El model de Copèrnic era menys precís que Ptolemeu, no més. El seu valor era l'elegància conceptual..."
}
```

- `correct` és l'índex de l'opció correcta (0, 1, 2 o 3)
- `feedbackCorrect` i `feedbackWrong` han de ser explicatius, no sols "correcte/incorrecte"

---

### 6. `exercise` — vertader o fals

```json
{
  "type": "exercise",
  "id": "ex-XX-02",
  "style": "true-false",
  "question": "L'alumini no s'oxida, per això s'usa en avions i llaunes.",
  "correct": false,
  "feedbackCorrect": "Fals. L'alumini s'oxida constantment i molt ràpidament...",
  "feedbackWrong": "L'alumini s'oxida — i molt ràpidament. La diferència clau és el tipus d'òxid que forma..."
}
```

- `correct` és `true` o `false`

---

### 7. `exercise` — detectar error

```json
{
  "type": "exercise",
  "id": "ex-XX-03",
  "style": "detect-error",
  "statement": "Copèrnic va revolucionar l'astronomia perquè el seu model era immediatament més precís que tots els anteriors.",
  "isCorrect": false,
  "feedbackExplanation": "L'error és 'immediatament més precís'. El model de Copèrnic inicialment era menys precís..."
}
```

- `isCorrect` indica si l'afirmació és correcta o incorrecta
- `feedbackExplanation` s'usa per a tots dos casos (correcte i incorrecte)

---

### 8. `scientific-mode`
Hipòtesi sense resposta immediata. El feedback apareix al final de la lliçó. El botó "continuar" queda bloquejat fins que l'usuari confirmi.

```json
{
  "type": "scientific-mode",
  "id": "sci-XX-01",
  "question": "Si dos models expliquen els mateixos fenòmens però un és més simple i l'altre és més precís, quin hauria de preferir un científic?",
  "options": [
    "Sempre el més simple — la simplicitat és el criteri clau",
    "Sempre el més precís — la precisió és el criteri clau",
    "Depèn del context: per explorar idees, simplicitat; per fer prediccions, precisió"
  ],
  "correct": 2,
  "explanation": "La ciència no té un criteri únic. La navalla d'Occam (preferir el simple) és una guia, no una llei..."
}
```

- `explanation` és el text que apareix al `DeferredFeedbackPanel` al final de la lliçó
- La resposta "correcta" sol ser la més matisada, no la més simple

---

### 9. `timeline`
Línia del temps visual amb esdeveniments ordenats.

```json
{
  "type": "timeline",
  "events": [
    {
      "year": "1543",
      "title": "Copèrnic publica el model heliocèntric",
      "text": "Mor el mateix any. El model triga 150 anys a ser acceptat."
    },
    {
      "year": "1609",
      "title": "Kepler: les òrbites són el·lipses",
      "text": "Les tres lleis del moviment planetari."
    }
  ]
}
```

- `text` és opcional — es pot deixar sense descripció si el títol és prou clar

---

### 10. `quote`
Cita amb autor.

```json
{
  "type": "quote",
  "text": "No formulo hipòtesis. Tot el que no es dedueix dels fenòmens és una hipòtesi.",
  "author": "Isaac Newton"
}
```

---

### 11. `debate`
Dues postures enfrontades. L'usuari tria quin argument troba més sòlid — o pot dir que cap el convenç. No hi ha resposta "correcta".

```json
{
  "type": "debate",
  "question": "S'haurien de jutjar penalment els responsables de crims de guerra, o oferir amnistia a canvi de veritat?",
  "positionA": {
    "label": "Judici penal",
    "argument": "La justícia exigeix responsabilitat. Sense penes clares, els perpetradors queden impunes i es transmet el missatge que els crims de guerra no tenen conseqüències."
  },
  "positionB": {
    "label": "Amnistia per veritat",
    "argument": "Si els responsables saben que seran jutjats, no col·laboren. Sense col·laboració no hi ha veritat completa ni desmobilització."
  },
  "reflection": "Quin pes has donat a les víctimes presents vs. les víctimes futures potencials?",
  "context": "No hi ha resposta universal. Sud-àfrica va optar per la Comissió de Veritat i Reconciliació. El Tribunal Penal Internacional jutja sense amnistia. Colòmbia va crear un sistema híbrid."
}
```

- `reflection` i `context` són opcionals

---

### 12. `reflection`
Pregunta oberta sense resposta correcta. L'usuari pot escriure o simplement continuar. Sense XP — és per pensar.

```json
{
  "type": "reflection",
  "question": "Pensa en un conflicte proper — laboral, familiar, social. Si hagués desaparegut sense ser abordat, hauria millorat la situació o empitjorat?",
  "prompt": "Pren un moment abans de continuar. No cal que escriguis res."
}
```

- `prompt` és opcional

---

### 13. `connection`
Connexió explícita amb un altre mòdul. Reforça que els coneixements estan relacionats.

```json
{
  "type": "connection",
  "moduleRef": "Filosofia de la Ciència",
  "moduleEmoji": "🔬",
  "concept": "La teoria del flogist",
  "text": "Recorda el que vam veure sobre com els científics resisteixen les noves idees. La teoria del flogist és exactament el mateix patró: una teoria consistent internament que afegia hipòtesis ad hoc per resistir la refutació."
}
```

- `concept` és opcional

---

### 14. `comparison`
Taula visual que compara dos conceptes, teories o casos.

```json
{
  "type": "comparison",
  "title": "Model geocèntric vs. heliocèntric",
  "labelA": "Ptolemeu (geocèntric)",
  "labelB": "Copèrnic (heliocèntric)",
  "items": [
    {
      "label": "Centre",
      "a": "La Terra",
      "b": "El Sol"
    },
    {
      "label": "Moviment retrògrad",
      "a": "Epicicles complexos",
      "b": "Geometria natural"
    },
    {
      "label": "Precisió",
      "a": "Alta (Ptolemeu)",
      "b": "Menor inicialment"
    },
    {
      "label": "Elegància",
      "a": "Baixa",
      "b": "Alta"
    }
  ]
}
```

---

### 15. `misconception`
Ataca un error conceptual comú de forma expositiva. Estructura: creença errònia → realitat.

```json
{
  "type": "misconception",
  "belief": "La radioactivitat és un fenomen artificial creat per humans en reactors nuclears.",
  "reality": "La radioactivitat és completament natural. L'urani, el radi i el tori han estat radioactius des de la formació de la Terra fa 4.500 milions d'anys. Becquerel la va descobrir el 1896 en minerals naturals.",
  "why": "Perquè l'exposició mediàtica a la radioactivitat sempre és en context de centrals nuclears o accidents, mai en context natural."
}
```

- `why` és opcional

---

### 16. `perspective`
El mateix fet o situació explicat des del punt de vista de 2-4 actors diferents. L'usuari commuta entre les perspectives clicant les pestanyes. No hi ha resposta correcta: l'objectiu és el multiperspectivisme.

**Idoni per a:** historia, biografies, conflictes, situacions amb múltiples actors.

```json
{
  "type": "perspective",
  "situation": "La caiguda de Cartago, 146 aC",
  "perspectives": [
    {
      "role": "Senador romà",
      "emoji": "⚔️",
      "text": "Cartago ha estat destruïda. Tres guerres púniques en un segle han acabat. Roma pot dormir tranquil·la. La seva prosperitat mercantil era una amenaça permanent per als interessos comercials romans."
    },
    {
      "role": "Ciutadà cartaginès",
      "emoji": "🔥",
      "text": "La meva ciutat brûla. Tres-cents mil habitants esclaus o morts. Una civilització de cinc segles esborrada en dies. El vencedor escriu la historia: nosaltres serem els 'bàrbars'."
    },
    {
      "role": "Mercader grec",
      "emoji": "⚓",
      "text": "L'equilibri de poder mediterrani ha canviat per sempre. Cartago freava l'expansió romana. Ara res no pot aturar Roma. Haurem d'adaptar-nos o morir com Cartago."
    }
  ],
  "reflection": "Quin punt de vista et costa més comprendre — i per què creus que és així?"
}
```

- `reflection` és opcional però molt recomanat
- Entre 2 i 4 perspectives (màxim recomanat: 3)

---

### 17. `what-would-you-do`
L'usuari es posa a la pell d'un personatge **abans** de saber el que va passar. Tria una opció, la confirma, i llavors es revela el que va succeir realment amb l'anàlisi de les conseqüències.

**Idoni per a:** biografies, dilemes morals històrics, decisions de lideratge, moments de crisi.

```json
{
  "type": "what-would-you-do",
  "character": "Winston Churchill",
  "emoji": "🎩",
  "year": "26 de maig de 1940",
  "setup": "Ets el Primer Ministre del Regne Unit fa dotze dies. Bèlgica acaba de capitular. 330.000 soldats britànics estan encerclats a Dunkerque. França col·lapsarà en setmanes. El teu gabinet de guerra et proposa explorar condicions de pau amb Hitler a través de Mussolini.",
  "dilemma": "Acceptes negociar — potser salves l'exèrcit i evites la destrucció del país — o continues la guerra amb unes possibilitats de victòria que molts consideren inexistents?",
  "options": [
    { "id": "A", "text": "Nego la pau: salvo vides, evito la destrucció i potser aconsegueixo condicions acceptables" },
    { "id": "B", "text": "Continue la guerra malgrat tot, sabent que el cost serà enorme i la victòria incerta" }
  ],
  "reveal": "Churchill va optar per continuar la guerra. En una reunió decisiva el 28 de maig, va sortir de la sala del gabinet i es va adreçar directament als ministres perifèrics — no al gabinet formal — per presentar-los la situació. La seva recepció entusiasta va donar a Churchill la cobertura política per resistir Halifax i Chamberlain.",
  "analysis": "La decisió no era òbvia. Lord Halifax, Secretari d'Estat, advocava seriosament per la negociació i no era un covard ni un traïdor. Les probabilitats de supervivència britànica eren objectivament baixes. El que Churchill va calcular — correctament — és que qualsevol negociació amb Hitler des d'una posició de feblesa portaria a condicions que convertirien el Regne Unit en un estat vassall."
}
```

- `year` és opcional però molt recomanable — situa l'usuari en el moment
- `analysis` és opcional però aporta el valor pedagògic central

---

### 18. `before-after`
Contrast visual entre l'estat d'una situació o context **abans** i **després** d'un personatge, esdeveniment o idea. Ideal per mostrar canvis estructurals de forma ràpida i clara.

**Idoni per a:** impacte d'un personatge o revolució, canvis de paradigma, comparació d'èpoques.

```json
{
  "type": "before-after",
  "title": "Europa abans i després de Bismarck",
  "before": {
    "label": "Abans (1860)",
    "points": [
      "39 estats alemanys fragmentats (Confederació Germànica)",
      "Prússia i Àustria rivals pel lideratge alemany",
      "França, potència dominant del continent",
      "Alemanya: expressió geogràfica, no estat"
    ]
  },
  "after": {
    "label": "Després (1871)",
    "points": [
      "II Reich: estat alemany unificat de 41 milions d'habitants",
      "Àustria exclosa — Prússia lidera sense competidor",
      "França humiliada, perd Alsàcia-Lorena, paga 5.000 milions de francs",
      "Alemanya: nova potència dominant d'Europa"
    ]
  },
  "insight": "El canvi no va ser gradual: Bismarck va planificar tres guerres en 7 anys (Dinamarca 1864, Àustria 1866, França 1870-71) per aconseguir el mateix resultat que un segle de diplomàcia no havia aconseguit."
}
```

- `insight` és opcional però dona el punt de reflexió clau
- Els `points` han de ser concrets i comparables entre les dues columnes

---

### 19. `primary-source`
Fragment d'una font primària real (carta, discurs, text filosòfic, llei, manifest) amb preguntes guiades. Força la lectura directa del document original.

**Idoni per a:** biografies, historia, filosofia, textos fundacionals.

```json
{
  "type": "primary-source",
  "label": "Discurs de Churchill al Parlament, 13 de maig de 1940",
  "source": "Winston Churchill, primera intervenció com a Primer Ministre a la Cambra dels Comuns",
  "text": "\"No tinc res a oferir sinó sang, esforç, llàgrimes i suor. Tenim davant nostre una prova de la mena més greu. Tenim davant nostre molts llargs mesos de lluita i sofriment. Ens pregunteu: quina és la nostra política? Respondré: fer la guerra, per mar, per terra i per aire, amb tota la força que Déu ens pugui donar.\"",
  "questions": [
    "Quin efecte pretén aconseguir Churchill en mencionar explícitament la sang, les llàgrimes i el sofriment — en lloc d'amagar-ho?",
    "A qui s'adreça Churchill realment: als diputats presents, o a algú altre?",
    "Com canviaria el discurs si Churchill hagués dit el contrari: 'Tenim un pla clar i la victòria és segura'?"
  ]
}
```

- `questions` és una llista — entre 2 i 4 preguntes
- `label` i `source` poden ser el mateix o diferent
- El `text` pot ser tan llarg com calgui — el bloc el gestiona

---

### 20. `analogy`
Pont explícit entre un concepte difícil i alguna cosa familiar. La comparació és el contingut central, no un exemple dins d'una explicació.

**Idoni per a:** conceptes filosòfics abstractes, estratègies polítiques, teories econòmiques, qualsevol cosa que resulti contraintuïtiva.

```json
{
  "type": "analogy",
  "concept": "La realpolitik de Bismarck",
  "emoji": "♟️",
  "analogy": "La realpolitik és com jugar al pòquer professional: no importa si tens les cartes millors, sinó si el rival creu que les tens. Bismarck va amenaçar Àustria sabent que no podia guanyar una guerra llarga, va aliar-se amb Napoleó III sabent que el traïria, i va crear aliances que es contradien entre si — tot al servei d'un objectiu fix: la unificació prussiana d'Alemanya.",
  "bridge": "Per això la realpolitik desconcerta tant als que pensen en política en termes de valors (bo/dolent, just/injust, lleial/traïdor). Bismarck jugava en un altre tauler: el de les correlacions de forces, no el de la moralitat. I en aquell tauler, era gairebé imbatible."
}
```

- `emoji` és opcional però ajuda a identificar el concepte ràpidament
- `bridge` explica per què l'analogia ajuda — és el salt metacognitiu

---

## Recomanacions per crear bon contingut

**Sobre els exercicis:**
- Les opcions incorrectes han de ser plausibles — no òbviament absurdes
- El `feedbackWrong` ha de ser tan informatiu com el `feedbackCorrect`
- Evita preguntes on la resposta és obvia per eliminació

**Sobre els modes científics:**
- La resposta "correcta" sol ser la opció C (la més matisada)
- L'`explanation` ha de ser llarga i rica — és el moment pedagògic central
- Planteja dilemes reals, no qüestions amb resposta evident

**Sobre els expandables:**
- Han d'aportar profunditat real, no repetir el `key-idea`
- Anècdotes historials, casos concrets, paradoxes — funcionen molt bé
- L'usuari ha de sentir que val la pena obrir-los

**Sobre el debat:**
- Les dues postures han de ser defensables — cap ha de semblar clarament incorrecta
- El `context` final ha de donar perspectiva sense imposar una resposta

**Sobre els blocs nous (perspectives, what-would-you-do, before-after, primary-source, analogy):**
- `perspective` necessita mínim 2 perspectives i màxim 4. Cada una ha de tenir veu pròpia — no variants de la mateixa opinió
- `what-would-you-do` funciona millor quan la decisió real del personatge va sorprendre — si tothom hauria fet el mateix, no té gràcia
- `before-after` és molt visualment efectiu: intenta que els punts dels dos costats siguin paral·lels (mateix àmbit, comparables)
- `primary-source` ha de ser text real, no parafrasejat. Les preguntes han de portar a interpretar, no a resumir
- `analogy` ha d'explicar **per què** l'analogia funciona, no només presentar-la. El camp `bridge` és clau

**Estructura pedagògica recomanada per lliçó:**
1. `narrative` — enganxa l'atenció amb una pregunta o situació
2. `key-idea` — la idea central clara i concisa
3. `expandable` — profunditat per qui vol
4. `prediction` o `misconception` — activa el pensament previ
5. `exercise` × 1-2 — valida la comprensió
6. `scientific-mode` o `debate` — aprofundeix el raonament

**Estructura recomanada per a lliçons de biografia:**
1. `quote` — una cita del personatge per entrar en la seva veu
2. `narrative` — context vital o moment clau
3. `what-would-you-do` — la decisió central de la seva vida
4. `before-after` — l'impacte del personatge al món
5. `misconception` — el mite popular vs. la persona real
6. `scientific-mode` — llegat: hèroe, monstre, o ningú dels dos?

**Estructura recomanada per a lliçons de filosofia:**
1. `narrative` — el problema quotidià que porta al concepte
2. `analogy` — el pont cap al concepte abstracte
3. `key-idea` — la definició precisa
4. `debate` o `perspective` — les posicions en tensió
5. `reflection` — aplicació personal
6. `scientific-mode` — fins on arribes amb la teoria

---

## IDs — convenció de noms

- Mòdul: `module-08-nom` (segueix la numeració)
- Lliçó: `prefix-01`, `prefix-02`... (prefix = 2-4 lletres del tema)
- Exercici: `ex-prefix-01-01` (mòdul-lliçó-número)
- Mode científic: `sci-prefix-01-01`
