"use client"

import { User, Mail, Phone, MapPin, Camera, Lock, Bell, Save } from "lucide-react"
import { useState } from "react"

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("profile")
  const [profileData, setProfileData] = useState({
    name: "Dr. Admin User",
    email: "admin@medinova.com",
    phone: "+1 (555) 123-4567",
    location: "New York, NY",
    role: "System Administrator",
    department: "MediNova IT Administration",
  })

  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    smsAlerts: false,
    emergencyAlerts: true,
    weeklyReports: true,
  })

  const handleProfileChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    })
  }

  const handleNotificationChange = (key) => {
    setNotifications({
      ...notifications,
      [key]: !notifications[key],
    })
  }

  const tabs = [
    { id: "profile", label: "Profile Details", icon: User },
    { id: "security", label: "Security", icon: Lock },
    { id: "notifications", label: "Notifications", icon: Bell },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white mb-2">MediNova Admin Profile</h1>
        <p className="text-white/60">Manage your MediNova account settings and preferences.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Profile Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <div className="text-center mb-6">
              <div className="relative inline-block">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-3">
                  <User className="w-8 h-8 text-white" />
                </div>
                <button className="absolute bottom-0 right-0 p-1 bg-white text-[#023e8a] rounded-full hover:bg-white/90 transition-all">
                  <Camera className="w-3 h-3" />
                </button>
              </div>
              <h3 className="text-lg font-semibold text-white">{profileData.name}</h3>
              <p className="text-white/60 text-sm">{profileData.role}</p>
            </div>

            <nav className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                      activeTab === tab.id
                        ? "bg-white/10 text-white border border-white/20"
                        : "text-white/70 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm">{tab.label}</span>
                  </button>
                )
              })}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            {activeTab === "profile" && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-white">Profile Information</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white font-medium mb-2">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
                      <input
                        type="text"
                        name="name"
                        value={profileData.name}
                        onChange={handleProfileChange}
                        className="w-full bg-white/10 border border-white/20 rounded-lg pl-10 pr-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
                      <input
                        type="email"
                        name="email"
                        value={profileData.email}
                        onChange={handleProfileChange}
                        className="w-full bg-white/10 border border-white/20 rounded-lg pl-10 pr-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
                      <input
                        type="tel"
                        name="phone"
                        value={profileData.phone}
                        onChange={handleProfileChange}
                        className="w-full bg-white/10 border border-white/20 rounded-lg pl-10 pr-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">Location</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
                      <input
                        type="text"
                        name="location"
                        value={profileData.location}
                        onChange={handleProfileChange}
                        className="w-full bg-white/10 border border-white/20 rounded-lg pl-10 pr-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">Role</label>
                    <input
                      type="text"
                      name="role"
                      value={profileData.role}
                      onChange={handleProfileChange}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
                    />
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">Department</label>
                    <input
                      type="text"
                      name="department"
                      value={profileData.department}
                      onChange={handleProfileChange}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
                    />
                  </div>
                </div>

                <button className="flex items-center space-x-2 px-6 py-3 bg-white text-[#023e8a] rounded-lg font-medium hover:bg-white/90 transition-all">
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                </button>
              </div>
            )}

            {activeTab === "security" && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-white">Security Settings</h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-white font-medium mb-2">Current Password</label>
                    <input
                      type="password"
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
                      placeholder="Enter current password"
                    />
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">New Password</label>
                    <input
                      type="password"
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
                      placeholder="Enter new password"
                    />
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">Confirm New Password</label>
                    <input
                      type="password"
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
                      placeholder="Confirm new password"
                    />
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                  <h3 className="text-white font-medium mb-2">Password Requirements</h3>
                  <ul className="text-white/60 text-sm space-y-1">
                    <li>• At least 8 characters long</li>
                    <li>• Contains uppercase and lowercase letters</li>
                    <li>• Contains at least one number</li>
                    <li>• Contains at least one special character</li>
                  </ul>
                </div>

                <button className="flex items-center space-x-2 px-6 py-3 bg-white text-[#023e8a] rounded-lg font-medium hover:bg-white/90 transition-all">
                  <Lock className="w-4 h-4" />
                  <span>Update Password</span>
                </button>
              </div>
            )}

            {activeTab === "notifications" && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-white">Notification Preferences</h2>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <div>
                      <h3 className="text-white font-medium">Email Alerts</h3>
                      <p className="text-white/60 text-sm">Receive email notifications for important updates</p>
                    </div>
                    <button
                      onClick={() => handleNotificationChange("emailAlerts")}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        notifications.emailAlerts ? "bg-white" : "bg-white/20"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-[#023e8a] transition-transform ${
                          notifications.emailAlerts ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <div>
                      <h3 className="text-white font-medium">SMS Alerts</h3>
                      <p className="text-white/60 text-sm">Receive text message notifications</p>
                    </div>
                    <button
                      onClick={() => handleNotificationChange("smsAlerts")}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        notifications.smsAlerts ? "bg-white" : "bg-white/20"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-[#023e8a] transition-transform ${
                          notifications.smsAlerts ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <div>
                      <h3 className="text-white font-medium">Emergency Alerts</h3>
                      <p className="text-white/60 text-sm">Critical emergency notifications</p>
                    </div>
                    <button
                      onClick={() => handleNotificationChange("emergencyAlerts")}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        notifications.emergencyAlerts ? "bg-white" : "bg-white/20"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-[#023e8a] transition-transform ${
                          notifications.emergencyAlerts ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <div>
                      <h3 className="text-white font-medium">Weekly Reports</h3>
                      <p className="text-white/60 text-sm">Weekly summary reports</p>
                    </div>
                    <button
                      onClick={() => handleNotificationChange("weeklyReports")}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        notifications.weeklyReports ? "bg-white" : "bg-white/20"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-[#023e8a] transition-transform ${
                          notifications.weeklyReports ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>
                </div>

                <button className="flex items-center space-x-2 px-6 py-3 bg-white text-[#023e8a] rounded-lg font-medium hover:bg-white/90 transition-all">
                  <Save className="w-4 h-4" />
                  <span>Save Preferences</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
