export function LoadingSpinner({ size = "md", color = "white" }) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
    xl: "w-12 h-12",
  }

  const colorClasses = {
    white: "border-white border-t-transparent",
    blue: "border-blue-400 border-t-transparent",
    green: "border-green-400 border-t-transparent",
    red: "border-red-400 border-t-transparent",
  }

  return <div className={`${sizeClasses[size]} ${colorClasses[color]} border-2 rounded-full animate-spin`} />
}
