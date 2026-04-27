import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { checkAndMigrateData } from './storage/dataVersion'

// Comprova la versió de dades abans de muntar l'app
checkAndMigrateData()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
