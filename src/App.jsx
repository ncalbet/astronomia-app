import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AppProvider, useApp } from './context/AppContext'
import PageTransition from './components/ui/PageTransition'
import BadgeToast from './components/ui/BadgeToast'
import Welcome from './screens/Welcome'
import Home from './screens/Home'
import ModuleMap from './screens/ModuleMap'
import Lesson from './screens/Lesson'
import Results from './screens/Results'
import './styles/global.css'

/**
 * InnerApp
 * Separat de App per poder usar useApp() (que necessita estar dins AppProvider).
 */
function InnerApp() {
  const { isFirstTime, pendingBadge, clearPendingBadge } = useApp()

  return (
    <>
      {/* Toast global d'insígnies - visible a qualsevol pantalla */}
      {pendingBadge && (
        <BadgeToast badgeId={pendingBadge} onDone={clearPendingBadge} />
      )}

      <Routes>
        {/* Primer cop → Welcome; resta → Home */}
        <Route
          path="/"
          element={
            isFirstTime
              ? <PageTransition><Welcome /></PageTransition>
              : <PageTransition><Home /></PageTransition>
          }
        />
        <Route path="/home"    element={<PageTransition><Home /></PageTransition>} />
        <Route path="/modules" element={<PageTransition><ModuleMap /></PageTransition>} />
        <Route path="/lesson"  element={<PageTransition><Lesson /></PageTransition>} />
        <Route path="/results" element={<PageTransition><Results /></PageTransition>} />
        <Route path="*"        element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <InnerApp />
      </BrowserRouter>
    </AppProvider>
  )
}
