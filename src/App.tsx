import React from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { ThemeProvider } from './components/ThemeProvider'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import Layout from './components/Layout'
import LandingPage from './pages/LandingPage'
import HomePage from './pages/HomePage'
import Login from './pages/Login'
import Register from './pages/Register'
import PropertyDetails from './pages/PropertyDetails'
import Profile from './pages/Profile'
import SearchProperties from './pages/SearchProperties'
import Favorites from './pages/Favorites'
import MyProperties from './pages/MyProperties'
import AddProperty from './pages/AddProperty'
import EditProperty from './pages/EditProperty'
import Inquiries from './pages/Inquiries'

const PrivateRoute: React.FC<{ element: React.ReactElement }> = ({ element }) => {
  const { user } = useAuth()
  return user ? element : <Navigate to="/login" replace />
}

const PublicOnlyRoute: React.FC<{ element: React.ReactElement }> = ({ element }) => {
  const { user } = useAuth()
  return user ? <Navigate to="/home" replace /> : element
}

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="housing-hub-theme">
      <AuthProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<PublicOnlyRoute element={<LandingPage />} />} />
              <Route path="/login" element={<PublicOnlyRoute element={<Login />} />} />
              <Route path="/register" element={<PublicOnlyRoute element={<Register />} />} />
              <Route path="/home" element={<PrivateRoute element={<HomePage />} />} />
              <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />
              <Route path="/property/:id" element={<PropertyDetails />} />
              <Route path="/search-properties" element={<PrivateRoute element={<SearchProperties />} />} />
              <Route path="/favorites" element={<PrivateRoute element={<Favorites />} />} />
              <Route path="/my-properties" element={<PrivateRoute element={<MyProperties />} />} />
              <Route path="/add-property" element={<PrivateRoute element={<AddProperty />} />} />
              <Route path="/edit-property/:id" element={<PrivateRoute element={<EditProperty />} />} />
              <Route path="/inquiries" element={<PrivateRoute element={<Inquiries />} />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Layout>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App