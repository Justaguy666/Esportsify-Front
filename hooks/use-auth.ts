"use client"

import { useState, useCallback, useEffect } from "react"
import { useRouter } from "next/navigation"
import { authService } from "@/lib/auth/auth-service"
import { User, AuthState } from "@/types"
import { ROUTES } from '@/lib/constants';

/**
 * Enhanced authentication hook with proper error handling and type safety
 */
export function useAuth() {
  const router = useRouter()
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
  })

  // Initialize auth state on mount
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const isAuthenticated = authService.isAuthenticated()
        const user = authService.getCurrentUser()
        
        setAuthState({
          user,
          isAuthenticated,
          isLoading: false,
          error: null,
        })
      } catch (error) {
        setAuthState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          error: error instanceof Error ? error.message : 'Authentication error',
        })
      }
    }

    initializeAuth()
  }, [])

  const login = useCallback(async (credentials: { email: string; password: string }) => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true, error: null }))
      
      const { user } = await authService.login(credentials)
      
      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      })
      
      router.push(ROUTES.HOME)
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Login failed',
      }))
      throw error
    }
  }, [router])

  const register = useCallback(async (userData: {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true, error: null }))
      
      const { user } = await authService.register(userData)
      
      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      })
      
      router.push(ROUTES.HOME)
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Registration failed',
      }))
      throw error
    }
  }, [router])

  const logout = useCallback(() => {
    try {
      authService.logout()
      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      })
      router.push(ROUTES.HOME)
    } catch (error) {
      console.error('Logout error:', error)
    }
  }, [router])

  const forgotPassword = useCallback(async (email: string) => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true, error: null }))
      await authService.forgotPassword(email)
      setAuthState(prev => ({ ...prev, isLoading: false }))
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to send reset email',
      }))
      throw error
    }
  }, [])

  const clearError = useCallback(() => {
    setAuthState(prev => ({ ...prev, error: null }))
  }, [])

  // Profile management
  const updateProfile = useCallback(async (updates: { username?: string; email?: string }) => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true, error: null }))
      const updated = await authService.updateProfile(updates)
      setAuthState(prev => ({ ...prev, user: updated, isLoading: false }))
      return updated
    } catch (error) {
      setAuthState(prev => ({ ...prev, isLoading: false, error: error instanceof Error ? error.message : 'Profile update failed' }))
      throw error
    }
  }, [])

  const updateAvatar = useCallback(async (avatarUrl: string) => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true, error: null }))
      const updated = await authService.updateAvatar(avatarUrl)
      setAuthState(prev => ({ ...prev, user: updated, isLoading: false }))
      return updated
    } catch (error) {
      setAuthState(prev => ({ ...prev, isLoading: false, error: error instanceof Error ? error.message : 'Avatar update failed' }))
      throw error
    }
  }, [])

  const updatePreferences = useCallback(async (preferences: any) => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true, error: null }))
      await authService.updatePreferences(preferences)
      setAuthState(prev => ({ ...prev, isLoading: false }))
    } catch (error) {
      setAuthState(prev => ({ ...prev, isLoading: false, error: error instanceof Error ? error.message : 'Preferences update failed' }))
      throw error
    }
  }, [])

  const changePassword = useCallback(async (currentPassword: string, newPassword: string) => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true, error: null }))
      const ok = await authService.changePassword(currentPassword, newPassword)
      setAuthState(prev => ({ ...prev, isLoading: false }))
      return ok
    } catch (error) {
      setAuthState(prev => ({ ...prev, isLoading: false, error: error instanceof Error ? error.message : 'Password change failed' }))
      throw error
    }
  }, [])

  // Legacy compatibility
  const checkAuthStatus = useCallback(() => {
    return authState.isAuthenticated
  }, [authState.isAuthenticated])

  return {
    // New enhanced API
    ...authState,
    login,
    register,
    logout,
    forgotPassword,
    clearError,
    updateProfile,
    updateAvatar,
    updatePreferences,
    changePassword,
    
    // Legacy compatibility
    isLoggedIn: authState.isAuthenticated,
    checkAuthStatus,
  }
}
