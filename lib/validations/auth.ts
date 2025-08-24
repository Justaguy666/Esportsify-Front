// Form validation schemas and utilities

import { FORM_VALIDATION } from '@/lib/constants';
import { FormValidationError } from '@/types';

export interface ValidationResult {
  isValid: boolean;
  errors: FormValidationError[];
}

export function validateEmail(email: string): FormValidationError | null {
  if (!email) {
    return { field: 'email', message: 'Email is required' };
  }
  
  if (!FORM_VALIDATION.EMAIL_REGEX.test(email)) {
    return { field: 'email', message: 'Please enter a valid email address' };
  }
  
  return null;
}

export function validatePassword(password: string): FormValidationError | null {
  if (!password) {
    return { field: 'password', message: 'Password is required' };
  }
  
  if (password.length < FORM_VALIDATION.PASSWORD_MIN_LENGTH) {
    return { 
      field: 'password', 
      message: `Password must be at least ${FORM_VALIDATION.PASSWORD_MIN_LENGTH} characters long` 
    };
  }
  
  return null;
}

export function validateUsername(username: string): FormValidationError | null {
  if (!username) {
    return { field: 'username', message: 'Username is required' };
  }
  
  if (username.length < FORM_VALIDATION.USERNAME_MIN_LENGTH) {
    return { 
      field: 'username', 
      message: `Username must be at least ${FORM_VALIDATION.USERNAME_MIN_LENGTH} characters long` 
    };
  }
  
  if (username.length > FORM_VALIDATION.USERNAME_MAX_LENGTH) {
    return { 
      field: 'username', 
      message: `Username must be no more than ${FORM_VALIDATION.USERNAME_MAX_LENGTH} characters long` 
    };
  }
  
  return null;
}

export function validateConfirmPassword(
  password: string, 
  confirmPassword: string
): FormValidationError | null {
  if (!confirmPassword) {
    return { field: 'confirmPassword', message: 'Please confirm your password' };
  }
  
  if (password !== confirmPassword) {
    return { field: 'confirmPassword', message: 'Passwords do not match' };
  }
  
  return null;
}

export function validateLoginForm(data: {
  email: string;
  password: string;
}): ValidationResult {
  const errors: FormValidationError[] = [];
  
  const emailError = validateEmail(data.email);
  if (emailError) errors.push(emailError);
  
  const passwordError = validatePassword(data.password);
  if (passwordError) errors.push(passwordError);
  
  return {
    isValid: errors.length === 0,
    errors,
  };
}

export function validateRegisterForm(data: {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}): ValidationResult {
  const errors: FormValidationError[] = [];
  
  const usernameError = validateUsername(data.username);
  if (usernameError) errors.push(usernameError);
  
  const emailError = validateEmail(data.email);
  if (emailError) errors.push(emailError);
  
  const passwordError = validatePassword(data.password);
  if (passwordError) errors.push(passwordError);
  
  const confirmPasswordError = validateConfirmPassword(data.password, data.confirmPassword);
  if (confirmPasswordError) errors.push(confirmPasswordError);
  
  return {
    isValid: errors.length === 0,
    errors,
  };
}

export function validateForgotPasswordForm(data: {
  email: string;
}): ValidationResult {
  const errors: FormValidationError[] = [];
  
  const emailError = validateEmail(data.email);
  if (emailError) errors.push(emailError);
  
  return {
    isValid: errors.length === 0,
    errors,
  };
}
