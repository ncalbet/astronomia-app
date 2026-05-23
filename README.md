# 🌌 Acadèmia Còsmica

Plataforma d'aprenentatge profund mobile-first (PWA). Motor pedagògic universal: canviar de matèria = canviar el contingut JSON.

**App en producció:** https://astronomia-app.vercel.app/

---

## 🚀 Posada en marxa (primera vegada)

### 1. Instal·la Node.js
Ves a https://nodejs.org i baixa la versió **LTS** (la recomanada).
Segueix l'instal·lador. Un cop instal·lat, verifica-ho obrint el terminal:
```
node --version
```
Ha de mostrar alguna cosa com `v20.x.x`.

---

### 2. Descomprimeix el projecte
Descomprimeix la carpeta `astronomia-app` on vulguis (per exemple, l'Escriptori).

---

### 3. Obre el terminal a la carpeta del projecte
- **Mac**: clic dret sobre la carpeta → "Obrir terminal aquí"  
  o obre Terminal i escriu: `cd ~/Desktop/astronomia-app`
- **Windows**: obre la carpeta, clic dret → "Obrir en terminal"

---

### 4. Instal·la les dependències
```bash
npm install
```
Triga 1-2 minuts la primera vegada. Descarrega les llibreries necessàries.

---

### 5. Arrenca l'app en mode desenvolupament
```bash
npm run dev
```
Obre el navegador a: **http://localhost:5173**

L'app funciona i es refresca automàticament quan fas canvis.

---

## 📦 Publicar a Vercel (hosting gratuït)

### Opció A — Arrossegar i soltar (la més fàcil)
1. Executa: `npm run build`
2. Ves a https://vercel.com i crea un compte gratuït
3. A la pàgina principal, arrossega la carpeta `dist/` que s'ha creat
4. Vercel et dona una URL pública en 30 segons ✅

### Opció B — Connectar amb GitHub (recomanat per actualitzacions continues)
1. Crea un repositori a https://github.com
2. Puja el codi: `git init`, `git add .`, `git commit -m "inici"`, `git push`
3. A Vercel, importa el repositori
4. Cada `git push` actualitza l'app automàticament

---

## 🗂️ Estructura del projecte

```
src/
  components/
    blocks/           → Blocs de contingut reutilitzables
    exercises/        → Exercicis interactius
    simulations/      → Simulacions (RetrogradeSim)
    ui/               → Components UI globals (BadgeToast, PageTransition,
                        WeeklySummary, LessonReinforcementPanel, MicroRevealPanel)
  context/
    AppContext.jsx     → Estat global de l'usuari
    ThemeContext.jsx   → Tema actiu (colors, textos, narrativa)
  data/
    modules/           → Un JSON per mòdul ← AQUÍ S'AFEGEIX CONTINGUT (93 mòduls)
    moduleRegistry.js  → Registre de mòduls disponibles + cache en memòria
    areaRegistry.js    → Àrees de coneixement i agrupació per temes
    learningPaths.js   → Itineraris d'aprenentatge curats (10 paths)
    microcapsules.js   → Micro-càpsules de 3 min (22 càpsules)
    glossary.js        → Glossari de termes
  engine/
    xpEngine.js              → Càlcul d'XP i nivells
    badgeEngine.js           → Insígnies i condicions
    unlockEngine.js          → Desbloqueig de mòduls (ara tots oberts)
    spacedRepetitionEngine.js → Algorisme SM-2
    readingTimeEngine.js     → Estimació de minuts de lectura
    weeklyChallenge.js       → Reptes setmanals deterministes
  hooks/
    useProgress.js        → Estat persistent de l'usuari
    useModuleProgress.js  → Progrés per mòdul (per al mapa)
    useFirstTime.js       → Detecta primera obertura de l'app
  screens/
    Welcome.jsx           → Benvinguda + quiz de perfil + recomanació d'itinerari
    Home.jsx              → Pantalla principal amb reptes, favorits i resum setmanal
    AreaSelector.jsx      → Selecció d'àrea de coneixement
    ModuleMap.jsx         → Mapa de mòduls amb filtre, ordre i cerca
    ItinerarySelector.jsx → Selecció d'itinerari quan un mòdul en té més d'un
    Lesson.jsx            → Renderitzador dinàmic de lliçons per blocs
    Results.jsx           → Resultats al completar mòdul/itinerari
    ReviewSession.jsx     → Sessió de repàs amb spaced repetition
    LearningPathDetail.jsx → Detall i progrés d'un itinerari d'aprenentatge
    MicroCapsulePlayer.jsx → Reproductor de micro-càpsules de 3 min
    CapsuleBrowser.jsx    → Catàleg de totes les micro-càpsules
    GlobalSearch.jsx      → Cerca global (mòduls, itineraris, càpsules)
    Stats.jsx             → Estadístiques d'aprenentatge de l'usuari
    Glossary.jsx          → Glossari de termes
  storage/
    storageProvider.js  → Capa d'abstracció sobre localStorage
    dataVersion.js      → Control de versió de dades
  themes/
    astronomy.json     → Tema astronomia
    philosophy.json    → Tema filosofia
    themeRegistry.js   → Registre de temes
  styles/
    variables.css      → Design system complet ← AQUÍ ES TOCA EL DISSENY
    global.css         → Estils base
```

---

## ➕ Com afegir un nou mòdul

1. Crea `src/data/modules/module-XX-nom.json` seguint el format de `referencia-blocs.md`
2. Afegeix l'entrada a `src/data/moduleRegistry.js`
3. Afegeix el meta (títol, emoji, XP estimat) a `src/screens/ModuleMap.jsx` (`MODULE_META` i `MODULE_XP`)
4. Afegeix l'id del mòdul al topic corresponent a `src/data/areaRegistry.js`
5. Afegeix l'id a `unlockedModules` al `DEFAULT_STATE` de `src/hooks/useProgress.js`
6. Incrementa `DATA_VERSION` a `src/storage/dataVersion.js`

Consulta `context-projecte.md` per a detalls sobre l'arquitectura completa.

---

## 🔧 Icones PWA (necessàries per instal·lar com app)

Crea o busca dues imatges:
- `public/icons/icon-192.png` (192×192 px)
- `public/icons/icon-512.png` (512×512 px)

Pots generar-les gratuïtament a https://realfavicongenerator.net

---

## 📱 Instal·lar com app al mòbil

Un cop publicada a Vercel:
1. Obre la URL al mòbil
2. **iOS**: botó compartir → "Afegir a la pantalla d'inici"
3. **Android**: menú del navegador → "Instal·lar app"
