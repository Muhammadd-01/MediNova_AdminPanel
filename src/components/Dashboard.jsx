import { Users, Building2, AlertTriangle, UserCheck, TrendingUp, MapPin } from "lucide-react"

export default function Dashboard() {
  const stats = [
    { title: "Total Patients", value: "12,847", icon: Users, change: "+12%", color: "text-green-400" },
    { title: "Verified Hospitals", value: "284", icon: Building2, change: "+8%", color: "text-blue-400" },
    { title: "Emergency Reports", value: "1,429", icon: AlertTriangle, change: "+23%", color: "text-red-400" },
    { title: "Active Doctors", value: "3,672", icon: UserCheck, change: "+5%", color: "text-purple-400" },
  ]

  const emergencyData = [
    { month: "Jan", reports: 120 },
    { month: "Feb", reports: 150 },
    { month: "Mar", reports: 180 },
    { month: "Apr", reports: 140 },
    { month: "May", reports: 200 },
    { month: "Jun", reports: 170 },
  ]

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-sm border border-white/10 rounded-xl p-4 md:p-6">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">MediNova Dashboard</h1>
        <p className="text-white/70 text-sm md:text-base">
          Welcome back! Here's what's happening with your healthcare network today.
        </p>
        <div className="flex flex-wrap items-center gap-4 mt-4">
          <div className="flex items-center space-x-2 text-green-400">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm">System Online</span>
          </div>
          <div className="flex items-center space-x-2 text-blue-400">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
            <span className="text-sm">Real-time Monitoring</span>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 md:p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105 group cursor-pointer"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg bg-white/10 ${stat.color} group-hover:scale-110 transition-transform`}>
                  <Icon className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <span className={`text-sm font-medium ${stat.color} flex items-center space-x-1`}>
                  <TrendingUp className="w-3 h-3" />
                  <span>{stat.change}</span>
                </span>
              </div>
              <div>
                <p className="text-xl md:text-2xl font-bold text-white mb-1">{stat.value}</p>
                <p className="text-white/60 text-sm">{stat.title}</p>
              </div>
              <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-white/50 text-xs">Click to view details →</p>
              </div>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Emergency Trends Chart */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 md:p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Emergency Trends</h3>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
              <span className="text-red-400 text-sm">Live Data</span>
            </div>
          </div>
          <div className="space-y-4">
            {emergencyData.map((data, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-white/70 text-sm font-medium">{data.month}</span>
                <div className="flex items-center space-x-3">
                  <div className="w-24 md:w-32 bg-white/10 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-400 to-purple-400 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${(data.reports / 200) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-white text-sm font-medium w-8">{data.reports}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Hospital Map */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 md:p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">MediNova Network</h3>
            <MapPin className="w-5 h-5 text-blue-400" />
          </div>
          <div className="relative h-48 bg-white/5 rounded-lg overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20"></div>
            <div className="absolute top-4 left-4 w-3 h-3 bg-red-400 rounded-full animate-pulse shadow-lg"></div>
            <div className="absolute top-8 right-8 w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg"></div>
            <div className="absolute bottom-6 left-8 w-3 h-3 bg-blue-400 rounded-full animate-pulse shadow-lg"></div>
            <div className="absolute bottom-4 right-4 w-3 h-3 bg-yellow-400 rounded-full animate-pulse shadow-lg"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <p className="text-white/60 text-sm font-medium">Interactive Network Map</p>
                <p className="text-white/40 text-xs mt-1">Real-time Hospital Status</p>
              </div>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-between text-xs md:text-sm gap-2">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-white/70">Active (156)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-red-400 rounded-full"></div>
              <span className="text-white/70">Emergency (23)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <span className="text-white/70">Network: 284</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
