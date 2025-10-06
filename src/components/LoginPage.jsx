"use client";

import { Activity, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useState, useEffect } from "react";

export default function LoginPage({ onLogin }) {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Load saved credentials
  useEffect(() => {
    const savedCredentials = localStorage.getItem("medinovaCredentials");
    if (savedCredentials) {
      const { email, password, remember } = JSON.parse(savedCredentials);
      if (remember) {
        setFormData({ email, password });
        setRememberMe(true);
      }
    }
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:4001/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Invalid email or password");
      }

      // Save credentials if remember me is checked
      if (rememberMe) {
        localStorage.setItem(
          "medinovaCredentials",
          JSON.stringify({
            email: formData.email,
            password: formData.password,
            remember: true,
          })
        );
      } else {
        localStorage.removeItem("medinovaCredentials");
      }

      // Store token and user info
      localStorage.setItem("adminToken", data.token);
      localStorage.setItem("adminUser", JSON.stringify(data.admin));

      onLogin?.(); // trigger parent login success handler
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    alert("Password reset link has been sent to your email address.");
  };

  return (
    <div className="min-h-screen bg-[#023e8a] flex items-center justify-center p-4 relative overflow-hidden">
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 md:p-8 shadow-2xl">
          {/* Logo and Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl mb-4 shadow-lg">
              <Activity className="w-8 h-8 text-[#023e8a]" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
              MediNova
            </h1>
            <p className="text-white/70 text-sm md:text-base">
              Advanced Healthcare Administration
            </p>
            <p className="text-white/50 text-xs md:text-sm mt-1">
              Secure Admin Portal
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-500/20 border border-red-400 text-red-200 text-sm rounded-md p-2 mb-4 text-center">
              {error}
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-white font-medium mb-2 text-sm md:text-base">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4 md:w-5 md:h-5" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/10 border border-white/30 rounded-lg pl-10 md:pl-12 pr-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all text-sm md:text-base"
                  placeholder="admin@medinova.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-white font-medium mb-2 text-sm md:text-base">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4 md:w-5 md:h-5" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/10 border border-white/30 rounded-lg pl-10 md:pl-12 pr-12 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all text-sm md:text-base"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4 md:w-5 md:h-5" />
                  ) : (
                    <Eye className="w-4 h-4 md:w-5 md:h-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2 text-white/70 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-white/30 bg-white/10 text-white focus:ring-white/50 focus:ring-2"
                />
                <span className="text-xs md:text-sm">Remember me</span>
              </label>
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-xs md:text-sm text-white/70 hover:text-white transition-colors"
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-white text-[#023e8a] py-3 rounded-lg font-semibold hover:bg-white/90 transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2 text-sm md:text-base"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-[#023e8a] border-t-transparent rounded-full animate-spin"></div>
                  <span>Signing In...</span>
                </>
              ) : (
                <span>Sign In to Dashboard</span>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-white/50 text-xs md:text-sm">
              Secure healthcare administration platform
            </p>
            <p className="text-white/40 text-xs mt-2">
              Version 2.0 - Enhanced Security
            </p>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-6 text-center">
          <p className="text-white/60 text-xs md:text-sm">
            Need help? Contact IT Support at{" "}
            <a
              href="mailto:support@medinova.com"
              className="text-white hover:underline"
            >
              support@medinova.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
