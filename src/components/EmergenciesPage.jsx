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
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white mb-2">Emergency Reports</h1>
        <p className="text-white/60">Monitor and manage emergency cases in real-time.</p>
      </div>

      {/* Emergency Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="backdrop-blur-md border border-white/10 rounded-2xl p-4 bg-white/5">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-red-500/20 rounded-full">
              <AlertTriangle className="w-5 h-5 text-red-400" />
            </div>
            <div>
              <p className="text-xl font-bold text-white">12</p>
              <p className="text-white/60 text-sm">Critical</p>
            </div>
          </div>
        </div>
        <div className="backdrop-blur-md border border-white/10 rounded-2xl p-4 bg-white/5">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-orange-500/20 rounded-full">
              <AlertTriangle className="w-5 h-5 text-orange-400" />
            </div>
            <div>
              <p className="text-xl font-bold text-white">28</p>
              <p className="text-white/60 text-sm">High Priority</p>
            </div>
          </div>
        </div>
        <div className="backdrop-blur-md border border-white/10 rounded-2xl p-4 bg-white/5">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-500/20 rounded-full">
              <Clock className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <p className="text-xl font-bold text-white">45</p>
              <p className="text-white/60 text-sm">In Progress</p>
            </div>
          </div>
        </div>
        <div className="backdrop-blur-md border border-white/10 rounded-2xl p-4 bg-white/5">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-500/20 rounded-full">
              <AlertTriangle className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <p className="text-xl font-bold text-white">156</p>
              <p className="text-white/60 text-sm">Resolved Today</p>
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Reports Table */}
      <div className="backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden bg-white/5">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/10">
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
                <tr key={emergency.id} className="border-t border-white/10 hover:bg-white/10 transition-colors">
                  <td className="py-4 px-6 text-white font-mono">{emergency.id}</td>
                  <td className="py-4 px-6 text-white font-medium">{emergency.patient}</td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getSeverityColor(emergency.severity)}`}>
                      {emergency.severity}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(emergency.status)}`}>
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
                      className="flex items-center space-x-2 px-3 py-2 rounded-2xl bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 transition-all"
                    >
                      <Eye className="w-4 h-4" />
                      <span className="text-sm">View</span>
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
        <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-[#023e8a]/95 border border-white/20 rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Emergency Details - {selectedEmergency.id}</h2>
              <button
                onClick={() => setSelectedEmergency(null)}
                className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6">
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
                <p className="text-white/70 bg-white/10 p-4 rounded-xl">{selectedEmergency.description}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Location Map</h3>
                <div className="h-48 bg-white/10 rounded-xl flex items-center justify-center">
                  <div className="text-center">
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
                className="flex-1 py-2 px-4 rounded-2xl bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 transition-all"
              >
                Mark In Progress
              </button>
              <button
                onClick={() => updateEmergencyStatus(selectedEmergency.id, "Resolved")}
                className="flex-1 py-2 px-4 rounded-2xl bg-green-500/20 hover:bg-green-500/30 text-green-400 transition-all"
              >
                Mark Resolved
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
