"use client"

import { useRouter } from "next/navigation"
import { Calendar, Gamepad2, LogOut, Edit3 } from "lucide-react"
import { useSidebarLogic } from "@/hooks/use-sidebar-logic"
import { useAuthContext } from "@/contexts/auth-context"
import { useFavorites } from '@/hooks/use-favorites'


interface AppSidebarProps {
  tournamentSelected?: boolean
  isOpen?: boolean
  onToggle?: () => void
  onEditProfile?: () => void
}

export function AppSidebar({ tournamentSelected = false, isOpen = true, onToggle, onEditProfile }: AppSidebarProps) {
  const router = useRouter()
  const { logout, user, isAuthenticated } = useAuthContext()
  const { clearFavorites } = useFavorites()
  const {
    mounted,
    pathname,
    getMenuItemStyle,
    getIconColor,
  } = useSidebarLogic(tournamentSelected)

  // Handle logout
  const handleLogout = () => {
    logout()
    clearFavorites()
    router.push('/home')
  }

  if (!mounted) {
    return (
      <div 
        className="fixed inset-y-0 left-0 z-10 w-[280px] transform -translate-x-full transition-all duration-300 ease-in-out opacity-0"
        style={{
          background: 'linear-gradient(135deg, #16213E 0%, #1A1A2E 100%)',
          borderRight: '1px solid rgba(61, 90, 241, 0.3)'
        }}
      >
        <div className="loading-skeleton h-full w-full"></div>
      </div>
    )
  }

  return (
    <div 
      className={`fixed inset-y-0 left-0 z-10 w-[280px] transition-transform duration-300 ease-in-out md:block flex flex-col ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      style={{
        background: 'linear-gradient(135deg, #16213E 0%, #1A1A2E 100%)',
        borderRight: '1px solid rgba(61, 90, 241, 0.3)',
        visibility: mounted ? 'visible' : 'hidden'
      }}
    >
      {/* Section 1: User Profile */}
      <div className="p-6 pt-8">
        <div 
          className="flex items-center p-4 rounded-2xl"
          style={{
            background: 'rgba(91, 70, 229, 0.15)',
            border: '1px solid rgba(61, 90, 241, 0.3)'
          }}
        >
          {user?.avatar ? (
            <img
              src={user.avatar}
              alt={user.username}
              className="w-12 h-12 rounded-full mr-4 object-cover"
            />
          ) : (
            <div 
              className="w-12 h-12 flex items-center justify-center rounded-full mr-4"
              style={{
                background: 'linear-gradient(90deg, #3D5AF1 100%, #7C3AED 0%)'
              }}
            >
              <span className="text-white font-bold text-lg">{(isAuthenticated ? (user?.username?.[0] || 'U') : 'G').toUpperCase()}</span>
            </div>
          )}
          <div className="flex-1">
            <h3 className="text-white font-semibold text-base">{isAuthenticated ? (user?.username || 'User') : 'Guest'}</h3>
            <p className="text-[#A5B4FC] text-sm">{user?.email || ''}</p>
          </div>
          <div 
            className={`w-8 h-8 flex items-center justify-center rounded-lg transition-all duration-300 ease-in-out ${
              isAuthenticated ? 'cursor-pointer hover:bg-white/10' : 'opacity-50 cursor-not-allowed'
            }`}
            style={{ background: 'rgba(91, 70, 229, 0.2)' }}
            title={isAuthenticated ? 'Edit profile' : 'Login required to edit profile'}
            onClick={isAuthenticated ? onEditProfile : undefined}
          >
            <Edit3 className="w-4 h-4 text-[#A5B4FC]" />
          </div>
        </div>
      </div>

      {/* Separator 1 */}
      <div className="mx-6">
        <div className="h-px bg-gradient-to-r from-transparent via-[#3D5AF1]/50 to-transparent"></div>
      </div>

      {/* Section 2: Navigation Menu */}
      <div className="px-6 py-6 space-y-6">
        {/* MAIN Section */}
        <div className="space-y-3">
          
          {/* Games Menu Item */}
          <div 
            className={`flex items-center p-6 rounded-2xl cursor-pointer transition-all duration-300 ease-in-out ${
              pathname === '/home' ? '' : 'hover:bg-white/5 hover:scale-105 hover:shadow-lg'
            }`}
            style={{
              background: pathname === '/home' 
                ? 'linear-gradient(90deg, #3D5AF1 0%, #7C3AED 100%)' 
                : 'transparent',
              boxShadow: pathname === '/home' 
                ? '0px 4.63px 18.521px rgba(61, 90, 241, 0.4)' 
                : 'none'
            }}
            onMouseEnter={(e) => {
              if (pathname !== '/home') {
                e.currentTarget.style.boxShadow = '0px 2px 8px rgba(61, 90, 241, 0.2)';
              }
            }}
            onMouseLeave={(e) => {
              if (pathname !== '/home') {
                e.currentTarget.style.boxShadow = 'none';
              }
            }}
            onClick={() => router.push('/home')}
          >
            <Gamepad2 
              className="w-7 h-7 mr-5"
              style={{ 
                color: pathname === '/home' ? '#FFFFFF' : '#A5B4FC' 
              }}
            />
            <span 
              className="font-semibold text-xl"
              style={{ 
                color: pathname === '/home' ? '#FFFFFF' : '#A5B4FC',
                fontFamily: 'Inter'
              }}
            >
              Games
            </span>
          </div>

          {/* Schedule Menu Item */}
          <div 
            className={`flex items-center p-6 rounded-2xl transition-all duration-300 ease-in-out ${
              pathname.includes('/schedule') 
                ? '' 
                : (isAuthenticated ? 'cursor-pointer hover:bg-white/5 hover:scale-105 hover:shadow-lg' : 'opacity-50 cursor-not-allowed')
            }`}
            style={{
              background: pathname.includes('/schedule') 
                ? 'linear-gradient(90deg, #3D5AF1 0%, #7C3AED 100%)' 
                : 'transparent',
              boxShadow: pathname.includes('/schedule') 
                ? '0px 4.63px 18.521px rgba(61, 90, 241, 0.4)' 
                : 'none'
            }}
            onMouseEnter={(e) => {
              if (!pathname.includes('/schedule') && isAuthenticated) {
                e.currentTarget.style.boxShadow = '0px 2px 8px rgba(61, 90, 241, 0.2)';
              }
            }}
            onMouseLeave={(e) => {
              if (!pathname.includes('/schedule') && isAuthenticated) {
                e.currentTarget.style.boxShadow = 'none';
              }
            }}
            onClick={isAuthenticated ? () => router.push('/schedule') : undefined}
          >
            <Calendar 
              className="w-7 h-7 mr-5"
              style={{ 
                color: pathname.includes('/schedule') ? '#FFFFFF' : '#A5B4FC' 
              }}
            />
            <span 
              className="font-semibold text-xl"
              style={{ 
                color: pathname.includes('/schedule') ? '#FFFFFF' : '#A5B4FC',
                fontFamily: 'Inter'
              }}
            >
              Schedule
            </span>
          </div>
        </div>

      </div>

      {isAuthenticated && (
        <>
          {/* Separator 2 - Positioned above logout */}
          <div className="absolute bottom-20 left-6 right-6">
            <div className="h-px bg-gradient-to-r from-transparent via-[#3D5AF1]/50 to-transparent"></div>
          </div>

          {/* Section 3: Logout - Absolute positioned at bottom */}
          <div className="absolute bottom-6 left-6 right-6">
            <div 
              className="flex items-center p-4 rounded-2xl cursor-pointer hover:bg-red-500/10 hover:scale-105 hover:shadow-lg transition-all duration-300 ease-in-out"
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0px 2px 8px rgba(239, 68, 68, 0.3)';
                e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
              onClick={handleLogout}
            >
              <LogOut className="w-5 h-5 mr-4 text-[#EF4444]" />
              <span 
                className="font-medium text-lg text-[#EF4444]"
                style={{ fontFamily: 'Inter' }}
              >
                Log out
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
