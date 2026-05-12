/**
 * useModuleProgress.js
 * Calcula el progrés d'un mòdul: lliçons completades, total i percentatge.
 * Separat en hook propi per poder-lo reutilitzar des de diverses pantalles.
 */

import { useState, useEffect } from 'react'
import { loadModule } from '../data/moduleRegistry'

export function useModuleProgress(moduleId, completedLessons, isItineraryCompleted) {
  const [progress, setProgress] = useState(null)

  useEffect(() => {
    loadModule(moduleId).then(data => {
      let allLessons = []

      if (data.itineraries) {
        data.itineraries.forEach(itin => {
          itin.lessons.forEach(lesson => {
            const key = `${moduleId}__${itin.id}__${lesson.id}`
            allLessons.push({ key })
          })
        })
      } else {
        data.lessons?.forEach(lesson => {
          const key = `${moduleId}__${lesson.id}`
          allLessons.push({ key })
        })
      }

      const total          = allLessons.length
      const completed      = allLessons.filter(l => completedLessons.includes(l.key)).length
      const percent        = total > 0 ? Math.round((completed / total) * 100) : 0
      const hasItineraries = !!data.itineraries

      let label
      if (completed === total && total > 0) label = 'Completat'
      else if (completed === 0 && hasItineraries) label = '🔀 Tria el camí'
      else if (completed === 0)              label = `${total} lliçons`
      else                                   label = `${completed}/${total} lliçons`

      setProgress({ completed, total, percent, label, hasItineraries })
    }).catch(() => {
      setProgress({ completed: 0, total: 0, percent: 0, label: '—' })
    })
  }, [moduleId, completedLessons.length])

  return progress
}
