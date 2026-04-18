<template>
  <AuthLayout 
    title="Welcome Back" 
    description="Enter your email address and password to access your account."
  >
    <form @submit.prevent="onSubmit" class="space-y-6">
      
      <UiField
        v-model="email"
        label="Email Address"
        type="email"
        placeholder="Enter your email"
        :error="errors.email"
        :icon="Mail"
        required
      />

      <UiField
        v-model="password"
        label="Password"
        type="password"
        placeholder="Enter your password"
        :error="errors.password"
        :icon="Lock"
        required
      />

      <div class="flex items-center justify-between">
        <label class="flex items-center space-x-2 cursor-pointer">
          <input 
            type="checkbox" 
            class="w-4 h-4 rounded border-gray-300 text-[#6B21A8] focus:ring-[#6B21A8]"
          />
          <span class="text-sm text-neutral-600 font-medium text-nowrap">Remember me</span>
        </label>
        <RouterLink 
          to="/auth/forgot-password" 
          class="text-sm font-semibold text-[#6B21A8] hover:underline text-nowrap"
        >
          Forgot Password?
        </RouterLink>
      </div>

      <UiButton 
        type="submit" 
        :loading="login.isPending.value"
        class="w-full bg-[#6B21A8] hover:bg-[#581C87] text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200"
      >
        Sign in
      </UiButton>

      <p class="text-center text-sm text-neutral-600">
        Don't have an account? 
        <RouterLink to="/auth/signup" class="font-bold text-[#6B21A8] hover:underline">
          Sign up
        </RouterLink>
      </p>
    </form>
  </AuthLayout>
</template>




<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { Mail, Lock } from 'lucide-vue-next'

import AuthLayout from '../../components/layouts/AuthLayout.vue'
import UiField from '../../components/ui/form/UiField.vue'
import UiButton from '../../components/ui/button/UiButton.vue'

import { loginSchema, type LoginFormValues } from '../../schemas/auth/loginSchema'
import { useUser } from '../../composables/useUser'

const router = useRouter()
const { login } = useUser()

const { defineField, handleSubmit, errors, setErrors } = useForm<LoginFormValues>({
  validationSchema: toTypedSchema(loginSchema),
})

const [email] = defineField('email')
const [password] = defineField('password')

const onSubmit = handleSubmit(async (data: LoginFormValues) => {
  try {
    await login.mutateAsync(data)
    router.push('/dashboard')
  } catch (error) {
    setErrors({
      email: 'Invalid email or password',
    })
    console.error('Login failed:', error)
  }
})
</script>

