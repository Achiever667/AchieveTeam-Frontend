import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query'
import { queryKeys } from '../lib/queryKeys'
import { getLoans, applyForLoan, type Loan, type LoanApplication } from '../services/loan'

export function useLoan() {
  const queryClient = useQueryClient()

  const loansQuery = useQuery({
    queryKey: queryKeys.loans.all,
    queryFn: getLoans,
  })

  const applyLoanMutation = useMutation({
    mutationFn: applyForLoan,
    onSuccess: () => {
      // Invalidate and refetch loans after successful application
      queryClient.invalidateQueries({ queryKey: queryKeys.loans.all })
    },
  })

  return {
    loans: loansQuery.data,
    isLoading: loansQuery.isLoading,
    error: loansQuery.error,
    applyForLoan: applyLoanMutation.mutateAsync,
    isApplying: applyLoanMutation.isPending,
    applyError: applyLoanMutation.error,
  }
}

export type { Loan, LoanApplication }
