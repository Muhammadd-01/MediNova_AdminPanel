"use client"

import { useState, useEffect } from "react"
import { Search, Trash2, CheckCircle, AlertCircle, X } from "lucide-react"
import axios from "axios"
import { motion, AnimatePresence } from "framer-motion"

export default function ContactPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(true)
  const [notification, setNotification] = useState(null)
  const [confirmDelete, setConfirmDelete] = useState(null)

  // Fetch contacts from backend
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await axios.get("http://localhost:4001/api/contacts")
        setContacts(res.data)
        setLoading(false)
      } catch (err) {
        console.error(err)
        setLoading(false)
      }
    }
    fetchContacts()
  }, [])

  // Delete contact function
  const handleDelete = (id) => {
    setConfirmDelete({ id })
  }

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:4001/api/contacts/${confirmDelete.id}`)
      setContacts(contacts.filter((c) => c._id !== confirmDelete.id))
      setNotification({ type: "success", message: "Contact deleted successfully!" })
      setConfirmDelete(null)
      setTimeout(() => setNotification(null), 4000)
    } catch (err) {
      console.error(err)
      setNotification({ type: "error", message: "Failed to delete contact." })
      setConfirmDelete(null)
      setTimeout(() => setNotification(null), 4000)
    }
  }

  // Filter contacts by search term
  const filteredContacts = contacts.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.message.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6 mt-16 md:mt-20 relative">

      {/* ======================= NOTIFICATIONS ======================= */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 50, scale: 0.8 }}
            className="fixed top-6 right-6 z-50 p-4 rounded-xl shadow-2xl w-72 backdrop-blur-lg border border-white/20 bg-white/10 text-white"
          >
            <div className="flex items-center gap-2">
              {notification.type === "success" ? (
                <CheckCircle className="w-6 h-6 text-green-400" />
              ) : (
                <AlertCircle className="w-6 h-6 text-yellow-400" />
              )}
              <p className="text-sm font-medium">{notification.message}</p>
              <button onClick={() => setNotification(null)} className="ml-auto">
                <X className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}

        {/* ======================= CONFIRM DELETE ======================= */}
        {confirmDelete && (
          <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 50, scale: 0.8 }}
            className="fixed top-6 right-6 z-50 p-6 rounded-xl shadow-2xl w-80 backdrop-blur-lg border border-white/30 bg-white/10 text-white"
          >
            <p className="mb-4 text-sm">
              Are you sure you want to delete this contact?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setConfirmDelete(null)}
                className="px-3 py-1 bg-white/20 rounded-xl hover:bg-white/30"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded-xl"
              >
                Delete
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="relative bg-gradient-to-r from-white/10 to-white/20 backdrop-blur-lg border border-white/20 rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="relative flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white mb-2">Contacts</h1>
            <p className="text-white/60">View messages submitted by users on the website.</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { title: "Total Contacts", value: contacts.length, color: "text-blue-400", bg: "bg-blue-500/20" },
          { title: "Recent 24h", value: contacts.filter(c => new Date() - new Date(c.createdAt) < 24*60*60*1000).length, color: "text-green-400", bg: "bg-green-500/20" },
        ].map((stat, index) => (
          <div
            key={index}
            className="relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-4 overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-xl group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative flex items-center space-x-3">
              <div className={`p-2 ${stat.bg} rounded-2xl group-hover:scale-110 transition-transform duration-300`}>
                <div className={`w-5 h-5 ${stat.color}`}></div>
              </div>
              <div>
                <p className="text-xl font-bold text-white">{stat.value}</p>
                <p className="text-white/60 text-sm">{stat.title}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
        <input
          type="text"
          placeholder="Search contacts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl pl-10 pr-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all duration-300 hover:shadow-lg"
        />
      </div>

      {/* Contacts Table */}
      <div className="relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 group">
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="relative overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/5">
              <tr>
                <th className="text-left py-4 px-6 text-white font-semibold">Name</th>
                <th className="text-left py-4 px-6 text-white font-semibold">Email</th>
                <th className="text-left py-4 px-6 text-white font-semibold">Message</th>
                <th className="text-left py-4 px-6 text-white font-semibold">Submitted At</th>
                <th className="text-left py-4 px-6 text-white font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="py-6 text-center text-white/60">Loading contacts...</td>
                </tr>
              ) : filteredContacts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-6 text-center text-white/60">No contacts found.</td>
                </tr>
              ) : (
                filteredContacts.map((c) => (
                  <tr key={c._id} className="border-t border-white/10 hover:bg-white/5 transition-colors duration-300">
                    <td className="py-4 px-6 text-white/80">{c.name}</td>
                    <td className="py-4 px-6 text-white/70">{c.email}</td>
                    <td className="py-4 px-6 text-white/70">{c.message}</td>
                    <td className="py-4 px-6 text-white/60">{new Date(c.createdAt).toLocaleString()}</td>
                    <td className="py-4 px-6 flex space-x-2">
                      <button
                        onClick={() => handleDelete(c._id)}
                        className="p-2 text-white/70 hover:text-red-400 hover:bg-white/10 rounded-2xl transition-all duration-300"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
