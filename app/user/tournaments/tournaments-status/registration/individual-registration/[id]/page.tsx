"use client"

import React, { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Upload, X, CheckCircle2 } from 'lucide-react'
import { useRouter, useParams } from "next/navigation"
import GlobalLayout from "@/components/global-layout"
import GlobalFooter from "@/components/global-footer"
import { getTournamentById } from "@/data/tournaments"

export default function IndividualRegistrationPage() {
  const router = useRouter()
  const params = useParams()
  const tournamentId = (params?.id as string) || ''
  const tournament = getTournamentById(tournamentId)

  const [playerName, setPlayerName] = useState("")
  const [playerEmail, setPlayerEmail] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [gameId, setGameId] = useState("")
  const [playerPhoto, setPlayerPhoto] = useState<File | null>(null)
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [errors, setErrors] = useState<{[key: string]: string}>({})
  const [isDragging, setIsDragging] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  // Auto-hide success notification after 5 seconds
  useEffect(() => {
    if (submitSuccess && !timerRef.current) {
      timerRef.current = setTimeout(() => {
        setSubmitSuccess(false)
        timerRef.current = null
      }, 5000)
    }
    
    if (!submitSuccess && timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
    
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
        timerRef.current = null
      }
    }
  }, [submitSuccess])

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      const file = files[0]
      if (file && file.type.startsWith('image/')) {
        setPlayerPhoto(file)
        clearFieldError('playerPhoto')
      }
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      const file = files[0]
      if (file && file.type.startsWith('image/')) {
        setPlayerPhoto(file)
        clearFieldError('playerPhoto')
      }
    }
  }

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePhone = (phone: string) => {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/
    return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''))
  }

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {}

    // Player validation
    if (!playerName.trim()) {
      newErrors.playerName = "Player name is required"
    }
    if (!playerEmail.trim()) {
      newErrors.playerEmail = "Email is required"
    } else if (!validateEmail(playerEmail)) {
      newErrors.playerEmail = "Please enter a valid email address"
    }
    if (!phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required"
    } else if (!validatePhone(phoneNumber)) {
      newErrors.phoneNumber = "Please enter a valid phone number"
    }
    if (!gameId.trim()) {
      newErrors.gameId = "Game ID is required"
    }
    if (!playerPhoto) {
      newErrors.playerPhoto = "Player photo is required"
    }

    // Terms validation
    if (!agreedToTerms) {
      newErrors.terms = "You must agree to the terms and conditions"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault()
    }
    
    if (isSubmitting) {
      return
    }
    
    // Validate form first
    if (!validateForm()) {
      return
    }
    
    setIsSubmitting(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      setSubmitSuccess(true)
      
      // Auto-hide after 5 seconds
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
      
      timerRef.current = setTimeout(() => {
        setSubmitSuccess(false)
        timerRef.current = null
        // Redirect to registration page
        router.push(`/tournaments/tournaments-status/registration/${tournamentId}`)
      }, 5000)
      
    } catch (error) {
      setErrors({ submit: "Registration failed. Please try again." })
    } finally {
      setIsSubmitting(false)
    }
  }

  const clearFieldError = (fieldName: string) => {
    if (errors[fieldName]) {
      setErrors(prev => ({ ...prev, [fieldName]: "" }))
    }
  }

  if (!tournament) {
    return (
      <GlobalLayout>
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <h1 className="text-3xl font-bold mb-4">Tournament Not Found</h1>
          <p className="text-muted-foreground mb-4">The tournament you're looking for doesn't exist.</p>
          <Button onClick={() => router.push('/tournaments')} className="bg-[#3D5AF1] hover:bg-[#2563EB]">
            Back to Tournaments
          </Button>
        </div>
      </GlobalLayout>
    )
  }

  return (
    <>
      {submitSuccess && (
        <div 
          className="fixed inset-0 flex items-center justify-center"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <div 
            className="flex items-center justify-between w-full max-w-lg p-6 bg-[#1A1A2E] border-2 border-[#10B981] text-white rounded-2xl shadow-2xl"
            role="alert"
            style={{
              minWidth: '400px',
              maxWidth: '500px'
            }}
          >
            <div className="flex items-center">
              <CheckCircle2 className="text-[#10B981] mr-3" size={24} />
              <p className="font-semibold">Registration successful! We will contact you soon.</p>
            </div>
            <button 
              onClick={() => {
                if (timerRef.current) {
                  clearTimeout(timerRef.current)
                  timerRef.current = null
                }
                setSubmitSuccess(false)
                router.push(`/tournaments/tournaments-status/registration/${tournamentId}`)
              }} 
              className="p-1 rounded-full text-gray-400 hover:bg-white/10 hover:text-white transition-colors"
              aria-label="Close"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      )}
      
      <GlobalLayout 
        tournamentSelected={true}
        tournamentId={tournamentId}
        gameName={tournament?.game}
      >
        <div className="min-h-screen bg-gradient-to-br from-[#0F0F23] via-[#1A1A2E] to-[#16213E] p-6">
        <div className="flex-1 py-12">
          
          {/* Hero Section - Tournament Image with Overlay */}
          <div className="w-full px-8 mb-12">
            <div className="relative w-full h-[600px] rounded-[27px] border border-[#10B981] overflow-hidden" 
                 style={{ filter: 'drop-shadow(0px 10.57px 42.3px rgba(16, 185, 129, 0.2))' }}>
              
              {/* Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: 'url(/placeholder.svg?height=461&width=1346&text=Tournament+Background)'
                }}
              />
              
              {/* Dark Overlay */}
              <div 
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(90deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.4) 50%, rgba(0, 0, 0, 0) 100%)',
                }}
              />
              
              {/* REGISTRATION Status Badge */}
              <div className="absolute top-8 right-8 bg-gradient-to-r from-[#10B981] to-[#059669] rounded-xl shadow-lg px-6 py-2">
                <span className="text-white font-semibold text-lg">
                  REGISTRATION
                </span>
              </div>
              
              {/* Title */}
              <h1 className="absolute bottom-24 left-8 text-white font-bold text-6xl max-w-4xl leading-tight">
                {tournament?.name || 'World Championship 2024'}
              </h1>
              
              {/* Subtitle */}
              <p className="absolute bottom-8 left-8 text-[#A5B4FC] font-medium text-3xl">
                {tournament?.game || 'League of Legends'}
              </p>
            </div>
          </div>

          {/* Registration Form */}
          <div className="w-full px-8 mb-12">
            <div className="relative w-full rounded-[27px] border border-[#10B981] overflow-hidden" style={{ filter: 'drop-shadow(0px 10.57px 42.3px rgba(16, 185, 129, 0.2))' }}>
              <Card className="bg-gradient-to-br from-[#1A1A2E] via-[#2A2A4A] to-[#1E1E3F] border-0 shadow-none rounded-[27px] overflow-hidden">
                <CardContent className="p-0">
                  
                  {/* Form Header Section */}
                  <div className="bg-gradient-to-r from-[#3D5AF1]/20 to-[#10B981]/20 px-16 py-16 border-b border-[#3D5AF1]/30">
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center bg-gradient-to-r from-[#3D5AF1] to-[#10B981] rounded-full px-10 py-4 mb-8">
                        <span className="text-white font-bold text-xl">INDIVIDUAL REGISTRATION</span>
                      </div>
                      <h2 className="text-white font-bold text-6xl mb-6">Registration Form</h2>
                      <p className="text-[#A5B4FC] text-2xl max-w-3xl mx-auto leading-relaxed">Complete your individual registration and provide all required information to participate in the tournament</p>
                    </div>
                  </div>

                  {/* Form Content */}
                  <div className="px-16 py-12">

                    {/* Player Information Section */}
                    <div className="mb-20">
                      <h3 className="text-white text-4xl font-bold mb-10 flex items-center">
                        <div className="w-2 h-10 bg-gradient-to-b from-[#3D5AF1] to-[#10B981] rounded-full mr-6"></div>
                        Player Information
                      </h3>
                    
                    {/* Player Photo Upload - First Row */}
                    <div className="mb-10">
                      <label className="text-[#A5B4FC] text-xl font-semibold block mb-6">Player Picture *</label>
                      <div 
                        className={`border-2 border-dashed rounded-3xl p-10 text-center bg-gradient-to-br from-[#16213E]/50 to-[#1A1A2E]/50 h-[320px] flex flex-col justify-center transition-colors cursor-pointer ${
                          isDragging 
                            ? 'border-[#10B981] bg-[#10B981]/10' 
                            : errors.playerPhoto 
                              ? 'border-red-500' 
                              : 'border-[#3D5AF1] hover:border-[#10B981]'
                        }`}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onClick={() => document.getElementById('player-photo-input')?.click()}
                      >
                        <input
                          id="player-photo-input"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleFileSelect}
                        />
                        <Upload className="w-16 h-16 text-[#3D5AF1] mx-auto mb-6" />
                        {playerPhoto ? (
                          <div>
                            <p className="text-[#10B981] font-semibold text-xl mb-2">✓ {playerPhoto.name}</p>
                            <p className="text-[#A5B4FC] text-sm">Click to change file</p>
                          </div>
                        ) : (
                          <div>
                            <p className="text-white font-semibold text-xl mb-3">Drop your picture here</p>
                            <p className="text-[#A5B4FC] text-base mb-3">or <span className="text-[#3D5AF1] cursor-pointer font-semibold hover:text-[#10B981]">browse files</span></p>
                            <p className="text-[#6B7280] text-sm">PNG, JPG up to 10MB</p>
                          </div>
                        )}
                      </div>
                      {errors.playerPhoto && <p className="text-red-400 text-sm mt-2">{errors.playerPhoto}</p>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                      {/* Full Name */}
                      <div>
                        <label className="text-[#A5B4FC] text-xl font-semibold block mb-4">Full Name *</label>
                        <Input
                          value={playerName}
                          onChange={(e) => {
                            setPlayerName(e.target.value)
                            clearFieldError('playerName')
                          }}
                          placeholder="Enter your full name"
                          className={`bg-[#0F0F23]/80 border-2 focus:border-[#3D5AF1] text-white placeholder-[#6B7280] text-xl rounded-2xl h-16 px-8 transition-all ${
                            errors.playerName ? 'border-red-500' : 'border-[#3D5AF1]/50'
                          }`}
                        />
                        {errors.playerName && <p className="text-red-400 text-sm mt-2">{errors.playerName}</p>}
                      </div>

                      {/* Game ID */}
                      <div>
                        <label className="text-[#A5B4FC] text-xl font-semibold block mb-4">Game ID *</label>
                        <Input
                          value={gameId}
                          onChange={(e) => {
                            setGameId(e.target.value)
                            clearFieldError('gameId')
                          }}
                          placeholder="Your in-game ID"
                          className={`bg-[#0F0F23]/80 border-2 focus:border-[#3D5AF1] text-white placeholder-[#6B7280] text-xl rounded-2xl h-16 px-8 transition-all ${
                            errors.gameId ? 'border-red-500' : 'border-[#3D5AF1]/50'
                          }`}
                        />
                        {errors.gameId && <p className="text-red-400 text-sm mt-2">{errors.gameId}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                      {/* Phone Number */}
                      <div>
                        <label className="text-[#A5B4FC] text-xl font-semibold block mb-4">Phone Number *</label>
                        <Input
                          value={phoneNumber}
                          onChange={(e) => {
                            setPhoneNumber(e.target.value)
                            clearFieldError('phoneNumber')
                          }}
                          placeholder="Enter your phone number"
                          className={`bg-[#0F0F23]/80 border-2 focus:border-[#3D5AF1] text-white placeholder-[#6B7280] text-xl rounded-2xl h-16 px-8 transition-all ${
                            errors.phoneNumber ? 'border-red-500' : 'border-[#3D5AF1]/50'
                          }`}
                        />
                        {errors.phoneNumber && <p className="text-red-400 text-sm mt-2">{errors.phoneNumber}</p>}
                      </div>

                      {/* Email */}
                      <div>
                        <label className="text-[#A5B4FC] text-xl font-semibold block mb-4">Email *</label>
                        <Input
                          value={playerEmail}
                          onChange={(e) => {
                            setPlayerEmail(e.target.value)
                            clearFieldError('playerEmail')
                          }}
                          placeholder="Enter your email"
                          type="email"
                          className={`bg-[#0F0F23]/80 border-2 focus:border-[#3D5AF1] text-white placeholder-[#6B7280] text-xl rounded-2xl h-16 px-8 transition-all ${
                            errors.playerEmail ? 'border-red-500' : 'border-[#3D5AF1]/50'
                          }`}
                        />
                        {errors.playerEmail && <p className="text-red-400 text-sm mt-2">{errors.playerEmail}</p>}
                      </div>
                    </div>
                  </div>

                  {/* Terms and Conditions */}
                  <div className="mb-16">
                    <div className="flex items-start gap-6">
                      <Checkbox 
                        checked={agreedToTerms}
                        onCheckedChange={(checked) => {
                          setAgreedToTerms(checked as boolean)
                          clearFieldError('terms')
                        }}
                        className="mt-2 w-6 h-6 border-2 border-[#666666] data-[state=checked]:bg-[#10B981] data-[state=checked]:border-[#10B981]"
                      />
                      <label className="text-[#A5B4FC] text-lg font-normal leading-relaxed">
                        I agree to the <span 
                          className="text-[#3D5AF1] cursor-pointer font-semibold hover:text-[#10B981] transition-colors"
                          onClick={() => router.push(`/tournaments/tournaments-status/rules/${tournamentId}`)}
                        >Terms and Conditions and the Privacy Policy</span>
                      </label>
                    </div>
                    {errors.terms && <p className="text-red-400 text-sm mt-2">{errors.terms}</p>}
                  </div>

                    {/* Submit Button */}
                    <div className="text-center">
                      <Button
                        onClick={(e) => {
                          e.preventDefault()
                          handleSubmit()
                        }}
                        disabled={isSubmitting}
                        type="button"
                        className="bg-gradient-to-r from-[#3D5AF1] to-[#10B981] hover:from-[#2563EB] hover:to-[#059669] text-white font-bold text-2xl px-16 py-6 rounded-3xl shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed h-20 min-w-[400px] transition-all transform hover:scale-105"
                      >
                        {isSubmitting ? (
                          <div className="flex items-center">
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                            Submitting...
                          </div>
                        ) : (
                          "Submit"
                        )}
                      </Button>
                      {errors.submit && <p className="text-red-400 text-lg mt-4">{errors.submit}</p>}
                    </div>

                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

            {/* Registration Requirements */}
            <div className="w-full px-8 mb-12">
              <div className="relative w-full rounded-[27px] border border-[#10B981] overflow-hidden" style={{ filter: 'drop-shadow(0px 10.57px 42.3px rgba(16, 185, 129, 0.2))' }}>
                <Card className="bg-gradient-to-br from-[#1A1A2E] via-[#2A2A4A] to-[#1E1E3F] border-0 shadow-none rounded-[27px] overflow-hidden">
                  <CardContent className="px-16 py-12">
                    <h2 className="text-white text-4xl font-bold mb-10 flex items-center">
                      <div className="w-2 h-10 bg-gradient-to-b from-[#3D5AF1] to-[#10B981] rounded-full mr-6"></div>
                      Registration Requirements
                    </h2>
                    <ul className="space-y-6">
                      <li className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-[#10B981] rounded-full"></div>
                        <span className="text-[#A5B4FC] text-xl">Player must be 16 years or older</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-[#10B981] rounded-full"></div>
                        <span className="text-[#A5B4FC] text-xl">Valid government ID required for verification</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-[#10B981] rounded-full"></div>
                        <span className="text-[#A5B4FC] text-xl">Minimum rank requirement: Gold III</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-[#10B981] rounded-full"></div>
                        <span className="text-[#A5B4FC] text-xl">Registration deadline: Feb 15, 2025</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>

          </div>
          <GlobalFooter />
        </div>
      </GlobalLayout>
    </>
  )
}
