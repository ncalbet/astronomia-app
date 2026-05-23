/**
 * weeklyChallenge.js
 * Genera 3 reptes per setmana de forma determinista (seed = weekStart).
 */

import { AREAS, getAreaModules } from '../data/areaRegistry'

const CHALLENGE_POOL = [
  { id: 'ch-modules-ciencies',  emoji: '🔭', title: 'Completa 1 mòdul de Ciències',             type: 'modules_area', area: 'ciencies',  target: 1 },
  { id: 'ch-modules-historia',  emoji: '🏺', title: 'Completa 1 mòdul d\'Història',              type: 'modules_area', area: 'historia',  target: 1 },
  { id: 'ch-modules-pensament', emoji: '💡', title: 'Completa 1 mòdul de Pensament',             type: 'modules_area', area: 'pensament', target: 1 },
  { id: 'ch-modules-societat',  emoji: '🌍', title: 'Completa 1 mòdul de Societat',              type: 'modules_area', area: 'societat',  target: 1 },
  { id: 'ch-modules-relacions', emoji: '🕊️', title: 'Completa 1 mòdul de Relacions Internacionals', type: 'modules_area', area: 'relacions', target: 1 },
  { id: 'ch-modules-arts',      emoji: '🎨', title: 'Completa 1 mòdul d\'Arts i Cultura',        type: 'modules_area', area: 'arts',      target: 1 },
  { id: 'ch-capsules-2',   emoji: '⚡', title: 'Fes 2 micro-càpsules',                      type: 'capsules',     target: 2 },
  { id: 'ch-capsules-3',   emoji: '⚡', title: 'Fes 3 micro-càpsules',                      type: 'capsules',     target: 3 },
  { id: 'ch-reviews-3',    emoji: '🔁', title: 'Completa 3 sessions de repàs',              type: 'reviews',      target: 3 },
  { id: 'ch-reviews-5',    emoji: '🔁', title: 'Completa 5 sessions de repàs',              type: 'reviews',      target: 5 },
  { id: 'ch-xp-100',       emoji: '⭐', title: 'Guanya 100 XP aquesta setmana',             type: 'xp',           target: 100 },
  { id: 'ch-xp-200',       emoji: '⭐', title: 'Guanya 200 XP aquesta setmana',             type: 'xp',           target: 200 },
  { id: 'ch-modules-any-2', emoji: '📚', title: 'Completa 2 mòduls de qualsevol àrea',      type: 'modules_any',  target: 2 },
]

function seedFromWeek(weekStart) {
  return (weekStart || '').split('').reduce((acc, c) => acc + c.charCodeAt(0), 0)
}

export function getWeekChallenges(weekStart) {
  const seed = seedFromWeek(weekStart)
  const pool = [...CHALLENGE_POOL]
  const picked = []
  let s = seed
  while (picked.length < 3 && pool.length > 0) {
    const idx = s % pool.length
    picked.push(pool[idx])
    pool.splice(idx, 1)
    s = Math.floor(s * 1.618) + 7
  }
  return picked
}

export function getChallengeProgress(challenge, state) {
  const { weekXP, weekModules, weekReviews, completedModules, completedCapsules } = state
  switch (challenge.type) {
    case 'xp':
      return Math.min(weekXP || 0, challenge.target)
    case 'reviews':
      return Math.min(weekReviews || 0, challenge.target)
    case 'capsules':
      return Math.min((completedCapsules || []).length, challenge.target)
    case 'modules_any':
      return Math.min(weekModules || 0, challenge.target)
    case 'modules_area': {
      const areaObj = AREAS.find(a => a.id === challenge.area)
      if (!areaObj) return 0
      const areaMods = getAreaModules(areaObj)
      // Comptem quants s'han completat AQUESTA setmana. Com no guardem data per mòdul,
      // usem el total completats a l'àrea com a proxy (sempre creix o és igual).
      const done = areaMods.filter(id => (completedModules || []).includes(id)).length
      return Math.min(done, challenge.target)
    }
    default:
      return 0
  }
}
