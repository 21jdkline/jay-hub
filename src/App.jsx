import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import CommandPalette from './components/CommandPalette'
import CommandCenter from './pages/CommandCenter'
import MercuryCard from './pages/MercuryCard'
import PropEdgeCard from './pages/PropEdgeCard'
import Ventures from './pages/Ventures'
import Howl from './pages/Howl'
import Codex from './pages/Codex'
import LifeAdmin from './pages/LifeAdmin'
import Settings from './pages/Settings'

export default function App() {
  return (
    <BrowserRouter>
      <CommandPalette />
      <Routes>
        <Route path="/" element={<Layout><CommandCenter /></Layout>} />
        <Route path="/mercury" element={<Layout><MercuryCard /></Layout>} />
        <Route path="/propedge" element={<Layout><PropEdgeCard /></Layout>} />
        <Route path="/ventures" element={<Layout><Ventures /></Layout>} />
        <Route path="/howl" element={<Layout><Howl /></Layout>} />
        <Route path="/codex" element={<Layout><Codex /></Layout>} />
        <Route path="/life" element={<Layout><LifeAdmin /></Layout>} />
        <Route path="/settings" element={<Layout><Settings /></Layout>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
