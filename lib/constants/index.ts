// Application constants

export const APP_CONFIG = {
  name: 'Esportsify',
  description: 'Ultimate Esports Platform',
  version: '1.0.0',
  author: 'Esportsify Team',
} as const;

export const ROUTES = {
  HOME: '/home',
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  PROFILE: '/profile',
  TOURNAMENTS: '/tournaments',
} as const;

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'esportsify_auth_token',
  USER_DATA: 'esportsify_user_data',
  LOGGED_IN: 'esportsify_logged_in',
  THEME: 'esportsify_theme',
  SIDEBAR_STATE: 'esportsify_sidebar_state',
} as const;

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    LOGOUT: '/api/auth/logout',
    REFRESH: '/api/auth/refresh',
    FORGOT_PASSWORD: '/api/auth/forgot-password',
  },
  TOURNAMENTS: {
    LIST: '/api/tournaments',
    DETAIL: '/api/tournaments/:id',
    REGISTER: '/api/tournaments/:id/register',
  },
  USER: {
    PROFILE: '/api/user/profile',
    UPDATE: '/api/user/update',
  },
} as const;

export const SUPPORTED_GAMES = [
  {
    id: 'league-of-legends',
    name: 'League of Legends',
    players: '150M+',
    tournaments: '2,500+',
    image: '/assets/games/lol.jpg',
    path: '/tournaments/league-of-legends',
  },
  {
    id: 'counter-strike-2',
    name: 'Counter-Strike 2',
    players: '30M+',
    tournaments: '1,800+',
    image: '/assets/games/cs2.jpg',
    path: '/tournaments/counter-strike-2',
  },
  {
    id: 'valorant',
    name: 'Valorant',
    players: '15M+',
    tournaments: '1,200+',
    image: '/assets/games/val.jpg',
    path: '/tournaments/valorant',
  },
  {
    id: 'dota-2',
    name: 'Dota 2',
    players: '12M+',
    tournaments: '900+',
    image: '/assets/games/d2.jpg',
    path: '/tournaments/dota-2',
  },
  {
    id: 'overwatch-2',
    name: 'Overwatch 2',
    players: '35M+',
    tournaments: '800+',
    image: '/assets/games/ow2.png',
    path: '/tournaments/overwatch-2',
  },
  {
    id: 'starcraft-ii',
    name: 'StarCraft II',
    players: '10M+',
    tournaments: '1,000+',
    image: '/assets/games/sc.jpg',
    path: '/tournaments/starcraft-ii',
  },
] as const;

export const TOURNAMENT_FORMATS = [
  'Single Elimination',
  'Double Elimination',
  'Swiss System',
  'Round Robin',
  'Group Stage + Playoffs',
  'Swiss System + Single Elimination',
  'Swiss System + Double Elimination',
] as const;

export const TOURNAMENT_STATUSES = [
  'upcoming',
  'ongoing',
  'completed',
  'cancelled',
] as const;

export const REGISTRATION_TYPES = [
  'team',
  'individual',
] as const;

export const FORM_VALIDATION = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PASSWORD_MIN_LENGTH: 8,
  USERNAME_MIN_LENGTH: 3,
  USERNAME_MAX_LENGTH: 20,
} as const;

export const UI_CONFIG = {
  SIDEBAR_WIDTH: 280,
  HEADER_HEIGHT: 88,
  MOBILE_BREAKPOINT: 768,
  ANIMATION_DURATION: 300,
} as const;
