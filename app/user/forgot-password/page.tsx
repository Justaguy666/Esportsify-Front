"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Mail, ArrowLeft } from "lucide-react"
import { useAuthContext } from "@/contexts/auth-context"
import { validateForgotPasswordForm } from "@/lib/validations/auth"
import { ROUTES } from "@/lib/constants"
import { useToast } from "@/hooks/use-toast"

export default function ForgotPasswordPage() {
  const router = useRouter()
  const { forgotPassword, isLoading, error, clearError } = useAuthContext()
  const { toast } = useToast()

  const [email, setEmail] = useState("")
  const [validationErrors, setValidationErrors] = useState<string[]>([])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    clearError()
    setValidationErrors([])

    const validation = validateForgotPasswordForm({ email })
    if (!validation.isValid) {
      setValidationErrors(validation.errors.map((err) => err.message))
      return
    }

    try {
      await forgotPassword(email)
      toast({
        title: "Reset link sent",
        description:
          "If an account exists for this email, we’ve sent a password reset link.",
      })
      // Stay on page; user can check email or go back to login
    } catch (err) {
      // Hook sets error; toast is optional here
      toast({
        title: "Request failed",
        description:
          "Could not send reset email. Please try again later.",
        variant: "destructive" as any,
      })
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
            <button
              type="button"
              onClick={() => router.push(ROUTES.LOGIN)}
              className="inline-flex items-center gap-2 text-sm text-[#9CA3AF] hover:text-white transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Login
            </button>

            <h1 className="mt-3 text-3xl font-bold text-white">
              Forgot Password
            </h1>
            <p className="mt-1 text-sm text-[#9CA3AF]">
              Enter your email address and we’ll send you a reset link.
            </p>
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
                  <p key={index} className="text-red-400 text-sm">
                    {err}
                  </p>
                ))}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Field */}
              <div className="space-y-1">
                <label className="text-[#9CA3AF] text-sm font-medium">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#9CA3AF] h-4 w-4" />
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 bg-[#1F2937] border-[#374151] text-white placeholder-[#6B7280] h-11 text-sm rounded-lg"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div className="pt-1 space-y-3">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-[#4F46E5] to-[#3D5AF1] hover:from-[#4338CA] hover:to-[#3730A3] text-white font-bold py-2.5 text-base rounded-lg transition-all duration-200 disabled:opacity-50"
                >
                  {isLoading ? "Sending..." : "Send reset link"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}