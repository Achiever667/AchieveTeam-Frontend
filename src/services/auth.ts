import http from './http'
import { handleApiError } from '../lib/apiError'
import { setAuthToken, clearAuthToken } from '../lib/auth'
import type { IUser } from '../types/index'

export interface User extends IUser {
  email: string
  role: 'student' | 'jobseeker' | 'organisation' | 'employer'
  createdAt?: string
  updatedAt?: string
}

export type UserFilterKeys = 'role' | 'email' | 'name'

export interface UserFilterParams {
  [key: string]: string | number | undefined
}

export interface CreateUserPayload {
  name: string
  email: string
  password: string
  role: 'student' | 'jobseeker' | 'organisation' | 'employer'
}

export interface UpdateUserPayload {
  name?: string
  email?: string
  role?: 'student' | 'jobseeker' | 'organisation' | 'employer'
  password?: string
}





export interface LoginPayload {
  email: string
  password: string
}

export type LoginResponse = {
  accessToken: string
  user: User
}

export async function login(data: LoginPayload): Promise<LoginResponse> {
  try {
    const response = await http.post<LoginResponse>('/login', data)
    const token = response.data.accessToken || (response.data as any).token
    if (token) {
      setAuthToken(token)
    }
    return response.data
  } catch (error) {
    throw handleApiError(error)
  }
}

export async function getCurrentUser(): Promise<User> {
  try {
    const response = await http.get<User>('/profile')
    return response.data
  } catch (error) {
    throw handleApiError(error)
  }
}

export function logout(): void {
  clearAuthToken()
}


