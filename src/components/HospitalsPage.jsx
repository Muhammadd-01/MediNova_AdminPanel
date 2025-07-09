"use client"

import { Building2, MapPin, Check, X, Eye } from "lucide-react"
import { useState } from "react"

export default function HospitalsPage() {
  const [hospitals, setHospitals] = useState([
    {
      id: 1,
      name: "City General Hospital",
      city: "New York",
      type: "Government",
      status: "Verified",
      beds: 450,
      doctors: 89,
      rating: 4.8,
    },
    {
      id: 2,
      name: "MediCare Private Clinic",
      city: "Los Angeles",
      type: "Private",
      status: "Pending",
      beds: 120,
      doctors: 34,
      rating: 4.5,
    },
    {
      id: 3,
      name: "Emergency Care Center",
      city: "Chicago",
      type: "Private",
      status: "Verified",
      beds: 200,
      doctors: 56,
      rating: 4.7,
    },
    {
      id: 4,
      name: "Regional Medical Center",
      city: "Houston",
      type: "Government",
      status: "Rejected",
      beds: 380,
      doctors: 72,
      rating: 4.2,
    },
    {
      id: 5,
      name: "Specialty Heart Institute",
      city: "Miami",
      type: "Private",
      status: "Pending",
      beds: 150,
      doctors: 28,
      rating: 4.9,
    },
  ])

  const approveHospital = (id) => {
    setHospitals((prev) =>
      prev.map((hospital) => (hospital.id === id ? { ...hospital, status: "Verified" } : hospital)),
    )
  }

  const rejectHospital = (id) => {
    setHospitals((prev) =>
      prev.map((hospital) => (hospital.id === id ? { ...hospital, status: "Rejected" } : hospital)),
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white mb-2">Hospital Management</h1>
        <p className="text-white/60">Manage hospital registrations and verification status.</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-500/20 rounded-lg">
              <Check className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <p className="text-xl font-bold text-white">156</p>
              <p className="text-white/60 text-sm">Verified</p>
            </div>
          </div>
        </div>
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-yellow-500/20 rounded-lg">
              <Building2 className="w-5 h-5 text-yellow-400" />
            </div>
            <div>
              <p className="text-xl font-bold text-white">23</p>
              <p className="text-white/60 text-sm">Pending</p>
            </div>
          </div>
        </div>
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-red-500/20 rounded-lg">
              <X className="w-5 h-5 text-red-400" />
            </div>
            <div>
              <p className="text-xl font-bold text-white">8</p>
              <p className="text-white/60 text-sm">Rejected</p>
            </div>
          </div>
        </div>
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <MapPin className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <p className="text-xl font-bold text-white">187</p>
              <p className="text-white/60 text-sm">Total</p>
            </div>
          </div>
        </div>
      </div>

      {/* Hospitals List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {hospitals.map((hospital) => (
          <div
            key={hospital.id}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-white/10 rounded-lg">
                  <Building2 className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">{hospital.name}</h3>
                  <div className="flex items-center space-x-2 text-white/60 text-sm">
                    <MapPin className="w-4 h-4" />
                    <span>{hospital.city}</span>
                  </div>
                </div>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  hospital.status === "Verified"
                    ? "bg-green-500/20 text-green-400"
                    : hospital.status === "Pending"
                      ? "bg-yellow-500/20 text-yellow-400"
                      : "bg-red-500/20 text-red-400"
                }`}
              >
                {hospital.status}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center">
                <p className="text-xl font-bold text-white">{hospital.beds}</p>
                <p className="text-white/60 text-xs">Beds</p>
              </div>
              <div className="text-center">
                <p className="text-xl font-bold text-white">{hospital.doctors}</p>
                <p className="text-white/60 text-xs">Doctors</p>
              </div>
              <div className="text-center">
                <p className="text-xl font-bold text-white">{hospital.rating}</p>
                <p className="text-white/60 text-xs">Rating</p>
              </div>
            </div>

            <div className="flex items-center space-x-2 mb-4">
              <span
                className={`px-2 py-1 rounded text-xs ${
                  hospital.type === "Government" ? "bg-blue-500/20 text-blue-400" : "bg-purple-500/20 text-purple-400"
                }`}
              >
                {hospital.type}
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <button className="flex-1 flex items-center justify-center space-x-2 py-2 px-4 bg-white/10 hover:bg-white/20 rounded-lg transition-all text-white">
                <Eye className="w-4 h-4" />
                <span>View Details</span>
              </button>
              {hospital.status === "Pending" && (
                <>
                  <button
                    onClick={() => approveHospital(hospital.id)}
                    className="flex items-center justify-center p-2 bg-green-500/20 hover:bg-green-500/30 text-green-400 rounded-lg transition-all"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => rejectHospital(hospital.id)}
                    className="flex items-center justify-center p-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-all"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
