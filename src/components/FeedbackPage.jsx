"use client"

import { useState, useEffect } from "react"
import { Search, Eye, Mail } from "lucide-react"
import axios from "axios"

export default function FeedbackPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [feedbacks, setFeedbacks] = useState([])
  const [loading, setLoading] = useState(true)

  // Fetch feedbacks from backend
  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const res = await axios.get("http://localhost:4001/api/feedbacks") // backend port of admin panel
        setFeedbacks(res.data)
        setLoading(false)
      } catch (err) {
        console.error(err)
        setLoading(false)
      }
    }
    fetchFeedbacks()
  }, [])

  // Filter feedbacks by search term
  const filteredFeedbacks = feedbacks.filter(
    (fb) =>
      fb.feedback.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (fb.user?.name && fb.user.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (fb.user?.email && fb.user.email.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  return (
    <div className="space-y-6 mt-16 md:mt-20">
      {/* Header */}
      <div className="relative bg-gradient-to-r from-white/10 to-white/20 backdrop-blur-lg border border-white/20 rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="relative flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white mb-2">Feedbacks</h1>
            <p className="text-white/60">View feedbacks submitted by users on the website.</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { title: "Total Feedbacks", value: feedbacks.length, color: "text-blue-400", bg: "bg-blue-500/20" },
          { title: "Recent 24h", value: feedbacks.filter(fb => new Date() - new Date(fb.createdAt) < 24*60*60*1000).length, color: "text-green-400", bg: "bg-green-500/20" },
          { title: "With User Info", value: feedbacks.filter(fb => fb.user).length, color: "text-purple-400", bg: "bg-purple-500/20" },
          { title: "Anonymous", value: feedbacks.filter(fb => !fb.user).length, color: "text-red-400", bg: "bg-red-500/20" },
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
          placeholder="Search feedbacks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl pl-10 pr-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all duration-300 hover:shadow-lg"
        />
      </div>

      {/* Feedbacks Table */}
      <div className="relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 group">
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="relative overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/5">
              <tr>
                <th className="text-left py-4 px-6 text-white font-semibold">Feedback</th>
                <th className="text-left py-4 px-6 text-white font-semibold">User Name</th>
                <th className="text-left py-4 px-6 text-white font-semibold">Email</th>
                <th className="text-left py-4 px-6 text-white font-semibold">Submitted At</th>
                <th className="text-left py-4 px-6 text-white font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="py-6 text-center text-white/60">Loading feedbacks...</td>
                </tr>
              ) : filteredFeedbacks.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-6 text-center text-white/60">No feedbacks found.</td>
                </tr>
              ) : (
                filteredFeedbacks.map((fb) => (
                  <tr key={fb._id} className="border-t border-white/10 hover:bg-white/5 transition-colors duration-300">
                    <td className="py-4 px-6 text-white/80">{fb.feedback}</td>
                    <td className="py-4 px-6 text-white/70">{fb.user?.name || "Anonymous"}</td>
                    <td className="py-4 px-6 text-white/70">{fb.user?.email || "-"}</td>
                    <td className="py-4 px-6 text-white/60">{new Date(fb.createdAt).toLocaleString()}</td>
                    <td className="py-4 px-6">
                      <button className="p-2 text-white/70 hover:text-blue-400 hover:bg-white/10 rounded-2xl transition-all duration-300">
                        <Eye className="w-4 h-4" />
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
