import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// Pages
import LandingPage from './pages/LandingPage'
import DashboardHome from './pages/DashboardHome'
import AgentsPage from './pages/AgentsPage'
import AgentWorkspacePage from './pages/AgentWorkspacePage'
import ReportsPage from './pages/ReportsPage'
import FilesPage from './pages/FilesPage'

// Layout
import DashboardLayout from './components/DashboardLayout'

function App() {
  return (
    <Router>
      <Routes>
        {/* Public — Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Authenticated — Dashboard (with Sidebar) */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="agents" element={<AgentsPage />} />
          <Route path="agent/:id" element={<AgentWorkspacePage />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="files" element={<FilesPage />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
