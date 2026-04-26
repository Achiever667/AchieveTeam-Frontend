import { useQuery } from '@tanstack/vue-query'
import { queryKeys } from '../lib/queryKeys'
import { getLoans, type Loan } from '../services/loan'

export function useLoan() {
  const loansQuery = useQuery({
    queryKey: queryKeys.loans.all,
    queryFn: getLoans,
  })

  return {
    loans: loansQuery.data,
    isLoading: loansQuery.isLoading,
    error: loansQuery.error,
  }
}

export type { Loan }
