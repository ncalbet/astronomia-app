import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { useTheme } from '../context/ThemeContext'
import { MODULE_REGISTRY, loadModule } from '../data/moduleRegistry'
import { getAreaById, getAreaModules } from '../data/areaRegistry'
import { useModuleProgress } from '../hooks/useModuleProgress'
import styles from './ModuleMap.module.css'

const MODULE_META = {
  'module-01-copernicus':      { title: 'La Revolució de Copèrnic',            emoji: '☀️'  },
  'module-02-history':         { title: 'Història de l\'Astronomia',           emoji: '🏛️' },
  'module-03-peace':           { title: 'Pau, Conflicte i Guerra',             emoji: '🕊️' },
  'module-04-philosophy':      { title: 'Filosofia de la Ciència',             emoji: '🔬' },
  'module-05-birding':         { title: 'Introducció a l\'Ornitologia',        emoji: '🐦' },
  'module-06-chemistry':       { title: 'Química Fonamental',                  emoji: '⚗️' },
  'module-07-particles':       { title: 'Física de Partícules',                emoji: '⚛️' },
  // — Bloc: Historia Antiga —
  'module-08-grecia':          { title: 'L\'Invent dels Grecs',                emoji: '🏛️' },
  'module-09-roma':            { title: 'Roma: l\'Imperi que va Inventar Occident', emoji: '⚔️' },
  'module-10-republic-crisis': { title: 'La República que es va Suïcidar',    emoji: '🗡️' },
  'module-11-augustus':        { title: 'August: Com s\'Inventa un Règim',    emoji: '🏺' },
  'module-12-pax-romana':      { title: 'Viure a Roma: Dins l\'Imperi',       emoji: '🏟️' },
  'module-13-fall':            { title: 'La Llarga Caiguda: Com Mor un Imperi', emoji: '🌅' },
  'module-14-egipte':          { title: 'Egipte: la Civilització dels Faraons', emoji: '𓂀' },
  'module-15-egipte-origins':  { title: 'El Naixement d\'Egipte',             emoji: '🌾' },
  'module-16-egipte-imperi':   { title: 'L\'Imperi Egipci',                   emoji: '🛡️' },
  'module-17-egipte-religio':  { title: 'Els Déus del Nil',                   emoji: '𓂀' },
  'module-18-egipte-fi':       { title: 'La Fi dels Faraons',                 emoji: '🌊' },
  // — Bloc: Música —
  'module-08-musica-classica':   { title: 'Història de la Música Clàssica',  emoji: '🎼' },
  'module-09-historia-rock':     { title: 'Història del Rock',                emoji: '🎸' },
  // — Bloc: Ciències i Arts —
  'module-10-neurociencia':       { title: 'Neurociència Bàsica',             emoji: '🧠' },
  'module-12-historia-ciencia':   { title: 'Història de la Ciència',          emoji: '🔭' },
  'module-13-historia-tecnologia':{ title: 'Història de la Tecnologia',       emoji: '⚙️' },
  'module-11-pintura':            { title: 'Història i Llenguatge de la Pintura', emoji: '🎨' },
  // — Bloc: Política Moderna i Drets Humans —
  'module-14-revolucio-francesa':              { title: 'La Revolució Francesa',                    emoji: '🗽' },
  'module-15-fonaments-drets-humans':          { title: 'Fonaments Filosòfics dels Drets Humans',   emoji: '🌍' },
  'module-16-sistema-internacional-drets-humans': { title: 'El Sistema Internacional dels Drets Humans', emoji: '📜' },
  'module-17-justicia-internacional':          { title: 'Justícia Internacional',                   emoji: '⚖️' },
  'module-18-casos-drets-humans':              { title: 'Casos que Van Canviar la Història',        emoji: '📋' },
  'module-19-actors-no-estatals':              { title: 'Drets Humans i Actors No Estatals',        emoji: '💼' },
  'module-20-fronteres-drets-humans':          { title: 'Fronteres Actuals dels Drets Humans',      emoji: '🚨' },
  // — Bloc: Economia —
  'module-19-economia-mon':         { title: 'Economia: Les Eines per Llegir el Món',           emoji: '📈' },
  'module-22-economia-historia':    { title: 'De Smith a Piketty: Les Idees Econòmiques',       emoji: '📚' },
  'module-25-economia-micro':       { title: 'Com Prenem Decisions: Preus i Mercats',           emoji: '🧠' },
  'module-20-economia-macro':       { title: 'Macroeconomia: Estats i Crisis',                  emoji: '🏦' },
  'module-21-economia-desigualtat': { title: 'Desigualtat: Causes i Redistribució',             emoji: '⚖️' },
  'module-23-economia-escoles':     { title: 'Liberals, Keynesians i Marxistes',                emoji: '🔄' },
  'module-24-economia-globalitzacio':{ title: 'Globalització i el Capitalisme del Segle XXI',  emoji: '🌐' },
  'module-28-piketty':              { title: 'Piketty: El Capital i la Desigualtat',            emoji: '📊' },
  'module-26-economia-comportament':{ title: 'Per Qué No Som Racionals',                       emoji: '🎭' },
  'module-27-economia-jocs':        { title: 'Teoria de Jocs: Cooperació i Dilemes',           emoji: '♟️' },
  // — Bloc: Química —
  'module-29-quimica':            { title: 'La Química que t\'Envolta',                  emoji: '⚗️' },
  'module-30-quimica-atoms':      { title: 'Dins l\'Àtom: Estructura i Propietats',      emoji: '⚛️' },
  'module-31-quimica-reaccions':  { title: 'Reaccions Químiques: Com i Per Què Passen',  emoji: '🔥' },
  'module-32-quimica-vida':       { title: 'La Química de la Vida: Bioquímica Fonamental', emoji: '🧬' },
  // — Bloc: Biologia —
  'module-08-biologia':           { title: 'Biologia — Com Funciona la Vida',            emoji: '🧬' },
  'module-33-evolucio':           { title: 'Evolució i Selecció Natural',                 emoji: '🦎' },
  'module-35-genetica':           { title: 'Genètica i ADN',                              emoji: '🧬' },
  // — Bloc: Física —
  'module-34-mecanica-classica':  { title: 'Mecànica Clàssica',                          emoji: '⚙️' },
  'module-36-termodinamica':      { title: 'Termodinàmica',                               emoji: '🔥' },
  'module-37-electromagnetisme':  { title: 'Electromagnetisme',                           emoji: '⚡' },
  'module-38-relativitat':        { title: 'Relativitat',                                 emoji: '🌀' },
  // — Bloc: Filosofia —
  'module-30-introduccio-filosofia': { title: 'Introducció a la Filosofia',              emoji: '🦉' },
  'module-09-filosofia-politica':    { title: 'Filosofia Política',                      emoji: '⚖️' },
  'module-31-etica':                 { title: 'Ètica',                                   emoji: '⚖️' },
  'module-32-logica-argumentacio':   { title: 'Lògica i Argumentació',                   emoji: '🧩' },
  'module-33-epistemologia':         { title: 'Epistemologia',                           emoji: '🔍' },
  // — Bloc: Astronomia (nous) —
  'module-09-bigbang':               { title: 'El Big Bang i l\'Origen de l\'Univers',   emoji: '💥' },
  'module-10-estrelles':             { title: 'La Vida i Mort de les Estrelles',          emoji: '⭐' },
  // — Bloc: Biologia i Física (nous) —
  'module-08-neurociencia':          { title: 'Neurociència i Conducta',                  emoji: '🧠' },
  'module-08-relativitat':           { title: 'La Relativitat General',                   emoji: '🌌' },
  // — Bloc: Literatura —
  'module-01-antiguitat-origens':         { title: 'L\'Antiguitat i els Orígens',              emoji: '📜' },
  'module-02-edat-mitjana-renaixement':   { title: 'L\'Edat Mitjana i el Renaixement',         emoji: '🏰' },
  'module-05-avantguardes':               { title: 'El Segle XX I: Les Avantguardes',           emoji: '💥' },
  'module-06-novella-segle-xx':           { title: 'La Novel·la del Segle XX',                  emoji: '🧩' },
  'module-08-postmodernisme':             { title: 'El Postmodernisme',                         emoji: '🪞' },
  // — Bloc: Arquitectura —
  'module-XX-arquitectura-01':   { title: 'Arquitectura 1: L\'Arquitectura de l\'Ordre',  emoji: '🏛️' },
  'module-XX-arquitectura-02':   { title: 'Arquitectura 2: Déu, Llum i Pedra',            emoji: '⛪' },
  'module-XX-arquitectura-03':   { title: 'Arquitectura 3: La Modernitat i la Ruptura',   emoji: '🏗️' },
  'module-XX-arquitectura-04':   { title: 'Arquitectura 4: Per a Qui Construïm?',         emoji: '🌆' },
  // — Bloc: Arts i Cultura —
  'module-XX-cinema':   { title: 'Cinema: l\'Art de la Mirada',          emoji: '🎬' },
  'module-30-opera':    { title: 'Introducció a l\'Òpera',                emoji: '🎭' },
  // — Bloc: Relacions Internacionals (nous) —
  'module-XX-ddhh-ordre-internacional': { title: 'Drets Humans i Ordre Internacional',        emoji: '🌍' },
  'module-XX-teoria-ri':                { title: 'Teoria de les Relacions Internacionals',     emoji: '🌐' },
  // — Bloc: Societat i Política —
  'module-34-democracia-sistemes-politics': { title: 'Democràcia i Sistemes Polítics',  emoji: '🗳️' },
  'module-XX-sociologia':                   { title: 'Sociologia: Com Funcionen les Societats', emoji: '🏙️' },
  // — Bloc: Filosofia (nous) —
  'module-XX-intro-filosofia':      { title: 'Introducció a la Filosofia',                   emoji: '🦉' },
  'module-XX-etica-practica':       { title: 'Ètica Pràctica: Decisions en Casos Límit',    emoji: '⚖️' },
  'module-XX-filosofia-llenguatge': { title: 'Filosofia del Llenguatge',                     emoji: '🗣️' },
}

// XP estimat per mòdul (per restar en repetir)
const MODULE_XP = {
  'module-01-copernicus':      117,
  'module-02-history':         384,
  'module-03-peace':           244,
  'module-04-philosophy':      268,
  'module-05-birding':         238,
  'module-06-chemistry':       420,
  'module-07-particles':       380,
  // — Bloc: Historia Antiga —
  'module-08-grecia':          180,
  'module-09-roma':            190,
  'module-10-republic-crisis': 200,
  'module-11-augustus':        200,
  'module-12-pax-romana':      200,
  'module-13-fall':            200,
  'module-14-egipte':          180,
  'module-15-egipte-origins':  160,
  'module-16-egipte-imperi':   160,
  'module-17-egipte-religio':  160,
  'module-18-egipte-fi':       160,
  // — Bloc: Música —
  'module-08-musica-classica':    320,
  'module-09-historia-rock':      340,
  // — Bloc: Ciències i Arts —
  'module-10-neurociencia':        360,
  'module-12-historia-ciencia':    300,
  'module-13-historia-tecnologia': 300,
  'module-11-pintura':             300,
  // — Bloc: Política Moderna i Drets Humans —
  'module-14-revolucio-francesa':               280,
  'module-15-fonaments-drets-humans':           260,
  'module-16-sistema-internacional-drets-humans': 260,
  'module-17-justicia-internacional':           260,
  'module-18-casos-drets-humans':               260,
  'module-19-actors-no-estatals':               260,
  'module-20-fronteres-drets-humans':           260,
  // — Bloc: Economia —
  'module-19-economia-mon':          220,
  'module-22-economia-historia':     220,
  'module-25-economia-micro':        220,
  'module-20-economia-macro':        240,
  'module-21-economia-desigualtat':  240,
  'module-23-economia-escoles':      240,
  'module-24-economia-globalitzacio':240,
  'module-28-piketty':               240,
  'module-26-economia-comportament': 240,
  'module-27-economia-jocs':         240,
  // — Bloc: Química —
  'module-29-quimica':            320,
  'module-30-quimica-atoms':      300,
  'module-31-quimica-reaccions':  300,
  'module-32-quimica-vida':       320,
  // — Bloc: Biologia —
  'module-08-biologia':           300,
  'module-33-evolucio':           300,
  'module-35-genetica':           300,
  // — Bloc: Física —
  'module-34-mecanica-classica':  300,
  'module-36-termodinamica':      300,
  'module-37-electromagnetisme':  300,
  'module-38-relativitat':        300,
  // — Bloc: Filosofia —
  'module-30-introduccio-filosofia': 280,
  'module-09-filosofia-politica':    280,
  'module-31-etica':                 280,
  'module-32-logica-argumentacio':   280,
  'module-33-epistemologia':         280,
  // — Bloc: Astronomia (nous) —
  'module-09-bigbang':               320,
  'module-10-estrelles':             320,
  // — Bloc: Biologia i Física (nous) —
  'module-08-neurociencia':          300,
  'module-08-relativitat':           300,
  // — Bloc: Literatura —
  'module-01-antiguitat-origens':         320,
  'module-02-edat-mitjana-renaixement':   320,
  'module-05-avantguardes':               300,
  'module-06-novella-segle-xx':           300,
  'module-08-postmodernisme':             300,
  // — Bloc: Arquitectura —
  'module-XX-arquitectura-01':  300,
  'module-XX-arquitectura-02':  300,
  'module-XX-arquitectura-03':  300,
  'module-XX-arquitectura-04':  300,
  // — Bloc: Arts i Cultura —
  'module-XX-cinema':   300,
  'module-30-opera':    300,
  // — Bloc: Relacions Internacionals (nous) —
  'module-XX-ddhh-ordre-internacional': 300,
  'module-XX-teoria-ri':                300,
  // — Bloc: Societat i Política —
  'module-34-democracia-sistemes-politics': 320,
  'module-XX-sociologia':                   300,
  // — Bloc: Filosofia (nous) —
  'module-XX-intro-filosofia':      280,
  'module-XX-etica-practica':       280,
  'module-XX-filosofia-llenguatge': 280,
}

function ModuleCard({ id, onSelect, onRepeat, loadingId, completedModules,
                      completedLessons, isModuleUnlocked, isItineraryCompleted }) {
  const meta      = MODULE_META[id] || { title: id, emoji: '🔒' }
  const unlocked  = isModuleUnlocked(id)
  const completed = completedModules.includes(id)
  const isLoading = loadingId === id
  const [confirmRepeat, setConfirmRepeat] = useState(false)
  const minutes   = Math.round((MODULE_XP[id] || 200) / 20)

  const progress = useModuleProgress(id, completedLessons, isItineraryCompleted)

  const showProgress = unlocked && progress && progress.total > 0
    && progress.completed > 0 && !completed

  const handleRepeatClick = (e) => {
    e.stopPropagation()
    setConfirmRepeat(true)
  }

  const handleConfirmRepeat = (e) => {
    e.stopPropagation()
    setConfirmRepeat(false)
    onRepeat(id)
  }

  const handleCancelRepeat = (e) => {
    e.stopPropagation()
    setConfirmRepeat(false)
  }

  return (
    <div className={`${styles.moduleCard} ${!unlocked ? styles.locked : ''} ${completed ? styles.completed : ''}`}>

      {/* Contingut principal — clicable per entrar */}
      <button
        className={styles.cardMain}
        onClick={() => onSelect(id)}
        disabled={!unlocked || !!loadingId}
      >
        <div className={styles.moduleEmoji}>
          {isLoading ? '⏳' : unlocked ? meta.emoji : '🔒'}
        </div>
        <div className={styles.moduleInfo}>
          <div className={styles.moduleName}>{meta.title}</div>
          <div className={styles.moduleMeta}>
            <span>
              {isLoading ? 'Carregant...'
                : !unlocked ? 'Mòdul bloquejat'
                : progress ? progress.label
                : ''}
            </span>
            {unlocked && !isLoading && (
              <span className={styles.readTime}>~{minutes}min</span>
            )}
          </div>
        </div>
        {completed && !isLoading && <div className={styles.completedBadge}>✓</div>}
        {showProgress && <div className={styles.percentBadge}>{progress.percent}%</div>}
      </button>

      {/* Barra de progrés */}
      {(showProgress || completed) && (
        <div className={styles.progressTrack}>
          <div
            className={`${styles.progressFill} ${completed ? styles.progressComplete : ''}`}
            style={{ width: completed ? '100%' : `${progress?.percent || 0}%` }}
          />
        </div>
      )}

      {/* Botó repetir — només si completat */}
      {completed && !confirmRepeat && (
        <button className={styles.repeatBtn} onClick={handleRepeatClick}>
          🔄 Repetir mòdul
        </button>
      )}

      {/* Confirmació */}
      {confirmRepeat && (
        <div className={styles.confirmBox}>
          <p className={styles.confirmText}>
            Es reiniciarà el progrés i l'XP d'aquest mòdul. La resta es manté.
          </p>
          <div className={styles.confirmBtns}>
            <button className={styles.confirmYes} onClick={handleConfirmRepeat}>
              Sí, repetir
            </button>
            <button className={styles.confirmNo} onClick={handleCancelRepeat}>
              Cancel·lar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default function ModuleMap() {
  const navigate  = useNavigate()
  const { isModuleUnlocked, completedModules, completedLessons,
          isItineraryCompleted, setNavigationState, repeatModule,
          navigationState } = useApp()
  const { theme }  = useTheme()
  const [loadingId, setLoadingId] = useState(null)
  const [query, setQuery]         = useState('')

  const area = getAreaById(navigationState.currentAreaId)

  // Si no hi ha àrea seleccionada, torna al selector
  useEffect(() => {
    if (!navigationState.currentAreaId) navigate('/areas', { replace: true })
  }, [])

  const registryIds = new Set(MODULE_REGISTRY.map(m => m.id))

  const handleSelectModule = async (moduleId) => {
    if (!isModuleUnlocked(moduleId) || loadingId) return
    setLoadingId(moduleId)
    try {
      const data = await loadModule(moduleId)
      setNavigationState({
        currentModuleId: moduleId,
        currentItineraryId: null,
        currentLessonId: null,
        currentStep: 0
      })
      navigate(data.itineraries ? '/itinerary' : '/lesson')
    } catch (err) {
      console.error('Error carregant el mòdul:', err)
    } finally {
      setLoadingId(null)
    }
  }

  const handleRepeat = (moduleId) => {
    const xp = MODULE_XP[moduleId] || 0
    repeatModule(moduleId, xp)
  }

  if (!area) return null  // redirect en curs

  const normalizedQuery = query.trim().toLowerCase()

  const filteredTopics = area.topics.map(topic => ({
    ...topic,
    modules: topic.modules.filter(id => {
      if (!registryIds.has(id)) return false
      if (!normalizedQuery) return true
      const title = (MODULE_META[id]?.title || id).toLowerCase()
      return title.includes(normalizedQuery)
    })
  })).filter(topic => topic.modules.length > 0)

  const totalVisible = filteredTopics.reduce((acc, t) => acc + t.modules.length, 0)

  return (
    <div className={styles.screen}>
      <header className={styles.header}>
        <button className={styles.back} onClick={() => navigate('/areas')}>← Àrees</button>
        <h1 className={styles.title}>{area.emoji} {area.label}</h1>
        <p className={styles.subtitle}>{area.description}</p>
      </header>

      <div className={styles.searchRow}>
        <div className={styles.searchWrapper}>
          <span className={styles.searchIcon}>🔍</span>
          <input
            className={styles.searchInput}
            type="search"
            placeholder="Cerca un mòdul..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            autoComplete="off"
          />
          {query && (
            <button className={styles.searchClear} onClick={() => setQuery('')}>✕</button>
          )}
        </div>
      </div>

      <div className={styles.moduleList}>
        {totalVisible === 0 && (
          <p className={styles.noResults}>Cap mòdul coincideix amb "{query}"</p>
        )}
        {filteredTopics.map(topic => (
          <div key={topic.label} className={styles.topicSection}>
            <h2 className={styles.topicHeader}>{topic.label}</h2>
            {topic.modules.map(id => (
              <ModuleCard
                key={id}
                id={id}
                onSelect={handleSelectModule}
                onRepeat={handleRepeat}
                loadingId={loadingId}
                completedModules={completedModules}
                completedLessons={completedLessons}
                isModuleUnlocked={isModuleUnlocked}
                isItineraryCompleted={isItineraryCompleted}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
