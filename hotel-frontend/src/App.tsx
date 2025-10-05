"use client"

import { Routes, Route, Navigate } from "react-router-dom"
import { useState, useEffect } from "react"
import LoginPage from "./pages/LoginPage"
import DashboardLayout from "./components/layout/DashboardLayout"
import HomePage from "./pages/HomePage"
import RoomsPage from "./pages/RoomsPage"
import BookingsPage from "./pages/BookingsPage"
import CustomersPage from "./pages/CustomersPage"
import BillingPage from "./pages/BillingPage"
import SettingsPage from "./pages/SettingsPage"

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Check if user is authenticated (e.g., check localStorage for token)
    const token = localStorage.getItem("authToken")
    setIsAuthenticated(!!token)
  }, [])

  const handleLogin = () => {
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    localStorage.removeItem("authToken")
    setIsAuthenticated(false)
  }

  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    )
  }

  return (
    <Routes>
      <Route path="/" element={<DashboardLayout onLogout={handleLogout} />}>
        <Route index element={<HomePage />} />
        <Route path="rooms" element={<RoomsPage />} />
        <Route path="bookings" element={<BookingsPage />} />
        <Route path="customers" element={<CustomersPage />} />
        <Route path="billing" element={<BillingPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
