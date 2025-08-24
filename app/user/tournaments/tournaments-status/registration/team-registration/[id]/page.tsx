"use client"

import React, { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Upload, Plus, X, CheckCircle2 } from 'lucide-react'
import { useRouter, useParams } from "next/navigation"
import GlobalLayout from "@/components/global-layout"
import GlobalFooter from "@/components/global-footer"
import { getTournamentById } from "@/data/tournaments"

interface TeamMember {
  id: string
  fullName: string
  tag: string
  gameId: string
}

export default function TeamRegistrationPage() {
  const router = useRouter()
  const params = useParams()
  const tournamentId = (params?.id as string) || ''
  const tournament = getTournamentById(tournamentId)

  const [teamName, setTeamName] = useState("")
  const [teamTag, setTeamTag] = useState("")
  const [managerName, setManagerName] = useState("")
  const [managerEmail, setManagerEmail] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    { id: "1", fullName: "", tag: "", gameId: "" },
    { id: "2", fullName: "", tag: "", gameId: "" },
    { id: "3", fullName: "", tag: "", gameId: "" },
    { id: "4", fullName: "", tag: "", gameId: "" },
    { id: "5", fullName: "", tag: "", gameId: "" }
  ])
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [teamLogo, setTeamLogo] = useState<File | null>(null)
  const [playerPhotos, setPlayerPhotos] = useState<{[key: string]: File | null}>({})
  const [errors, setErrors] = useState<{[key: string]: string}>({})
  const [isDragging, setIsDragging] = useState<{[key: string]: boolean}>({})
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

  const addTeamMember = () => {
    if (teamMembers.length < 10) {
      const newMember: TeamMember = {
        id: Date.now().toString(),
        fullName: "",
        tag: "",
        gameId: ""
      }
      setTeamMembers([...teamMembers, newMember])
    }
  }

  const removeTeamMember = (id: string) => {
    if (teamMembers.length > 5) {
      setTeamMembers(teamMembers.filter(member => member.id !== id))
      // Remove associated photo
      const newPhotos = { ...playerPhotos }
      delete newPhotos[id]
      setPlayerPhotos(newPhotos)
      // Clear any errors for this member
      const newErrors = { ...errors }
      delete newErrors[`member_${id}_fullName`]
      // lastName field removed - not in form
      delete newErrors[`member_${id}_tag`]
      delete newErrors[`member_${id}_gameId`]
      delete newErrors[`player_${id}`]
      setErrors(newErrors)
    }
  }

  const updateTeamMember = (id: string, field: keyof TeamMember, value: string) => {
    setTeamMembers(teamMembers.map(member => 
      member.id === id ? { ...member, [field]: value } : member
    ))
    // Clear error when user starts typing
    if (errors[`member_${id}_${field}`]) {
      setErrors(prev => ({ ...prev, [`member_${id}_${field}`]: "" }))
    }
  }

  // File upload handlers
  const handleFileUpload = (file: File, type: 'logo' | 'player', playerId?: string) => {
    if (!file.type.startsWith('image/')) {
      setErrors(prev => ({ ...prev, [`${type}_${playerId || 'logo'}`]: "Please upload an image file" }))
      return
    }
    if (file.size > 10 * 1024 * 1024) {
      setErrors(prev => ({ ...prev, [`${type}_${playerId || 'logo'}`]: "File size must be less than 10MB" }))
      return
    }
    
    if (type === 'logo') {
      setTeamLogo(file)
      setErrors(prev => ({ ...prev, logo: "" }))
    } else if (playerId) {
      setPlayerPhotos(prev => ({ ...prev, [playerId]: file }))
      setErrors(prev => ({ ...prev, [`player_${playerId}`]: "" }))
    }
  }

  const handleDragOver = (e: React.DragEvent, id: string) => {
    e.preventDefault()
    setIsDragging(prev => ({ ...prev, [id]: true }))
  }

  const handleDragLeave = (e: React.DragEvent, id: string) => {
    e.preventDefault()
    setIsDragging(prev => ({ ...prev, [id]: false }))
  }

  const handleDrop = (e: React.DragEvent, type: 'logo' | 'player', playerId?: string) => {
    e.preventDefault()
    const id = playerId || 'logo'
    setIsDragging(prev => ({ ...prev, [id]: false }))
    
    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0 && files[0]) {
      handleFileUpload(files[0], type, playerId)
    }
  }

  // Validation functions
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

    // Team validation
    if (!teamName.trim()) {
      newErrors.teamName = "Team name is required"
    }
    if (!teamTag.trim()) {
      newErrors.teamTag = "Team tag is required"
    }
    if (!teamLogo) {
      newErrors.logo = "Team logo is required"
    }

    // Manager validation
    if (!managerName.trim()) {
      newErrors.managerName = "Manager name is required"
    }
    if (!managerEmail.trim()) {
      newErrors.managerEmail = "Email is required"
    } else if (!validateEmail(managerEmail)) {
      newErrors.managerEmail = "Please enter a valid email address"
    }
    if (!phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required"
    } else if (!validatePhone(phoneNumber)) {
      newErrors.phoneNumber = "Please enter a valid phone number"
    }

    // Team members validation
    if (teamMembers.length < 5) {
      newErrors.teamSize = "Team must have at least 5 members"
    }
    
    teamMembers.forEach((member, index) => {
      if (!member.fullName.trim()) {
        newErrors[`member_${member.id}_fullName`] = "Full name is required"
      }
      if (!member.tag.trim()) {
        newErrors[`member_${member.id}_tag`] = "Tag is required"
      }
      if (!member.gameId.trim()) {
        newErrors[`member_${member.id}_gameId`] = "Game ID is required"
      }
      if (!playerPhotos[member.id]) {
        newErrors[`player_${member.id}`] = "Player photo is required"
      }
    })

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
        router.push(`/user/tournaments/tournaments-status/registration/${tournamentId}`)
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
          {/* Notification popup */}
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
                // Redirect to registration page
                router.push(`/user/tournaments/tournaments-status/registration/${tournamentId}`)
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
            <Card className="bg-gradient-to-br from-[#1A1A2E] via-[#2A2A4A] to-[#1E1E3F] border border-[#10B981] shadow-[0px_10.57px_42.3px_rgba(16,185,129,0.2)] rounded-[27px] overflow-hidden">
                <CardContent className="p-0">
                  
                  {/* Form Header Section */}
                  <div className="bg-gradient-to-r from-[#3D5AF1]/20 to-[#10B981]/20 px-16 py-16 border-b border-[#3D5AF1]/30">
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center bg-gradient-to-r from-[#3D5AF1] to-[#10B981] rounded-full px-10 py-4 mb-8">
                        <span className="text-white font-bold text-xl">TEAM REGISTRATION</span>
                      </div>
                      <h2 className="text-white font-bold text-6xl mb-6">Registration Form</h2>
                      <p className="text-[#A5B4FC] text-2xl max-w-3xl mx-auto leading-relaxed">Complete your team registration and provide all required information to participate in the tournament</p>
                    </div>
                  </div>

                  {/* Form Content */}
                  <div className="px-16 py-12">
                    
                    {/* Team Information Section */}
                    <div className="mb-20">
                      <h3 className="text-white text-4xl font-bold mb-10 flex items-center">
                        <div className="w-2 h-10 bg-gradient-to-b from-[#3D5AF1] to-[#10B981] rounded-full mr-6"></div>
                        Team Information
                      </h3>
                      
                      {/* Team Logo Upload - Separate Row */}
                      <div className="mb-10">
                        <label className="text-[#A5B4FC] text-xl font-semibold block mb-6">Team Logo *</label>
                        <div 
                          className={`border-2 border-dashed rounded-3xl p-10 text-center bg-gradient-to-br from-[#16213E]/50 to-[#1A1A2E]/50 h-[320px] flex flex-col justify-center transition-colors cursor-pointer ${
                            isDragging.logo 
                              ? 'border-[#10B981] bg-[#10B981]/10' 
                              : errors.logo 
                                ? 'border-red-500' 
                                : 'border-[#3D5AF1] hover:border-[#10B981]'
                          }`}
                          onDragOver={(e) => handleDragOver(e, 'logo')}
                          onDragLeave={(e) => handleDragLeave(e, 'logo')}
                          onDrop={(e) => handleDrop(e, 'logo')}
                          onClick={() => document.getElementById('team-logo-input')?.click()}
                        >
                          <input
                            id="team-logo-input"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0]
                              if (file) handleFileUpload(file, 'logo')
                            }}
                          />
                          <Upload className="w-16 h-16 text-[#3D5AF1] mx-auto mb-6" />
                          {teamLogo ? (
                            <div>
                              <p className="text-[#10B981] font-semibold text-xl mb-2">✓ {teamLogo.name}</p>
                              <p className="text-[#A5B4FC] text-sm">Click to change file</p>
                            </div>
                          ) : (
                            <div>
                              <p className="text-white font-semibold text-xl mb-3">Drop your logo here</p>
                              <p className="text-[#A5B4FC] text-base mb-3">or <span className="text-[#3D5AF1] cursor-pointer font-semibold hover:text-[#10B981]">browse files</span></p>
                              <p className="text-[#6B7280] text-sm">PNG, JPG up to 10MB</p>
                            </div>
                          )}
                        </div>
                        {errors.logo && <p className="text-red-400 text-sm mt-2">{errors.logo}</p>}
                      </div>
                      
                      {/* Team Details - Same Row */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                          <label className="text-[#A5B4FC] text-xl font-semibold block mb-4">Team Name *</label>
                          <Input
                            value={teamName}
                            onChange={(e) => {
                              setTeamName(e.target.value)
                              clearFieldError('teamName')
                            }}
                            placeholder="Enter your team name"
                            className={`bg-[#0F0F23]/80 border-2 focus:border-[#3D5AF1] text-white placeholder-[#6B7280] text-xl rounded-2xl h-16 px-8 transition-all ${
                              errors.teamName ? 'border-red-500' : 'border-[#3D5AF1]/50'
                            }`}
                          />
                          {errors.teamName && <p className="text-red-400 text-sm mt-2">{errors.teamName}</p>}
                        </div>
                        <div>
                          <label className="text-[#A5B4FC] text-xl font-semibold block mb-4">Team Tag *</label>
                          <Input
                            value={teamTag}
                            onChange={(e) => {
                              setTeamTag(e.target.value)
                              clearFieldError('teamTag')
                            }}
                            placeholder="e.g. TSM, G2"
                            className={`bg-[#0F0F23]/80 border-2 focus:border-[#3D5AF1] text-white placeholder-[#6B7280] text-xl rounded-2xl h-16 px-8 transition-all ${
                              errors.teamTag ? 'border-red-500' : 'border-[#3D5AF1]/50'
                            }`}
                          />
                          {errors.teamTag && <p className="text-red-400 text-sm mt-2">{errors.teamTag}</p>}
                        </div>
                      </div>
                    </div>

                    {/* Team Manager Information Section */}
                    <div className="mb-20">
                      <h3 className="text-white text-4xl font-bold mb-10 flex items-center">
                        <div className="w-2 h-10 bg-gradient-to-b from-[#3D5AF1] to-[#10B981] rounded-full mr-6"></div>
                        Manager Information
                      </h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div>
                          <label className="text-[#A5B4FC] text-xl font-semibold block mb-4">Manager Name *</label>
                          <Input
                            value={managerName}
                            onChange={(e) => {
                              setManagerName(e.target.value)
                              clearFieldError('managerName')
                            }}
                            placeholder="Enter manager name"
                            className={`bg-[#0F0F23]/80 border-2 focus:border-[#3D5AF1] text-white placeholder-[#6B7280] text-xl rounded-2xl h-16 px-8 transition-all ${
                              errors.managerName ? 'border-red-500' : 'border-[#3D5AF1]/50'
                            }`}
                          />
                          {errors.managerName && <p className="text-red-400 text-sm mt-2">{errors.managerName}</p>}
                        </div>
                        <div>
                          <label className="text-[#A5B4FC] text-xl font-semibold block mb-4">Email Address *</label>
                          <Input
                            type="email"
                            value={managerEmail}
                            onChange={(e) => {
                              setManagerEmail(e.target.value)
                              clearFieldError('managerEmail')
                            }}
                            placeholder="manager@example.com"
                            className={`bg-[#0F0F23]/80 border-2 focus:border-[#3D5AF1] text-white placeholder-[#6B7280] text-xl rounded-2xl h-16 px-8 transition-all ${
                              errors.managerEmail ? 'border-red-500' : 'border-[#3D5AF1]/50'
                            }`}
                          />
                          {errors.managerEmail && <p className="text-red-400 text-sm mt-2">{errors.managerEmail}</p>}
                        </div>
                        <div>
                          <label className="text-[#A5B4FC] text-xl font-semibold block mb-4">Phone Number *</label>
                          <Input
                            type="tel"
                            value={phoneNumber}
                            onChange={(e) => {
                              setPhoneNumber(e.target.value)
                              clearFieldError('phoneNumber')
                            }}
                            placeholder="+1 (555) 123-4567"
                            className={`bg-[#0F0F23]/80 border-2 focus:border-[#3D5AF1] text-white placeholder-[#6B7280] text-xl rounded-2xl h-16 px-8 transition-all ${
                              errors.phoneNumber ? 'border-red-500' : 'border-[#3D5AF1]/50'
                            }`}
                          />
                          {errors.phoneNumber && <p className="text-red-400 text-sm mt-2">{errors.phoneNumber}</p>}
                        </div>
                      </div>
                    </div>

                    {/* Team Members Section */}
                    <div className="mb-20">
                      <div className="flex items-center justify-between mb-10">
                        <h3 className="text-white text-4xl font-bold flex items-center">
                          <div className="w-2 h-10 bg-gradient-to-b from-[#3D5AF1] to-[#10B981] rounded-full mr-6"></div>
                          Team Members
                        </h3>
                        <Button
                          onClick={addTeamMember}
                          disabled={teamMembers.length >= 10}
                          className="bg-gradient-to-r from-[#3D5AF1] to-[#10B981] hover:from-[#2563EB] hover:to-[#059669] text-white text-lg font-semibold rounded-2xl h-14 px-8 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Plus className="w-6 h-6 mr-3" />
                          Add Player ({teamMembers.length}/10)
                        </Button>
                      </div>

                      {errors.teamSize && <p className="text-red-400 text-lg mb-6 font-semibold">{errors.teamSize}</p>}
                      
                      <div className="space-y-8">
                        {teamMembers.map((member, index) => (
                          <Card key={member.id} className="bg-gradient-to-br from-[#16213E]/80 via-[#1A1A2E]/80 to-[#2A2A4A]/50 border border-[#3D5AF1]/50 rounded-3xl overflow-hidden">
                            <CardContent className="p-10">
                              <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center">
                                  <div className="w-12 h-12 bg-gradient-to-r from-[#3D5AF1] to-[#10B981] rounded-full flex items-center justify-center mr-6">
                                    <span className="text-white font-bold text-xl">{index + 1}</span>
                                  </div>
                                  <h4 className="text-white font-bold text-2xl">Player {index + 1}</h4>
                                </div>
                                {teamMembers.length > 5 && (
                                  <Button
                                    onClick={() => removeTeamMember(member.id)}
                                    variant="ghost"
                                    size="sm"
                                    className="text-red-400 hover:text-red-300 hover:bg-red-400/10 h-12 w-12 p-0 rounded-full"
                                  >
                                    <X className="w-6 h-6" />
                                  </Button>
                                )}
                              </div>

                              {/* Player Photo Upload - Separate Row */}
                              <div className="mb-8">
                                <label className="text-[#A5B4FC] text-lg font-semibold block mb-4">Player Photo *</label>
                                <div 
                                  className={`border-2 border-dashed rounded-2xl p-6 text-center bg-gradient-to-br from-[#0F0F23]/50 to-[#1A1A2E]/50 h-[200px] flex flex-col justify-center transition-colors cursor-pointer ${
                                    isDragging[member.id] 
                                      ? 'border-[#10B981] bg-[#10B981]/10' 
                                      : errors[`player_${member.id}`] 
                                        ? 'border-red-500' 
                                        : 'border-[#3D5AF1]/50 hover:border-[#3D5AF1]'
                                  }`}
                                  onDragOver={(e) => handleDragOver(e, member.id)}
                                  onDragLeave={(e) => handleDragLeave(e, member.id)}
                                  onDrop={(e) => handleDrop(e, 'player', member.id)}
                                  onClick={() => document.getElementById(`player-photo-${member.id}`)?.click()}
                                >
                                  <input
                                    id={`player-photo-${member.id}`}
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => {
                                      const file = e.target.files?.[0]
                                      if (file) handleFileUpload(file, 'player', member.id)
                                    }}
                                  />
                                  <Upload className="w-12 h-12 text-[#3D5AF1] mx-auto mb-4" />
                                  {playerPhotos[member.id] ? (
                                    <div>
                                      <p className="text-[#10B981] font-medium text-base mb-1">✓ {playerPhotos[member.id]?.name}</p>
                                      <p className="text-[#A5B4FC] text-xs">Click to change</p>
                                    </div>
                                  ) : (
                                    <div>
                                      <p className="text-white font-medium text-base mb-2">Drop photo</p>
                                      <p className="text-[#A5B4FC] text-sm">or <span className="text-[#3D5AF1] cursor-pointer">browse</span></p>
                                    </div>
                                  )}
                                </div>
                                {errors[`player_${member.id}`] && <p className="text-red-400 text-sm mt-2">{errors[`player_${member.id}`]}</p>}
                              </div>
                              
                              {/* Player Details - Same Row */}
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                  <label className="text-[#A5B4FC] text-lg font-semibold block mb-4">Full Name *</label>
                                  <Input
                                    value={member.fullName}
                                    onChange={(e) => updateTeamMember(member.id, 'fullName', e.target.value)}
                                    placeholder="Full name"
                                    className={`bg-[#0F0F23]/80 border-2 focus:border-[#3D5AF1] text-white placeholder-[#6B7280] text-lg rounded-2xl h-14 px-6 transition-all ${errors[`member_${member.id}_fullName`] ? 'border-red-500' : 'border-[#3D5AF1]/50'}`}
                                  />
                                  {errors[`member_${member.id}_fullName`] && <p className="text-red-400 text-sm mt-2">{errors[`member_${member.id}_fullName`]}</p>}
                                </div>
                                <div>
                                  <label className="text-[#A5B4FC] text-lg font-semibold block mb-4">Tag *</label>
                                  <Input
                                    value={member.tag}
                                    onChange={(e) => updateTeamMember(member.id, 'tag', e.target.value)}
                                    placeholder="e.g. Faker"
                                    className={`bg-[#0F0F23]/80 border-2 focus:border-[#3D5AF1] text-white placeholder-[#6B7280] text-lg rounded-2xl h-14 px-6 transition-all ${errors[`member_${member.id}_tag`] ? 'border-red-500' : 'border-[#3D5AF1]/50'}`}
                                  />
                                  {errors[`member_${member.id}_tag`] && <p className="text-red-400 text-sm mt-2">{errors[`member_${member.id}_tag`]}</p>}
                                </div>
                                <div>
                                  <label className="text-[#A5B4FC] text-lg font-semibold block mb-4">Game ID *</label>
                                  <Input
                                    value={member.gameId}
                                    onChange={(e) => updateTeamMember(member.id, 'gameId', e.target.value)}
                                    placeholder="Game ID"
                                    className={`bg-[#0F0F23]/80 border-2 focus:border-[#3D5AF1] text-white placeholder-[#6B7280] text-lg rounded-2xl h-14 px-6 transition-all ${errors[`member_${member.id}_gameId`] ? 'border-red-500' : 'border-[#3D5AF1]/50'}`}
                                  />
                                  {errors[`member_${member.id}_gameId`] && <p className="text-red-400 text-sm mt-2">{errors[`member_${member.id}_gameId`]}</p>}
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>

                    {/* Terms and Submit Section */}
                    <div className="bg-gradient-to-r from-[#3D5AF1]/10 to-[#10B981]/10 rounded-3xl p-12 border border-[#3D5AF1]/30">
                      <div className="flex items-start gap-6 mb-10">
                        <Checkbox
                          checked={agreedToTerms}
                          onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                          className="mt-2 border-2 border-[#3D5AF1] data-[state=checked]:bg-[#3D5AF1] w-6 h-6"
                        />
                        <label className="text-[#A5B4FC] text-lg font-normal leading-relaxed">
                          I agree to the <span 
                            className="text-[#3D5AF1] cursor-pointer font-semibold hover:text-[#10B981] transition-colors"
                            onClick={() => router.push(`/user/tournaments/tournaments-status/rules/${tournamentId}`)}
                          >Terms and Conditions and the Privacy Policy</span>
                        </label>
                        {errors.terms && <p className="text-red-400 text-sm mt-2">{errors.terms}</p>}
                      </div>

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
                            "Submit Registration"
                          )}
                        </Button>
                        {errors.submit && <p className="text-red-400 text-sm mt-4">{errors.submit}</p>}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

          </div>

          {/* Registration Requirements */}
          <div className="w-full px-8 mb-12">
            <Card className="bg-gradient-to-r from-[#2A2A4A] to-[#1E1E3F] border border-[#10B981] shadow-[0px_9.18px_36.7px_rgba(16,185,129,0.2)] rounded-[27px]">
                <CardContent className="p-8">
                  <h3 className="text-white text-4xl font-bold mb-6">Registration Requirements</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-[#10B981] rounded-full"></div>
                      <span className="text-[#A5B4FC]">All players must be at least 16 years of age</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-[#10B981] rounded-full"></div>
                      <span className="text-[#A5B4FC]">Teams must have 5 main players + 1 substitute</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-[#10B981] rounded-full"></div>
                      <span className="text-[#A5B4FC]">Valid government ID required for all participants</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-[#10B981] rounded-full"></div>
                      <span className="text-[#A5B4FC]">Minimum rank requirement: Diamond I</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-[#10B981] rounded-full"></div>
                      <span className="text-[#A5B4FC]">Registration deadline: Feb 15, 2025</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

        </div>
        <GlobalFooter />
        </div>
      </GlobalLayout>
    </>
  )
}
