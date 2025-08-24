import React, { createContext, useContext, ReactNode } from "react"
import { useAuth } from "@/hooks/use-auth"

// Use the full return type of useAuth to avoid drift between context typing and hook implementation
type AuthContextType = ReturnType<typeof useAuth>

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const authHook = useAuth()

  return (
    <AuthContext.Provider value={authHook}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuthContext() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider')
  }
  return context
}
