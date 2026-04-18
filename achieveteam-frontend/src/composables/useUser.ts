import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { queryKeys } from '../lib/queryKeys'
import { 
  type LoginPayload, 
  type LoginResponse,

  login,
  getUser,
  logout,
} from '../services/auth'

export function useUser() {
  const queryClient = useQueryClient()

  const userQuery = useQuery({
    queryKey: queryKeys.auth.user,
    queryFn: getUser,
    enabled: !!localStorage.getItem('authToken'), // Only fetch if token exists
  })

  const loginMutation = useMutation({
    mutationFn: (data: LoginPayload) => login(data),
    onSuccess: (data: LoginResponse) => {
      queryClient.setQueryData(queryKeys.auth.user, data.user)
    },
  })

  return {
    user: userQuery.data,
    isLoading: userQuery.isLoading,
    error: userQuery.error,
    login: loginMutation,
    logout: logout
  }
}
