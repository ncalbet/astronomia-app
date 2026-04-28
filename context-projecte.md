# Context del Projecte — Acadèmia Còsmica

> Document de referència per a Claude. Llegeix-lo sencer abans de respondre qualsevol pregunta sobre el projecte.

---

## Què és aquest projecte

Una **plataforma d'aprenentatge profund** mobile-first (PWA) que permet aprendre qualsevol matèria amb una metodologia pedagògica sòlida. No és una app de divulgació superficial — és un motor d'aprenentatge que entrena el pensament crític, no la memorització.

**Visió a llarg termini:** una plataforma universal on qualsevol tema (des d'astrofísica a filosofia, finances, música o biologia) es pot aprendre amb la mateixa arquitectura i metodologia. Canviar de tema = canviar el contingut JSON. El motor és sempre el mateix.

**Fil conductor pedagògic:** curiositat → explicació → predicció → exercici → confiança → feedback narratiu → recompensa

**Públic objectiu:** adults de 25-55 anys amb estudis universitaris que volen formació contínua fora del sistema formal. Lifelong learning. Persones que llegeixen assajos de divulgació però volen anar més fons i retenir el que aprenen.

**App en producció:** https://astronomia-app.vercel.app/

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
| Hosting | Vercel (gratuït) |
| Codi | GitHub |

---

## Estructura de fitxers

```
src/
  components/
    blocks/           → Blocs de contingut reutilitzables (DebateBlock, etc.)
    exercises/        → Exercicis interactius (ExerciseBlock, ScientificModeBlock...)
    simulations/      → Simulacions (RetrogradeSim)
    ui/               → Components UI globals (BadgeToast, PageTransition)
  context/
    AppContext.jsx    → Estat global de l'usuari
    ThemeContext.jsx  → Tema actiu (colors, textos, narrativa)
  data/
    modules/          → Un JSON per mòdul ← AQUÍ S'AFEGEIX CONTINGUT
    moduleRegistry.js → Registre de mòduls disponibles + cache en memòria
  engine/
    xpEngine.js       → Càlcul d'XP i nivells
    badgeEngine.js    → Insígnies i condicions
    unlockEngine.js   → Desbloqueig de mòduls (ara tots oberts)
  hooks/
    useProgress.js    → Estat persistent de l'usuari
    useModuleProgress.js → Progrés per mòdul (per al mapa)
  screens/
    Home.jsx          → Pantalla principal
    ModuleMap.jsx     → Mapa de missions amb progrés visual
    ItinerarySelector.jsx → Selecció d'itinerari quan un mòdul en té més d'un
    Lesson.jsx        → Renderitzador dinàmic de lliçons per blocs
    Results.jsx       → Resultats al completar mòdul/itinerari
    Welcome.jsx       → Pantalla de benvinguda (primer cop)
  storage/
    storageProvider.js  → Capa d'abstracció sobre localStorage
    dataVersion.js      → Control de versió de dades (ara DATA_VERSION = 4)
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

### Afegir un mòdul nou — 4 passos, cap altre fitxer es toca

1. Crear `src/data/modules/module-XX-nom.json`
2. Afegir entrada a `src/data/moduleRegistry.js`
3. Afegir meta (títol, emoji) a `src/screens/ModuleMap.jsx` (constant `MODULE_META` i `MODULE_XP`)
4. Afegir el nou id a `unlockedModules` al `DEFAULT_STATE` de `src/hooks/useProgress.js`
5. Incrementar `DATA_VERSION` a `src/storage/dataVersion.js`

### Mòduls amb itineraris

Si un mòdul té el camp `"itineraries"` (array), l'app mostra automàticament la pantalla de selecció d'itinerari (`ItinerarySelector`). Si no, va directament a la lliçó.

---

## Mòduls existents

| Mòdul | Itineraris | Lliçons | Exercicis | Modes científics |
|---|---|---|---|---|
| ☀️ La Revolució de Copèrnic | 1 | 3 | 4 | 2 |
| 🏛️ Història de l'Astronomia | 2 | 13 | 8 | 5 |
| 🕊️ Pau, Conflicte i Guerra | 1 | 6 | 8 | 5 |
| 🔬 Filosofia de la Ciència | 1 | 6 | 10 | 6 |
| 🐦 Introducció a l'Ornitologia | 1 | 6 | 11 | 2 |
| ⚗️ Química Fonamental | 2 | 12 | 16 | 6 |
| ⚛️ Física de Partícules | 2 | 12 | 20 | 5 |
| **TOTAL** | | **58** | **77** | **31** |

### Mòduls proposats per afegir (prioritat)
- 🧬 Biologia — com funciona la vida
- 🧠 Neurociència bàsica
- 🏛️ Filosofia — grans corrents i pensament crític
- 🌿 Ecologia i medi ambient
- 📊 Estadística per entendre el món

---

## Protocol de versions de dades

**DATA_VERSION actual: 4**

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

## Sistema de blocs

Cada lliçó és una seqüència de blocs. El `Lesson.jsx` renderitza cada bloc segons el seu `type`. Els 14 tipus disponibles:

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

### Blocs interactius
- `exercise` — exercici amb resposta correcta (3 estils: multiple-choice, true-false, detect-error)
- `scientific-mode` — hipòtesi sense resposta immediata (feedback al final de la lliçó)
- `debate` — dues postures enfrontades (sense resposta correcta)
- `reflection` — pregunta oberta amb camp d'escriptura (sense puntuació)
- `simulation` — component interactiu (ara: moviment retrògrad de Mart)

---

## Sistema de progrés i XP

### XP per acció
- Resposta correcta (1r intent): +10 XP
- Resposta correcta (2n intent): +5 XP
- Alta confiança + correcte: +5 XP bonus
- Alta confiança + incorrecte: -3 XP
- Obrir expandable: +3 XP
- Completar lliçó: +20 XP
- Mode científic correcte: +15 XP
- Mode científic incorrecte: +5 XP

### Nivells
Cada 100 XP (progressió creixent). Títols definits al tema actiu.

### Insígnies
Definides a `src/engine/badgeEngine.js`. Es mostren a Home amb popup de detall.

### Repetir mòdul
Des del mapa de missions, els mòduls completats tenen botó "Repetir". En repetir, s'esborra el progrés d'aquell mòdul i es resta l'XP estimat (definit a `MODULE_XP` al `ModuleMap.jsx`).

---

## Sistema de confiança

Després de cada exercici, l'usuari indica quant segur estava (Poc / Força / Molt). Modifica l'XP calculat. Entrena metacognició — saber el que saps i el que no saps.

---

## Mode científic

Exercici especial: l'usuari tria una hipòtesi però NO rep resposta immediata. El feedback apareix al final de la lliçó al `DeferredFeedbackPanel`. El botó de "Continuar" queda bloquejat fins que l'usuari hagi confirmat totes les hipòtesis de la lliçó.

---

## Flux de navegació

```
Home → ModuleMap → [ItinerarySelector?] → Lesson → Results → ModuleMap/Home
```

- Si el mòdul té `itineraries` → passa per `ItinerarySelector`
- Si no → va directament a `Lesson`
- `Results` té botons per anar al mapa o a l'inici
- El botó "tornar" a `Lesson` torna a `ItinerarySelector` si hi ha itinerari actiu

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

### El que falta per ser un motor complet
- Revisió espaciada (spaced repetition)
- Mode d'ensenyar (explicar a un alumne simulat)
- Mesura de transferència (aplicar conceptes a contextos nous)

---

## Possibles extensions futures

### Contingut dinàmic via IA
Integrar Ollama (model local, gratuït) per generar exercicis nous cada vegada que l'usuari repeteix una lliçó. El motor suporta aquest canvi sense reescriptura.

### App nativa
Capacitor pot embolcallar l'app web actual com a app nativa per AppStore/PlayStore sense reescriure res.

### Monetització
Model freemium: mòduls bàsics gratius, mòduls avançats de pagament (3-5€/mòdul o subscripció mensual).

### Finançament institucional
El perfil del creador (doctor en processos de pau, professor, naturalista) i la metodologia documentada el fa candidat a finançament de la Fundació La Caixa (programa Proyectos Sociales o col·laboració Cosmocaixa) i convocatòries Erasmus+ KA2.

---

## Notes tècniques importants

- **Cache de mòduls:** els JSON es carreguen una sola vegada per sessió (cache en memòria a `moduleRegistry.js`)
- **Merge segur d'estat:** `useProgress` fa merge entre l'estat desat i el `DEFAULT_STATE` per garantir compatibilitat amb usuaris antics
- **mountedRef:** `Lesson.jsx` usa `useRef` per evitar setState en components desmuntats
- **ThemeContext:** mostra pantalla de càrrega mínima (no `null`) per evitar flash blanc
- **Tots els mòduls oberts:** `unlockEngine` retorna `true` sempre. El sistema de desbloqueig progressiu existeix però no s'usa ara

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
