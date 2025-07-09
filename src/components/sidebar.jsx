"use client"

import {
  Home,
  Users,
  Building2,
  AlertTriangle,
  Plus,
  User,
  LogOut,
  Activity,
  Settings,
  Shield,
  BarChart3,
  X,
} from "lucide-react"
import { useState } from "react"

export function Sidebar({ currentPage, setCurrentPage, onLogout, isOpen, onClose }) {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "users", label: "Users", icon: Users },
    { id: "hospitals", label: "Hospitals", icon: Building2 },
    { id: "emergencies", label: "Emergencies", icon: AlertTriangle },
    { id: "add-hospital", label: "Add Hospital", icon: Plus },
    { id: "admin-management", label: "Admin Management", icon: Shield },
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
    if (onClose) {
      onClose() // Close mobile menu
    }
  }

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden" onClick={onClose} />}

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-full w-64 bg-[#023e8a]/95 backdrop-blur-sm border-r border-white/10 z-50 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        {/* Mobile Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-all lg:hidden"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <Activity className="w-6 h-6 text-[#023e8a]" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">MediNova</h1>
              <p className="text-white/60 text-sm">Admin Panel</p>
            </div>
          </div>

          <nav className="space-y-2 max-h-[calc(100vh-200px)] overflow-y-auto">
            {menuItems.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  onClick={() => handleMenuItemClick(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    currentPage === item.id
                      ? "bg-white/10 text-white border border-white/20"
                      : "text-white/70 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium text-sm">{item.label}</span>
                </button>
              )
            })}
          </nav>
        </div>

        <div className="absolute bottom-6 left-6 right-6">
          <button
            onClick={() => setShowLogoutConfirm(true)}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-white/70 hover:bg-red-500/10 hover:text-red-400 transition-all duration-200"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#023e8a] border border-white/20 rounded-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-white mb-4">Confirm Logout</h3>
            <p className="text-white/70 mb-6">Are you sure you want to logout from MediNova Admin Panel?</p>
            <div className="flex space-x-3">
              <button
                onClick={handleLogout}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition-all"
              >
                Yes, Logout
              </button>
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="flex-1 bg-white/10 hover:bg-white/20 text-white py-2 px-4 rounded-lg transition-all"
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
