// Global type definitions for the Esportsify application

export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface Tournament {
  id: string;
  name: string;
  game: string;
  prizePool: string;
  participants: string;
  organizer: string;
  description: string;
  startDate: string;
  endDate: string;
  format: string;
  registrationType: 'team' | 'individual';
  location?: string;
  registrationFee?: string;
  availableSpots?: string;
  registrationDeadline?: string;
  status: 'LIVE' | 'UPCOMING' | 'ACTIVE' | 'REGISTRATION' | 'COMPLETED';
}

export interface Game {
  id: string;
  name: string;
  players: string;
  tournaments: string;
  image: string;
  path: string;
  description?: string;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}

export interface ApiError {
  message: string;
  status: number;
  code?: string;
}

export interface FormValidationError {
  field: string;
  message: string;
}

export interface LoadingState {
  isLoading: boolean;
  error: string | null;
}

// Form types
export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ForgotPasswordFormData {
  email: string;
}

// Component props types
export interface LayoutProps {
  children: React.ReactNode;
  tournamentSelected?: boolean;
}

export interface SidebarProps {
  tournamentSelected: boolean;
  isOpen: boolean;
  onToggle: () => void;
  onEditProfile: () => void;
}

export interface HeaderProps {
  onToggleSidebar: () => void;
  sidebarOpen: boolean;
}

// Utility types
export type Status = 'idle' | 'loading' | 'success' | 'error';

export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface SearchParams {
  query: string;
  filters?: Record<string, string | number | boolean>;
}
