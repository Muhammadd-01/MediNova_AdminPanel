"use client"

import { 
  Home, Users, Building2, AlertTriangle, Plus, User, LogOut, Activity, Settings, Shield, BarChart3, X, Menu 
} from "lucide-react"
import { useState } from "react"

export default function Sidebar({ currentPage, setCurrentPage, onLogout }) {
  const [isOpen, setIsOpen] = useState(true)
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "users", label: "Users", icon: Users },
    { id: "hospitals", label: "Hospitals", icon: Building2 },
    { id: "emergencies", label: "Emergencies", icon: AlertTriangle },
    { id: "add-hospital", label: "Add Hospital", icon: Plus },
    { id: "feedback", label: "Feedbacks", icon: Shield },
    { id: "reports", label: "Reports", icon: BarChart3 },
    { id: "system-settings", label: "System Settings", icon: Settings },
    { id: "profile", label: "Profile", icon: User },
  ]

  const handleLogout = () => {
    setShowLogoutConfirm(false)
    onLogout()
  }

  const handleMenuItemClick = (itemId) => {
    setCurrentPage(itemId)
  }

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-full transition-all duration-500 ease-in-out
          ${isOpen ? "w-64" : "w-16"} bg-gradient-to-br from-[#023e8a]/50 to-[#03045e]/50
          backdrop-blur-xl border-r border-white/10 shadow-2xl rounded-r-3xl
          ${isOpen ? "translate-x-0" : "-translate-x-0"} lg:translate-x-0 z-50
          overflow-hidden`}
      >
        {/* Toggle Button */}
        <button
          onClick={toggleSidebar}
          className="absolute top-4 right-4 p-2 text-white/80 hover:text-white 
            hover:bg-white/10 rounded-full transition-all duration-300 z-50
            backdrop-blur-sm border border-white/10"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        <div className="p-4">
          {/* Logo Section */}
          <div className={`flex items-center ${isOpen ? "space-x-3 mb-8" : "justify-center mb-6"} transition-all duration-300`}>
            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center shadow-lg backdrop-blur-sm border border-white/10">
              <Activity className="w-6 h-6 text-[#023e8a]" />
            </div>
            {isOpen && (
              <div>
                <h1 className="text-xl font-bold text-white">MediNova</h1>
                <p className="text-white/60 text-sm">Admin Panel</p>
              </div>
            )}
          </div>

          {/* Menu Items */}
          <nav className="space-y-2 max-h-[calc(100vh-200px)] overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
            {menuItems.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  onClick={() => handleMenuItemClick(item.id)}
                  className={`w-full flex items-center relative overflow-hidden
                    ${isOpen ? "space-x-3 px-4" : "justify-center"} py-3 
                    rounded-2xl transition-all duration-300 ease-in-out
                    group
                    ${
                      currentPage === item.id
                        ? "bg-white/20 text-white shadow-lg border border-white/20 scale-[1.02]"
                        : "text-white/70 hover:text-white"
                    }`}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-r from-white/5 to-white/10 
                      opacity-0 group-hover:opacity-100 transition-opacity duration-500
                      transform group-hover:scale-110 blur-md rounded-2xl
                      ${currentPage === item.id ? "opacity-30" : ""}`}
                  ></div>
                  <Icon className="w-5 h-5 z-10" />
                  {isOpen && (
                    <span className="font-medium text-sm z-10">{item.label}</span>
                  )}
                </button>
              )
            })}
          </nav>
        </div>

        {/* Logout Button */}
        <div className="absolute bottom-6 left-0 right-0 px-4">
          <button
            onClick={() => setShowLogoutConfirm(true)}
            className={`w-full flex items-center relative overflow-hidden
              ${isOpen ? "space-x-3 px-4" : "justify-center"} py-3 
              rounded-2xl text-white/70 transition-all duration-300 ease-in-out
              group hover:text-red-400`}
          >
            <div
              className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-red-500/20 
                opacity-0 group-hover:opacity-100 transition-opacity duration-500
                transform group-hover:scale-110 blur-md rounded-2xl"
            ></div>
            <LogOut className="w-5 h-5 z-10" />
            {isOpen && <span className="font-medium text-sm z-10">Logout</span>}
          </button>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-[#023e8a]/80 to-[#03045e]/80 backdrop-blur-lg border border-white/20 rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl">
            <h3 className="text-lg font-semibold text-white mb-4">Confirm Logout</h3>
            <p className="text-white/70 mb-6">Are you sure you want to logout from MediNova Admin Panel?</p>
            <div className="flex space-x-3">
              <button
                onClick={handleLogout}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-xl transition-all"
              >
                Yes, Logout
              </button>
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="flex-1 bg-white/10 hover:bg-white/20 text-white py-2 px-4 rounded-xl transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}