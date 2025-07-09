"use client"

import { BarChart3, Download, TrendingUp, Users, Building2, AlertTriangle } from "lucide-react"
import { useState } from "react"

export function ReportsPage() {
  const [selectedReport, setSelectedReport] = useState("overview")
  const [dateRange, setDateRange] = useState("last30days")

  const reportTypes = [
    { id: "overview", label: "System Overview", icon: BarChart3 },
    { id: "users", label: "User Analytics", icon: Users },
    { id: "hospitals", label: "Hospital Reports", icon: Building2 },
    { id: "emergencies", label: "Emergency Analytics", icon: AlertTriangle },
  ]

  const mockData = {
    overview: {
      totalUsers: 15847,
      activeHospitals: 284,
      emergencyReports: 1429,
      systemUptime: "99.9%",
      trends: [
        { month: "Jan", users: 12000, hospitals: 250, emergencies: 1200 },
        { month: "Feb", users: 13500, hospitals: 260, emergencies: 1350 },
        { month: "Mar", users: 14200, hospitals: 270, emergencies: 1280 },
        { month: "Apr", users: 15000, hospitals: 280, emergencies: 1400 },
        { month: "May", users: 15500, hospitals: 284, emergencies: 1429 },
      ],
    },
  }

  const generateReport = () => {
    alert(`Generating ${reportTypes.find((r) => r.id === selectedReport)?.label} report...`)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Reports & Analytics</h1>
          <p className="text-white/60">Generate comprehensive reports and view system analytics.</p>
        </div>
        <button
          onClick={generateReport}
          className="flex items-center space-x-2 px-4 py-2 bg-white text-[#023e8a] rounded-lg font-medium hover:bg-white/90 transition-all"
        >
          <Download className="w-4 h-4" />
          <span>Export Report</span>
        </button>
      </div>

      {/* Report Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-white font-medium mb-2">Report Type</label>
          <select
            value={selectedReport}
            onChange={(e) => setSelectedReport(e.target.value)}
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/30"
          >
            {reportTypes.map((type) => (
              <option key={type.id} value={type.id} className="bg-black text-white">
                {type.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-white font-medium mb-2">Date Range</label>
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/30"
          >
            <option value="last7days" className="bg-black text-white">
              Last 7 Days
            </option>
            <option value="last30days" className="bg-black text-white">
              Last 30 Days
            </option>
            <option value="last90days" className="bg-black text-white">
              Last 90 Days
            </option>
            <option value="lastyear" className="bg-black text-white">
              Last Year
            </option>
          </select>
        </div>

        <div>
          <label className="block text-white font-medium mb-2">Format</label>
          <select className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/30">
            <option value="pdf" className="bg-black text-white">
              PDF Report
            </option>
            <option value="excel" className="bg-black text-white">
              Excel Spreadsheet
            </option>
            <option value="csv" className="bg-black text-white">
              CSV Data
            </option>
          </select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-blue-500/20">
              <Users className="w-6 h-6 text-blue-400" />
            </div>
            <TrendingUp className="w-4 h-4 text-green-400" />
          </div>
          <div>
            <p className="text-2xl font-bold text-white mb-1">{mockData.overview.totalUsers.toLocaleString()}</p>
            <p className="text-white/60 text-sm">Total Users</p>
            <p className="text-green-400 text-xs mt-1">+12% from last month</p>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-green-500/20">
              <Building2 className="w-6 h-6 text-green-400" />
            </div>
            <TrendingUp className="w-4 h-4 text-green-400" />
          </div>
          <div>
            <p className="text-2xl font-bold text-white mb-1">{mockData.overview.activeHospitals}</p>
            <p className="text-white/60 text-sm">Active Hospitals</p>
            <p className="text-green-400 text-xs mt-1">+8% from last month</p>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-red-500/20">
              <AlertTriangle className="w-6 h-6 text-red-400" />
            </div>
            <TrendingUp className="w-4 h-4 text-red-400" />
          </div>
          <div>
            <p className="text-2xl font-bold text-white mb-1">{mockData.overview.emergencyReports.toLocaleString()}</p>
            <p className="text-white/60 text-sm">Emergency Reports</p>
            <p className="text-red-400 text-xs mt-1">+23% from last month</p>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-purple-500/20">
              <BarChart3 className="w-6 h-6 text-purple-400" />
            </div>
            <TrendingUp className="w-4 h-4 text-green-400" />
          </div>
          <div>
            <p className="text-2xl font-bold text-white mb-1">{mockData.overview.systemUptime}</p>
            <p className="text-white/60 text-sm">System Uptime</p>
            <p className="text-green-400 text-xs mt-1">Excellent performance</p>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-6">Monthly Trends</h3>
          <div className="space-y-4">
            {mockData.overview.trends.map((data, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-white/70 text-sm font-medium">{data.month}</span>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                    <span className="text-white text-sm">{data.users.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    <span className="text-white text-sm">{data.hospitals}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <span className="text-white text-sm">{data.emergencies}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex items-center justify-center space-x-6 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
              <span className="text-white/70">Users</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              <span className="text-white/70">Hospitals</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-400 rounded-full"></div>
              <span className="text-white/70">Emergencies</span>
            </div>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-6">Performance Metrics</h3>
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-white/70 text-sm">Response Time</span>
                <span className="text-green-400 text-sm font-medium">125ms</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2">
                <div className="bg-green-400 h-2 rounded-full" style={{ width: "85%" }}></div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-white/70 text-sm">Database Performance</span>
                <span className="text-blue-400 text-sm font-medium">92%</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2">
                <div className="bg-blue-400 h-2 rounded-full" style={{ width: "92%" }}></div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-white/70 text-sm">Server Load</span>
                <span className="text-yellow-400 text-sm font-medium">68%</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2">
                <div className="bg-yellow-400 h-2 rounded-full" style={{ width: "68%" }}></div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-white/70 text-sm">Memory Usage</span>
                <span className="text-purple-400 text-sm font-medium">45%</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2">
                <div className="bg-purple-400 h-2 rounded-full" style={{ width: "45%" }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-6">Recent System Activity</h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-4 p-4 bg-white/5 rounded-lg">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <div className="flex-1">
              <p className="text-white text-sm">New hospital registration approved</p>
              <p className="text-white/60 text-xs">City General Hospital - 2 minutes ago</p>
            </div>
          </div>

          <div className="flex items-center space-x-4 p-4 bg-white/5 rounded-lg">
            <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
            <div className="flex-1">
              <p className="text-white text-sm">Emergency alert resolved</p>
              <p className="text-white/60 text-xs">ER001 - Critical patient stabilized - 5 minutes ago</p>
            </div>
          </div>

          <div className="flex items-center space-x-4 p-4 bg-white/5 rounded-lg">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
            <div className="flex-1">
              <p className="text-white text-sm">System backup completed</p>
              <p className="text-white/60 text-xs">Daily backup successful - 1 hour ago</p>
            </div>
          </div>

          <div className="flex items-center space-x-4 p-4 bg-white/5 rounded-lg">
            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
            <div className="flex-1">
              <p className="text-white text-sm">New admin user created</p>
              <p className="text-white/60 text-xs">Sarah Manager added to system - 2 hours ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
