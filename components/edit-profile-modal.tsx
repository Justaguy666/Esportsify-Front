"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { X, User, Mail, Lock, Eye, EyeOff, Edit3 } from "lucide-react"
import { useAuthContext } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"

interface EditProfileModalProps {
  isOpen: boolean
  onClose: () => void
}

export function EditProfileModal({ isOpen, onClose }: EditProfileModalProps) {
  const { user, updateProfile, changePassword, updateAvatar, isLoading, isAuthenticated } = useAuthContext()
  const router = useRouter()
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    if (isOpen && user) {
      setFormData(prev => ({
        ...prev,
        username: user.username || "",
        email: user.email || "",
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }))
      setError(null)
    }
  }, [isOpen, user])

  if (!isOpen) return null

  // If user is not authenticated, show a login-required prompt instead of the form
  if (!isAuthenticated) {
    return (
      <div
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
        onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
      >
        <div className="w-full max-w-lg mx-auto">
          <Card className="bg-gradient-to-b from-[#16213E] via-[#1A1A2E] to-[#0F0F23] border-2 border-[#3D5AF1]/50 rounded-2xl shadow-2xl">
            <CardContent className="p-0">
              <div className="relative bg-gradient-to-r from-[#16213E] via-[#1A1A2E] to-[#0F0F23] border-b border-[#3D5AF1]/30 p-6 rounded-t-2xl">
                <div className="text-center">
                  <h2 className="text-[#A5B4FC] text-2xl font-bold mb-2">Login required</h2>
                  <p className="text-[#A5B4FC]/70 text-base">Sign in to edit your profile information.</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="absolute top-4 right-4 text-[#A5B4FC] hover:text-white hover:bg-[#5B46E5]/20 rounded-lg w-8 h-8"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <div className="p-6">
                <div className="flex justify-center gap-3">
                  <Button className="bg-[#5B46E5] hover:bg-[#4F46E5]" onClick={() => router.push('/login')}>
                    Go to Login
                  </Button>
                  <Button variant="ghost" className="border border-[#3D5AF1] text-white" onClick={onClose}>
                    Close
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const handleSave = async () => {
    try {
      setError(null)
      // Basic validation
      if (!formData.username.trim()) {
        setError("Username is required")
        return
      }
      if (!formData.email.trim()) {
        setError("Email is required")
        return
      }

      await updateProfile({ username: formData.username.trim(), email: formData.email.trim() })

      if (formData.newPassword) {
        if (formData.newPassword !== formData.confirmPassword) {
          setError("New password and confirmation do not match")
          return
        }
        await changePassword(formData.currentPassword, formData.newPassword)
      }

      onClose()
    } catch (e: any) {
      setError(e?.message || "Failed to save changes")
    }
  }

  const handleCancel = () => {
    if (user) {
      setFormData({
        username: user.username || "",
        email: user.email || "",
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })
    }
    onClose()
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  const handleAvatarClick = () => {
    fileInputRef.current?.click()
  }

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = async () => {
      const dataUrl = reader.result as string
      try {
        await updateAvatar(dataUrl)
      } catch (err) {
        console.error("Avatar update failed", err)
      }
    }
    reader.readAsDataURL(file)
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={handleBackdropClick}
    >
      <div className="w-full max-w-lg mx-auto">
        <Card className="bg-gradient-to-b from-[#16213E] via-[#1A1A2E] to-[#0F0F23] border-2 border-[#3D5AF1]/50 rounded-2xl shadow-2xl">
          <CardContent className="p-0">
            {/* Header */}
            <div className="relative bg-gradient-to-r from-[#16213E] via-[#1A1A2E] to-[#0F0F23] border-b border-[#3D5AF1]/30 p-6 rounded-t-2xl">
              <div className="text-center">
                <h2 className="text-[#A5B4FC] text-2xl font-bold mb-2">Edit personal information</h2>
                <p className="text-[#A5B4FC]/70 text-base">Update your personal info</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="absolute top-4 right-4 text-[#A5B4FC] hover:text-white hover:bg-[#5B46E5]/20 rounded-lg w-8 h-8"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {error && (
                <div className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-md px-3 py-2">
                  {error}
                </div>
              )}
              {/* Profile Avatar Section */}
              <div className="flex justify-center">
                <div className="relative">
                  {user?.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user?.username || "User"}
                      className="w-20 h-20 rounded-full object-cover shadow-lg"
                    />
                  ) : (
                    <div className="w-20 h-20 bg-gradient-to-r from-[#3D5AF1] to-[#7C3AED] rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                      {(user?.username?.[0] || 'U').toUpperCase()}
                    </div>
                  )}
                  <div
                    className="absolute -bottom-1 -right-1 w-7 h-7 bg-gradient-to-r from-[#E4E4E4] to-[#7C3AED] rounded-lg flex items-center justify-center cursor-pointer hover:scale-110 transition-transform shadow-md"
                    onClick={handleAvatarClick}
                  >
                    <Edit3 className="w-3.5 h-3.5 text-white" />
                    <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
                  </div>
                </div>
              </div>

              {/* Username */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[#A5B4FC] text-sm font-medium">
                  <User className="w-4 h-4" />
                  <span>Username</span>
                </div>
                <Input
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  className="bg-gradient-to-r from-[#16213E]/80 via-[#1A1A2E]/80 to-[#0F0F23]/80 border border-[#3D5AF1]/30 text-white text-sm rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-[#3D5AF1] focus:border-transparent"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[#A5B4FC] text-sm font-medium">
                  <Mail className="w-4 h-4" />
                  <span>Email</span>
                </div>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-gradient-to-r from-[#16213E]/80 via-[#1A1A2E]/80 to-[#0F0F23]/80 border border-[#3D5AF1]/30 text-white text-sm rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-[#3D5AF1] focus:border-transparent"
                />
              </div>

              {/* Divider */}
              <div className="h-px bg-gradient-to-r from-transparent via-[#3D5AF1]/50 to-transparent"></div>

              {/* Password Section */}
              <div className="space-y-4">
                <h3 className="text-[#A5B4FC] text-lg font-semibold">Change your password</h3>

                {/* Current Password */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[#A5B4FC] text-sm font-medium">
                    <Lock className="w-4 h-4" />
                    <span>Current password</span>
                  </div>
                  <div className="relative">
                    <Input
                      type={showCurrentPassword ? "text" : "password"}
                      value={formData.currentPassword}
                      onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                      className="bg-gradient-to-r from-[#16213E]/80 via-[#1A1A2E]/80 to-[#0F0F23]/80 border border-[#3D5AF1]/30 text-white text-sm rounded-lg px-3 py-2.5 pr-10 focus:ring-2 focus:ring-[#3D5AF1] focus:border-transparent"
                      placeholder="Enter current password"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-1 top-1/2 -translate-y-1/2 text-[#A5B4FC] hover:text-white w-8 h-8"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    >
                      {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>

                {/* New Password */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[#A5B4FC] text-sm font-medium">
                    <Lock className="w-4 h-4" />
                    <span>New password</span>
                  </div>
                  <div className="relative">
                    <Input
                      type={showNewPassword ? "text" : "password"}
                      value={formData.newPassword}
                      onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                      className="bg-gradient-to-r from-[#16213E]/80 via-[#1A1A2E]/80 to-[#0F0F23]/80 border border-[#3D5AF1]/30 text-white text-sm rounded-lg px-3 py-2.5 pr-10 focus:ring-2 focus:ring-[#3D5AF1] focus:border-transparent"
                      placeholder="Enter new password"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-1 top-1/2 -translate-y-1/2 text-[#A5B4FC] hover:text-white w-8 h-8"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                      {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>

                {/* Confirm New Password */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[#A5B4FC] text-sm font-medium">
                    <Lock className="w-4 h-4" />
                    <span>Confirm new password</span>
                  </div>
                  <div className="relative">
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      className="bg-gradient-to-r from-[#16213E]/80 via-[#1A1A2E]/80 to-[#0F0F23]/80 border border-[#3D5AF1]/30 text-white text-sm rounded-lg px-3 py-2.5 pr-10 focus:ring-2 focus:ring-[#3D5AF1] focus:border-transparent"
                      placeholder="Confirm new password"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-1 top-1/2 -translate-y-1/2 text-[#A5B4FC] hover:text-white w-8 h-8"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <Button
                  onClick={handleSave}
                  className="flex-1 bg-gradient-to-r from-[#3D5AF1] to-[#7C3AED] hover:from-[#2563EB] hover:to-[#6D28D9] text-white font-semibold text-sm py-2.5 rounded-lg shadow-lg hover:shadow-xl transition-all"
                  disabled={isLoading}
                >
                  Save changes
                </Button>
                <Button
                  onClick={handleCancel}
                  variant="ghost"
                  className="flex-1 bg-gradient-to-r from-[#16213E]/80 via-[#1A1A2E]/80 to-[#0F0F23]/80 hover:from-[#16213E] hover:via-[#1A1A2E] hover:to-[#0F0F23] border border-[#3D5AF1]/30 text-white font-semibold text-sm py-2.5 rounded-lg transition-all"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
