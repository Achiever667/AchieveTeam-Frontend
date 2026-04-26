<template>
  <AuthLayout title="Apply for a Loan" description="Fill out the form below to submit your loan application.">
    <div class="max-w-2xl mx-auto space-y-6">
      <form @submit.prevent="onSubmit" class="space-y-6">
        <UiFieldGroup>
          <UiField
            v-model.number="form.amount"
            label="Loan Amount"
            type="number"
            placeholder="Enter loan amount"
            :error="errors.amount"
            required
          />

          <UiField
            v-model.number="form.termMonths"
            label="Loan Term (Months)"
            type="number"
            placeholder="Enter term in months"
            :error="errors.termMonths"
            required
          />

          <UiField
            v-model="form.currency"
            label="Currency"
            placeholder="Enter currency (e.g., USD)"
            :error="errors.currency"
            required
          />

          <UiField
            v-model="form.description"
            label="Loan Description"
            type="text"
            placeholder="Describe the purpose of the loan"
            :error="errors.description"
            required
          />
        </UiFieldGroup>

        <div class="flex gap-4">
          <Button
            type="submit"
            :disabled="isApplying"
            class="flex-1"
          >
            <span v-if="isApplying">Submitting...</span>
            <span v-else>Submit Application</span>
          </Button>

          <Button
            type="button"
            variant="outline"
            @click="$router.back()"
            class="flex-1"
          >
            Cancel
          </Button>
        </div>
      </form>

      <div v-if="applyError" class="rounded-3xl border border-red-200 bg-red-50 p-6 text-red-800">
        <p class="font-semibold">Application Failed</p>
        <p class="mt-2">{{ applyError.message }}</p>
      </div>

      <div v-if="successMessage" class="rounded-3xl border border-green-200 bg-green-50 p-6 text-green-800">
        <p class="font-semibold">Application Submitted Successfully!</p>
        <p class="mt-2">{{ successMessage }}</p>
        <Button
          @click="$router.push('/loans')"
          class="mt-4"
        >
          View My Loans
        </Button>
      </div>
    </div>
  </AuthLayout>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import AuthLayout from '../../components/layouts/AuthLayout.vue'
import UiField from '../../components/ui/form/UiField.vue'
import UiFieldGroup from '../../components/ui/form/UiFieldGroup.vue'
import Button from '../../components/ui/button/Button.vue'
import { useLoan } from '../../composables/useLoan'
import { loanApplicationSchema, type LoanApplicationFormValues } from '../../schemas/loan/loanApplicationSchema'

const router = useRouter()
const { applyForLoan, isApplying, applyError } = useLoan()

const successMessage = ref<string>('')

const { handleSubmit, errors } = useForm<LoanApplicationFormValues>({
  validationSchema: toTypedSchema(loanApplicationSchema),
  initialValues: {
    amount: 0,
    termMonths: 0,
    description: '',
    currency: 'USD',
  },
})

const form = reactive<LoanApplicationFormValues>({
  amount: 0,
  termMonths: 0,
  description: '',
  currency: 'USD',
})

const onSubmit = handleSubmit(async (values) => {
  try {
    await applyForLoan(values)
    successMessage.value = 'Your loan application has been submitted successfully. You will be notified once it is reviewed.'
  } catch (error) {
    // Error is handled by the composable
  }
})
</script>