
"use client"

import { BarChart3, Download, TrendingUp, Users, Building2, AlertTriangle } from "lucide-react"
import { useState } from "react"

export default function ReportsPage() {
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
    <div className="space-y-6 mt-16 md:mt-20 ml-64 md:ml-72"> {/* Match Dashboard spacing */}
      {/* Header */}
      <div className="relative bg-gradient-to-r from-white/10 to-white/20 backdrop-blur-lg border border-white/20 rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden">
        {/* Liquid Glass Effect Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="relative flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white mb-2">Reports & Analytics</h1>
            <p className="text-white/60">Generate comprehensive reports and view system analytics.</p>
          </div>
          <button
            onClick={generateReport}
            className="relative flex items-center space-x-2 px-4 py-2 bg-white text-[#023e8a] rounded-2xl font-medium hover:bg-white/90 transition-all duration-300 hover:shadow-lg group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <Download className="w-4 h-4 relative" />
            <span className="relative">Export Report</span>
          </button>
        </div>
      </div>

      {/* Report Controls */}
      <div className="relative grid grid-cols-1 md:grid-cols-3 gap-4 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 group">
        {/* Liquid Glass Effect Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="relative">
          <label className="block text-white font-medium mb-2">Report Type</label>
          <select
            value={selectedReport}
            onChange={(e) => setSelectedReport(e.target.value)}
            className="w-full bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all duration-300 hover:shadow-lg"
          >
            {reportTypes.map((type) => (
              <option key={type.id} value={type.id} className="bg-black text-white">
                {type.label}
              </option>
            ))}
          </select>
        </div>

        <div className="relative">
          <label className="block text-white font-medium mb-2">Date Range</label>
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="w-full bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all duration-300 hover:shadow-lg"
          >
            <option value="last7days" className="bg-black text-white">Last 7 Days</option>
            <option value="last30days" className="bg-black text-white">Last 30 Days</option>
            <option value="last90days" className="bg-black text-white">Last 90 Days</option>
            <option value="lastyear" className="bg-black text-white">Last Year</option>
          </select>
        </div>

        <div className="relative">
          <label className="block text-white font-medium mb-2">Format</label>
          <select className="w-full bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all duration-300 hover:shadow-lg">
            <option value="pdf" className="bg-black text-white">PDF Report</option>
            <option value="excel" className="bg-black text-white">Excel Spreadsheet</option>
            <option value="csv" className="bg-black text-white">CSV Data</option>
          </select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          {
            value: mockData.overview.totalUsers.toLocaleString(),
            label: "Total Users",
            change: "+12% from last month",
            color: "blue",
            icon: Users,
          },
          {
            value: mockData.overview.activeHospitals,
            label: "Active Hospitals",
            change: "+8% from last month",
            color: "green",
            icon: Building2,
          },
          {
            value: mockData.overview.emergencyReports.toLocaleString(),
            label: "Emergency Reports",
            change: "+23% from last month",
            color: "red",
            icon: AlertTriangle,
          },
          {
            value: mockData.overview.systemUptime,
            label: "System Uptime",
            change: "Excellent performance",
            color: "purple",
            icon: BarChart3,
          },
        ].map((metric, index) => {
          const Icon = metric.icon
          return (
            <div
              key={index}
              className="relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-xl group"
            >
              {/* Liquid Glass Effect Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative flex items-center justify-between mb-4">
                <div className={`p-3 rounded-2xl bg-${metric.color}-500/20 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`w-6 h-6 text-${metric.color}-400`} />
                </div>
                <TrendingUp className={`w-4 h-4 text-${metric.color}-400`} />
              </div>
              <div className="relative">
                <p className="text-2xl font-bold text-white mb-1">{metric.value}</p>
                <p className="text-white/60 text-sm">{metric.label}</p>
                <p className={`text-${metric.color}-400 text-xs mt-1`}>{metric.change}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 group">
          {/* Liquid Glass Effect Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <h3 className="relative text-lg font-semibold text-white mb-6">Monthly Trends</h3>
          <div className="relative space-y-4">
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
          <div className="relative mt-6 flex items-center justify-center space-x-6 text-sm">
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

        <div className="relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 group">
          {/* Liquid Glass Effect Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <h3 className="relative text-lg font-semibold text-white mb-6">Performance Metrics</h3>
          <div className="relative space-y-6">
            {[
              { label: "Response Time", value: "125ms", percent: "85%", color: "green" },
              { label: "Database Performance", value: "92%", percent: "92%", color: "blue" },
              { label: "Server Load", value: "68%", percent: "68%", color: "yellow" },
              { label: "Memory Usage", value: "45%", percent: "45%", color: "purple" },
            ].map((metric, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white/70 text-sm">{metric.label}</span>
                  <span className={`text-${metric.color}-400 text-sm font-medium`}>{metric.value}</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div
                    className={`bg-${metric.color}-400 h-2 rounded-full`}
                    style={{ width: metric.percent }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 group">
        {/* Liquid Glass Effect Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <h3 className="relative text-lg font-semibold text-white mb-6">Recent System Activity</h3>
        <div className="relative space-y-4">
          {[
            { color: "green", text: "New hospital registration approved", sub: "City General Hospital - 2 minutes ago" },
            { color: "red", text: "Emergency alert resolved", sub: "ER001 - Critical patient stabilized - 5 minutes ago" },
            { color: "blue", text: "System backup completed", sub: "Daily backup successful - 1 hour ago" },
            { color: "yellow", text: "New admin user created", sub: "Sarah Manager added to system - 2 hours ago" },
          ].map((activity, i) => (
            <div key={i} className="relative flex items-center space-x-4 p-4 bg-white/5 rounded-2xl hover:bg-white/10 transition-all duration-300 group/activity">
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover/activity:opacity-100 transition-opacity duration-500"></div>
              <div className={`w-2 h-2 bg-${activity.color}-400 rounded-full animate-pulse`}></div>
              <div className="relative flex-1">
                <p className="text-white text-sm">{activity.text}</p>
                <p className="text-white/60 text-xs">{activity.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
