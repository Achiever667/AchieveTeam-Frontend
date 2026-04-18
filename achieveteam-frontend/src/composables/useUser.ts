import {  useMutation, useQueryClient } from '@tanstack/vue-query'
import { queryKeys } from '../lib/queryKeys'
import { 
  type LoginPayload, 
  type LoginResponse,

  login,
  logout,
} from '../services/auth'

export function useUser() {
  const queryClient = useQueryClient()

  const loginMutation = useMutation({
    mutationFn: (data: LoginPayload) => login(data),
    onSuccess: (data: LoginResponse) => {
      queryClient.setQueryData(queryKeys.auth.user, data.user)
    },
  })


  return {

    login: loginMutation,
    
    logout: logout
  }
}
