"use client"

import { Bell, Search, User, Menu } from "lucide-react"
import { useState } from "react"

export default function Navbar({ onMenuToggle, isMobile }) {
  const [isSearchFocused, setIsSearchFocused] = useState(false)

  return (
    <div className="fixed top-0 left-0 lg:left-64 right-0 h-16 bg-[#023e8a]/95 backdrop-blur-sm border-b border-white/10 z-30">
      <div className="flex items-center justify-between h-full px-4 lg:px-6">
        <div className="flex items-center space-x-4">
          {isMobile && (
            <button
              onClick={onMenuToggle}
              className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-all lg:hidden"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}

          <div className="hidden md:block">
            <h2 className="text-lg font-semibold text-white">Welcome to MediNova</h2>
            <p className="text-white/60 text-sm">Healthcare Administration Platform</p>
          </div>

          <div className="relative ml-4 md:ml-8">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
            <input
              type="text"
              placeholder="Search..."
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              className={`bg-white/10 border border-white/20 rounded-lg pl-10 pr-4 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all ${
                isSearchFocused ? "w-64" : "w-48 md:w-64"
              }`}
            />
          </div>
        </div>

        <div className="flex items-center space-x-2 md:space-x-4">
          <button className="relative p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
          </button>

          <div className="flex items-center space-x-3 pl-4 border-l border-white/20">
            <div className="w-8 h-8 bg-gradient-to-br from-white/30 to-white/10 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <div className="hidden md:block">
              <p className="text-white text-sm font-medium">Dr. Admin</p>
              <p className="text-white/60 text-xs">System Administrator</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
