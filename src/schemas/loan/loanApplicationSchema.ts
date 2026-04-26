import { z } from 'zod'

export const loanApplicationSchema = z.object({
  amount: z
    .number()
    .min(1, 'Amount must be at least 1')
    .max(1000000, 'Amount cannot exceed 1,000,000'),

  termMonths: z
    .number()
    .min(1, 'Term must be at least 1 month')
    .max(360, 'Term cannot exceed 360 months'),

  description: z
    .string()
    .min(10, 'Description must be at least 10 characters')
    .max(500, 'Description cannot exceed 500 characters'),

  currency: z
    .string()
    .min(1, 'Currency is required')
    .default('USD'),
})

export type LoanApplicationFormValues = z.infer<typeof loanApplicationSchema>