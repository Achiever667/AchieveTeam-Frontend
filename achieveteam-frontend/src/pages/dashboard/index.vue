
<script setup lang="ts">
import { useUser } from '../../composables/useUser'
import AuthLayout from '../../components/layouts/AuthLayout.vue'

const { user, isLoading, error, logout } = useUser()

const handleLogout = () => {
  logout()
  // Navigate to login or home page
  window.location.href = '/auth/login'
}
</script>

<template>
  <AuthLayout title="Dashboard" description="Welcome to your dashboard. Here are your account details.">
    <div v-if="isLoading" class="flex justify-center items-center py-8">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-[#4C1D95]"></div>
    </div>

    <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-lg p-4">
      <p class="text-red-800">Error loading user details: {{ error.message }}</p>
    </div>

    <div v-else-if="user" class="bg-white rounded-[32px] border border-slate-200 p-8 shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
      <h2 class="text-2xl font-semibold text-[#4C1D95] mb-6">User Details</h2>

      <div class="space-y-4">
        <div class="flex items-center justify-between py-3 border-b border-slate-100">
          <span class="text-sm font-medium text-slate-600">Name</span>
          <span class="text-sm text-slate-900">{{ user.name }}</span>
        </div>

        <div class="flex items-center justify-between py-3 border-b border-slate-100">
          <span class="text-sm font-medium text-slate-600">Email</span>
          <span class="text-sm text-slate-900">{{ user.email }}</span>
        </div>

        <div class="flex items-center justify-between py-3 border-b border-slate-100">
          <span class="text-sm font-medium text-slate-600">Role</span>
          <span class="text-sm text-slate-900 capitalize">{{ user.role }}</span>
        </div>

        <div v-if="user.createdAt" class="flex items-center justify-between py-3 border-b border-slate-100">
          <span class="text-sm font-medium text-slate-600">Member Since</span>
          <span class="text-sm text-slate-900">{{ new Date(user.createdAt).toLocaleDateString() }}</span>
        </div>

        <div v-if="user.updatedAt" class="flex items-center justify-between py-3">
          <span class="text-sm font-medium text-slate-600">Last Updated</span>
          <span class="text-sm text-slate-900">{{ new Date(user.updatedAt).toLocaleDateString() }}</span>
        </div>
      </div>

      <div class="mt-8 pt-6 border-t border-slate-200">
        <button
          @click="handleLogout"
          class="w-full rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </div>

    <div v-else class="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex flex-col items-center gap-4">
      <p class="text-yellow-800">No user data available. Please log in.</p>
      <RouterLink
        to="/auth/login"
        class="w-full text-center rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-indigo-700"
      >
        Login
      </RouterLink>
    </div>
  </AuthLayout>
</template>
    