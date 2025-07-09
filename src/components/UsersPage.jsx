"use client"

import { Search, Filter, Eye, Edit, Trash2, ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterRole, setFilterRole] = useState("all")

  const users = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      email: "sarah.johnson@medicare.com",
      role: "Doctor",
      status: "Active",
      lastLogin: "2 hours ago",
    },
    {
      id: 2,
      name: "John Smith",
      email: "john.smith@gmail.com",
      role: "Patient",
      status: "Active",
      lastLogin: "1 day ago",
    },
    {
      id: 3,
      name: "Dr. Michael Brown",
      email: "michael.brown@medicare.com",
      role: "Doctor",
      status: "Inactive",
      lastLogin: "1 week ago",
    },
    {
      id: 4,
      name: "Emily Davis",
      email: "emily.davis@gmail.com",
      role: "Patient",
      status: "Active",
      lastLogin: "3 hours ago",
    },
    { id: 5, name: "Admin User", email: "admin@medicare.com", role: "Admin", status: "Active", lastLogin: "Online" },
    {
      id: 6,
      name: "Dr. Lisa Wilson",
      email: "lisa.wilson@medicare.com",
      role: "Doctor",
      status: "Active",
      lastLogin: "5 hours ago",
    },
  ]

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = filterRole === "all" || user.role.toLowerCase() === filterRole.toLowerCase()
    return matchesSearch && matchesRole
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white mb-2">User Management</h1>
        <p className="text-white/60">Manage all users, doctors, and patients in the system.</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/10 border border-white/20 rounded-lg pl-10 pr-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4 z-10" />
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="bg-white/10 border border-white/20 rounded-lg pl-10 pr-8 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/30 appearance-none cursor-pointer"
          >
            <option value="all" className="bg-black text-white">
              All Roles
            </option>
            <option value="doctor" className="bg-black text-white">
              Doctor
            </option>
            <option value="patient" className="bg-black text-white">
              Patient
            </option>
            <option value="admin" className="bg-black text-white">
              Admin
            </option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/5">
              <tr>
                <th className="text-left py-4 px-6 text-white font-semibold">User</th>
                <th className="text-left py-4 px-6 text-white font-semibold">Role</th>
                <th className="text-left py-4 px-6 text-white font-semibold">Status</th>
                <th className="text-left py-4 px-6 text-white font-semibold">Last Login</th>
                <th className="text-left py-4 px-6 text-white font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-t border-white/10 hover:bg-white/5 transition-colors">
                  <td className="py-4 px-6">
                    <div>
                      <p className="text-white font-medium">{user.name}</p>
                      <p className="text-white/60 text-sm">{user.email}</p>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        user.role === "Doctor"
                          ? "bg-blue-500/20 text-blue-400"
                          : user.role === "Patient"
                            ? "bg-green-500/20 text-green-400"
                            : "bg-purple-500/20 text-purple-400"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        user.status === "Active" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-white/70">{user.lastLogin}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-white/70 hover:text-blue-400 hover:bg-white/10 rounded-lg transition-all">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-white/70 hover:text-green-400 hover:bg-white/10 rounded-lg transition-all">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-white/70 hover:text-red-400 hover:bg-white/10 rounded-lg transition-all">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-white/10">
          <p className="text-white/60 text-sm">Showing 1-6 of {filteredUsers.length} users</p>
          <div className="flex items-center space-x-2">
            <button className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-all">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="px-3 py-1 bg-white/10 text-white rounded-lg">1</button>
            <button className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-all">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
