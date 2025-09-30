"use client"

import { Building2, MapPin, Upload, Loader } from "lucide-react"
import { useState } from "react"

export default function AddHospitalForm({ isSidebarOpen }) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    type: "private",
    city: "",
    address: "",
    phone: "",
    email: "",
    beds: "",
    specialties: "",
    description: "",
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setLoading(false)
    alert("Hospital added successfully!")

    // Reset form
    setFormData({
      name: "",
      type: "private",
      city: "",
      address: "",
      phone: "",
      email: "",
      beds: "",
      specialties: "",
      description: "",
    })
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div
      className={`mt-16 transition-all duration-500 ease-in-out
        ${isSidebarOpen ? "lg:ml-64 lg:mr-8" : "lg:ml-16 lg:mr-8"} 
        px-4 sm:px-6 lg:px-8 py-8
        min-h-[calc(100vh-64px)] 
        w-[calc(100%-4rem)] lg:w-[calc(100%-${isSidebarOpen ? '16rem' : '4rem'})]
        bg-gradient-to-br from-[#023e8a]/10 to-[#03045e]/10
        backdrop-blur-xl rounded-3xl mx-auto
        border border-white/10 shadow-2xl`}
    >
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Add New Hospital</h1>
        <p className="text-white/60">Register a new hospital in the MediCare network.</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div className="relative group">
            <label className="block text-white font-medium mb-2">Hospital Name *</label>
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform group-hover:scale-105 blur-md rounded-3xl"></div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full bg-white/10 border border-white/20 rounded-3xl px-4 py-3 text-white placeholder-white/50 
                         focus:outline-none focus:ring-2 focus:ring-white/40 transition-all backdrop-blur-lg relative z-10"
              placeholder="Enter hospital name"
            />
          </div>

          {/* Type */}
          <div className="relative group">
            <label className="block text-white font-medium mb-2">Hospital Type *</label>
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform group-hover:scale-105 blur-md rounded-3xl"></div>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
              className="w-full bg-white/10 border border-white/20 rounded-3xl px-4 py-3 text-white 
                         focus:outline-none focus:ring-2 focus:ring-white/40 cursor-pointer transition-all backdrop-blur-lg relative z-10"
            >
              <option value="private" className="bg-[#03045e] text-white">Private</option>
              <option value="government" className="bg-[#03045e] text-white">Government</option>
              <option value="non-profit" className="bg-[#03045e] text-white">Non-Profit</option>
            </select>
          </div>

          {/* City */}
          <div className="relative group">
            <label className="block text-white font-medium mb-2">City *</label>
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform group-hover:scale-105 blur-md rounded-3xl"></div>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
              className="w-full bg-white/10 border border-white/20 rounded-3xl px-4 py-3 text-white placeholder-white/50 
                         focus:outline-none focus:ring-2 focus:ring-white/40 transition-all backdrop-blur-lg relative z-10"
              placeholder="Enter city"
            />
          </div>

          {/* Phone */}
          <div className="relative group">
            <label className="block text-white font-medium mb-2">Phone Number *</label>
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform group-hover:scale-105 blur-md rounded-3xl"></div>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full bg-white/10 border border-white/20 rounded-3xl px-4 py-3 text-white placeholder-white/50 
                         focus:outline-none focus:ring-2 focus:ring-white/40 transition-all backdrop-blur-lg relative z-10"
              placeholder="Enter phone number"
            />
          </div>

          {/* Email */}
          <div className="relative group">
            <label className="block text-white font-medium mb-2">Email Address *</label>
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform group-hover:scale-105 blur-md rounded-3xl"></div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full bg-white/10 border border-white/20 rounded-3xl px-4 py-3 text-white placeholder-white/50 
                         focus:outline-none focus:ring-2 focus:ring-white/40 transition-all backdrop-blur-lg relative z-10"
              placeholder="Enter email address"
            />
          </div>

          {/* Beds */}
          <div className="relative group">
            <label className="block text-white font-medium mb-2">Number of Beds</label>
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform group-hover:scale-105 blur-md rounded-3xl"></div>
            <input
              type="number"
              name="beds"
              value={formData.beds}
              onChange={handleChange}
              className="w-full bg-white/10 border border-white/20 rounded-3xl px-4 py-3 text-white placeholder-white/50 
                         focus:outline-none focus:ring-2 focus:ring-white/40 transition-all backdrop-blur-lg relative z-10"
              placeholder="Enter number of beds"
            />
          </div>
        </div>

        {/* Address */}
        <div className="relative group">
          <label className="block text-white font-medium mb-2">Full Address *</label>
          <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform group-hover:scale-105 blur-md rounded-3xl"></div>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            rows={3}
            className="w-full bg-white/10 border border-white/20 rounded-3xl px-4 py-3 text-white placeholder-white/50 
                       focus:outline-none focus:ring-2 focus:ring-white/40 transition-all backdrop-blur-lg relative z-10"
            placeholder="Enter complete address"
          />
        </div>

        {/* Specialties */}
        <div className="relative group">
          <label className="block text-white font-medium mb-2">Specialties</label>
          <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform group-hover:scale-105 blur-md rounded-3xl"></div>
          <input
            type="text"
            name="specialties"
            value={formData.specialties}
            onChange={handleChange}
            className="w-full bg-white/10 border border-white/20 rounded-3xl px-4 py-3 text-white placeholder-white/50 
                       focus:outline-none focus:ring-2 focus:ring-white/40 transition-all backdrop-blur-lg relative z-10"
            placeholder="e.g., Cardiology, Neurology, Emergency Care"
          />
        </div>

        {/* Description */}
        <div className="relative group">
          <label className="block text-white font-medium mb-2">Description</label>
          <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform group-hover:scale-105 blur-md rounded-3xl"></div>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="w-full bg-white/10 border border-white/20 rounded-3xl px-4 py-3 text-white placeholder-white/50 
                       focus:outline-none focus:ring-2 focus:ring-white/40 transition-all backdrop-blur-lg relative z-10"
            placeholder="Brief description about the hospital"
          />
        </div>

        {/* Location Picker */}
        <div className="relative group">
          <label className="block text-white font-medium mb-2">Location on Map</label>
          <div
            className="h-48 bg-white/5 border border-white/20 rounded-3xl flex items-center justify-center 
                       backdrop-blur-lg transition-all duration-300 group-hover:scale-[1.01]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform group-hover:scale-105 blur-md rounded-3xl"></div>
            <div className="text-center relative z-10">
              <MapPin className="w-8 h-8 text-blue-400 mx-auto mb-2" />
              <p className="text-white/60">Click to select location</p>
              <p className="text-white/40 text-sm">Interactive map picker</p>
            </div>
          </div>
        </div>

        {/* Image Upload */}
        <div className="relative group">
          <label className="block text-white font-medium mb-2">Hospital Images</label>
          <div
            className="border-2 border-dashed border-white/20 rounded-3xl p-8 text-center 
                       hover:border-white/40 backdrop-blur-lg transition-all duration-300 group-hover:scale-[1.01] cursor-pointer"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform group-hover:scale-105 blur-md rounded-3xl"></div>
            <div className="relative z-10">
              <Upload className="w-8 h-8 text-white/60 mx-auto mb-2" />
              <p className="text-white/60 mb-2">Drag and drop images here, or click to browse</p>
              <p className="text-white/40 text-sm">PNG, JPG up to 10MB each</p>
              <input type="file" multiple accept="image/*" className="hidden" />
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center space-x-4 pt-6">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform group-hover:scale-105 blur-md rounded-3xl"></div>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center space-x-2 px-6 py-3 bg-white/80 text-[#023e8a] rounded-3xl 
                         font-medium shadow-md hover:bg-white/90 hover:scale-105 active:scale-95 
                         transition-all disabled:opacity-50 disabled:cursor-not-allowed relative z-10"
            >
              {loading ? (
                <>
                  <Loader className="w-4 h-4 animate-spin" />
                  <span>Adding Hospital...</span>
                </>
              ) : (
                <>
                  <Building2 className="w-4 h-4" />
                  <span>Add Hospital</span>
                </>
              )}
            </button>
          </div>

          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform group-hover:scale-105 blur-md rounded-3xl"></div>
            <button
              type="button"
              className="px-6 py-3 bg-white/10 text-white rounded-3xl font-medium 
                         hover:bg-white/20 hover:scale-105 active:scale-95 transition-all relative z-10"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}