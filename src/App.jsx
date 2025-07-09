"use client"

import { useState, useEffect } from "react"
import { ThreeBackground } from "./components/three-background"
import { Sidebar } from "./components/sidebar"
import { Navbar } from "./components/navbar"
import { Dashboard } from "./components/dashboard"
import { UsersPage } from "./components/users-page"
import { HospitalsPage } from "./components/hospitals-page"
import { EmergenciesPage } from "./components/emergencies-page"
import { AddHospitalForm } from "./components/add-hospital-form"
import { ProfilePage } from "./components/profile-page"
import { LoginPage } from "./components/login-page"
import { AdminManagement } from "./components/admin-management"
import { SystemSettings } from "./components/system-settings"
import { ReportsPage } from "./components/reports-page"

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentPage, setCurrentPage] = useState("dashboard")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const handleLogin = () => {
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setCurrentPage("dashboard") // Reset to dashboard when logging out
    setSidebarOpen(false) // Close sidebar on logout
  }

  const handleMenuToggle = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const handleSidebarClose = () => {
    setSidebarOpen(false)
  }

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <Dashboard />
      case "users":
        return <UsersPage />
      case "hospitals":
        return <HospitalsPage />
      case "emergencies":
        return <EmergenciesPage />
      case "add-hospital":
        return <AddHospitalForm />
      case "profile":
        return <ProfilePage />
      case "admin-management":
        return <AdminManagement />
      case "system-settings":
        return <SystemSettings />
      case "reports":
        return <ReportsPage />
      default:
        return <Dashboard />
    }
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#023e8a] text-white relative">
        <ThreeBackground />
        <LoginPage onLogin={handleLogin} />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#023e8a] text-white relative">
      <ThreeBackground />

      <div className="flex relative z-10">
        <Sidebar
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          onLogout={handleLogout}
          isOpen={sidebarOpen}
          onClose={handleSidebarClose}
        />

        <div className="flex-1 lg:ml-64">
          <Navbar onMenuToggle={handleMenuToggle} isMobile={isMobile} />

          <main className="pt-16 p-4 md:p-6 min-h-screen">{renderCurrentPage()}</main>
        </div>
      </div>
    </div>
  )
}
