"use client"

import { useState, useEffect } from "react"

export function BackgroundAnimation() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isMouseMoving, setIsMouseMoving] = useState(false)

  useEffect(() => {
    let timeout

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      setIsMouseMoving(true)

      clearTimeout(timeout)
      timeout = setTimeout(() => {
        setIsMouseMoving(false)
      }, 100)
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      clearTimeout(timeout)
    }
  }, [])

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#023e8a] via-[#0353a4] to-[#023e8a] animate-pulse opacity-90"></div>

      {/* Cursor-following glow effect */}
      <div
        className="absolute w-96 h-96 bg-white/5 rounded-full blur-3xl transition-all duration-300 ease-out"
        style={{
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
          opacity: isMouseMoving ? 0.6 : 0.2,
          transform: `scale(${isMouseMoving ? 1.2 : 1})`,
        }}
      />

      {/* Medical Blood Cell Animation */}
      <div className="absolute inset-0">
        {/* Red Blood Cells - Large circular cells */}
        {[...Array(20)].map((_, i) => (
          <div
            key={`rbc-${i}`}
            className="absolute bg-red-500/20 rounded-full animate-blood-flow"
            style={{
              width: `${8 + Math.random() * 12}px`,
              height: `${8 + Math.random() * 12}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${8 + Math.random() * 8}s`,
              transform: isMouseMoving
                ? `translate(${(mousePosition.x - window.innerWidth / 2) * 0.01}px, ${(mousePosition.y - window.innerHeight / 2) * 0.01}px)`
                : "none",
              transition: "transform 0.3s ease-out",
            }}
          >
            {/* Inner concave effect for realistic blood cell look */}
            <div className="absolute inset-1 bg-red-600/30 rounded-full"></div>
          </div>
        ))}

        {/* White Blood Cells - Larger, irregular shaped */}
        {[...Array(12)].map((_, i) => (
          <div
            key={`wbc-${i}`}
            className="absolute bg-blue-300/15 rounded-full animate-blood-drift"
            style={{
              width: `${12 + Math.random() * 16}px`,
              height: `${12 + Math.random() * 16}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 12}s`,
              animationDuration: `${10 + Math.random() * 10}s`,
              transform: isMouseMoving
                ? `translate(${(mousePosition.x - window.innerWidth / 2) * 0.02}px, ${(mousePosition.y - window.innerHeight / 2) * 0.02}px)`
                : "none",
              transition: "transform 0.3s ease-out",
            }}
          >
            {/* Nucleus effect */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-blue-400/40 rounded-full"></div>
          </div>
        ))}

        {/* Platelets - Small irregular shapes */}
        {[...Array(35)].map((_, i) => (
          <div
            key={`platelet-${i}`}
            className="absolute bg-yellow-400/20 animate-platelet-flow"
            style={{
              width: `${3 + Math.random() * 4}px`,
              height: `${2 + Math.random() * 3}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${6 + Math.random() * 6}s`,
              borderRadius: `${Math.random() * 50}%`,
              transform: isMouseMoving
                ? `translate(${(mousePosition.x - window.innerWidth / 2) * 0.03}px, ${(mousePosition.y - window.innerHeight / 2) * 0.03}px)`
                : "none",
              transition: "transform 0.2s ease-out",
            }}
          />
        ))}

        {/* Plasma flow lines - representing blood vessels */}
        {[...Array(8)].map((_, i) => (
          <div
            key={`plasma-${i}`}
            className="absolute bg-gradient-to-r from-transparent via-white/5 to-transparent animate-plasma-flow"
            style={{
              width: "200px",
              height: "1px",
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 15}s`,
              animationDuration: `${12 + Math.random() * 8}s`,
              transform: `rotate(${Math.random() * 360}deg) ${isMouseMoving ? `translate(${(mousePosition.x - window.innerWidth / 2) * 0.015}px, ${(mousePosition.y - window.innerHeight / 2) * 0.015}px)` : ""}`,
              transition: "transform 0.3s ease-out",
            }}
          />
        ))}

        {/* DNA Helix particles - representing genetic data */}
        {[...Array(15)].map((_, i) => (
          <div
            key={`dna-${i}`}
            className="absolute animate-dna-spiral"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 20}s`,
              animationDuration: `${15 + Math.random() * 10}s`,
              transform: isMouseMoving
                ? `translate(${(mousePosition.x - window.innerWidth / 2) * 0.025}px, ${(mousePosition.y - window.innerHeight / 2) * 0.025}px)`
                : "none",
              transition: "transform 0.2s ease-out",
            }}
          >
            <div className="w-1 h-1 bg-green-400/30 rounded-full"></div>
          </div>
        ))}
      </div>

      {/* Floating waves - representing heartbeat/pulse */}
      <div className="absolute inset-0">
        <svg
          className="absolute top-0 left-0 w-full h-full opacity-10"
          viewBox="0 0 1200 800"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="pulse-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ff6b6b" stopOpacity="0.1" />
              <stop offset="50%" stopColor="#ffffff" stopOpacity="0.05" />
              <stop offset="100%" stopColor="#4ecdc4" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          <path
            d="M0,400 C300,300 600,500 1200,400 L1200,800 L0,800 Z"
            fill="url(#pulse-gradient)"
            className="animate-heartbeat-slow"
            style={{
              transform: isMouseMoving ? `translateX(${(mousePosition.x - window.innerWidth / 2) * 0.01}px)` : "none",
              transition: "transform 0.3s ease-out",
            }}
          />
          <path
            d="M0,500 C400,400 800,600 1200,500 L1200,800 L0,800 Z"
            fill="url(#pulse-gradient)"
            className="animate-heartbeat-medium"
            style={{
              transform: isMouseMoving ? `translateX(${(mousePosition.x - window.innerWidth / 2) * -0.01}px)` : "none",
              transition: "transform 0.3s ease-out",
            }}
          />
        </svg>
      </div>

      {/* Glowing medical orbs */}
      <div
        className="absolute top-1/4 left-1/4 w-64 h-64 bg-red-500/5 rounded-full blur-3xl animate-pulse-medical"
        style={{
          transform: isMouseMoving
            ? `translate(${(mousePosition.x - window.innerWidth / 2) * 0.02}px, ${(mousePosition.y - window.innerHeight / 2) * 0.02}px)`
            : "none",
          transition: "transform 0.4s ease-out",
        }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-blue-400/5 rounded-full blur-2xl animate-pulse-medical-delayed"
        style={{
          transform: isMouseMoving
            ? `translate(${(mousePosition.x - window.innerWidth / 2) * -0.02}px, ${(mousePosition.y - window.innerHeight / 2) * -0.02}px)`
            : "none",
          transition: "transform 0.4s ease-out",
        }}
      />
      <div
        className="absolute top-1/2 right-1/3 w-32 h-32 bg-green-400/10 rounded-full blur-2xl animate-pulse-slow"
        style={{
          transform: isMouseMoving
            ? `translate(${(mousePosition.x - window.innerWidth / 2) * 0.03}px, ${(mousePosition.y - window.innerHeight / 2) * 0.03}px)`
            : "none",
          transition: "transform 0.3s ease-out",
        }}
      />
    </div>
  )
}
