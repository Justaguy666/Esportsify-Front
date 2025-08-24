// Improved authentication service with proper error handling

import { ApiError } from '@/lib/api/client';
import { STORAGE_KEYS } from '@/lib/constants';
import { User, LoginFormData, RegisterFormData } from '@/types';
import {
  verifyLogin,
  createAccount,
  updateAccountProfile,
  updateAccountAvatar,
  updateAccountPassword,
  toPublicUser,
} from '@/data/accounts';

export interface AuthResponse {
  user: User;
  token: string;
}

class AuthService {
  private tokenKey = STORAGE_KEYS.AUTH_TOKEN;
  private userDataKey = STORAGE_KEYS.USER_DATA;
  private loggedInKey = STORAGE_KEYS.LOGGED_IN;

  // Check if user is authenticated
  isAuthenticated(): boolean {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem(this.loggedInKey) === 'true';
  }

  // Get current user data
  getCurrentUser(): User | null {
    if (typeof window === 'undefined') return null;
    
    const userData = localStorage.getItem(this.userDataKey);
    if (!userData) return null;
    
    try {
      return JSON.parse(userData);
    } catch {
      return null;
    }
  }

  // Get auth token
  getToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(this.tokenKey);
  }

  // Login user
  async login(credentials: LoginFormData): Promise<AuthResponse> {
    try {
      const acc = verifyLogin(credentials.email, credentials.password);
      if (!acc) {
        throw new ApiError('Invalid email or password', 401);
      }
      const mapped: User = toPublicUser(acc);
      const mockToken = 'mock-jwt-token-' + Date.now();
      this.setAuthData(mapped, mockToken);
      return { user: mapped, token: mockToken };
    } catch (error) {
      throw new ApiError(
        error instanceof Error ? error.message : 'Login failed',
        401
      );
    }
  }

  // Register user
  async register(userData: RegisterFormData): Promise<AuthResponse> {
    try {
      if (userData.password !== userData.confirmPassword) {
        throw new ApiError('Passwords do not match', 400);
      }
      const acc = createAccount({
        username: userData.username,
        email: userData.email,
        password: userData.password,
      });
      const mapped: User = toPublicUser(acc);
      const mockToken = 'mock-jwt-token-' + Date.now();
      this.setAuthData(mapped, mockToken);
      return { user: mapped, token: mockToken };
    } catch (error) {
      throw new ApiError(
        error instanceof Error ? error.message : 'Registration failed',
        400
      );
    }
  }

  // Logout user
  logout(): void {
    if (typeof window === 'undefined') return;
    
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userDataKey);
    localStorage.removeItem(this.loggedInKey);
  }

  // Forgot password
  async forgotPassword(email: string): Promise<void> {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      // In real implementation: await apiClient.post(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, { email });
    } catch (error) {
      throw new ApiError(
        error instanceof Error ? error.message : 'Failed to send reset email',
        400
      );
    }
  }

  // Refresh token
  async refreshToken(): Promise<string> {
    try {
      // In real implementation, this would call the refresh endpoint
      const newToken = 'refreshed-mock-token-' + Date.now();
      localStorage.setItem(this.tokenKey, newToken);
      return newToken;
    } catch (error) {
      this.logout();
      throw new ApiError('Session expired', 401);
    }
  }

  // Public helper to update stored user without changing token
  public setStoredUser(user: User): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(this.userDataKey, JSON.stringify(user));
    localStorage.setItem(this.loggedInKey, 'true');
  }

  // Profile management (mock/local)
  async updateProfile(updates: { username?: string; email?: string }): Promise<User> {
    const current = this.getCurrentUser();
    if (!current) throw new ApiError('Not authenticated', 401);
    const acc = updateAccountProfile(current.id, updates);
    if (!acc) throw new ApiError('User not found', 404);
    const mapped: User = toPublicUser(acc);
    this.setStoredUser(mapped);
    return mapped;
  }

  async updateAvatar(avatarUrl: string): Promise<User> {
    const current = this.getCurrentUser();
    if (!current) throw new ApiError('Not authenticated', 401);
    const ok = updateAccountAvatar(current.id, avatarUrl);
    if (!ok) throw new ApiError('Failed to update avatar', 400);
    // Reflect latest account data into stored user
    const updated: User = { ...current, avatar: avatarUrl, updatedAt: new Date() };
    this.setStoredUser(updated);
    return updated;
  }

  async updatePreferences(preferences: any): Promise<void> {
    if (typeof window === 'undefined') return;
    const current = this.getCurrentUser();
    if (!current) throw new ApiError('Not authenticated', 401);
    try {
      const prefsKey = `${this.userDataKey}:prefs:${current.id}`;
      localStorage.setItem(prefsKey, JSON.stringify(preferences));
    } catch (e) {
      throw new ApiError('Failed to save preferences', 400);
    }
  }

  async changePassword(currentPassword: string, newPassword: string): Promise<boolean> {
    const current = this.getCurrentUser();
    if (!current) throw new ApiError('Not authenticated', 401);
    const ok = updateAccountPassword(current.id, currentPassword, newPassword);
    if (!ok) throw new ApiError('Invalid current password', 400);
    return ok;
  }

  // Private method to set auth data
  private setAuthData(user: User, token: string): void {
    if (typeof window === 'undefined') return;
    
    localStorage.setItem(this.tokenKey, token);
    localStorage.setItem(this.userDataKey, JSON.stringify(user));
    localStorage.setItem(this.loggedInKey, 'true');
  }

  // Check if token is expired (mock implementation)
  isTokenExpired(): boolean {
    const token = this.getToken();
    if (!token) return true;
    
    // In real implementation, you would decode JWT and check expiration
    // For now, assume token is valid
    return false;
  }
}

// Export singleton instance
export const authService = new AuthService();

// Export class for testing
export { AuthService };
