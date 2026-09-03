import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { supabase } from './lib/supabaseClient'

// Pages
import LandingPage from './pages/LandingPage'
import DashboardHome from './pages/DashboardHome'
import AgentsPage from './pages/AgentsPage'
import AgentWorkspacePage from './pages/AgentWorkspacePage'
import ReportsPage from './pages/ReportsPage'
import FilesPage from './pages/FilesPage'

// Layout
import DashboardLayout from './components/DashboardLayout'

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      // If there's no session but there's a hash in the URL, wait for onAuthStateChange to parse it
      if (!session && window.location.hash.includes('access_token')) {
        return;
      }
      setLoading(false)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (loading) {
    return <div className="flex h-screen w-full items-center justify-center"><div className="w-8 h-8 rounded-full border-2 border-[var(--accent-lime)] border-t-transparent animate-spin" /></div>
  }

  if (!session) {
    return <Navigate to="/" />
  }

  return children
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Public — Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Authenticated — Dashboard (with Sidebar) */}
        <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
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
