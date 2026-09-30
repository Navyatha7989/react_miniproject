import React from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'
import {AuthProvider} from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Header from './components/Header'
import Login from './pages/Login'
import Home from './pages/Home'
import Popular from './pages/Popular'
import Search from './pages/Search'
import MovieDetails from './pages/MovieDetails'
import Account from './pages/Account'
import NotFound from './pages/NotFound'
import VideoPlayer from './pages/VideoPlayer'

const ProtectedLayout = ({children}) => (
  <ProtectedRoute>
    <Header />
    {children}
  </ProtectedRoute>
)

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ProtectedLayout><Home /></ProtectedLayout>} />
        <Route path="/popular" element={<ProtectedLayout><Popular /></ProtectedLayout>} />
        <Route path="/search" element={<ProtectedLayout><Search /></ProtectedLayout>} />
        <Route path="/movies/:id" element={<ProtectedLayout><MovieDetails /></ProtectedLayout>} />
        <Route path="/account" element={<ProtectedLayout><Account /></ProtectedLayout>} />
        <Route path="/movies/:id/play" element={<ProtectedLayout><VideoPlayer /></ProtectedLayout>} />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </AuthProvider>
  )
}