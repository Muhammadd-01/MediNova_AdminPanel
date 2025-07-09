"use client"

import { useState, useEffect } from "react"
import ThreeBackground from "./components/ThreeBackground"
import Sidebar from "./components/Sidebar"
import Navbar from "./components/Navbar"
import Dashboard from "./components/Dashboard"
import UsersPage from "./components/UsersPage"
import HospitalsPage from "./components/HospitalsPage"
import EmergenciesPage from "./components/EmergenciesPage"
import AddHospitalForm from "./components/AddHospitalForm"
import ProfilePage from "./components/ProfilePage"
import LoginPage from "./components/LoginPage"
import AdminManagement from "./components/AdminManagement"
import SystemSettings from "./components/SystemSettings"
import ReportsPage from "./components/ReportsPage"

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
    setCurrentPage("dashboard")
    setSidebarOpen(false)
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
