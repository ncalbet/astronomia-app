/**
 * SimulationBlock.jsx
 *
 * Router de simulacions. Rep el tipus del JSON i renderitza
 * el component de simulació corresponent.
 *
 * Afegir una nova simulació:
 *   1. Crear el component a /simulations/NomSim.jsx
 *   2. Importar-lo aquí i afegir-lo al mapa SIM_MAP
 *   3. Usar "simulationType": "nom-sim" al JSON del mòdul
 */

import RetrogradeSim        from './RetrogradeSim'
import NaturalSelectionSim  from './NaturalSelectionSim'
import OrbitalSim           from './OrbitalSim'
import GravityLensingSim    from './GravityLensingSim'
import styles from './SimulationBlock.module.css'

const SIM_MAP = {
  'retrograde-motion':   RetrogradeSim,
  'natural-selection':   NaturalSelectionSim,
  'orbital-speed':       OrbitalSim,
  'gravity-lensing':     GravityLensingSim,
}

export default function SimulationBlock({ block }) {
  const SimComponent = SIM_MAP[block.simulationType]

  return (
    <div className={styles.wrapper}>
      <div className={styles.label}>
        <span>🔬</span> Laboratori
      </div>

      <p className={styles.title}>{block.title}</p>

      {block.context && (
        <p className={styles.context}>{block.context}</p>
      )}

      {SimComponent
        ? <SimComponent block={block} />
        : <p className={styles.missing}>Simulació "{block.simulationType}" no trobada.</p>
      }
    </div>
  )
}
