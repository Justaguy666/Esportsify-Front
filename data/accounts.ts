// Lightweight in-memory account store for dev usage (file-based within data/)
// NOTE: This is NOT secure and only meant for local/demo purposes.

import { mockUser } from './users'
import type { User } from '@/types'

export interface Account {
  id: string
  username: string
  email: string
  password: string // plain text for demo only
  avatar?: string
  createdAt: Date
  updatedAt: Date
}

// Seed with one default account derived from mockUser
const seeded: Account = {
  id: mockUser.id,
  username: mockUser.username,
  email: mockUser.email,
  password: 'password123', // demo password
  avatar: mockUser.avatar ?? '/assets/user.png',
  createdAt: mockUser.joinDate,
  updatedAt: new Date(),
}

const accounts: Account[] = [seeded]

const genId = () => `user-${Date.now()}`

export const findAccountByEmail = (email: string): Account | undefined =>
  accounts.find(a => a.email.toLowerCase() === email.toLowerCase())

export const getAccountById = (id: string): Account | undefined =>
  accounts.find(a => a.id === id)

export const verifyLogin = (email: string, password: string): Account | null => {
  const acc = findAccountByEmail(email)
  if (!acc) return null
  return acc.password === password ? acc : null
}

export const createAccount = (data: { username: string; email: string; password: string }): Account => {
  const exists = findAccountByEmail(data.email)
  if (exists) {
    throw new Error('Email already registered')
  }
  const acc: Account = {
    id: genId(),
    username: data.username,
    email: data.email,
    password: data.password,
    avatar: '/assets/user.png',
    createdAt: new Date(),
    updatedAt: new Date(),
  }
  accounts.push(acc)
  return acc
}

export const updateAccountProfile = (
  id: string,
  updates: { username?: string; email?: string }
): Account | undefined => {
  const acc = getAccountById(id)
  if (!acc) return undefined
  if (updates.username !== undefined) acc.username = updates.username
  if (updates.email !== undefined) acc.email = updates.email
  acc.updatedAt = new Date()
  return acc
}

export const updateAccountAvatar = (id: string, avatarUrl: string): boolean => {
  const acc = getAccountById(id)
  if (!acc) return false
  acc.avatar = avatarUrl
  acc.updatedAt = new Date()
  return true
}

export const updateAccountPassword = (
  id: string,
  currentPassword: string,
  newPassword: string
): boolean => {
  const acc = getAccountById(id)
  if (!acc) return false
  if (acc.password !== currentPassword) return false
  acc.password = newPassword
  acc.updatedAt = new Date()
  return true
}

export const toPublicUser = (acc: Account): User => ({
  id: acc.id,
  username: acc.username,
  email: acc.email,
  avatar: acc.avatar ?? '/assets/user.png',
  createdAt: acc.createdAt,
  updatedAt: acc.updatedAt,
})
