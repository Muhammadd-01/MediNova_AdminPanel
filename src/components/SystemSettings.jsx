"use client"

import { Settings, Save, Bell, Shield, Database, Mail, Smartphone } from "lucide-react"
import { useState } from "react"

export default function SystemSettings() {
  const [activeTab, setActiveTab] = useState("general")
  const [settings, setSettings] = useState({
    general: {
      systemName: "MediNova Healthcare System",
      timezone: "UTC-5",
      language: "English",
      dateFormat: "MM/DD/YYYY",
      maintenanceMode: false,
    },
    notifications: {
      emailNotifications: true,
      smsNotifications: false,
      pushNotifications: true,
      emergencyAlerts: true,
      systemAlerts: true,
      reportReminders: true,
    },
    security: {
      sessionTimeout: 30,
      passwordExpiry: 90,
      twoFactorAuth: true,
      loginAttempts: 5,
      ipWhitelist: "",
    },
    database: {
      backupFrequency: "daily",
      retentionPeriod: 365,
      autoCleanup: true,
      compressionEnabled: true,
    },
  })

  const tabs = [
    { id: "general", label: "General", icon: Settings },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Shield },
    { id: "database", label: "Database", icon: Database },
  ]

  const handleSave = (section) => {
    // Simulate saving settings
    alert(`${section} settings saved successfully!`)
  }

  const updateSetting = (section, key, value) => {
    setSettings((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }))
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white mb-2">System Settings</h1>
        <p className="text-white/60">Configure system-wide settings and preferences.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Settings Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
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

        {/* Settings Content */}
        <div className="lg:col-span-3">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            {activeTab === "general" && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-white">General Settings</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white font-medium mb-2">System Name</label>
                    <input
                      type="text"
                      value={settings.general.systemName}
                      onChange={(e) => updateSetting("general", "systemName", e.target.value)}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
                    />
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">Timezone</label>
                    <select
                      value={settings.general.timezone}
                      onChange={(e) => updateSetting("general", "timezone", e.target.value)}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/30"
                    >
                      <option value="UTC-5" className="bg-black text-white">
                        UTC-5 (Eastern)
                      </option>
                      <option value="UTC-6" className="bg-black text-white">
                        UTC-6 (Central)
                      </option>
                      <option value="UTC-7" className="bg-black text-white">
                        UTC-7 (Mountain)
                      </option>
                      <option value="UTC-8" className="bg-black text-white">
                        UTC-8 (Pacific)
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">Language</label>
                    <select
                      value={settings.general.language}
                      onChange={(e) => updateSetting("general", "language", e.target.value)}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/30"
                    >
                      <option value="English" className="bg-black text-white">
                        English
                      </option>
                      <option value="Spanish" className="bg-black text-white">
                        Spanish
                      </option>
                      <option value="French" className="bg-black text-white">
                        French
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">Date Format</label>
                    <select
                      value={settings.general.dateFormat}
                      onChange={(e) => updateSetting("general", "dateFormat", e.target.value)}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/30"
                    >
                      <option value="MM/DD/YYYY" className="bg-black text-white">
                        MM/DD/YYYY
                      </option>
                      <option value="DD/MM/YYYY" className="bg-black text-white">
                        DD/MM/YYYY
                      </option>
                      <option value="YYYY-MM-DD" className="bg-black text-white">
                        YYYY-MM-DD
                      </option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                  <div>
                    <h3 className="text-white font-medium">Maintenance Mode</h3>
                    <p className="text-white/60 text-sm">Enable maintenance mode to restrict system access</p>
                  </div>
                  <button
                    onClick={() => updateSetting("general", "maintenanceMode", !settings.general.maintenanceMode)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      settings.general.maintenanceMode ? "bg-red-500" : "bg-white/20"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.general.maintenanceMode ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>

                <button
                  onClick={() => handleSave("General")}
                  className="flex items-center space-x-2 px-6 py-3 bg-white text-[#023e8a] rounded-lg font-medium hover:bg-white/90 transition-all"
                >
                  <Save className="w-4 h-4" />
                  <span>Save General Settings</span>
                </button>
              </div>
            )}

            {activeTab === "notifications" && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-white">Notification Settings</h2>

                <div className="space-y-4">
                  {Object.entries(settings.notifications).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                      <div className="flex items-center space-x-3">
                        {key.includes("email") && <Mail className="w-5 h-5 text-blue-400" />}
                        {key.includes("sms") && <Smartphone className="w-5 h-5 text-green-400" />}
                        {key.includes("push") && <Bell className="w-5 h-5 text-purple-400" />}
                        {key.includes("emergency") && <Shield className="w-5 h-5 text-red-400" />}
                        {key.includes("system") && <Settings className="w-5 h-5 text-yellow-400" />}
                        {key.includes("report") && <Database className="w-5 h-5 text-indigo-400" />}
                        <div>
                          <h3 className="text-white font-medium capitalize">
                            {key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                          </h3>
                          <p className="text-white/60 text-sm">
                            {key.includes("email") && "Send notifications via email"}
                            {key.includes("sms") && "Send notifications via SMS"}
                            {key.includes("push") && "Send push notifications"}
                            {key.includes("emergency") && "Critical emergency alerts"}
                            {key.includes("system") && "System status notifications"}
                            {key.includes("report") && "Automated report reminders"}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => updateSetting("notifications", key, !value)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          value ? "bg-white" : "bg-white/20"
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-[#023e8a] transition-transform ${
                            value ? "translate-x-6" : "translate-x-1"
                          }`}
                        />
                      </button>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => handleSave("Notification")}
                  className="flex items-center space-x-2 px-6 py-3 bg-white text-[#023e8a] rounded-lg font-medium hover:bg-white/90 transition-all"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Notification Settings</span>
                </button>
              </div>
            )}

            {activeTab === "security" && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-white">Security Settings</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white font-medium mb-2">Session Timeout (minutes)</label>
                    <input
                      type="number"
                      value={settings.security.sessionTimeout}
                      onChange={(e) => updateSetting("security", "sessionTimeout", Number.parseInt(e.target.value))}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
                    />
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">Password Expiry (days)</label>
                    <input
                      type="number"
                      value={settings.security.passwordExpiry}
                      onChange={(e) => updateSetting("security", "passwordExpiry", Number.parseInt(e.target.value))}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
                    />
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">Max Login Attempts</label>
                    <input
                      type="number"
                      value={settings.security.loginAttempts}
                      onChange={(e) => updateSetting("security", "loginAttempts", Number.parseInt(e.target.value))}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                  <div>
                    <h3 className="text-white font-medium">Two-Factor Authentication</h3>
                    <p className="text-white/60 text-sm">Require 2FA for all admin accounts</p>
                  </div>
                  <button
                    onClick={() => updateSetting("security", "twoFactorAuth", !settings.security.twoFactorAuth)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      settings.security.twoFactorAuth ? "bg-white" : "bg-white/20"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-[#023e8a] transition-transform ${
                        settings.security.twoFactorAuth ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>

                <button
                  onClick={() => handleSave("Security")}
                  className="flex items-center space-x-2 px-6 py-3 bg-white text-[#023e8a] rounded-lg font-medium hover:bg-white/90 transition-all"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Security Settings</span>
                </button>
              </div>
            )}

            {activeTab === "database" && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-white">Database Settings</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white font-medium mb-2">Backup Frequency</label>
                    <select
                      value={settings.database.backupFrequency}
                      onChange={(e) => updateSetting("database", "backupFrequency", e.target.value)}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/30"
                    >
                      <option value="hourly" className="bg-black text-white">
                        Hourly
                      </option>
                      <option value="daily" className="bg-black text-white">
                        Daily
                      </option>
                      <option value="weekly" className="bg-black text-white">
                        Weekly
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">Retention Period (days)</label>
                    <input
                      type="number"
                      value={settings.database.retentionPeriod}
                      onChange={(e) => updateSetting("database", "retentionPeriod", Number.parseInt(e.target.value))}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <div>
                      <h3 className="text-white font-medium">Auto Cleanup</h3>
                      <p className="text-white/60 text-sm">Automatically clean old data</p>
                    </div>
                    <button
                      onClick={() => updateSetting("database", "autoCleanup", !settings.database.autoCleanup)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        settings.database.autoCleanup ? "bg-white" : "bg-white/20"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-[#023e8a] transition-transform ${
                          settings.database.autoCleanup ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <div>
                      <h3 className="text-white font-medium">Compression</h3>
                      <p className="text-white/60 text-sm">Enable database compression</p>
                    </div>
                    <button
                      onClick={() =>
                        updateSetting("database", "compressionEnabled", !settings.database.compressionEnabled)
                      }
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        settings.database.compressionEnabled ? "bg-white" : "bg-white/20"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-[#023e8a] transition-transform ${
                          settings.database.compressionEnabled ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => handleSave("Database")}
                  className="flex items-center space-x-2 px-6 py-3 bg-white text-[#023e8a] rounded-lg font-medium hover:bg-white/90 transition-all"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Database Settings</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
