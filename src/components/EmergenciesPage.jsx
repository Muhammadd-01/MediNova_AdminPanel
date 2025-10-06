"use client"

import { AlertTriangle, Clock, MapPin, Eye, X } from "lucide-react"
import { useState } from "react"

export default function EmergenciesPage() {
  const [selectedEmergency, setSelectedEmergency] = useState(null)

  const [emergencies, setEmergencies] = useState([
    {
      id: "ER001",
      patient: "John Doe",
      severity: "Critical",
      time: "2 minutes ago",
      location: "Downtown Medical Center",
      description: "Cardiac arrest, patient unconscious",
      vitals: { heartRate: 45, bloodPressure: "80/40", oxygen: "85%" },
      status: "Active",
    },
    {
      id: "ER002",
      patient: "Sarah Wilson",
      severity: "High",
      time: "15 minutes ago",
      location: "City General Hospital",
      description: "Severe allergic reaction, difficulty breathing",
      vitals: { heartRate: 120, bloodPressure: "140/90", oxygen: "92%" },
      status: "In Progress",
    },
    {
      id: "ER003",
      patient: "Mike Johnson",
      severity: "Medium",
      time: "1 hour ago",
      location: "Emergency Care Center",
      description: "Broken arm from motorcycle accident",
      vitals: { heartRate: 85, bloodPressure: "120/80", oxygen: "98%" },
      status: "Stable",
    },
    {
      id: "ER004",
      patient: "Emily Davis",
      severity: "Low",
      time: "2 hours ago",
      location: "Regional Medical Center",
      description: "Minor cuts and bruises from fall",
      vitals: { heartRate: 72, bloodPressure: "110/70", oxygen: "99%" },
      status: "Treated",
    },
  ])

  const updateEmergencyStatus = (id, newStatus) => {
    setEmergencies((prev) =>
      prev.map((emergency) => (emergency.id === id ? { ...emergency, status: newStatus } : emergency)),
    )
  }

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "Critical":
        return "bg-red-500/20 text-red-400"
      case "High":
        return "bg-orange-500/20 text-orange-400"
      case "Medium":
        return "bg-yellow-500/20 text-yellow-400"
      case "Low":
        return "bg-green-500/20 text-green-400"
      default:
        return "bg-gray-500/20 text-gray-400"
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-red-500/20 text-red-400"
      case "In Progress":
        return "bg-blue-500/20 text-blue-400"
      case "Stable":
        return "bg-yellow-500/20 text-yellow-400"
      case "Treated":
        return "bg-green-500/20 text-green-400"
      case "Resolved":
        return "bg-green-500/20 text-green-400"
      default:
        return "bg-gray-500/20 text-gray-400"
    }
  }

  return (
    <div className="space-y-6 mt-16 md:mt-20"> {/* Position below navbar */}
      {/* Header */}
      <div className="relative bg-gradient-to-r from-white/10 to-white/20 backdrop-blur-lg border border-white/20 rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden">
        {/* Liquid Glass Effect Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="relative">
          <h1 className="text-2xl font-bold text-white mb-2">Emergency Reports</h1>
          <p className="text-white/60">Monitor and manage emergency cases in real-time.</p>
        </div>
      </div>

      {/* Emergency Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { icon: AlertTriangle, value: 12, title: "Critical", color: "text-red-400", bg: "bg-red-500/20" },
          { icon: AlertTriangle, value: 28, title: "High Priority", color: "text-orange-400", bg: "bg-orange-500/20" },
          { icon: Clock, value: 45, title: "In Progress", color: "text-blue-400", bg: "bg-blue-500/20" },
          { icon: AlertTriangle, value: 156, title: "Resolved Today", color: "text-green-400", bg: "bg-green-500/20" },
        ].map((stat, index) => (
          <div
            key={index}
            className="relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-4 overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-xl group"
          >
            {/* Liquid Glass Effect Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative flex items-center space-x-3">
              <div className={`p-2 ${stat.bg} rounded-2xl group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <div>
                <p className="text-xl font-bold text-white">{stat.value}</p>
                <p className="text-white/60 text-sm">{stat.title}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Emergency Reports Table */}
      <div className="relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 group">
        {/* Liquid Glass Effect Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="relative overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/5">
              <tr>
                <th className="text-left py-4 px-6 text-white font-semibold">Report ID</th>
                <th className="text-left py-4 px-6 text-white font-semibold">Patient</th>
                <th className="text-left py-4 px-6 text-white font-semibold">Severity</th>
                <th className="text-left py-4 px-6 text-white font-semibold">Status</th>
                <th className="text-left py-4 px-6 text-white font-semibold">Time</th>
                <th className="text-left py-4 px-6 text-white font-semibold">Location</th>
                <th className="text-left py-4 px-6 text-white font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {emergencies.map((emergency) => (
                <tr key={emergency.id} className="border-t border-white/10 hover:bg-white/5 transition-colors duration-300">
                  <td className="py-4 px-6 text-white font-mono">{emergency.id}</td>
                  <td className="py-4 px-6 text-white font-medium">{emergency.patient}</td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-2xl text-xs font-medium ${getSeverityColor(emergency.severity)}`}>
                      {emergency.severity}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-2xl text-xs font-medium ${getStatusColor(emergency.status)}`}>
                      {emergency.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2 text-white/70">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">{emergency.time}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2 text-white/70">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{emergency.location}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <button
                      onClick={() => setSelectedEmergency(emergency)}
                      className="relative flex items-center space-x-2 px-3 py-2 rounded-2xl bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 transition-all duration-300 group"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <Eye className="w-4 h-4 relative" />
                      <span className="text-sm relative">View</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Emergency Details Modal */}
      {selectedEmergency && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="relative bg-[#023e8a]/90 backdrop-blur-lg border border-white/20 rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-lg hover:shadow-xl transition-all duration-500 group">
            {/* Liquid Glass Effect Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Emergency Details - {selectedEmergency.id}</h2>
              <button
                onClick={() => setSelectedEmergency(null)}
                className="relative p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-all duration-300 group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <X className="w-5 h-5 relative" />
              </button>
            </div>

            <div className="relative space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Patient Information</h3>
                  <div className="space-y-2 text-white/70">
                    <p><span className="text-white">Name:</span> {selectedEmergency.patient}</p>
                    <p><span className="text-white">Report ID:</span> {selectedEmergency.id}</p>
                    <p><span className="text-white">Time:</span> {selectedEmergency.time}</p>
                    <p><span className="text-white">Location:</span> {selectedEmergency.location}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Vital Signs</h3>
                  <div className="space-y-2 text-white/70">
                    <p><span className="text-white">Heart Rate:</span> {selectedEmergency.vitals.heartRate} BPM</p>
                    <p><span className="text-white">Blood Pressure:</span> {selectedEmergency.vitals.bloodPressure}</p>
                    <p><span className="text-white">Oxygen Level:</span> {selectedEmergency.vitals.oxygen}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Description</h3>
                <p className="text-white/70 bg-white/10 p-4 rounded-2xl">{selectedEmergency.description}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Location Map</h3>
                <div className="relative h-48 bg-white/10 rounded-2xl flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20"></div>
                  <div className="relative text-center">
                    <MapPin className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                    <p className="text-white/60">Interactive Map View</p>
                    <p className="text-white/40 text-sm">{selectedEmergency.location}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => updateEmergencyStatus(selectedEmergency.id, "In Progress")}
                className="relative flex-1 py-2 px-4 rounded-2xl bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 transition-all duration-300 group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <span className="relative">Mark In Progress</span>
              </button>
              <button
                onClick={() => updateEmergencyStatus(selectedEmergency.id, "Resolved")}
                className="relative flex-1 py-2 px-4 rounded-2xl bg-green-500/20 hover:bg-green-500/30 text-green-400 transition-all duration-300 group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <span className="relative">Mark Resolved</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}