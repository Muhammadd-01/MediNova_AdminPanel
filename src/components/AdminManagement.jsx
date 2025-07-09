"use client"

import { Shield, Plus, Search, Eye, Edit, Trash2, UserCheck, UserX, Mail, Phone } from "lucide-react"
import { useState } from "react"

export default function AdminManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [showAddAdmin, setShowAddAdmin] = useState(false)
  const [admins, setAdmins] = useState([
    {
      id: 1,
      name: "Dr. John Admin",
      email: "john.admin@medinova.com",
      phone: "+1 (555) 123-4567",
      role: "Super Admin",
      status: "Active",
      lastLogin: "2 hours ago",
      permissions: ["All Access"],
      createdAt: "2024-01-15",
    },
    {
      id: 2,
      name: "Sarah Manager",
      email: "sarah.manager@medinova.com",
      phone: "+1 (555) 234-5678",
      role: "Hospital Manager",
      status: "Active",
      lastLogin: "1 day ago",
      permissions: ["Hospital Management", "User Management"],
      createdAt: "2024-02-20",
    },
    {
      id: 3,
      name: "Mike Support",
      email: "mike.support@medinova.com",
      phone: "+1 (555) 345-6789",
      role: "Support Admin",
      status: "Inactive",
      lastLogin: "1 week ago",
      permissions: ["Emergency Management", "Reports"],
      createdAt: "2024-03-10",
    },
  ])

  const [newAdmin, setNewAdmin] = useState({
    name: "",
    email: "",
    phone: "",
    role: "Hospital Manager",
    permissions: [],
  })

  const filteredAdmins = admins.filter(
    (admin) =>
      admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.role.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddAdmin = (e) => {
    e.preventDefault()
    const admin = {
      id: admins.length + 1,
      ...newAdmin,
      status: "Active",
      lastLogin: "Never",
      createdAt: new Date().toISOString().split("T")[0],
    }
    setAdmins([...admins, admin])
    setNewAdmin({ name: "", email: "", phone: "", role: "Hospital Manager", permissions: [] })
    setShowAddAdmin(false)
  }

  const toggleAdminStatus = (id) => {
    setAdmins(
      admins.map((admin) =>
        admin.id === id ? { ...admin, status: admin.status === "Active" ? "Inactive" : "Active" } : admin,
      ),
    )
  }

  const deleteAdmin = (id) => {
    if (confirm("Are you sure you want to delete this admin?")) {
      setAdmins(admins.filter((admin) => admin.id !== id))
    }
  }

  const roleOptions = ["Super Admin", "Hospital Manager", "Emergency Coordinator", "Support Admin", "Reports Manager"]

  const permissionOptions = [
    "All Access",
    "Hospital Management",
    "User Management",
    "Emergency Management",
    "Reports",
    "System Settings",
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Admin Management</h1>
          <p className="text-white/60">Manage system administrators and their permissions.</p>
        </div>
        <button
          onClick={() => setShowAddAdmin(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-white text-[#023e8a] rounded-lg font-medium hover:bg-white/90 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add Admin</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <Shield className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <p className="text-xl font-bold text-white">{admins.length}</p>
              <p className="text-white/60 text-sm">Total Admins</p>
            </div>
          </div>
        </div>
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-500/20 rounded-lg">
              <UserCheck className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <p className="text-xl font-bold text-white">{admins.filter((a) => a.status === "Active").length}</p>
              <p className="text-white/60 text-sm">Active</p>
            </div>
          </div>
        </div>
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-red-500/20 rounded-lg">
              <UserX className="w-5 h-5 text-red-400" />
            </div>
            <div>
              <p className="text-xl font-bold text-white">{admins.filter((a) => a.status === "Inactive").length}</p>
              <p className="text-white/60 text-sm">Inactive</p>
            </div>
          </div>
        </div>
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <Shield className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <p className="text-xl font-bold text-white">{admins.filter((a) => a.role === "Super Admin").length}</p>
              <p className="text-white/60 text-sm">Super Admins</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
        <input
          type="text"
          placeholder="Search admins..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-white/10 border border-white/20 rounded-lg pl-10 pr-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
        />
      </div>

      {/* Admins Table */}
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/5">
              <tr>
                <th className="text-left py-4 px-6 text-white font-semibold">Admin</th>
                <th className="text-left py-4 px-6 text-white font-semibold">Role</th>
                <th className="text-left py-4 px-6 text-white font-semibold">Status</th>
                <th className="text-left py-4 px-6 text-white font-semibold">Last Login</th>
                <th className="text-left py-4 px-6 text-white font-semibold">Permissions</th>
                <th className="text-left py-4 px-6 text-white font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAdmins.map((admin) => (
                <tr key={admin.id} className="border-t border-white/10 hover:bg-white/5 transition-colors">
                  <td className="py-4 px-6">
                    <div>
                      <p className="text-white font-medium">{admin.name}</p>
                      <div className="flex items-center space-x-4 text-white/60 text-sm">
                        <div className="flex items-center space-x-1">
                          <Mail className="w-3 h-3" />
                          <span>{admin.email}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Phone className="w-3 h-3" />
                          <span>{admin.phone}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        admin.role === "Super Admin"
                          ? "bg-purple-500/20 text-purple-400"
                          : admin.role === "Hospital Manager"
                            ? "bg-blue-500/20 text-blue-400"
                            : "bg-green-500/20 text-green-400"
                      }`}
                    >
                      {admin.role}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        admin.status === "Active" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {admin.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-white/70">{admin.lastLogin}</td>
                  <td className="py-4 px-6">
                    <div className="flex flex-wrap gap-1">
                      {admin.permissions.slice(0, 2).map((permission, index) => (
                        <span key={index} className="px-2 py-1 bg-white/10 text-white/70 rounded text-xs">
                          {permission}
                        </span>
                      ))}
                      {admin.permissions.length > 2 && (
                        <span className="px-2 py-1 bg-white/10 text-white/70 rounded text-xs">
                          +{admin.permissions.length - 2}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-white/70 hover:text-blue-400 hover:bg-white/10 rounded-lg transition-all">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-white/70 hover:text-green-400 hover:bg-white/10 rounded-lg transition-all">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => toggleAdminStatus(admin.id)}
                        className={`p-2 hover:bg-white/10 rounded-lg transition-all ${
                          admin.status === "Active"
                            ? "text-red-400 hover:text-red-300"
                            : "text-green-400 hover:text-green-300"
                        }`}
                      >
                        {admin.status === "Active" ? <UserX className="w-4 h-4" /> : <UserCheck className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={() => deleteAdmin(admin.id)}
                        className="p-2 text-white/70 hover:text-red-400 hover:bg-white/10 rounded-lg transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Admin Modal */}
      {showAddAdmin && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#023e8a] border border-white/20 rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-white mb-6">Add New Admin</h2>

            <form onSubmit={handleAddAdmin} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white font-medium mb-2">Full Name *</label>
                  <input
                    type="text"
                    value={newAdmin.name}
                    onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })}
                    required
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
                    placeholder="Enter full name"
                  />
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Email Address *</label>
                  <input
                    type="email"
                    value={newAdmin.email}
                    onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
                    required
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
                    placeholder="Enter email address"
                  />
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Phone Number</label>
                  <input
                    type="tel"
                    value={newAdmin.phone}
                    onChange={(e) => setNewAdmin({ ...newAdmin, phone: e.target.value })}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
                    placeholder="Enter phone number"
                  />
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Role *</label>
                  <select
                    value={newAdmin.role}
                    onChange={(e) => setNewAdmin({ ...newAdmin, role: e.target.value })}
                    required
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/30"
                  >
                    {roleOptions.map((role) => (
                      <option key={role} value={role} className="bg-black text-white">
                        {role}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Permissions</label>
                <div className="grid grid-cols-2 gap-2">
                  {permissionOptions.map((permission) => (
                    <label key={permission} className="flex items-center space-x-2 text-white/70">
                      <input
                        type="checkbox"
                        checked={newAdmin.permissions.includes(permission)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setNewAdmin({ ...newAdmin, permissions: [...newAdmin.permissions, permission] })
                          } else {
                            setNewAdmin({
                              ...newAdmin,
                              permissions: newAdmin.permissions.filter((p) => p !== permission),
                            })
                          }
                        }}
                        className="rounded border-white/30 bg-white/10 text-white focus:ring-white/50"
                      />
                      <span className="text-sm">{permission}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-white text-[#023e8a] py-2 px-4 rounded-lg font-medium hover:bg-white/90 transition-all"
                >
                  Add Admin
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddAdmin(false)}
                  className="flex-1 bg-white/10 hover:bg-white/20 text-white py-2 px-4 rounded-lg transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
