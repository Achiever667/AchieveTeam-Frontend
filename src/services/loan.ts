import http from './http'
import { handleApiError } from '../lib/apiError'

export interface Loan {
  id: string | number
  borrower: string
  amount: number
  currency?: string
  termMonths: number
  interestRate: number
  status: 'pending' | 'approved' | 'rejected' | 'active' | 'paid'
  dueDate: string
  description?: string
  createdAt?: string
}

export async function getLoans(): Promise<Loan[]> {
  try {
    const response = await http.get<Loan[]>('/loans')
    return response.data
  } catch (error) {
    throw handleApiError(error)
  }
}

export async function getLoanById(id: string | number): Promise<Loan> {
  try {
    const response = await http.get<Loan>(`/loans/${id}`)
    return response.data
  } catch (error) {
    throw handleApiError(error)
  }
}
