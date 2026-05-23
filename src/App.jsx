import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AppProvider, useApp } from './context/AppContext'
import { ThemeProvider } from './context/ThemeContext'
import PageTransition from './components/ui/PageTransition'
import BadgeToast from './components/ui/BadgeToast'
import Welcome from './screens/Welcome'
import Home from './screens/Home'
import AreaSelector from './screens/AreaSelector'
import ModuleMap from './screens/ModuleMap'
import ItinerarySelector from './screens/ItinerarySelector'
import Lesson from './screens/Lesson'
import Results from './screens/Results'
import ReviewSession from './screens/ReviewSession'
import Glossary from './screens/Glossary'
import LearningPathDetail from './screens/LearningPathDetail'
import MicroCapsulePlayer from './screens/MicroCapsulePlayer'
import CapsuleBrowser from './screens/CapsuleBrowser'
import GlobalSearch from './screens/GlobalSearch'
import Stats from './screens/Stats'
import './styles/global.css'

function InnerApp() {
  const { isFirstTime, pendingBadge, clearPendingBadge } = useApp()
  return (
    <>
      {pendingBadge && <BadgeToast badgeId={pendingBadge} onDone={clearPendingBadge} />}
      <Routes>
        <Route path="/" element={
          isFirstTime
            ? <PageTransition><Welcome /></PageTransition>
            : <PageTransition><Home /></PageTransition>
        } />
        <Route path="/home"       element={<PageTransition><Home /></PageTransition>} />
        <Route path="/areas"      element={<PageTransition><AreaSelector /></PageTransition>} />
        <Route path="/modules"    element={<PageTransition><ModuleMap /></PageTransition>} />
        <Route path="/itinerary"  element={<PageTransition><ItinerarySelector /></PageTransition>} />
        <Route path="/lesson"     element={<PageTransition><Lesson /></PageTransition>} />
        <Route path="/results"    element={<PageTransition><Results /></PageTransition>} />
        <Route path="/review"     element={<PageTransition><ReviewSession /></PageTransition>} />
        <Route path="/glossary"   element={<PageTransition><Glossary /></PageTransition>} />
        <Route path="/path"       element={<PageTransition><LearningPathDetail /></PageTransition>} />
        <Route path="/capsule"    element={<PageTransition><MicroCapsulePlayer /></PageTransition>} />
        <Route path="/capsules"   element={<PageTransition><CapsuleBrowser /></PageTransition>} />
        <Route path="/search"     element={<PageTransition><GlobalSearch /></PageTransition>} />
        <Route path="/stats"      element={<PageTransition><Stats /></PageTransition>} />
        <Route path="*"           element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <AppProvider>
        <BrowserRouter>
          <InnerApp />
        </BrowserRouter>
      </AppProvider>
    </ThemeProvider>
  )
}
