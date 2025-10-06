"use client"

import { Bell, Search, User, Menu } from "lucide-react"
import { useState } from "react"

export default function Navbar({ onMenuToggle, isMobile }) {
  const [isSearchFocused, setIsSearchFocused] = useState(false)

  return (
    <div className="fixed top-0 left-0 lg:left-64 right-0 h-16 bg-gradient-to-b from-white/20 to-white/10 backdrop-blur-2xl border-b border-white/30 shadow-[0_4px_15px_rgba(0,0,0,0.2)] rounded-b-3xl z-40">
      <div className="flex items-center justify-between h-full px-4 lg:px-8">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          {isMobile && (
            <button
              onClick={onMenuToggle}
              className="group relative p-2.5 text-white/80 hover:text-white transition-all duration-300 bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 hover:bg-white/20 hover:backdrop-blur-sm shadow-inner"
            >
              <Menu className="w-5 h-5" />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          )}

          <div className="hidden md:block">
            <h2 className="text-lg font-semibold text-white tracking-tight">Welcome to MediNova</h2>
            <p className="text-white/60 text-sm">Healthcare Administration Platform</p>
          </div>

          {/* Search */}
          <div className="relative ml-4 md:ml-8">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
            <input
              type="text"
              placeholder="Search..."
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              className={`group bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl pl-10 pr-4 py-2.5 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-transparent transition-all duration-300 shadow-inner ${
                isSearchFocused ? "w-64" : "w-48 md:w-64"
              } hover:bg-white/15 hover:backdrop-blur-md`}
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-3 md:space-x-5">
          <button className="group relative p-2.5 text-white/80 hover:text-white transition-all duration-300 bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 hover:bg-white/20 hover:backdrop-blur-sm shadow-inner">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse border border-white/30"></span>
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>

          <div className="flex items-center space-x-3 pl-4 border-l border-white/20">
            <div className="w-9 h-9 bg-white/15 backdrop-blur-lg rounded-full flex items-center justify-center shadow-inner border border-white/20 group-hover:bg-white/20 transition-all duration-300">
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