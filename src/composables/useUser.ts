import {  useMutation, useQueryClient, useQuery } from '@tanstack/vue-query'
import { queryKeys } from '../lib/queryKeys'
import { getAuthToken } from '../lib/auth'
import { 
  type LoginPayload, 
  type LoginResponse,

  login,
  logout,
  getCurrentUser,
} from '../services/auth'

export function useUser() {
  const queryClient = useQueryClient()

  const userQuery = useQuery({
    queryKey: queryKeys.auth.user,
    queryFn: getCurrentUser,
    enabled: !!getAuthToken(), // Only fetch if token exists
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
