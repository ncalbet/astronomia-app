# 🌌 Acadèmia Còsmica

Aplicació d'aprenentatge d'astronomia interactiva. PWA mobile-first.

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
  components/       → Components UI reutilitzables (pròxim bloc)
  context/
    AppContext.jsx  → Estat global de l'usuari
  data/
    modules/        → Un JSON per mòdul ← AQUÍ S'AFEGEIX CONTINGUT
    moduleRegistry.js → Registre de mòduls disponibles
  engine/
    xpEngine.js     → Càlcul d'XP i nivells
    badgeEngine.js  → Insígnies
    unlockEngine.js → Desbloqueig de mòduls
  hooks/
    useProgress.js  → Gestió del progrés
  screens/          → Pantalles de l'app
  storage/
    storageProvider.js → Capa d'emmagatzematge
  styles/
    variables.css   → Colors, fonts, espaiat ← DESIGN SYSTEM
    global.css      → Estils base
```

---

## ➕ Com afegir un nou mòdul

1. Crea `src/data/modules/module-02-gravity.json` seguint l'estructura del mòdul 01
2. Afegeix l'entrada a `src/data/moduleRegistry.js`
3. Defineix els desbloquejos a `src/engine/unlockEngine.js`

**Cap altre fitxer s'ha de modificar.**

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
