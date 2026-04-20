<script setup lang="ts">
import { computed, ref, watch, type Component } from 'vue'
import { Eye, EyeOff } from 'lucide-vue-next'

interface Props {
  modelValue?: string
  label?: string
  type?: 'text' | 'email' | 'password'
  placeholder?: string
  required?: boolean
  error?: string
  icon?: Component
  iconTrailing?: Component
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  modelValue: ''
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const inputValue = ref<string>(props.modelValue)
const showPassword = ref(false)

watch(
  () => props.modelValue,
  (val) => {
    inputValue.value = val ?? ''
  }
)

watch(inputValue, (val) => {
  emit('update:modelValue', val)
})

const isPassword = computed(() => props.type === 'password')

const inputType = computed(() =>
  isPassword.value && !showPassword.value ? 'password' : 'text'
)

const LeadingIcon = computed(() => props.icon ?? null)
const TrailingIcon = computed(() => props.iconTrailing ?? null)

const EyeIcon = computed(() => (showPassword.value ? EyeOff : Eye))

const passwordRules = computed(() => {
  if (!isPassword.value) return []

  const value = inputValue.value ?? ''

  return [
    { label: 'At least 8 characters', valid: value.length >= 8 },
    { label: 'Contains uppercase letter', valid: /[A-Z]/.test(value) },
    { label: 'Contains number', valid: /\d/.test(value) },
    { label: 'Contains special character', valid: /[!@#$%^&*]/.test(value) },
  ]
})
</script>

<template>
  <div class="w-full space-y-2">
    <label v-if="label" class="text-sm font-medium text-neutral-700">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>

    <div class="relative">
      <component
        v-if="LeadingIcon"
        :is="LeadingIcon"
        class="absolute left-3 top-2.5 w-4 h-4 text-neutral-400"
      />

      <input
        v-model="inputValue"
        :type="inputType"
        :placeholder="placeholder"
        class="w-full border rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-primary-500"
        :class="[
          LeadingIcon ? 'pl-10' : '',
          isPassword || TrailingIcon ? 'pr-10' : ''
        ]"
      />

      <button
        v-if="isPassword"
        type="button"
        class="absolute right-3 top-2.5 text-neutral-500"
        @click="showPassword = !showPassword"
      >
        <component :is="EyeIcon" class="w-4 h-4" />
      </button>

      <component
        v-else-if="TrailingIcon"
        :is="TrailingIcon"
        class="absolute right-3 top-2.5 w-4 h-4 text-neutral-400"
      />
    </div>

    <p v-if="error" class="text-xs text-red-500">
      {{ error }}
    </p>

    <div v-if="isPassword" class="text-xs space-y-1">
      <div
        v-for="rule in passwordRules"
        :key="rule.label"
        :class="rule.valid ? 'text-green-600' : 'text-neutral-400'"
      >
        • {{ rule.label }}
      </div>
    </div>
  </div>
</template>