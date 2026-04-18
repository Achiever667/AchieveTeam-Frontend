import http from './http'
import { handleApiError } from '../lib/apiError'
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
  token: string
  user: User
}

export async function login(data: LoginPayload): Promise<LoginResponse> {
  try {
    const response = await http.post<LoginResponse>('/login', data)
    if (response.data.token) {
      localStorage.setItem('authToken', response.data.token)
    }
    return response.data
  } catch (error) {
    throw handleApiError(error)
  }
}

export async function getCurrentUser(): Promise<User> {
  try {
    const response = await http.get<User>('/me')
    return response.data
  } catch (error) {
    throw handleApiError(error)
  }
}

export function logout(): void {
  localStorage.removeItem('authToken')
}


