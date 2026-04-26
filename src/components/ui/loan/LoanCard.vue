<template>
  <div class="rounded-[32px] border border-slate-200 bg-white p-6 shadow-[0_24px_70px_rgba(15,23,42,0.06)] transition hover:-translate-y-1 hover:shadow-[0_28px_80px_rgba(15,23,42,0.08)]">
    <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
      <div>
        <p class="text-sm font-semibold uppercase tracking-[0.24em] text-[#4C1D95]">Loan ID</p>
        <h3 class="mt-2 text-xl font-semibold text-slate-900">{{ loan.id }}</h3>
        <p class="mt-1 text-sm text-slate-500">{{ loan.borrower }}</p>
      </div>
      <p class="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700">{{ loan.status }}</p>
    </div>

    <div class="mt-6 grid gap-4 sm:grid-cols-2">
      <div class="rounded-3xl border border-slate-100 bg-slate-50 p-4">
        <p class="text-xs uppercase tracking-[0.24em] text-slate-400">Amount</p>
        <p class="mt-2 text-2xl font-semibold text-slate-900">{{ currencySymbol }}{{ loan.amount.toLocaleString() }}</p>
      </div>
      <div class="rounded-3xl border border-slate-100 bg-slate-50 p-4">
        <p class="text-xs uppercase tracking-[0.24em] text-slate-400">Interest</p>
        <p class="mt-2 text-2xl font-semibold text-slate-900">{{ loan.interestRate }}%</p>
      </div>
      <div class="rounded-3xl border border-slate-100 bg-slate-50 p-4">
        <p class="text-xs uppercase tracking-[0.24em] text-slate-400">Term</p>
        <p class="mt-2 text-2xl font-semibold text-slate-900">{{ loan.termMonths }} months</p>
      </div>
      <div class="rounded-3xl border border-slate-100 bg-slate-50 p-4">
        <p class="text-xs uppercase tracking-[0.24em] text-slate-400">Due date</p>
        <p class="mt-2 text-2xl font-semibold text-slate-900">{{ dueDateLabel }}</p>
      </div>
    </div>

    <div class="mt-6 space-y-2">
      <p class="text-sm font-semibold text-slate-700">Description</p>
      <p class="text-sm leading-6 text-slate-600">{{ loan.description || 'No additional details provided.' }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Loan } from '../../../services/loan'

const props = defineProps<{ loan: Loan }>()
const currencySymbol = props.loan.currency || '$'
const dueDateLabel = new Date(props.loan.dueDate).toLocaleDateString()
</script>
