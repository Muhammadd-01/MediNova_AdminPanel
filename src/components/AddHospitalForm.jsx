"use client"

import { Building2, MapPin, Upload, Loader } from "lucide-react"
import { useState } from "react"

export default function AddHospitalForm() {
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
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white mb-2">Add New Hospital</h1>
        <p className="text-white/60">Register a new hospital in the MediCare network.</p>
      </div>

      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-white font-medium mb-2">Hospital Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
                placeholder="Enter hospital name"
              />
            </div>

            <div>
              <label className="block text-white font-medium mb-2">Hospital Type *</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/30 cursor-pointer"
              >
                <option value="private" className="bg-black text-white">
                  Private
                </option>
                <option value="government" className="bg-black text-white">
                  Government
                </option>
                <option value="non-profit" className="bg-black text-white">
                  Non-Profit
                </option>
              </select>
            </div>

            <div>
              <label className="block text-white font-medium mb-2">City *</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
                placeholder="Enter city"
              />
            </div>

            <div>
              <label className="block text-white font-medium mb-2">Phone Number *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
                placeholder="Enter phone number"
              />
            </div>

            <div>
              <label className="block text-white font-medium mb-2">Email Address *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
                placeholder="Enter email address"
              />
            </div>

            <div>
              <label className="block text-white font-medium mb-2">Number of Beds</label>
              <input
                type="number"
                name="beds"
                value={formData.beds}
                onChange={handleChange}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
                placeholder="Enter number of beds"
              />
            </div>
          </div>

          <div>
            <label className="block text-white font-medium mb-2">Full Address *</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              rows={3}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
              placeholder="Enter complete address"
            />
          </div>

          <div>
            <label className="block text-white font-medium mb-2">Specialties</label>
            <input
              type="text"
              name="specialties"
              value={formData.specialties}
              onChange={handleChange}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
              placeholder="e.g., Cardiology, Neurology, Emergency Care"
            />
          </div>

          <div>
            <label className="block text-white font-medium mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
              placeholder="Brief description about the hospital"
            />
          </div>

          {/* Location Picker */}
          <div>
            <label className="block text-white font-medium mb-2">Location on Map</label>
            <div className="h-48 bg-white/5 border border-white/20 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                <p className="text-white/60">Click to select location</p>
                <p className="text-white/40 text-sm">Interactive map picker</p>
              </div>
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-white font-medium mb-2">Hospital Images</label>
            <div className="border-2 border-dashed border-white/20 rounded-lg p-8 text-center hover:border-white/40 transition-colors">
              <Upload className="w-8 h-8 text-white/60 mx-auto mb-2" />
              <p className="text-white/60 mb-2">Drag and drop images here, or click to browse</p>
              <p className="text-white/40 text-sm">PNG, JPG up to 10MB each</p>
              <input type="file" multiple accept="image/*" className="hidden" />
            </div>
          </div>

          <div className="flex items-center space-x-4 pt-6">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center space-x-2 px-6 py-3 bg-white text-[#023e8a] rounded-lg font-medium hover:bg-white/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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
            <button
              type="button"
              className="px-6 py-3 bg-white/10 text-white rounded-lg font-medium hover:bg-white/20 transition-all"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
