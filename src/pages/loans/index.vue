<template>
  <AuthLayout title="Loan Overview" description="Browse your active loans and review their key details.">
    <div class="space-y-6">
      <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 class="text-2xl font-semibold text-slate-900">Your loans</h2>
          <p class="mt-2 text-sm text-slate-500">See loan information, status, and repayment details in one place.</p>
        </div>
        <Button @click="$router.push('/loans/apply')">
          Apply for Loan
        </Button>
      </div>

      <div v-if="isLoading" class="flex justify-center py-10">
        <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-[#4C1D95]"></div>
      </div>

      <div v-else-if="error" class="rounded-3xl border border-red-200 bg-red-50 p-6 text-red-800">
        <p>Error loading loans: {{ error.message }}</p>
      </div>

      <div v-else-if="loans && loans.length === 0" class="rounded-3xl border border-slate-200 bg-slate-50 p-8 text-center text-slate-700">
        <p class="text-lg font-semibold">No loans found</p>
        <p class="mt-2 text-sm text-slate-500">You currently have no loan records available.</p>
      </div>

      <div v-else class="grid gap-6 lg:grid-cols-2">
        <LoanCard v-for="loan in loans" :key="loan.id" :loan="loan" />
      </div>
    </div>
  </AuthLayout>
</template>

<script setup lang="ts">
import AuthLayout from '../../components/layouts/AuthLayout.vue'
import { useLoan } from '../../composables/useLoan'
import LoanCard from '../../components/ui/loan/LoanCard.vue'
import Button from '../../components/ui/button/Button.vue'

const { loans, isLoading, error } = useLoan()
</script>
