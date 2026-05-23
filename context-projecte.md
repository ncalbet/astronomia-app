# Context del Projecte — Acadèmia Còsmica

> Document de referència per a Claude. Llegeix-lo sencer abans de respondre qualsevol pregunta sobre el projecte.

---

## Què és aquest projecte

Una **plataforma d'aprenentatge profund** mobile-first (PWA) que permet aprendre qualsevol matèria amb una metodologia pedagògica sòlida. No és una app de divulgació superficial — és un motor d'aprenentatge que entrena el pensament crític, no la memorització.

**Visió a llarg termini:** una plataforma universal on qualsevol tema (des d'astrofísica a filosofia, finances, música o biologia) es pot aprendre amb la mateixa arquitectura i metodologia. Canviar de tema = canviar el contingut JSON. El motor és sempre el mateix.

**Fil conductor pedagògic:** curiositat → explicació → predicció → exercici → confiança → feedback narratiu → recompensa

**Públic objectiu:** adults de 25-55 anys amb estudis universitaris que volen formació contínua fora del sistema formal. Lifelong learning.

**App en producció:** https://astronomia-app.vercel.app/

**Principi tecnològic:** cap crida a cap API externa ni servei de tercers. Tot és local: JSON estàtics, localStorage, Web Audio API i Canvas API del navegador.

---

## Stack tecnològic

| Peça | Eina |
|---|---|
| Framework | React + Vite |
| Navegació | React Router v6 |
| Estils | CSS Modules |
| PWA | vite-plugin-pwa |
| Contingut | JSON estàtic per mòdul |
| Persistència | localStorage via storageProvider |
| So | Web Audio API (síntesi en temps real, sense fitxers) |
| Certificats | Canvas API (generació local, sense dependències) |
| Hosting | Vercel (gratuït) |
| Codi | GitHub |

---

## Estructura de fitxers

```
src/
  components/
    blocks/           → Blocs de contingut reutilitzables
                        (ConnectionBlock, ImageBlock, DebateBlock, etc.)
    exercises/        → Exercicis interactius (ExerciseBlock, ScientificModeBlock,
                        ConfidenceSelector, DeferredFeedbackPanel)
    simulations/      → Simulacions (RetrogradeSim)
    ui/               → Components UI globals (BadgeToast, PageTransition,
                        WeeklySummary, LessonReinforcementPanel, MicroRevealPanel)
  context/
    AppContext.jsx    → Estat global de l'usuari (spread de useProgress + navigationState)
    ThemeContext.jsx  → Tema actiu (colors, textos, narrativa)
  data/
    modules/          → Un JSON per mòdul ← AQUÍ S'AFEGEIX CONTINGUT (93 mòduls)
    moduleRegistry.js → Registre + cache + glossaryTerms + getModuleForTerm()
    areaRegistry.js   → 6 àrees de coneixement, cadascuna amb temes i mòduls assignats
    learningPaths.js  → 10 itineraris d'aprenentatge curats
    microcapsules.js  → 22 micro-càpsules de 3 min amb getDailyCapsule()
    glossary.js       → 45+ termes clau amb links automàtics als mòduls
  engine/
    xpEngine.js              → Càlcul d'XP i nivells
    badgeEngine.js           → 11 insígnies i lògica de desbloqueig per events
    unlockEngine.js          → Desbloqueig de mòduls (ara tots oberts)
    spacedRepetitionEngine.js → Algorisme SM-2 per a revisió espaçada
    readingTimeEngine.js     → Estimació de minuts de lectura per lliçó
    weeklyChallenge.js       → Pool de 13 reptes; tria 3 cada setmana determinísticament
    soundEngine.js           → So de celebració sintetitzat (Web Audio API, sense fitxers)
    certificateEngine.js     → Genera certificat PNG via Canvas API (sense dependències)
  hooks/
    useProgress.js        → Estat persistent complet de l'usuari
    useModuleProgress.js  → Progrés per mòdul (per al mapa)
    useFirstTime.js       → Detecta si és la primera vegada que s'obre l'app
  screens/
    Welcome.jsx            → Benvinguda + quiz de perfil (3 preguntes) + recomanació d'itinerari
    Home.jsx               → Pantalla principal: reptes setmanals, favorits, càpsula del dia
    AreaSelector.jsx       → Selecció d'àrea de coneixement
    ModuleMap.jsx          → Mapa de mòduls amb filtre (tot/pendent/fet), ordre i cerca
    ItinerarySelector.jsx  → Selecció d'itinerari quan un mòdul en té més d'un
    Lesson.jsx             → Renderitzador dinàmic de lliçons per blocs
    Results.jsx            → Resultats al completar mòdul (confetti + so de celebració)
    ReviewSession.jsx      → Sessió de repàs amb spaced repetition
    LearningPathDetail.jsx → Detall i progrés d'un itinerari; certificat modal amb confetti
    MicroCapsulePlayer.jsx → Reproductor de micro-càpsules de 3 min
    CapsuleBrowser.jsx     → Catàleg de totes les micro-càpsules
    GlobalSearch.jsx       → Cerca global (mòduls, itineraris, càpsules)
    Stats.jsx              → Estadístiques d'aprenentatge + botó compartir (Web Share API)
    Glossary.jsx           → Glossari amb cerca, filtres i links automàtics als mòduls
    Profile.jsx            → Perfil d'aprenentatge editable (temps, nivell, àmbit)
  storage/
    storageProvider.js  → Capa d'abstracció sobre localStorage
    dataVersion.js      → Control de versió de dades (DATA_VERSION actual: 5)
  themes/
    astronomy.json    → Tema astronomia (colors blaus, rol "Recluta")
    philosophy.json   → Tema filosofia (colors violetes, rol "Aprenent")
    themeRegistry.js  → Registre de temes disponibles
  styles/
    variables.css     → Design system complet
    global.css        → Estils base
```

---

## Sistema de temes

Cada matèria pot tenir el seu propi tema visual i narratiu sense tocar cap codi.

Un tema defineix:
- Nom de l'app, descripció, rol de l'usuari
- Paraula per "missió" (Missió, Dilema, Repte...)
- Nom del mode reflexiu ("Mode Científic", "Mode Socràtic"...)
- Paleta de colors (accent, fons, superfície, border)
- Títols de nivell (Recluta → Mestre de l'Univers)
- Slides de benvinguda
- Textos de feedback narratiu

Per canviar de tema: `storage.set('activeTheme', 'philosophy')`

---

## Sistema de mòduls

### Afegir un mòdul nou — 6 passos

1. Crear `src/data/modules/module-XX-nom.json`
2. Afegir entrada a `src/data/moduleRegistry.js` — incloure el camp opcional `glossaryTerms: ['g-terme-id', ...]` amb els ids dels termes del glossari que el mòdul cobreix en profunditat (veure secció Glossari)
3. Afegir meta (títol, emoji) a `src/screens/ModuleMap.jsx` (constants `MODULE_META` i `MODULE_XP`)
4. Afegir l'id al topic corresponent a `src/data/areaRegistry.js`
5. Afegir l'id a `unlockedModules` al `DEFAULT_STATE` de `src/hooks/useProgress.js`
6. Incrementar `DATA_VERSION` a `src/storage/dataVersion.js`

### Mòduls amb itineraris

Si un mòdul té el camp `"itineraries"` (array), l'app mostra automàticament la pantalla de selecció d'itinerari (`ItinerarySelector`). Si no, va directament a la lliçó.

Cada itinerari pot tenir el camp opcional `"forWho"`: una frase curta en tercera persona que descriu el perfil de lector. Ajuda l'usuari a escollir quan un mòdul té dos itineraris.

---

## Mòduls existents

93 mòduls distribuïts en 6 àrees i múltiples temes. Els 7 mòduls originals (ordres 1-7) estan completament desenvolupats amb lliçons i exercicis. Els mòduls d'ordre 8-93 estan integrats a la navegació però el seu contingut JSON s'expandeix progressivament.

| Àrea | Temes | Mòduls representatius |
|---|---|---|
| Astronomia i Cosmologia | Astronomia, Cosmologia, Astrofísica | Copèrnic, Història Astronomia, Forats Negres, Matèria Fosca, Orígens |
| Ciències Naturals | Física, Química, Biologia i Natura | Partícules, Química, Cos Humà, Ecologia |
| Pensament i Filosofia | Filosofia, Ment i Comportament | Fil. Ciència, Trauma, Obediència, La Ment Enganya |
| Història i Societat | Història, Economia | Història Astronomia, Pau i Conflicte |
| Natura i Medi Ambient | Ornitologia | Ornitologia |
| Relacions Internacionals | Diplomàcia | Diplomàcia, Organismes Internacionals |

---

## Protocol de versions de dades

**DATA_VERSION actual: 5**

Incrementar `DATA_VERSION` a `src/storage/dataVersion.js` quan:
- S'afegeix un mòdul nou (cal afegir-lo a `unlockedModules`)
- S'afegeix un camp nou al `DEFAULT_STATE` de `useProgress.js`
- Es canvia l'estructura de com es guarda el progrés

**No cal incrementar** quan:
- Es corregeix un bug visual o de codi
- Es canvia el contingut d'un JSON de mòdul
- S'afegeix un component nou sense afectar l'estat

Quan l'usuari obre l'app amb una versió antiga, es fa reset automàtic del progrés.

---

## Sistema de progrés i estat persistent

Tot l'estat de l'usuari viu a `useProgress.js` via `DEFAULT_STATE`. Es desa a localStorage a través de `storageProvider`.

### Camps del DEFAULT_STATE

```js
// XP i nivells
xp: 0
completedModules: []        // ids dels mòduls completats
srCards: {}                 // targetes de spaced repetition (SM-2)
srStreak: 0                 // dies consecutius de revisió
srStreakMax: 0              // màxim streak assolit
badges: []                  // ids de les insígnies obtingudes

// Perfil d'aprenentatge (quiz onboarding, editable a /profile)
userProfile: null           // { sessionTime: '5'|'15'|'30', level: 'new'|'some'|'experienced', interest: 'ciencies'|'historia'|'pensament'|'societat' }

// Favorits
favorites: []               // ids de paths i càpsules marcats com a favorit (array unificat)

// Micro-càpsules
completedCapsules: []       // ids de les càpsules completades

// Tracking setmanal
weekStart: null             // data ISO del dilluns de la setmana actual
weekXP: 0                   // XP guanyat aquesta setmana
weekModules: 0              // mòduls completats aquesta setmana
weekReviews: 0              // sessions de repàs aquesta setmana
weekSummaryShown: true      // false = cal mostrar el resum de la setmana passada
prevWeekSnapshot: null      // { xp, modules, reviews, weekStart } de la setmana passada
```

### Accions exposades via AppContext

```js
addXP(amount)               // afegeix XP + incrementa weekXP
completeModule(id)          // marca mòdul com a completat + incrementa weekModules
toggleFavorite(id)          // afegeix/elimina de favorites
completeCapsule(id)         // afegeix a completedCapsules
updateSrStreak(n)           // actualitza streak + incrementa weekReviews + actualitza srStreakMax
initWeekIfNeeded()          // comprova si ha canviat la setmana; si és així, rollover automàtic
markWeekSummaryShown()      // tanca el modal de resum setmanal
setUserProfile(profile)     // desa el perfil d'aprenentatge de l'usuari
checkBadges(event)          // comprova i atorga insígnies noves per un event donat
```

### Rollover setmanal

`initWeekIfNeeded()` s'executa a l'arrencada (via `AppContext`). Calcula el dilluns de la setmana actual. Si difereix del `weekStart` desat:
1. Desa `prevWeekSnapshot` amb les estadístiques de la setmana que acaba
2. Reinicia `weekXP`, `weekModules`, `weekReviews` a 0
3. Actualitza `weekStart` al nou dilluns
4. Posa `weekSummaryShown: false` → es mostrarà el modal `WeeklySummary` a Home

### XP per acció
- Resposta correcta (1r intent): +10 XP
- Resposta correcta (2n intent): +5 XP
- Alta confiança + correcte: +5 XP bonus
- Alta confiança + incorrecte: -3 XP
- Obrir expandable: +3 XP
- Completar lliçó: +20 XP
- Completar micro-càpsula: +15 XP
- Mode científic correcte: +15 XP
- Mode científic incorrecte: +5 XP

### Nivells
Cada 100 XP (progressió creixent). Títols definits al tema actiu.

---

## Sistema d'insígnies

11 insígnies definides a `badgeEngine.js`. Es comproven via `checkBadges(event)` a `AppContext`.

| Id | Nom | Condició | Raresa |
|---|---|---|---|
| `first-lesson` | Primera Missió 🚀 | 1a lliçó completada | common |
| `first-capsule` | Primera Càpsula ⚡ | 1a micro-càpsula completada | common |
| `dogma-challenger` | Desafiador del Dogma 🔭 | Completar mòdul Copèrnic | uncommon |
| `deep-thinker` | Pensament Profund 🧠 | Obrir 10 expandables | uncommon |
| `capsule-collector` | Col·leccionista 🧪 | 5 micro-càpsules completades | uncommon |
| `confident-scientist` | Científic Segur ⭐ | 5 respostes alta confiança correctes | rare |
| `orbit-master` | Mestre de les Òrbites 🪐 | Mòdul d'òrbites sense errors | rare |
| `constancia` | Constància 🔥 | Streak de repàs 7 dies seguits | rare |
| `capsule-master` | Mestre de les Càpsules 🔬 | 10 micro-càpsules completades | rare |
| `copernicus-complete` | Revolució Copernicana ☀️ | Completar el mòdul de Copèrnic | epic |
| `path-complete` | Itinerari Completat 🎓 | Completar el primer itinerari sencer | epic |

**Events** que disparen la comprovació: `lesson_complete`, `module_complete`, `capsule_done`, `path_complete`, `sr_review_done`, `expand_box`.

---

## Sistema de blocs

Cada lliçó és una seqüència de blocs. El `Lesson.jsx` renderitza cada bloc segons el seu `type`. Els 15 tipus disponibles:

### Blocs de contingut (sense interacció)
- `narrative` — text narratiu amb personatge 🧑‍🚀
- `key-idea` — idea central destacada
- `expandable` — caixa plegable per aprofundir (dona XP en obrir-la)
- `prediction` — pregunta reflexiva abans d'explicar
- `timeline` — línia del temps visual
- `quote` — cita amb autor
- `connection` — enllaç explícit entre mòduls
- `comparison` — taula comparativa visual
- `misconception` — error comú → realitat
- `image` — imatge amb peu de foto i crèdit opcionals

### Blocs interactius
- `exercise` — exercici amb resposta correcta (3 estils: multiple-choice, true-false, detect-error)
- `scientific-mode` — hipòtesi sense resposta immediata (feedback al final de la lliçó)
- `debate` — dues postures enfrontades (sense resposta correcta)
- `reflection` — pregunta oberta amb camp d'escriptura (sense puntuació)
- `simulation` — component interactiu (ara: moviment retrògrad de Mart)

---

## Sistema de confiança

Després de cada exercici, l'usuari indica quant segur estava (Poc / Força / Molt). Modifica l'XP calculat. Entrena metacognició.

**Invariant crític:** el color de l'opció (verd/vermell) i les icones ✓/✗ **no apareixen fins que l'usuari ha triat el nivell de confiança**. Mentre espera, l'opció triada es ressalta en blau neutre.

Flux obligatori:
1. L'usuari tria resposta → `answered = true` (ressaltat neutre, sense colors)
2. Apareix `ConfidenceSelector`
3. L'usuari tria confiança → `showFeedback = true` → ara sí apareixen colors i icones

No modificar `ExerciseBlock.jsx` per mostrar el resultat abans de `showFeedback`.

---

## Mode científic

Exercici especial: l'usuari tria una hipòtesi però NO rep resposta immediata. El feedback apareix al final de la lliçó al `DeferredFeedbackPanel`. El botó de "Continuar" queda bloquejat fins que l'usuari hagi confirmat totes les hipòtesis de la lliçó.

---

## Experiència de celebració

### Al completar un mòdul (`Results.jsx`)
- Confetti de 28 partícules (quadrats i cercles, 7 colors) que cauen des de la part superior via un layer `position: fixed; pointer-events: none`
- So de celebració: arpegio ascendent Do-Mi-Sol-Do (C5→E5→G5→C6) sintetitzat amb `soundEngine.js` i la Web Audio API. Cap fitxer d'àudio, cap dependència externa.
- Ambdós s'activen 100ms després de muntar la pantalla (coincidint amb l'animació de fade-in)

### Al completar un itinerari (`LearningPathDetail.jsx`)
- Modal `PathCertificate` que apareix automàticament la primera vegada que s'obre un itinerari ja al 100%
- Confetti de 20 partícules dins del modal
- Color del botó de tancament adaptat al color accent del path (`--path-accent`)
- Dispara `checkBadges({ type: 'path_complete' })` per atorgar la insígnia `🎓 Itinerari Completat`

### Certificat de mòdul (`certificateEngine.js`)
- Genera un PNG (1200×800px) via Canvas API amb fons estrellat, marc i títol del mòdul
- Descàrrega directa al dispositiu sense cap servidor

---

## Itineraris d'aprenentatge (Learning Paths)

10 itineraris curats a `src/data/learningPaths.js`. Cada path agrupa mòduls existents en una seqüència pedagògica amb narrativa pròpia.

### Estructura d'un path

```js
{
  id: 'gran-relat-cosmic',
  title: 'El Gran Relat Còsmic',
  emoji: '🌌',
  description: '...',
  areaId: 'ciencies',           // connecta amb l'àrea del quiz de perfil
  difficulty: 'introductori',   // introductori | intermig | avançat
  depth: 'lleuger',             // lleuger | profund
  durationEstimate: '~6h',
  accentColor: '#4C7DFF',       // CSS custom property --path-accent
  modules: ['module-01-...', 'module-02-...'],
}
```

### Paths actuals (10)
1. El Gran Relat Còsmic (cosmologia introductòria)
2. De la Cèl·lula al Cervell (biologia)
3. La Física de l'Univers (física avançada)
4. Justícia i Pau Global (relacions internacionals)
5. El Pensament Crític (filosofia)
6. La Revolució Científica (història de la ciència)
7. Ment i Societat (psicologia social)
8. Natura Viva (ornitologia + ecologia)
9. L'Univers Desconegut (forats negres, matèria fosca, orígens)
10. La Ment Humana (psicologia, trauma, comportament)

### Recomanació personalitzada a l'onboarding

El quiz de benvinguda (3 preguntes: temps per sessió, nivell, àmbit d'interès) genera un perfil. `getRecommendedPath(profile)` a `Welcome.jsx` tria el path més adequat filtrant per `areaId` i `depth`. El perfil és editable posteriorment a `/profile`.

---

## Glossari i connexió amb mòduls

El glossari (`src/data/glossary.js`) té 45+ termes organitzats per àrea. Cada terme pot tenir un mòdul primari assignat automàticament a través del camp `glossaryTerms` del registry.

### Com funciona

El camp `glossaryTerms: ['g-terme-id']` a cada entrada de `moduleRegistry.js` és la font de veritat. `getModuleForTerm(termId)` fa la cerca inversa i retorna l'entrada del registry. El glossari mostra el botó "→ Aprofundir al mòdul" quan el terme té mòdul assignat, i navega a `/lesson` o `/itinerary` segons si el mòdul té itineraris.

### Regla per a nous mòduls

Quan s'afegeix un mòdul nou al registry, revisar si algun terme existent del glossari es treballa en profunditat en aquell mòdul i afegir-ne l'id a `glossaryTerms`. Un terme ha d'aparèixer com a primari en un sol mòdul (el que l'explica millor), no en tots els que el mencionen.

---

## Micro-càpsules

22 càpsules a `src/data/microcapsules.js`. Format lleuger: 3-5 pantalles de lectura ràpida (~3 min).

### Estructura d'una càpsula

```js
{
  id: 'mc-forats-negres',
  title: 'Forats Negres en 3 min',
  emoji: '⚫',
  area: 'ciencies',
  duration: '3 min',
  color: '#6B4FBB',   // CSS custom property --cap-color
  blocks: [
    { type: 'narrative', text: '...' },
    { type: 'key-idea',  text: '...' },
    { type: 'exercise',  question: '...', options: [...], correctIndex: 0, explanation: '...' },
  ]
}
```

### Funcions exportades

```js
getDailyCapsule()        // retorna la càpsula del dia (determinista per data)
getCapsuleById(id)       // retorna una càpsula per id
```

La càpsula del dia es selecciona amb una llavor derivada de la data actual, garantint que tots els usuaris vegin la mateixa càpsula cada dia.

---

## Reptes setmanals

`src/engine/weeklyChallenge.js` conté un pool de 13 reptes de 5 tipus:
- `modules_area` — completar N mòduls d'una àrea
- `capsules` — completar N micro-càpsules
- `reviews` — fer N sessions de repàs
- `xp` — guanyar N XP
- `modules_any` — completar N mòduls en total

`getWeekChallenges(weekStart)` selecciona 3 reptes cada setmana de forma determinista. Tots els usuaris veuen els mateixos reptes la mateixa setmana.

---

## Resum setmanal

`src/components/ui/WeeklySummary.jsx` és un modal overlay que apareix a Home quan `!weekSummaryShown && prevWeekSnapshot`. Mostra XP, mòduls i revisions de la setmana anterior.

---

## Flux de navegació

```
[1a vegada] Welcome (slides → quiz perfil → recomanació path) → /path o /modules
[resta]     Home → AreaSelector → ModuleMap → [ItinerarySelector?] → Lesson → Results
                ↘ /search (cerca global)
                ↘ /stats (estadístiques + compartir)
                ↘ /profile (perfil editable)
                ↘ /path (detall itinerari + certificat modal)
                ↘ /capsule (micro-càpsula)
                ↘ /capsules (catàleg càpsules)
                ↘ /review (spaced repetition)
                ↘ /glossary (amb links als mòduls)
```

### Rutes actuals

| Ruta | Component | Descripció |
|---|---|---|
| `/` | Welcome / Home | Primera vegada: Welcome; resta: Home |
| `/home` | Home | Pantalla principal |
| `/areas` | AreaSelector | Selecció d'àrea |
| `/modules` | ModuleMap | Mapa de mòduls |
| `/itinerary` | ItinerarySelector | Selecció d'itinerari |
| `/lesson` | Lesson | Lliçó activa |
| `/results` | Results | Resultats post-lliçó (confetti + so) |
| `/review` | ReviewSession | Repàs spaced repetition |
| `/glossary` | Glossary | Glossari amb links als mòduls |
| `/path` | LearningPathDetail | Detall d'itinerari + certificat modal |
| `/capsule` | MicroCapsulePlayer | Càpsula activa |
| `/capsules` | CapsuleBrowser | Catàleg de càpsules |
| `/search` | GlobalSearch | Cerca global |
| `/stats` | Stats | Estadístiques + compartir |
| `/profile` | Profile | Perfil d'aprenentatge editable |

### Patró navigationState

Les pantalles es comuniquen context via `setNavigationState({ currentModuleId, currentAreaId, currentPathId, currentCapsuleId })` a `AppContext`. Cada pantalla consumeix el camp que li pertoca.

### Càrrega de mòduls

`loadModule(id)` a `moduleRegistry.js` retorna el JSON del mòdul (amb cache). Si el JSON té `itineraries`, l'app navega a `/itinerary`; si no, va directament a `/lesson`.

---

## Metodologia pedagògica

### El problema que resol
La majoria d'apps d'aprenentatge fan memorització gamificada. Aquesta app entrena comprensió real:
- No memoritzaràs dades — aprendràs per qué les coses són com són
- El sistema de confiança entrena metacognició
- El mode científic entrena raonament hipotètic
- El debate entrena argumentació
- La reflexió entrena pensament propi

### Nivells de Bloom coberts
- ✅ Recordar (key-idea, narrative)
- ✅ Comprendre (expandable, prediction)
- ✅ Aplicar (exercise)
- ✅ Analitzar (scientific-mode, debate)
- ⚠️ Sintetitzar (parcialment, reflection)
- ⚠️ Avaluar (parcialment, debate)

---

## Possibles extensions futures

### Mode d'ensenyar ("mode ensenya")
L'usuari explica un concepte a un alumne simulat. **Descartat fins a obtenir finançament** (candidatura a Fundació La Caixa — Proyectos Sociales / col·laboració CosmoCaixa, o convocatòries Erasmus+ KA2).

### App nativa
Capacitor pot embolcallar l'app web actual com a app nativa per AppStore/PlayStore sense reescriure res.

### Monetització
Model freemium: mòduls bàsics gratuïts, mòduls avançats de pagament (3-5€/mòdul o subscripció mensual).

---

## Notes tècniques importants

- **Zero API externes:** cap `fetch` a cap servidor extern, cap clau d'API, cap dependència d'IA ni servei de tercers. Tot és local.
- **Cache de mòduls:** els JSON es carreguen una sola vegada per sessió (cache en memòria a `moduleRegistry.js`)
- **Merge segur d'estat:** `useProgress` fa merge entre l'estat desat i el `DEFAULT_STATE` via `mergeWithDefaults`, garantint compatibilitat amb usuaris antics sense reset
- **mountedRef:** `Lesson.jsx` usa `useRef` per evitar setState en components desmuntats
- **ThemeContext:** mostra pantalla de càrrega mínima (no `null`) per evitar flash blanc
- **Tots els mòduls oberts:** `unlockEngine` retorna `true` sempre. El sistema de desbloqueig progressiu existeix però no s'usa ara
- **CSS custom properties per theming:** `--path-accent` (paths), `--area-color` (àrees), `--cap-color` (càpsules) permeten colors per targeta sense classes dinàmiques
- **Determinisme per llavor:** la càpsula del dia, els reptes setmanals i el confetti usen valors derivats de strings de data, sense `Math.random()` en renderitzats repetibles

---

## Decisions de disseny preses

| Decisió | Raó |
|---|---|
| JSON estàtic (no CMS) | Simplicitat, sense servidor, afegir contingut = afegir fitxer |
| localStorage (no backend) | MVP sense cost, migrable a IndexedDB o backend futur via storageProvider |
| React Context (no Zustand) | Suficient per la complexitat actual, menys dependències |
| CSS Modules | Simple, sense dependències extres, encapsulació neta |
| Tots els mòduls oberts | Millor UX per ara; el sistema de desbloqueig progressiu es pot activar |
| Blocs declaratius al JSON | Màxima flexibilitat; afegir un tipus de lliçó = afegir un component |
| Favorites array unificat | Paths i càpsules comparteixen el mateix array d'ids; es filtra per tipus al consumidor |
| Reptes setmanals deterministes | Tots els usuaris veuen els mateixos reptes → sensació de comunitat sense backend |
| So sintetitzat (no fitxer) | Web Audio API: zero KB de descàrrega, zero hosting, funciona offline |
| Glossari → mòdul via registry | `glossaryTerms` al registry és la font de veritat; evita duplicació i es manté sol |
