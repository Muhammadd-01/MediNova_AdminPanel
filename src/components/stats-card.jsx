import { TrendingUp, TrendingDown } from "lucide-react"

export function StatsCard({ title, value, icon: Icon, change, trend = "up", color = "text-blue-400" }) {
  const isPositive = trend === "up"
  const TrendIcon = isPositive ? TrendingUp : TrendingDown
  const trendColor = isPositive ? "text-green-400" : "text-red-400"

  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105 group">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg bg-white/10 ${color} group-hover:scale-110 transition-transform`}>
          <Icon className="w-6 h-6" />
        </div>
        <div className={`flex items-center space-x-1 ${trendColor}`}>
          <TrendIcon className="w-3 h-3" />
          <span className="text-sm font-medium">{change}</span>
        </div>
      </div>
      <div>
        <p className="text-2xl font-bold text-white mb-1">{value}</p>
        <p className="text-white/60 text-sm">{title}</p>
      </div>
    </div>
  )
}
