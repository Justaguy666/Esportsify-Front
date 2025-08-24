"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react"
import { useAuthContext } from "@/contexts/auth-context"
import { validateLoginForm, validateRegisterForm } from "@/lib/validations/auth"
import { ROUTES } from "@/lib/constants"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [activeTab, setActiveTab] = useState("login")
  const router = useRouter()
  const { login, register, isLoading, error, clearError } = useAuthContext()
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [validationErrors, setValidationErrors] = useState<string[]>([])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    clearError()
    setValidationErrors([])

    try {
      if (activeTab === "login") {
        const validation = validateLoginForm({
          email: formData.email,
          password: formData.password,
        })
        
        if (!validation.isValid) {
          setValidationErrors(validation.errors.map(err => err.message))
          return
        }
        
        await login({
          email: formData.email,
          password: formData.password,
        })
      } else {
        const validation = validateRegisterForm({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        })
        
        if (!validation.isValid) {
          setValidationErrors(validation.errors.map(err => err.message))
          return
        }
        
        await register({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        })
      }
    } catch (err) {
      // Error is handled by the auth hook
      console.error('Authentication error:', err)
    }
  }

  return (
    <div className="min-h-screen bg-[#0A0E1A] text-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#4F46E5]/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-[#3D5AF1]/20 rounded-full blur-3xl"></div>
      </div>

      {/* Main Content - Centered Form */}
      <div className="relative z-10 flex items-center justify-center px-6 py-6 min-h-screen">
        <Card className="w-full max-w-md bg-[#080D1B]/90 backdrop-blur-xl border border-[#1F2937] shadow-2xl">
          <CardHeader className="text-center pb-2">
            {/* Tab Navigation */}
            <div className="flex justify-center mb-2">
              <div className="flex bg-transparent">
                <button
                  onClick={() => setActiveTab("login")}
                  className={`px-6 py-2 text-xl font-bold transition-colors ${
                    activeTab === "login" ? "text-[#4F46E5]" : "text-[#9CA3AF]"
                  }`}
                >
                  Login
                </button>
                <button
                  onClick={() => setActiveTab("register")}
                  className={`px-6 py-2 text-xl font-bold transition-colors ${
                    activeTab === "register" ? "text-[#4F46E5]" : "text-[#9CA3AF]"
                  }`}
                >
                  Register
                </button>
              </div>
            </div>

            <h1 className="text-3xl font-bold text-white mb-2">
              {activeTab === "login" ? "Welcome Back" : "Create Account"}
            </h1>
          </CardHeader>

          {/* Custom Separator */}
          <div className="px-6 mb-3">
            <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#374151] to-transparent"></div>
          </div>

          <CardContent className="space-y-4 px-6 pb-6">
            {/* Error Display */}
            {(error || validationErrors.length > 0) && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                {error && <p className="text-red-400 text-sm mb-2">{error}</p>}
                {validationErrors.map((err, index) => (
                  <p key={index} className="text-red-400 text-sm">{err}</p>
                ))}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4">
              {activeTab === "login" ? (
                <>
                  {/* Email Field */}
                  <div className="space-y-1">
                    <label className="text-[#9CA3AF] text-sm font-medium">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#9CA3AF] h-4 w-4" />
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="pl-10 bg-[#1F2937] border-[#374151] text-white placeholder-[#6B7280] h-11 text-sm rounded-lg"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div className="space-y-1">
                    <label className="text-[#9CA3AF] text-sm font-medium">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#9CA3AF] h-4 w-4" />
                      <Input
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="pl-10 pr-10 bg-[#1F2937] border-[#374151] text-white placeholder-[#6B7280] h-11 text-sm rounded-lg"
                        placeholder="Enter your password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#9CA3AF] hover:text-white transition-colors"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Forgot Password Link */}
                  <div className="text-right">
                    <button
                      type="button"
                      onClick={() => router.push("/forgot-password")}
                      className="text-sm text-[#4F46E5] hover:text-[#3D5AF1] transition-colors font-medium"
                    >
                      Forgot Password?
                    </button>
                  </div>

                  <div className="pt-1">
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-gradient-to-r from-[#4F46E5] to-[#3D5AF1] hover:from-[#4338CA] hover:to-[#3730A3] text-white font-bold py-2.5 text-base rounded-lg transition-all duration-200 disabled:opacity-50"
                    >
                      {isLoading ? "Signing In..." : "Sign In"}
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  {/* Username Field */}
                  <div className="space-y-1">
                    <label className="text-[#9CA3AF] text-sm font-medium">Username</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#9CA3AF] h-4 w-4" />
                      <Input
                        type="text"
                        value={formData.username}
                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                        className="pl-10 bg-[#1F2937] border-[#374151] text-white placeholder-[#6B7280] h-11 text-sm rounded-lg"
                        placeholder="Choose a username"
                      />
                    </div>
                  </div>

                  {/* Email Field */}
                  <div className="space-y-1">
                    <label className="text-[#9CA3AF] text-sm font-medium">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#9CA3AF] h-4 w-4" />
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="pl-10 bg-[#1F2937] border-[#374151] text-white placeholder-[#6B7280] h-11 text-sm rounded-lg"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div className="space-y-1">
                    <label className="text-[#9CA3AF] text-sm font-medium">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#9CA3AF] h-4 w-4" />
                      <Input
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="pl-10 pr-10 bg-[#1F2937] border-[#374151] text-white placeholder-[#6B7280] h-11 text-sm rounded-lg"
                        placeholder="Create a password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#9CA3AF] hover:text-white transition-colors"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Confirm Password Field */}
                  <div className="space-y-1">
                    <label className="text-[#9CA3AF] text-sm font-medium">Confirm Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#9CA3AF] h-4 w-4" />
                      <Input
                        type={showConfirmPassword ? "text" : "password"}
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                        className="pl-10 pr-10 bg-[#1F2937] border-[#374151] text-white placeholder-[#6B7280] h-11 text-sm rounded-lg"
                        placeholder="Confirm your password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#9CA3AF] hover:text-white transition-colors"
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="pt-1">
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-gradient-to-r from-[#4F46E5] to-[#3D5AF1] hover:from-[#4338CA] hover:to-[#3730A3] text-white font-bold py-2.5 text-base rounded-lg transition-all duration-200 disabled:opacity-50"
                    >
                      {isLoading ? "Creating Account..." : "Create Account"}
                    </Button>
                  </div>
                </>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
